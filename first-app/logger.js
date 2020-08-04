// console.log(__filename);
// console.log(__dirname);

// login messages

const EventEmitter = require('events');
// const emitter = new EventEmitter(); // not needed anymore

var url = 'http://mylogger.io/log'; // imagining we are using an remote login services that bring
                                    // a url to send to the http requests. 


class Logger extends EventEmitter{
    log(message) {
        // Send an HTTP request
        console.log(message);
    
        // Raised an event
        this.emit('messageLogged', {id:1, url: 'http://'});
    }
}

module.exports = Logger;


