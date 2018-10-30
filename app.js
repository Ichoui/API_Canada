const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// LOGIN GOOGLE
const passportSetup = require('./config/auth/auth-google');
const routeGoogle = require('./config/auth/auth-route');
app.use('/', routeGoogle);
app.use('/auth', routeGoogle);
// app.use('/google', routeGoogle);


// ROUTES
const banffRoutes = require('./api/routes/banff');

// DATABASE
const urlMongoose = 'mongodb+srv://canada:' + process.env.MONGO_ATLAS_PW + '@api-canada-hiz94.mongodb.net/test?retryWrites=true';

mongoose.connect(urlMongoose, {useNewUrlParser: true})
    .then(e => console.log('State : Connected to database!'))
    .catch(err => console.log('State : Cant\'t connect to Database', err));
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
// app.use('/banff', express.static('banff')); // localhost:4620/path = image

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accepte, Authorization');
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//  ACCES AUX PATHS
app.use('/banff', banffRoutes);
app.use(express.static(path.join(__dirname, 'public'))); // declare le dossier public comme le dossier racine avec les ressources
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html')); // path pour index
});

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
