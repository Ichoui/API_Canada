const http = require('http');
const app = require('./app');

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const server = http.createServer(app);

app.listen(port, hostname, function () {
    if (hostname === 'localhost') {
        console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port);
    } else {
        console.log("Mon serveur fonctionne sur http://" + hostname);
    }
});
