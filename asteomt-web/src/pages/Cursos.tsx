import './SubPage.css';

export function Cursos() {
  return (
    <div className="subpage-container">
      <header className="subpage-header">
        <div className="container">
          <h1>Capacitação Técnica</h1>
          <p>Cursos de atualização e formação para técnicos em imobilização.</p>
        </div>
      </header>

      <main className="container subpage-content">
        <div className="empty-state">
          <div className="empty-state-icon">🎓</div>
          <h2>Em busca de novas parcerias</h2>
          <p>Em breve disponibilizaremos uma nova grade de cursos certificados. A ASTEO-MT está trabalhando para oferecer o melhor em formação técnica para você.</p>
        </div>
      </main>
    </div>
  );
}

export default Cursos;
