import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'admin' | 'responsable' | 'collaborateur';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  pole?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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
      lastName: 'Dupont',
      pole: 'Audiovisuel'
    },
    collaborateur: {
      email: 'collaborateur@sqte.fr',
      password: 'Collab123!',
      firstName: 'Marie',
      lastName: 'Martin',
      pole: 'Média'
    }
  };

  const login = async (email: string, password: string, role: UserRole) => {
    const credentials = testCredentials[role as keyof typeof testCredentials];
    
    if (credentials && credentials.email === email && credentials.password === password) {
      const userData = {
        id: '1',
        email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        role,
        pole: 'pole' in credentials ? credentials.pole : undefined
      };

      setUser(userData);

      // Redirection selon le rôle
      switch (role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'responsable':
          navigate('/responsable');
          break;
        case 'collaborateur':
          navigate('/collaborateur');
          break;
      }
    } else {
      throw new Error('Identifiants incorrects');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/connexion');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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