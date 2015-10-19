/**
 * Created by GG on 15/9/8.
 */

(function () {
    "use strict";

    var APP = function () {
        this.autoPlay = true;

        this.init();
        this.animate();
    };

    //初始化
    APP.prototype.init = function () {
        var me = this;
        me.scene = new THREE.Scene();

        me.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
        me.camera.position.set(0, 100, 800);
        me.camera.lookAt(me.scene.position);

        me.renderer = new THREE.WebGLRenderer();
        me.renderer.setPixelRatio(window.devicePixelRatio);
        me.renderer.setSize(window.innerWidth, window.innerHeight);
        me.renderer.setClearColor(0xffffff);
        document.body.appendChild(me.renderer.domElement);

        me.control = new THREE.OrbitControls(me.camera, me.renderer.domElement);
        me.control.maxDistance = 1000;

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

        window.addEventListener("touchstart", function () {
            me.autoPlay = false;
        });
        window.addEventListener("touchend", function () {
            me.autoPlay = true;
        });

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
        me.autoPlay && (me.globalGroup.rotation.y += -0.005);
        me.renderer.render(me.scene, me.camera);
    };

    //添加场景内容
    APP.prototype.add = function () {
        var me = this;

        //灯光
        var light = new THREE.AmbientLight(3355443);
        me.scene.add(light);
        var spotLight = new THREE.SpotLight(16777215);
        spotLight.position.set(250, 0, 2500);
        me.scene.add(spotLight);

        //场景内容
        me.globalGroup = new THREE.Group();
        me.scene.add(me.globalGroup);

        me.addSphere();
        me.addModel();
        me.addSprite();
    };

    //添加球体
    APP.prototype.addSphere = function () {
        var me = this;

        //创建球体
        var geometry = new THREE.SphereGeometry(1800, 12, 12);
        var material = new THREE.MeshBasicMaterial({color: 0xededed, wireframe: true});
        var sphere = new THREE.Mesh(geometry, material);
        me.globalGroup.add(sphere);
    };

    //添加模型
    APP.prototype.addModel = function () {
        var me = this;

        //加载模型
        var models = {
            'af1': {
                position: {x: 0, y: 0, z: 0},
                rotation: {x: 0, y: 0, z: Math.PI / 8},
                scale: 3
            },
            'airplane': {
                position: {x: 200, y: 0, z: 0},
                rotation: {x: 0, y: 0, z: 0},
                scale: 1
            },
            'bruce_kilgore': {
                position: {x: -200, y: 0, z: 0},
                rotation: {x: 0, y: -Math.PI / 2, z: 0},
                scale: 2
            },
            'original6': {
                position: {x: 0, y: 200, z: 0},
                rotation: {x: 0, y: 0, z: 0},
                scale: 2
            },
            'oldboot': {
                position: {x: 0, y: -200, z: 0},
                rotation: {x: 0, y: 0, z: 0},
                scale: 1
            },
            'mic': {
                position: {x: 0, y: 0, z: 200},
                rotation: {x: Math.PI / 6, y: 0, z: 0},
                scale: 1
            },
            'turntable': {
                position: {x: 0, y: 0, z: -200},
                rotation: {x: 0, y: 0, z: Math.PI / 3},
                scale: 2
            },
            'spraycan': {
                position: {x: 100, y: 100, z: -100},
                rotation: {x: 0, y: 0, z: Math.PI / 6},
                scale: 1
            },
            '25': {
                position: {x: 100, y: 100, z: 100},
                rotation: {x: 0, y: 0, z: 0},
                scale: 1
            },
            'basketball_hoop': {
                position: {x: 100, y: -100, z: 100},
                rotation: {x: 0, y: 0, z: Math.PI / 6},
                scale: 1
            },
            'goldchain': {
                position: {x: 100, y: -100, z: -100},
                rotation: {x: 0, y: 0, z: 0},
                scale: 1
            },
            'champagne': {
                position: {x: -100, y: 100, z: -100},
                rotation: {x: 0, y: 0, z: Math.PI / 6},
                scale: 1
            },
            'marker_sketch': {
                position: {x: -100, y: 100, z: 100},
                rotation: {x: 0, y: 0, z: 0},
                scale: 1
            },
            'shark': {
                position: {x: -100, y: -100, z: 100},
                rotation: {x: 0, y: 0, z: Math.PI / 6},
                scale: 1
            },
            'snake': {
                position: {x: -100, y: -100, z: -100},
                rotation: {x: 0, y: 0, z: 0},
                scale: 1
            }
        };
        var materials = [new THREE.MeshLambertMaterial({
            color: 0xffffff
        }), new THREE.MeshLambertMaterial({
            color: 10855845,
            wireframe: true,
            depthWrite: false
        })];

        var loader = new THREE.JSONLoader();
        for (var i in models) {
            (function (i) {
                loader.load('model/' + i + '.json', function (geometry) {
                    var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, materials);
                    mesh.position.set(models[i].position.x, models[i].position.y, models[i].position.z);
                    mesh.rotation.set(models[i].rotation.x, models[i].rotation.y, models[i].rotation.z);
                    mesh.scale.set(models[i].scale, models[i].scale, models[i].scale);
                    me.globalGroup.add(mesh);
                });
            }(i));
        }
    };

    //添加图片模型
    APP.prototype.addSprite = function () {
        var me = this;

        var sprites = {
            'shoe-1': {
                position: {x: 200, y: 200, z: 0},
                rotation: {x: 0, y: 0, z: Math.PI / 4}
            },
            'shoe-2': {
                position: {x: 200, y: -200, z: 0},
                rotation: {x: 0, y: 0, z: -Math.PI / 4}
            },
            'shoe-3': {
                position: {x: -200, y: -200, z: 0},
                rotation: {x: 0, y: 0, z: Math.PI / 4}
            },
            'shoe-4': {
                position: {x: -200, y: 200, z: 0},
                rotation: {x: 0, y: 0, z: -Math.PI / 4}
            },
            'shoe-5': {
                position: {x: 0, y: 200, z: 200},
                rotation: {x: Math.PI / 4, y: 0, z: 0}
            },
            'shoe-6': {
                position: {x: 0, y: -200, z: 200},
                rotation: {x: -Math.PI / 4, y: 0, z: 0}
            },
            'shoe-7': {
                position: {x: 0, y: -200, z: -200},
                rotation: {x: Math.PI / 4, y: 0, z: 0}
            },
            'shoe-8': {
                position: {x: 0, y: 200, z: -200},
                rotation: {x: -Math.PI / 4, y: 0, z: 0}
            }
        };

        for (var i in sprites) {
            var geometry = new THREE.OctahedronGeometry(40, 0);
            var material = new THREE.MeshLambertMaterial({color: 0x000000, wireframe: true});
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(sprites[i].position.x, sprites[i].position.y, sprites[i].position.z);
            mesh.rotation.set(sprites[i].rotation.x, sprites[i].rotation.y, sprites[i].rotation.z);
            me.globalGroup.add(mesh);

            var texture = THREE.ImageUtils.loadTexture('img/' + i + '.png');
            texture.minFilter = THREE.NearestFilter;
            var spriteMaterial = new THREE.SpriteMaterial({map: texture, useScreenCoordinates: false});
            var sprite = new THREE.Sprite(spriteMaterial);
            sprite.position.set(sprites[i].position.x, sprites[i].position.y, sprites[i].position.z);
            sprite.scale.set(36, 36, 1);
            me.globalGroup.add(sprite);
        }
    };

    new APP();
}());