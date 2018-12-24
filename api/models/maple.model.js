const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    filepath: {type: String, required: true},
    description: String
});

// Ici, maple représente le nom de la table présente dans dev / prod de mongodb (gestion via .env)
module.exports = mongoose.model("maple", imageSchema);
