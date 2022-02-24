const express               =   require('express');
const path                  =   require('path');
const app                   =   express();
const hbs                   =   require('hbs');
const request               =   require('request');

const port                  =   process.env.PORT || 3000;

//defining path for express
const publicDirPath = path.join(__dirname,'../public');
const hbsViewPath = path.join(__dirname,'../templates');
const hbsPartialPath = path.join(__dirname,'../templates/partials');
const router = require('./routers/routes');
//setup handlebar for views and hbs
app.set('view engine', 'hbs');
app.set('views',hbsViewPath);
hbs.registerPartials(hbsPartialPath);

//setup static directory to serve
app.use(express.static(publicDirPath));
app.use(router);

app.listen(port,() => {
    console.log('server started successfully on port::' + port);
});