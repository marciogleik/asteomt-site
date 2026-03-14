import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registro.css';

interface FormData {
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  email: string;
  cidade: string;
  localTrabalho: string;
  tempoExperiencia: string;
  aceitaTermos: boolean;
}

export function Registro() {
  const [etapa, setEtapa] = useState<'formulario' | 'boleto'>('formulario');
  const [formData, setFormData] = useState<FormData>({
    nomeCompleto: '',
    cpf: '',
    telefone: '',
    email: '',
    cidade: '',
    localTrabalho: '',
    tempoExperiencia: '',
    aceitaTermos: false,
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

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
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = 'Nome completo é obrigatório';
    }

    if (!formData.cpf.trim() || formData.cpf.length < 14) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!formData.telefone.trim() || formData.telefone.length < 14) {
      newErrors.telefone = 'Telefone inválido';
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.cidade.trim()) {
      newErrors.cidade = 'Cidade é obrigatória';
    }

    if (!formData.localTrabalho.trim()) {
      newErrors.localTrabalho = 'Local de trabalho é obrigatório';
    }

    if (!formData.tempoExperiencia.trim()) {
      newErrors.tempoExperiencia = 'Tempo de experiência é obrigatório';
    }

    if (!formData.aceitaTermos) {
      newErrors.aceitaTermos = 'Você deve aceitar os termos para continuar';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setEtapa('boleto');
    }
  };

  if (etapa === 'boleto') {
    const vencimento = new Date();
    vencimento.setDate(vencimento.getDate() + 7);

    return (
      <div className="registro-page">
        <div className="registro-container">
          <div className="boleto-box">
            <div className="boleto-icon">📄</div>
            <h1>Solicitação de Filiação Enviada!</h1>

            <div className="boleto-info">
              <p className="boleto-nome"><strong>{formData.nomeCompleto}</strong></p>
              <p className="boleto-email">{formData.email}</p>
            </div>

            <div className="boleto-detalhes">
              <div className="boleto-item">
                <span className="boleto-label">Anuidade ASTEOMT</span>
                <span className="boleto-valor">R$ 186,00</span>
              </div>
              <div className="boleto-item">
                <span className="boleto-label">Vencimento</span>
                <span className="boleto-data">{vencimento.toLocaleDateString('pt-BR')}</span>
              </div>
            </div>

            <div className="boleto-codigo">
              <p className="codigo-label">LINHA DIGITÁVEL PARA PAGAMENTO</p>
              <p className="codigo-numero">23793.38128 60000.000003 00000.000400 1 94560000018600</p>
              <button
                className="btn-copiar"
                onClick={() => {
                  navigator.clipboard.writeText('23793.38128 60000.000003 00000.000400 1 94560000018600');
                  alert('Código copiado para a área de transferência!');
                }}
              >
                📋 COPIAR LINHA DIGITÁVEL
              </button>
            </div>

            <a href="#" className="btn-submit" style={{ display: 'inline-block', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); alert('Em breve integração bancária real.'); }}>
              DOWNLOAD DO BOLETO (PDF)
            </a>

            <div className="registro-info-box" style={{ marginTop: '2rem', textAlign: 'left' }}>
              <div className="info-icon">⚖️</div>
              <div className="info-texto">
                <strong>Próximos Passos:</strong>
                <ol>
                  <li>Efetue o pagamento do boleto até o vencimento.</li>
                  <li>Aguarde até 72h para a compensação e registro no sistema.</li>
                  <li>Você receberá suas credenciais de acesso por e-mail.</li>
                </ol>
              </div>
            </div>

            <Link to="/" className="back-link" style={{ marginTop: '2rem' }}>Voltar para a Página Inicial</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registro-page">
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
              <li>Geração da anuidade (R$ 186,00)</li>
              <li>Ativação de benefícios após pagamento</li>
            </ol>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="registro-form">
          <div className="form-group">
            <label>Nome Completo <span className="required">*</span></label>
            <input
              type="text"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              required
            />
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
                required
              />
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
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>E-mail Institucional <span className="required">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Local de Trabalho Atual <span className="required">*</span></label>
            <input
              type="text"
              name="localTrabalho"
              value={formData.localTrabalho}
              onChange={handleChange}
              placeholder="Ex: Hospital Municipal de Cuiabá"
              required
            />
          </div>

          <div className="termos-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="aceitaTermos"
                checked={formData.aceitaTermos}
                onChange={handleChange}
                required
              />
              <span>Declaro que li e concordo com o Estatuto da ASTEO-MT e autorizo o processamento dos meus dados para fins de filiação.</span>
            </label>
          </div>

          <div className="valor-anuidade">
            <span className="valor-label">INVESTIMENTO ANUAL:</span>
            <span className="valor-preco">R$ 186,00</span>
          </div>

          <button type="submit" className="btn-submit">FINALIZAR SOLICITAÇÃO</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
