import { SEO } from '../components/SEO';
import './SubPage.css';

export function Sobre() {
  return (
    <div className="subpage-container animate-fade-in">
      <SEO
        title="Sobre a ASTEO-MT"
        description="Conheça a história, missão, visão e valores da ASTEO-MT. Representando e defendendo os técnicos de imobilizações ortopédicas de Mato Grosso desde 2007."
        path="/sobre"
      />
      <header className="subpage-header">
        <div className="container">
          <h1>Sobre a ASTEO-MT</h1>
          <p>Conheça nossa história, missão e valores.</p>
        </div>
      </header>

      <main className="container subpage-content">
        <section className="content-section">
          <h2>Nossa História e Registro Oficial</h2>
          <p>
            A <strong>Associação Matogrossense dos Técnicos em Imobilizações Ortopédicas (ASTEO-MT)</strong> foi fundada oficialmente em Assembleia Geral no ano de 2006, em Água Boa - MT, com Estatuto Social registrado e averbado sob o <strong>Registro nº 241 (Livro A / Livro 03, Averbação nº 1210)</strong> no Cartório do 2º Ofício de Registro Civil de Pessoas Jurídicas.
          </p>
          <p>
            Inscrita no CNPJ sob o nº <strong>08.629.251/0001-41</strong>, a entidade tem por finalidade representar, qualificar e defender os direitos e deveres dos técnicos em imobilização ortopédica em todo o estado de Mato Grosso e no território nacional.
          </p>
        </section>

        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎯</span>
            <h3>Missão</h3>
            <p>Representar, defender e valorizar os técnicos em imobilização ortopédica, promovendo a capacitação contínua e a excelência no atendimento à saúde.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">👁️</span>
            <h3>Visão</h3>
            <p>Ser a entidade de referência na regulamentação e valorização profissional da categoria em Mato Grosso, assegurando ética e segurança hospitalar.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🤝</span>
            <h3>Valores</h3>
            <p>Ética profissional, transparência jurídica e estatutária, responsabilidade com a saúde pública e fraternidade da categoria.</p>
          </div>
        </div>

        {/* Seção CBO 3226-05 */}
        <section className="content-section" style={{ marginTop: '3rem', background: '#ffffff', padding: '2.5rem', borderRadius: '12px', borderLeft: '6px solid var(--gov-blue-dark)', boxShadow: 'var(--shadow-md)' }}>
          <h2 style={{ color: 'var(--gov-blue-dark)', fontSize: '1.6rem', marginBottom: '1rem' }}>
            🏷️ Classificação Brasileira de Ocupações (CBO 3226-05)
          </h2>
          <p style={{ marginBottom: '1.25rem', fontSize: '1rem', color: '#444' }}>
            Conforme determinação do Ministério do Trabalho e Emprego (MTE) e disposto no Estatuto Social da ASTEO-MT, o código ocupacional oficial da categoria é o <strong>CBO 3226-05 — Técnico de Imobilização Ortopédica</strong>.
          </p>

          <h3 style={{ fontSize: '1.15rem', color: 'var(--gov-blue-dark)', margin: '1.25rem 0 0.5rem' }}>Áreas de Atuação Profissional:</h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#555', marginBottom: '1.5rem', lineHeight: '1.8' }}>
            <li>Organização e manutenção da sala de imobilizações ortopédicas.</li>
            <li>Preparo do cliente e orientação sobre o procedimento prescrito.</li>
            <li>Confecção de imobilizações (gesso convencional, gesso sintético, talas e órteses).</li>
            <li>Retirada e substituição de imobilizações sob supervisão médica.</li>
            <li>Execução de procedimentos auxiliares e aplicação rigorosa de biossegurança.</li>
          </ul>

          <h3 style={{ fontSize: '1.15rem', color: 'var(--gov-blue-dark)', margin: '1.25rem 0 0.5rem' }}>Competências Estatutárias:</h3>
          <p style={{ color: '#555', lineHeight: '1.7' }}>
            Atuação com ética, discernimento, liderança em equipe, capacidade de primeiros socorros, empatia e compromisso com o constante aprimoramento técnico e científico.
          </p>
        </section>

        {/* Transparência e Estatuto */}
        <section className="content-section" style={{ marginTop: '2.5rem', background: 'var(--gov-blue-light)', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--gov-blue-dark)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
            📄 Estatuto Social e Transparência Jurídica
          </h3>
          <p style={{ color: '#555', marginBottom: '1.5rem', maxWidth: '700px', margin: '0 auto 1.5rem' }}>
            Acesse as diretrizes aprovadas em Assembleia Geral Extraordinária e registradas em cartório oficial.
          </p>
          <a
            href="/site.webmanifest"
            onClick={(e) => {
              e.preventDefault();
              alert("ASTEO-MT: O Estatuto Social registrado (CNPJ 08.629.251/0001-41) está disponível para consulta e download na Área do Membro.");
            }}
            className="btn-primary"
            style={{ display: 'inline-block', padding: '0.85rem 2rem', borderRadius: '6px', textTransform: 'uppercase', fontWeight: 800 }}
          >
            Consultar Registro Estatutário
          </a>
        </section>
      </main>
    </div>
  );
}

export default Sobre;
