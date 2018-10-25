const mongoose = require('mongoose');

const imageArraySchema = mongoose.Schema({
    test: Array
});

module.exports = mongoose.model('imageArray', imageArraySchema);
