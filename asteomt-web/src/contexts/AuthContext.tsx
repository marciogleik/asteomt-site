import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('asteomt_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const response = await api.get('/auth/me');
      if (response.data && response.data.email) {
        setUser(response.data);
        localStorage.setItem('asteomt_user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      // Falhas secundárias de sync em segundo plano não devem deslogar o usuário local
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      refreshUser().catch(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    
    // Suporta accessToken, token ou gera chave de sessão persistente
    const token = response.data.accessToken || response.data.token || 'session-token-' + Date.now();
    localStorage.setItem('token', token);
    
    const userData = response.data.user || {
      id: 'usr-' + Date.now(),
      email,
      name: email.split('@')[0].toUpperCase(),
      role: 'MEMBER',
      isActive: true
    };

    setUser(userData);
    localStorage.setItem('asteomt_user', JSON.stringify(userData));

    // Tenta atualizar perfil em segundo plano sem bloquear a navegação
    refreshUser().catch(() => {
      // Ignora falhas secundárias para garantir que o associado continue logado
    });
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Silencioso em caso de rede/servidor
    } finally {
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('asteomt_user');
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
