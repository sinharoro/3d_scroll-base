'use client';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CameraRig({ progress }: { progress: number }) {
  useFrame(({ camera }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, progress * 4 - 2, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 12 - progress * 4, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, Math.sin(progress * Math.PI) * 1.5, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}