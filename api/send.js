// send.js
// Importamos las dependencias necesarias para nuestra aplicación
require('dotenv').config(); // dotenv nos permite usar variables de entorno en un archivo .env
const express = require('express'); // express es un framework para crear servidores HTTP en Node.js
const cors = require('cors'); // cors nos permite configurar el Cross-Origin Resource Sharing para nuestra aplicación
const formData = require('form-data'); // form-data nos permite manejar datos de formularios multipart/form-data
const Mailgun = require('mailgun.js'); // mailgun.js es un cliente para la API de Mailgun
const expressSanitizer = require('express-sanitizer'); // express-sanitizer nos permite sanitizar los datos de las solicitudes HTTP
const rateLimit = require('express-rate-limit'); // express-rate-limit nos permite limitar el número de solicitudes que se pueden realizar a una aplicación
// const path = require('path'); // path nos permite trabajar con rutas de archivos y directorios

// Creamos una nueva aplicación Express
const app = express();

// Lista de orígenes permitidos para las solicitudes CORS
const whitelist = ['https://www.kaficosmetics.co'];

// Opciones de CORS
const options = {
    // Esta función se ejecuta para cada solicitud para verificar si el origen está permitido
    origin: function (origin, callback) {
        // Si no hay un origen (por ejemplo, la solicitud es desde el mismo origen) o el origen está en la lista blanca, la solicitud está permitida
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            // Si el origen no está permitido, se lanza un error
            callback(new Error('Not allowed by CORS'));
        }
    },
    // Métodos HTTP permitidos
    methods: "POST"
};

// Aplicamos las opciones de CORS a nuestra aplicación Express
app.use(cors(options));

// Usamos el middleware express.json() para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Usamos express-sanitizer como middleware después de express.json()
app.use(expressSanitizer());

// Servimos archivos estáticos desde el directorio raíz
// app.use(express.static(path.join(__dirname, '/')));

// Creamos un nuevo cliente de Mailgun
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
});

// Aplica una limitación de tasa de 100 solicitudes por hora a todas las rutas
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 20 // limita cada IP a 20 solicitudes por ventana
});
app.use(limiter);

// Definimos una ruta POST para enviar correos electrónicos
app.post('/api/send', (req, res, next) => {
    // Los datos del correo electrónico se toman del cuerpo de la solicitud
    const data = {
        from: process.env.MAILGUN_FROM,
        to: process.env.MAILGUN_TO,
        subject: req.sanitize(req.body.subject),
        text: `Mensaje de: ${req.sanitize(req.body.name)} (${req.sanitize(req.body.email)})\n\n${req.sanitize(req.body.message)}`
    };

    // Intentamos enviar el correo electrónico
    mg.messages.create(process.env.MAILGUN_DOMAIN, data)
        .then(msg => res.json({ msg })) // Si se envía con éxito, respondemos con el mensaje de Mailgun
        .catch(err => {
            console.error(err); // Si hay un error, lo registramos
            next(err); // Pasamos el error al siguiente middleware
        });
});

// manejar las peticiones get
// app.get('/api/send', (req, res) => {
//     res.send('¡Hola! Soy un servidor Express que envía correos electrónicos.');
// });

// Middleware de manejo de errores
// Este middleware se ejecuta si cualquier otro middleware llama a next() con un error
app.use((err, req, res, next) => {
    console.error(err.stack); // Registramos el stack trace del error
    // Respondemos con un estado 500 y un mensaje de error genérico
    res.status(500).send('¡Algo se rompió!');
});

// Especificamos en que puerto nuestra aplicación Express debe escuchar
// (Habilitar únicamente si se está ejecutando en modo de desarrollo)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

// Exportamos la aplicación Express para que pueda ser usada en otros módulos
module.exports = app;

