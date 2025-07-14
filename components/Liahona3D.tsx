'use client';

import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { CompassPoint, getTodaysDayOfYear } from '@/data/compassPoints';

interface Liahona3DProps {
  points: CompassPoint[];
  onPointClick: (point: CompassPoint) => void;
  selectedDay?: number;
}

// Simple OrbitControls implementation
function CameraController() {
  const { camera, gl } = useThree();
  const controls = useRef<any>();

  useEffect(() => {
    const orbitControls = {
      mouseX: 0,
      mouseY: 0,
      targetRotationX: 0,
      targetRotationY: 0,
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (event.buttons === 1) {
        orbitControls.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        orbitControls.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        orbitControls.targetRotationY += orbitControls.mouseX * 0.02;
        orbitControls.targetRotationX += orbitControls.mouseY * 0.02;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      camera.position.z += event.deltaY * 0.01;
      camera.position.z = Math.max(5, Math.min(15, camera.position.z));
    };

    gl.domElement.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('wheel', handleWheel);

    controls.current = orbitControls;

    return () => {
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('wheel', handleWheel);
    };
  }, [camera, gl]);

  useFrame(() => {
    if (controls.current) {
      camera.rotation.x += (controls.current.targetRotationX - camera.rotation.x) * 0.05;
      camera.rotation.y += (controls.current.targetRotationY - camera.rotation.y) * 0.05;
    }
  });

  return null;
}

function LiahonaCore({ points, onPointClick, selectedDay }: Liahona3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const todaysDayOfYear = getTodaysDayOfYear();

  // Rotate the Liahona slowly
  useFrame((state, delta) => {
    if (groupRef.current && !selectedDay) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  // Create sphere geometry for reuse
  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);
  const ringGeometry = useMemo(() => new THREE.TorusGeometry(1, 0.1, 16, 100), []);

  return (
    <group ref={groupRef}>
      {/* Main sphere - bronze/brass color */}
      <mesh geometry={sphereGeometry} scale={2}>
        <meshPhysicalMaterial
          color="#B87333"
          metalness={0.9}
          roughness={0.3}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Golden rings */}
      <mesh 
        geometry={ringGeometry}
        scale={[2.3, 2.3, 2.3]}
        rotation={[0, 0, 0]}
      >
        <meshPhysicalMaterial
          color="#FFD700"
          metalness={0.95}
          roughness={0.1}
          emissive="#FFD700"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh 
        geometry={ringGeometry}
        scale={[2.3, 2.3, 2.3]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial
          color="#FFD700"
          metalness={0.95}
          roughness={0.1}
          emissive="#FFD700"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh 
        geometry={ringGeometry}
        scale={[2.3, 2.3, 2.3]}
        rotation={[Math.PI / 4, Math.PI / 4, 0]}
      >
        <meshPhysicalMaterial
          color="#FFD700"
          metalness={0.95}
          roughness={0.1}
          emissive="#FFD700"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Points for each day */}
      {points.map((point) => {
        const angle = (point.dayOfYear / 365) * Math.PI * 2;
        const phi = Math.acos(1 - 2 * ((point.dayOfYear % 180) / 180));
        const theta = angle;
        
        const radius = 2.2;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        const isToday = point.dayOfYear === todaysDayOfYear;
        const isSelected = point.dayOfYear === selectedDay;
        const isHovered = point.dayOfYear === hovered;

        return (
          <group key={point.dayOfYear} position={[x, y, z]}>
            <mesh
              scale={isSelected ? 0.08 : isToday ? 0.06 : 0.04}
              onClick={() => onPointClick(point)}
              onPointerOver={() => setHovered(point.dayOfYear)}
              onPointerOut={() => setHovered(null)}
            >
              <sphereGeometry args={[1, 16, 16]} />
              <meshPhysicalMaterial
                color={
                  isSelected ? "#FF6B6B" :
                  isToday ? "#FFD700" :
                  getCategoryColor(point.category)
                }
                roughness={0.2}
                metalness={0.8}
                emissive={
                  isSelected ? "#FF6B6B" :
                  isToday ? "#FFD700" :
                  getCategoryColor(point.category)
                }
                emissiveIntensity={
                  isSelected ? 0.5 :
                  isToday ? 0.3 :
                  isHovered ? 0.2 : 0.1
                }
              />
            </mesh>

            {/* Show day number on hover */}
            {isHovered && (
              <sprite scale={[0.5, 0.2, 1]} position={[0, 0.15, 0]}>
                <spriteMaterial color="white" />
              </sprite>
            )}
          </group>
        );
      })}

      {/* Cardinal direction markers */}
      <mesh position={[0, 0, 2.5]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>
      <mesh position={[0, 0, -2.5]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>
      <mesh position={[2.5, 0, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>
      <mesh position={[-2.5, 0, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>
    </group>
  );
}

function getCategoryColor(category: string): string {
  const colors: { [key: string]: string } = {
    'Faith': '#4F46E5',
    'Hope': '#10B981',
    'Love': '#EF4444',
    'Repentance': '#8B5CF6',
    'Service': '#F59E0B',
    'Gratitude': '#EC4899',
    'Forgiveness': '#3B82F6',
    'Patience': '#14B8A6',
    'Humility': '#6366F1',
    'Courage': '#F97316',
  };
  return colors[category] || '#6B7280';
}

export default function Liahona3D({ points, onPointClick, selectedDay }: Liahona3DProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10"
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-yellow-400">Loading Liahona...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <LiahonaCore
            points={points}
            onPointClick={onPointClick}
            selectedDay={selectedDay}
          />
          
          <CameraController />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-3 py-2 rounded-lg">
        <p>Drag to rotate • Scroll to zoom</p>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-black/50 text-white p-4 rounded-lg text-sm">
        <h3 className="font-bold mb-2">Categories</h3>
        <div className="space-y-1">
          {Object.entries({
            'Faith': '#4F46E5',
            'Hope': '#10B981',
            'Love': '#EF4444',
            'Service': '#F59E0B',
            'Gratitude': '#EC4899',
          }).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: color }}
              />
              <span>{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 