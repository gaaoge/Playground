/**
 * Created by GG on 15/9/24.
 */

(function ($, win, doc) {
    'use strict';

    $(function () {
        var $tip = $('.tip');
        var $qrcode = $('#qrcode');
        var ws = new WebSocket("ws://s.m.163.com:3303");

        ws.onmessage = function (e) {
            var data = JSON.parse(e.data);
            switch (data.type) {
                case 'register':
                    var id = getSearch('id');
                    if (!id) {
                        new QRCode('qrcode').makeCode(getAbsPath('') + '?id=' + data.id);
                        $tip.html('让你的朋友扫描二维码<br/>然后把他的手机并排放在你的手机右侧');
                    } else {
                        new QRCode('qrcode').makeCode(getAbsPath('') + '?id=' + id);
                        $qrcode.hide();
                        $tip.html('会有什么事情发生呢？');
                        ws.send(JSON.stringify({type: 'target', id: id}));
                        ws.send(JSON.stringify({type: 'msg', message: 'start'}));
                    }

                    break;
                case 'msg':
                    switch (data.message) {
                        case 'start':
                            $tip.html('请用手指按在二维码上两秒<br/>然后心里默念"妈咪妈咪哄~~~"');
                            $qrcode.one('touchend', function () {
                                var count = 3;
                                $tip.html(count);
                                var timer = setInterval(function () {
                                    if (count > 0) {
                                        count--;
                                        $tip.html(count == 0 ? '接下来就是见证奇迹的时刻！' : count);
                                    } else {
                                        ws.send(JSON.stringify({type: 'msg', message: 'swipeRight'}));
                                        ws.send(JSON.stringify({type: 'msg', message: 'bindSwipe1'}));
                                        bindSwipe();
                                        $qrcode.removeClass().addClass('slideOutRight');
                                        clearInterval(timer);
                                    }
                                }, 1000);
                            });
                            break;
                        case 'bindSwipe1':
                            bindSwipe();
                            $tip.html('二维码君：我穿越了，哦耶！<br />(向左滑动二维码试试看~)');
                            $qrcode.one('swipeLeft', function () {
                                ws.send(JSON.stringify({type: 'msg', message: 'bindSwipe2'}));
                            });
                            break;
                        case 'bindSwipe2':
                            bindSwipe();
                            $tip.html('二维码君：我又穿越回来了，嘿嘿！<br />(其实左滑右滑都是可以的哟~)');
                            break;
                        case 'swipeLeft':
                            $qrcode.show().removeClass().addClass('slideInRight');
                            break;
                        case 'swipeRight':
                            $qrcode.show().removeClass().addClass('slideInLeft');
                            break;
                    }
                    break;
            }
        };

        function bindSwipe() {
            $qrcode.on('swipeRight', function () {
                $qrcode.removeClass().addClass('slideOutRight');
                ws.send(JSON.stringify({type: 'msg', message: 'swipeRight'}));
            }).on('swipeLeft', function () {
                $qrcode.removeClass().addClass('slideOutLeft');
                ws.send(JSON.stringify({type: 'msg', message: 'swipeLeft'}));
            });

            //android兼容
            if ($.os.android) {
                doc.addEventListener('touchmove', function (event) {
                    event.preventDefault();
                }, false);
            }
        }

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
}(Zepto, window, document));