const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('dotenv').config();
const fs = require('fs');

// COOKIE
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));


// CORS : CROSS-ORIGIN-RESOURCE-SHARING
// Permet l'échange entre 2 domaines différents de data's, très important
// app.use(cors()); == fait la même chose que le app.use en dessous, plugin express 'cors'
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    // //
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// init
app.use(passport.initialize());
app.use(passport.session());

// LOGIN GOOGLE
const passportSetup = require('./config/auth/auth-google');
const routeGoogle = require('./config/auth/auth-route');
const profileRoute = require('./config/routes/profile-route');

// ROUTES API images
const banffRoutes = require('./api/routes/banff');
const mapleRoutes = require('./api/routes/maple');
const francoisRoutes = require('./api/routes/francois');
const jumpRoutes = require('./api/routes/jump');

// DATABASE
const urlMongoose = 'mongodb+srv://canada:' + process.env.MONGO_ATLAS_PW +
    '@api-canada-hiz94.mongodb.net/' + process.env.MONGO_DATABASE + '?retryWrites=true';

mongoose.connect(urlMongoose, {useNewUrlParser: true})
    .then(e => console.log('State : Connected to database!'))
    .catch(err => console.log('State : Cant\'t connect to Database', err));
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'images'))); // donne le droit d'accès au dossier au dossier images (pour les images de l'api)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//VIEW ENGINE
app.set('view engine', 'ejs'); //préchargement engine
app.set('views', path.join(__dirname, '/public/')); // changement du dossier views

//  ACCES AUX PATHS API & Index
app.use(express.static(path.join(__dirname, 'public'))); // donne les droits d'accès au dossier public (pour les resources)
app.get('/', function (req, res) {
    res.render('index');
});
app.use('/banff', banffRoutes);
app.use('/maple', mapleRoutes);
app.use('/francois', francoisRoutes);
app.use('/jump', jumpRoutes);

// Paths google et authentification
app.use('/', routeGoogle);
app.use('/', profileRoute);
app.use('/auth', routeGoogle);
// app.use('/google', routeGoogle);


// GESTION DES ERREURS 404 et 500
app.use((req, res, next) => {
    const error = new Error('Not Found !');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;
