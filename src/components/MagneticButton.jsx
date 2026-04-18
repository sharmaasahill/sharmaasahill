import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useMediaQuery from '../hooks/useMediaQuery';

export default function MagneticButton({ children, className = '', strength = 0.25 }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isMobile = useMediaQuery('(max-width: 768px)');

  const onMove = (e) => {
    if (isMobile) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({
      x: (e.clientX - r.left - r.width / 2) * strength,
      y: (e.clientY - r.top  - r.height / 2) * strength,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 18, mass: 0.4 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
