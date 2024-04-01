// server.js
const express = require('express');
const cors = require('cors');
const Mailgun = require('mailgun-js');

const app = express();

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ['https://www.kaficosmetics.co'];
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json()); // Añade esto para analizar el cuerpo de las solicitudes JSON
app.use(express.static(path.join(__dirname, '/')));

const mg = Mailgun({ apiKey: process.env.MAILGUN_API_KEY || '', domain: 'mail.colombianmacstore.com.co' });

app.post('/api/send', (req, res, next) => {
    const data = {
        from: 'Your Name <postmaster@mail.colombianmacstore.com.co>',
        to: 'sammydn7@gmail.com',
        subject: req.body.subject,
        text: `Mensaje de: ${req.body.name} (${req.body.email})\n\n${req.body.message}`
    };

    mg.messages().send(data, function (error, body) {
        if (error) {
            next(error);
        } else {
            res.json({ msg: body });
        }
    });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack); // Registra el stack trace del error
    res.status(500).send('Something broke!');
});

module.exports = app; // Exporta la aplicación Express