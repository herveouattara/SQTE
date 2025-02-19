import React, { useState } from 'react';
import { CreditCard, Heart } from 'lucide-react';
import { PaymentForm } from '../components/PaymentForm';

export const FaireUnDon = () => {
  const [amount, setAmount] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    anonymous: false
  });
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const predefinedAmounts = ['5', '10', '20', '50', '100'];

  const handleDonationSuccess = (donationId: string) => {
    setSuccess(true);
    // Réinitialiser le formulaire
    setAmount('');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      anonymous: false
    });
  };

  const handleDonationError = (error: string) => {
    // Afficher l'erreur
    console.error('Erreur de paiement:', error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPaymentForm(true);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-900 p-8 rounded-lg mb-8">
              <Heart className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Merci pour votre don !</h2>
              <p className="text-gray-300">
                Votre soutien est précieux et nous aide à continuer notre mission.
                Un reçu fiscal vous sera envoyé par email.
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-200"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-[40vh] bg-center bg-cover"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">FAIRE UN DON</h1>
            <p className="text-xl text-gray-300">Soutenez nos projets et notre mission</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {showPaymentForm ? (
            <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Paiement sécurisé</h2>
              <PaymentForm 
                amount={amount}
                onSuccess={handleDonationSuccess}
                onError={handleDonationError}
                userInfo={{
                  email: formData.email,
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  anonymous: formData.anonymous
                }}
              />
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-4">Pourquoi faire un don ?</h2>
                <p className="text-gray-300">
                  Votre soutien nous permet de continuer notre mission de création et de partage artistique. 
                  Chaque contribution compte et nous aide à réaliser des projets toujours plus ambitieux.
                </p>
              </div>

              <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-400 mb-4">Choisissez un montant</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                      {predefinedAmounts.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setAmount(preset)}
                          className={`py-3 font-bold transition-colors ${
                            amount === preset
                              ? 'bg-white text-black'
                              : 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-black'
                          }`}
                        >
                          {preset}€
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Autre montant"
                        className="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">€</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 mb-2">Prénom</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                        required={!formData.anonymous}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Nom</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                        required={!formData.anonymous}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Message (optionnel)</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                      rows={4}
                    ></textarea>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={formData.anonymous}
                      onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="anonymous" className="text-gray-400">
                      Je souhaite faire un don anonyme
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-black py-3 font-bold hover:bg-gray-200 transition-colors"
                  >
                    FAIRE UN DON
                  </button>
                </form>
              </div>

              <div className="mt-8 text-center text-sm text-gray-400">
                <p>Les dons sont sécurisés et vous recevrez un reçu fiscal par email.</p>
                <div className="flex justify-center gap-4 mt-4">
                  <img src="https://www.mastercard.fr/content/dam/public/mastercardcom/eu/fr/images/logo/mc-logo-52.svg" alt="Mastercard" className="h-8" />
                  <img src="https://www.visa.fr/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg" alt="Visa" className="h-8" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};