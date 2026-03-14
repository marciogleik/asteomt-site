import './SubPage.css';

export function Eventos() {
  return (
    <div className="subpage-container">
      <header className="subpage-header">
        <div className="container">
          <h1>Próximos Eventos</h1>
          <p>Fique por dentro dos congressos, workshops e encontros da categoria.</p>
        </div>
      </header>

      <main className="container subpage-content">
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <h2>Nenhum evento agendado no momento</h2>
          <p>Estamos planejando o calendário de 2026. Acompanhe nossas redes sociais e este portal para não perder nenhuma novidade.</p>
        </div>
      </main>
    </div>
  );
}

export default Eventos;
