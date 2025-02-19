import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Camera, Video, Users } from 'lucide-react';

export const PoleAudiovisuel = () => {
  const services = [
    {
      icon: Film,
      title: 'Production de Films',
      description: 'Réalisation de courts-métrages et documentaires'
    },
    {
      icon: Camera,
      title: 'Photographie',
      description: 'Séances photo et reportages'
    },
    {
      icon: Video,
      title: 'Montage Vidéo',
      description: 'Post-production et effets spéciaux'
    },
    {
      icon: Users,
      title: 'Formation',
      description: 'Ateliers et cours pratiques'
    }
  ];

  const projects = [
    {
      title: 'NÉOPHYTE',
      description: 'Court-métrage sur la découverte de soi',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'INDIGENCE',
      description: 'Documentaire social',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-center bg-cover" 
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">PÔLE AUDIOVISUEL</h1>
        </div>
      </div>

      {/* Services */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Nos Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-900 p-8 rounded-lg text-center">
              <service.icon className="w-12 h-12 mx-auto mb-6 text-white" />
              <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projets */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Nos Projets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Rejoignez notre équipe</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Vous êtes passionné par l'audiovisuel ? Rejoignez notre équipe et participez à des projets créatifs et innovants.
        </p>
        <Link 
          to="/inscription" 
          className="inline-block bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition-colors"
        >
          Devenir membre
        </Link>
      </div>
    </div>
  );
};