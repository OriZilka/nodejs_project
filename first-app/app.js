// This is our main module

//
// function sayHello(name) { // added to the global scope 
//     console.log('Hello ' + name); // global
// }

// sayHello('Ori')
// // console.log(window); // global

//
// // Global objects that belong to the window object & global object
//     console.log() // print to the cmd
//     setTimeout() // give a time to wait
//     clearTimeout(); // clear the time out

//     setInterval() // call a function repedetly
//     clearInterval(); // clear the interval

//
// var message = ''; // not added to the global object, only scoped to the app.js file
// console.log(global.message); // will write "undefined"

//
// console.log(module);

//
// const log = require('./logger');
// log('Hi Ori');

//
// const path = require('path');
// var pathObj = path.parse(__filename);

// console.log(pathObj);

// 
// const os = require('os');

// var totalMemory = os.totalmem();
// var freeMemory = os.freemem();

// console.log('totalMemory: ' + totalMemory);
// console.log(`total Memory: ${totalMemory}`);
// console.log('freeMemory: ' + freeMemory);
// console.log(`free Memory: ${freeMemory}`);

//
// const fs = require('fs');

// // var files = fs.readdirSync('./');

// fs.readdir('./', function(err,files){
//     if (err) console.log('Error',err)
//     else console.log('Result',files)
// });

// // console.log(files);


//
// const EventEmitter = require('events');
// // const emitter = new EventEmitter();

// const Logger = require('./logger');
// const logger = new Logger();

// // Register a listener
// logger.on('messageLogged', (eventArg) => {
//     console.log('Listener called', eventArg);
// });

// logger.log('message');


//
// // Register a logging listener
// emitter.on('logging message', (eventArg) => {
//     console.log(eventArg);
// });

// // Raise: logging
// emitter.emit('logging message', {data: 'message'});


const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    if(req.url === '/api/courses') {
        res.write(JSON.stringify([1,3,5]));
        res.end();
    }

});

// server.on('connection',(socket) => {
//     console.log('New connection...');
// });

server.listen(3000);

console.log('Listening on port 3000...');
