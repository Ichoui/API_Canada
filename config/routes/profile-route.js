const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

const authCheck = (req, res, next) => {
    if (!req.user) {
        // if user is not logged
        res.redirect('/');
    } else {
        // if loggedin
        next();
    }
};

router.get('/profile', authCheck, (req, res) => {
    // res.send('you are logged in ' + req.user.firstname)
    console.log('you are logged in ' + req.user.firstname + ' -- GoogleID : ' +  req.user.googleId);
    res.render('profile', {
        user: req.user,
        folderBanff: process.env.BANFF_FOLDER,
        folderFrancois: process.env.FRANCOIS_FOLDER,
        folderMaple: process.env.MAPLE_FOLDER,
        folderJump: process.env.JUMP_FOLDER
    });
});

module.exports = router;