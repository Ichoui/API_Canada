const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    path: String
});

module.export = mongoose.model('Image', imageSchema);