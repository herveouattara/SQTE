import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { register } from '../lib/auth';
import { sendAdminNotificationEmail } from '../lib/email';

export const Registration = () => {
  const { t } = useTranslation();
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
      const tempPassword = Math.random().toString(36).slice(-8);
      
      await register(formData.email, tempPassword, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        pole: formData.pole,
        message: formData.message
      });

      await sendAdminNotificationEmail('admin@sqte.com', {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        pole: formData.pole,
        message: formData.message
      });

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-lg shadow-xl text-center">
            <h2 className="text-2xl font-bold text-white mb-6">{t('registration.success.title')}</h2>
            <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded mb-6">
              <p className="mb-4">{t('registration.success.message')}</p>
              <p className="mb-4">{t('registration.success.admin')}</p>
              <p>{t('registration.success.login')}</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-200 transition-colors"
            >
              {t('registration.success.home')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-center bg-cover"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="title text-white text-center">{t('registration.title')}</h1>
        </div>
      </div>

      {/* Registration Form */}
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
                  <label className="block text-gray-400 mb-2">{t('registration.form.firstName')}</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-transparent border-2 border-white text-white p-3 rounded focus:outline-none focus:border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">{t('registration.form.lastName')}</label>
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
                <label className="block text-gray-400 mb-2">{t('registration.form.email')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-2 border-white text-white p-3 rounded focus:outline-none focus:border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">{t('registration.form.phone')}</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border-2 border-white text-white p-3 rounded focus:outline-none focus:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">{t('registration.form.pole.label')}</label>
                <select
                  value={formData.pole}
                  onChange={(e) => setFormData({ ...formData, pole: e.target.value })}
                  className="w-full bg-transparent border-2 border-white text-white p-3 rounded focus:outline-none focus:border-gray-300"
                  required
                >
                  <option value="" className="bg-black">{t('registration.form.pole.select')}</option>
                  <option value="audiovisual" className="bg-black">{t('registration.form.pole.audiovisual')}</option>
                  <option value="communication" className="bg-black">{t('registration.form.pole.communication')}</option>
                  <option value="music" className="bg-black">{t('registration.form.pole.music')}</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">{t('registration.form.motivation')}</label>
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
                  {t('registration.form.terms')}
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded font-bold transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
                }`}
              >
                {isSubmitting ? '...' : t('registration.form.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};