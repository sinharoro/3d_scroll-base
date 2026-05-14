'use client';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useEffect, useState, memo } from 'react';

export const LoadingScreen = memo(function LoadingScreen({ isLoading }: { isLoading: boolean }) {
  const [count, setCount] = useState(0);
  const progress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 1.8,
      ease: 'easeInOut',
      onUpdate: (v) => setCount(Math.floor(v)),
    });
    return controls.stop;
  }, [progress]);

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="loading-counter gradient-text-neon">{count}</div>
      <div className="loading-bar-track">
        <motion.div className="loading-bar-fill" style={{ scaleX: progress.get() / 100 }} />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: count === 100 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="loading-logo gradient-text-neon"
      >
        FUTURE
      </motion.div>
    </motion.div>
  );
});
