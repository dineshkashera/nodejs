require('./db/mongoose');
const Task = require('./model/task');

//Promise chaining with mongoose

Task.findOneAndDelete('61e9ac8fc4a3edfeed7d7338').then((task) => {
    console.log(task);
    return Task.countDocuments({completed:true});
}).then((getInCompletedTask) => {
    console.log('Get Incomplete Task: ',getInCompletedTask);
}).catch((e) => {
    console.log(e.message);
});