#Guide 

### Commandes NPM
<strong>npm start : </strong>Démarrer le projet (pour la prod)<br/>
<strong>npm stop : </strong>Arrêter le projet<br/>
<strong>npm restart : </strong>Redémarrer le projet<br/>
<strong>npm run nodemon : </strong>Démarrer le projet avec les logs nodemon (en dev uniquement)<br/>
<strong>npm run logs : </strong>Lancer les logs<br/>
<strong>npm run buildcss : </strong>Compiler le css une fois<br/>
<strong>npm run watch : </strong>Compiler le css et le watcher<br/>
<strong>npm run start_node : </strong>Démarrer le projet nativement avec nodeJs<br/>
<strong>npm run monitor : </strong>Ouvrir le moniteur pour des informations supplémentaires quant au run de ou des applications en cours<br/>


### Ajouter un nouvel album
- Créer dans le fichier ``.env`` le nom du futur album (variable réutilisée partout dans l'appli)
- Dupliquer un Modèle dans ``api/models``, puis renommer le model de la database
- Dupliquer une Route dans ``api/routes``, puis renommer la variable du Folder dans les imports ``albumName``
- ``App.js``<br><ul>
    <li>Appeler le modèle récemment créé sous forme de variable (ex: <b>const banffRoutes = require('./api/routes/banff')</b></li>
    <li>Utiliser cette variable (ex : <b>app.use('/banff', banffRoutes)</b></li></ul>
- Ajouter une nouvelle ``condition @elseIf`` dans la fonction ``whereIAm()`` dans ``/public/resources/js/data-json.js``
- Passer une nouvelle variable ``{newAlbum}Folder`` à la vue profile.ejs dans ``config/routes/profile-route.js``
- Dupliquer ``blocks-block`` en :<ul><li>remplaçant les <b>4</b> variables avec celle du nouvel album créée à l'étape précédente</li><li>incrémenter l'<b>ID</b> de l'<i>input</i> et son <i>label</i> associé</li></ul>
- Se référer en dernier lieu au <b>Quatrième point</b> de la section suivante

### Déployer en prod - côté serveur
- ``npm stop`` pour couper le serveur le temps du déploiement
- ``git pull`` depuis le dossier<ul><li>``git stash`` si des modifications non-importante on été faite en prod)</li></ul>
- ``npm i`` si nouveau package installé en dév
- update du fichier ``.env`` si il a été modifié en dév avec le même contenu (important)
- ``npm start`` pour relancer le serveur

---
##### Attention : il est nécessaire d'avoir un fichier .env pour le bon fonctionnement du projet. Ce fichier est .gitignore et est réservé à l'administrateur.
