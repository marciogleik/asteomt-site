import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import logoImg from '../assets/images/logo-asteomt.png';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src={logoImg} alt="ASTEOMT Logo" className="footer-logo" />
            <div className="footer-brand-text">
              <h3 className="footer-title">ASTEOMT</h3>
              <p className="footer-subtitle">Associação dos Técnicos de Imobilizações Ortopédicas de MT</p>
            </div>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Institucional</h4>
            <ul>
              <li><Link to="/">Início</Link></li>
              <li><Link to="/sobre">Sobre Nós</Link></li>
              <li><Link to="/noticias">Notícias</Link></li>
              <li><Link to="/contato">Contato</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Serviços</h4>
            <ul>
              <li><Link to="/registro">Filiação</Link></li>
              <li><Link to="/cursos">Cursos</Link></li>
              <li><Link to="/eventos">Eventos</Link></li>
              <li><Link to="/area-membro">Área do Membro</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Contato & Transparência</h4>
            <ul className="contact-list">
              <li>
                <FiMail className="contact-icon" />
                <a href="mailto:asteo.mt@hotmail.com">asteo.mt@hotmail.com</a>
              </li>
              <li>
                <FiPhone className="contact-icon" />
                <a href="tel:+5566999849974">(66) 99984-9974 / (66) 3468-3792</a>
              </li>
              <li>
                <FiMapPin className="contact-icon" />
                <span>Rua 18, nº 895, Guarujá - Água Boa / MT (CEP 78635-000)</span>
              </li>
            </ul>
            <div className="footer-legal-badge" style={{ marginTop: '12px', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.4' }}>
              <p><strong>CNPJ:</strong> 08.629.251/0001-41</p>
              <p><strong>Registro Civil:</strong> Cartório 2º Ofício nº 241 - Livro A</p>
              <p><strong>CBO MTE:</strong> 3226-05</p>
            </div>
            <div className="social-links" style={{ marginTop: '12px' }}>
              <a href="https://www.instagram.com/asteo.mtt/" target="_blank" rel="noopener noreferrer"><FiInstagram /></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><FiFacebook /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container flex-between">
          <p>© {new Date().getFullYear()} ASTEO-MT. Associação Matogrossense dos Técnicos em Imobilizações Ortopédicas. Todos os direitos reservados.</p>
          <div className="footer-legal">
            <Link to="/privacidade">Privacidade</Link>
            <Link to="/termos">Termos de Uso</Link>
          </div>
        </div>
      </div>

      <div className="gov-footer-bar">
        <div className="container">
          <div className="gov-stamps">
            <span className="gov-stamp">ESTADO DE MATO GROSSO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
