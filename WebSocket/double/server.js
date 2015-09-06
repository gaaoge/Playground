/**
 * Created by GG on 15/9/2.
 */

var WebSocketServer = require('ws').Server;
var uuid = require('uuid');

var wsServer = new WebSocketServer({
    port: 3002
});

wsServer.on('connection', function (ws) {
    console.log('connection');

    ws.on('message', function (data) {
        data = JSON.parse(data);
        switch (data.type) {
            case 'target':
                ws.target = [data.target];
                for (var i in wsServer.clients) {
                    if (wsServer.clients[i].id == data.target) {
                        wsServer.clients[i].target = wsServer.clients[i].target || [];
                        wsServer.clients[i].target.push(ws.id);
                    }
                    console.log('target', wsServer.clients[i].target);
                }
                break;
            case 'msg':
                for (var i in wsServer.clients) {
                    if (ws.target && ws.target.indexOf(wsServer.clients[i].id) != -1) {
                        wsServer.clients[i].send(JSON.stringify(data));
                    }
                }
                break;
        }
    });

    ws.on('close', function () {
        console.log('close');
    });

    ws.id = uuid.v4();
    ws.send(JSON.stringify({type: 'register', id: ws.id}));
});


