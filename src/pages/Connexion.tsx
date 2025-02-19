import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle, Mail, Lock } from 'lucide-react';

export const Connexion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Identifiants de test pour faciliter le développement
  const testCredentials = {
    admin: { email: 'admin@sqte.fr', password: 'Admin123!' },
    responsable: { email: 'responsable@sqte.fr', password: 'Resp123!' },
    collaborateur: { email: 'collaborateur@sqte.fr', password: 'Collab123!' }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const roleCredentials = testCredentials[role as keyof typeof testCredentials];
      
      if (roleCredentials && email === roleCredentials.email && password === roleCredentials.password) {
        // Simulation d'un délai de connexion
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Redirection selon le rôle
        switch (role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'responsable':
            navigate('/responsable');
            break;
          case 'collaborateur':
            navigate('/collaborateur');
            break;
        }
        return;
      }

      setError('Identifiants incorrects');
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour pré-remplir les identifiants de test
  const fillTestCredentials = () => {
    const credentials = testCredentials[role as keyof typeof testCredentials];
    if (credentials) {
      setEmail(credentials.email);
      setPassword(credentials.password);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white rounded-full">
                <LogIn className="w-8 h-8 text-black" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Connexion Administration
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-900 border border-red-700 text-white rounded flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Type de compte</label>
                <select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setEmail('');
                    setPassword('');
                  }}
                  className="w-full bg-transparent border-2 border-white text-white p-3 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="admin" className="bg-black">Administrateur</option>
                  <option value="responsable" className="bg-black">Responsable</option>
                  <option value="collaborateur" className="bg-black">Collaborateur</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-2 border-white text-white p-3 pl-10 rounded focus:outline-none focus:border-blue-500"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Mot de passe</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-2 border-white text-white p-3 pl-10 rounded focus:outline-none focus:border-blue-500"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="mr-2"
                  />
                  <label htmlFor="remember" className="text-gray-400">
                    Se souvenir de moi
                  </label>
                </div>
                <a href="/mot-de-passe-oublie" className="text-blue-400 hover:text-blue-300">
                  Mot de passe oublié ?
                </a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black py-3 font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Connexion en cours...
                  </div>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>

            {/* Bouton pour pré-remplir les identifiants de test (à retirer en production) */}
            <button
              onClick={fillTestCredentials}
              className="mt-4 w-full p-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Remplir avec les identifiants de test
            </button>

            <div className="mt-6 text-center text-sm text-gray-400">
              <p>Identifiants de test :</p>
              <p>Admin : admin@sqte.fr / Admin123!</p>
              <p>Responsable : responsable@sqte.fr / Resp123!</p>
              <p>Collaborateur : collaborateur@sqte.fr / Collab123!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};