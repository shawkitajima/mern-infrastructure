const passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
const User = require('../models/user');

passport.use(new FacebookTokenStrategy( {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    fbGraphVersion: 'v3.0'
}, 
    async function(accessToken, refreshToken, profile, done) {
        try {
            let user = await User.findOne({facebookId: profile.id});
            if (!user) {
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    facebookId: profile.id,
                });
            }
            done(null, user);
        } catch(err) {
            console.log(err);
            done(err);
        }
    }
));