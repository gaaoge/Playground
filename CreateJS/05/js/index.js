/**
 * Created by GG on 15/9/28.
 */


(function () {
    "use strict";

    var stage;
    var image;
    var blur;
    var bitmap;
    var drawingCanvas;
    var oldPt;
    var oldMidPt;

    init();

    function init() {
        var canvas = document.getElementById('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stage = new createjs.Stage(canvas);
        //createjs.Ticker.timingMode = createjs.Ticker.RAF;
        //createjs.Ticker.addEventListener('tick', stage);
        createjs.Touch.enable(stage);

        image = new Image();
        image.onload = handleComplete;
        image.src = "img/bg.png";

        drawingCanvas = new createjs.Shape();
    }

    function handleComplete() {
        stage.addEventListener("stagemousedown", handleMouseDown);
        stage.addEventListener("stagemousemove", handleMouseMove);

        blur = new createjs.Bitmap(image);
        blur.filters = [new createjs.BlurFilter(30, 30, 2), new createjs.ColorMatrixFilter(new createjs.ColorMatrix(60))];
        blur.cache(0, 0, image.width, image.height);
        bitmap = new createjs.Bitmap(image);

        stage.addChild(blur, bitmap);
        updateCacheImage();

        //createjs.Tween.get(blur, {loop:true}).wait(1500).to({alpha:0}, 3000).to({alpha:1}, 3000);
        //stage.addChild(bitmap, blur);
    }

    function handleMouseDown(event) {
        oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
        oldMidPt = oldPt;
    }

    function handleMouseMove(event) {
        var midPoint = new createjs.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);

        drawingCanvas.graphics.setStrokeStyle(60, 'round','round')
            .beginStroke("#000")
            .moveTo(midPoint.x, midPoint.y)
            .curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

        //drawingCanvas.graphics.setStrokeStyle(60, 'round','round')
        //    .beginStroke("#000")
        //    .moveTo(oldPt.x, oldPt.y)
        //    .lineTo(stage.mouseX, stage.mouseY);

        oldPt.x = stage.mouseX;
        oldPt.y = stage.mouseY;
        oldMidPt.x = midPoint.x;
        oldMidPt.y = midPoint.y;

        updateCacheImage();
    }


    function updateCacheImage() {
        drawingCanvas.cache(0, 0, image.width, image.height);
        bitmap.filters = [new createjs.AlphaMaskFilter(drawingCanvas.cacheCanvas)];
        bitmap.cache(0, 0, image.width, image.height);
        stage.update();
    }
}());