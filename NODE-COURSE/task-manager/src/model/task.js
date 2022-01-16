const mongoose = require('mongoose');

//define db schema or user model
const task = mongoose.model('task',{
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

module.exports = task;

