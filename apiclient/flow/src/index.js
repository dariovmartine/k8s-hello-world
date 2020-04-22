const winston = require('winston');
const { format } = require('logform');

const { combine } = format;

const logger = winston.createLogger({
  level: 'info',
  format:  combine(
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `flow.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/flow.log' })
  ]
});

const app_port = process.env.PORT || 3010;
const api_host = process.env.API_HOST || 'apimocks';
const api_port = process.env.API_PORT || 3000;

var express = require('express');
var app = express();

var rp = require('request-promise');

var EventEmitter = require('events')
var ee = new EventEmitter()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var server = app.listen(app_port, function(){
    var host = server.address().address;
    var port = server.address().port;

    logger.info('This app is listening at http://%s:%s', host, app_port);
}); 

app.post('/flow', function(req, res) {
    
    ee.emit('call_web_service_1', {  
        response: res, 
        payload: req.body.customerId 
    })
});

ee.on('call_web_service_1', function (msg) {
  
    logger.info('msg: %s', msg)
    logger.info('CustomerId: %s', msg.payload)
    
    var api_uri = 'http://' + api_host + ':' + api_port + '/api/users/1';
    logger.info('Calling: %s', api_uri)
    
    var response = msg.response;

    var options = {
        method: 'POST',
        uri: api_uri,
        body: {
            some: 'value'
        },
        json: true // Automatically stringifies the body to JSON
    };
 
    rp(options)
        .then(function (parsedBody) {
            response.send("Result: OK!");
            logger.info(parsedBody)
    })
    .catch(function (err) {
        var error_message = "Error: unexpected";
        if (err.message) {
            error_message = err.message
        }
        
        response.send(error_message);
        logger.error(error_message);
    });
})



