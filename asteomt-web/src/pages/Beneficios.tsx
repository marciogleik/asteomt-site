import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlusCircle } from 'react-icons/fi';
import dumaLogo from '../assets/images/parceiros/duma-logo.png';
import unifaccLogo from '../assets/images/noticias/parceria-unifacc.png';
import './Beneficios.css';

export function Beneficios() {
  // Rolar para o topo ao carregar a página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="beneficios-page">
      {/* Hero Section */}
      <section className="beneficios-hero">
        <div className="container">
          <div className="hero-content">
            <span className="benefit-badge">Portfólio de Vantagens</span>
            <h1>Vantagens e Convênios Exclusivos</h1>
            <p>
              Ser um associado da ASTEO-MT é ter acesso a uma rede de cuidados, 
              formação e economia para você e sua família.
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Main Benefits Grid */}
        <div className="beneficios-grid">
          {/* Duma Card */}
          <div className="benefit-card">
            <div className="benefit-tag">Saúde Mental</div>
            <div className="benefit-logo-box">
              <img src={dumaLogo} alt="Duma Psicologia e Saúde" />
            </div>
            <div className="benefit-content">
              <h3>Duma Psicologia</h3>
              <p>
                Terapia online de alta performance com condições especiais para associados ativos, cônjuges e filhos. 
                Cuidado psicológico qualificado com padrão de excelência e confidencialidade.
              </p>
              <Link to="/noticias" className="btn-member benefit-btn">Ver Detalhes do Convênio</Link>
            </div>
          </div>

          {/* UNIFACC Card */}
          <div className="benefit-card">
            <div className="benefit-tag">Educação e Carreira</div>
            <div className="benefit-logo-box">
              <img src={unifaccLogo} alt="UNIFACC Cuiabá" />
            </div>
            <div className="benefit-content">
              <h3>UNIFACC Cuiabá</h3>
              <p>
                Descontos exclusivos em cursos de graduação, pós-graduação e extensão. 
                Fortaleça seu currículo com a parceria institucional de uma das maiores faculdades da região.
              </p>
              <Link to="/noticias" className="btn-member benefit-btn">Saiba como utilizar</Link>
            </div>
          </div>
        </div>

        {/* Coming Soon / Expansion Section */}
        <div className="expansion-banner">
          <div className="expansion-icon">
            <FiPlusCircle />
          </div>
          <h2>Nossa Rede está Crescendo!</h2>
          <p>
            Estamos em negociações avançadas com parceiros estratégicos para oferecer ainda 
            mais descontos e facilidades no seu dia a dia profissional e pessoal.
          </p>
          <div className="expansion-list">
            <div className="expansion-item">Farmácias Regionais</div>
            <div className="expansion-item">Lazer e Clubes</div>
            <div className="expansion-item">Seguros de Vida</div>
            <div className="expansion-item">Planos Odontológicos</div>
            <div className="expansion-item">Assessorias Jurídicas</div>
          </div>
          
          <div style={{ marginTop: '3rem' }}>
            <Link to="/registro" className="btn-register" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
              Filiar-se agora e aproveitar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
