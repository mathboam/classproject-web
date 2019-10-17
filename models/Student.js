const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    studentID:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    hall:{
        type:String,
        default:'null',
    },
    room:{
        type:String,
        default:'null'
    }
});

const Student = mongoose.model('Student' , StudentSchema);

module.exports = Student;