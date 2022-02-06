require('./db/mongoose');
const User = require('./model/user');
const Task = require("./model/task");

//Promise chaining with mongoose
//first update user and then in second we call count using promise chaining
/*User.findByIdAndUpdate('61e573b7591bc2b109f51972',{age:34}).then((user) => {
    console.log(user);
    return User.countDocuments({globalAccess:false});
}).then((getCount) => {
    console.log('User count age greater than 31: ',getCount);
}).catch((e) => {
    console.log(e.message);
});*/

//with asyn and await
const findUserIDUpdate = async (id,age) => {
    const user = await User.findByIdAndUpdate(id,{age});
    const count = await Task.countDocuments({age:32});

    return count;
}

findUserIDUpdate('61e9a9109b94585740f40be4',32).then((count) => {
    console.log('count',count);
}).catch((e) => {
    console.log(e)
});