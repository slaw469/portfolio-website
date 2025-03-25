import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Grid, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import CanvasLoader from "../Loader";

const Knight = () => {
  const knight = useGLTF("./knight/scene.gltf");
  const knightRef = useRef();
  const [scale, setScale] = useState(0.3); // Larger scale for better visibility
  
  // Log when model loads
  useEffect(() => {
    console.log("Knight model loaded:", knight);
  }, [knight]);
  
  // Add subtle bobbing motion
  useFrame(({ clock }) => {
    if (knightRef.current) {
      knightRef.current.position.y = 0 + Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
      
      // Log position occasionally to help with debugging
      if (Math.floor(clock.getElapsedTime()) % 5 === 0) {
        console.log("Knight position:", knightRef.current.position);
      }
    }
  });

  return (
    <>
      {/* Add a grid to help with orientation */}
      {/* Grid helper is optional - can be removed in final version */}
      <gridHelper args={[10, 10]} position={[0, -1, 0]} />
      
      <primitive 
        ref={knightRef}
        object={knight.scene} 
        scale={scale}  // Using smaller scale
        position={[3, 0, 0]} // Positioned to the right side
        rotation-y={0} 
      />
    </>
  );
};

const KnightCanvas = () => {
  return (
    <div className="relative w-full h-full">
      {/* Instructions overlay */}
      <div className="absolute top-5 right-5 bg-black bg-opacity-70 text-white px-4 py-3 rounded-md text-sm z-10 pointer-events-none flex flex-col gap-1">
        <p>Scroll to zoom in/out</p>
        <p>Drag to rotate camera</p>
        <p className="text-xs mt-2 italic opacity-80">Fun fact: my chess elo rating is 1600</p>
      </div>
      
      <Canvas
        shadows
        frameloop='demand'
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [3, 2, 8],  // Adjusted to focus on the right side
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate={false}
            enableZoom={true}  // Enable zoom for debugging
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
            enableRotate={true}
          />
          
          {/* Enhanced lighting for better visibility */}
          <ambientLight intensity={1.0} />
          <hemisphereLight intensity={0.8} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1} 
            castShadow 
          />
          <spotLight 
            position={[-5, 5, 5]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          
          <Knight />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default KnightCanvas;