import './SubPage.css';

export function Sobre() {
  return (
    <div className="subpage-container animate-fade-in">
      <header className="subpage-header">
        <div className="container">
          <h1>Sobre a ASTEO-MT</h1>
          <p>Conheça nossa história, missão e valores.</p>
        </div>
      </header>

      <main className="container subpage-content">
        <section className="content-section">
          <h2>Nossa História</h2>
          <p>
            A Associação Matogrossense dos Técnicos de Imobilizações Ortopédicas (ASTEO-MT) nasceu da necessidade de união e representatividade para uma categoria essencial no sistema de saúde. Fundada em 2007, a entidade tem sido o suporte para os profissionais que atuam na ponta do atendimento ortopédico.
          </p>
          <p>
            Ao longo de quase duas décadas, lideramos debates sobre a regulamentação profissional e investimos na qualificação técnica constante dos nossos associados, garantindo segurança e excelência nos hospitais e clínicas de Mato Grosso.
          </p>
        </section>

        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎯</span>
            <h3>Missão</h3>
            <p>Representar, defender e valorizar os técnicos de imobilização ortopédica, promovendo o desenvolvimento técnico e científico da categoria.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">👁️</span>
            <h3>Visão</h3>
            <p>Ser referência nacional em representatividade técnica, garantindo que todo hospital em Mato Grosso conte com profissionais qualificados e reconhecidos.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🤝</span>
            <h3>Valores</h3>
            <p>Ética profissional, transparência institucional, compromisso com a saúde pública e excelência técnica.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Sobre;
