
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float, Text, Environment } from "@react-three/drei";
import { Vector3, Euler } from "three";

function TaskBin({ position = [0, 0, 0], color = "#9b87f5" }) {
  const meshRef = useRef(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group position={position as [number, number, number]}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.6} />
      </mesh>
    </group>
  );
}

function TaskCard({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  color = "#33C3F0", 
  text = "Task" 
}) {
  const meshRef = useRef(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
    }
  });

  return (
    <group position={position as [number, number, number]} rotation={rotation as [number, number, number]}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.1, 1.2]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>
      <Text 
        position={[0, 0.07, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
}

function ProjectScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <TaskBin position={[0, -0.5, 0]} color="#9b87f5" />
      </Float>
      
      <TaskCard position={[-0.8, 0.5, 0.3]} rotation={[Math.PI / 6, 0, Math.PI / 12]} color="#33C3F0" text="Design" />
      <TaskCard position={[0.3, 0.7, -0.2]} rotation={[Math.PI / 8, Math.PI / 8, -Math.PI / 24]} color="#5CDB95" text="Development" />
      <TaskCard position={[0.7, 0.3, 0.4]} rotation={[Math.PI / 5, -Math.PI / 6, Math.PI / 10]} color="#FFD166" text="Testing" />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 3} 
        maxPolarAngle={Math.PI / 2}
        rotateSpeed={0.5}
      />
      <Environment preset="city" />
    </>
  );
}

export function ProjectVisualization({ className }: { className?: string }) {
  return (
    <div className={`w-full h-full min-h-[400px] ${className}`}>
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
        <ProjectScene />
      </Canvas>
    </div>
  );
}
