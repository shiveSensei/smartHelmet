'use strict';

const https = require('https');
const request = require('request');

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
 const apikeyDir = "AIzaSyAUahgJ02DmY8Jzgw5z3nJsy6fMFxZfdTw";
 const apikeyMat = "AIzaSyBaPxqLFEeKbBXll9giG-GkjGuH2bwa7Gw";
 const apikeyLoc = "AIzaSyDlFTmU6RG3Kamp46oIax6noh4QE86Mxug";

exports.request.post(
    'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDlFTmU6RG3Kamp46oIax6noh4QE86Mxug',
    { json: { key: 'value' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('....');
            console.log('This is your Post REQ ');
            console.log(body);
        }
    }
);
 
 
 
 
 
exports.handler = (event, context, callback) => {
  const req = https.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&key=AIzaSyBaPxqLFEeKbBXll9giG-GkjGuH2bwa7Gw', (res) => {
  res.setEncoding('utf8');
  var body = '';
  //console.log('statusCode:', res.statusCode);
  //console.log('headers:', res.headers);
  
  

  res.on('data', (d) => {
    process.stdout.write(d);
    body += d;
  });
  
  res.on('end', function() {
     
     
   
      var data = JSON.parse(body);     
      //console.log(data);
      console.log("-----------");      
      console.log("-----------");      
      console.log("-----------");      
      console.log("-----------"); 
      
      //console.log(data.geocoded_waypoints[0].place_id);
      //console.log(data.routes[0].travel_mod);
      console.log(data.rows[0].elements[0].distance.text);
      console.log("-----------");      
      console.log("-----------");      
      console.log("-----------");  
      //console.log(data.routes);
  });

}).on('error', (e) => {
  console.error(e);
});
    req.on('error', callback);
    
    req.end();
};
