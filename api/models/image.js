const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    path: String
});

module.exports = mongoose.model('Image', imageSchema);