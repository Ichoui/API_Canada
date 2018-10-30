const passport = require('passport');
const Google = require('passport-google-oauth20');

passport.use(
    new Google({
        callbackURL: '/auth/google/redirect',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    }, () => {
    })
);

