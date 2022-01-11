const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const connectionUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';
const ObjectId = mongodb.ObjectId;

//object id is combination of timestamp, hexa decimal code and store in binary form
const id = new ObjectId();
console.log(id.toHexString());

//connect db
mongoClient.connect(connectionUrl,{useNewUrlParser:true},(error,client) => {

    if(error){
        return console.log(error);
    }
    console.log('connected successfully');
    const db = client.db(dbName);
    /*db.collection('user').insertOne({
        'name':'dineshkashera',
        'role':'software developer'
    });*/
    //
    const manydocument = [{
        "description":"desc 1",
        "completed":true
    },{
        "description":"desc 2",
        "completed":false
    },{
        "description":"desc 3",
        "completed":true
    }];
    db.collection('tasks').insertMany([{
        "description":"desc 1",
        "completed":true
    },{
        "description":"desc 2",
        "completed":false
    },{
        "description":"desc 3",
        "completed":true
    },{
        "no-fields":"desc 3"
    }],(error,result) => {
        if(error){
            return console.log(error);
        }

        console.log(result.ops);
    });
    //find https://mongodb.github.io/node-mongodb-native/4.2/classes/Collection.html#find
    //findOne
    //cursor
});