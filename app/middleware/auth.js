const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')
require('dotenv').config()
const LocalStrategy = require("passport-local").Strategy;
const RegisterLoginUser = require("../models/Register")
const bcrypt = require("bcrypt-nodejs")

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
            const newUSer = {
                googleId:profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value
            }

            try{
                let user = await User.findOne({googleId:profile.id})
                if(user){
                    done(null,user)
                }else{
                    user = await User.create(newUSer);
                    done(null, user)
                }
            }catch(err){
                console.log(err)
            }
      }
    )
  )

  passport.use(
    new LocalStrategy({
        usernameField:'email_login',
        passwordField:'password_login'
    },
            (email,password, done)=>{
                console.log(email, password)
                RegisterLoginUser.findOne({email})
                //promise
                .then(user =>{
                    if(!user){
                        return done(null, false, {msg:'Email tidak ada'})
                    }
                    if(!bcrypt.compareSync(password, user.password)){
                        return done(null, false, {msg:'password salah'})
                    }

                    return done(null, user)
                })
                .catch(err =>{
                    return done(err)
                })
            }
        )   
)
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
    RegisterLoginUser.findById(id, (err, user) => done(err, user))
  })
  
}