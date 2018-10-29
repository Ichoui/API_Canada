const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/banff');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        // cb(null, new Date().toISOString().replace(/:/g, '-') );
    }
});
const upload = multer({storage: storage});


// Modeles
const Image = require('../models/banff.model');

//Create folder
fs.mkdir('./images/banff', err => {
    console.log(err);
});

// GET
router.get('/', (req, res, next) => {
    Image.find()
        .select('name path filepath _id')
        .exec()
        .then(docs => {
            const response = {
                method: "Methode GET - Success",
                count: docs.length,
                images: docs.map(doc => {
                    return {
                        name: doc.name,
                        path: doc.path,
                        filepath: doc.filepath,
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
            res.status(404).json({get_error: err});
        })
});

// POST
router.post('/', upload.array('path', 1000), (req, res, next) => {
    // console.log(req.file);
    const lengthReq = req.files.length;
    let img;

    for (let i = 0; i < lengthReq; i++) {
        img = new Image({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            path: req.files[i].path,
            filepath: req.protocol + "://" + req.headers.host + "/" + req.files[i].path
        });

        img.save()
            .then(result => {
                res.status(201).json({
                    method: 'Methode POST - Success',
                    message: 'Number of images posted : ' + lengthReq,
                    // createdImage: img
                });

            })
            .catch(err => {
                // console.log(err);
                // res.status(500).json({post_error: err})
            });
    }
    // res.redirect("back") // redirect to the last page
});

// GET ID
router.get('/:imageId', (req, res, next) => {
    const id = req.params.imageId;
    Image.findById(id)
        .select('name path _id')
        .exec()
        .then(docs => {
            const response = {
                method: "Methode GET id - Success",
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
            res.status(500).json({getid_error: err});
        });
});

// A COMMENTER QUAND APP EN PROD
router.delete("/", (req, res, next) => {
    Image.remove({})
        .exec()
        .then(result => {
            res.status(200).json({success: 'La table a été vidé', message: result})
        })
        .catch(err => {
            res.status(500).json({delete_error: err});
        });
});

//DELETE ID
router.delete("/:imageId", (req, res, next) => {
    const id = req.params.imageId;
    Image.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            // console.log(err);
            res.status(500).json({delete_error: err});
        })
});

module.exports = router;