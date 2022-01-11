const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const connectionUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

//connect db
mongoClient.connect(connectionUrl,{useNewUrlParser:true},(error,client) => {

    if(error){
        return console.log(error);
    }
    console.log('connected successfully');
    const db = client.db(dbName);
    db.collection('user').insertOne({
        'name':'dineshkashera',
        'role':'software developer'
    });
});