/**
 * Created by GG on 15/10/12.
 */

(function () {
    "use strict";

    /*Date工具类*/
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    };

    window.addEventListener('DOMContentLoaded', function () {
        var now = new Date();
        document.body.className = now.getHours() < 12 ? 'morning' : 'evening';
        document.getElementById('title').innerHTML = now.getHours() < 12 ? '霍营-清华科技园' : '清华科技园-霍营';
        document.getElementById('date').innerHTML = now.format('MM月dd日');

        document.getElementById('button').addEventListener('click', function () {
            document.getElementById('title').className = 'changeColor';
            this.className = 'disabled';
            this.innerHTML = '已验票';
        });
    });

}());