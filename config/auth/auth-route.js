const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

// callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user); //callback google
    res.redirect('/profile/')
});

module.exports = router;