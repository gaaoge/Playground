/**
 * Created by GG on 15/9/8.
 */

(function () {
    "use strict";

    //通用变量
    var scene, camera, renderer, control, stat;

    //主函数
    function main() {
        init();
        add();
        animate();
    }

    //初始化
    function init() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
        camera.position.set(1000, 1000, 1000);
        camera.lookAt(scene.position);

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xaaaaaa);
        document.body.appendChild(renderer.domElement);

        control = new THREE.OrbitControls(camera, renderer.domElement);

        stat = new Stats();
        stat.domElement.style.position = 'absolute';
        stat.domElement.style.right = '0px';
        stat.domElement.style.top = '0px';
        document.body.appendChild(stat.domElement);

        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);
    }

    //执行动画
    function animate() {
        window.requestAnimationFrame(animate);
        update();
        renderer.render(scene, camera);
        control.update();
        stat.update();
    }

    //更新动画
    function update() {
        //TODO
    }

    //添加场景内容
    function add() {
        //TODO
        var grid = new THREE.GridHelper(500, 25);
        grid.setColors(0x444444, 0x888888);
        scene.add(grid);
    }

    main();
}());