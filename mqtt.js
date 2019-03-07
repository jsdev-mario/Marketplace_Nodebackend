var mosca = require('mosca');
var chatCtr = require('./controller/rest_apis/chatCtr');
var appConfig = require('./config');
var FCM = require('fcm-push');
var notification = require('./notification')


var serverKey = appConfig.FIREBASE_SERVER_TOKEN;
var fcm = new FCM(serverKey);



var connectedUser = new Array();

var chatmqtt_server = new mosca.Server({
    port: appConfig.MQTT_CHAT_PORT,
    username: appConfig.MQTT_USER,
    password: appConfig.MQTT_PASS,
    rejectUnauthorized: true
});

chatmqtt_server.on('clientConnected', function (client) {
    if (connectedUser.indexOf(client.id) < 0) {
        connectedUser.push(client.id);
    }
    console.log("chatting room connected : " + connectedUser);
});
chatmqtt_server.on("clientDisconnected", function (client) {
    connectedUser.splice(connectedUser.indexOf(client.id), 1);
    console.log("chatting room disconnected : " + client.id);
});

chatmqtt_server.on('published', function (packet, client) {
    try {
        if (client == undefined) {
            return;
        }
        var req = {
            "body": JSON.parse(packet.payload.toString()),
        };
        // if this topic is not current chat user
        if (connectedUser.indexOf(packet.topic.toString()) < 0) {
            chatCtr.addChatHistories(req).then(function (chatdata) {
                console.log(chatdata);
                //if (!chatdata.user_id.online_status) { //really partner_id (plz attend swaping id when add)
                    notification.send([chatdata.user_id.noti_token], {}, chatdata.partner_id.full_name, chatdata.latest_msg, 1);
                //}
            });
        } else {
            chatCtr.addReadChatHistories(req);
        }
    } catch (e) {
        console.log("publish error.\n" + packet.payload.toString());
    }
});

chatmqtt_server.on('ready', setup);

function setup() {
    console.log('MQTT Server: Mosca server is up and running');
}