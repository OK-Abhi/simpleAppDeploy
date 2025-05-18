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
const ringGeo = new THREE.TorusGeometry(
  radius * 1.2,
  radius * 0.12 * 0.3,
  16,
  100
);

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
let fov = 75 ;
let near = 0.1;
let far = 100;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 4; //3 and 1000

// Scene
const deg = 97.77 * (Math.PI / 180);
const scene = new THREE.Scene();
mesh.rotation.y += deg;
scene.add(mesh);


// Star function
function getStarfield({ numStars = 800 } = {}) {
  function randomSpherePoint() {
    const radius = Math.random() * 25 + 25;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);

    return {
      pos: new THREE.Vector3(x, y, z),
      hue: 0.6,
      minDist: radius,
    };
  }
  const verts = [];
  const colors = [];
  const positions = [];
  let col;
  for (let i = 0; i < numStars; i += 1) {
    let p = randomSpherePoint();
    const { pos, hue } = p;
    positions.push(p);
    col = new THREE.Color().setHSL(hue, 0.2, Math.random());
    verts.push(pos.x, pos.y, pos.z);
    colors.push(col.r, col.g, col.b);
  }

  // Custom Shader for stars
  const starTexture = new THREE.TextureLoader().load("./img/circle.png");;
  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      pointTexture: { value: starTexture },
    },
    vertexShader: `
    varying vec3 vColor;
    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = 2.5 * (200.0 / -mvPosition.z); // size attenuation
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
    fragmentShader: `
    uniform sampler2D pointTexture;
    varying vec3 vColor;
    void main() {
      vec4 texColor = texture2D(pointTexture, gl_PointCoord);
      if (texColor.a < 0.1) discard;
      gl_FragColor = vec4(vColor, 1.0) * texColor;
    }
  `,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    vertexColors: true,
  });

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  const mat = shaderMaterial;
  const points = new THREE.Points(geo, mat);
  return points;
}

// Adding the rings into the Uranus or 3D object
mesh.add(rings);
mesh.add(ring2);
mesh.add(OuterRing);
mesh.add(OuterRing2);

// Create the starfield
const starfield = getStarfield(); // Change numStars to a higher number if needed
scene.add(starfield);

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
// position going to be changed when you scroll using wheel event which is present in the mouse
window.addEventListener("wheel", (es) => {
  const scrollDelta = es.deltaY;

  // Adjust FOV based on scroll
  camera.fov -= scrollDelta * 0.2;
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
  // starfield.rotation.x += 0.001;
  starfield.rotation.y += 0.001;
  controls.update(); // will be deleted soon.
  renderer.render(scene, camera);
}
animate();
