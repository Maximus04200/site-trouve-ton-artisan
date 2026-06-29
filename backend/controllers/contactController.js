
const { Artisan } = require('../models');
const transporter = require('../config/mailer');

exports.envoyerContact = async (req, res) => {
  try {
  
    const { artisanId, nom, email, objet, message } = req.body;


    const artisan = await Artisan.findByPk(artisanId);

    if (!artisan) {
      return res.status(404).json({ erreur: 'Artisan non trouvé.' });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,        
      to: artisan.email,                    
      replyTo: email,                       
      subject: `[Trouve ton artisan] ${objet}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>De :</strong> ${nom} (${email})</p>
        <p><strong>Objet :</strong> ${objet}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
        <hr>
        <p style="font-size:12px;color:#888;">
          Ce message a été envoyé via le formulaire de contact
          du site Trouve ton artisan.
        </p>
      `
    });

    res.status(200).json({
      message: 'Votre message a été envoyé avec succès. Vous recevrez une réponse sous 48h.'
    });

  } catch (error) {
    console.error('Erreur envoi email :', error);
    res.status(500).json({ erreur: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' });
  }
};
