import { useAuth } from '../contexts/AuthContext';
import './MemberDashboard.css';

export function MemberDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Área do Membro</h1>
        <p>Bem-vindo(a), <strong>{user?.name}</strong>!</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">📄</div>
          <h3>Documentos</h3>
          <p>Acesse documentos exclusivos para associados.</p>
          <button className="card-btn">Ver documentos</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📰</div>
          <h3>Notícias</h3>
          <p>Fique por dentro das novidades da categoria.</p>
          <button className="card-btn">Ver notícias</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">🎓</div>
          <h3>Certificados</h3>
          <p>Baixe seus certificados e comprovantes.</p>
          <button className="card-btn">Ver certificados</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">👤</div>
          <h3>Meu Perfil</h3>
          <p>Atualize seus dados cadastrais.</p>
          <button className="card-btn">Editar perfil</button>
        </div>
      </div>

      <div className="membership-status">
        <h2>Status da Anuidade</h2>
        <div className="status-card">
          <div className="status-info">
            <span className="status-label">Situação:</span>
            <span className="status-value status-active">Ativo</span>
          </div>
          <div className="status-info">
            <span className="status-label">Válido até:</span>
            <span className="status-value">31/12/2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}
