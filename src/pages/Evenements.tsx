import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';

export const Evenements = () => {
  const events = [
    {
      id: '1',
      title: 'Festival de Courts Métrages',
      date: "15 Mars 2024",
      time: "19:00",
      location: "Salle Principale",
      description: "Projection des meilleurs courts métrages de l'année",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: '2',
      title: 'Concert Live',
      date: "22 Mars 2024",
      time: "20:30",
      location: "Auditorium",
      description: "Performance live des artistes du pôle musique",
      image: "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: '3',
      title: 'Workshop Communication',
      date: "5 Avril 2024",
      time: "14:00",
      location: "Salle de Conférence",
      description: "Atelier pratique sur les stratégies de communication",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-center bg-cover"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="title text-white text-center">ÉVÉNEMENTS</h1>
        </div>
      </div>

      {/* Events List */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-gray-900 rounded-lg overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-0 right-0 bg-white text-black px-4 py-2 font-bold">
                  {event.date}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-gray-400 mb-4">{event.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                </div>
                <Link
                  to={`/inscription-evenement/${event.id}`}
                  className="mt-4 w-full bg-white text-black py-2 font-bold hover:bg-gray-200 transition-colors inline-block text-center"
                >
                  S'INSCRIRE
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};