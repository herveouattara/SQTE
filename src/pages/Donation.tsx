import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Donation = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const predefinedAmounts = ['5', '10', '20', '50', '100'];

  const getCardType = (number: string) => {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/,
      dinersclub: /^3(?:0[0-5]|[68])/,
      jcb: /^(?:2131|1800|35)/
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(number)) {
        return type;
      }
    }
    return '';
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setExpiryDate(formattedValue);
  };

  const cardType = getCardType(cardNumber.replace(/\s+/g, ''));

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-center bg-cover"
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="title text-white text-center">{t('donation.title')}</h1>
        </div>
      </div>

      {/* Donation Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="subtitle mb-6">{t('donation.subtitle')}</h2>
          <p className="text-gray-300 mb-12">
            {t('donation.description')}
          </p>

          <div className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {predefinedAmounts.map((preset) => (
                <button
                  key={preset}
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
                placeholder={t('donation.amount')}
                className="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">€</span>
            </div>
          </div>

          <form className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  placeholder={t('donation.form.firstName')}
                  className="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder={t('donation.form.lastName')}
                  className="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                />
              </div>
            </div>

            <div>
              <input
                type="email"
                placeholder={t('donation.form.email')}
                className="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
              />
            </div>

            {/* Carte bancaire */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-6 h-6 text-white" />
                <h3 className="text-white font-bold">{t('donation.form.payment')}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2">{t('donation.form.cardNumber')}</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                    />
                    {cardType && (
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white capitalize">
                        {cardType}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">{t('donation.form.cardName')}</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="JOHN DOE"
                    className="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2">{t('donation.form.expiryDate')}</label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">{t('donation.form.cvv')}</label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="123"
                      maxLength={4}
                      className="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <textarea
                placeholder={t('donation.form.message')}
                rows={4}
                className="w-full bg-transparent border-2 border-white text-white p-3 focus:outline-none focus:border-gray-300"
              ></textarea>
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="anonymous" className="mr-2" />
              <label htmlFor="anonymous" className="text-gray-400">
                {t('donation.form.anonymous')}
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-3 font-bold hover:bg-gray-200 transition-colors"
            >
              {t('donation.form.submit')}
            </button>
          </form>

          <p className="mt-8 text-sm text-gray-400">
            {t('donation.secure')}
          </p>

          <div className="mt-4 flex justify-center gap-4">
            <img src="https://www.mastercard.fr/content/dam/public/mastercardcom/eu/fr/images/logo/mc-logo-52.svg" alt="Mastercard" className="h-8" />
            <img src="https://www.visa.fr/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg" alt="Visa" className="h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};