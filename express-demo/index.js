const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require('./middleware/logger');
const authentication = require('./authentication');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

//Templating Engines (optional)
app.set('view engine', 'pug');
app.set('views', './views'); // default templates 

// Using Middleware functions
app.use(express.json()); // gets req.body
app.use(express.urlencoded({ extended: true })); // gets key=value&key=value
app.use(express.static('public')); // txt,pictures, etc'
app.use(helmet()); // Helps secure your apps by setting various HTTP headers.
app.use(logger);
app.use(authentication);
app.use('/api/courses', courses); 
app.use('/', home);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));
console.log('Mail password: ' + config.get('mail.password'));

if(app.get('env') === 'development') {
    app.use(morgan('tiny')); // HTTP request logger.
    // console.log('Morgan enabled...');
    debug('Morgan enabled...'); // An easy way to debug, using an enviroment variables
                                // switches the console.log statment
};

// PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));