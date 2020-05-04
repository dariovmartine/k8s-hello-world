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
    // - Write to all logs with level `info` and below to `apimocks.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/apimocks.log' })
  ]
});

const app_port = process.env.PORT || 3000;

var express = require('express');
var apiMocker = require('connect-api-mocker');
 
var app = express();

app.use('/api', apiMocker('/api', {
  target: 'src/mocks/api',
  verbose: ({ req, filePath, fileType }) => logger.info(`Mocking endpoint ${req.originalUrl} using ${filePath}.${fileType}.`)
}));
 
app.listen(app_port);
