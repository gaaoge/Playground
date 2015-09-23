/**
 * Created by GG on 15/9/4.
 */

(function ($) {
    "use strict";

    $(function () {
        var $cover = $('.cover');
        var $video = $('video');
        var $tip = $('.tip');
        var ws = new WebSocket("ws://10.0.1.15:3003");

        //video初始化兼容
        //$(document).one('touchstart', function () {
        //    $video.on('timeupdate', function () {
        //        if($video[0].currentTime) {
        //            $video[0].pause();
        //            $video.off('timeupdate');
        //        }
        //    });
        //    $video[0].play();
        //});

        ws.onmessage = function (e) {
            var data = JSON.parse(e.data);
            switch (data.type) {
                case 'register':
                    var id = getSearch('id');
                    if (!id) {
                        new QRCode('qrcode').makeCode(getAbsPath('') + '?id=' + data.id);
                        $cover.show();
                        $video.attr('src', 'video/1.mp4');
                        $tip.on('click', function () {
                            ws.send(JSON.stringify({type: 'msg', message: 'play'}));
                            setTimeout(function () {
                                $video.on('playing', function () {
                                    $tip.hide();
                                })[0].play();
                            }, 500);
                        });
                    } else {
                        ws.send(JSON.stringify({type: 'target', target: id}));
                        ws.send(JSON.stringify({type: 'msg', message: 'showTip'}));
                        $video.attr('src', 'video/2.mp4');
                        $tip.show();
                    }

                    break;
                case 'msg':
                    if (data.message == 'showTip') {
                        $cover.hide();
                        $tip.show();
                    } else if (data.message == 'play') {
                        $video.on('playing', function () {
                            $tip.hide();
                        })[0].play();
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