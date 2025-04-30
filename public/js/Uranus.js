import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// width and height
const width = window.innerWidth;
const height = window.innerHeight;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);

// Adding the canvas into the div container
document.getElementById("three-container").appendChild(renderer.domElement);

// Texture | means images provide to that 3d object
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./img/uranusmapthumb.jpg");

// ring Texutre
const ringTexture = textureLoader.load("./img/uranusringcolour.jpg");

// Geometry
const radius = 1.2;
const geometry = new THREE.IcosahedronGeometry(radius, 26);
const outerRingGeo = new THREE.TorusGeometry(1.2 * 1.6, 0.3 * 0.13, 16, 100);
const outerRingGeo2 = new THREE.TorusGeometry(1.2 * 1.8, 0.3 * 0.15, 16, 100);
const ringGeo2 = new THREE.TorusGeometry(1.2 * 1.4, 0.14 * 0.3, 16, 100);
const ringGeo = new THREE.TorusGeometry(radius * 1.2, radius * 0.12 * 0.3, 16, 100);

// Material
const material = new THREE.MeshBasicMaterial({
  map: texture,
});

const ringMaterial = new THREE.MeshBasicMaterial({
  map: ringTexture,
  transparent: true,
  opacity: 0.6, // Adjust opacity for transparency
  side: THREE.DoubleSide, // Makes the ring visible from both sides
});

const outerRingMaterial = new THREE.MeshBasicMaterial({
  map: ringTexture,
  transparent: true,
  opacity: 0.3, // Adjust opacity for transparency
  side: THREE.DoubleSide, // Makes the ring visible from both sides
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
const ring2 = new THREE.Mesh(ringGeo2, ringMaterial);
const rings = new THREE.Mesh(ringGeo, ringMaterial);
const OuterRing = new THREE.Mesh(outerRingGeo, outerRingMaterial);
const OuterRing2 = new THREE.Mesh(outerRingGeo2, outerRingMaterial);

// Adjust Texture Mapping
texture.wrapS = THREE.RepeatWrapping; // Repeat along the X-axis
texture.wrapT = THREE.RepeatWrapping; // Repeat along the Y-axis
texture.repeat.set(2, 2); // Repeat the texture 2 times on both axes

// Camera
const aspect = width / height;

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 10);
camera.position.z = 4; //2

// Don't need to care it will be deleted soon
// I have to check it first
let fov = camera.fov;
let near = camera.near;
let far = camera.far;

// Scene
const deg = 97.77 * (Math.PI / 180);
const scene = new THREE.Scene();
mesh.rotation.y += deg;
scene.add(mesh);

// Adding the rings into the Uranus or 3D object
mesh.add(rings);
mesh.add(ring2);
mesh.add(OuterRing);
mesh.add(OuterRing2);


// Lighting
// Sun like Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Adding Orbit Controls | Simply just for user interaction with the 3d Object
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableDampingFactor = 1; //0.3

// Camera Configuration
// position going to be changed when you scroll using wheel event which are present in the mouse
window.addEventListener("wheel", (es) => {
  const scrollDelta = es.deltaY;

  // Adjust FOV based on scroll
  camera.fov += scrollDelta * 0.05; // Modify the sensitivity factor as needed

  // Clamp the FOV to a reasonable range
  camera.fov = Math.max(10, Math.min(100, camera.fov)) - 0.05;

  // Adjust the near and far planes based on the scroll (optional)
  camera.near = Math.max(0.1, camera.near + scrollDelta * 0.01); // Adjust near plane based on scroll
  camera.far = Math.max(100, camera.far + scrollDelta * 0.1); // Adjust far plane based on scroll
  camera.updateProjectionMatrix();
});

// Animate the 3D object
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.01;
  rings.rotation.x += 0.01;
  ring2.rotation.x += 0.01;
  OuterRing.rotation.x += 0.01;
  OuterRing2.rotation.x += 0.01;
  controls.update(); // will be deleted soon.
  renderer.render(scene, camera);
}
animate();
