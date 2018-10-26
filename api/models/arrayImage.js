const mongoose = require('mongoose');

const imageArraySchema = mongoose.Schema({
    arrayImage: Array
});

module.exports = mongoose.model('imageArray', imageArraySchema);
