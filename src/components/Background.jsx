import { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { DottedSurface } from './ui/dotted-surface';

/**
 * Background — fixed full-screen layer stack:
 *   1. DottedSurface (Three.js animated dots)   z-index: -20
 *   2. Center white glow (spotlight)            z-index: -15
 *   3. Cyan accent orb (top-left)               z-index: -15
 *   4. White orb (bottom-right)                 z-index: -15
 *
 * All content (Navbar, sections) is at z-index 1+.
 */
export default function Background() {
  const centerRef = useRef(null);
  const orb1Ref   = useRef(null);
  const orb2Ref   = useRef(null);

  useEffect(() => {
    if (centerRef.current) {
      gsap.to(centerRef.current, {
        scale: 1.1, opacity: 0.9,
        duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1,
      });
    }
    if (orb1Ref.current) {
      gsap.to(orb1Ref.current, { x: -25, y: 35, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 });
    }
    if (orb2Ref.current) {
      gsap.to(orb2Ref.current, { x: 20, y: -30, duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 });
    }
  }, []);

  return (
    <>
      {/* ── Layer 1: Animated dot field ── */}
      <DottedSurface style={{ zIndex: -20 }} />

      {/* ── Layer 2: Glowing overlays sitting above dots but behind content ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -10, pointerEvents: 'none', overflow: 'hidden' }}>

        {/* Large center white glow — matches reference design */}
        <div
          ref={centerRef}
          style={{
            position: 'absolute',
            top: '28%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900, height: 900,
            borderRadius: '50%',
            background: [
              'radial-gradient(circle at center,',
              '  rgba(255,255,255,0.09) 0%,',
              '  rgba(255,255,255,0.04) 28%,',
              '  rgba(255,255,255,0.01) 55%,',
              '  transparent 70%)',
            ].join(''),
            filter: 'blur(72px)',
            willChange: 'transform, opacity',
          }}
        />

        {/* Cyan orb — top left */}
        <div
          ref={orb1Ref}
          style={{
            position: 'absolute',
            top: '-8%', left: '-4%',
            width: 480, height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,234,255,0.06) 0%, transparent 65%)',
            filter: 'blur(80px)',
            willChange: 'transform',
          }}
        />

        {/* Faint white orb — bottom right */}
        <div
          ref={orb2Ref}
          style={{
            position: 'absolute',
            bottom: '0%', right: '-4%',
            width: 420, height: 420,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)',
            filter: 'blur(70px)',
            willChange: 'transform',
          }}
        />
      </div>
    </>
  );
}
