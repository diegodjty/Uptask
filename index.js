const express = require('express');
const routes = require('./routes');
const path = require('path')
const bodyParser = require('body-parser')

// helpers with some functions
const helpers = require('./helpers');

// Create connection to DB
const db = require('./config/db');

// Import models
require('./model/Projects')
require('./model/Tasks')
db.sync()
    .then(()=>console.log('connected'))
    .catch(error=>console.log(error))

// Create an express app
const app = express();

// Where to load static files
app.use(express.static('public'))

// Enable Pug
app.set('view engine','pug')

// Add Views Folder
app.set('views',path.join(__dirname,'./views'))

// pass var dump to app
app.use((req, res, next)=>{
    res.locals.vardump = helpers.vardump;
    next();
})

// Enable bodyParser
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',routes())


app.listen(3000);
