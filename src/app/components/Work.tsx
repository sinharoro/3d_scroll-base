'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';

function TiltCard({ children, color }: { children: React.ReactNode; color: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) scale(1.02)`;
  }

  function handleMouseLeave() {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ background: `linear-gradient(135deg, ${color}20, ${color}05)` }}
      className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer transition-transform duration-100 ease-out"
      data-magnetic
    >
      {children}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export function Work() {
  const projects = [
    { title: 'Neon Dreams', category: '3D Experience', color: '#a855f7' },
    { title: 'Cyber Pulse', category: 'Interactive', color: '#ec4899' },
    { title: 'Digital Flow', category: 'WebGL', color: '#8b5cf6' },
    { title: 'Virtual Realm', category: 'Immersive', color: '#c084fc' },
  ];

  return (
    <section id="work" className="relative py-32">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <span className="text-purple-400 text-sm tracking-[0.3em] uppercase">Portfolio</span>
          <h2 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
            <span className="gradient-text-neon">Selected</span> Work
          </h2>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, i) => (
            <motion.div key={i} variants={fadeUp}>
              <TiltCard color={project.color}>
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
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}