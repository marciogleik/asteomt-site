import { useState } from 'react';
import { FiX, FiCheckCircle, FiCopy, FiShield } from 'react-icons/fi';
import './QrValidationModal.css';

interface QrValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  registration: string;
}

export function QrValidationModal({ isOpen, onClose, name, registration }: QrValidationModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const validationUrl = `https://asteomt.com.br/validar?registro=${encodeURIComponent(registration)}`;
  const hash = `ASTEO-VAL-${Math.random().toString(36).substring(2, 10).toUpperCase()}-2026`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(validationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="validation-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <FiX size={22} />
        </button>

        <div className="validation-header">
          <div className="badge-verified">
            <FiCheckCircle size={28} />
          </div>
          <h2>Registro Válido & Autenticado</h2>
          <p>Validação em tempo real junto à base de associados da ASTEO-MT.</p>
        </div>

        <div className="validation-body">
          <div className="val-row">
            <span className="val-label">ASSOCIADO(A):</span>
            <strong className="val-text">{name}</strong>
          </div>
          <div className="val-row">
            <span className="val-label">INSCRIÇÃO REGIONAL:</span>
            <strong className="val-text">{registration}</strong>
          </div>
          <div className="val-row">
            <span className="val-label">STATUS INSTITUCIONAL:</span>
            <span className="badge-status-active">
              <FiShield /> ATIVO E QUITADO (2026)
            </span>
          </div>
          <div className="val-row">
            <span className="val-label">CÓDIGO DE AUTENTICIDADE:</span>
            <code className="val-code">{hash}</code>
          </div>
        </div>

        <div className="validation-footer">
          <button className="btn-copy-link" onClick={handleCopyLink}>
            <FiCopy /> {copied ? 'Link Copiado!' : 'Copiar Link de Validação'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QrValidationModal;
