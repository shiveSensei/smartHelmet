'use strict';
var Alexa = require("alexa-sdk");

exports.handler = function(event, context, callback) {
   var alexa = Alexa.handler(event, context);
   alexa.registerHandlers(handlers);
   alexa.execute();
};

var handlers = {
   'LaunchRequest': function () {
       this.emit('SayHello');
   },
   'TrafficIntent': function () {
       this.emit('SayHello')
   },
   'SayHello': function () {
       this.emit(':tell', 'Hello World!');
   }
};

function handleGetInfoIntent(intent, session, callback) {

   var speechOutput = "We have an error"

   getJSON(function(data) {
       if(data != "ERROR") {
           var speechOutput = data;
       }
       callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput));
   })
}

function url(data){
   var url = "http://www.google.com/";

   //handle concatonate data to url

   return url;
}

function getJSON(callback) {

   request.get(url(), function(err, res, body) {

       var data = JSON.parse(body);

       var travelTime = data.rows.elements.duration_in_traffic.text;

       if(travelTime > 0) {
           callback(travelTime);
       } else {
           callback("ERROR");
       }
   })
}