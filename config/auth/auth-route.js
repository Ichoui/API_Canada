const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/logout', (req, res) => {
   res.send('logout')
});

module.exports = router;