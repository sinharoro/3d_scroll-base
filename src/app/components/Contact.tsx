'use client';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Contact() {
  return (
    <section id="contact" className="relative py-32 bg-white/5">
      <div className="max-w-3xl mx-auto px-8 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="text-purple-400 text-sm tracking-[0.3em] uppercase">Get in Touch</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            Let&apos;s create <span className="gradient-text-neon">together</span>
          </h2>
          <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto">
            Have a project in mind? We&apos;d love to hear from you. Let&apos;s create something extraordinary.
          </p>
        </motion.div>
        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-6 text-left"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Name"
              className="input-field"
              data-magnetic
            />
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              data-magnetic
            />
          </div>
          <textarea
            placeholder="Message"
            rows={4}
            className="input-field resize-none"
            data-magnetic
          />
          <button type="submit" className="btn-primary w-full" data-magnetic>
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}