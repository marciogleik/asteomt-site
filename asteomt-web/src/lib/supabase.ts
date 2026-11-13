import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface CobrancaPix {
  success: boolean;
  payment_id: string;
  invoice_url: string;
  pix_payload: string;
  pix_qrcode_base64: string;
  pix_expira_em: string;
  valor: number;
}

/**
 * Chama a Edge Function que cria a cobrança Pix da anuidade no Asaas
 */
export async function criarCobrancaAsaas(formData: {
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  email: string;
  cidade: string;
  localTrabalho: string;
  tempoExperiencia: string;
}): Promise<CobrancaPix> {
  const res = await fetch(`${supabaseUrl}/functions/v1/criar-cobranca-asaas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseAnonKey,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || 'Erro ao gerar a cobrança Pix');
  }

  return data as CobrancaPix;
}

/**
 * Consulta o status de um pagamento: PENDING, PAID, FAILED, CANCELED ou NOT_FOUND
 */
export async function consultarStatusPagamento(paymentId: string): Promise<string> {
  const res = await fetch(
    `${supabaseUrl}/functions/v1/status-pagamento?id=${encodeURIComponent(paymentId)}`,
    { headers: { apikey: supabaseAnonKey } },
  );

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || 'Erro ao consultar o pagamento');
  }

  return data.status;
}

export async function solicitarRecuperacaoSenha(email: string) {
  try {
    const res = await fetch(`${supabaseUrl}/functions/v1/recuperar-senha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseAnonKey,
      },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMsg = data?.error || 'E-mail não encontrado ou filiação pendente de confirmação de pagamento.';
      throw new Error(errorMsg);
    }

    return data as {
      success: boolean;
      message: string;
    };
  } catch (err: unknown) {
    if (err instanceof Error && err.message && err.message !== 'Failed to fetch') {
      throw err;
    }
    throw new Error('Nenhuma conta ativa encontrada com este e-mail. Se você já pagou sua anuidade, aguarde a liberação ou entre em contato com nosso suporte.');
  }
}
