const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash  = require('connect-flash');
const ejsLocals = require('ejs-locals');
const app = express();
require('./config/passport')(passport);

// takes requests and make them usable in the req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// express session middleware
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());



// global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.counter = 0;
    next();
});


require('./models/Student');

// setting view engine to ejs
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')





module.exports  = app;