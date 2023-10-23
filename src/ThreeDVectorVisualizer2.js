import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function ThreeDVectorVisualizer2({ color1, color2, initialCameraPosition = { x: 255, y: 255, z: 600 } }) {
    const mountRef = useRef(null);
    const [arrow1, setArrow1] = useState(null);
    const [arrow2, setArrow2] = useState(null);

    useEffect(() => {
        if (!mountRef.current) {
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
        camera.position.set(initialCameraPosition.x, initialCameraPosition.y, initialCameraPosition.z);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 270;
        controls.maxDistance = 700;

        const handleResize = () => {
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
        };

        handleResize();  // Call once to set the initial size

        mountRef.current.appendChild(renderer.domElement);
        window.addEventListener('resize', handleResize);

        // Adding a grid helper
        const size = 255;
        const divisions = 10;
        const gridHelper = new THREE.GridHelper(size, divisions);
        scene.add(gridHelper);

        // Convert RGB to direction vector for ArrowHelper
        const colorToDir = (color) => new THREE.Vector3(color.r, color.g, color.b);

        // Create initial arrows and store them in state
        const dir1 = colorToDir(color1);
        const origin = new THREE.Vector3(0, 0, 0);
        const length = Math.sqrt(dir1.x * dir1.x + dir1.y * dir1.y + dir1.z * dir1.z);
        const initialArrow1 = new THREE.ArrowHelper(dir1.normalize(), origin, length, `rgb(${color1.r}, ${color1.g}, ${color1.b})`);
        scene.add(initialArrow1);
        setArrow1(initialArrow1);

        const dir2 = colorToDir(color2);
        const length2 = Math.sqrt(dir2.x * dir2.x + dir2.y * dir2.y + dir2.z * dir2.z);
        const initialArrow2 = new THREE.ArrowHelper(dir2.normalize(), origin, length2, `rgb(${color2.r}, ${color2.g}, ${color2.b})`);
        scene.add(initialArrow2);
        setArrow2(initialArrow2);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [mountRef.current]);

    useEffect(() => {
        if (!arrow1 || !arrow2) return;

        // Update the direction and color of arrow1
        const colorToDir = (color) => new THREE.Vector3(color.r, color.g, color.b);
        arrow1.setDirection(colorToDir(color1).normalize());
        arrow1.setColor(new THREE.Color(`rgb(${color1.r}, ${color1.g}, ${color1.b})`));

        // Update the direction and color of arrow2
        arrow2.setDirection(colorToDir(color2).normalize());
        arrow2.setColor(new THREE.Color(`rgb(${color2.r}, ${color2.g}, ${color2.b})`));

    }, [color1, color2]);

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }}></div>;
}

export default ThreeDVectorVisualizer2;