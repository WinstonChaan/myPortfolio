import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

var rendererr = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x35363a); // the default

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.OctahedronGeometry(15, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const center = new THREE.Mesh(geometry, material);

scene.add(center);

function addstars() {
  const geometry = new THREE.OctahedronGeometry(200, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(10000));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addstars);

function moveCamera() {
  const r = document.body.getBoundingClientRect().top;

  camera.position.x = r * -0.01;
  camera.position.y = r * -0.01;
  camera.position.z = r * -0.01;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  scene.rotation.x += 0.0001;
  scene.rotation.y += 0.0001;
  scene.rotation.z += 0.0001;

  center.rotation.x += 0.001;
  center.rotation.y += 0.001;
  center.rotation.z += 0.001;

  controls.update;
  renderer.render(scene, camera);
}

animate();
