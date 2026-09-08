import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

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
    const { nomeCompleto, cpf, telefone, email, cidade, localTrabalho, tempoExperiencia } = body;

    if (!nomeCompleto || !cpf || !email) {
      return new Response(JSON.stringify({ error: "Campos obrigatórios ausentes" }), {
        status: 400,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const MP_TOKEN = Deno.env.get("MP_ACCESS_TOKEN");
    if (!MP_TOKEN) {
      console.error("MP_ACCESS_TOKEN não configurada no Supabase Secrets");
      return new Response(JSON.stringify({ error: "Configuração de pagamento pendente. Entre em contato com a ASTEO-MT." }), {
        status: 500,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const PLAN_ID = "plan-anuidade-asteomt-2026";
    let userId: string;

    // Verificar se usuário já existe
    const { data: existingUser } = await supabase
      .from("User")
      .select("id, isActive")
      .eq("email", email)
      .single();

    if (existingUser) {
      if (existingUser.isActive) {
        return new Response(JSON.stringify({ error: "Este e-mail já possui uma conta ativa. Faça login na Área do Membro." }), {
          status: 409,
          headers: { ...CORS, "Content-Type": "application/json" },
        });
      }
      // Reutiliza usuário pendente
      userId = existingUser.id;
      await supabase.from("User").update({
        name: nomeCompleto,
        updatedAt: new Date().toISOString(),
      }).eq("id", userId);

      await supabase.from("MemberProfile").upsert({
        userId,
        fullName: nomeCompleto,
        documentId: cpf,
        cpf,
        telefone,
        cidade,
        localTrabalho,
        tempoExperiencia,
        status: "PENDING",
        updatedAt: new Date().toISOString(),
      }, { onConflict: "userId" });
    } else {
      userId = crypto.randomUUID();
      const profileId = crypto.randomUUID();

      const { error: userError } = await supabase.from("User").insert({
        id: userId,
        email,
        name: nomeCompleto,
        passwordHash: "PENDING_PAYMENT",
        role: "MEMBER",
        isActive: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      if (userError) throw userError;

      const { error: profileError } = await supabase.from("MemberProfile").insert({
        id: profileId,
        userId,
        fullName: nomeCompleto,
        documentId: cpf,
        cpf,
        telefone,
        cidade,
        localTrabalho,
        tempoExperiencia,
        status: "PENDING",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      if (profileError) throw profileError;
    }

    const paymentId = crypto.randomUUID();

    // Criar novo registro de pagamento PENDING
    const { error: paymentError } = await supabase.from("Payment").insert({
      id: paymentId,
      userId,
      planId: PLAN_ID,
      amountCents: 18600,
      currency: "BRL",
      status: "PENDING",
      provider: "mercadopago",
      createdAt: new Date().toISOString(),
    });

    if (paymentError) throw paymentError;

    // Criar preferência no Mercado Pago
    const cpfLimpo = cpf.replace(/\D/g, "");
    const mpPayload = {
      items: [{
        id: PLAN_ID,
        title: "Anuidade ASTEO-MT 2026",
        description: "Filiação anual à ASTEO-MT",
        quantity: 1,
        currency_id: "BRL",
        unit_price: 186.00,
      }],
      payer: {
        name: nomeCompleto,
        email,
        identification: {
          type: "CPF",
          number: cpfLimpo,
        },
      },
      back_urls: {
        success: "https://asteomt.com.br/pagamento-sucesso",
        failure: "https://asteomt.com.br/pagamento-falha",
        pending: "https://asteomt.com.br/pagamento-sucesso",
      },
      auto_return: "approved",
      notification_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/webhook-mp`,
      external_reference: paymentId,
      statement_descriptor: "ASTEOMT FILIACAO",
    };

    const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mpPayload),
    });

    if (!mpRes.ok) {
      const mpErr = await mpRes.text();
      console.error("Erro Mercado Pago:", mpErr);
      throw new Error(`Mercado Pago error: ${mpRes.status} - ${mpErr}`);
    }

    const mpData = await mpRes.json();

    // Salvar ID da preferência MP no pagamento
    await supabase.from("Payment").update({
      providerChargeId: mpData.id,
    }).eq("id", paymentId);

    return new Response(
      JSON.stringify({
        success: true,
        payment_id: paymentId,
        init_point: mpData.init_point,
        sandbox_init_point: mpData.sandbox_init_point,
      }),
      { headers: { ...CORS, "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    console.error("Erro em criar-preferencia-mp:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Erro interno. Tente novamente ou entre em contato com a ASTEO-MT." }),
      { status: 500, headers: { ...CORS, "Content-Type": "application/json" } }
    );
  }
});
