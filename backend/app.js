// app.js défini les routes, middlewares et les fonctionnalités de l'application

// import des librairies nécessaires
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path');

// import des routers gérant les routes
const stuffRoutes = require('./routes/stuff.js')
const userRoutes = require('./routes/user.js')

// connexion à la DB mongoDb
mongoose.connect('mongodb+srv://admin:N9N3wWkRwXjpn5iP@cluster0.j96lwry.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// création du serveur
const app = express();

// ajout du bodyParser : stock les inputs pour les stocker dans le body de la requête
app.use(bodyParser.urlencoded({ extended: false }))
// express.json : stock les requêtes json dans le body de la requête
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// permet d'importer les routes du stuff.js
app.use('/api/books', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// permet de récupérer le script (dans server.js)
module.exports = app;



