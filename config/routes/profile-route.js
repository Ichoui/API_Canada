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
     console.log('you are logged in ' + req.user.firstname + req.user.googleId);
    res.render('profile', { user: req.user, admin: process.env.GOOGLE_ID_ADMIN })

});

module.exports = router;