import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 20 + 6;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 150);
          setTimeout(() => onComplete?.(), 700);
          return 100;
        }
        return next;
      });
    }, 70);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#050505' }}
        >
          {/* Name initial */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center flex items-center justify-center tracking-tight"
          >
            {"sharmaasahill".split("").map((char, index) => (
              <motion.span
                key={index}
                className="font-heading font-bold"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  background: 'linear-gradient(135deg, #fff 0%, var(--accent) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block'
                }}
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -8, 0] }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: index * 0.08
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-40"
          >
            <div className="h-px bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-150 ease-out"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: 'linear-gradient(90deg, #00eaff, #8b5cf6)',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
