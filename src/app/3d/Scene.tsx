'use client';
import { Suspense } from 'react';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { AnimatedCube } from './AnimatedCube';
import { AnimatedTorus } from './AnimatedTorus';
import { DistortedSphere } from './DistortedSphere';
import { Particles } from './Particles';
import { Portal } from './Portal';
import { CameraRig } from './CameraRig';

const chromaticOffset = new THREE.Vector2(0.0005, 0.0005);

export function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#a855f7" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
      <fog attach="fog" args={['#0f0a1a', 8, 35]} />
      <Particles />
      <DistortedSphere scrollProgress={scrollProgress} />
      <AnimatedCube scrollProgress={scrollProgress} />
      <AnimatedTorus scrollProgress={scrollProgress} />
      <Portal scrollProgress={scrollProgress} />
      <CameraRig progress={scrollProgress} />
      <Suspense fallback={null}>
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.8}
            intensity={0.8}
            blendFunction={BlendFunction.ADD}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={chromaticOffset}
          />
        </EffectComposer>
      </Suspense>
    </>
  );
}