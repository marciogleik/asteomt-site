import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import bcrypt from "npm:bcryptjs@2.4.3";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function generatePassword(length = 10): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let password = "";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  for (const byte of array) {
    password += chars[byte % chars.length];
  }
  return password;
}

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function sendResetEmail(email: string, name: string, tempPassword: string): Promise<void> {
  const RESEND_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_KEY) {
    console.log("RESEND_API_KEY não configurada. E-mail não enviado.");
    console.log(`Nova senha para ${email}: ${tempPassword}`);
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><style>
      body { font-family: Arial, sans-serif; background: #f4f6f8; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
      .header { background: #004b82; color: white; padding: 32px; text-align: center; }
      .header h1 { margin: 0; font-size: 24px; }
      .body { padding: 32px; }
      .credential-box { background: #f0f7ff; border-left: 4px solid #004b82; padding: 16px 20px; border-radius: 4px; margin: 20px 0; }
      .credential-box p { margin: 6px 0; font-size: 15px; }
      .credential-box strong { color: #004b82; }
      .footer { background: #f4f6f8; padding: 20px 32px; text-align: center; color: #666; font-size: 13px; }
      .badge { background: #ffcc00; color: #004b82; display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; margin-bottom: 16px; }
    </style></head>
    <body>
      <div class="container">
        <div class="header">
          <div class="badge">🔑 Recuperação de Senha</div>
          <h1>ASTEO-MT</h1>
          <p style="margin:8px 0 0; opacity:0.9;">Associação dos Técnicos em Imobilizações Ortopédicas de MT</p>
        </div>
        <div class="body">
          <p>Olá, <strong>${name}</strong>!</p>
          <p>Recebemos uma solicitação de redefinição de senha para sua conta cadastrada com a anuidade ativa.</p>
          <p>Sua nova senha temporária de acesso foi gerada com segurança abaixo:</p>
          <div class="credential-box">
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Nova Senha Temporária:</strong> ${tempPassword}</p>
          </div>
          <p>⚠️ Recomendamos alterar sua senha após realizar o login na sua Área do Membro.</p>
          <p style="margin-top:24px;">Acesse: <a href="https://asteomt.com.br/login" style="color:#004b82; font-weight:bold;">asteomt.com.br/login</a></p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
          <p style="font-size:12px; color:#888;">Se você não solicitou esta alteração, entre em contato imediatamente com o suporte da ASTEO-MT.</p>
        </div>
        <div class="footer">
          <p>ASTEO-MT &mdash; Valorizando e qualificando os Técnicos em Imobilizações Ortopédicas de Mato Grosso.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "ASTEO-MT <noreply@asteomt.com.br>",
      to: [email],
      subject: "🔑 Sua nova senha de acesso ao portal - ASTEO-MT",
      html,
    }),
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: "E-mail é obrigatório." }), {
        status: 400,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Buscar usuário ativo
    const { data: user, error: userErr } = await supabase
      .from("User")
      .select("id, name, email, isActive")
      .eq("email", email.trim().toLowerCase())
      .single();

    if (userErr || !user) {
      return new Response(
        JSON.stringify({ error: "E-mail não encontrado ou filiação pendente de pagamento." }),
        { status: 400, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    if (!user.isActive) {
      return new Response(
        JSON.stringify({ error: "Sua filiação está pendente de confirmação de pagamento. Entre em contato ou conclua o pagamento da sua anuidade." }),
        { status: 400, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    // Gerar nova senha temporária e hash bcrypt
    const tempPassword = generatePassword(10);
    const passwordHash = await hashPassword(tempPassword);

    // Atualizar no banco
    const { error: updateErr } = await supabase
      .from("User")
      .update({
        passwordHash,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (updateErr) throw updateErr;

    // Enviar e-mail via Resend
    await sendResetEmail(user.email, user.name, tempPassword);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Uma nova senha de acesso foi enviada para o seu e-mail com sucesso!",
      }),
      { headers: { ...CORS, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Erro em recuperar-senha:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Erro interno. Tente novamente mais tarde." }),
      { status: 500, headers: { ...CORS, "Content-Type": "application/json" } }
    );
  }
});
