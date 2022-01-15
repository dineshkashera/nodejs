const mongoose = require('mongoose');
const connectionUrl = 'mongodb://127.0.0.1:27017/task-manager-api';
const validator = require('validator');

mongoose.connect(connectionUrl,{
    useNewUrlParser:true
});

//define db schema or user model
const task = mongoose.model('task',{
    description:{
        type:String,
        require:true,
        trim:true
    },
    completed:{
        type:Boolean,
        require:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    }
});

//User Instance created
const taskadd = new task({
    description:'Need to focus on business communication',
    completed:false,
    email:'dineshk@one.com '
});

//insert new document into db using mongoose model
taskadd.save().then((result) => {
    return console.log('Inserted:'+result);
}).catch((error) => {
    return console.log('Error during Insertion:'+error);
});