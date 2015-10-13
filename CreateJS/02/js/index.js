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
        var background = new createjs.Shape();
        background.graphics.f("#74ffce").dr(0, 0, window.innerWidth, window.innerHeight);
        stage.addChild(background);

        var spriteSheet = new createjs.SpriteSheet({
            images: ['img/walk.svg'],
            frames: {width: 162, height: 230, count: 22, regX: 81, regY: 115},
            animations: {
                play: [0, 21]
            },
            framerate: 22
        });
        var sprite = new createjs.Sprite(spriteSheet, "play");
        sprite.set({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            scaleX: 3,
            scaleY: 3
        });
        stage.addChild(sprite);

        //var builder = new createjs.SpriteSheetBuilder();
        //var sourceRect = new createjs.Rectangle(0, 0, 120, 120);
        //
        //for (var i = 1; i <= 60; i++) {
        //    var shape = new createjs.Shape(
        //        new createjs.Graphics().beginFill("#5a9cfb")
        //            .drawCircle(60, 60, i));
        //    builder.addFrame(shape, sourceRect);
        //}
        //
        //var spriteSheet = builder.build();
        //var sprite = new createjs.Sprite(spriteSheet, 'play');
        //stage.addChild(sprite);
    }
}());