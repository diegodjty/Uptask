const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

// Reference to model that needs auth
const Users = require('../model/Users');


passport.use(
    new LocalStrategy(
        // by default passport needs user and password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try{
                const user = await Users.findOne({
                    where: {email:email}
                })
                // User exist, password wrong
                if(!user.verifyPassword(password)){
                    return done(null, false, {
                        message: 'Wrong password'
                    });
                }
                // User exist, correct password
                return done(null,user)

            } catch (error){

                // User dosnt exist
                return done(null, false, {
                    message: 'Account dosnt exist'
                });
            }
        }
    )
);

// serialize the user
passport.serializeUser((user,callback)=>{
    callback(null,user);
})

// deserializae user
passport.deserializeUser((user,callback)=>{
    callback(null,user)
})

module.exports = passport;