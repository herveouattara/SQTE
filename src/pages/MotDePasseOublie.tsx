import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, Mail } from 'lucide-react';

export function MotDePasseOublie() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Simulation d'envoi d'email
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate('/connexion')}
            className="flex items-center text-gray-400 hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la connexion
          </button>

          <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white rounded-full">
                <Lock className="w-8 h-8 text-black" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Mot de passe oublié
            </h2>

            {success ? (
              <div className="text-center">
                <div className="mb-6 p-4 bg-green-900 border border-green-700 text-white rounded">
                  <p className="mb-2">Un email de réinitialisation a été envoyé à {email}.</p>
                  <p>Veuillez vérifier votre boîte de réception et suivre les instructions.</p>
                </div>
                <button
                  onClick={() => navigate('/connexion')}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Retour à la connexion
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-400 text-center mb-8">
                  Entrez votre adresse email pour recevoir un lien de réinitialisation
                </p>

                {error && (
                  <div className="mb-6 p-4 bg-red-900 border border-red-700 text-white rounded">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-400 mb-2">Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-2 border-white text-white p-3 pl-10 rounded focus:outline-none focus:border-gray-300"
                        required
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black py-3 font-bold hover:bg-gray-200 transition-colors"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Réinitialiser le mot de passe'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}