const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Image = require('../models/image');

// GET
router.get('/', (req, res, next) => {
    Image.find()
        .exec()
        .then(docs => {
            if (docs.length > 0) {
                res.status(200).json(docs);
            } else {
                res.status(404).json({message: 'No data found here.'})
            }
        })
        .catch(err => {
            res.status(404).json({error: err});
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
        .then(result => {
            // console.log(result);
            res.status(201).json({
                message: 'We can POST request in /images',
                createdImage: img
            });
        })
        .catch(err => {
            // console.log(err);
            res.status(500).json({error: err})
        });
});

// GET ID
router.get('/:imageId', (req, res, next) => {
    const id = req.params.imageId;
    Image.findById(id)
        .exec()
        .then(doc => {
            // console.log("From Database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No valid entry found !'});
            }
        })
        .catch(err => {
            // console.log(err);
            res.status(500).json({error: err});
        })
});

//DELETE
router.delete("/:imageId", (req, res, next) => {
    const id = req.params.imageId;
    Image.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            // console.log(err);
            res.status(500).json({error: err});
        })
});

module.exports = router;