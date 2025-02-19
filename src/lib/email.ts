// Fonctions d'envoi d'email temporaires pour le développement
export const sendEmail = async (to: string, subject: string, content: string) => {
  // Simulation d'une requête API vers le backend PHP
  const response = await fetch('/api/email/send.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to, subject, content }),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de l\'envoi de l\'email');
  }

  return response.json();
};

export const sendAdminNotificationEmail = async (
  adminEmail: string,
  userData: {
    name: string;
    email: string;
    pole?: string;
    message?: string;
  }
) => {
  const subject = 'Nouvelle inscription SQTE';
  const content = `
    Nouvelle inscription reçue :
    
    Nom: ${userData.name}
    Email: ${userData.email}
    Pôle: ${userData.pole || 'Non spécifié'}
    Message: ${userData.message || 'Aucun message'}
  `;

  return sendEmail(adminEmail, subject, content);
};