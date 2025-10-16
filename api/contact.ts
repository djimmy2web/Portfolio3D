import { NextApiRequest, NextApiResponse } from 'next';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Vérifier que la méthode est POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message }: ContactFormData = req.body;

    // Validation des données
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Ici vous pouvez ajouter l'envoi d'email avec un service comme:
    // - Nodemailer avec Gmail
    // - SendGrid
    // - Resend
    // - EmailJS
    
    // Pour l'instant, on simule l'envoi
    console.log('Nouveau message de contact:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // Réponse de succès
    res.status(200).json({
      message: 'Message sent successfully',
      success: true,
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
}
