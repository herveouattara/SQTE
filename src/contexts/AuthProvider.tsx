import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Identifiants de test pour le développement
const testCredentials = {
  admin: {
    email: 'admin@sqte.fr',
    password: 'Admin123!',
    firstName: 'Admin',
    lastName: 'SQTE'
  },
  responsable: {
    email: 'responsable@sqte.fr',
    password: 'Resp123!',
    firstName: 'Jean',
    lastName: 'Dupont'
  },
  collaborateur: {
    email: 'collaborateur@sqte.fr',
    password: 'Collab123!',
    firstName: 'Marie',
    lastName: 'Martin'
  },
  membre: {
    email: 'membre@sqte.fr',
    password: 'Membre123!',
    firstName: 'Pierre',
    lastName: 'Durand'
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string, role: string) => {
    // Pour le développement, vérifier les identifiants de test
    const credentials = testCredentials[role as keyof typeof testCredentials];
    
    if (credentials && credentials.email === email && credentials.password === password) {
      const userData = {
        id: '1',
        email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        role
      };
      setUser(userData);
      setIsAuthenticated(true);
      navigate(`/${role.toLowerCase()}`);
      return;
    }
    
    throw new Error('Identifiants incorrects');
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    navigate('/connexion');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};