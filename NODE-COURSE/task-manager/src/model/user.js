//define db schema or user model
const mongoose = require('mongoose');

const User = mongoose.model('user',{
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    globalAccess:{
        type:Boolean,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minLength:7
    },
    email:{
        type:String,
        trim:true,
        required:true
    }
});

module.exports = User;