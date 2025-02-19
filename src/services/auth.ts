import { supabase } from '../lib/supabase';
import { User, UserRole } from '../types/auth';

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

export const authService = {
  async login({ email, password, role }: LoginCredentials): Promise<{ user: User }> {
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

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    pole?: string;
  }) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password
      });

      if (authError) throw authError;

      const { error: profileError } = await supabase
        .from('users')
        .insert([{
          id: authData.user?.id,
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          role: userData.role,
          pole: userData.pole,
          is_active: false
        }]);

      if (profileError) throw profileError;

      // Créer une notification pour l'administrateur
      await supabase
        .from('admin_notifications')
        .insert([{
          type: 'registration',
          title: 'Nouvelle inscription',
          content: `${userData.firstName} ${userData.lastName} souhaite s'inscrire en tant que ${userData.role}`,
          read: false
        }]);

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
};