const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());//automatically parse request json
require('./db/mongoose');// initiate db connection

const User = require('./model/user');//get user model
const Task = require('./model/task');

//user route creation
app.post('/user',(req,res) => {

    const user = new User(req.body);

    user.save().then(() => {
        res.status('201').send({'success':true,'data':'User created'});
    }).catch((error) => {
        res.status('400').send({'success':false,'data':error.message});
    });
});

//Task route creation
app.post('/task',(req, res)=>{
    const task = new Task(req.body);
    task.save().then(() => {
        res.status('201').send({'success':true,"data":'Task Created','task-obj':task});
    }).catch((error) => {
        res.status('400').send({'success':false,'data':error.message});
    });
});

//get all users
app.get('/users',(req,res) => {

    User.find({}).then((getusers)=>{
        res.status('200').send({'status':true,'data':getusers})
    }).catch((e) => {
        res.status('400').send({'success':false,'data':error.message})
    });
});

//get single user by id
app.get('/user/:id',(req,res) => {

    const _id = req.params.id;
    User.findById(_id).then((singleuser)=>{
        if(!singleuser){
            res.status('200').send({'status':true,'data':'no user found'})
        }
        res.status('200').send({'status':true,'data':singleuser})
    }).catch((e) => {
        res.status('400').send({'success':false,'data':error.message})
    });
});

//get all task
app.get('/tasks',(req,res) => {

    Task.find({}).then((getTasks)=>{
        res.status('200').send({'status':true,'data':getTasks})
    }).catch((e) => {
        res.status('400').send({'success':false,'data':error.message})
    });
});

//get single id
app.get('/task/:id',(req,res) => {

    const _id = req.params.id;
    Task.findById(_id).then((singleTask)=>{
        if(!singleTask){
            res.status('200').send({'status':true,'data':'no Task found'})
        }
        res.status('200').send({'status':true,'data':singleTask})
    }).catch((e) => {
        res.status('400').send({'success':false,'data':error.message})
    });
});

app.listen(port,() => {
   console.log('Server started on port::'+ port);
});