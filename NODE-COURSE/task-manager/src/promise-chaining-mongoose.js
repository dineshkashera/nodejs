require('./db/mongoose');
const User = require('./model/user');

//Promise chaining with mongoose
//first update user and then in second we call count using promise chaining
User.findByIdAndUpdate('61e573b7591bc2b109f51972',{age:34}).then((user) => {
    console.log(user);
    return User.countDocuments({globalAccess:false});
}).then((getCount) => {
    console.log('User count age greater than 31: ',getCount);
}).catch((e) => {
    console.log(e.message);
});