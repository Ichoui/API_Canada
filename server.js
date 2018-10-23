const http = require('http');
const app = require('./app');

const hostname = 'localhost';
const port = process.env.PORT || 4620;

const server = http.createServer(app);

app.listen(port, hostname, function () {
    console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port);
});