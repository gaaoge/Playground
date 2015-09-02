/**
 * Created by GG on 15/9/2.
 */

var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({
    port: 3001
});

wss.on('connection', function (ws) {
    console.log('connection');

    ws.on('message', function (data) {
        data = JSON.parse(data);
        switch (data.type) {
            case 'target':
                ws.id = data.target;
                break;
            case 'msg':
                for (var i in wss.clients) {
                    if (wss.clients[i].id == data.target) {
                        wss.clients[i].send(JSON.stringify({message: data.message}));
                    }
                }
                break;
        }
    });

    ws.on('close', function () {
        console.log('close');
    });
});

