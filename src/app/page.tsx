'use client';

import { useEffect, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLenisScroll } from './hooks/useLenis';
import { Scene } from './3d/Scene';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { About } from './components/About';
import { Process } from './components/Process';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Cursor } from './components/Cursor';
import { LoadingScreen } from './components/LoadingScreen';
import { ScrollBar } from './components/ScrollBar';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleScroll = useCallback((progress: number) => {
    setScrollProgress(progress);
  }, []);

  useLenisScroll(handleScroll);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 2000);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => {
      clearTimeout(timer);
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <main className="relative">
      <LoadingScreen isLoading={isLoading} />
      <Cursor />
      <ScrollBar progress={scrollProgress} />
      <div className="grain-overlay" />
      <div className="bg-noise" />
      <div className="radial-gradient" />
      <Navigation />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Canvas dpr={[1, 1.5]} gl={{ antialias: false, alpha: false }} camera={{ position: [0, 0, 12], fov: 50 }}>
          {mounted && <Scene scrollProgress={scrollProgress} />}
        </Canvas>
      </div>
      <Hero />
      <Work />
      <About />
      <Process />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}