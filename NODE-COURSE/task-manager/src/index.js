const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());//automatically parse request json
require('./db/mongoose');// initiate db connection

const User = require('./model/user');//get user model

app.post('/user',(req,res) => {

    const user = new User(req.body);

    user.save().then(() => {
        res.status('201').send({'success':true,'data':User(req.body)});
    }).catch((error) => {
        res.status('400').send({'success':false,'data':error});
    });
});

app.listen(port,() => {
   console.log('Server started on port::'+ port);
});