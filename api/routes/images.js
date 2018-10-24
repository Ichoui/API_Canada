const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Image = require('../models/image');

// GET
router.get('/', (req, res, next) => {
    Image.find()
        .select('name path _id')
        .exec()
        .then(docs => {
            const response = {
                method: "Methode GET",
                count: docs.length,
                images: docs.map(doc => {
                    return {
                        name: doc.name,
                        path: doc.path,
                        _id: doc._id
                    }
                })
            };

            if (docs.length > 0) {
                res.status(200).json(response);
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
                method: 'Methode POST',
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
        .select('name path _id')
        .exec()
        .then(docs => {
            const response = {
                method: "Methode GET id",
                image: docs
            };

            if (docs) {
                res.status(200).json(response);
            } else {
                res.status(404).json({message: 'This ID do not exist here.'})
            }
        })
        .catch(err => {
            console.log(err);
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