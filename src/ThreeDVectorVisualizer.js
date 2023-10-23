// import React, { useRef, useEffect, useState } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//
// function ThreeDVectorVisualizer({ color1, color2, initialCameraPosition = { x: 0, y: 0, z: 600 } }) {
//     const mountRef = useRef(null);
//     const [arrow1, setArrow1] = useState(null);
//     const [arrow2, setArrow2] = useState(null);
//
//     useEffect(() => {
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         camera.position.set(initialCameraPosition.x, initialCameraPosition.y, initialCameraPosition.z);
//         const renderer = new THREE.WebGLRenderer({ antialias: true });
//         const controls = new OrbitControls(camera, renderer.domElement);
//         controls.minDistance = 270;
//         controls.maxDistance = 500;
//
//         // renderer.setSize(window.innerWidth, window.innerHeight);
//
//         const handleResize = () => {
//             const width = window.innerWidth;
//             const height = window.innerHeight;
//
//             camera.aspect = width / height;
//             camera.updateProjectionMatrix();
//
//             renderer.setSize(width, height);
//         };
//         mountRef.current.appendChild(renderer.domElement);
//         window.addEventListener('resize', handleResize);
//
//
//         // Adding a grid helper
//         const size = 300;
//         const divisions = 10;
//         const gridHelper = new THREE.GridHelper(size, divisions);
//         scene.add(gridHelper);
//
//         // Convert RGB to direction vector for ArrowHelper
//         const colorToDir = (color) => new THREE.Vector3(color.r - 127, color.g - 127, color.b - 127);
//
//         // Create initial arrows and store them in state
//         const dir1 = colorToDir(color1);
//         const origin = new THREE.Vector3(0, 0, 0);
//         const length = 127;
//         const initialArrow1 = new THREE.ArrowHelper(dir1.normalize(), origin, length, `rgb(${color1.r}, ${color1.g}, ${color1.b})`);
//         scene.add(initialArrow1);
//         setArrow1(initialArrow1);
//
//         const dir2 = colorToDir(color2);
//         const initialArrow2 = new THREE.ArrowHelper(dir2.normalize(), origin, length, `rgb(${color2.r}, ${color2.g}, ${color2.b})`);
//         scene.add(initialArrow2);
//         setArrow2(initialArrow2);
//
//         const animate = () => {
//             requestAnimationFrame(animate);
//             controls.update();
//             renderer.render(scene, camera);
//         };
//
//         animate();
//
//         return () => {
//             // Cleanup on unmount
//             if (mountRef.current && renderer.domElement) {
//                 mountRef.current.removeChild(renderer.domElement);
//             }
//             window.removeEventListener('resize', handleResize);
//
//         };
//     }, []);
//
//     useEffect(() => {
//         if (!arrow1 || !arrow2) return;
//
//         // Update the direction and color of arrow1
//         const colorToDir = (color) => new THREE.Vector3(color.r - 127, color.g - 127, color.b - 127);
//         arrow1.setDirection(colorToDir(color1).normalize());
//         arrow1.setColor(new THREE.Color(`rgb(${color1.r}, ${color1.g}, ${color1.b})`));
//
//         // Update the direction and color of arrow2
//         arrow2.setDirection(colorToDir(color2).normalize());
//         arrow2.setColor(new THREE.Color(`rgb(${color2.r}, ${color2.g}, ${color2.b})`));
//
//     }, [color1, color2]);
//
//     return <div ref={mountRef}></div>;
// }
//
// export default ThreeDVectorVisualizer;
