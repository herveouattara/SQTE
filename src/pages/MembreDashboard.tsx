import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Settings, 
  LogOut, 
  Heart,
  Clock,
  Star,
  MessageSquare,
  FileText,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const MembreDashboard = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  const upcomingEvents = [
    {
      title: "Festival de Courts Métrages",
      date: "15 Mars 2024",
      time: "19:00",
      location: "Salle Principale",
      status: "Inscrit"
    },
    {
      title: "Concert Live",
      date: "22 Mars 2024",
      time: "20:30",
      location: "Auditorium",
      status: "En attente"
    }
  ];

  const donations = [
    {
      date: "2024-02-01",
      amount: 50,
      project: "Projet Audiovisuel"
    },
    {
      date: "2024-01-15",
      amount: 25,
      project: "Concert Caritatif"
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
                Accédez à vos informations personnelles et gérez votre participation aux événements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Événements participés</p>
                    <h4 className="text-2xl font-bold text-white">8</h4>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total des dons</p>
                    <h4 className="text-2xl font-bold text-white">75€</h4>
                  </div>
                  <Heart className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Points fidélité</p>
                    <h4 className="text-2xl font-bold text-white">150</h4>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Événements à venir</h3>
                <button className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
                  Voir tout <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-medium">{event.title}</h4>
                        <p className="text-gray-400 text-sm">{event.date} - {event.time}</p>
                        <p className="text-gray-400 text-sm">{event.location}</p>
                      </div>
                      <span className={`px-3 py-1 rounded text-sm ${
                        event.status === 'Inscrit' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-6">Historique des dons</h3>
              <div className="space-y-4">
                {donations.map((donation, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded flex justify-between items-center">
                    <div>
                      <p className="text-white">{donation.project}</p>
                      <p className="text-gray-400 text-sm">{donation.date}</p>
                    </div>
                    <span className="text-green-400 font-bold">{donation.amount}€</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Mes Événements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">À venir</h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded">
                      <h4 className="text-white font-medium">{event.title}</h4>
                      <p className="text-gray-400 text-sm">{event.date} - {event.time}</p>
                      <p className="text-gray-400 text-sm">{event.location}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className={`px-3 py-1 rounded text-sm ${
                          event.status === 'Inscrit' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                        }`}>
                          {event.status}
                        </span>
                        <button className="text-blue-400 hover:text-blue-300">
                          Voir les détails
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Historique</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded">
                    <h4 className="text-white font-medium">Workshop Communication</h4>
                    <p className="text-gray-400 text-sm">1 Février 2024</p>
                    <p className="text-gray-400 text-sm">Salle de Conférence</p>
                    <div className="mt-2">
                      <span className="px-3 py-1 rounded text-sm bg-gray-700 text-gray-300">
                        Terminé
                      </span>
                    </div>
                  </div>
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
                  <p className="text-gray-400 text-sm">Membre</p>
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