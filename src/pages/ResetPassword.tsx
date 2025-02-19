import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // TODO: Implement password reset logic with Supabase
      console.log('Password reset request for:', email);
      setSuccess(true);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-center bg-cover"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="title text-white text-center">MOT DE PASSE OUBLIÉ</h1>
        </div>
      </div>

      {/* Reset Form */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate('/login')}
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

            {success ? (
              <div className="text-center">
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  Un email de réinitialisation a été envoyé à {email}.<br />
                  Veuillez vérifier votre boîte de réception.
                </div>
                <button
                  onClick={() => navigate('/login')}
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
                  <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-2 border-white text-white p-3 rounded focus:outline-none focus:border-gray-300"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded font-bold hover:bg-gray-200 transition-colors"
                  >
                    RÉINITIALISER LE MOT DE PASSE
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};