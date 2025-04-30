import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// Taking the size of window
const width = window.innerWidth;
const height = window.innerHeight;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height, true);

// Adding the canvas into the div container
document.getElementById("three-container").appendChild(renderer.domElement);

// Geometry
const geometry = new THREE.IcosahedronGeometry(1.1, 6);

// Material
const material = new THREE.MeshStandardMaterial({
  color: "blue",
  flatShading: true,
  roughness: 0.7,
  metalness: 0.2,
  opacity: 0.4,
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);

// WireFrame : Basically the outer 3d object material
const wireframe = new THREE.MeshBasicMaterial({
  color: "slateblue", // lightblue ,white
  wireframe: true,
});

const wireMesh = new THREE.Mesh(geometry, wireframe);
wireMesh.scale.setScalar(4); //1.001 , 0.9 | scaling the 3d object
mesh.add(wireMesh); // adding the 3d object with the host 3d object

// Camera Config
const fov = 75;
const aspect = width / height;
const near = 0.1;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10; //2 // 6 | Camera position on z axis.

// Scene
const scene = new THREE.Scene();
scene.add(mesh);

// Lighting: 
// Hemisphere Light | Provides light through top and bottom
const heimiLight = new THREE.HemisphereLight(0xfffee, 0x000000);
scene.add(heimiLight);

// Ambient Light | Provides a soft lighting.
const ambientLight = new THREE.AmbientLight(0x000000, 1);
scene.add(ambientLight);

// Directional Light | Provides the sun like light depends on configuration as well
const DirectionalLight = new THREE.DirectionalLight(0x00ffee, 10);
DirectionalLight.position.set(5, 5, 5).normalize();
scene.add(DirectionalLight);

// Providing the controls which can be used for interaction to 3d Object
// Not ready yet
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableDampingFactor = 1;

// Camera movement on scroll
window.addEventListener("scroll", () => {
  const scrollDelta = scrollY; // wheel gives precise/decimal values and scrollY gives +ve integer
  console.log(scrollDelta);

  // Adjust FOV based on scroll
  camera.fov -= scrollDelta * 0.01;
  camera.updateProjectionMatrix();
});

// Animating the 3d Object
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.z += 0.01;
  wireMesh.rotation.z += -0.006; //x,y
  // wireMesh.rotation.x += -0.006;//x,y
  renderer.render(scene, camera);
}

animate();
