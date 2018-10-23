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
    const image = new Image({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        path: req.body.path
    });

    image.save().then(e => {
        console.log(e);
    });

    res.status(201).json({
        message: 'We can POST request in /images',
        createdImage: image
    })
});

// GET ID
router.get('/:imageId', (req, res, next) => {
    const id = req.params.imageId;
    if (id === 'canada') {
        res.status(200).json({
            message: 'This is an Canada ID :)',
            id: id
        })
    } else {
        res.status(200).json({
            message: 'This is NOT an Canada ID :('
        })
    }
});

module.exports = router;