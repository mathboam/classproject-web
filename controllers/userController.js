const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcryptjs');
const Student = mongoose.model('Student');
const passport = require('passport');

exports.homepageController  = (req,res) =>{
    res.render('welcome',{title:'WELCOME'});
}

// register controller
exports.registerController = (req,res,next) => {
    res.render('register',{title:'Register',errors: []});
}

// login controller
exports.loginController = (req,res) => {
    res.render('login',{title:'Login',errors: []});
}

exports.registermiddleware = (req,res) => {
    const { name , email , password , studentID , password2} = req.body;
    let errors = [];

    // check required fields
    if (!name || !password || !studentID || !email ) {
        errors.push({msg:"Fill up all the fields"});
    }
    // check if password match 
    if (password != password2) {
        errors.push({msg:"Passwords donnot match"})
    }
    // check if password is strong 
    if (password.length < 6) {
        errors.push({msg:"Password should be more than six character"});
    }
    if(errors.length >0){
        res.render('register',{title:"Register",errors,name,email,studentID});
    }else{
        // check if the acoount is not registered already
        Student.findOne({studentID:studentID}).then(student =>{
            if(student){
                errors.push({msg:"The account already exist"});
                res.render('register',{
                    errors,
                    name,
                    email,
                    studentID,
                    title:'Register'
                })
            }else{
                // account is not in the database
                const newStudent = new Student({
                    name,
                    email,
                    studentID,
                    password
                })
                // console.log(newStudent);
                // res.send('hello');
                
                // // hash password
                bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newStudent.password, salt, function(err, hash) {
                        // Store hash in your password DB.
                        if (err) {
                            console.log(err);
                        }else{
                            newStudent.password = hash;
                            // save data
                            newStudent.save().then(user => {
                                if(user){
                                    req.flash('success_msg','You are successfully registered');
                                    res.redirect('/users/login');
                                }
                            }).catch(err => {
                                if (err){
                                    console.log(err);
                                    
                                }
                            });
                        }
                    });
                });
                 
            }
        })
    }
}

exports.passportAuthentication = (req,res,next) => {
    passport.authenticate('local',{
        successRedirect:'/users/dashboard',
        failureRedirect:'/users/login',
        failureFlash:true
    })(req,res,next);
}

exports.dashboardcontroller = (req,res,next)=>{
    res.render('Registration',{title:"Hall | Registration",errors:[]});
}