const mongoose = require('mongoose');


const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    filepath: {type: String, required: true}
});

// Ici, la variable d'environnement représente le nom de la table (gestion prod / dev) ==> voir dans .env
module.exports = mongoose.model("banff", imageSchema);
