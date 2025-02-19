import React from 'react';
import { useTranslation } from 'react-i18next';
import { Music as MusicIcon, Mic2, Radio } from 'lucide-react';

export const Music = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: MusicIcon,
      title: t('music.services.production.title'),
      description: t('music.services.production.description')
    },
    {
      icon: Mic2,
      title: t('music.services.recording.title'),
      description: t('music.services.recording.description')
    },
    {
      icon: Radio,
      title: t('music.services.events.title'),
      description: t('music.services.events.description')
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-center bg-cover"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="title text-white text-center">{t('music.title')}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="subtitle mb-6">{t('music.presentation.title')}</h2>
          <p className="text-gray-300 leading-relaxed">
            {t('music.presentation.description')}
          </p>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-900 p-8 rounded-lg text-center">
              <service.icon className="w-12 h-12 mx-auto mb-6 text-white" />
              <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Latest Projects */}
        <div className="mt-20">
          <h2 className="subtitle text-center mb-12">{t('music.projects.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="group relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80"
                alt={t('music.projects.project1.title')}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t('music.projects.project1.title')}
                  </h3>
                  <p className="text-gray-300">
                    {t('music.projects.project1.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=800&q=80"
                alt={t('music.projects.project2.title')}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t('music.projects.project2.title')}
                  </h3>
                  <p className="text-gray-300">
                    {t('music.projects.project2.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};