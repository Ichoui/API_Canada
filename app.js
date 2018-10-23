const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()


const imagesRoutes = require('./api/routes/images');

const urlMongoose = 'mongodb+srv://canada:' + process.env.MONGO_ATLAS_PW  + '@api-canada-hiz94.mongodb.net/test?retryWrites=true';
//const urlMongoose = 'mongodb://canada:' + process.env.MONGO_ATLAS_PW + '@api-canada-shard-00-00-hiz94.mongodb.net:27017,api-canada-shard-00-01-hiz94.mongodb.net:27017,api-canada-shard-00-02-hiz94.mongodb.net:27017/test?ssl=true&replicaSet=API-Canada-shard-0&authSource=admin&retryWrites=true';

mongoose.connect(urlMongoose)
    .then(e => console.log('State : Connected to database!'))
    .catch(err => console.log('State : Cant\'t connect to Database', err));

app.use(morgan('dev'));
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


app.use('/images', imagesRoutes);

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
