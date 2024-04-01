// server.js
const express = require('express');
const cors = require('cors');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const path = require('path'); // Asegúrate de que 'path' está requerido

const app = express();

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ['https://www.kaficosmetics.co']; // Quita la barra diagonal final
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json()); // Analizar el cuerpo de las solicitudes JSON
app.use(express.static(path.join(__dirname, '/')));

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || '' });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.post('/send', (req, res) => {
    const data = {
        from: 'Your Name <postmaster@mail.colombianmacstore.com.co>',
        to: 'sammydn7@gmail.com',
        subject: req.body.subject,
        text: `Mensaje de: ${req.body.name} (${req.body.email})\n\n${req.body.message}`
    };

    mg.messages.create('mail.colombianmacstore.com.co', data)
        .then(msg => res.json({ msg }))
        .catch(err => {
            console.error(err); // Agrega esta línea para registrar el error
            res.status(500).json({ err });
        });
});

module.exports = app; // Exporta la aplicación Express