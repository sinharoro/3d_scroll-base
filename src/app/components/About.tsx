'use client';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export function About() {
  const stats = [
    { value: '120+', label: 'Projects' },
    { value: '50+', label: 'Clients' },
    { value: '15+', label: 'Awards' },
  ];

  return (
    <section id="about" className="relative py-32 bg-white/5">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="text-purple-400 text-sm tracking-[0.3em] uppercase">About Us</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-8">
            We create
            <br />
            <span className="gradient-text-neon">digital magic</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-8">
            We&apos;re a creative studio specializing in cutting-edge 3D experiences,
            interactive web design, and immersive digital solutions that captivate
            audiences worldwide.
          </p>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-3 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="text-center p-4 rounded-2xl bg-white/5"
              >
                <div className="text-2xl font-bold gradient-text-neon">{stat.value}</div>
                <div className="text-white/40 text-xs mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent p-8">
            <div className="w-full h-full rounded-2xl border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">◈</div>
                <p className="text-white/30 text-sm tracking-widest">SINCE 2020</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}