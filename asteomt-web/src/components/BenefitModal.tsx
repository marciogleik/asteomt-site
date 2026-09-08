import { FiX, FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import './BenefitModal.css';

interface BenefitModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: 'duma' | 'unifacc' | null;
}

export function BenefitModal({ isOpen, onClose, partner }: BenefitModalProps) {
  if (!isOpen || !partner) return null;

  const data = {
    duma: {
      title: 'Duma Psicologia & Saúde Mental',
      tag: 'Saúde & Bem-Estar',
      desc: 'Sessões de terapia online individual, de casal e acompanhamento com condições financeiras diferenciadas e exclusivas para associados ativos da ASTEO-MT e seus dependentes diretos (cônjuges e filhos).',
      code: 'CONVENIO-ASTEOMT-DUMA2026',
      steps: [
        'Acesse o WhatsApp da Duma Psicologia pelo botão abaixo.',
        'Informe o seu nome completo e o código do convênio.',
        'Sua filiação ativa será confirmada com a secretaria da ASTEO-MT.',
        'Agende suas sessões com valor com desconto institucional.'
      ],
      link: 'https://wa.me/5566999849974?text=Olá,%20sou%20associado%20ASTEO-MT%20e%20gostaria%20de%20agendar%20terapia%20pelo%20convênio'
    },
    unifacc: {
      title: 'UNIFACC Cuiabá - Educação Superior',
      tag: 'Educação & Pós-Graduação',
      desc: 'Bolsas parciais e descontos exclusivos nas mensalidades de cursos de Graduação, Pós-Graduação, MBAs e Extensão Técnica na UNIFACC Cuiabá para associados e dependentes.',
      code: 'UNIFACC-ASTEO-EDUC2026',
      steps: [
        'Acesse o portal da UNIFACC Cuiabá ou visite o campus.',
        'Apresente sua Carteira Digital ou Certidão de Regularidade da ASTEO-MT emitida no painel.',
        'O desconto de convênio será aplicado diretamente na sua matrícula e mensalidades.'
      ],
      link: 'https://unifaccuiaba.com.br'
    }
  }[partner];

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <FiX size={24} />
        </button>

        <span className="modal-tag">{data.tag}</span>
        <h2 className="modal-title">{data.title}</h2>
        <p className="modal-desc">{data.desc}</p>

        <div className="code-box">
          <span className="code-label">CÓDIGO DO CONVÊNIO:</span>
          <strong className="code-val">{data.code}</strong>
        </div>

        <h4 className="steps-title">Como utilizar seu benefício:</h4>
        <ul className="steps-list">
          {data.steps.map((step, idx) => (
            <li key={idx}>
              <FiCheckCircle className="step-icon" />
              <span>{step}</span>
            </li>
          ))}
        </ul>

        <div className="modal-footer">
          <a href={data.link} target="_blank" rel="noopener noreferrer" className="btn-modal-action">
            Acessar Parceria <FiExternalLink />
          </a>
        </div>
      </div>
    </div>
  );
}

export default BenefitModal;
