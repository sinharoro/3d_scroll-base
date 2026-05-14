'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function createSeededRandom(seed: number) {
  return function seededRandom() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function ParticleField({
  count,
  color,
  size,
}: {
  count: number;
  color: string;
  size: number;
}) {
  const meshRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const random = createSeededRandom(count * 42);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (random() - 0.5) * 30;
      positions[i * 3 + 1] = (random() - 0.5) * 30;
      positions[i * 3 + 2] = (random() - 0.5) * 30;
      velocities[i * 3] = (random() - 0.5) * 0.5;
      velocities[i * 3 + 1] = (random() - 0.5) * 0.5;
      velocities[i * 3 + 2] = (random() - 0.5) * 0.5;
    }
    return { positions, velocities };
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3] += velocities[i3] * delta * 2;
      posArray[i3 + 1] += velocities[i3 + 1] * delta * 2;
      posArray[i3 + 2] += velocities[i3 + 2] * delta * 2;

      if (posArray[i3] > 15) posArray[i3] = -15;
      else if (posArray[i3] < -15) posArray[i3] = 15;
      if (posArray[i3 + 1] > 15) posArray[i3 + 1] = -15;
      else if (posArray[i3 + 1] < -15) posArray[i3 + 1] = 15;
      if (posArray[i3 + 2] > 15) posArray[i3 + 2] = -15;
      else if (posArray[i3 + 2] < -15) posArray[i3 + 2] = 15;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={size} color={color} transparent opacity={0.6} sizeAttenuation={false} />
    </points>
  );
}

export function Particles() {
  return (
    <>
      <ParticleField count={800} color="#c084fc" size={1.5} />
      <ParticleField count={300} color="#f0abfc" size={1} />
    </>
  );
}
