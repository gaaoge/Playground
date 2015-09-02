/**
 * Created by GG on 15/9/2.
 */

var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({
    port: 3001
});

wss.broadcast = function (data) {
    for (var i in this.clients) {
        this.clients[i].send(JSON.stringify(data));
    }
};

wss.on('connection', function(ws) {
    console.log('connection');

    ws.on('message', function(data) {
        console.log(data);
        wss.broadcast(data);
    });
    ws.on('close', function() {
        console.log('close');
    });
});

