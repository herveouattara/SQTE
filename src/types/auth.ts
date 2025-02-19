export type UserRole = 'admin' | 'responsable' | 'collaborateur' | 'membre';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  pole?: string;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  permissions: string[];
}

export const roleLabels: Record<UserRole, string> = {
  admin: 'Administrateur',
  responsable: 'Responsable',
  collaborateur: 'Collaborateur',
  membre: 'Membre'
};

export const rolePermissions: Record<UserRole, string[]> = {
  admin: ['manage_users', 'manage_content', 'manage_events', 'manage_roles', 'view_analytics'],
  responsable: ['manage_content', 'manage_events', 'view_analytics'],
  collaborateur: ['create_content', 'participate_events'],
  membre: ['view_content', 'participate_events']
};