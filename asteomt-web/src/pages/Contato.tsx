import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import './SubPage.css';

export function Contato() {
  return (
    <div className="subpage-container animate-fade-in">
      <SEO
        title="Fale Conosco e Atendimento"
        description="Entre em contato com a ASTEO-MT. Canais oficiais de atendimento por e-mail, telefone e WhatsApp para associados e dúvidas de filiação."
        path="/contato"
      />
      <header className="subpage-header">
        <div className="container">
          <h1>Fale Conosco</h1>
          <p>Estamos aqui para tirar suas dúvidas e ouvir suas sugestões.</p>
        </div>
      </header>

      <main className="container subpage-content">
        <div className="contact-grid">
          <div>
            <h2 style={{ color: 'var(--gov-blue-dark)', marginBottom: '2.5rem', fontSize: '2rem', fontWeight: 800 }}>Informações</h2>
            <div className="contact-info">
              <div className="info-item">
                <FiMail className="info-icon" />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)' }}>E-mail</strong>
                  <a href="mailto:asteo.mt@hotmail.com" style={{ fontWeight: 600 }}>asteo.mt@hotmail.com</a>
                </div>
              </div>
              <div className="info-item">
                <FiPhone className="info-icon" />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Telefone / WhatsApp</strong>
                  <a href="tel:+5566999849974" style={{ fontWeight: 600 }}>(66) 9 9984-9974</a>
                </div>
              </div>
              <div className="info-item">
                <FiMapPin className="info-icon" />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Sede</strong>
                  <span style={{ fontWeight: 600 }}>Cuiabá - Mato Grosso</span>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form">
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--gov-blue-dark)', fontWeight: 800 }}>Envie uma mensagem</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Preencha o formulário abaixo e retornaremos em breve.</p>
            
            <div className="form-group">
              <input type="text" placeholder="Seu Nome" className="form-input" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Seu E-mail" className="form-input" />
            </div>
            <div className="form-group">
              <textarea placeholder="Sua Mensagem" rows={5} className="form-input"></textarea>
            </div>
            
            <button type="button" className="btn-submit" onClick={() => alert('Funcionalidade em desenvolvimento.')}>
              ENVIAR MENSAGEM
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Contato;
