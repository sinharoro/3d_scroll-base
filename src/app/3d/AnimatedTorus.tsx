'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AnimatedTorus({ scrollProgress }: { scrollProgress: number }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = scrollProgress * Math.PI;
      mesh.current.rotation.z = scrollProgress * Math.PI * 0.5;
      mesh.current.position.x = -Math.sin(scrollProgress * Math.PI) * 3;
    }
  });

  return (
    <mesh ref={mesh} position={[-2, 0, 0]}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial
        color="#ec4899"
        metalness={0.8}
        roughness={0.2}
        emissive="#ec4899"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}