import "./study/style.less";
import * as THREE from "three";

let renderer, scene, camera;

function init() {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    //화면조정
    renderer = new THREE.WebGLRenderer({canvas:canvas, antialias: true}); // 부드럽게
    renderer.setSize(window.innerWidth, window.innerHeight); //화면배율

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight); //오브젝트배율조정
    camera.position.set(0, 0, 10);
    // 빛
    const light = new THREE.DirectionalLight();
    light.position.set(1,1,1);
    scene.add(light);


    // sphere
    const sphere_geometry = new THREE.SphereGeometry(); //입체
    const matarial = new THREE.MeshPhongMaterial();
    const sphere = new THREE.Mesh(sphere_geometry, matarial);
    scene.add(sphere);

    render();
}

function render() {
    renderer.render(scene, camera);
requestAnimationFrame(render);
}

init();
/*
let renderer;
let scene;
let camera;
*/