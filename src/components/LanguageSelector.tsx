import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = {
    fr: { 
      name: 'Français',
      nativeName: 'Français',
      flag: '🇫🇷'
    },
    en: { 
      name: 'English',
      nativeName: 'English',
      flag: '🇬🇧'
    },
    de: { 
      name: 'Deutsch',
      nativeName: 'Deutsch',
      flag: '🇩🇪'
    },
    es: { 
      name: 'Español',
      nativeName: 'Español',
      flag: '🇪🇸'
    },
    it: { 
      name: 'Italiano',
      nativeName: 'Italiano',
      flag: '🇮🇹'
    },
    pt: { 
      name: 'Português',
      nativeName: 'Português',
      flag: '🇵🇹'
    },
    'pt-BR': { 
      name: 'Português (Brasil)',
      nativeName: 'Português (Brasil)',
      flag: '🇧🇷'
    },
    zh: { 
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳'
    }
  };

  const currentLanguage = languages[i18n.language as keyof typeof languages] || languages.fr;

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors p-2 rounded-lg"
      >
        <Globe className="w-5 h-5" />
        <span className="hidden md:inline">{currentLanguage.flag} {currentLanguage.nativeName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-2 z-50">
          {Object.entries(languages).map(([code, lang]) => (
            <button
              key={code}
              onClick={() => changeLanguage(code)}
              className={`flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors ${
                i18n.language === code ? 'text-blue-400' : 'text-white'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.nativeName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};