import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { redefinirSenha } from '../lib/supabase';
import './Login.css';

const SENHA_MINIMA = 8; // mesmo mínimo da Edge Function recuperar-senha

// Destino do link enviado por e-mail pela Edge Function recuperar-senha
export function RedefinirSenha() {
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (senha.length < SENHA_MINIMA) {
      setErro(`A senha precisa ter pelo menos ${SENHA_MINIMA} caracteres.`);
      return;
    }
    if (senha !== confirmar) {
      setErro('As senhas não são iguais.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await redefinirSenha(token, senha);
      setSucesso(res.message);
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro ao alterar a senha. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <SEO
        title="Criar nova senha | ASTEO-MT"
        description="Crie uma nova senha de acesso ao portal do associado ASTEO-MT."
        path="/redefinir-senha"
      />
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Nova senha</h1>
          <p className="login-subtitle">Crie uma nova senha para o portal do associado</p>
        </div>

        {!token ? (
          <div className="login-error" role="alert">
            Link inválido. Peça uma nova recuperação de senha na tela de login.
          </div>
        ) : sucesso ? (
          <div className="login-success" role="status">{sucesso}</div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            {erro && <div className="login-error" role="alert">{erro}</div>}

            <div className="form-field">
              <label htmlFor="nova-senha">Nova senha</label>
              <input
                type="password"
                id="nova-senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder={`Mínimo ${SENHA_MINIMA} caracteres`}
                autoComplete="new-password"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="confirmar-senha">Repita a nova senha</label>
              <input
                type="password"
                id="confirmar-senha"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                placeholder="Digite a senha de novo"
                autoComplete="new-password"
                required
              />
            </div>

            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar nova senha'}
            </button>
          </form>
        )}

        <div className="login-footer">
          <Link to="/login">Ir para o login</Link>
        </div>
      </div>
    </div>
  );
}

export default RedefinirSenha;
