const express   = require('express');
const path      = require('path');
const app       = express();
const hbs       = require('hbs');

//defining path for express
const publicDirPath = path.join(__dirname,'../public');
const hbsViewPath = path.join(__dirname,'../templates');
const hbsPartialPath = path.join(__dirname,'../templates/partials');

//setup handlebar for views and hbs
app.set('view engine', 'hbs');
app.set('views',hbsViewPath);
hbs.registerPartials(hbsPartialPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get('',(req, res) => {
  res.render('index',{
      title:"Weather",
      link:"About Us",
      copywrite:"dineshkashera",
      class:"index"
  });
});

app.get('/about',(req, res) => {
    res.render('about',{
        title:"About us",
        link:"Home",
        copywrite:"dineshkashera",
        class:"about-us"
    });
});

app.get('/weather',(req,res) => {
    if(req.query.address){
        res.send({
            address:req.query.address
        });
    }else{
        res.send({
            error:"No address given"
        });
    }
});
/*app.get('',(req,res) => {
    res.send('hello world');
});

app.get('/help',(req,res) => {
    res.send('Help page loaded');
});

app.get('/about-us',(req,res) => {
    res.send('About us page loaded');
});*/

app.get('/about/*',(req,res) => {
    res.render('404',{
        title:"404 Error page",
        link:"Home",
        errorMessage:"Url not found",
        copywrite:"dineshkashera",
        class:"about-us-404"
    });
});

app.get('*',(req,res) => {
    res.render('404',{
        title:"404 Error page",
        link:"Home",
        errorMessage:"page not found",
        copywrite:"dineshkashera",
        class:"error-404"
    });
});

app.listen(4000,() => {
    console.log('server started successfully');
});