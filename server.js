const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
//Middleware
const morgan = require('morgan');
//DB
const connectDB = require('./config/db');

//Load env vars
dotenv.config({path:'./config/config.env'});

// Connect to database
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps')

const app=express();
// Body Parser
app.use(express.json());

// Dev loggin middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Mount routers
const server = app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Handle unhadled primise rejections
process.on('unhandledRejection', (err,promise)=>{
    console.log(`Error: ${err.message}`.red.bold);
    //Close  server & exit process
    server.close(()=> process.exit(1));
})