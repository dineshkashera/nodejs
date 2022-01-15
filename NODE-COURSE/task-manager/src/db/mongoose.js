const mongoose = require('mongoose');
const connectionUrl = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionUrl,{
            useNewUrlParser:true
});

//define db schema or user model
const User = mongoose.model('user',{
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number
    },
    globalAccess:{
        type:Boolean,
        require:true
    }
});

//User Instance created
const insertMe = new User({
    name:'ruhi',
    age:30,
    globalAccess:true
});

//insert new document into db using mongoose model
insertMe.save().then((result) => {
    return console.log('Inserted:'+result);
}).catch((error) => {
    return console.log('Error during Insertion:'+error);
});