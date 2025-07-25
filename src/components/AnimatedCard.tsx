import { motion } from 'framer-motion';
import react from 'react';

export default function AnimatedCard({ children }: { children: react.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="animated-card card-glow"

    >
      {children}
    </motion.div>
  );
}
