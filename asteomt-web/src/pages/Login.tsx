import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { SEO } from '../components/SEO';
import { EsqueciSenhaModal } from '../components/EsqueciSenhaModal';
import api from '../services/api';
import './Login.css';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Pré-aquecimento em segundo plano para acordar o servidor caso estivesse inativo (evita atraso no clique)
    api.get('/auth/me').catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/area-membro');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        setError(axiosError.response?.data?.message || 'E-mail ou senha incorretos.');
      } else {
        setError('Erro ao conectar ao servidor. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <SEO
        title="Acesso ao Sistema | Área Restrita"
        description="Acesse o portal do associado ASTEO-MT para obter suporte, certidões e material exclusivo."
        path="/login"
      />
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">ASTEO-MT</h1>
          <p className="login-subtitle">Acesse sua conta de associado</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div className="form-field">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar no Portal'}
          </button>
        </form>

        <div className="login-footer">
          <button
            type="button"
            className="btn-forgot-link"
            onClick={() => setIsModalOpen(true)}
            style={{ color: 'var(--gov-blue-dark)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}
          >
            🔑 Esqueceu a senha? Receba por e-mail
          </button>
          <p style={{ marginTop: '12px', fontSize: '0.88rem', color: '#64748b' }}>
            Ainda não é filiado? <Link to="/registro" style={{ color: '#004b82', fontWeight: 600 }}>Filiar-se agora</Link>
          </p>
        </div>
      </div>

      <EsqueciSenhaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Login;
