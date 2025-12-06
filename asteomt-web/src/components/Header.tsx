import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logoImg from '../assets/images/logo-asteomt.png';
import './Header.css';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo-link">
          <img src={logoImg} alt="ASTEO-MT" className="logo-img" />
          <span className="site-title">ASTEO-MT</span>
        </Link>

        <nav className="nav">
          <Link to="/noticias" className="nav-link">
            Notícias
          </Link>
          {isAuthenticated ? (
            <>
              <span className="user-name">Olá, {user?.name}</span>
              <Link to="/area-membro" className="nav-link">
                Área do Membro
              </Link>
              <button onClick={logout} className="btn-logout">
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-login">
              Entrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
