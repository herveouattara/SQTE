import { jsPDF } from 'jspdf';

// Interface pour les données du PDF
interface EventRegistrationData {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  userName: string;
  userEmail: string;
  registrationDate: string;
  registrationId: string;
}

// Fonction de génération du PDF
export const generateEventRegistrationPDF = (data: EventRegistrationData): string => {
  const doc = new jsPDF();
  
  // Configuration du document
  doc.setFont("helvetica");
  doc.setFillColor(26, 43, 80); // Bleu SQTE
  
  // En-tête
  doc.rect(0, 0, 210, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text("SQTE", 20, 20);
  doc.setFontSize(16);
  doc.text("Confirmation d'inscription", 20, 30);

  // Informations de l'événement
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.text("Détails de l'événement", 20, 60);
  
  doc.setFontSize(12);
  doc.text(`Événement : ${data.eventTitle}`, 30, 75);
  doc.text(`Date : ${data.eventDate}`, 30, 85);
  doc.text(`Heure : ${data.eventTime}`, 30, 95);
  doc.text(`Lieu : ${data.eventLocation}`, 30, 105);

  // Informations du participant
  doc.setFontSize(14);
  doc.text("Informations du participant", 20, 130);
  
  doc.setFontSize(12);
  doc.text(`Nom : ${data.userName}`, 30, 145);
  doc.text(`Email : ${data.userEmail}`, 30, 155);

  // Informations d'inscription
  doc.setFontSize(14);
  doc.text("Détails de l'inscription", 20, 180);
  
  doc.setFontSize(12);
  doc.text(`Date d'inscription : ${data.registrationDate}`, 30, 195);
  doc.text(`Numéro d'inscription : ${data.registrationId}`, 30, 205);

  // Pied de page
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text("Ce document est votre confirmation d'inscription. Veuillez le présenter lors de l'événement.", 20, 240);
  doc.text("SQTE - Association culturelle et artistique", 20, 250);
  doc.text("www.sqte.com", 20, 255);

  // Générer le PDF
  return doc.output('datauristring');
};