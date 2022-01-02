const express   = require('express');
const path      = require('path');
const app       = express();

const publicDirPath = path.join(__dirname,'../public');
app.set('view engine', 'hbs');
app.use(express.static(publicDirPath));
app.get('',(req, res) => {
  res.render('index',{
      title:"Start",
      link:"About Us"
  });
});

app.get('/about',(req, res) => {
    res.render('about',{
        title:"About us",
        link:"Home"
    });
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

app.listen(4000,() => {
    console.log('server started successfully');
});