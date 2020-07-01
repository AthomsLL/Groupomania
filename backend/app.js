require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const helmet = require('helmet');

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

// Initialisation de helmet
app.use(helmet());

// Configuration des headers CORS pour autoriser l'accès multi-origines
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Content-Type', 'Application/json');
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Type', 'image/jpg');
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Type', 'image/gif');
    res.removeHeader('X-Powered-By');
    next();
});

// Initialisation de passport pour chaque requête
// app.use(passport.initialize());

// Appel de la stratégie JWT
// require('./middleware/passport')(passport);

// Gestionnaire servant à lire le contenu de la requête
app.use(bodyParser.json());

// Gestionnaire de routage pour les images
app.use('/uploads/images', express.static(path.join(__dirname, '/uploads/images')));

// Utilisation des routes pour les users
// app.use('/api/v1/users', userRoutes);

// Utilisation des routes pour les posts
// app.use('/api/v1/posts', postRoutes);

// Utilisation des routes pour la création et la connexion des users
app.use('/api/v1/auth', authRoutes);

module.exports = app;
