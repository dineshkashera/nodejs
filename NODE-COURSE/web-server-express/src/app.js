const express = require('express');
const path  = require('path');
const app = express();

const publicDirPath = path.join(__dirname,'../public');
app.use(express.static(publicDirPath));

app.get('',(req,res) => {
    res.send('hello world');
});

app.get('/help',(req,res) => {
    res.send('Help page loaded');
});

app.get('/about-us',(req,res) => {
    res.send('About us page loaded');
});

app.listen(4000,() => {
    console.log('server started successfully');
});