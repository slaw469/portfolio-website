import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

// Import your technology icons if needed
import {
  html,
  css,
  javascript,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker
} from "../assets";

// Define your constellations - group related skills together
const constellations = [
  {
    name: "Frontend",
    color: "#64b5f6",
    position: [5, 2, -15],
    stars: [
      { id: "html", name: "HTML5", size: 0.3, position: [0, 0, 0] },
      { id: "css", name: "CSS3", size: 0.25, position: [1, 0.5, 0.2] },
      { id: "javascript", name: "JavaScript", size: 0.35, position: [-1, 1, 0.1] },
      { id: "react", name: "React", size: 0.4, position: [0.5, -1, -0.3] },
      { id: "redux", name: "Redux", size: 0.2, position: [1.5, -0.5, 0.1] },
      { id: "tailwind", name: "Tailwind CSS", size: 0.25, position: [-1.5, -0.3, -0.2] },
    ]
  },
  {
    name: "Backend",
    color: "#81c784",
    position: [-6, -3, -18],
    stars: [
      { id: "nodejs", name: "Node.js", size: 0.4, position: [0, 0, 0] },
      { id: "express", name: "Express", size: 0.3, position: [1, 0.7, 0.1] },
      { id: "mongodb", name: "MongoDB", size: 0.35, position: [-0.8, 0.6, -0.2] },
      { id: "mysql", name: "MySQL", size: 0.3, position: [0.7, -0.8, 0.3] },
      { id: "graphql", name: "GraphQL", size: 0.25, position: [-1.2, -0.5, 0.1] },
    ]
  },
  {
    name: "Tools",
    color: "#ba68c8",
    position: [0, -5, -20],
    stars: [
      { id: "git", name: "Git", size: 0.35, position: [0, 0, 0] },
      { id: "webpack", name: "Webpack", size: 0.25, position: [0.9, 0.4, 0.1] },
      { id: "docker", name: "Docker", size: 0.3, position: [-0.7, 0.5, -0.1] },
      { id: "vscode", name: "VS Code", size: 0.25, position: [0.5, -0.6, 0.2] },
      { id: "figma", name: "Figma", size: 0.25, position: [-1, -0.4, 0.1] },
    ]
  },
  // Add more constellations as needed
];

// Star component
const Star = ({ position, size, color, name, onPointerOver, onPointerOut, onPointerDown }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (ref.current) {
      // Subtle twinkling effect
      const time = state.clock.getElapsedTime();
      const twinkle = Math.sin(time * (Math.random() * 2 + 1)) * 0.1 + 0.9;
      ref.current.scale.setScalar(size * (hovered ? 1.5 : twinkle));
    }
  });
  
  return (
    <group position={position}>
      <mesh
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onPointerOver(name);
        }}
        onPointerOut={() => {
          setHovered(false);
          onPointerOut();
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          onPointerDown(name, position);
        }}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={hovered ? 2 : 1} 
        />
      </mesh>
    </group>
  );
};

// Lines connecting stars in constellation
const ConstellationLines = ({ stars, color }) => {
  const lines = [];
  
  // Connect each star to closest neighbor
  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    let closestStar = null;
    let minDistance = Infinity;
    
    for (let j = 0; j < stars.length; j++) {
      if (i !== j) {
        const otherStar = stars[j];
        const distance = new THREE.Vector3(...star.position).distanceTo(new THREE.Vector3(...otherStar.position));
        
        if (distance < minDistance) {
          minDistance = distance;
          closestStar = otherStar;
        }
      }
    }
    
    if (closestStar) {
      const points = [
        new THREE.Vector3(...star.position),
        new THREE.Vector3(...closestStar.position)
      ];
      
      const lineKey = `${star.id}-${closestStar.id}`;
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      lines.push(
        <line key={lineKey} geometry={lineGeometry}>
          <lineBasicMaterial attach="material" color={color} opacity={0.3} transparent linewidth={1} />
        </line>
      );
    }
  }
  
  return <>{lines}</>;
};

// Constellation component
const Constellation = ({ constellation, onStarHover, onStarLeave, onStarClick }) => {
  const { name, color, position, stars } = constellation;
  const groupRef = useRef();
  
  return (
    <group ref={groupRef} position={position}>
      {/* Constellation label */}
      <Text
        position={[0, 2, 0]}
        color={color}
        fontSize={0.5}
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
      
      {/* Stars in constellation */}
      {stars.map((star) => (
        <Star
          key={star.id}
          position={star.position}
          size={star.size}
          color={color}
          name={star.name}
          onPointerOver={onStarHover}
          onPointerOut={onStarLeave}
          onPointerDown={(name, pos) => onStarClick(name, constellation.name, [...pos].map((p, i) => p + position[i]))}
        />
      ))}
      
      {/* Connect stars with lines */}
      <ConstellationLines stars={stars} color={color} />
    </group>
  );
};

// Camera control component to smoothly move between constellations
const CameraControls = ({ target }) => {
  const { camera } = useThree();
  const controlsRef = useRef();
  
  useEffect(() => {
    if (target && controlsRef.current) {
      // Smoothly move camera to focus on selected star/constellation
      controlsRef.current.target.set(...target);
    }
  }, [target]);
  
  return <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.05} />;
};

// Skill description component
const SkillDescription = ({ skill }) => {
  const skillDescriptions = {
    // Frontend
    "HTML5": "Expert in semantic HTML5 markup, accessibility, and SEO best practices",
    "CSS3": "Strong knowledge of CSS3, responsive design, animations, and transformations",
    "JavaScript": "Advanced JavaScript including ES6+, DOM manipulation, and asynchronous programming",
    "React": "Building complex UIs with React, hooks, context API, and state management",
    "Redux": "State management with Redux, async actions, and middleware",
    "Tailwind CSS": "Utility-first CSS framework for rapid UI development",
    
    // Backend
    "Node.js": "Server-side JavaScript with Node.js, event-driven architecture",
    "Express": "RESTful API development with Express.js middleware",
    "MongoDB": "NoSQL database design, CRUD operations, and aggregation pipelines",
    "MySQL": "Relational database design, SQL queries, and optimization",
    "GraphQL": "API development with GraphQL schemas, resolvers, and mutations",
    
    // Tools
    "Git": "Version control with Git, branching strategies, and collaborative workflows",
    "Webpack": "Module bundling, code splitting, and build optimization",
    "Docker": "Containerization, Docker Compose, and orchestration",
    "VS Code": "Advanced IDE customization and extension development",
    "Figma": "UI/UX design, prototyping, and developer handoff"
  };
  
  return (
    <div>
      <p>{skillDescriptions[skill] || `Advanced knowledge of ${skill} technology`}</p>
    </div>
  );
};

// Main Skill Constellations component
const SkillConstellations = () => {
  const [hoveredStar, setHoveredStar] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [focusTarget, setFocusTarget] = useState(null);
  
  const handleStarHover = (name) => {
    setHoveredStar(name);
  };
  
  const handleStarLeave = () => {
    setHoveredStar(null);
  };
  
  const handleStarClick = (name, constellation, position) => {
    setSelectedStar({ name, constellation });
    setFocusTarget(position);
  };
  
  const resetView = () => {
    setSelectedStar(null);
    setFocusTarget(null);
  };
  
  return (
    <div className="w-full h-[700px] relative">
      {/* Info panel */}
      <div className="absolute top-4 right-4 bg-gray-900 bg-opacity-80 p-4 rounded-lg z-10 text-white max-w-xs">
        <h3 className="text-xl font-bold mb-2">
          {selectedStar ? `${selectedStar.name}` : hoveredStar || "Skill Constellations"}
        </h3>
        {selectedStar && (
          <SkillDescription skill={selectedStar.name} />
        )}
        {!selectedStar && !hoveredStar && (
          <p className="text-sm mb-4">
            Explore my skills organized as star patterns in the night sky. Click on stars to zoom in and learn more about specific technologies.
          </p>
        )}
        {hoveredStar && !selectedStar && (
          <p className="text-sm opacity-70">Click to learn more about {hoveredStar}</p>
        )}
        {selectedStar && (
          <button 
            className="mt-2 px-4 py-2 bg-blue-600 rounded"
            onClick={resetView}
          >
            Back to Cosmos
          </button>
        )}
      </div>
      
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.1} />
        
        {/* Background stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Camera controls */}
        <CameraControls target={focusTarget} />
        
        {/* All constellations */}
        {constellations.map((constellation) => (
          <Constellation
            key={constellation.name}
            constellation={constellation}
            onStarHover={handleStarHover}
            onStarLeave={handleStarLeave}
            onStarClick={handleStarClick}
          />
        ))}
      </Canvas>
    </div>
  );
};

// Adding default export for the component
export default SkillConstellations;
// Keep named export for compatibility
export { SkillConstellations };