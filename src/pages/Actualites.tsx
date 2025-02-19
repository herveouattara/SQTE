import React from 'react';

export const Actualites = () => {
  const actualites = [
    {
      id: 1,
      title: 'Nouveau projet audiovisuel',
      date: '2024-02-18',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
      description: 'Lancement d\'un nouveau projet de court-métrage avec nos talents locaux. Notre équipe audiovisuelle se lance dans une nouvelle production prometteuse qui mettra en valeur les talents de notre région.',
      category: 'Audiovisuel'
    },
    {
      id: 2,
      title: 'Concert de printemps',
      date: '2024-02-15',
      image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=800&q=80',
      description: 'Préparation du grand concert de printemps avec nos musiciens. Un événement qui promet d\'être mémorable avec un programme varié et des artistes talentueux.',
      category: 'Musique'
    },
    {
      id: 3,
      title: 'Workshop Communication',
      date: '2024-02-10',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
      description: 'Retour sur le workshop communication organisé la semaine dernière. Une journée riche en apprentissages et en échanges pour améliorer notre communication.',
      category: 'Média'
    },
    {
      id: 4,
      title: 'Succès du Festival SQTE',
      date: '2024-02-05',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      description: 'Le Festival SQTE 2024 a rencontré un grand succès avec plus de 500 participants. Retour sur les moments forts de cet événement qui a marqué les esprits.',
      category: 'Événement'
    },
    {
      id: 5,
      title: 'Nouvelle collaboration artistique',
      date: '2024-02-01',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80',
      description: 'SQTE s\'associe avec des artistes locaux pour un projet innovant mêlant musique et arts visuels. Une collaboration qui promet des créations uniques.',
      category: 'Collaboration'
    },
    {
      id: 6,
      title: 'Ouverture des inscriptions',
      date: '2024-01-28',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      description: 'Les inscriptions pour la saison 2024-2025 sont ouvertes ! Découvrez nos différents pôles et rejoignez l\'aventure SQTE.',
      category: 'Association'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-center bg-cover"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">ACTUALITÉS</h1>
        </div>
      </div>

      {/* Actualités */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {actualites.map((actu) => (
            <div key={actu.id} className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={actu.image}
                  alt={actu.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-0 right-0 bg-white text-black px-4 py-2 font-bold">
                  {new Date(actu.date).toLocaleDateString('fr-FR')}
                </div>
                <div className="absolute bottom-0 left-0 bg-blue-600 text-white px-4 py-1">
                  {actu.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{actu.title}</h3>
                <p className="text-gray-400 mb-4">{actu.description}</p>
                <a href="#" className="inline-block text-blue-400 hover:text-blue-300">
                  Lire la suite →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};