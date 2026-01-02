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
      // Aqui você enviaria os dados para a API e geraria o boleto
      // Por enquanto, vamos simular a geração do boleto
      setEtapa('boleto');
    }
  };

  // Tela de Boleto Gerado
  if (etapa === 'boleto') {
    const vencimento = new Date();
    vencimento.setDate(vencimento.getDate() + 7); // Vencimento em 7 dias
    
    return (
      <div className="registro-page">
        <div className="registro-container">
          <div className="boleto-box">
            <div className="boleto-icon">📄</div>
            <h1>Boleto Gerado com Sucesso!</h1>
            
            <div className="boleto-info">
              <p className="boleto-nome">
                <strong>{formData.nomeCompleto}</strong>
              </p>
              <p className="boleto-email">{formData.email}</p>
            </div>

            <div className="boleto-detalhes">
              <div className="boleto-item">
                <span className="boleto-label">Valor da Anuidade</span>
                <span className="boleto-valor">R$ 186,00</span>
              </div>
              <div className="boleto-item">
                <span className="boleto-label">Vencimento</span>
                <span className="boleto-data">
                  {vencimento.toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            <div className="boleto-codigo">
              <p className="codigo-label">Linha Digitável</p>
              <p className="codigo-numero">
                23793.38128 60000.000003 00000.000400 1 94560000018600
              </p>
              <button 
                className="btn-copiar"
                onClick={() => {
                  navigator.clipboard.writeText('23793.38128 60000.000003 00000.000400 1 94560000018600');
                  alert('Código copiado!');
                }}
              >
                📋 Copiar Código
              </button>
            </div>

            <a 
              href="#" 
              className="btn-download-boleto"
              onClick={(e) => {
                e.preventDefault();
                alert('Funcionalidade de download será implementada com integração bancária');
              }}
            >
              ⬇️ Baixar Boleto em PDF
            </a>

            <div className="boleto-aviso">
              <div className="aviso-icon">⚠️</div>
              <div className="aviso-texto">
                <strong>Importante:</strong>
                <p>
                  Sua filiação será ativada automaticamente após a confirmação do pagamento 
                  (em até 3 dias úteis após a compensação bancária).
                </p>
                <p>
                  Você receberá um e-mail em <strong>{formData.email}</strong> confirmando 
                  sua filiação e liberando o acesso à área do associado.
                </p>
              </div>
            </div>

            <div className="boleto-status">
              <div className="status-badge pendente">
                <span className="status-dot"></span>
                Filiação Pendente
              </div>
              <p className="status-texto">
                Aguardando pagamento da anuidade
              </p>
            </div>

            <Link to="/" className="btn-voltar-home">
              Voltar para a Página Inicial
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Formulário de Registro
  return (
    <div className="registro-page">
      <div className="registro-container">
        <div className="registro-header">
          <Link to="/" className="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Voltar
          </Link>
          <h1>Filie-se à ASTEOMT</h1>
          <p>Preencha seus dados para gerar o boleto da anuidade e iniciar sua filiação</p>
        </div>

        <div className="registro-info-box">
          <div className="info-icon">ℹ️</div>
          <div className="info-texto">
            <strong>Como funciona?</strong>
            <ol>
              <li>Preencha o formulário abaixo</li>
              <li>O sistema gerará o boleto da anuidade (R$ 186,00)</li>
              <li>Após o pagamento, sua filiação será ativada automaticamente</li>
            </ol>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="registro-form">
          <div className="form-group">
            <label htmlFor="nomeCompleto">
              Nome Completo <span className="required">*</span>
            </label>
            <input
              type="text"
              id="nomeCompleto"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              className={errors.nomeCompleto ? 'error' : ''}
            />
            {errors.nomeCompleto && <span className="error-msg">{errors.nomeCompleto}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cpf">
                CPF <span className="required">*</span>
              </label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
                maxLength={14}
                className={errors.cpf ? 'error' : ''}
              />
              {errors.cpf && <span className="error-msg">{errors.cpf}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="telefone">
                Telefone / WhatsApp <span className="required">*</span>
              </label>
              <input
                type="text"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
                maxLength={15}
                className={errors.telefone ? 'error' : ''}
              />
              {errors.telefone && <span className="error-msg">{errors.telefone}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              E-mail <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cidade">
                Cidade / Município <span className="required">*</span>
              </label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                placeholder="Digite sua cidade"
                className={errors.cidade ? 'error' : ''}
              />
              {errors.cidade && <span className="error-msg">{errors.cidade}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="localTrabalho">
                Local de Trabalho <span className="required">*</span>
              </label>
              <input
                type="text"
                id="localTrabalho"
                name="localTrabalho"
                value={formData.localTrabalho}
                onChange={handleChange}
                placeholder="Ex.: HMS, UPA, Hospital..."
                className={errors.localTrabalho ? 'error' : ''}
              />
              {errors.localTrabalho && <span className="error-msg">{errors.localTrabalho}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tempoExperiencia">
              Tempo de Experiência na Área <span className="required">*</span>
            </label>
            <input
              type="text"
              id="tempoExperiencia"
              name="tempoExperiencia"
              value={formData.tempoExperiencia}
              onChange={handleChange}
              placeholder="Ex.: 6 anos de atuação"
              className={errors.tempoExperiencia ? 'error' : ''}
            />
            {errors.tempoExperiencia && <span className="error-msg">{errors.tempoExperiencia}</span>}
          </div>

          <div className="form-group termos-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="aceitaTermos"
                checked={formData.aceitaTermos}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              <span className="termos-texto">
                Declaro que li e concordo com o{' '}
                <a href="/estatuto" target="_blank" rel="noopener noreferrer">
                  Estatuto
                </a>{' '}
                e as normas da ASTEOMT, autorizando o uso dos meus dados para fins administrativos, 
                comunicação institucional e atividades exclusivas da associação.
              </span>
            </label>
            {errors.aceitaTermos && <span className="error-msg">{errors.aceitaTermos}</span>}
          </div>

          <div className="valor-anuidade">
            <span className="valor-label">Valor da Anuidade:</span>
            <span className="valor-preco">R$ 186,00</span>
          </div>

          <button type="submit" className="btn-submit">
            Gerar Boleto e Finalizar Cadastro
          </button>

          <p className="registro-nota">
            Ao clicar em "Gerar Boleto", você receberá o boleto bancário para pagamento. 
            Sua filiação será ativada após a confirmação do pagamento.
          </p>
        </form>
      </div>
    </div>
  );
}
