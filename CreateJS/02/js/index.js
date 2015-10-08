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
        createjs.Ticker.framerate = 60;
        createjs.Ticker.addEventListener('tick', stage);

        add();
    }

    function add() {
        var spriteSheet = new createjs.SpriteSheet({
            images: ['img/stay.png', 'img/weizhu.png'],
            frames: {width: 61, height: 93, count: 30, regX: 30, regY: 46},
            animations: {
                stay: [0,15],
                weizhu:[16,30]
            },
            framerate: 16
        });
        var sprite = new createjs.Sprite(spriteSheet, "stay");

        sprite.addEventListener('click', function () {
            sprite.gotoAndPlay('weizhu');
        });

        sprite.x = 320;
        sprite.y = 568;
        stage.addChild(sprite);
    }
}());