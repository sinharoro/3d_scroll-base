'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AnimatedCube({ scrollProgress }: { scrollProgress: number }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = scrollProgress * Math.PI * 2;
      mesh.current.rotation.y = scrollProgress * Math.PI * 2;
      mesh.current.position.y = Math.sin(scrollProgress * Math.PI) * 2;
    }
  });

  return (
    <mesh ref={mesh} position={[2, 0, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color="#a855f7"
        metalness={0.9}
        roughness={0.1}
        emissive="#a855f7"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}