import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

export const Inscription = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pole: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError('Une erreur est survenue lors de l\'inscription');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-lg shadow-xl text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Inscription réussie !</h2>
            <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded mb-6">
              <p className="mb-4">Votre demande d'inscription a été enregistrée avec succès.</p>
              <p className="mb-4">L'administrateur va examiner votre demande et vous enverra vos identifiants de connexion par email dans les 48 heures.</p>
              <p>Vous pourrez alors vous connecter à votre espace membre.</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-200 transition-colors"
            >
              RETOUR À L'ACCUEIL
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-[40vh] bg-center bg-cover"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="title text-white text-center">INSCRIPTION</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white rounded-full">
                <UserPlus className="w-8 h-8 text-black" />
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">Prénom</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-transparent border-2 border-white text-white p-3 rounded focus:outline-none focus:border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Nom</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-transparent border-2 border-white text-white p-3 rounded focus:outline-none focus:border-gray-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-2 border-white text-white p-3 rounded focus:outline-none focus:border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Téléphone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border-2 border-white text-white p-3 rounded focus:outline-none focus:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Pôle d'intérêt</label>
                <select
                  value={formData.pole}
                  onChange={(e) => setFormData({ ...formData, pole: e.target.value })}
                  className="w-full bg-transparent border-2 border-white text-white p-3 rounded focus:outline-none focus:border-gray-300"
                  required
                >
                  <option value="" className="bg-black">Sélectionnez un pôle</option>
                  <option value="audiovisuel" className="bg-black">Pôle Audiovisuel</option>
                  <option value="communication" className="bg-black">Pôle Communication</option>
                  <option value="musique" className="bg-black">Pôle Musique</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Message de motivation</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border-2 border-white text-white p-3 rounded focus:outline-none focus:border-gray-300"
                  required
                ></textarea>
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="terms" className="mr-2" required />
                <label htmlFor="terms" className="text-gray-400">
                  J'accepte les conditions d'utilisation et la politique de confidentialité
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black py-3 font-bold hover:bg-gray-200 transition-colors"
              >
                {isSubmitting ? 'INSCRIPTION EN COURS...' : 'S\'INSCRIRE'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};