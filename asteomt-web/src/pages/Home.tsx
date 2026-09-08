import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { NOTICIAS } from '../data/noticias';
import { SEO } from '../components/SEO';
import leonardoImg from '../assets/images/leonardo-ribeiro.jpg';
import heroBackground from '../assets/images/noticias/home-hero.png';
import dumaLogo from '../assets/images/parceiros/duma-logo.png';
import unifaccLogo from '../assets/images/noticias/parceria-unifacc.png';
import './Home.css';

export function Home() {
  const { isAuthenticated } = useAuth();
  const recentNews = NOTICIAS.slice(0, 3);
  
  return (
    <div className="home animate-fade-in">
      <SEO
        title="Associação Matogrossense dos Técnicos de Imobilizações Ortopédicas"
        description="ASTEO-MT: Instituição representativa dedicada ao fortalecimento, valorização e desenvolvimento técnico-científico dos profissionais de imobilização ortopédica em Mato Grosso."
        path="/"
      />
      {/* Banner / Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
        <div className="hero-overlay"></div>
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-tag">MATO GROSSO</span>
            <h1 className="hero-title">
              Associação Matogrossense dos Técnicos de <strong>Imobilizações Ortopédicas</strong>
            </h1>
            <p className="hero-subtitle">
              Instituição representativa dedicada ao fortalecimento, valorização e desenvolvimento técnico-científico da categoria no estado.
            </p>
            <div className="hero-actions">
              {isAuthenticated ? (
                <Link to="/area-membro" className="btn-primary">
                  ÁREA DO MEMBRO
                </Link>
              ) : (
                <>
                  <Link to="/registro" className="btn-primary">
                    FILIAR-SE AGORA
                  </Link>
                  <Link to="/login" className="btn-outline">
                    Acesso ao Sistema
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access / Serviços */}
      <section className="quick-access">
        <div className="container">
          <div className="access-grid">
            <Link to="/noticias" className="access-item">
              <div className="access-icon">📰</div>
              <span>Notícias</span>
            </Link>
            <Link to="/cursos" className="access-item">
              <div className="access-icon">🎓</div>
              <span>Cursos</span>
            </Link>
            <Link to="/eventos" className="access-item">
              <div className="access-icon">📅</div>
              <span>Eventos</span>
            </Link>
            <Link to="/contato" className="access-item">
              <div className="access-icon">📞</div>
              <span>Contato</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Destaque Notícia Recente */}
      <section className="news-section-home">
        <div className="container">
          <div className="news-section-header">
            <div>
              <h2 className="section-title">Últimas Atualizações</h2>
              <p className="section-desc">Acompanhe as ações e conquistas da ASTEO-MT</p>
            </div>
            <Link to="/noticias" className="btn-outline" style={{ borderColor: 'var(--gov-blue-dark)', color: 'var(--gov-blue-dark)' }}>
              Ver todas as notícias
            </Link>
          </div>
          
          <div className="home-news-grid">
            {recentNews.map((noticia) => (
              <Link to="/noticias" key={noticia.id} className="home-news-card">
                {noticia.galeria && noticia.galeria.length > 0 && (
                  <div className="home-news-img-wrapper">
                    <img src={noticia.galeria[0]} alt={noticia.titulo} className="home-news-img" />
                    <span className="home-news-badge">{noticia.badge}</span>
                  </div>
                )}
                <div className="home-news-content">
                  <span className="home-news-date">{noticia.data}</span>
                  <h3 className="home-news-title">{noticia.titulo}</h3>
                  <p className="home-news-intro">{noticia.intro}</p>
                  <span className="home-news-read-more">Ler mais →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destaques / Sobre */}
      <section className="highlights">
        <div className="container">
          <div className="highlights-header">
            <h2 className="section-title">A Instituição</h2>
            <p className="section-desc">Conheça a história e os objetivos da ASTEO-MT na defesa dos profissionais.</p>
          </div>

          <div className="highlights-content">
            <div className="highlight-text">
              <p>
                A <strong>ASTEO-MT</strong> (Associação dos Técnicos em Imobilização Ortopédica do Estado de Mato Grosso)
                é uma entidade sem fins lucrativos fundada com o propósito de nortear, representar e defender os interesses
                dos profissionais que atuam na área de imobilizações.
              </p>
              <p>
                Desde sua fundação em 2007, temos trabalhado incansavelmente pela regulamentação da profissão,
                promoção de cursos de atualização e estabelecimento de parcerias técnicas que garantam a excelência
                no atendimento à população mato-grossense.
              </p>
              <Link to="/sobre" className="btn-text">Ver mais sobre a história →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Benefits Section */}
      <section className="partners-section" id="beneficios">
        <div className="container">
          <div className="partners-header">
            <h2 className="section-title">Parcerias e Benefícios</h2>
            <p className="section-desc">Vantagens exclusivas para os nossos associados e seus familiares.</p>
          </div>

          <div className="partners-grid">
            {/* Duma Card */}
            <div className="partner-card">
              <div className="partner-logo-wrapper">
                <img src={dumaLogo} alt="Duma Psicologia e Saúde" className="partner-logo" />
              </div>
              <div className="partner-info">
                <h3 className="partner-title">Duma Psicologia</h3>
                <p className="partner-desc">
                  Terapia online especializada para adultos, casais e grupos com condições exclusivas para associados e familiares.
                </p>
                <Link to="/noticias" className="btn-partner">Saiba mais</Link>
              </div>
            </div>

            {/* UNIFACC Card */}
            <div className="partner-card">
              <div className="partner-logo-wrapper">
                <img src={unifaccLogo} alt="UNIFACC" className="partner-logo" />
              </div>
              <div className="partner-info">
                <h3 className="partner-title">UNIFACC Cuiabá</h3>
                <p className="partner-desc">
                  Parceria institucional para fortalecimento profissional, cursos de extensão e desenvolvimento acadêmico.
                </p>
                <Link to="/noticias" className="btn-partner">Saiba mais</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liderança / Presidente */}
      <section className="leadership">
        <div className="container">
          <div className="leadership-card">
            <div className="leadership-img-wrapper">
              <img src={leonardoImg} alt="Leonardo Leite Ribeiro" className="leadership-img" />
            </div>
            <div className="leadership-info">
              <span className="leadership-label">PRESIDÊNCIA</span>
              <h3 className="leadership-name">Leonardo Leite Ribeiro</h3>
              <p className="leadership-quote">
                "Nosso compromisso é com a dignidade do profissional e com a qualidade técnica que oferecemos à sociedade.
                Unidos somos mais fortes para conquistar o reconhecimento que nossa categoria merece."
              </p>
              <div className="leadership-bio">
                <p>Técnico em Imobilização Ortopédica e Presidente da ASTEO-MT desde sua fundação.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Informativos CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-content">
              <h2>Mantenha sua documentação em dia</h2>
              <p>Associados têm acesso a certificados online, material técnico exclusivo e suporte jurídico.</p>
            </div>
            <Link to="/registro" className="btn-accent">QUERO SER ASSOCIADO</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
