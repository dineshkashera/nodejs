//define db schema or user model
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
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
        required:true,
        unique:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
});

//To create virtual relationship between user and task,
UserSchema.virtual('tasks',{
    'ref':'task',
    'localField':'_id',
    'foreignField':'owner' //like we did in mysql
})

//it behave live filter hook to hide the private data
UserSchema.methods.toJSON = function(){
    const user = this;
    const userObj = user.toObject();

    delete userObj.tokens;
    delete userObj.password;
    delete userObj.__v;

    return userObj;
}
UserSchema.methods.generateAuthToken = async function(){
    const user = this;
    const generateToken = jwt.sign({_id:user._id.toString()},'thisismyjwtsecret');
    user.tokens = user.tokens.concat({'token':generateToken});
    await user.save();
    return generateToken;
}
//find by credentials
UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});

    if(!user){
        throw new Error('No email found');
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        throw new Error('Invalid Details');
    }

    return user;
}
//Convert plain text to Hash
UserSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    console.log('User validation looks good');
    next();
});
const User = mongoose.model('user',UserSchema);


module.exports = User;