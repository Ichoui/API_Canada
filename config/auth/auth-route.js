const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/logout', (req, res) => {
   res.send('logout')
});

// callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
   res.send('callback google')
});

module.exports = router;