import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import bcrypt from "npm:bcryptjs@2.4.3";

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

async function sendWelcomeEmail(
  email: string,
  name: string,
  password: string,
  validUntil: string
): Promise<void> {
  const RESEND_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_KEY) {
    console.log("RESEND_API_KEY não configurada. E-mail não enviado.");
    console.log(`Credenciais geradas para ${email}: senha=${password}`);
    return;
  }

  const validDate = new Date(validUntil).toLocaleDateString("pt-BR");

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
      .badge { background: #00824b; color: white; display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; margin-bottom: 16px; }
    </style></head>
    <body>
      <div class="container">
        <div class="header">
          <div class="badge">✅ Filiação Ativa!</div>
          <h1>Bem-vindo(a) à ASTEO-MT</h1>
          <p style="margin:8px 0 0; opacity:0.9;">Associação dos Técnicos em Imobilizações Ortopédicas de MT</p>
        </div>
        <div class="body">
          <p>Olá, <strong>${name}</strong>!</p>
          <p>Seu pagamento foi confirmado e sua filiação está ativa! Abaixo estão suas credenciais de acesso ao portal do associado:</p>
          <div class="credential-box">
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Senha temporária:</strong> ${password}</p>
            <p><strong>Filiação válida até:</strong> ${validDate}</p>
          </div>
          <p>⚠️ Por segurança, altere sua senha ao fazer o primeiro acesso.</p>
          <p>Acesse: <a href="https://asteomt.com.br/login" style="color:#004b82;">asteomt.com.br/login</a></p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
          <p>Qualquer dúvida, entre em contato conosco.</p>
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
      subject: "✅ Filiação ASTEO-MT confirmada! Suas credenciais de acesso",
      html,
    }),
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "GET") {
    // MP valida o endpoint com GET
    return new Response("OK", { status: 200 });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    console.log("Webhook MP recebido:", JSON.stringify(body));

    const url = new URL(req.url);
    const topic = url.searchParams.get("topic") || body.type;
    const mpPaymentId = url.searchParams.get("id") || body.data?.id;

    if (topic !== "payment" || !mpPaymentId) {
      return new Response("Ignorado", { status: 200 });
    }

    const MP_TOKEN = Deno.env.get("MP_ACCESS_TOKEN")!;

    // Consultar status do pagamento no MP
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${mpPaymentId}`, {
      headers: { Authorization: `Bearer ${MP_TOKEN}` },
    });

    if (!mpRes.ok) {
      console.error("Erro ao consultar MP:", mpRes.status);
      return new Response("MP API error", { status: 500 });
    }

    const mpPayment = await mpRes.json();
    console.log("Status MP:", mpPayment.status, "| Ref:", mpPayment.external_reference);

    const internalPaymentId = mpPayment.external_reference;
    if (!internalPaymentId) {
      console.error("external_reference ausente");
      return new Response("OK", { status: 200 });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    if (mpPayment.status !== "approved") {
      if (mpPayment.status === "rejected" || mpPayment.status === "cancelled") {
        await supabase.from("Payment").update({ status: "FAILED" }).eq("id", internalPaymentId);
      }
      return new Response("OK", { status: 200 });
    }

    // Buscar o pagamento com User
    const { data: payment, error: payErr } = await supabase
      .from("Payment")
      .select("*, User(*)")
      .eq("id", internalPaymentId)
      .single();

    if (payErr || !payment) {
      console.error("Pagamento não encontrado:", payErr);
      return new Response("OK", { status: 200 });
    }

    if (payment.status === "PAID") {
      console.log("Pagamento já processado. Ignorando.");
      return new Response("OK", { status: 200 });
    }

    const now = new Date();
    const validUntil = new Date(now);
    validUntil.setFullYear(validUntil.getFullYear() + 1);

    // Gerar senha temporária compatível com bcryptjs
    const tempPassword = generatePassword(10);
    const passwordHash = await hashPassword(tempPassword);

    // Atualizar Payment
    await supabase.from("Payment").update({
      status: "PAID",
      paidAt: now.toISOString(),
    }).eq("id", internalPaymentId);

    // Ativar usuário com o hash bcrypt
    await supabase.from("User").update({
      isActive: true,
      passwordHash,
      updatedAt: now.toISOString(),
    }).eq("id", payment.userId);

    // Ativar perfil do membro
    await supabase.from("MemberProfile").update({
      status: "ACTIVE",
      validUntil: validUntil.toISOString(),
      updatedAt: now.toISOString(),
    }).eq("userId", payment.userId);

    // Buscar dados do usuário para o e-mail
    const user = payment.User;
    if (user && user.email) {
      await sendWelcomeEmail(user.email, user.name, tempPassword, validUntil.toISOString());
    }

    console.log(`Filiação ativada para userId=${payment.userId}`);
    return new Response("OK", { status: 200 });

  } catch (err) {
    console.error("Erro no webhook:", err);
    return new Response("Internal error", { status: 500 });
  }
});
