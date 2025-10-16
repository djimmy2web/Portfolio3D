import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message }: ContactFormData = req.body;

    // Validation des données
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Champs requis manquants' });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Format d\'email invalide' });
    }

    // Configuration Nodemailer
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Vérification de la configuration
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error('Configuration Gmail manquante');
      return res.status(500).json({ 
        message: 'Configuration email manquante',
        success: false 
      });
    }

    // Configuration de l'email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'djimmy.allard@hotmail.fr',
      subject: `Nouveau message de contact - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
          <div style="background: white; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #00d9ff; margin-bottom: 20px; text-align: center;">
              📧 Nouveau message de contact
            </h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00d9ff;">
              <p style="margin: 5px 0;"><strong>👤 Nom:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>📧 Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>📅 Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
            </div>
            
            <div style="background: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
              <h3 style="color: #333; margin-bottom: 15px;">💬 Message:</h3>
              <p style="white-space: pre-wrap; line-height: 1.6; color: #555;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e9ecef;">
              <p style="color: #666; font-size: 12px;">
                Message envoyé depuis votre portfolio
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        Nouveau message de contact
        ========================
        
        Nom: ${name}
        Email: ${email}
        Date: ${new Date().toLocaleString('fr-FR')}
        
        Message:
        ${message}
        
        ---
        Message envoyé depuis votre portfolio
      `,
    };

    // Envoi de l'email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email envoyé avec succès:', info.messageId);
    
    res.status(200).json({
      message: 'Message envoyé avec succès',
      success: true,
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    res.status(500).json({
      message: 'Erreur lors de l\'envoi du message',
      success: false,
    });
  }
}
