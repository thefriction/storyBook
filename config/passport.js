const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport){   

    passport.use(
        new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL : 'http://localhost:3000/auth/google/callback'
        },
    async(accessToken, refreshToken, profile, done) => {
            //console.log(profile) 
            //store content of profile in our db by creating a db object
            const newUser = {
                googleId:profile.id,
                displayName:profile.displayName,
                firstName:profile.name.givenName,
                lastName:profile.name.familyName,
                image:profile.photos[0].value
            }

            try{
                let user = await User.findOne({googleId:profile.id})
                if(!user)
                {
                    user = await User.create(newUser)
                }
                done(null,user);
            }catch(err)
            {
                console.log(err);
            }

         }))
    passport.serializeUser((user, done)=> {
        done(null, user.id)
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=>
          done(err, user))
      });      
}