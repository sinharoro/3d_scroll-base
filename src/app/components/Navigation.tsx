'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'Work', 'About', 'Process', 'Services', 'Contact'];

  const menuVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: { type: 'spring' as const, damping: 25, stiffness: 200 }
    },
    exit: {
      x: '100%',
      transition: { type: 'spring' as const, damping: 25, stiffness: 200 }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.08, duration: 0.4 }
    })
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-4' : 'py-10'}`}>
        <div className="max-w-[1800px] mx-auto px-12 flex justify-between items-center">
          <a href="#home" className="text-xl font-semibold tracking-[0.3em] gradient-text-neon" data-magnetic>
            FUTURE
          </a>
          <div className="hidden md:flex gap-14 items-start pt-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/60 hover:text-white transition-all duration-500 text-xs tracking-[0.2em] uppercase data-magnetic"
                data-magnetic
              >
                {item}
              </a>
            ))}
          </div>
          <button
            className="md:hidden text-white relative w-8 h-8 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            data-magnetic
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{
                rotate: menuOpen ? 90 : 0,
                scale: menuOpen ? 0.8 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0f0a1a]/95 backdrop-blur-xl z-50 flex flex-col justify-center items-center"
            >
              <div className="flex flex-col gap-8 text-center">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    variants={linkVariants}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    onClick={() => setMenuOpen(false)}
                    className="text-4xl font-light text-white/80 hover:text-white tracking-[0.1em] transition-colors"
                    data-magnetic
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}