/**
 * Created by GG on 15/9/2.
 */

var WebSocketServer = require('ws').Server;
var uuid = require('uuid');
var log4js = require('log4js');

log4js.configure({
    appenders: [
        { type: 'console' }, //控制台输出
        {
            type: 'file', //文件输出
            filename: 'logs/access.log',
            maxLogSize: 1024,
            backups:3,
            category: 'normal'
        }
    ]
});

var logger = log4js.getLogger('normal');
logger.setLevel('INFO');

var wsServer = new WebSocketServer({
    port: 3303
});

wsServer.on('connection', function (ws) {
    logger.info("wsServer connections: " + wsServer.clients.length);

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

    ws.send(JSON.stringify({type: 'register', id: ws.id}));
});


