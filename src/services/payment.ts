import { supabase } from '../lib/supabase';

interface PaymentDetails {
  amount: number;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  email: string;
  firstName: string;
  lastName: string;
  message?: string;
  anonymous: boolean;
}

export const paymentService = {
  async processDonation(paymentDetails: PaymentDetails) {
    try {
      // Simulation d'une requête de paiement
      // En production, utilisez un service de paiement sécurisé comme Stripe
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Enregistrer la donation dans la base de données
      const { data, error } = await supabase
        .from('donations')
        .insert([{
          amount: paymentDetails.amount,
          email: paymentDetails.email,
          first_name: paymentDetails.anonymous ? null : paymentDetails.firstName,
          last_name: paymentDetails.anonymous ? null : paymentDetails.lastName,
          message: paymentDetails.message,
          anonymous: paymentDetails.anonymous,
          status: 'completed',
          payment_method: 'card',
          card_last4: paymentDetails.cardNumber.slice(-4),
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      // Envoyer un email de confirmation
      await supabase.functions.invoke('send-donation-confirmation', {
        body: {
          email: paymentDetails.email,
          amount: paymentDetails.amount,
          donationId: data.id,
          firstName: paymentDetails.firstName,
          anonymous: paymentDetails.anonymous
        }
      });

      return {
        success: true,
        donationId: data.id
      };
    } catch (error) {
      console.error('Payment processing error:', error);
      throw new Error('Le paiement a échoué. Veuillez réessayer.');
    }
  },

  validateCard(cardNumber: string, expiryDate: string, cvv: string) {
    const errors: Record<string, string> = {};
    const cleanCardNumber = cardNumber.replace(/\s/g, '');

    // Validation du numéro de carte
    if (!/^[0-9]{16}$/.test(cleanCardNumber)) {
      errors.cardNumber = 'Numéro de carte invalide';
    }

    // Validation de la date d'expiration
    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiryDate)) {
      errors.expiryDate = 'Format de date invalide (MM/YY)';
    } else {
      const [month, year] = expiryDate.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      if (expiry < new Date()) {
        errors.expiryDate = 'Carte expirée';
      }
    }

    // Validation du CVV
    if (!/^[0-9]{3,4}$/.test(cvv)) {
      errors.cvv = 'CVV invalide';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  getCardType(cardNumber: string): string {
    const number = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(number)) return 'visa';
    if (/^5[1-5]/.test(number)) return 'mastercard';
    if (/^3[47]/.test(number)) return 'amex';
    if (/^6(?:011|5)/.test(number)) return 'discover';
    
    return 'unknown';
  }
};