
import React, { useEffect, useRef } from "react";

interface FarmPlant3DViewProps {
  farmId: number;
}

const FarmPlant3DView = ({ farmId }: FarmPlant3DViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Load Three.js dynamically
    const loadThreeJS = async () => {
      try {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
        script.async = true;
        
        script.onload = () => initializeScene();
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading Three.js:", error);
      }
    };

    const initializeScene = () => {
      if (!window.THREE || !containerRef.current) return;
      
      const THREE = window.THREE;
      
      // Setup scene, camera, and renderer
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f9ef);
      
      const camera = new THREE.PerspectiveCamera(
        75, 
        containerRef.current.clientWidth / containerRef.current.clientHeight, 
        0.1, 
        1000
      );
      
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      containerRef.current.appendChild(renderer.domElement);
      
      // Add lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
      scene.add(ambientLight);
      
      const sunLight = new THREE.DirectionalLight(0xffffff, 1);
      sunLight.position.set(10, 10, 10);
      scene.add(sunLight);
      
      // Create ground plane
      const groundGeometry = new THREE.PlaneGeometry(50, 50);
      const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x7cba3d,
        roughness: 0.8,
        metalness: 0.2
      });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -2;
      scene.add(ground);
      
      // Create trees based on farmId (in a real app, you'd load models from a database)
      const createTree = (x: number, z: number, height: number, maturity: number) => {
        // Create trunk
        const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.4, height, 8);
        const trunkMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x8b4513,
          roughness: 0.9
        });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.set(x, height/2 - 2, z);
        scene.add(trunk);
        
        // Create foliage based on maturity
        const foliageSize = 1.5 + maturity;
        const foliageGeometry = new THREE.SphereGeometry(foliageSize, 8, 8);
        const foliageMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x2e8b57, 
          roughness: 0.8
        });
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.set(x, height - 2 + foliageSize/2, z);
        scene.add(foliage);
        
        // Add cashew fruits if mature (red spheres)
        if (maturity > 1) {
          const fruitCount = Math.floor(maturity * 3);
          for (let i = 0; i < fruitCount; i++) {
            const fruitGeometry = new THREE.SphereGeometry(0.2, 8, 8);
            const fruitMaterial = new THREE.MeshStandardMaterial({ 
              color: 0xff6347, 
              roughness: 0.5,
              metalness: 0.1
            });
            const fruit = new THREE.Mesh(fruitGeometry, fruitMaterial);
            
            // Position fruits around the foliage
            const angle = Math.random() * Math.PI * 2;
            const radius = foliageSize * 0.8;
            fruit.position.set(
              x + Math.cos(angle) * radius,
              height - 2 + foliageSize/2 + (Math.random() - 0.5),
              z + Math.sin(angle) * radius
            );
            scene.add(fruit);
          }
        }
      };
      
      // Generate 20 trees in a grid pattern
      const gridSize = 5;
      const spacing = 4;
      
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          if (i === 2 && j === 2) continue; // Skip center to create a clearing
          
          const x = (i - gridSize/2) * spacing;
          const z = (j - gridSize/2) * spacing;
          
          // Vary heights and maturity based on farm id to simulate different farms
          const heightVariance = (farmId % 3) * 0.5;
          const maturityVariance = ((farmId + i + j) % 4) * 0.5;
          
          const height = 3 + Math.random() * 2 + heightVariance;
          const maturity = 0.5 + Math.random() * 1.5 + maturityVariance;
          
          createTree(x, z, height, maturity);
        }
      }
      
      // Position camera
      camera.position.set(15, 10, 15);
      camera.lookAt(0, 0, 0);
      
      // Add grid helper for reference
      const gridHelper = new THREE.GridHelper(50, 50);
      scene.add(gridHelper);
      
      // Add orbit controls
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };
      
      // Mouse controls
      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        previousMousePosition = {
          x: e.clientX,
          y: e.clientY
        };
      };
      
      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        
        // Rotate camera around origin
        const rotationSpeed = 0.005;
        
        camera.position.x = camera.position.x * Math.cos(rotationSpeed * deltaX) - 
                            camera.position.z * Math.sin(rotationSpeed * deltaX);
        camera.position.z = camera.position.z * Math.cos(rotationSpeed * deltaX) + 
                            camera.position.x * Math.sin(rotationSpeed * deltaX);
        
        // Limit vertical rotation
        const currentAngle = Math.atan2(
          camera.position.y, 
          Math.sqrt(camera.position.x * camera.position.x + camera.position.z * camera.position.z)
        );
        
        const newAngle = currentAngle - rotationSpeed * deltaY;
        const radius = Math.sqrt(
          camera.position.x * camera.position.x + 
          camera.position.y * camera.position.y + 
          camera.position.z * camera.position.z
        );
        
        // Limit vertical rotation angles
        if (newAngle > 0.1 && newAngle < Math.PI / 2) {
          camera.position.y = radius * Math.sin(newAngle);
          const horizontalRadius = radius * Math.cos(newAngle);
          const horizontalAngle = Math.atan2(camera.position.z, camera.position.x);
          
          camera.position.x = horizontalRadius * Math.cos(horizontalAngle);
          camera.position.z = horizontalRadius * Math.sin(horizontalAngle);
        }
        
        camera.lookAt(0, 0, 0);
        
        previousMousePosition = {
          x: e.clientX,
          y: e.clientY
        };
      };
      
      const onMouseUp = () => {
        isDragging = false;
      };
      
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        
        // Zoom in/out
        const zoomSpeed = 0.1;
        const direction = e.deltaY > 0 ? 1 : -1;
        
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);
        
        camera.position.x += cameraDirection.x * direction * zoomSpeed * 5;
        camera.position.y += cameraDirection.y * direction * zoomSpeed * 5;
        camera.position.z += cameraDirection.z * direction * zoomSpeed * 5;
        
        // Limit how close or far the camera can be
        const distanceToOrigin = camera.position.length();
        if (distanceToOrigin < 5) {
          camera.position.multiplyScalar(5 / distanceToOrigin);
        } else if (distanceToOrigin > 30) {
          camera.position.multiplyScalar(30 / distanceToOrigin);
        }
        
        camera.lookAt(0, 0, 0);
      };
      
      // Add event listeners
      containerRef.current.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      containerRef.current.addEventListener('wheel', onWheel);
      
      // Animation/render loop
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      
      animate();
      
      // Cleanup
      return () => {
        containerRef.current?.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        containerRef.current?.removeEventListener('wheel', onWheel);
        containerRef.current?.removeChild(renderer.domElement);
      };
    };
    
    loadThreeJS();
  }, [farmId]);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-full bg-green-50 rounded-md"
    />
  );
};

export default FarmPlant3DView;
