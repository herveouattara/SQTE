import React, { useState } from 'react';
import { 
  User, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2, 
  AlertCircle,
  UserPlus,
  Shield,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { adminService } from '../../services/admin';
import { UserRole, roleLabels } from '../../types/auth';

export const UserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [pendingRegistrations, setPendingRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('membre');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersData, pendingData] = await Promise.all([
        adminService.getUsers(),
        adminService.getPendingRegistrations()
      ]);

      setUsers(usersData);
      setPendingRegistrations(pendingData);
    } catch (err) {
      setError('Erreur lors du chargement des données');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    try {
      await adminService.updateUserStatus(userId, !currentStatus);
      loadData();
    } catch (err) {
      setError('Erreur lors de la mise à jour du statut');
      console.error(err);
    }
  };

  const handleRoleUpdate = async () => {
    if (!selectedUser) return;

    try {
      await adminService.updateUserRole(selectedUser.id, selectedRole);
      setShowRoleModal(false);
      loadData();
    } catch (err) {
      setError('Erreur lors de la mise à jour du rôle');
      console.error(err);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    try {
      await adminService.deleteUser(userId);
      loadData();
    } catch (err) {
      setError('Erreur lors de la suppression');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-8">
        Chargement...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-600 text-white p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Liste des utilisateurs */}
      <div className="bg-gray-900 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-6">Utilisateurs</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-800">
                <th className="pb-3">Nom</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Rôle</th>
                <th className="pb-3">Statut</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-800">
                  <td className="py-4 text-white">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="py-4 text-white">{user.email}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-sm">
                      {roleLabels[user.role as UserRole]}
                    </span>
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => handleToggleStatus(user.id, user.isActive)}
                      className="flex items-center gap-2 text-gray-400 hover:text-white"
                    >
                      {user.isActive ? (
                        <ToggleRight className="w-6 h-6 text-green-500" />
                      ) : (
                        <ToggleLeft className="w-6 h-6 text-red-500" />
                      )}
                      <span>{user.isActive ? 'Actif' : 'Inactif'}</span>
                    </button>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setSelectedRole(user.role);
                          setShowRoleModal(true);
                        }}
                        className="p-2 text-blue-400 hover:text-blue-300"
                        title="Modifier le rôle"
                      >
                        <Shield className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-red-400 hover:text-red-300"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de modification de rôle */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-6">
              Modifier le rôle de {selectedUser?.firstName} {selectedUser?.lastName}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Rôle</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="w-full bg-gray-800 text-white p-3 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
                >
                  {Object.entries(roleLabels).map(([role, label]) => (
                    <option key={role} value={role}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowRoleModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  onClick={handleRoleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};