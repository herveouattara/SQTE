import React, { useState, useEffect } from 'react';
import { 
  User, 
  Calendar, 
  Settings, 
  LogOut, 
  FileText, 
  Edit,
  Trash2,
  Plus,
  Users,
  MessageSquare,
  BarChart,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EventForm } from '../components/admin/EventForm';
import { PageForm } from '../components/admin/PageForm';
import { adminService } from '../services/admin';

export const EspaceAdmin = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showEventModal, setShowEventModal] = useState(false);
  const [showPageModal, setShowPageModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [eventsData, pagesData] = await Promise.all([
        adminService.getEvents(),
        adminService.getPages()
      ]);

      setEvents(eventsData);
      setPages(pagesData);
    } catch (error) {
      setError('Erreur lors du chargement des données');
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate('/connexion');
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-white/20">
              <Calendar className="w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-white/80 text-sm">Événements</p>
              <h3 className="text-3xl font-bold">{events.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-white/20">
              <FileText className="w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-white/80 text-sm">Pages</p>
              <h3 className="text-3xl font-bold">{pages.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-white/20">
              <Users className="w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-white/80 text-sm">Utilisateurs</p>
              <h3 className="text-3xl font-bold">24</h3>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-white/20">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-white/80 text-sm">Messages</p>
              <h3 className="text-3xl font-bold">12</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Événements récents */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Événements récents</h3>
          <button 
            onClick={() => setActiveSection('events')}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            Voir tout <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {events.slice(0, 3).map((event) => (
            <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">{event.title}</h4>
                <p className="text-sm text-gray-500">{event.date} - {event.location}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowEventModal(true);
                  }}
                  className="p-2 text-blue-600 hover:text-blue-800"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pages récentes */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Pages récentes</h3>
          <button 
            onClick={() => setActiveSection('pages')}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            Voir tout <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {pages.slice(0, 3).map((page) => (
            <div key={page.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">{page.title}</h4>
                <p className="text-sm text-gray-500">{page.slug}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedPage(page);
                    setShowPageModal(true);
                  }}
                  className="p-2 text-blue-600 hover:text-blue-800"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeletePage(page.id)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Chargement...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white">
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-2xl font-bold">SQTE Admin</h1>
            <p className="text-gray-400 text-sm">Panneau d'administration</p>
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
                onClick={() => setActiveSection('pages')}
                className={`flex items-center w-full px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors ${
                  activeSection === 'pages' ? 'bg-blue-600' : ''
                }`}
              >
                <FileText className="w-5 h-5 mr-3" />
                Pages
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
                onClick={() => setActiveSection('users')}
                className={`flex items-center w-full px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors ${
                  activeSection === 'users' ? 'bg-blue-600' : ''
                }`}
              >
                <Users className="w-5 h-5 mr-3" />
                Utilisateurs
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
        <div className="flex-1 overflow-auto bg-gray-100">
          <header className="bg-white shadow-sm">
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {activeSection === 'dashboard' && 'Tableau de bord'}
                {activeSection === 'pages' && 'Gestion des pages'}
                {activeSection === 'events' && 'Gestion des événements'}
                {activeSection === 'users' && 'Gestion des utilisateurs'}
                {activeSection === 'settings' && 'Paramètres'}
              </h2>
            </div>
          </header>

          <main className="p-6">
            {error && (
              <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <p>{error}</p>
              </div>
            )}

            {activeSection === 'dashboard' && renderDashboard()}

            {activeSection === 'pages' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Pages</h2>
                  <button
                    onClick={() => setShowPageModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Nouvelle page
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-500 border-b">
                          <th className="px-6 py-3">Titre</th>
                          <th className="px-6 py-3">URL</th>
                          <th className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pages.map((page) => (
                          <tr key={page.id} className="border-b">
                            <td className="px-6 py-4">{page.title}</td>
                            <td className="px-6 py-4">{page.slug}</td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => {
                                    setSelectedPage(page);
                                    setShowPageModal(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <Edit className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDeletePage(page.id)}
                                  className="text-red-600 hover:text-red-900"
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
              </div>
            )}

            {activeSection === 'events' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Événements</h2>
                  <button
                    onClick={() => setShowEventModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Nouvel événement
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-500 border-b">
                          <th className="px-6 py-3">Titre</th>
                          <th className="px-6 py-3">Date</th>
                          <th className="px-6 py-3">Lieu</th>
                          <th className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((event) => (
                          <tr key={event.id} className="border-b">
                            <td className="px-6 py-4">{event.title}</td>
                            <td className="px-6 py-4">{event.date} {event.time}</td>
                            <td className="px-6 py-4">{event.location}</td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => {
                                    setSelectedEvent(event);
                                    setShowEventModal(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <Edit className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteEvent(event.id)}
                                  className="text-red-600 hover:text-red-900"
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
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modals */}
      {showEventModal && (
        <EventForm
          onSubmit={selectedEvent ? 
            (data) => handleUpdateEvent(selectedEvent.id, data) : 
            handleCreateEvent}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
          }}
          initialData={selectedEvent}
        />
      )}

      {showPageModal && (
        <PageForm
          onSubmit={selectedPage ? 
            (data) => handleUpdatePage(selectedPage.id, data) : 
            handleCreatePage}
          onClose={() => {
            setShowPageModal(false);
            setSelectedPage(null);
          }}
          initialData={selectedPage}
        />
      )}
    </div>
  );
};