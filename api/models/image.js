const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    path: {type: String, required: true},
    filepath: {type: String, required: true}
});

const arraySchema = mongoose.Schema({
    array: imageSchema
});

module.exports = mongoose.model('Image', imageSchema);
