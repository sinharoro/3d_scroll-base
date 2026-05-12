'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

function AnimatedCube({ scrollProgress }: { scrollProgress: number }) {
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

function AnimatedTorus({ scrollProgress }: { scrollProgress: number }) {
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

function DistortedSphere({ scrollProgress }: { scrollProgress: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const timer = useRef(new THREE.Timer());
  
  useFrame(() => {
    timer.current.update();
    const t = timer.current.getElapsed();
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

function Particles({ count = 300 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const timer = useRef(new THREE.Timer());
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, [count]);

  useFrame(() => {
    timer.current.update();
    if (mesh.current) {
      mesh.current.rotation.y = timer.current.getElapsed() * 0.02;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#c084fc" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ec4899" />
      <spotLight position={[0, 20, 0]} intensity={1} color="#c084fc" angle={0.4} penumbra={0.5} />
      <fog attach="fog" args={['#0f0a1a', 5, 40]} />
      <Particles />
      <DistortedSphere scrollProgress={scrollProgress} />
      <AnimatedCube scrollProgress={scrollProgress} />
      <AnimatedTorus scrollProgress={scrollProgress} />
    </>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-4' : 'py-10'}`}>
      <div className="max-w-[1800px] mx-auto px-12 flex justify-between items-center">
        <div className="text-xl font-semibold tracking-[0.3em] gradient-text-neon">FUTURE</div>
        <div className="hidden md:flex gap-14 items-start pt-1">
          {['Home', 'Work', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/60 hover:text-white transition-all duration-500 text-xs tracking-[0.2em] uppercase"
            >
              {item}
            </a>
          ))}
        </div>
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 geometric-shape">
        <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-purple-500/15 blur-[100px]" />
        <div className="absolute bottom-1/3 -left-32 w-[350px] h-[350px] rounded-full bg-pink-500/12 blur-[80px]" />
      </div>
      <div className="text-center z-10 px-6 max-w-5xl">
        <div className="mb-10 inline-block">
          <span className="px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/45 text-[11px] tracking-[0.2em] uppercase backdrop-blur-sm">
            Creative Studio
          </span>
        </div>
        <h1 className="text-[10vw] md:text-[8rem] font-medium mb-10 leading-[0.92] tracking-[0.02em]">
          <span className="gradient-text-neon">Digital</span>
          <br />
          <span className="text-white/85 font-light">Reality</span>
        </h1>
        <p className="text-white/40 text-lg md:text-xl mb-16 max-w-xl mx-auto leading-[1.7] tracking-wide">
          Crafting immersive digital experiences that push the boundaries of creativity
        </p>
        <div className="flex gap-8 justify-center flex-wrap">
          <button className="btn-primary">
            View Work
          </button>
          <button className="btn-secondary glass-btn">
            Get in Touch
          </button>
        </div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-[1px] h-16 bg-gradient-to-b from-purple-500/50 to-transparent" />
      </div>
    </section>
  );
}

function Work() {
  const projects = [
    { title: 'Neon Dreams', category: '3D Experience', color: '#a855f7' },
    { title: 'Cyber Pulse', category: 'Interactive', color: '#ec4899' },
    { title: 'Digital Flow', category: 'WebGL', color: '#8b5cf6' },
    { title: 'Virtual Realm', category: 'Immersive', color: '#c084fc' },
  ];

  return (
    <section id="work" className="relative py-32">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <span className="text-purple-400 text-sm tracking-[0.3em] uppercase">Portfolio</span>
          <h2 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
            <span className="gradient-text-neon">Selected</span> Work
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div 
                    className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ background: `${project.color}30`, border: `1px solid ${project.color}50` }}
                  >
                    <svg className="w-10 h-10" style={{ color: project.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/50 text-sm tracking-wider">{project.category}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-32 bg-white/5">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-purple-400 text-sm tracking-[0.3em] uppercase">About Us</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-8">
            We create
            <br />
            <span className="gradient-text-neon">digital magic</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-8">
            We're a creative studio specializing in cutting-edge 3D experiences, 
            interactive web design, and immersive digital solutions that captivate 
            audiences worldwide.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: '120+', label: 'Projects' },
              { value: '50+', label: 'Clients' },
              { value: '15+', label: 'Awards' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-white/5">
                <div className="text-2xl font-bold gradient-text-neon">{stat.value}</div>
                <div className="text-white/40 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent p-8">
            <div className="w-full h-full rounded-2xl border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">◈</div>
                <p className="text-white/30 text-sm tracking-widest">SINCE 2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { title: '3D Experiences', desc: 'Immersive WebGL experiences that captivate', icon: '◈' },
    { title: 'Interactive Design', desc: 'Engaging interfaces with smooth animations', icon: '◎' },
    { title: 'Motion Graphics', desc: 'Dynamic visuals that bring ideas to life', icon: '◇' },
    { title: 'Brand Identity', desc: 'Visual systems that make lasting impressions', icon: '○' },
  ];

  return (
    <section className="relative py-32">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <span className="text-purple-400 text-sm tracking-[0.3em] uppercase">What We Do</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Our <span className="gradient-text-neon">Services</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-500 group"
            >
              <div className="text-3xl text-purple-400 mb-4 group-hover:scale-125 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-white/40 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-32 bg-white/5">
      <div className="max-w-3xl mx-auto px-8 text-center">
        <span className="text-purple-400 text-sm tracking-[0.3em] uppercase">Get in Touch</span>
        <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
          Let's create <span className="gradient-text-neon">together</span>
        </h2>
        <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto">
          Have a project in mind? We'd love to hear from you. Let's create something extraordinary.
        </p>
        <form className="space-y-6 text-left">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Name"
              className="input-field"
            />
            <input
              type="email"
              placeholder="Email"
              className="input-field"
            />
          </div>
          <textarea
            placeholder="Message"
            rows={4}
            className="input-field resize-none"
          />
          <button type="submit" className="btn-primary w-full">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="text-2xl font-bold gradient-text-neon mb-2">FUTURE</div>
          <p className="text-white/40 text-sm">Crafting digital experiences</p>
        </div>
        <div className="flex gap-8">
          {['Twitter', 'Instagram', 'Dribbble', 'GitHub'].map((social) => (
            <a
              key={social}
              href="#"
              className="text-white/40 hover:text-white transition-colors text-sm tracking-wider"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-12 text-center text-white/20 text-sm">
        © 2024 Future Studio. All rights reserved.
      </div>
    </footer>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    const ctx = gsap.context(() => {
      gsap.to({}, {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => setScrollProgress(self.progress),
        },
      });
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative">
      <div className="grain-overlay" />
      <Navigation />
      <div className="fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
          {mounted && <Scene scrollProgress={scrollProgress} />}
        </Canvas>
      </div>
      <Hero />
      <Work />
      <About />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}