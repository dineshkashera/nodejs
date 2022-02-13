const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const usergetRoute = require('./routers/userRoutes');
const taskgetRoute = require('./routers/taskRoutes');

//to enable maintenance mode
app.use((req,res,next) => {
      res.status(503).send('Site is under maintenance');
})

app.use(express.json());//automatically parse request json
require('./db/mongoose');// initiate db connection

app.use(usergetRoute);//use user route
app.use(taskgetRoute);//use task route

app.listen(port,() => {
   console.log('Server started on port::'+ port);
});