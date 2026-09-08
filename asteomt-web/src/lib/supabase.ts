import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Chama a Edge Function de criação de preferência do Mercado Pago
 */
export async function criarPreferenciaMP(formData: {
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  email: string;
  cidade: string;
  localTrabalho: string;
  tempoExperiencia: string;
}) {
  const res = await fetch(`${supabaseUrl}/functions/v1/criar-preferencia-mp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseAnonKey,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Erro ao criar preferência de pagamento');
  }

  return data as {
    success: boolean;
    payment_id: string;
    init_point: string;
    sandbox_init_point: string;
  };
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
