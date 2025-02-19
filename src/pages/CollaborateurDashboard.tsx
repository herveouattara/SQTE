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

export const CollaborateurDashboard = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

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
                Accédez à vos projets et gérez vos contenus.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Projets actifs</p>
                    <h4 className="text-2xl font-bold text-white">3</h4>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Événements à venir</p>
                    <h4 className="text-2xl font-bold text-white">2</h4>
                  </div>
                  <Calendar className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Messages</p>
                    <h4 className="text-2xl font-bold text-white">5</h4>
                  </div>
                  <MessageSquare className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Mes Projets</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Nouveau projet
              </button>
            </div>
            
            <div className="grid gap-6">
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Projets en cours</h3>
                <div className="space-y-4">
                  {/* Liste des projets */}
                </div>
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
                  <p className="text-gray-400 text-sm">Collaborateur</p>
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
                  onClick={() => setActiveSection('projects')}
                  className={`flex items-center space-x-3 text-white p-3 rounded w-full text-left ${
                    activeSection === 'projects' ? 'bg-gray-800' : 'hover:bg-gray-800'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Projets</span>
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