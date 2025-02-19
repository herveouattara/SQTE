import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Mail, User, Film, Radio, Newspaper, Heart } from 'lucide-react';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <a href="tel:+33123456789" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Phone className="w-4 h-4" />
                01 23 45 67 89
              </a>
              <a href="mailto:contact@sqte.com" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Mail className="w-4 h-4" />
                contact@sqte.com
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/faire-un-don" className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
                <Heart className="w-4 h-4" />
                Faire un don
              </Link>
              <Link to="/inscription" className="hover:text-blue-400">Inscription</Link>
              <Link to="/connexion" className="hover:text-blue-400">Connexion</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-black">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-white">SQTE</Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/actualites" className="text-white hover:text-blue-400 transition-colors">
                ACTUALITÉS
              </Link>
              
              {/* Menu déroulant Pôles */}
              <div className="relative group">
                <button className="text-white hover:text-blue-400 transition-colors flex items-center gap-2 py-2 font-bold">
                  PÔLES
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                  <Link to="/pole-audiovisuel" className="flex items-center px-6 py-4 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100">
                    <Film className="w-5 h-5 mr-3" />
                    Pôle Audiovisuel
                  </Link>
                  <Link to="/pole-media" className="flex items-center px-6 py-4 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100">
                    <Newspaper className="w-5 h-5 mr-3" />
                    Pôle Média
                  </Link>
                  <Link to="/pole-musique" className="flex items-center px-6 py-4 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Radio className="w-5 h-5 mr-3" />
                    Pôle Musique
                  </Link>
                </div>
              </div>

              <Link to="/evenements" className="text-white hover:text-blue-400 transition-colors">
                ÉVÉNEMENTS
              </Link>
              <Link to="/contact" className="text-white hover:text-blue-400 transition-colors">
                CONTACT
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white w-64 h-full transform transition-transform duration-200 ease-in-out">
            <div className="flex justify-end p-4">
              <button onClick={() => setIsOpen(false)} className="text-gray-800">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <Link to="/actualites" className="block py-2 text-gray-800">
                ACTUALITÉS
              </Link>
              <div className="py-2">
                <button className="flex items-center justify-between w-full text-gray-800" onClick={() => {}}>
                  <span>PÔLES</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div className="pl-4 py-2 space-y-2">
                  <Link to="/pole-audiovisuel" className="flex items-center text-gray-600 hover:text-blue-600">
                    <Film className="w-4 h-4 mr-2" />
                    Pôle Audiovisuel
                  </Link>
                  <Link to="/pole-media" className="flex items-center text-gray-600 hover:text-blue-600">
                    <Newspaper className="w-4 h-4 mr-2" />
                    Pôle Média
                  </Link>
                  <Link to="/pole-musique" className="flex items-center text-gray-600 hover:text-blue-600">
                    <Radio className="w-4 h-4 mr-2" />
                    Pôle Musique
                  </Link>
                </div>
              </div>
              <Link to="/evenements" className="block py-2 text-gray-800">
                ÉVÉNEMENTS
              </Link>
              <Link to="/contact" className="block py-2 text-gray-800">
                CONTACT
              </Link>
              <Link to="/faire-un-don" className="flex items-center gap-2 py-2 text-red-600">
                <Heart className="w-4 h-4" />
                Faire un don
              </Link>
              <div className="border-t border-gray-200 mt-4 pt-4">
                <Link to="/inscription" className="block py-2 text-gray-800">
                  Inscription
                </Link>
                <Link to="/connexion" className="block py-2 text-gray-800">
                  Connexion
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};