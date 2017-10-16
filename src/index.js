'use strict';
//var Alexa = require("alexa-sdk");
const requestsAPI = require("./src/httpRequest");
 

const people = {
    "kalen": {
        "work": {
            "address": "13800 Old Gentilly Rd, New Orleans, LA 70129",
            "start": "home"
        },
        "home": {
            "address": "385 NW 2nd St., Reserve, LA, 70084",
            "start": "work"
        }
    },
    "nate": {
        "work": {
            "address": "1 Infinite Loop, Cupertino, CA 95014",
            "start": "home"
        },
        "home": {
            "address": "Webster St, Palo Alto, CA ",
            "start": "work"
        },
        "school": {
             "address": "500 W University Ave, Hammond, LA 70402",
             "start": "home"
        }
    }
}

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

        // if (event.session.application.applicationId !== "") {
        //     context.fail("Invalid Application ID");
        //  }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            
            onLaunch(event.request,event.session, (sessionAttributes, speechletResponse) => {

                context.succeed(buildResponse(sessionAttributes, speechletResponse));
            });
        } 
        else if (event.request.type === "IntentRequest") {
            
            onIntent(event.request, event.session, (sessionAttributes, speechletResponse) => {

                context.succeed(buildResponse(sessionAttributes, speechletResponse));
            });
        } 
        else if (event.request.type === "SessionEndedRequest") {
            
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } 
    catch (e) {
        context.fail("Exception: " + e);
    }
};


 //Called when the session starts.
 function onSessionStarted(sessionStartedRequest, session) {
    // add any session init logic here
}

//Called when the user invokes the skill without specifying what they want.
function onLaunch(launchRequest, session, callback) {
    getWelcomeResponse(callback);

}

//Called when the user specifies an intent for this skill.
function onIntent(intentRequest, session, callback) {

    var intent = intentRequest.intent
    var intentName = intentRequest.intent.name;

    // dispatch custom intents to handlers here
    if(intentName == "TrafficIntent") {
        handleTrafficResponse(intent, session, callback);

    } 
    else if(intentName == "AMAZON.YesIntent"){
        handleYesResponse(intent, session, callback);

    }
    else if(intentName == "AMAZON.NoIntent"){
        handleNoResponse(instent, session, callback);
        
    }
    else if(intentName == "AMAZON.StopIntent"){
        handleFinishSessionRequest(intent, session, callback);
        
    }
    else if(intentName == "AMAZON.HelpIntent"){
        
    }
    else if(intentName == "AMAZON.CancelIntent"){
        handleFinishSessionRequest(intent, session, callback);
    }
    else {
        throw "Invalid intent"
    }

}

//Called when the user ends the session.
//Is not called when the skill returns shouldEndSession=true.
function onSessionEnded(sessionEndedRequest, session) {

}

// ------- Skill specific logic -------

function getWelcomeResponse(callback) {
    const speechOutput = "Hi, there...how may I be of assistance?";
    const reprompt = "How may I be of assistance?"; 
    const header = "Traffic Intent";
    const shouldEndSession = false;
  
    //attributes to be saved/passed via the callback
    const sessionAttributes = {
        "speechOutput" : speechOutput,
        "repromptText" : reprompt
    }

  callback(sessionAttributes, buildSpeechletResponse(header, speechOutput, reprompt, shouldEndSession));
}

function handleTrafficResponse(intent, session, callback) {
    var person = intent.slots.Person.value.toLowerCase();

    if(!people[person]){

        //If person is not found in db, build prompt for alexa to report and suggest trying again
        var speechOutput = "Silly rabbit, tricks are for kids. J K, that person is not in the database. Please try again";
        var repromptText = "Try asking about another person";
        var header = "No bueno";
    }
    else {

        //If person is found in db, build response
        var startAddress = people.kalen.work.address;
        var destAddress = intent.slots.Destination.value;
        var directions = "";
        var speechOutput = "Your starting address is " + startAddress + ". " + "Your destination is " + destAddress;
        var reprompt = "Do you want to hear more?";
        var header = person;
    }

    var shouldEndSession = false;

    callback(session.atrributes, buildSpeechletResponse(header, speechOutput, repromptText, shouldEndSession))
}

function handleYesResponse(intent, session, callback) {
    const speechOutput = "Great! Which destination wuld you like to know about next?";
    const repromptText = speechOutput;
    const shouldEndSession = false;

    callback(session.atrributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleNoResponse(intent, session, callback){
    handleFinishSessionRequest(intent, session, callback);
}

function handleGetHelpRequest(intent, session, callback) {
    // Ensure that session.attributes has been initialized
    if (!session.attributes) {
        session.attributes = {};
    }
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye!", "", true));
}


// ------- Helper functions to build responses for Alexa -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}


