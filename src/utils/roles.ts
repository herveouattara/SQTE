export type UserRole = 'admin' | 'responsable' | 'collaborateur' | 'membre';

export const permissions = {
  admin: ['create', 'read', 'update', 'delete', 'manage_users'],
  responsable: ['create', 'read', 'update', 'delete'],
  collaborateur: ['create', 'read', 'update'],
  membre: ['read']
};

export const hasPermission = (role: UserRole, action: string): boolean => {
  return permissions[role]?.includes(action) || false;
};