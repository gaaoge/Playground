/**
 * Created by GG on 15/9/28.
 */


(function () {
    "use strict";

    var stage;

    init();

    function init() {
        var canvas = document.getElementById('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stage = new createjs.Stage(canvas);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener('tick', stage);
        createjs.Touch.enable(stage);

        add();
    }

    function add() {
        for (var i = 0; i < 8; i++) {
            var text = i;
            var randomColor = Math.floor(Math.random() * 16777215).toString(16);

            var bitmap = new createjs.Bitmap('img/icon.jpg');
            bitmap.regX = 100;
            bitmap.regY = 100;
            bitmap.x = window.innerWidth * Math.random() | 0;
            bitmap.y = window.innerWidth * Math.random() | 0;
            //bitmap.rotation = 360 * Math.random() | 0;
            bitmap.shadow = new createjs.Shadow("#" + randomColor, 0, 0, 10);
            stage.addChild(bitmap);

            bitmap.on("mousedown", function (evt) {
                this.parent.addChild(this);
                this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
            });

            bitmap.on("pressmove", function (evt) {
                this.x = evt.stageX + this.offset.x;
                this.y = evt.stageY + this.offset.y;
            });
        }
    }
}());