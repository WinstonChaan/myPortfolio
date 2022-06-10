import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  20000
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
renderer.setClearColor(0x3670c7, 1);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.OctahedronGeometry(20, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const center = new THREE.Mesh(geometry, material);

scene.add(center);
center.position.setZ(-50);

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
  const r = document.body.getBoundingClientRect().bottom;
  console.log(r);
  camera.position.z = r * -0.01;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  scene.rotation.z += 0.0001;

  center.rotation.x += 0.001;
  center.rotation.y += 0.001;
  center.rotation.z += 0.001;

  controls.update;
  renderer.render(scene, camera);
}

animate();
