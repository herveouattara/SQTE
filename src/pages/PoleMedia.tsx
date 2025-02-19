import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Share2, PenTool, Megaphone } from 'lucide-react';

export const PoleMedia = () => {
  const services = [
    {
      icon: Building2,
      title: 'Stratégie de Communication',
      description: 'Développement de stratégies de communication efficaces'
    },
    {
      icon: Share2,
      title: 'Médias Sociaux',
      description: 'Gestion et optimisation des réseaux sociaux'
    },
    {
      icon: PenTool,
      title: 'Design Graphique',
      description: 'Création d\'identités visuelles et supports'
    },
    {
      icon: Megaphone,
      title: 'Relations Publiques',
      description: 'Gestion de la communication externe'
    }
  ];

  const projects = [
    {
      title: 'Campagne Digitale',
      description: 'Stratégie multicanal pour une marque locale',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Identité Visuelle',
      description: 'Refonte complète de l\'image de marque',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-center bg-cover"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">PÔLE MÉDIA</h1>
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
          <h2 className="text-3xl font-bold text-white text-center mb-12">Nos Réalisations</h2>
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
          Vous êtes passionné par la communication et les médias ? Rejoignez notre équipe et participez à des projets innovants.
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