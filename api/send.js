// api/send.js
const Mailgun = require('mailgun.js');
const formData = require('form-data');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || '' });

module.exports = (req, res) => {
    const data = {
        from: process.env.MAILGUN_FROM,
        to: process.env.MAILGUN_TO,
        subject: req.body.subject,
        text: `Mensaje de: ${req.body.name} (${req.body.email})\n\n${req.body.message}`
    };

    mg.messages.create(process.env.MAILGUN_DOMAIN, data)
        .then(msg => res.json({ msg }))
        .catch(err => {
            console.error(err);
            res.status(500).send(`¡Algo se rompió! Error: ${err.message}`);
        });
};