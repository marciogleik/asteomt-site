import { FiBookOpen, FiCheck, FiPlusCircle } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import unifaccLogo from '../assets/images/noticias/parceria-unifacc.png';
import './SubPage.css';
import './Cursos.css';

export function Cursos() {
  return (
    <div className="subpage-container">
      <SEO
        title="Cursos e Qualificação Profissional"
        description="Oportunidades de formação contínua, graduação, pós-graduação e especialização técnica para os associados ASTEO-MT através de parcerias com faculdades de referência."
        path="/cursos"
      />
      <header className="subpage-header">
        <div className="container">
          <h1>Formação e Carreira</h1>
          <p>Oportunidades de qualificação e crescimento profissional para nossos associados.</p>
        </div>
      </header>

      <main className="container subpage-content">
        <div className="courses-container">
          {/* UNIFACC Partnership Card */}
          <section className="partnership-card">
            <div className="partnership-header">
              <img src={unifaccLogo} alt="UNIFACC Cuiabá" className="partnership-logo" />
              <span className="benefit-tag">Parceria Institucional</span>
            </div>
            
            <div className="partnership-content">
              <h3>UNIFACC Cuiabá</h3>
              <p>
                Através desta parceria estratégica, os associados da ASTEO-MT possuem descontos exclusivos 
                em diversos cursos. Uma oportunidade única de elevar seu nível técnico e acadêmico 
                com o suporte de uma instituição de referência na região.
              </p>
              
              <div className="course-topics">
                <div className="topic-item">
                  <FiCheck className="topic-icon" /> <span>Graduação em diversas áreas</span>
                </div>
                <div className="topic-item">
                  <FiCheck className="topic-icon" /> <span>Pós-Graduação e Especializações</span>
                </div>
                <div className="topic-item">
                  <FiCheck className="topic-icon" /> <span>Cursos de Extensão Técnica</span>
                </div>
                <div className="topic-item">
                  <FiCheck className="topic-icon" /> <span>Cursos EAD e Presenciais</span>
                </div>
              </div>

              <a href="https://unifaccuiaba.com.br" target="_blank" rel="noopener noreferrer" className="btn-visit">
                <FiBookOpen /> Conhecer Cursos na UNIFACC
              </a>
            </div>
          </section>

          {/* Future Courses Placeholder */}
          <div className="empty-state" style={{ marginTop: '5rem', background: 'transparent' }}>
            <div className="empty-state-icon">
              <FiPlusCircle style={{ color: 'var(--gov-blue)', opacity: 0.5 }} />
            </div>
            <h2 style={{ color: '#888' }}>Novos Cursos em Breve</h2>
            <p style={{ color: '#999', maxWidth: '500px', margin: '0 auto' }}>
              Estamos estruturando uma grade de cursos técnicos específicos para Imobilizações Ortopédicas. Fique atento às nossas atualizações.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cursos;
