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
        stage.addChild(new createjs.Bitmap('img/loading.png'));
        var progress = new createjs.Text("", "48px Arial", "#ffffff");
        progress.set({x: window.innerWidth / 2, y: window.innerHeight / 2, textAlign: 'center'});
        stage.addChild(progress);

        var queue = new createjs.LoadQueue();
        queue.installPlugin(createjs.Sound);
        queue.loadManifest('manifest.json');

        queue.on('progress', function (e) {
            progress.text = (e.progress * 100).toFixed(0) + '%';
        });
        queue.on("complete", function (e) {
            createjs.Sound.play('bgm');
            stage.removeAllChildren();
            stage.addChild(new createjs.Bitmap(queue.getResult('main')));
        }, this);
    }
}());