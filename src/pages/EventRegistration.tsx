import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, User } from 'lucide-react';
import { eventService } from '../services/events';

export const EventRegistration = () => {
  const { t } = useTranslation();
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Enregistrer l'inscription
      const pdfDataUri = await eventService.registerForEvent(eventId!, {
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`
      });

      // Envoyer l'email de confirmation avec le PDF
      await eventService.sendConfirmationEmail({
        email: formData.email,
        eventId: eventId!,
        pdfDataUri
      });

      // Rediriger vers la page de succès
      navigate(`/event-registration-success/${eventId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-center bg-cover"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="title text-white text-center">{t('eventRegistration.title')}</h1>
        </div>
      </div>

      {/* Registration Form */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
            {error && (
              <div className="mb-6 p-4 bg-red-900 border border-red-700 text-white rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">
                    {t('eventRegistration.form.firstName')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-transparent border-2 border-white text-white p-3 pl-10 rounded focus:outline-none focus:border-gray-300"
                      required
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">
                    {t('eventRegistration.form.lastName')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-transparent border-2 border-white text-white p-3 pl-10 rounded focus:outline-none focus:border-gray-300"
                      required
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">
                  {t('eventRegistration.form.email')}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-2 border-white text-white p-3 pl-10 rounded focus:outline-none focus:border-gray-300"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">
                  {t('eventRegistration.form.phone')}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent border-2 border-white text-white p-3 pl-10 rounded focus:outline-none focus:border-gray-300"
                    required
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">
                  {t('eventRegistration.form.specialRequirements')}
                </label>
                <textarea
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                  className="w-full bg-transparent border-2 border-white text-white p-3 rounded focus:outline-none focus:border-gray-300"
                  rows={4}
                ></textarea>
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="terms" className="mr-2" required />
                <label htmlFor="terms" className="text-gray-400">
                  {t('eventRegistration.form.terms')}
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-white text-black py-3 font-bold rounded transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
                }`}
              >
                {isSubmitting ? t('eventRegistration.form.submitting') : t('eventRegistration.form.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};