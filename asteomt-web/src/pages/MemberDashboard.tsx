import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SEO } from '../components/SEO';
import { BenefitModal } from '../components/BenefitModal';
import { QrValidationModal } from '../components/QrValidationModal';
import { 
  downloadCarteiraDigital, 
  downloadCertidaoRegularidade, 
  downloadReciboAnuidade, 
  downloadCertificadoCurso, 
  openEstatutoSocial, 
  openManualTecnico 
} from '../utils/documentGenerator';
import { 
  FiUser, 
  FiFileText, 
  FiAward, 
  FiSettings, 
  FiGrid, 
  FiLogOut, 
  FiCreditCard, 
  FiDownload, 
  FiCheckCircle, 
  FiLock, 
  FiShield, 
  FiEdit, 
  FiSave,
  FiCode,
  FiCamera
} from 'react-icons/fi';
import logoImg from '../assets/images/logo-asteomt.png';
import './MemberDashboard.css';

export function MemberDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Modal de Convênios & Modal de Validação QR
  const [selectedPartner, setSelectedPartner] = useState<'duma' | 'unifacc' | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const isWilliam = user?.email === 'william@asteomt.com.br' || user?.name?.toLowerCase().includes('william');
  const isAleondas = !isWilliam && (user?.email === 'aleondas@asteomt.com.br' || user?.name?.toLowerCase().includes('aleondas'));

  const defaultPhoto = isWilliam 
    ? '/william-ribeiro.jpg' 
    : (isAleondas ? '/aleondas-ribeiro.jpg' : '/leonardo-ribeiro.jpg');

  // Referência do upload de foto
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    const userStorageKey = user?.email ? `asteomt_photo_${user.email}` : 'asteomt_photo';
    return localStorage.getItem(userStorageKey) || defaultPhoto;
  });

  // Estados do formulário de perfil com valores padrão oficiais
  const [profileData, setProfileData] = useState(() => {
    if (isWilliam) {
      return {
        name: 'William de Souza Leite ribeiro',
        email: user?.email || 'william@asteomt.com.br',
        cpf: '026.650.101-00',
        rg: '472119837 SSP SP',
        nascimento: '12/12/1990',
        telefone: '(65) 99984-9974',
        cidade: 'Cuiabá - MT',
        cargo: 'Técnico em imobilizado ortopédica',
        cargoDiretoria: 'Diretor da ASTEO MT',
        hospital: 'Hospital Municipal de Cuiabá (HMC) / Pronto Atendimento',
        experiencia: 'Mais de 8 anos',
        inscricao: '0001/ASTEO-MT',
        filiacaoNo: '0003',
        validade: '31/12/2026',
        controleNo: '0203458968',
        gestao: '2025 – 2026'
      };
    }
    if (isAleondas) {
      return {
        name: 'Aleondas Leite ribeiro',
        email: user?.email || 'aleondas@asteomt.com.br',
        cpf: '134.775.258-76',
        rg: '220140194 SSP SP',
        nascimento: '11/02/1970',
        telefone: '(66) 99984-9974',
        cidade: 'Água Boa - MT',
        cargo: 'Técnico em imobilizado ortopédica',
        cargoDiretoria: 'Diretor da ASTEO MT',
        hospital: 'Hospital Regional de Água Boa / Pronto Atendimento',
        experiencia: 'Mais de 10 anos',
        inscricao: '0001/ASTEO-MT',
        filiacaoNo: '0002',
        validade: '31/12/2026',
        controleNo: '0203458967',
        gestao: '2025 – 2026'
      };
    }
    return {
      name: user?.name || 'Leonardo Leite Ribeiro',
      email: user?.email || 'contato@asteomt.com.br',
      cpf: '111.597.768-73',
      rg: '',
      nascimento: '17/05/1968',
      telefone: '(66) 99984-9974',
      cidade: 'Cuiabá - MT',
      cargo: 'Presidente',
      cargoDiretoria: 'Presidente',
      hospital: 'Hospital Regional / Atendimento Ortopédico',
      experiencia: 'Mais de 10 anos',
      inscricao: '0001/ASTEO-MT',
      filiacaoNo: '0001',
      validade: '31/12/2026',
      controleNo: '0203458967',
      gestao: '2025 – 2026'
    };
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  // Estados de troca de senha
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  const menuItems = [
    { id: 'overview', icon: <FiGrid />, label: 'Visão Geral' },
    { id: 'profile', icon: <FiUser />, label: 'Meu Perfil' },
    { id: 'documents', icon: <FiFileText />, label: 'Documentos' },
    { id: 'certificates', icon: <FiAward />, label: 'Certificados' },
    { id: 'payments', icon: <FiCreditCard />, label: 'Anuidades' },
    { id: 'settings', icon: <FiSettings />, label: 'Configurações' },
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoUrl(result);
        localStorage.setItem('asteomt_photo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    setSaveSuccessMessage('Perfil atualizado com sucesso!');
    setTimeout(() => setSaveSuccessMessage(''), 4000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'A nova senha e a confirmação não coincidem.' });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'A nova senha deve ter no mínimo 6 caracteres.' });
      return;
    }
    setPasswordMessage({ type: 'success', text: 'Senha alterada com sucesso!' });
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordMessage({ type: '', text: '' }), 4000);
  };

  return (
    <div className="member-layout animate-fade-in">
      <SEO 
        title="Área do Membro | Painel do Associado"
        description="Portal exclusivo do associado ASTEO-MT: consulte sua carteirinha digital, anuidade 2026, certificados e materiais técnicos."
        path="/area-membro"
      />

      {/* Input de Upload de Foto Oculto */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        style={{ display: 'none' }} 
        onChange={handlePhotoUpload} 
      />

      {/* Modal de Detalhes do Convênio */}
      <BenefitModal 
        isOpen={!!selectedPartner} 
        onClose={() => setSelectedPartner(null)} 
        partner={selectedPartner} 
      />

      {/* Modal de Validação do Registro QR Code */}
      <QrValidationModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        name={profileData.name}
        registration={profileData.inscricao}
      />

      {/* Menu Lateral Desktop & Tablet */}
      <aside className="member-sidebar">
        <div className="sidebar-header">
          <img src={logoImg} alt="ASTEO-MT" className="sidebar-logo" />
          <div>
            <span className="sidebar-user-name">{profileData.name.split(' ')[0]}</span>
            <span className="sidebar-user-role">Associado Ativo</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-link ${activeTab === item.id ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={logout} className="btn-logout-sidebar">
            <FiLogOut /> Sair da Conta
          </button>
        </div>
      </aside>

      {/* Navegação Mobile / Tabs */}
      <div className="mobile-tabs-bar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`mobile-tab-btn ${activeTab === item.id ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Conteúdo Principal */}
      <main className="member-main">

        {/* TAB 1: VISÃO GERAL */}
        {activeTab === 'overview' && (
          <div className="tab-content">
            <header className="dashboard-hero">
              <h1>Bem-vindo(a), {profileData.name.split(' ')[0]}</h1>
              <p>Gerencie sua filiação, baixe seus documentos e aproveite os benefícios da ASTEO-MT.</p>
            </header>

            {/* Cards de Métricas Principais */}
            <section className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon-wrapper"><FiShield /></div>
                <div className="stat-info">
                  <h4>Status da Filiação</h4>
                  <div className="stat-value">
                    <span className="status-badge status-active">
                      <FiCheckCircle /> Ativo 2026
                    </span>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrapper"><FiCreditCard /></div>
                <div className="stat-info">
                  <h4>Anuidade 2026</h4>
                  <div className="stat-value text-green">R$ 186,00 (Quitada)</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrapper"><FiAward /></div>
                <div className="stat-info">
                  <h4>Certificados</h4>
                  <div className="stat-value">02 Emitidos</div>
                </div>
              </div>
            </section>

            {/* Carteira Digital do Associado (Modelo Oficial Frente e Verso) */}
            <section className="digital-card-section">
              <h2 className="section-subtitle">Carteira Digital de Identificação Profissional (Modelo Oficial)</h2>
              
              <div className="cards-two-column">
                
                {/* CARD FRENTE */}
                <div className="official-card-wrapper frente">
                  <div className="official-card-header">
                    <img src={logoImg} alt="ASTEO-MT" className="official-logo" />
                    <div className="official-header-titles">
                      <h3>ASTEO-MT</h3>
                      <p>ASSOCIAÇÃO MATO-GROSSENSE DOS TÉCNICOS EM IMOBILIZAÇÕES ORTOPÉDICAS</p>
                    </div>
                  </div>

                  <div className="official-banner-strip"></div>

                  <div className="official-card-body">
                    <div 
                      className="official-photo-box clickable"
                      onClick={() => fileInputRef.current?.click()}
                      title="Clique para enviar ou alterar sua foto de perfil"
                    >
                      {photoUrl ? (
                        <img src={photoUrl} alt="Foto" className="official-photo-img" />
                      ) : (
                        <div className="photo-upload-overlay">
                          <FiCamera size={26} />
                          <span>Enviar Foto</span>
                        </div>
                      )}
                    </div>

                    <div className="official-details">
                      <h4 className="official-user-name">{profileData.name}</h4>
                      <span className="official-badge-green">{profileData.cargo}</span>
                      {profileData.filiacaoNo && (
                        <div className="official-info-row">N° da Filiação: <strong>{profileData.filiacaoNo}</strong></div>
                      )}
                      <div className="official-info-row">Registro: <strong>{profileData.inscricao}</strong></div>
                      <div className="official-info-row">Mato Grosso – Brasil</div>
                      {!isAleondas && !isWilliam && (
                        <div className="official-info-row">Validade: <strong>{profileData.validade}</strong></div>
                      )}
                    </div>
                  </div>

                  <div className="official-card-footer">
                    <span>FRENTE DA CARTEIRA DIGITAL</span>
                    <button className="btn-download-card-sm" onClick={() => downloadCarteiraDigital(profileData)}>
                      <FiDownload /> Baixar PDF
                    </button>
                  </div>
                </div>

                {/* CARD VERSO */}
                <div className="official-card-wrapper verso">
                  <div className="official-card-header">
                    <img src={logoImg} alt="ASTEO-MT" className="official-logo" />
                    <div className="official-header-titles">
                      <h3>ASTEO-MT</h3>
                      <p>ASSOCIAÇÃO MATO-GROSSENSE DOS TÉCNICOS EM IMOBILIZAÇÕES ORTOPÉDICAS</p>
                    </div>
                  </div>

                  <div className="official-banner-strip"></div>

                  <div className="official-card-body-back">
                    <div className="back-info-left">
                      <h4>Diretoria Executiva</h4>
                      <p>Função: {profileData.cargoDiretoria || profileData.cargo}</p>
                      <p>Gestão: {profileData.gestao}</p>
                      <span className="control-number">N° Controle: {profileData.controleNo}</span>
                    </div>

                    <div className="signature-area">
                      <svg className="sig-path" viewBox="0 0 130 50">
                        <path d="M 12 38 C 8 22 24 8 38 6 C 44 6 32 28 42 42 C 48 28 58 14 64 10 C 68 10 52 30 68 42 M 58 32 C 64 22 75 32 88 38 M 20 28 L 82 28" fill="none" stroke="#0b2d52" strokeWidth="2.2" strokeLinecap="round"/>
                        <text x="26" y="32" font-family="'Brush Script MT', 'Dancing Script', 'Caveat', cursive" fontSize="28" fill="#0b2d52" fontStyle="italic">Leonardo</text>
                      </svg>
                      <strong>Leonardo Leite ribeiro</strong>
                      <span>Presidente ASTEO-MT</span>
                    </div>

                    <div 
                      className="qr-back-box clickable" 
                      onClick={() => setIsQrModalOpen(true)}
                      title="Clique para validar a autenticidade"
                    >
                      <FiCode size={55} />
                      <span>Validar</span>
                    </div>
                  </div>

                  <div className="official-mission-bar">
                    <span>NOSSA MISSÃO: QUALIFICAR E FORTALECER OS TÉCNICOS EM IMOBILIZAÇÕES ORTOPÉDICAS COM RESPONSABILIDADE, ÉTICA E COMPROMISSO COM A SAÚDE E BEM-ESTAR DA POPULAÇÃO.</span>
                  </div>
                </div>

              </div>
            </section>

            {/* Painel de Serviços Rápido */}
            <div className="services-panel">
              <div className="panel-card">
                <div className="panel-header">
                  <h3>Meus Benefícios Ativos</h3>
                  <FiShield />
                </div>
                <div className="panel-body">
                  <div className="benefit-item-row">
                    <div>
                      <strong>Duma Psicologia & Saúde</strong>
                      <p style={{ fontSize: '0.85rem', color: '#666' }}>Terapia online com descontos exclusivos para você e familiares.</p>
                    </div>
                    <button className="btn-sm" onClick={() => setSelectedPartner('duma')}>Acessar</button>
                  </div>
                  <hr style={{ margin: '1rem 0', borderColor: '#eee' }} />
                  <div className="benefit-item-row">
                    <div>
                      <strong>UNIFACC Cuiabá</strong>
                      <p style={{ fontSize: '0.85rem', color: '#666' }}>Descontos em graduação e extensão profissional.</p>
                    </div>
                    <button className="btn-sm" onClick={() => setSelectedPartner('unifacc')}>Acessar</button>
                  </div>
                </div>
              </div>

              <div className="panel-card">
                <div className="panel-header">
                  <h3>Comunicados da Diretoria</h3>
                  <FiFileText />
                </div>
                <div className="panel-body">
                  <ul className="notice-list">
                    <li>
                      <strong>Assembleia Geral Ordinária 2026</strong>
                      <span className="notice-date">28/07/2026</span>
                      <p style={{ fontSize: '0.85rem', color: '#555' }}>Pauta sobre regulamentação da categoria e tabela salarial.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEU PERFIL */}
        {activeTab === 'profile' && (
          <div className="tab-content">
            <header className="dashboard-hero">
              <h1>Meu Perfil Profissional</h1>
              <p>Mantenha seus dados pessoais e de contato sempre atualizados na base da ASTEO-MT.</p>
            </header>

            {saveSuccessMessage && (
              <div className="alert alert-success">
                <FiCheckCircle /> {saveSuccessMessage}
              </div>
            )}

            <div className="profile-card">
              <div className="profile-header-flex">
                <h3>Dados Cadastrais</h3>
                {!isEditingProfile ? (
                  <button className="btn-edit" onClick={() => setIsEditingProfile(true)}>
                    <FiEdit /> Editar Dados
                  </button>
                ) : (
                  <button className="btn-save" onClick={handleSaveProfile}>
                    <FiSave /> Salvar Alterações
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveProfile} className="profile-form-grid">
                <div className="form-group">
                  <label>Nome Completo</label>
                  <input 
                    type="text" 
                    value={profileData.name} 
                    disabled={!isEditingProfile}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})} 
                  />
                </div>

                <div className="form-group">
                  <label>Cargo / Função</label>
                  <input 
                    type="text" 
                    value={profileData.cargo} 
                    disabled={!isEditingProfile}
                    onChange={(e) => setProfileData({...profileData, cargo: e.target.value})} 
                  />
                </div>

                <div className="form-group">
                  <label>CPF</label>
                  <input 
                    type="text" 
                    value={profileData.cpf} 
                    disabled={!isEditingProfile}
                    onChange={(e) => setProfileData({...profileData, cpf: e.target.value})} 
                  />
                </div>

                <div className="form-group">
                  <label>Data de Nascimento</label>
                  <input 
                    type="text" 
                    value={profileData.nascimento} 
                    disabled={!isEditingProfile}
                    onChange={(e) => setProfileData({...profileData, nascimento: e.target.value})} 
                  />
                </div>

                <div className="form-group">
                  <label>E-mail Cadastrado</label>
                  <input 
                    type="email" 
                    value={profileData.email} 
                    disabled={!isEditingProfile}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})} 
                  />
                </div>

                <div className="form-group">
                  <label>Telefone / WhatsApp</label>
                  <input 
                    type="text" 
                    value={profileData.telefone} 
                    disabled={!isEditingProfile}
                    onChange={(e) => setProfileData({...profileData, telefone: e.target.value})} 
                  />
                </div>

                <div className="form-group">
                  <label>Cidade / Estado</label>
                  <input 
                    type="text" 
                    value={profileData.cidade} 
                    disabled={!isEditingProfile}
                    onChange={(e) => setProfileData({...profileData, cidade: e.target.value})} 
                  />
                </div>

                <div className="form-group">
                  <label>Hospital / Unidade de Atuação</label>
                  <input 
                    type="text" 
                    value={profileData.hospital} 
                    disabled={!isEditingProfile}
                    onChange={(e) => setProfileData({...profileData, hospital: e.target.value})} 
                  />
                </div>

                <div className="form-group">
                  <label>Tempo de Experiência na Área</label>
                  <input 
                    type="text" 
                    value={profileData.experiencia} 
                    disabled={!isEditingProfile}
                    onChange={(e) => setProfileData({...profileData, experiencia: e.target.value})} 
                  />
                </div>

                <div className="form-group">
                  <label>Registro / Inscrição ASTEO-MT</label>
                  <input 
                    type="text" 
                    value={profileData.inscricao} 
                    disabled 
                    style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                  />
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: DOCUMENTOS */}
        {activeTab === 'documents' && (
          <div className="tab-content">
            <header className="dashboard-hero">
              <h1>Documentos e Normas Técnicas</h1>
              <p>Baixe certidões, declarações e o manual técnico de diretrizes para imobilizações ortopédicas.</p>
            </header>

            <div className="docs-grid">
              <div className="doc-card">
                <div className="doc-icon"><FiFileText /></div>
                <div className="doc-details">
                  <h4>Certidão de Regularidade 2026</h4>
                  <p>Comprova o status ativo do profissional perante a associação.</p>
                  <span className="doc-meta">Formato: PDF Impresso • Oficial</span>
                </div>
                <button className="btn-doc-download" onClick={() => downloadCertidaoRegularidade(profileData)}>
                  <FiDownload /> Emitir / Baixar
                </button>
              </div>

              <div className="doc-card">
                <div className="doc-icon"><FiAward /></div>
                <div className="doc-details">
                  <h4>Carteira Digital de Associado (Oficial)</h4>
                  <p>Documento de identificação profissional para impressão ou uso mobile (Frente e Verso).</p>
                  <span className="doc-meta">Formato: PDF • Validade 2026</span>
                </div>
                <button className="btn-doc-download" onClick={() => downloadCarteiraDigital(profileData)}>
                  <FiDownload /> Emitir / Baixar
                </button>
              </div>

              <div className="doc-card">
                <div className="doc-icon"><FiShield /></div>
                <div className="doc-details">
                  <h4>Estatuto Social da ASTEO-MT</h4>
                  <p>Documento regimental com os direitos e deveres da categoria.</p>
                  <span className="doc-meta">Formato: Documento Oficial</span>
                </div>
                <button className="btn-doc-download" onClick={() => openEstatutoSocial()}>
                  <FiDownload /> Visualizar / Baixar
                </button>
              </div>

              <div className="doc-card">
                <div className="doc-icon"><FiFileText /></div>
                <div className="doc-details">
                  <h4>Manual de Diretrizes em Imobilização</h4>
                  <p>Guia com procedimentos padrão para gesso sintético, gesso comum e órteses.</p>
                  <span className="doc-meta">Formato: Guia Técnico ASTEO-MT</span>
                </div>
                <button className="btn-doc-download" onClick={() => openManualTecnico()}>
                  <FiDownload /> Visualizar / Baixar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CERTIFICADOS */}
        {activeTab === 'certificates' && (
          <div className="tab-content">
            <header className="dashboard-hero">
              <h1>Certificados e Capacitações</h1>
              <p>Histórico de certificados emitidos por participação em congressos, workshops e atualizações.</p>
            </header>

            <div className="certificates-list">
              <div className="certificate-item">
                <div className="cert-badge-icon"><FiAward /></div>
                <div className="cert-info">
                  <h3>Curso de Atualização Técnica em Imobilizações Sintéticas</h3>
                  <p>Organizado por ASTEO-MT em parceria com UNIFACC • Carga horária: 40 horas</p>
                  <span className="cert-code">Código de Autenticidade: <code>ASTEO-2026-CERT-9921</code></span>
                </div>
                <button 
                  className="btn-cert-download" 
                  onClick={() => downloadCertificadoCurso(
                    profileData, 
                    'Curso de Atualização Técnica em Imobilizações Sintéticas', 
                    '40 horas', 
                    'ASTEO-2026-CERT-9921'
                  )}
                >
                  <FiDownload /> Emitir PDF
                </button>
              </div>

              <div className="certificate-item">
                <div className="cert-badge-icon"><FiAward /></div>
                <div className="cert-info">
                  <h3>I Simpósio Matogrossense de Urgências Ortopédicas</h3>
                  <p>Participante ouvinte e congressista • Cuiabá/MT • Carga horária: 20 horas</p>
                  <span className="cert-code">Código de Autenticidade: <code>ASTEO-2025-SIMP-4102</code></span>
                </div>
                <button 
                  className="btn-cert-download" 
                  onClick={() => downloadCertificadoCurso(
                    profileData, 
                    'I Simpósio Matogrossense de Urgências Ortopédicas', 
                    '20 horas', 
                    'ASTEO-2025-SIMP-4102'
                  )}
                >
                  <FiDownload /> Emitir PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ANUIDADES */}
        {activeTab === 'payments' && (
          <div className="tab-content">
            <header className="dashboard-hero">
              <h1>Anuidades e Histórico Financeiro</h1>
              <p>Acompanhe a quitação das suas contribuições anuais e emita comprovantes fiscais.</p>
            </header>

            <div className="payments-table-container">
              <table className="payments-table">
                <thead>
                  <tr>
                    <th>Exercício</th>
                    <th>Valor</th>
                    <th>Vencimento</th>
                    <th>Data do Pagamento</th>
                    <th>Status</th>
                    <th>Comprovante</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Anuidade 2026</strong></td>
                    <td>R$ 186,00</td>
                    <td>31/03/2026</td>
                    <td>28/07/2026</td>
                    <td><span className="status-badge status-active">QUITADO</span></td>
                    <td>
                      <button className="btn-table-action" onClick={() => downloadReciboAnuidade(profileData)}>
                        <FiDownload /> Baixar Recibo
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: CONFIGURAÇÕES */}
        {activeTab === 'settings' && (
          <div className="tab-content">
            <header className="dashboard-hero">
              <h1>Configurações da Conta</h1>
              <p>Altere sua senha de acesso e ajuste preferências de privacidade.</p>
            </header>

            {passwordMessage.text && (
              <div className={`alert ${passwordMessage.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                {passwordMessage.type === 'success' ? <FiCheckCircle /> : <FiLock />} {passwordMessage.text}
              </div>
            )}

            <div className="settings-card">
              <h3><FiLock /> Alterar Senha de Acesso</h3>
              <form onSubmit={handleChangePassword} className="settings-form">
                <div className="form-group">
                  <label>Senha Atual</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Nova Senha</label>
                  <input 
                    type="password" 
                    placeholder="Mínimo 6 caracteres" 
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Confirmar Nova Senha</label>
                  <input 
                    type="password" 
                    placeholder="Repita a nova senha" 
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    required
                  />
                </div>

                <button type="submit" className="btn-save">
                  Atualizar Senha
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default MemberDashboard;
