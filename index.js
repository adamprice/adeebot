var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;

/**
 * The API key to connect to Slack
 * Retrieved from the SLACK_API_TOKEN environment variable
 *
 * @type {*|string}
 */
var token = process.env.SLACK_API_TOKEN || '';

/**
 * The Real Time Messaging client for communication with Slack
 */
var rtm = new RtmClient(token, {logLevel: 'debug'});

var waiting_for_cool_response = false;
var cool_message_user;

// Start the RTM client
rtm.start();

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
    console.log("Authenticated");
});

/**
 * Message Event
 * This gets called when there's a direct message to @adeebot or a
 * message in a channel that @adeebot has joined
 */
rtm.on(RTM_EVENTS.MESSAGE, function (message) {

    console.log("On Message");

    if (message.text === 'Hey <@U0S56B895>') {
        rtm.sendMessage('Hey, <@' + message.user + '>!', message.channel)
    }

    if (message.user === cool_message_user && waiting_for_cool_response) {
        rtm.sendMessage('Oh.', message.channel);
        waiting_for_cool_response = false;
    }

    if (message.text === 'Hey <@U0S56B895>, I’ve got something cool to tell you') {
        rtm.sendMessage('Really? Wow! What is it?', message.channel);
        cool_message_user = message.user;
        waiting_for_cool_response = true;
    }

});

/**
 * Channel Joined Event
 * Gets called when @adeebot successfully joins a channel
 */
rtm.on(RTM_EVENTS.CHANNEL_JOINED, function (message) {
    rtm.sendMessage('Hey guys!', message.channel.id);
});

/**
 * Connected Event
 * Gets called when @adeebot successfully connects to Slack
 */
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
    console.log("Connected");
});