const express               =   require('express');
const path                  =   require('path');
const app                   =   express();
const hbs                   =   require('hbs');
const request               =   require('request');
const http                  =   require('http');
const socketio              =   require('socket.io');

const port                  =   process.env.PORT || 3000;

const server                =   http.createServer(app);//create server
const io                    =   socketio(server);

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

//Socket io behaviour
//server (emit) -> client (receive) -> countupdated
//client (emit) -> server (receive) -> increment
let count = 0;
/*io.on('connection',(socket) => {
 console.log('New connection on');
 socket.emit('countUpdated',count); //add event and data for client, where we will get this data in client side using same event;
 socket.on('incrementCount',() => {
        count++;
       // socket.emit('countUpdated',count); user specific
        io.emit('countUpdated',count); // update to all user
 });
});*/

//Run short of code when given client is connected
io.on('connection',(socket) => {

    //Three way to emit the messgage to browser
    //1. socket.emit('eventname')//send to all client
    //2. io.emit('eventname')//send to specific client
    //3. socket.broadcast.emit('eventname')//send to all over the client except you.
    socket.emit('welcomeClient','Hi, Welcome to new chat board'); //Send to you, add event and data for client, where we will get this data in client side using same event;

    socket.broadcast.emit('welcomeClient','New user joined');//fire to everyone except you

    socket.on('SendMessage',(message,acknowledgeSender) => {
        io.emit('welcomeClient',message);
        acknowledgeSender('Message Received');
    });

    socket.on('disconnect', () => {
       io.emit('welcomeClient','User get disconnected'); // send to all
    });
});

server.listen(port,() => {
    console.log('server started successfully on port::' + port);
});