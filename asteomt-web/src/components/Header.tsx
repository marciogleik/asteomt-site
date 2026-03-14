import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logoImg from '../assets/images/logo-asteomt.png';
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiFileText, FiCalendar, FiUsers, FiAward, FiMail } from 'react-icons/fi';
import './Header.css';

export function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: "/", text: "Início", icon: <FiHome /> },
    { to: "/sobre", text: "Sobre Nós", icon: <FiUsers /> },
    { to: "/noticias", text: "Notícias", icon: <FiFileText /> },
    { to: "/eventos", text: "Eventos", icon: <FiCalendar /> },
    { to: "/cursos", text: "Cursos", icon: <FiAward /> },
    { to: "/contato", text: "Contato", icon: <FiMail /> },
  ];

  return (
    <>
      <div className="gov-bar">
        <div className="container gov-bar-content">
          <div className="gov-flag">
            <span className="gov-flag-img">🇧🇷</span>
            <span>BRASIL</span>
          </div>
          <div className="gov-links">
            <a href="https://www.gov.br/pt-br/orgaos-do-governo" target="_blank" rel="noopener noreferrer">Órgãos do Governo</a>
            <a href="https://www.gov.br/access-keys" target="_blank" rel="noopener noreferrer">Acessibilidade</a>
          </div>
        </div>
      </div>

      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          <Link to="/" className="logo-link" onClick={closeMenu}>
            <img src={logoImg} alt="ASTEOMT" className="logo-img" />
            <div className="logo-text">
              <span className="site-title">ASTEOMT</span>
              <span className="site-subtitle">Associação Matogrossense dos Técnicos de Imobilizações Ortopédicas</span>
            </div>
          </Link>

          <button className="mobile-menu-button" onClick={toggleMenu} aria-label="Menu">
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <div className="nav-links">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {link.text}
                </Link>
              ))}
            </div>

            <div className="user-actions">
              {isAuthenticated ? (
                <div className="auth-group">
                  <Link to="/area-membro" className="btn-member" onClick={closeMenu}>
                    <FiUser /> Área do Membro
                  </Link>
                  <button onClick={() => { logout(); closeMenu(); }} className="btn-logout" title="Sair">
                    <FiLogOut />
                  </button>
                </div>
              ) : (
                <div className="auth-group">
                  <Link to="/login" className="btn-login" onClick={closeMenu}>
                    Entrar
                  </Link>
                  <Link to="/registro" className="btn-register" onClick={closeMenu}>
                    Filiar-se
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
      <div className="header-spacer"></div>
    </>
  );
}
