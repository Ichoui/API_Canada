const passport = require('passport');
const Google = require('passport-google-oauth20');
const User = require('../models/user.model');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    });
});


passport.use(
    new Google({
        callbackURL: '/auth/google/redirect',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    }, (accesToken, refreshToken, profile, done) => {

        User.findOne({googleId: profile.id}).then((currentUser) => {
            if (currentUser) {
                console.log('Welcome back, ' + currentUser.firstname + " " + currentUser.lastname + " :)");
                done(null, currentUser);
            } else {
                new User({
                    googleId: profile.id,
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    photo: profile.photos[0].value
                }).save().then((newUser) => {
                    console.log("Nouvel utilisateur : " + newUser.firstname + " " + newUser.lastname);
                    done(null, newUser);
                });
            }
        });

    })
);

