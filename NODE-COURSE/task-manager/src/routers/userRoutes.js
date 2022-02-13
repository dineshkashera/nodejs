const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const auth      = require('../middleware/auth');
const User = require('../model/user');//get user model

//user route creation
router.post('/user',async (req,res) => {

   // res.status('201').send(req.body);
    const user = new User(req.body);

    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status('201').send({'success':true,'data':user,'token':token});
    }catch (e){
        res.status('400').send({'success':false,'data':e});
    }
    /*user.save().then(() => {
        res.status('201').send({'success':true,'data':'User created'});
    }).catch((error) => {
        res.status('400').send({'success':false,'data':error.message});
    });*/
});
//get all users
router.get('/users',async (req,res) => {

    try{
        const getusers = await User.find({})
        res.status('200').send({'status':true,'data':getusers})
    }catch (e) {
        res.status('400').send({'success':false,'data':e})
    }
    /*User.find({}).then((getusers)=>{
        res.status('200').send({'status':true,'data':getusers})
    }).catch((e) => {
        res.status('400').send({'success':false,'data':error.message})
    });*/
});

//get profile
router.get('/user/profile',auth, async (req,res) => {
    res.status(200).send(req.user);
})
//get single user by id
router.get('/user/:id',async (req,res) => {

    const _id = req.params.id;
    try{
        const singleuser = await User.findById(_id)
        if(!singleuser){
            res.status('200').send({'status':true,'data':'no user found'})
        }
        res.status('200').send({'status':true,'data':singleuser})
    }catch (e) {
        res.status('400').send({'success':false,'data':e})
    }
    /*User.findById(_id).then((singleuser)=>{
        if(!singleuser){
            res.status('200').send({'status':true,'data':'no user found'})
        }
        res.status('200').send({'status':true,'data':singleuser})
    }).catch((e) => {
        res.status('400').send({'success':false,'data':error.message})
    });*/
});

router.post('/user/login', async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status('200').send({'status':true,'message':'Login successfully','data':user,'token':token});
    }catch (e){
        res.status('400').send({'status':false,'message':'Invalid credentials'});
    }

})
module.exports = router;
