/**
 * Created by GG on 15/8/18.
 */

(function ($, win, doc) {
    'use strict';

    $(function () {
        var $commonLandscape = $('#common-landscape'),
            $commonShare = $('#common-share');

        //通用横屏提示设置（android兼容）
        if ($.os.android) {
            $('input, textarea').on('focus', function () {
                $commonLandscape.css('display', 'none');
            }).on('blur', function () {
                $commonLandscape.css('display', '');
            });
        }

        //通用分享设置
        (function () {
            win.NewsAppShare = {
                shareData: {
                    title: '',
                    desc: '',
                    img_url: '',
                    link: ''
                },
                update: function (data) {
                    for (var i in data) {
                        if (this.shareData.hasOwnProperty(i)) {
                            this.shareData[i] = data[i];
                        }
                    }
                    doc.getElementById('__newsapp_sharetext').innerHTML = this.shareData.title + ' ' + this.shareData.link;
                    doc.getElementById('__newsapp_sharephotourl').innerHTML = this.shareData.img_url;
                    doc.getElementById('__newsapp_sharewxtitle').innerHTML = this.shareData.title;
                    doc.getElementById('__newsapp_sharewxtext').innerHTML = this.shareData.desc;
                    doc.getElementById('__newsapp_sharewxthumburl').innerHTML = this.shareData.img_url;
                    doc.getElementById('__newsapp_sharewxurl').innerHTML = this.shareData.link;
                },
                show: function () {
                    if (NewsAppClient.isNewsApp()) {
                        NewsAppClient.share();
                    } else {
                        $commonShare.fadeIn(300);
                        setTimeout(function () {
                            $commonShare.fadeOut(300);
                        }, 2000);
                    }
                },
                getAbsPath: function (url) {
                    var a = doc.createElement('a');
                    a.href = url;
                    return a.href;
                }
            };

            //初始化分享数据
            NewsAppShare.update({
                title: '分享标题',
                desc: '分享描述',
                img_url: NewsAppShare.getAbsPath('share-icon.png'),
                link: NewsAppShare.getAbsPath('')
            });

            //微信分享设置
            doc.addEventListener('WeixinJSBridgeReady', function () {
                WeixinJSBridge.on('menu:share:timeline', function () {
                    WeixinJSBridge.invoke('shareTimeline', NewsAppShare.shareData, function () {
                    });
                });
                WeixinJSBridge.on('menu:share:appmessage', function () {
                    WeixinJSBridge.invoke('sendAppMessage', NewsAppShare.shareData, function () {
                    });
                });
            }, false);
        }());
    });
}(Zepto, window, document));