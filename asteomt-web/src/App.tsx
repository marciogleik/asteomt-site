import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import Footer from './components/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Registro as Register } from './pages/Registro';
import { Noticias } from './pages/Noticias';
import { Sobre } from './pages/Sobre';
import { Eventos } from './pages/Eventos';
import { Cursos } from './pages/Cursos';
import { Contato } from './pages/Contato';
import { Privacidade } from './pages/Privacidade';
import { Termos } from './pages/Termos';
import { Beneficios } from './pages/Beneficios';
import { MemberDashboard } from './pages/MemberDashboard';
import './App.css';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading">Carregando...</div>;
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
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
