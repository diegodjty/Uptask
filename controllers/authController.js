const passport = require('passport')

exports.authUser = passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
})

exports.authenticateUser = (req, res, next) =>{


    // if user is authenticated
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not authenticated
    return res.redirect('/login')
}

exports.logout = (req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
}