// client-side js
// run by the browser each time your view template is loaded

// Extract globals, otherwise linting gets angry
const { THREE } = window;

// Create a scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50, window.innerWidth / window.innerHeight, 0.1, 1000
);

const vertexShader = `
  varying vec3 vUv;

  void main() {
    vUv = position;

    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

const fragmentShader = `
    uniform vec3 colorA;
    uniform vec3 colorB;
    varying vec3 vUv;

    void main() {
      gl_FragColor = vec4(mix(colorA, colorB, vUv.x), 1.0);
    }
`;

let uniforms = {
  colorB: {type: 'vec3', value: new THREE.Color("rgba(255, 100, 70)")},
  colorA: {type: 'vec3', value: new THREE.Color("rgb(40, 255, 20)")}
};

let material =  new THREE.ShaderMaterial({
  uniforms: uniforms,
  fragmentShader,
  vertexShader,
});

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xdfdfdf);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a cube to the scene
const geometry = new THREE.BoxGeometry(2, 2, 2);
// const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position our camera so we can see the cube
camera.position.z = 5;

// Add a directional light to the scene
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
scene.add(directionalLight);

// Add an ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Start the render loop
function render() {
  requestAnimationFrame(render);

  // Rotate our cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

render();

// document.addEventListener("keypress", function(event) {
//     switch (event.key.toLowerCase()) {
//         case "r":
//             location.reload();
//             break;
//         default:
//             break;
//     }
// });
