'use client';
import { motion } from 'framer-motion';

function AnimatedWord({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-flex overflow-hidden">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 geometric-shape pointer-events-none">
        <div className="absolute top-[10%] -right-[5%] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="absolute bottom-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-pink-500/15 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/8 blur-[150px]" />
      </div>
      <div className="text-center z-10 px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <span className="px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/30 text-[10px] tracking-[0.25em] uppercase backdrop-blur-sm">
            Creative Studio
          </span>
        </motion.div>
        <h1 className="text-[11vw] md:text-[7.5rem] font-light mb-16 leading-[1.1] tracking-[-0.03em]">
          <AnimatedWord text="Digital" delay={0.4} />
          <br />
          <span className="text-white/70">
            <AnimatedWord text="Reality" delay={0.8} />
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-white/40 text-lg md:text-xl mb-20 max-w-2xl mx-auto leading-[1.9]"
        >
          We craft immersive digital experiences that push the boundaries of creativity and technology.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex gap-6 justify-center flex-wrap"
        >
          <button className="btn-primary" data-magnetic>
            View Work
          </button>
          <button className="btn-glass" data-magnetic>
            Get in Touch
          </button>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-purple-500/40 to-transparent" />
      </motion.div>
    </section>
  );
}