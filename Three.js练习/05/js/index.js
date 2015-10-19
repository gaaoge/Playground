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
        me.renderer.setClearColor(0xaaaaaa);
        document.body.appendChild(me.renderer.domElement);

        me.control = new THREE.OrbitControls(me.camera, me.renderer.domElement);

        me.stat = new Stats();
        me.stat.domElement.style.position = 'absolute';
        me.stat.domElement.style.right = '0px';
        me.stat.domElement.style.top = '0px';
        document.body.appendChild(me.stat.domElement);

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

        var grid = new THREE.GridHelper(500, 25);
        grid.setColors(0x444444, 0x888888);
        me.scene.add(grid);

        var darkMaterial = new THREE.MeshBasicMaterial({color: 0xffffcc, opacity: 0.5, transparent: true});
        var wireframeMaterial = new THREE.MeshBasicMaterial({color: 0x888888, wireframe: true, transparent: true});
        var multiMaterial = [darkMaterial, wireframeMaterial];

        var shape = THREE.SceneUtils.createMultiMaterialObject(
            // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
            new THREE.CylinderGeometry(0, 40, 100, 20, 4),
            multiMaterial);
        shape.position.set(0, 50, 0);
        me.scene.add(shape);

        // torus
        var shape = THREE.SceneUtils.createMultiMaterialObject(
            // radius of entire torus, diameter of tube (less than total radius),
            // sides per cylinder segment, cylinders around torus ("sides")
            new THREE.TorusGeometry(30, 20, 16, 40),
            multiMaterial);
        shape.position.set(0, 100, 0);
        shape.rotation.set(Math.PI / 2, 0, 0);
        me.scene.add(shape);
    };

    new APP();
}());