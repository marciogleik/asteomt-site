import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { criarCobrancaAsaas, consultarStatusPagamento, type CobrancaPix } from '../lib/supabase';
import { SEO } from '../components/SEO';
import './Registro.css';

const SENHA_MINIMA = 8; // mesmo mínimo das Edge Functions criar-cobranca-asaas e recuperar-senha

interface FormData {
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  email: string;
  cidade: string;
  localTrabalho: string;
  tempoExperiencia: string;
  senha: string;
  confirmarSenha: string;
  aceitaTermos: boolean;
}

export function Registro() {
  const [formData, setFormData] = useState<FormData>({
    nomeCompleto: '',
    cpf: '',
    telefone: '',
    email: '',
    cidade: '',
    localTrabalho: '',
    tempoExperiencia: '',
    senha: '',
    confirmarSenha: '',
    aceitaTermos: false,
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [pix, setPix] = useState<CobrancaPix | null>(null);
  const [copiado, setCopiado] = useState(false);
  const navigate = useNavigate();
  const erroRef = useRef<HTMLDivElement>(null);

  // A caixa de erro fica no topo; no celular o usuário está lá embaixo, no botão
  useEffect(() => {
    if (apiError) erroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [apiError]);

  // Enquanto o Pix está na tela, consulta o status até o webhook do Asaas confirmar o pagamento
  useEffect(() => {
    if (!pix) return;
    const timer = setInterval(async () => {
      try {
        const status = await consultarStatusPagamento(pix.payment_id);
        if (status === 'PAID') {
          clearInterval(timer);
          navigate('/pagamento-sucesso');
        } else if (status === 'FAILED' || status === 'CANCELED') {
          clearInterval(timer);
          setPix(null);
          setApiError('Este Pix expirou ou foi cancelado. Envie o formulário novamente para gerar um novo.');
        }
      } catch {
        // Falha de rede: tenta de novo no próximo ciclo
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [pix, navigate]);

  const copiarPix = async () => {
    if (!pix) return;
    try {
      await navigator.clipboard.writeText(pix.pix_payload);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    } catch {
      // Clipboard bloqueado: o código continua visível para copiar manualmente
    }
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatTelefone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    let formattedValue = value;
    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'telefone') {
      formattedValue = formatTelefone(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : formattedValue,
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    if (apiError) setApiError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nomeCompleto.trim()) newErrors.nomeCompleto = 'Nome completo é obrigatório';
    if (!formData.cpf.trim() || formData.cpf.length < 14) newErrors.cpf = 'CPF inválido';
    if (!formData.telefone.trim() || formData.telefone.length < 14) newErrors.telefone = 'Telefone inválido';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'E-mail inválido';
    if (!formData.cidade.trim()) newErrors.cidade = 'Cidade é obrigatória';
    if (!formData.localTrabalho.trim()) newErrors.localTrabalho = 'Local de trabalho é obrigatório';
    if (!formData.tempoExperiencia.trim()) newErrors.tempoExperiencia = 'Tempo de experiência é obrigatório';
    if (formData.senha.length < SENHA_MINIMA) newErrors.senha = `A senha precisa ter pelo menos ${SENHA_MINIMA} caracteres`;
    if (formData.confirmarSenha !== formData.senha) newErrors.confirmarSenha = 'As senhas não são iguais';
    if (!formData.aceitaTermos) newErrors.aceitaTermos = 'Você deve aceitar os termos para continuar';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError(null);

    try {
      const result = await criarCobrancaAsaas({
        nomeCompleto: formData.nomeCompleto,
        cpf: formData.cpf,
        telefone: formData.telefone,
        email: formData.email,
        cidade: formData.cidade,
        localTrabalho: formData.localTrabalho,
        tempoExperiencia: formData.tempoExperiencia,
        senha: formData.senha,
      });

      setPix(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro inesperado. Tente novamente.';
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registro-page">
      <SEO
        title="Filiar-se à ASTEO-MT | Cadastro de Associados"
        description="Associe-se à Associação Matogrossense dos Técnicos de Imobilizações Ortopédicas. Garanta sua carteira profissional, convênios e suporte jurídico."
        path="/registro"
      />
      <div className="registro-container">
        <header className="registro-header">
          <Link to="/" className="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Voltar
          </Link>
          <h1>Filie-se à ASTEO-MT</h1>
          <p>Seja parte da instituição que defende os técnicos em imobilização ortopédica em Mato Grosso.</p>
        </header>

        <div className="registro-info-box">
          <div className="info-icon">ℹ️</div>
          <div className="info-texto">
            <strong>Processo de Filiação:</strong>
            <ol>
              <li>Preenchimento de dados institucionais</li>
              <li>Pagamento da anuidade (R$ 220,00) via Pix, processado pelo Asaas</li>
              <li>Ativação automática: é só entrar com seu e-mail e a senha que você criou</li>
            </ol>
          </div>
        </div>

        {apiError && (
          <div className="erro-api-box" ref={erroRef} role="alert">
            <span>⚠️</span>
            <span>{apiError}</span>
          </div>
        )}

        {pix ? (
          <div className="registro-form pix-box">
            <h2 className="pix-titulo">Pague com Pix</h2>
            <p className="pix-instrucao">Escaneie o QR Code no app do seu banco ou use o Pix copia e cola.</p>

            <img
              src={`data:image/png;base64,${pix.pix_qrcode_base64}`}
              alt="QR Code Pix da anuidade ASTEO-MT"
              className="pix-qrcode"
              width={240}
              height={240}
            />

            <div className="valor-anuidade">
              <span className="valor-label">VALOR:</span>
              <span className="valor-preco">
                {pix.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>

            <label className="pix-label" htmlFor="pix-payload">Pix copia e cola</label>
            <textarea
              id="pix-payload"
              className="pix-payload"
              readOnly
              rows={3}
              value={pix.pix_payload}
              onFocus={e => e.currentTarget.select()}
            />

            <button type="button" className="btn-submit" onClick={copiarPix}>
              {copiado ? '✅ Código copiado' : '📋 Copiar código Pix'}
            </button>

            <p className="pix-status" role="status">
              <span className="spinner pix-spinner"></span>
              Aguardando pagamento. Esta página atualiza sozinha.
            </p>

            <p className="mp-aviso">
              Após a confirmação, entre no portal com seu e-mail e a senha que você criou.<br />
              <a href={pix.invoice_url} target="_blank" rel="noopener noreferrer">Abrir fatura no Asaas</a>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="registro-form">
            <div className="form-group">
              <label>Nome Completo <span className="required">*</span></label>
              <input
                type="text"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={handleChange}
                placeholder="Digite seu nome completo"
                disabled={isLoading}
              />
              {errors.nomeCompleto && <span className="error-msg">{errors.nomeCompleto}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>CPF <span className="required">*</span></label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  disabled={isLoading}
                />
                {errors.cpf && <span className="error-msg">{errors.cpf}</span>}
              </div>
              <div className="form-group">
                <label>Telefone / WhatsApp <span className="required">*</span></label>
                <input
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(66) 00000-0000"
                  maxLength={15}
                  disabled={isLoading}
                />
                {errors.telefone && <span className="error-msg">{errors.telefone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>E-mail <span className="required">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                autoComplete="username"
                disabled={isLoading}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="senha">Crie uma senha <span className="required">*</span></label>
                <input
                  id="senha"
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder={`Mínimo ${SENHA_MINIMA} caracteres`}
                  autoComplete="new-password"
                  disabled={isLoading}
                />
                {errors.senha && <span className="error-msg">{errors.senha}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="confirmarSenha">Repita a senha <span className="required">*</span></label>
                <input
                  id="confirmarSenha"
                  type="password"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  placeholder="Digite a senha de novo"
                  autoComplete="new-password"
                  disabled={isLoading}
                />
                {errors.confirmarSenha && <span className="error-msg">{errors.confirmarSenha}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cidade <span className="required">*</span></label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  placeholder="Ex: Cuiabá"
                  disabled={isLoading}
                />
                {errors.cidade && <span className="error-msg">{errors.cidade}</span>}
              </div>
              <div className="form-group">
                <label>Tempo de Experiência <span className="required">*</span></label>
                <input
                  type="text"
                  name="tempoExperiencia"
                  value={formData.tempoExperiencia}
                  onChange={handleChange}
                  placeholder="Ex: 3 anos"
                  disabled={isLoading}
                />
                {errors.tempoExperiencia && <span className="error-msg">{errors.tempoExperiencia}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Local de Trabalho Atual <span className="required">*</span></label>
              <input
                type="text"
                name="localTrabalho"
                value={formData.localTrabalho}
                onChange={handleChange}
                placeholder="Ex: Hospital Municipal de Cuiabá"
                disabled={isLoading}
              />
              {errors.localTrabalho && <span className="error-msg">{errors.localTrabalho}</span>}
            </div>

            <div className="termos-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="aceitaTermos"
                  checked={formData.aceitaTermos}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <span>Declaro que li e concordo com o Estatuto da ASTEO-MT e autorizo o processamento dos meus dados para fins de filiação.</span>
              </label>
              {errors.aceitaTermos && <span className="error-msg">{errors.aceitaTermos}</span>}
            </div>

            <div className="valor-anuidade">
              <span className="valor-label">INVESTIMENTO ANUAL:</span>
              <span className="valor-preco">R$ 220,00</span>
            </div>

            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  Processando...
                </span>
              ) : (
                '🔒 GERAR PIX DE PAGAMENTO'
              )}
            </button>

            <p className="mp-aviso">
              O pagamento é feito via Pix e processado com segurança pelo Asaas.<br />
              Após a confirmação, entre no portal com seu e-mail e a senha que você criou.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Registro;
