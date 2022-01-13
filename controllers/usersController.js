const Users = require('../model/Users')


exports.createAcctForm = (req,res)=>{
    res.render('createAccount',{
        pageName: 'Create Account'
    })
}

exports.loginForm = (req,res)=>{
    const {error} = res.locals.messages;
    res.render('login',{
        pageName: 'Login',
        error
    })
}

exports.createAcct = async (req, res)=>{
    // Read data
    const {email, password} = req.body;

    try{
         
        await Users.create({
            email,
            password
        });
        res.redirect('/login')
    }catch (error){
        req.flash('error', error.errors.map(error => error.message));
        res.render('createAccount',{
            messages: req.flash(),
            pageName: 'Create Account',
            email,
            password
        })
    }
}

exports.reestablishPassword = async (req, res)=>{
    res.render('reestablish',{
        pageName: 'Reestablish Password'
    })
}