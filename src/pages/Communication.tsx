import React from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Share2, PenTool } from 'lucide-react';

export const Communication = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Building2,
      title: t('communication.services.strategy.title'),
      description: t('communication.services.strategy.description')
    },
    {
      icon: Share2,
      title: t('communication.services.social.title'),
      description: t('communication.services.social.description')
    },
    {
      icon: PenTool,
      title: t('communication.services.design.title'),
      description: t('communication.services.design.description')
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-center bg-cover"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="title text-white text-center">{t('communication.title')}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="subtitle mb-6">{t('communication.presentation.title')}</h2>
          <p className="text-gray-300 leading-relaxed">
            {t('communication.presentation.description')}
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

        {/* Portfolio */}
        <div className="mt-20">
          <h2 className="subtitle text-center mb-12">{t('communication.portfolio.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="group relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
                alt={t('communication.portfolio.project1.title')}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t('communication.portfolio.project1.title')}
                  </h3>
                  <p className="text-gray-300">
                    {t('communication.portfolio.project1.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
                alt={t('communication.portfolio.project2.title')}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t('communication.portfolio.project2.title')}
                  </h3>
                  <p className="text-gray-300">
                    {t('communication.portfolio.project2.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                alt={t('communication.portfolio.project3.title')}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t('communication.portfolio.project3.title')}
                  </h3>
                  <p className="text-gray-300">
                    {t('communication.portfolio.project3.description')}
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