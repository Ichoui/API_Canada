const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Image = require('../models/image');

// GET
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'We can GET request in /images'
    })
});

// POST
router.post('/', (req, res, next) => {
    const img = new Image({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        path: req.body.path
    });

    img
        .save()
        .then(e => {
            res.status(201).json({
                message: 'We can POST request in /images',
                createdImage: img
            })
        }).catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});

// GET ID
router.get('/:imageId', (req, res, next) => {
    const id = req.params.imageId;
    Image.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err)
        })
});

module.exports = router;