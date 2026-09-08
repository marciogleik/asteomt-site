import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import Footer from './components/Footer';
import { Home } from './pages/Home';
import './App.css';

// Carregamento sob demanda (Code Splitting) para otimização de performance
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./pages/Registro').then(m => ({ default: m.Registro })));
const Noticias = lazy(() => import('./pages/Noticias').then(m => ({ default: m.Noticias })));
const Sobre = lazy(() => import('./pages/Sobre').then(m => ({ default: m.Sobre })));
const Eventos = lazy(() => import('./pages/Eventos').then(m => ({ default: m.Eventos })));
const Cursos = lazy(() => import('./pages/Cursos').then(m => ({ default: m.Cursos })));
const Contato = lazy(() => import('./pages/Contato').then(m => ({ default: m.Contato })));
const Privacidade = lazy(() => import('./pages/Privacidade').then(m => ({ default: m.Privacidade })));
const Termos = lazy(() => import('./pages/Termos').then(m => ({ default: m.Termos })));
const Beneficios = lazy(() => import('./pages/Beneficios').then(m => ({ default: m.Beneficios })));
const MemberDashboard = lazy(() => import('./pages/MemberDashboard').then(m => ({ default: m.MemberDashboard })));
const PagamentoSucesso = lazy(() => import('./pages/PagamentoSucesso').then(m => ({ default: m.PagamentoSucesso })));
const PagamentoFalha = lazy(() => import('./pages/PagamentoFalha').then(m => ({ default: m.PagamentoFalha })));

function PageLoader() {
  return (
    <div className="loading" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '36px',
          height: '36px',
          border: '3px solid #e2e8f0',
          borderTopColor: '#004b82',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 12px'
        }} />
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Carregando...</p>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <main>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/noticias" element={<Noticias />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/eventos" element={<Eventos />} />
                <Route path="/cursos" element={<Cursos />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/privacidade" element={<Privacidade />} />
                <Route path="/termos" element={<Termos />} />
                <Route path="/beneficios" element={<Beneficios />} />
                <Route path="/pagamento-sucesso" element={<PagamentoSucesso />} />
                <Route path="/pagamento-falha" element={<PagamentoFalha />} />
                <Route
                  path="/area-membro"
                  element={
                    <ProtectedRoute>
                      <MemberDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
