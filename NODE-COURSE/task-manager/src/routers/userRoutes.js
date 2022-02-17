const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const auth      = require('../middleware/auth');
const User = require('../model/user');//get user model
const multer = require('multer');

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
router.get('/users',auth,async (req,res) => {

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
router.get('/user/:id',auth, async (req,res) => {

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

});

//logout user
router.post('/user/logout',auth,async (req,res) => {
   try{
       req.user.tokens = req.user.tokens.filter((token)=>{
           return token.token !== req.token;
       })
       await req.user.save();
       res.status(200).send();
   }catch (e) {
       res.status(501).send({error:true,message:'something wrong'});
   }

});

//logout user
router.post('/user/logoutall',auth,async (req,res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send();
    }catch (e) {
        res.status(501).send({error:true,message:'something wrong'});
    }
});

const upload = multer({
    dest: 'avatars',
    limits: {
            fileSize:1000000
        },
    fileFilter:function(req,file,cb){
        if(!file.originalname.match(/\.(pdf|doc|png|jpg|jpeg)$/)){
            return cb(new Error('Not supported file'))
        }
        cb(undefined,true)
    }
}

); //provide destination
router.post('/user/me/avtar', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.send();
});

module.exports = router;
