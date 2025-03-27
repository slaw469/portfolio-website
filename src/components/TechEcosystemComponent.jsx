import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Sparkles, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Import technology icons from assets
import {
  html,
  css,
  javascript,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
} from "../assets";

// Define technologies and their relationships
const technologies = [
  { 
    id: "react", 
    name: "React", 
    icon: reactjs, 
    position: [0, 0, 0],
    connections: ["javascript", "html", "css", "nodejs"],
    category: "frontend",
    description: "Component-based UI library"
  },
  { 
    id: "javascript", 
    name: "JavaScript", 
    icon: javascript, 
    position: [-2, 1, -1],
    connections: ["react", "nodejs", "html", "css"],
    category: "language",
    description: "Dynamic programming language"
  },
  { 
    id: "html", 
    name: "HTML5", 
    icon: html, 
    position: [1.5, -1, -1],
    connections: ["css", "javascript", "react"],
    category: "frontend",
    description: "Web markup language"
  },
  { 
    id: "css", 
    name: "CSS3", 
    icon: css, 
    position: [1.5, 1, -1],
    connections: ["html", "tailwind", "javascript"],
    category: "frontend",
    description: "Styling language"
  },
  { 
    id: "nodejs", 
    name: "Node.js", 
    icon: nodejs, 
    position: [-1.5, -1, -1],
    connections: ["javascript", "express", "mongodb"],
    category: "backend",
    description: "JavaScript runtime environment"
  },
  { 
    id: "tailwind", 
    name: "Tailwind", 
    icon: tailwind, 
    position: [3, 0, -2],
    connections: ["css"],
    category: "frontend",
    description: "Utility-first CSS framework"
  },
  { 
    id: "mongodb", 
    name: "MongoDB", 
    icon: mongodb, 
    position: [-3, -2, -2],
    connections: ["nodejs", "express"],
    category: "backend",
    description: "NoSQL database"
  },
  { 
    id: "git", 
    name: "Git", 
    icon: git, 
    position: [-3, 0, -2],
    connections: ["nodejs", "mongodb"],
    category: "tools",
    description: "Version control system"
  }
  
];

// Helper function to draw connections between technologies
const drawConnections = (tech, technologies) => {
  return tech.connections.map((connId) => {
    const connectedTech = technologies.find((t) => t.id === connId);
    if (!connectedTech) return null;

    const startPos = new THREE.Vector3(...tech.position);
    const endPos = new THREE.Vector3(...connectedTech.position);
    const points = [startPos, endPos];
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
      <line key={`${tech.id}-${connId}`} geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color="#8888ff" opacity={0.4} transparent linewidth={1} />
      </line>
    );
  });
};

// Technology node component
const TechNode = ({ tech, technologies, onHover, onLeave, onClick, isSelected }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Animate the node
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      
      // Subtle floating effect
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = tech.position[1] + Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Connections */}
      {drawConnections(tech, technologies)}
      
      {/* Tech node */}
      <mesh
        ref={meshRef}
        position={tech.position}
        onPointerOver={() => {
          setHovered(true);
          onHover(tech);
        }}
        onPointerOut={() => {
          setHovered(false);
          onLeave();
        }}
        onClick={() => onClick(tech)}
        scale={isSelected ? 1.2 : hovered ? 1.1 : 1}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          map={useTexture(tech.icon)}
          transparent
          opacity={0.9}
          emissive={isSelected ? new THREE.Color(0x4444ff) : hovered ? new THREE.Color(0x2222ff) : new THREE.Color(0x000000)}
          emissiveIntensity={isSelected ? 0.5 : hovered ? 0.3 : 0}
        />
      </mesh>
    </group>
  );
};

// Tech Ecosystem main component
const TechEcosystem = () => {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 10]);
  
  const handleNodeHover = (tech) => {
    setHoveredTech(tech);
  };
  
  const handleNodeLeave = () => {
    setHoveredTech(null);
  };
  
  const handleNodeClick = (tech) => {
    setSelectedTech(tech);
    // Animate camera to focus on the selected tech
    setCameraPosition([tech.position[0], tech.position[1], tech.position[2] + 5]);
  };
  
  return (
    <div className="w-full h-[600px] relative">
      {/* Info panel */}
      <div className="absolute top-4 left-4 bg-gray-900 bg-opacity-80 p-4 rounded-lg z-10 text-white max-w-xs">
        <h3 className="text-xl font-bold mb-2">
          {selectedTech ? selectedTech.name : hoveredTech ? hoveredTech.name : "Tech Ecosystem"}
        </h3>
        <p>
          {selectedTech ? selectedTech.description : hoveredTech ? hoveredTech.description : "Hover over technologies to learn more. Click to focus."}
        </p>
        {selectedTech && (
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 rounded"
            onClick={() => {
              setSelectedTech(null);
              setCameraPosition([0, 0, 10]);
            }}
          >
            Back to Overview
          </button>
        )}
      </div>
      
      {/* 3D Canvas */}
      <Canvas camera={{ position: cameraPosition, fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Environment particles */}
        <Sparkles count={100} scale={10} size={1} speed={0.2} color="#ffffff" />
        
        {/* Technology nodes */}
        {technologies.map((tech) => (
          <TechNode
            key={tech.id}
            tech={tech}
            technologies={technologies}
            onHover={handleNodeHover}
            onLeave={handleNodeLeave}
            onClick={handleNodeClick}
            isSelected={selectedTech && selectedTech.id === tech.id}
          />
        ))}
      </Canvas>
    </div>
  );
};

// Fix: Adding default export
export default TechEcosystem;
// Also keep the named export for compatibility
export { TechEcosystem };
