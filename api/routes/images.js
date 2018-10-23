const express = require('express');
const router = express.Router();

// GET
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'We can GET request in /images'
    })
});

// POST
router.post('/', (req, res, next) => {
    const img = {
        name: req.body.name,
        path: req.body.path
    };
    res.status(201).json({
        message: 'We can POST request in /images',
        createdImage: img
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