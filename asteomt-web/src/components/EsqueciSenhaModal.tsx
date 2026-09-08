import { useState } from 'react';
import { solicitarRecuperacaoSenha } from '../lib/supabase';
import './EsqueciSenhaModal.css';

interface EsqueciSenhaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EsqueciSenhaModal({ isOpen, onClose }: EsqueciSenhaModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const res = await solicitarRecuperacaoSenha(email);
      setSuccessMessage(res.message || 'Instruções enviadas para seu e-mail!');
      setEmail('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao solicitar recuperação de senha.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Fechar">
          &times;
        </button>

        <div className="modal-header">
          <h2>Recuperar Senha</h2>
          <p>
            Digite seu e-mail cadastrado. Se sua filiação estiver ativa, enviaremos as credenciais de acesso por e-mail.
          </p>
        </div>

        {error && (
          <div className="modal-alert-error">
            <p>⚠️ {error}</p>
            <a
              href="https://wa.me/5565999998888?text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20para%20acessar%20minha%20conta%20na%20ASTEO-MT"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', marginTop: '8px', color: '#004b82', fontWeight: 'bold', fontSize: '0.85rem', textDecoration: 'underline' }}
            >
              Precisa de ajuda? Falar com o suporte no WhatsApp &rarr;
            </a>
          </div>
        )}

        {successMessage ? (
          <div className="modal-alert-success">
            <p>✅ <strong>{successMessage}</strong></p>
            <p style={{ marginTop: '8px', fontSize: '0.85rem' }}>
              Verifique sua caixa de entrada e spam.
            </p>
            <button
              onClick={onClose}
              className="btn-modal-submit"
              style={{ marginTop: '16px', background: 'var(--gov-green)' }}
            >
              Voltar ao Login
            </button>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="recovery-email">E-mail Cadastrado</label>
              <input
                type="email"
                id="recovery-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>

            <button type="submit" className="btn-modal-submit" disabled={isLoading}>
              {isLoading ? 'Enviando e-mail...' : 'Enviar Senha por E-mail'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EsqueciSenhaModal;
