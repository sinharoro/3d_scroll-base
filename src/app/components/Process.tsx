'use client';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Process() {
  const steps = [
    { num: '01', title: 'Discover', desc: 'Deep dive into your goals, audience, and competitive landscape.' },
    { num: '02', title: 'Design', desc: 'Craft bold visual systems and interactive prototypes.' },
    { num: '03', title: 'Develop', desc: 'Build with cutting-edge tech — performant, accessible, delightful.' },
    { num: '04', title: 'Deploy', desc: 'Launch, monitor, and iterate toward continuous excellence.' },
  ];

  return (
    <section id="process" className="relative py-32">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <span className="text-purple-400 text-sm tracking-[0.3em] uppercase">How We Work</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Our <span className="gradient-text-neon">Process</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-4 gap-0 relative">
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-purple-500/0 via-purple-500/40 to-purple-500/0" />
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center text-center px-6"
            >
              <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-6 relative z-10">
                <span className="text-purple-400 text-sm font-mono">{step.num}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}