import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Settings, 
  LogOut, 
  FileText, 
  Edit,
  MessageSquare,
  BarChart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EspaceCollaborateur = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  const stats = {
    events: 5,
    projets: 3,
    messages: 8
  };

  const recentActivities = [
    { type: 'event', description: 'Inscription : Festival de Courts Métrages', date: '2024-02-20 14:30' },
    { type: 'project', description: 'Mise à jour : Documentaire local', date: '2024-02-19 16:45' },
    { type: 'message', description: 'Nouveau message du responsable', date: '2024-02-19 11:20' }
  ];

  const handleLogout = () => {
    navigate('/connexion');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white">
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-2xl font-bold">SQTE Collaborateur</h1>
            <p className="text-gray-400 text-sm">Pôle Audiovisuel</p>
          </div>
          
          <nav className="mt-6">
            <div className="px-4 space-y-2">
              <button
                onClick={() => setActiveSection('dashboard')}
                className={`flex items-center w-full px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors ${
                  activeSection === 'dashboard' ? 'bg-blue-600' : ''
                }`}
              >
                <BarChart className="w-5 h-5 mr-3" />
                Tableau de bord
              </button>

              <button
                onClick={() => setActiveSection('events')}
                className={`flex items-center w-full px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors ${
                  activeSection === 'events' ? 'bg-blue-600' : ''
                }`}
              >
                <Calendar className="w-5 h-5 mr-3" />
                Événements
              </button>

              <button
                onClick={() => setActiveSection('messages')}
                className={`flex items-center w-full px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors ${
                  activeSection === 'messages' ? 'bg-blue-600' : ''
                }`}
              >
                <MessageSquare className="w-5 h-5 mr-3" />
                Messages
              </button>

              <button
                onClick={() => setActiveSection('settings')}
                className={`flex items-center w-full px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors ${
                  activeSection === 'settings' ? 'bg-blue-600' : ''
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                Paramètres
              </button>
            </div>
          </nav>

          <div className="absolute bottom-0 w-64 p-6 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center text-red-400 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm">
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {activeSection === 'dashboard' && 'Tableau de bord'}
                {activeSection === 'events' && 'Mes événements'}
                {activeSection === 'messages' && 'Messages'}
                {activeSection === 'settings' && 'Paramètres'}
              </h2>
            </div>
          </header>

          <main className="p-6">
            {activeSection === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-white/20">
                        <Calendar className="w-8 h-8" />
                      </div>
                      <div className="ml-4">
                        <p className="text-white/80 text-sm">Événements</p>
                        <h3 className="text-3xl font-bold">{stats.events}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-white/20">
                        <FileText className="w-8 h-8" />
                      </div>
                      <div className="ml-4">
                        <p className="text-white/80 text-sm">Projets</p>
                        <h3 className="text-3xl font-bold">{stats.projets}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-white/20">
                        <MessageSquare className="w-8 h-8" />
                      </div>
                      <div className="ml-4">
                        <p className="text-white/80 text-sm">Messages</p>
                        <h3 className="text-3xl font-bold">{stats.messages}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Activités récentes</h3>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-full ${
                          activity.type === 'event' ? 'bg-blue-100 text-blue-600' :
                          activity.type === 'project' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {activity.type === 'event' ? <Calendar className="w-6 h-6" /> :
                           activity.type === 'project' ? <FileText className="w-6 h-6" /> :
                           <MessageSquare className="w-6 h-6" />}
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="text-gray-800 font-medium">{activity.description}</p>
                          <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};