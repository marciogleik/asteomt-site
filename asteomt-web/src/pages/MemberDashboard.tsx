import { useAuth } from '../contexts/AuthContext';
import { FiUser, FiFileText, FiAward, FiSettings, FiGrid, FiLogOut, FiCreditCard } from 'react-icons/fi';
import './MemberDashboard.css';

export function MemberDashboard() {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'overview', icon: <FiGrid />, label: 'Visão Geral', active: true },
    { id: 'profile', icon: <FiUser />, label: 'Meu Perfil' },
    { id: 'documents', icon: <FiFileText />, label: 'Documentos' },
    { id: 'certificates', icon: <FiAward />, label: 'Certificados' },
    { id: 'payments', icon: <FiCreditCard />, label: 'Anuidades' },
    { id: 'settings', icon: <FiSettings />, label: 'Configurações' },
  ];

  return (
    <div className="member-layout animate-fade-in">
      <aside className="member-sidebar">
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              className={`sidebar-link ${item.active ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div style={{ marginTop: 'auto', padding: '0 1rem' }}>
          <button onClick={logout} className="sidebar-link" style={{ width: '100%', cursor: 'pointer', border: 'none', background: 'none' }}>
            <span className="sidebar-icon"><FiLogOut /></span>
            Sair da Conta
          </button>
        </div>
      </aside>

      <main className="member-main">
        <header className="dashboard-hero">
          <h1>Bem-vindo, {user?.name.split(' ')[0]}</h1>
          <p>Seja bem-vindo ao portal exclusivo do associado ASTEO-MT.</p>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper"><FiAward /></div>
            <div className="stat-info">
              <h4>Status Profissional</h4>
              <div className="stat-value">
                <span className="status-badge status-active">Ativo</span>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper"><FiFileText /></div>
            <div className="stat-info">
              <h4>Anuidade 2026</h4>
              <div className="stat-value">Registrada</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper"><FiAward /></div>
            <div className="stat-info">
              <h4>Certificados</h4>
              <div className="stat-value">04 Ativos</div>
            </div>
          </div>
        </section>

        <div className="services-panel">
          <div className="panel-card">
            <div className="panel-header">
              <h3>Meus Dados</h3>
              <FiUser />
            </div>
            <div className="panel-body">
              <div className="panel-list">
                <div className="panel-item">
                  <span className="item-label">Email:</span>
                  <span className="item-value">{user?.email}</span>
                </div>
                <div className="panel-item">
                  <span className="item-label">Membro desde:</span>
                  <span className="item-value">Out/2025</span>
                </div>
              </div>
              <button className="btn-panel">Editar Informações</button>
            </div>
          </div>

          <div className="panel-card">
            <div className="panel-header">
              <h3>Área Técnica</h3>
              <FiFileText />
            </div>
            <div className="panel-body">
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                Acesse guias e normas atualizadas sobre imobilização ortopédica em Mato Grosso.
              </p>
              <button className="btn-panel">Acessar Material</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MemberDashboard;
