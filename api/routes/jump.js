const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const albumName = process.env.JUMP_FOLDER;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/' + albumName);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        // cb(null, new Date().toISOString().replace(/:/g, '-') );
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'image/svg') {
        cb(null, true)
    }
    else {
        // cb(null, false)
        cb(new Error(req), false)
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

//Create folder (Laisser le dossier images à la racine)
/*fs.mkdir('./images/' + albumName, err => {
});*/

// Modeles
const Image = require('../models/' + albumName + '.model');

// GET
router.get('/', (req, res, next) => {
    Image.find()
        .select('_id name filepath description')
        .exec()
        .then(docs => {
            const response = {
                method: "Methode GET - Success",
                count: docs.length,
                images: docs.map(doc => {
                    console.log(doc);
                    return {
                        _id: doc._id,
                        name: doc.name,
                        filepath: doc.filepath,
                        description: doc.description
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
    // console.log(req);
    const lengthReq = req.files.length;
    let img;

    for (let i = 0; i < lengthReq; i++) {
        let mypath = req.files[i].path;
        let splittedUrl;

        // Si on a des \\ alors on découpe l'url en fonction des \ sinon on découpe en fonction des /
        if (mypath.indexOf('\\') >= 1) {
            splittedUrl = mypath.split('\\'); // non (ou faut voir si c'est pas windows .. ? split('\\')
        } else {
            splittedUrl = mypath.split('/'); // non (ou faut voir si c'est pas windows .. ? split('\\')
        }
        // console.log(mypath);
        // console.log(splittedUrl[1]);
        img = new Image({
            _id: new mongoose.Types.ObjectId(),
            name: req.files[i].filename,
            filepath: req.protocol + "://" + req.headers.host + "/" + splittedUrl[1] + "/" + splittedUrl[2],
            description: null
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

// DELETE ALL IMAGES
router.delete("/", (req, res, next) => {
    // delete tout dans le dossier conteneur
    Image.find()
        .select('name')
        .exec()
        .then(docs => {
            console.log(docs);
            fs.readdir('./images/' + albumName, function (err, files) {
                for (const file of files) {
                    fs.unlink('./images/'+ albumName + '/'+ file, err => {
                        if (err ) {console.log(err)}
                    })
                }
            });
        })
        .catch(error => {
            console.log(error);
        });

    // delete tout dans la database
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

    // Remove une seule image dans le dossier contenant l'image
    Image.findById(id)
        .select('name')
        .exec()
        .then(docs => {
            let name = docs.name;
            fs.unlink('./images/' + albumName + '/' + name, function () {
            });
        })
        .catch(error => {
            console.log(error);
        });

    // Remove une seule image dans la database
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

// UPDATE DESCRIPTION
router.patch('/:imageId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

module.exports = router;