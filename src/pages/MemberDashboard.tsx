import React from 'react';
import { useTranslation } from 'react-i18next';
import { User, Calendar, Settings, LogOut } from 'lucide-react';

export const MemberDashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-white font-bold">John Doe</h3>
                <p className="text-gray-400 text-sm">{t('dashboard.role')}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <a href="#" className="flex items-center space-x-3 text-white p-3 rounded hover:bg-gray-800">
                <User className="w-5 h-5" />
                <span>{t('dashboard.nav.profile')}</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-white p-3 rounded hover:bg-gray-800">
                <Calendar className="w-5 h-5" />
                <span>{t('dashboard.nav.events')}</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-white p-3 rounded hover:bg-gray-800">
                <Settings className="w-5 h-5" />
                <span>{t('dashboard.nav.settings')}</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-red-500 p-3 rounded hover:bg-gray-800">
                <LogOut className="w-5 h-5" />
                <span>{t('dashboard.nav.logout')}</span>
              </a>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-8">
            {/* Welcome Card */}
            <div className="bg-gray-900 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('dashboard.welcome.title', { name: 'John' })}
              </h2>
              <p className="text-gray-400">
                {t('dashboard.welcome.description')}
              </p>
            </div>

            {/* Upcoming Events */}
            <div className="bg-gray-900 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-6">{t('dashboard.events.title')}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded">
                  <div>
                    <h4 className="text-white font-bold">{t('dashboard.events.event1.title')}</h4>
                    <p className="text-gray-400">{t('dashboard.events.event1.date')}</p>
                  </div>
                  <button className="px-4 py-2 bg-white text-black rounded font-bold hover:bg-gray-200">
                    {t('dashboard.events.participate')}
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded">
                  <div>
                    <h4 className="text-white font-bold">{t('dashboard.events.event2.title')}</h4>
                    <p className="text-gray-400">{t('dashboard.events.event2.date')}</p>
                  </div>
                  <button className="px-4 py-2 bg-white text-black rounded font-bold hover:bg-gray-200">
                    {t('dashboard.events.participate')}
                  </button>
                </div>
              </div>
            </div>

            {/* Member Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 p-6 rounded-lg">
                <h4 className="text-gray-400 mb-2">{t('dashboard.stats.events')}</h4>
                <p className="text-3xl font-bold text-white">12</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h4 className="text-gray-400 mb-2">{t('dashboard.stats.projects')}</h4>
                <p className="text-3xl font-bold text-white">3</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h4 className="text-gray-400 mb-2">{t('dashboard.stats.contributions')}</h4>
                <p className="text-3xl font-bold text-white">250€</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};