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
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    }
});

module.exports = task;

