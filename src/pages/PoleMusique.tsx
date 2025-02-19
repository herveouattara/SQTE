import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Mic2, Radio, Headphones } from 'lucide-react';

export const PoleMusique = () => {
  const services = [
    {
      icon: Music,
      title: 'Production Musicale',
      description: 'Studio d\'enregistrement professionnel'
    },
    {
      icon: Mic2,
      title: 'Enregistrement',
      description: 'Sessions avec ingénieurs du son'
    },
    {
      icon: Radio,
      title: 'Événements',
      description: 'Organisation de concerts live'
    },
    {
      icon: Headphones,
      title: 'Formation',
      description: 'Cours de musique et MAO'
    }
  ];

  const projects = [
    {
      title: 'Album Collaboratif',
      description: 'Projet multi-artistes',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Concert Live',
      description: 'Performance au théâtre municipal',
      image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-center bg-cover"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">PÔLE MUSIQUE</h1>
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
          Vous êtes passionné par la musique ? Rejoignez notre équipe et participez à des projets musicaux innovants.
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