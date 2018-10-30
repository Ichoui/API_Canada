const passport = require('passport');
const Google = require('passport-google-oauth20');
const User = require('../user.model');

passport.use(
    new Google({
        callbackURL: '/auth/google/redirect',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    }, (accesToken, refreshToken, profile, done) => {
        console.log(profile);
        // console.log(profile.photos);
        new User({
            googleId: profile.id,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            photo: profile.photos
        }).save().then((newUser) => {
            console.log(newUser);
        })
    })
);

