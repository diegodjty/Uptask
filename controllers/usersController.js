const Users = require('../model/Users')
const sendEmail = require('../handlers/email')


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

        // creat url to confirm
        const confirmUrl = `http://${req.headers.host}/confirm/${email}`;

        // creat object of user
        const user = {
            email
        }
        // send email
        await sendEmail.send({
            user,
            subject: 'Confirm Uptask Account',
            confirmUrl,
            file: 'confirmAccount'
        })

        // redirect user

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

// change status of account
exports.confirmAccount = async(req, res)=>{
    const user = await Users.findOne({
        where:{
            email: req.params.email
        }
    })
    
    if(!user){
        req.flash('error', 'Not valid');
        res.redirect('/createAccount')
    }

    user.active = 1;
    await user.save();

    res.redirect('/login')
}