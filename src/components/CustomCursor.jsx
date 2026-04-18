import { useRef, useState, useEffect } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const ringRef  = useRef(null);
  const dotRef   = useRef(null);
  const pos      = useRef({ x: 0, y: 0 });
  const smooth   = useRef({ x: 0, y: 0 });
  const rafRef   = useRef(null);
  const [visible,  setVisible]  = useState(false);
  const [hovered,  setHovered]  = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const animate = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.1;
      if (ringRef.current) {
        const size = hovered ? 40 : clicking ? 18 : 28;
        ringRef.current.style.transform = `translate(${smooth.current.x - size / 2}px, ${smooth.current.y - size / 2}px)`;
        ringRef.current.style.width  = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) setHovered(true);
    };
    const onOut  = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) setHovered(false);
    };
    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    window.addEventListener('mousemove',  onMove,  { passive: true });
    window.addEventListener('mouseover',  onOver);
    window.addEventListener('mouseout',   onOut);
    window.addEventListener('mousedown',  onDown);
    window.addEventListener('mouseup',    onUp);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseover',  onOver);
      window.removeEventListener('mouseout',   onOut);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mouseup',    onUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, visible, hovered, clicking]);

  if (isMobile || !visible) return null;

  return (
    <>
      {/* Outer ring — lags, transitions size */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full will-change-transform"
        style={{
          border: `1px solid ${hovered ? 'rgba(0,234,255,0.7)' : 'rgba(255,255,255,0.3)'}`,
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
        }}
      />
      {/* Center dot — exact position */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9998] will-change-transform"
        style={{ background: hovered ? '#00eaff' : 'rgba(255,255,255,0.8)', transition: 'background 0.2s ease' }}
      />
    </>
  );
}
