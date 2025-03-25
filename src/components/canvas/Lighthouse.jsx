import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import CanvasLoader from "../Loader";

const Lighthouse = ({ isMobile }) => {
  const lighthouse = useGLTF("./lighthouse/scene.gltf");
  const lighthouseRef = useRef();
  
  // Add a subtle animation to the lighthouse
  useFrame(({ clock }) => {
    if (lighthouseRef.current) {
      // Very gentle rotation - subtle since we're "inside" it
      lighthouseRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.05) * 0.02 - 0.2;
    }
  });

  return (
    <mesh ref={lighthouseRef}>
      <hemisphereLight intensity={0.25} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1.2}
        castShadow
        shadow-mapSize={1024}
      />
      {/* Dramatic light from lighthouse */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={2.0}
        castShadow
        color="#FFF9C4"
      />
      <pointLight intensity={1.2} position={[0, 8, 0]} color="#FFF9C4" />
      <primitive
        object={lighthouse.scene}
        scale={isMobile ? 6.5 : 8.0} // Made slightly smaller
        position={isMobile ? [3, -2, -2.2] : [4, -2.0, -0.5]} // Moved to the right
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const LighthouseCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Lighthouse isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default LighthouseCanvas;