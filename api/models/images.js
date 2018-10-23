const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    _id: Mongoose.Types.ObjectId,
    name: String,
    path: String
});