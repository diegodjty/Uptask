const passport = require('passport')
const Users = require('../model/Users')
const crypto = require('crypto')
const Sequalize = require('sequelize')
const Op = Sequalize.Op
const bcrypt = require('bcrypt-nodejs')

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

//generate a toke if is a valid user
exports.sendToken = async (req,res)=>{
    // verify that user exist
    const user = await Users.findOne({where:{email:req.body.email}})
    
    if(!user){
        req.flash('error','Account dosnt exist')
        res.redirect('/reestablish')
    }

    // user exist
    user.token = crypto.randomBytes(20).toString('hex')
    user.expiration = Date.now()+ 3600000;

    await user.save();

    // reset url  
    const resetUrl = `http://${req.headers.host}/reestablish/${user.token}`;
    res.redirect(resetUrl)
    console.log(resetUrl)
}

exports.validateToken = async(req,res)=>{
    const user = await Users.findOne({
        
        where:{
            token: req.params.token
        }
    })

    if(!user){
        req.flash('error','Not Valid');
        res.redirect('/reestablish')
    }

    res.render('resetPassword',{
        pageName: 'Reset Password'
    })

}

// change password for a new one
exports.updatePassword = async(req, res)=>{

    // verify if token is valid and expiration date
    const user = await Users.findOne({
        where:{
            token: req.params.token,
            expiration: {
                [Op.gte] : Date.now()
            }
        }
    })

    // verify if user exist
    if(!user){
        req.flash('error','Not Valid');
        res.redirect('/reestablish');
    }


    user.password = bcrypt.hashSync(req.body.password.password,bcrypt.genSaltSync(10));
    user.token = null;
    user.expiration = null;

    await user.save();

    req.flash('correct','Your password was changed succesfully')
    res.redirect('/login')


   
}