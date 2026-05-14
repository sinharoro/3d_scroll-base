'use client';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Footer() {
  return (
    <footer className="relative py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <div className="text-2xl font-bold gradient-text-neon mb-2">FUTURE</div>
          <p className="text-white/40 text-sm">Crafting digital experiences</p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-8"
        >
          {['Twitter', 'Instagram', 'Dribbble', 'GitHub'].map((social) => (
            <a
              key={social}
              href="#"
              className="text-white/40 hover:text-white transition-colors text-sm tracking-wider"
              data-magnetic
            >
              {social}
            </a>
          ))}
        </motion.div>
      </div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 text-center text-white/20 text-sm"
      >
        © 2024 Future Studio. All rights reserved.
      </motion.div>
    </footer>
  );
}