'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Portal({ scrollProgress }: { scrollProgress: number }) {
  const mesh1 = useRef<THREE.Mesh>(null);
  const mesh2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh1.current) {
      mesh1.current.rotation.z = t * 0.3 + scrollProgress * Math.PI;
      mesh1.current.scale.setScalar(1.5 + Math.sin(t * 0.7) * 0.15);
    }
    if (mesh2.current) {
      mesh2.current.rotation.z = -t * 0.2 + scrollProgress * Math.PI;
      mesh2.current.scale.setScalar(1.15 * (1.5 + Math.sin(t * 0.7) * 0.15));
    }
  });

  return (
    <>
      <mesh ref={mesh1} position={[0, 0, -2]}>
        <torusGeometry args={[3, 0.04, 4, 120]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#c084fc"
          emissiveIntensity={1.5}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={mesh2} position={[0, 0, -2]}>
        <torusGeometry args={[3, 0.03, 4, 120]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#c084fc"
          emissiveIntensity={1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </>
  );
}