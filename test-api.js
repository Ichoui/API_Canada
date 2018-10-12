//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.
var express = require('express');
var bodyParser = require("body-parser");
require("test");


// Nous définissons ici les paramètres du serveur.
var hostname = 'localhost';
var port = 4620;

var app = express();

//Afin de faciliter le routage (les URL que nous souhaitons prendre en charge dans notre API), nous créons un objet Router.
//C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes.
var myRouter = express.Router();

// Je vous rappelle notre route (/canada).
myRouter.route('/canada')
// J'implémente les méthodes GET, PUT, UPDATE et DELETE
// GET
//     .get(function(req,res){
//         res.json({message : "Liste toutes les photos du Canada", methode : req.method});
//     })

    .get(function(req,res){
        res.json({
            message : "Liste les piscines de Lille Métropole avec paramètres :",
            ville : req.query.ville,
            nbResultat : req.query.maxresultat,
            methode : req.method })
        //http://localhost:4620/canada?ville=Roubaix&maxresultat=8
        // .res.status(200).send('<h1>TexteTexteTexte</h1>');
    })
    //POST
    // .post(function(req,res){
    //     res.json({message : "Ajoute une nouvelle photo à la liste", methode : req.method});
    // })
    .post(function(req,res){
        res.json({message : "Ajoute une nouvelle peeiscine à la liste",
            nom : req.body.nom,
            ville : req.body.ville,
            taille : req.body.taille,
            methode : req.method});
    })

    //PUT
    .put(function(req,res){
        res.json({message : "Mise à jour des informations des photos", methode : req.method});
    })
    //DELETE
    .delete(function(req,res){
        res.json({message : "Suppression d'une photo dans la liste", methode : req.method});
    });

myRouter.route('/')
// all permet de prendre en charge toutes les méthodes.
    .all(function(req,res){
        res.json({message : "API de moi, bonjour ☺ ", methode : req.method});
    });


// Nous demandons à l'application d'utiliser notre routeur
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(myRouter);

// Démarrer le serveur
app.listen(port, hostname, function(){
    console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port);
});
