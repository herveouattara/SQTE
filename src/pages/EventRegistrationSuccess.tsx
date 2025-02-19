import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Download, Calendar } from 'lucide-react';

export const EventRegistrationSuccess = () => {
  const { t } = useTranslation();
  const { eventId } = useParams();

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-lg shadow-xl text-center">
          <div className="mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-6">
            {t('eventRegistration.success.title')}
          </h2>
          
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <p className="text-gray-300 mb-4">
              {t('eventRegistration.success.message')}
            </p>
            <p className="text-gray-300">
              {t('eventRegistration.success.email')}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="#"
              className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-200 transition-colors"
            >
              <Download className="w-5 h-5" />
              {t('eventRegistration.success.download')}
            </a>
            
            <Link
              to={`/events/${eventId}`}
              className="flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 rounded font-bold hover:bg-white hover:text-black transition-colors"
            >
              <Calendar className="w-5 h-5" />
              {t('eventRegistration.success.viewEvent')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};