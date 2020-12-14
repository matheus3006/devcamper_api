const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const fileupload = require('express-fileupload');
const colors = require('colors');


//Middleware
const morgan = require('morgan');
const errorHandler =require('./middleware/error');

//DB
const connectDB = require('./config/db');

//Load env vars
dotenv.config({path:'./config/config.env'});

// Connect to database
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')

const app=express();
// Body Parser
app.use(express.json());

// Dev logIn middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// file Uploading
app.use(fileupload());

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);

//Must Be bellow our Mount routers
app.use(errorHandler);

const PORT = process.env.PORT || 5000


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Handle unhadled primise rejections
process.on('unhandledRejection', (err,promise)=>{
    console.log(`Error: ${err.message}`.red.bold);
    //Close  server & exit process
    server.close(()=> process.exit(1));
});