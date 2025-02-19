import { useState, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
}

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

export const useAuth = (): AuthState => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string, role: string) => {
    // Pour le développement, vérifier les identifiants de test
    const credentials = testCredentials[role as keyof typeof testCredentials];
    
    if (credentials && credentials.email === email && credentials.password === password) {
      setUser({
        id: '1',
        email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        role
      });
      setIsAuthenticated(true);
      return;
    }
    
    throw new Error('Identifiants incorrects');
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    user,
    login,
    logout
  };
};