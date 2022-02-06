require('./db/mongoose');
const Task = require('./model/task');

//Promise chaining with mongoose

/*Task.findOneAndDelete('61e9ac8fc4a3edfeed7d7338').then((task) => {
    console.log(task);
    return Task.countDocuments({completed:true});
}).then((getInCompletedTask) => {
    console.log('Get Incomplete Task: ',getInCompletedTask);
}).catch((e) => {
    console.log(e.message);
});*/

//with asyn and await
const findIDUpdate = async (id,completed) => {
    const task = await Task.findByIdAndUpdate(id,{completed});
    const count = await Task.countDocuments({completed:true});

    return count;
}

findIDUpdate('61e9accbc4a3edfeed7d733c',true).then((count) => {
    console.log('count',count);
}).catch((e) => {
    console.log(e)
});