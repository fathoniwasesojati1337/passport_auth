/*
|--------------------------------------------------------------------------
| express required component describe by Express Documentation
|--------------------------------------------------------------------------
|
| Express.js, or simply Express, is a back end web application framework for Node.js,
| released as free and open-source software under the MIT License
| Express.js is very easy to implementation for MVC with asyc
|
*/

const express = require("express"),app = express(), path = require('path'), Routers = require('./routes/web'), passport = require('passport'), session = require('express-session')
require('./app/middleware/auth')(passport)
const flash = require('connect-flash');
const mongostore = require('connect-mongo')(session);
const mongoose = require('mongoose');


app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized:true,
    store: new mongostore({
        mongooseConnection: mongoose.connection
    })
}))

app.use(flash());

/*
|--------------------------------------------------------------------------
| Join dirname by views
|--------------------------------------------------------------------------
|
*/

app.use(passport.initialize())
app.use(passport.session())
app.set('views', path.join(__dirname, '/resources/views/'));

/*
|--------------------------------------------------------------------------
| view engine automatic to generate file 
|--------------------------------------------------------------------------s
|
*/

app.set('view engine', 'ejs');

/*
|--------------------------------------------------------------------------
| database required 
|--------------------------------------------------------------------------
|
| database will be require in folder databases and to access automaticly
| and will be execute in index.js after this file have required
|
*/

require('./databases/database')

/*

|--------------------------------------------------------------------------
| Listener
|--------------------------------------------------------------------------
|
| app.listen is function to get port that it will be connect to server by this port 
|
*/

app.listen(process.env.PORT || 3000, console.log(`server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))

/*
|--------------------------------------------------------------------------
| Express Urlencode, json, and static, and set any app
|--------------------------------------------------------------------------
|
| Express urlencode is to generate url -> This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
| Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option.
| static Express to access static what you can do when join with js folder and css folder in public tree
|
*/

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(Routers)