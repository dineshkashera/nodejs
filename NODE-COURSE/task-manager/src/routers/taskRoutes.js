const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Task = require('../model/task');//get user model


//Task route creation
router.post('/task',auth,async (req, res)=>{
    //const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner:req.user._id
    });

    try{
        await task.save()
        res.status('201').send({'success':true,"data":'Task Created','task-obj':task});
    }catch (e) {
        res.status('400').send({'success':false,'data':e});
    }

    //get all task by user id, by relationship of localfield and foreignfiels
    /* IMP
    const getalltask = asyn () => {
    const user = await User.findById('<userid>');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);
    }
     */
    /*task.save().then(() => {
        res.status('201').send({'success':true,"data":'Task Created','task-obj':task});
    }).catch((error) => {
        res.status('400').send({'success':false,'data':error.message});
    });*/
});

//get all task
///tasks?completed=true to get the completed value we use req.query.completed but its value always comes in string will need to convert into bool
//tasks?limit=10&skip=20
router.get('/tasks',auth, async (req,res) => {

    try{
        await req.user.populate({
            path:'tasks',
            match:{
                completed:false
            },
            options:{
                limit:req.query.completed, //used in pagination or sorting
                skip:req.query.skip,
                sort:{
                    completed:-1,//sort by desc, 1 sort by asc order
                }
            }
        }).execPopulate();
        res.status(200).send(req.user.tasks)
    }catch (e) {
        res.status(501).send({error:true,message:'Invalid request'})
    }
    /*Task.find({}).then((getTasks)=>{
        res.status('200').send({'status':true,'data':getTasks})
    }).catch((e) => {
        res.status('400').send({'success':false,'data':e})
    });*/
});

//get single id
router.get('/task/:id',(req,res) => {

    const _id = req.params.id;
    Task.findById(_id).then((singleTask)=>{
        if(!singleTask){
            res.status('200').send({'status':true,'data':'no Task found'})
        }
        res.status('200').send({'status':true,'data':singleTask})
    }).catch((e) => {
        res.status('400').send({'success':false,'data':e})
    });
});

module.exports = router;