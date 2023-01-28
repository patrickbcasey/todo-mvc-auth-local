// module imports
// require importing express to be used in the program
const express = require('express');
// using express methods in an accessible and common shorthand
const app = express();
// imports mongoose ODM
const mongoose = require('mongoose');
// imports passport password hashing and managing
const passport = require('passport');
// imports express session to make login sessions via cookies
const session = require('express-session');
// imports connect-mongo to open a database connection
const MongoStore = require('connect-mongo')(session);
// imports express-flash to flash things
const flash = require('express-flash');
// Logger to note how server is being handled in the console
const logger = require('morgan');
// imports database.js file that handles database connection
const connectDB = require('./config/database');

// imports main.js file that handles mainRoutes such as login, logout, signup and /
const mainRoutes = require('./routes/main');
// allows accesss to /routes/todos.js to handle routing for 2121/todos/
const todoRoutes = require('./routes/todos');

// importing secrets from .env and passing in the path to the .env file
require('dotenv').config({path: './config/.env'});

// Passport config for authentication
require('./config/passport')(passport);

// calling the database start
connectDB();

// setting render engine to ejs
app.set('view engine', 'ejs');
// initializing static folder
app.use(express.static('public'));
// bodyparser for html.post forms 
app.use(express.urlencoded({ extended: true }));
// bodyparser for post requests
app.use(express.json());
//tells morgan to start its logging
app.use(logger('dev'));
// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
  
// Passport middleware
app.use(passport.initialize());
// restores a user if a session is present in ?cookies?
app.use(passport.session());
// flashes errors on screen
app.use(flash());
// if url root is or 2121/ direct to mainRoutes route handling
app.use('/', mainRoutes);
// if url root is 2121/todos direct to todoRoutes route handling
app.use('/todos', todoRoutes);
// run server on port defined by env and console log it so we have more visual confirmation that server is live
app.listen(process.env.PORT, ()=>{
  console.log('Server is running, you better catch it!');
});    