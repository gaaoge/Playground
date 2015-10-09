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
        //var shape = new createjs.Shape().set({x: 100, y: 100});
        //shape.graphics.beginFill("#ff0000").drawCircle(0, 0, 50);
        //
        //var blurFilter = new createjs.BlurFilter(20, 20, 1);
        //shape.filters = [blurFilter];
        //var bounds = blurFilter.getBounds();
        //
        //shape.cache(-50 + bounds.x, -50 + bounds.y, 100 + bounds.width, 100 + bounds.height);
        //stage.addChild(shape);

        //var shape = new createjs.Shape().set({x: 100, y: 100});
        //shape.graphics.beginFill("#ff0000").drawCircle(0, 0, 50);
        //
        //shape.filters = [
        //    new createjs.ColorFilter(0, 0, 0, 1, 0, 0, 255, 0)
        //];
        //shape.cache(-50, -50, 100, 100);
        //stage.addChild(shape);

        //var mc = new createjs.MovieClip(createjs.MovieClip.INDEPENDENT, 0, true, {start:10});
        //stage.addChild(mc);
        //
        //var child1 = new createjs.Shape(
        //    new createjs.Graphics().beginFill("#999999")
        //        .drawCircle(30,30,30));
        //var child2 = new createjs.Shape(
        //    new createjs.Graphics().beginFill("#5a9cfb")
        //        .drawCircle(30,30,30));
        //
        //mc.timeline.addTween(
        //    createjs.Tween.get(child1)
        //        .to({x:0}).to({x:60}, 50).to({x:0}, 50));
        //mc.timeline.addTween(
        //    createjs.Tween.get(child2)
        //        .to({x:60}).to({x:0}, 50).to({x:60}, 50));
        //
        //mc.gotoAndPlay("start");

        //var image = new createjs.Bitmap('img/icon.jpg');
        //image.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        //image.addEventListener('pressmove', function (evt) {
        //    evt.target.x = evt.stageX;
        //    evt.target.y = evt.stageY;
        //});
        //stage.addChild(image);

        //var text = new createjs.Text("Hello World", "32px Arial", "#ff7700");
        //text.set({x: window.innerWidth / 2, y: window.innerHeight / 2});
        //text.textAlign = 'center';
        //text.lineWidth = 480;
        //stage.addChild(text);

        //for (var i = 0; i < 8; i++) {
        //    var text = i;
        //    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        //
        //    var bitmap = new createjs.Bitmap('img/icon.jpg');
        //    bitmap.regX = 50;
        //    bitmap.regY = 50;
        //
        //    bitmap.x = window.innerWidth * Math.random() | 0;
        //    bitmap.y = window.innerWidth * Math.random() | 0;
        //    bitmap.rotation = 360 * Math.random() | 0;
        //
        //    stage.addChild(bitmap);
        //
        //    bitmap.shadow = new createjs.Shadow("#" + randomColor, 0, 0, 10);
        //
        //    bitmap.on("mousedown", function (evt) {
        //        this.parent.addChild(this);
        //        this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
        //    });
        //
        //    bitmap.on("pressmove", function (evt) {
        //        this.x = evt.stageX + this.offset.x;
        //        this.y = evt.stageY + this.offset.y;
        //    });
        //}
    }
}());