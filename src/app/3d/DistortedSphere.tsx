'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function DistortedSphere({ scrollProgress: _scrollProgress }: { scrollProgress: number }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.5;
      mesh.current.scale.setScalar(1 + Math.sin(t) * 0.1);
    }
  });

  return (
    <Float speed={2} floatIntensity={2}>
      <mesh ref={mesh} position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}