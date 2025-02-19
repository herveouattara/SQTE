import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Section principale */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo et description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">SQTE</h2>
            <p className="text-gray-400 mb-4">
              Association culturelle à Mantes-la-Ville
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/actualites" className="text-gray-400 hover:text-white">
                  Actualités
                </Link>
              </li>
              <li>
                <Link to="/evenements" className="text-gray-400 hover:text-white">
                  Événements
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Pôles */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nos pôles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pole-audiovisuel" className="text-gray-400 hover:text-white">
                  Pôle Audiovisuel
                </Link>
              </li>
              <li>
                <Link to="/pole-media" className="text-gray-400 hover:text-white">
                  Pôle Média
                </Link>
              </li>
              <li>
                <Link to="/pole-musique" className="text-gray-400 hover:text-white">
                  Pôle Musique
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                123 Rue de l'Association<br />78711 Mantes-la-Ville
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                01 23 45 67 89
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                contact@sqte.fr
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barre inférieure */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} SQTE. Tous droits réservés.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link to="/mentions-legales" className="text-gray-400 hover:text-white">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="text-gray-400 hover:text-white">
                Politique de confidentialité
              </Link>
              <Link to="/conditions-utilisation" className="text-gray-400 hover:text-white">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};