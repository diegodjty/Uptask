const express = require('express');
const routes = require('./routes');
const path = require('path')
const bodyParser = require('body-parser')
// const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport')
const sendEmail = require('./handlers/email')

// helpers with some functions
const helpers = require('./helpers');

// Create connection to DB
const db = require('./config/db');

// Import models
require('./model/Projects')
require('./model/Tasks')
require('./model/Users')

db.sync()
    .then(()=>console.log('connected'))
    .catch(error=>console.log(error))

// Create an express app
const app = express();

// Where to load static files
app.use(express.static('public'))

// Enable Pug
app.set('view engine','pug')

// Enable bodyParser
app.use(bodyParser.urlencoded({extended:true}))

// add express validator to entire app
// app.use(expressValidator());



// Add Views Folder
app.set('views',path.join(__dirname,'./views'))

// Add flash messages
app.use(flash());

app.use(cookieParser());

// Sessions to matain user authenticated in different pages
app.use(session({
    secret: 'diego',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// pass var dump to app
app.use((req, res, next)=>{
    res.locals.vardump = helpers.vardump;
    res.locals.messages = req.flash();
    res.locals.user = {...req.user} || null;
    
    next();
})


app.use('/',routes())


app.listen(3000);

