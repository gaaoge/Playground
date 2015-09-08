/**
 * Created by GG on 15/9/8.
 */

(function () {
    "use strict";

    var APP = function () {
        this.init();
        this.animate();
    };

    //初始化
    APP.prototype.init = function () {
        var me = this;

        me.scene = new THREE.Scene();

        me.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
        me.camera.position.set(1000, 1000, 1000);
        me.camera.lookAt(me.scene.position);

        me.renderer = new THREE.WebGLRenderer();
        me.renderer.setPixelRatio(window.devicePixelRatio);
        me.renderer.setSize(window.innerWidth, window.innerHeight);
        me.renderer.setClearColor(0x000000);

        me.control = new THREE.OrbitControls(me.camera, me.renderer.domElement);
        me.control.addEventListener('change', function () {
            me.renderer.render(me.scene, me.camera);
        });

        me.stat = new Stats();
        me.stat.domElement.style.position = 'absolute';
        me.stat.domElement.style.right = '0px';
        me.stat.domElement.style.top = '0px';

        window.addEventListener('DOMContentLoaded', function () {
            document.body.appendChild(me.renderer.domElement);
            document.body.appendChild(me.stat.domElement);
        });

        window.addEventListener('resize', function () {
            me.camera.aspect = window.innerWidth / window.innerHeight;
            me.camera.updateProjectionMatrix();
            me.renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);

        me.add();
    };

    //执行动画
    APP.prototype.animate = function () {
        var me = this;
        var animate = function () {
            window.requestAnimationFrame(animate);
            me.render();
            me.control.update();
            me.stat.update();
        };
        animate();
    };

    //渲染场景
    APP.prototype.render = function () {
        var me = this;
        //TODO
        me.renderer.render(me.scene, me.camera);
    };

    //添加场景内容
    APP.prototype.add = function () {
        var me = this;
        //TODO
    };

    new APP();
}());