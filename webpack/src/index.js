import { add } from "mathjs";
import { 
    THREE, 
    OrbitControls, 
    RGBELoader,
    GenerateCanvas,
    GLTFLoader
  } from "./study/settings";

const canvas = GenerateCanvas();
let renderer, scene, camera, controls;

function init() {
	renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.shadowMap.enabled = true; 

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		32,
		window.innerWidth / window.innerHeight
	);
	camera.position.set(0, 0, 10);
	controls = new OrbitControls(camera, canvas);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(1, 1, 1);
	scene.add(directionalLight);

    directionalLight.castShadow = true;

	const sphere = new THREE.SphereGeometry();
	const material = new THREE.MeshStandardMaterial();
	const mesh = new THREE.Mesh(sphere, material);
	//scene.add(mesh);

	// gltf 로딩 시작
	const loader = new GLTFLoader();
	loader.load("/gltf/rocket.glb", (gltf) => {
		const model = gltf.scene;
		model.traverse((obj) => { // traverse 함수 수정
			if (obj.isMesh) {
				console.log(obj);
				obj.castShadow = true;
				obj.receiveShadow = true;
			}
		});

		scene.add(model);
		// render 함수 호출을 로딩 완료 후로 이동
		render();
	});
	// gltf 로딩 끝
}

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	controls.update();
}

init();
