'use strict';

const alexa = require('alexa-sdk');
const https = require('https');

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
 const apikey = "AIzaSyAUahgJ02DmY8Jzgw5z3nJsy6fMFxZfdTw";
exports.handler = (event, context, callback) => {
  const req = https.get('https://maps.googleapis.com/maps/api/directions/json?origin=75+9th+Ave+New+York,+NY&destination=MetLife+Stadium+1+MetLife+Stadium+Dr+East+Rutherford,+NJ+07073&key=AIzaSyAUahgJ02DmY8Jzgw5z3nJsy6fMFxZfdTw', (res.setEncoding('utf8')) => {
  
  var body = '';
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);
  

  res.on('data', (d) => {
    body += d;
  });
  res.on('end', function() {
    console.log(body);
  });

}).on('error', (e) => {
  console.error(e);
});
    req.on('error', callback);
    
    req.end();
};
