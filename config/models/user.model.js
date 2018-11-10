const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: String,
    firstname: String,
    lastname: String,
    photo: String
});

// Ici, user représente la table users
module.exports = mongoose.model('user', userSchema);
