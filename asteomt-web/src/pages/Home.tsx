import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import leonardoImg from '../assets/images/leonardo-ribeiro.jpg';
import heroBackground from '../assets/images/noticias/audiencia-2.jpg';
import './Home.css';

export function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home">
      {/* Hero Section - Centralizada */}
      <section className="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Associação Matogrossense dos Técnicos de<br />
            <span className="highlight">Imobilizações Ortopédicas</span>
          </h1>
          <p className="hero-subtitle">
            Conectando profissionais, fortalecendo a categoria e promovendo o desenvolvimento técnico-científico.
          </p>
          <div className="hero-actions">
            {isAuthenticated ? (
              <Link to="/area-membro" className="btn-primary">
                Acessar Área do Membro
              </Link>
            ) : (
              <>
                <Link to="/registro" className="btn-primary">
                  Filiar-se
                </Link>
                <Link to="/login" className="btn-secondary">
                  Já sou membro
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Sobre Section - Centralizada */}
      <section id="sobre" className="about">
        <div className="section-content">
          <h2 className="section-title">Sobre a ASTEO-MT</h2>
          <h3 className="section-subtitle">
            Transformando a Imobilização Ortopédica em Mato Grosso com Dedicação, União e Valorização Profissional
          </h3>
          <div className="about-text">
            <p>
              A <strong>ASTEO MT</strong> – Associação dos Técnicos em Imobilização Ortopédica do Estado de Mato Grosso – 
              foi fundada em 2007 por <strong>Leonardo Leite Ribeiro</strong>, com o objetivo de unir e qualificar 
              profissionais da área, garantindo reconhecimento e respeito pelo trabalho realizado.
            </p>
            <p>
              A associação atua promovendo cursos, campanhas de valorização e parcerias estratégicas, como com a 
              <strong> Sociedade Brasileira de Ortopedia</strong>, reforçando o papel essencial dos técnicos ao lado 
              dos médicos ortopedistas. Além disso, luta pelo reconhecimento da profissão, regulamentação da atividade 
              e defesa dos interesses da categoria em todo o estado de Mato Grosso.
            </p>
          </div>
        </div>
      </section>

      {/* Fundador Section */}
      <section className="founder">
        <div className="section-content">
          <div className="founder-card">
            <div className="founder-avatar">
              <img src={leonardoImg} alt="Leonardo Leite Ribeiro" />
            </div>
            <div className="founder-info">
              <span className="founder-label">Fundador e Presidente da ASTEO-MT</span>
              <h3 className="founder-name">Leonardo Leite Ribeiro</h3>
              <div className="founder-bio">
                <p>
                  Leonardo Leite Ribeiro é o fundador e atual presidente da ASTEO-MT. Profissional altamente 
                  respeitado em sua área, atua como <strong>Técnico em Imobilização Ortopédica</strong> e 
                  dedica-se ao fortalecimento e valorização da categoria no estado de Mato Grosso.
                </p>
                <p>
                  Além de sua liderança na associação, Leonardo exerce um papel relevante na administração 
                  pública de Água Boa, onde atua como <strong>Secretário Municipal de Desenvolvimento Econômico, 
                  Agricultura e Turismo</strong>. Sua experiência multidisciplinar e seu comprometimento com o 
                  desenvolvimento regional fazem dele uma referência tanto no setor técnico quanto no âmbito institucional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios Section - Centralizada */}
      <section className="benefits">
        <div className="section-content">
          <h2 className="section-title">Benefícios para Associados</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">📄</div>
              <h3>Documentos Exclusivos</h3>
              <p>Acesso a materiais técnicos, normas e documentos da categoria.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📰</div>
              <h3>Notícias e Atualizações</h3>
              <p>Fique por dentro das novidades e eventos da área.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎓</div>
              <h3>Certificados</h3>
              <p>Comprovantes de associação e participação em eventos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="contact">
        <div className="section-content">
          <h2 className="section-title">Entre em Contato</h2>
          <p className="contact-intro">
            Ficou com dúvidas sobre a associação? Entre em contato conosco para saber mais sobre 
            afiliação, cursos, benefícios para associados e a defesa dos seus direitos profissionais.
          </p>
          
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <h3>E-mail Geral</h3>
              <p>Para dúvidas gerais sobre a ASTEO MT, afiliação e atividades da diretoria.</p>
              <a href="mailto:asteo.mt@hotmail.com" className="contact-link">
                asteo.mt@hotmail.com
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <h3>Telefone</h3>
              <p>Atendimento via WhatsApp ou ligação.</p>
              <a href="https://wa.me/5566999849974" target="_blank" rel="noopener noreferrer" className="contact-link">
                (66) 9 9984-9974
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </div>
              <h3>Instagram</h3>
              <p>Siga-nos para novidades, eventos e conteúdos exclusivos.</p>
              <a href="https://www.instagram.com/asteo.mtt/" target="_blank" rel="noopener noreferrer" className="contact-link">
                @asteo.mtt
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
