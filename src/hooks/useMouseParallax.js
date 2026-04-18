import { useState, useEffect, useRef } from 'react';

/**
 * Returns { x, y } normalized mouse parallax values in [-1, 1] range.
 * @param {number} strength - multiplier for the parallax effect (default 0.04)
 */
export default function useMouseParallax(strength = 0.04) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2 * strength,
        y: (e.clientY / window.innerHeight - 0.5) * 2 * strength,
      };
    };

    // Smooth lerp loop
    const lerp = (a, b, t) => a + (b - a) * t;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX = lerp(currentX, targetRef.current.x, 0.08);
      currentY = lerp(currentY, targetRef.current.y, 0.08);
      setOffset({ x: currentX, y: currentY });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [strength]);

  return offset;
}
