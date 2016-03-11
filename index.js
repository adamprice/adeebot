var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;

var token = process.env.SLACK_API_TOKEN || '';

var rtm = new RtmClient(token, {logLevel: 'debug'});
rtm.start();

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
    console.log("Authenticated");
});

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    // Listens to all `message` events from the team

    console.log("On Message");
});

rtm.on(RTM_EVENTS.CHANNEL_CREATED, function (message) {
    // Listens to all `channel_created` events from the team
});

// you need to wait for the client to fully connect before you can send messages
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
    // This will send the message 'this is a test message' to the channel identified by id 'C0CHZA86Q'

    console.log("Connected");

    //rtm.sendMessage('this is a test message', 'C0CHZA86Q', function messageSent() {
    //    // optionally, you can supply a callback to execute once the message has been sent
    //});
});