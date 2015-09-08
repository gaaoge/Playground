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
        me.camera.position.set(0, 0, 0);
        me.camera.lookAt(me.scene.position);

        me.renderer = new THREE.WebGLRenderer();
        me.renderer.setPixelRatio(window.devicePixelRatio);
        me.renderer.setSize(window.innerWidth, window.innerHeight);
        me.renderer.setClearColor(0x000000);
        document.body.appendChild(me.renderer.domElement);

        me.control = new THREE.DeviceOrientationControls(me.camera);

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

        me.renderer.render(me.scene, me.camera);
    };

    //添加场景内容
    APP.prototype.add = function () {
        var me = this;
        me.createSky('bridge');
    };

    //创建天空盒
    APP.prototype.createSky = function (name) {
        var me = this;

        var path = 'textures/' + name + '/';
        var urls = [path + "px.jpg", path + "nx.jpg",
            path + "py.jpg", path + "ny.jpg",
            path + "pz.jpg", path + "nz.jpg"];

        var textureCube = THREE.ImageUtils.loadTextureCube(urls);
        var shader = THREE.ShaderLib["cube"];
        shader.uniforms["tCube"].value = textureCube;

        var material = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            side: THREE.BackSide
        });

        me.sky = new THREE.Mesh(new THREE.BoxGeometry(100000, 100000, 100000), material);
        me.sky.name = name;
        me.scene.add(me.sky);
    };

    //切换天空盒
    APP.prototype.switchSky = function (name) {
        var me = this;

        if (me.sky && me.sky.name != name) {
            me.scene.remove(me.sky);
            me.createSky(name);
        }
    };

    var app = new APP();
    var buttons = document.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            app.switchSky(this.dataset.name);
        });
    }
}());