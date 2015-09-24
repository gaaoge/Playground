/**
 * Created by GG on 15/9/2.
 */

var WebSocketServer = require('ws').Server;
var uuid = require('uuid');

var wsServer = new WebSocketServer({
    port: 3003
});

wsServer.on('connection', function (ws) {
    console.log('connection');

    ws.id = uuid.v4();
    ws.target = [];

    ws.on('message', function (data) {
        data = JSON.parse(data);
        switch (data.type) {
            case 'target':
                ws.target.push(data.id);
                for (var i in wsServer.clients) {
                    if (wsServer.clients[i].id == data.id) {
                        wsServer.clients[i].target.push(ws.id);
                        break;
                    }
                }
                break;
            case 'msg':
                for (var i in wsServer.clients) {
                    if (ws.target.indexOf(wsServer.clients[i].id) != -1) {
                        wsServer.clients[i].send(JSON.stringify(data));
                    }
                }
                break;
        }
    });

    ws.on('close', function () {
        console.log('close');
    });

    ws.send(JSON.stringify({type: 'register', id: ws.id}));
});


