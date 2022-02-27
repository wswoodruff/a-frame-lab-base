import * as THREE from 'three';

const uniforms = {
    colorB: {
        type: 'vec3',
        value: new THREE.Color("rgba(255, 100, 70)")
    },
    colorA: {
        type: 'vec3',
        value: new THREE.Color("rgb(40, 255, 20)")
    }
};

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

export default class App {

    constructor({ scene, camera, render }) {
        this.scene = scene;
        this.camera = camera;
        this.render = render;

        const material =  new THREE.ShaderMaterial({
            uniforms,
            fragmentShader,
            vertexShader
        });

        // Add a cube to the scene
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        // const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);

        scene.add(this.cube);
    }

    // Using "render" as a func name causes problems
    _render() {
        // Rotate our cube
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
    }
}
