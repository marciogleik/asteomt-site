import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logoImg from '../assets/images/logo-asteomt.png';
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiFileText, FiCalendar, FiUsers, FiAward, FiMail } from 'react-icons/fi';
import './Header.css';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
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
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <img src={logoImg} alt="ASTEOMT" className="logo-img" />
          <div className="logo-text">
            <span className="site-title">ASTEOMT</span>
            <span className="site-subtitle">Associação dos Técnicos de Imobilizações Ortopédicas de MT</span>
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
                <span className="nav-icon">{link.icon}</span>
                {link.text}
              </Link>
            ))}
          </div>

          <div className="user-actions">
            {isAuthenticated ? (
              <>
                <div className="user-profile">
                  <span className="user-avatar">
                    <FiUser />
                  </span>
                  <span className="user-name">{user?.name || 'Usuário'}</span>
                </div>
                <Link to="/area-membro" className="btn-member" onClick={closeMenu}>
                  Área do Membro
                </Link>
                <button onClick={() => { logout(); closeMenu(); }} className="btn-logout">
                  <FiLogOut /> Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-login" onClick={closeMenu}>
                  <FiUser /> Entrar
                </Link>
                <Link to="/registro" className="btn-register" onClick={closeMenu}>
                  Filiar-se
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
