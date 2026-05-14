'use client';
import { motion } from 'framer-motion';

export function ScrollBar({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9000]">
      <motion.div
        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
        style={{ scaleX: progress, transformOrigin: 'left' }}
      />
    </div>
  );
}