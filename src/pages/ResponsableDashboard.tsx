import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Settings, 
  LogOut, 
  FileText, 
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  X,
  Users,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const ResponsableDashboard = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showEventModal, setShowEventModal] = useState(false);

  const pendingCollaborators = [
    {
      name: "Marie Dupont",
      email: "marie.d@example.com",
      pole: "Audiovisuel",
      date: "2024-02-15"
    },
    {
      name: "Jean Martin",
      email: "jean.m@example.com",
      pole: "Musique",
      date: "2024-02-14"
    }
  ];

  const events = [
    {
      title: "Festival de Courts Métrages",
      date: "2024-03-15",
      time: "19:00",
      location: "Salle Principale",
      participants: 45,
      maxParticipants: 100
    },
    {
      title: "Concert Live",
      date: "2024-03-22",
      time: "20:30",
      location: "Auditorium",
      participants: 78,
      maxParticipants: 150
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="bg-gray-900 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-4">
                Bienvenue, {user?.firstName} !
              </h2>
              <p className="text-gray-400">
                Gérez votre pôle et vos collaborateurs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Collaborateurs</p>
                    <h4 className="text-2xl font-bold text-white">24</h4>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Événements actifs</p>
                    <h4 className="text-2xl font-bold text-white">8</h4>
                  </div>
                  <Calendar className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Messages</p>
                    <h4 className="text-2xl font-bold text-white">12</h4>
                  </div>
                  <MessageSquare className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-6">Gestion des Collaborateurs</h3>
              <div className="space-y-4">
                {pendingCollaborators.map((collab, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{collab.name}</h4>
                        <p className="text-gray-400 text-sm">{collab.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400">{collab.pole}</span>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-green-600 text-white rounded hover:bg-green-700">
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-red-600 text-white rounded hover:bg-red-700">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Gestion des Événements</h2>
              <button
                onClick={() => setShowEventModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <Plus className="w-5 h-5" />
                Nouvel Événement
              </button>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-800">
                      <th className="pb-3">Titre</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Lieu</th>
                      <th className="pb-3">Participants</th>
                      <th className="pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event, index) => (
                      <tr key={index} className="border-b border-gray-800">
                        <td className="py-4 text-white">{event.title}</td>
                        <td className="py-4 text-white">{event.date} {event.time}</td>
                        <td className="py-4 text-white">{event.location}</td>
                        <td className="py-4 text-white">
                          {event.participants}/{event.maxParticipants}
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <button className="p-2 text-blue-400 hover:text-blue-300">
                              <Edit className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-red-400 hover:text-red-300">
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
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold">{user?.firstName} {user?.lastName}</h3>
                  <p className="text-gray-400 text-sm">Responsable {user?.pole}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className={`flex items-center space-x-3 text-white p-3 rounded w-full text-left ${
                    activeSection === 'dashboard' ? 'bg-gray-800' : 'hover:bg-gray-800'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Tableau de bord</span>
                </button>
                <button
                  onClick={() => setActiveSection('collaborators')}
                  className={`flex items-center space-x-3 text-white p-3 rounded w-full text-left ${
                    activeSection === 'collaborators' ? 'bg-gray-800' : 'hover:bg-gray-800'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>Collaborateurs</span>
                </button>
                <button
                  onClick={() => setActiveSection('events')}
                  className={`flex items-center space-x-3 text-white p-3 rounded w-full text-left ${
                    activeSection === 'events' ? 'bg-gray-800' : 'hover:bg-gray-800'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Événements</span>
                </button>
                <button
                  onClick={() => setActiveSection('settings')}
                  className={`flex items-center space-x-3 text-white p-3 rounded w-full text-left ${
                    activeSection === 'settings' ? 'bg-gray-800' : 'hover:bg-gray-800'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Paramètres</span>
                </button>
                <button 
                  onClick={logout}
                  className="flex items-center space-x-3 text-red-500 p-3 rounded w-full text-left hover:bg-gray-800"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Déconnexion</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};