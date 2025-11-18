import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const VampireBat3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xff6b00, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    let bat: THREE.Object3D | null = null;
    let animationId: number;

    // Load 3D bat model
    const loader = new GLTFLoader();
    loader.load(
      '/assets/haunted/vampire-bat/source/bat.glb',
      (gltf: any) => {
        bat = gltf.scene;
        if (bat) {
          bat.scale.set(0.5, 0.5, 0.5);
          bat.position.set(-10, 2, 0);
          scene.add(bat);
        }
        setModelLoaded(true);
        console.log('✅ 3D Bat model loaded successfully');
      },
      (progress: any) => {
        console.log(`Loading bat: ${(progress.loaded / progress.total * 100).toFixed(0)}%`);
      },
      (error: any) => {
        console.error('❌ Error loading bat model:', error);
        setError('Failed to load 3D bat model');
      }
    );

    // Animation loop
    let time = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      if (bat) {
        // Fly across screen
        bat.position.x = -10 + (time % 20);
        bat.position.y = 2 + Math.sin(time * 2) * 0.5;
        bat.rotation.y = Math.sin(time) * 0.3;
        bat.rotation.z = Math.sin(time * 2) * 0.1;

        // Reset position when off screen
        if (bat.position.x > 10) {
          bat.position.x = -10;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none" 
      style={{ zIndex: 4 }}
    >
      {error && (
        <div className="absolute top-4 right-4 text-red-400 text-xs bg-black/50 p-2 rounded">
          {error}
        </div>
      )}

    </div>
  );
};

export default VampireBat3D;
