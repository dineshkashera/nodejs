const mongoose = require('mongoose');
const connectionUrl = 'mongodb://127.0.0.1:27017/task-manager-api';

//established connection
mongoose.connect(connectionUrl,{
            useNewUrlParser:true//they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser.
            //useFindAndModify:true //to disable the deprecated warning
});