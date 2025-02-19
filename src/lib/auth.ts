import { supabase } from './supabase';
import { User, UserRole } from '../types/auth';

// Identifiants de test pour le développement
export const loginCredentials = {
  admin: {
    email: 'admin@sqte.fr',
    password: 'Admin123!'
  },
  responsable: {
    email: 'responsable@sqte.fr',
    password: 'Resp123!'
  },
  collaborateur: {
    email: 'collaborateur@sqte.fr',
    password: 'Collab123!'
  },
  membre: {
    email: 'membre@sqte.fr',
    password: 'Membre123!'
  }
};

export const authService = {
  async login(email: string, password: string, role: UserRole): Promise<{ user: User }> {
    // Pour le développement, utiliser les identifiants de test
    const testCredentials = Object.entries(loginCredentials).find(
      ([credRole, cred]) => cred.email === email && cred.password === password
    );

    if (testCredentials) {
      const [userRole] = testCredentials;
      if (userRole !== role) {
        throw new Error('Accès non autorisé pour ce type de compte');
      }

      // Simuler un utilisateur pour le développement
      return {
        user: {
          id: '1',
          email,
          firstName: userRole.charAt(0).toUpperCase() + userRole.slice(1),
          lastName: 'Test',
          role: role,
          pole: role === 'membre' ? undefined : 'Audiovisuel',
          isActive: true
        }
      };
    }

    // En production, utiliser Supabase
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Vérifier le rôle de l'utilisateur
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (userError || !userData || userData.role !== role) {
        throw new Error('Accès non autorisé pour ce type de compte');
      }

      return {
        user: {
          id: userData.id,
          email: userData.email,
          firstName: userData.first_name,
          lastName: userData.last_name,
          role: userData.role,
          pole: userData.pole,
          isActive: userData.is_active
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Identifiants incorrects ou droits insuffisants');
    }
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }
};