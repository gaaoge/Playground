/**
 * Created by GG on 15/9/4.
 */

(function ($) {
    "use strict";

    $(function () {
        var $qrcode = $('#qrcode');
        var ws = new WebSocket("ws://10.0.1.15:3002");

        ws.onopen = function (e) {
            console.log('open');
        };

        ws.onclose = function (e) {
            console.log('close');
        };

        ws.onerror = function (e) {
            console.error('error');
        };

        ws.onmessage = function (e) {
            console.log('message', e.data);
            var data = JSON.parse(e.data);
            switch (data.type) {
                case 'register':
                    var id = getSearch('id');
                    if (!id) {
                        new QRCode('qrcode').makeCode(getAbsPath('') + '?id=' + data.id);
                    }else {
                        new QRCode('qrcode').makeCode(getAbsPath('') + '?id=' + id);
                        ws.send(JSON.stringify({type: 'target', target: id}));
                        $qrcode.hide();
                    }

                    $qrcode.on('swipeRight', function () {
                        $qrcode.removeClass().addClass('slideOutRight');
                        ws.send(JSON.stringify({type: 'msg', message:'swipeRight'}));
                    }).on('swipeLeft', function () {
                        $qrcode.removeClass().addClass('slideOutLeft');
                        ws.send(JSON.stringify({type: 'msg', message:'swipeLeft'}));
                    });
                    break;
                case 'msg':
                    $qrcode.show();
                    if(data.message == 'swipeLeft') {
                        $qrcode.removeClass().addClass('slideInRight');
                    }else if(data.message == 'swipeRight') {
                        $qrcode.removeClass().addClass('slideInLeft');
                    }
                    break;
            }
        };

        function getSearch(name) {
            var data = {}, reg = new RegExp("([^?=&]+)(=([^&]*))?", "g"), search = location.search;
            search && search.replace(reg, function ($0, $1, $2, $3) {
                data[$1] = $3;
            });
            return data[name];
        }

        function getAbsPath(url) {
            return location.origin + location.pathname + url;
        }
    });
}(Zepto));