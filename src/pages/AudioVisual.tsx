import React from 'react';
import { useTranslation } from 'react-i18next';

export const AudioVisual = () => {
  const { t } = useTranslation();

  const shortFilms = [
    {
      title: t('audiovisual.films.neophyte'),
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: t('audiovisual.films.indigence'),
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-center bg-cover" 
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="title text-white text-center">{t('audiovisual.title')}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Présentation */}
          <div>
            <h2 className="subtitle mb-8">{t('audiovisual.presentation')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t('audiovisual.description')}
            </p>
          </div>

          {/* Œuvres */}
          <div>
            <h2 className="subtitle mb-8">{t('audiovisual.works')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {shortFilms.map((film, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg">
                  <img 
                    src={film.image} 
                    alt={film.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white text-xl font-bold">{film.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};