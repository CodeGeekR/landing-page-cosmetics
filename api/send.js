// api/send.js
const Mailgun = require('mailgun.js');
const formData = require('form-data');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || '' });

module.exports = (req, res) => {
    console.log('Función sin servidor invocada'); // Esta línea aparecerá en los registros de Vercel

    const data = {
        from: process.env.MAILGUN_FROM,
        to: process.env.MAILGUN_TO,
        subject: req.body.subject,
        text: `Mensaje de: ${req.body.name} (${req.body.email})\n\n${req.body.message}`
    };

    console.log('Enviando correo ...'); // Esta línea también aparecerá en los registros

    mg.messages.create(process.env.MAILGUN_DOMAIN, data)
        .then(msg => {
            console.log('Correo enviado con éxito!'); // Esta línea aparecerá en los registros si el correo se envía con éxito
            res.json({ msg });
        })
        .catch(err => {
            console.error('Error al enviar correo:', err); // Esta línea aparecerá en los registros si hay un error
            res.status(500).send(`¡Algo se rompió! Error: ${err.message}`);
        });
};