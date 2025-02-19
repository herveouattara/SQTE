import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: {
          'login.title': 'Connexion',
          'login.form.email': 'Email',
          'login.form.password': 'Mot de passe',
          'login.form.submit': 'Se connecter',
          'login.form.loading': 'Connexion...',
          'login.form.remember': 'Se souvenir de moi',
          'login.form.forgot': 'Mot de passe oublié ?',
          'login.error.invalid': 'Identifiants incorrects',
          'login.form.noAccount': 'Pas encore de compte ?',
          'login.form.register': 'S\'inscrire',
          
          'registration.title': 'Inscription',
          'registration.form.firstName': 'Prénom',
          'registration.form.lastName': 'Nom',
          'registration.form.email': 'Email',
          'registration.form.phone': 'Téléphone',
          'registration.form.pole.label': 'Pôle d\'intérêt',
          'registration.form.pole.select': 'Sélectionnez un pôle',
          'registration.form.pole.audiovisual': 'Pôle Audiovisuel',
          'registration.form.pole.communication': 'Pôle Communication',
          'registration.form.pole.music': 'Pôle Musique',
          'registration.form.motivation': 'Message de motivation',
          'registration.form.terms': 'J\'accepte les conditions d\'utilisation',
          'registration.form.submit': 'S\'inscrire',
          'registration.success.title': 'Inscription réussie !',
          'registration.success.message': 'Votre demande d\'inscription a été enregistrée.',
          'registration.success.admin': 'L\'administrateur va examiner votre demande.',
          'registration.success.login': 'Vous recevrez vos identifiants par email.',
          'registration.success.home': 'Retour à l\'accueil'
        }
      }
    },
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;