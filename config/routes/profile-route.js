const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req,res) => {
        res.send('you are logged in ' + req.user)
});

module.exports = router;