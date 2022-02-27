import './index.css';
import * as THREE from 'three';
import AppClass from './App';
import reportWebVitals from './reportWebVitals';

const CLEAR_COLOR = 0xdfdfdf;

const setupScene = () => {

    // Create a scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50, window.innerWidth / window.innerHeight, 0.1, 1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(CLEAR_COLOR);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Attach to DOM
    document.body.appendChild(renderer.domElement);

    // Position our camera so we can see the cube
    camera.position.z = 5;

    // Add a directional light to the scene
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    scene.add(directionalLight);

    // Add an ambient light to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    window.addEventListener('resize', () => {

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    return { scene, camera, renderer };
};

const {
  scene,
  camera,
  renderer
} = setupScene();

// Initialize the App
const App = new AppClass({ scene, camera, render });

// Start the render loop
function render() {
    requestAnimationFrame(render);

    // Render the App on each frame!
    // App.render();

    renderer.render(scene, camera);
};

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// reportWebVitals(console.log);
