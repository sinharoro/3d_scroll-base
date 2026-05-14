'use client';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export function Services() {
  const services = [
    { title: '3D Experiences', desc: 'Immersive WebGL experiences that captivate', icon: '◈' },
    { title: 'Interactive Design', desc: 'Engaging interfaces with smooth animations', icon: '◎' },
    { title: 'Motion Graphics', desc: 'Dynamic visuals that bring ideas to life', icon: '◇' },
    { title: 'Brand Identity', desc: 'Visual systems that make lasting impressions', icon: '○' },
  ];

  return (
    <section id="services" className="relative py-32">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <span className="text-purple-400 text-sm tracking-[0.3em] uppercase">What We Do</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Our <span className="gradient-text-neon">Services</span>
          </h2>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-500 group"
              data-magnetic
            >
              <div className="text-3xl text-purple-400 mb-4 group-hover:scale-125 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-white/40 text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}