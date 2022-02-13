const jwt = require('jsonwebtoken');
const User = require('../model/user');

const auth = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const decodeToken = jwt.verify(token,'thisismyjwtsecret');
        const user = await User.findOne({_id:decodeToken._id,'tokens.token':token});

        if(!user){
            throw new Error();
        }
        req.user = user;
        next();
    }catch (e) {
        res.status(401).send({'error':'Invalid Authorization'})
    }
}

module.exports = auth