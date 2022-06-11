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

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

onWindowResize();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);
renderer.setClearColor(0x3670c7, 1);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.TorusGeometry(20, 5, 10, 70);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const center = new THREE.Mesh(geometry, material);

scene.add(center);
camera.position.setX(-20);
center.position.setZ(-50);

const geometryCube = new THREE.OctahedronGeometry(10, 2);
const materialCube = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const centerCube = new THREE.Mesh(geometryCube, materialCube);
scene.add(centerCube);
centerCube.position.setZ(-50);

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

Array(200).fill().forEach(addstars);

function moveCamera() {
  const r = document.body.getBoundingClientRect().bottom;
  console.log(r);
  camera.position.z = r * -0.01;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  scene.rotation.z += 0.0002;

  center.rotation.x += 0.005;
  center.rotation.y += 0.005;
  center.rotation.z += 0.005;

  centerCube.rotation.x -= 0.005;
  centerCube.rotation.y -= 0.005;
  centerCube.rotation.z -= 0.005;

  controls.update;
  renderer.render(scene, camera);
}

animate();
