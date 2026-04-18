import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import { gsap } from '../lib/gsap';
import MagneticButton from './MagneticButton';
import useMouseParallax from '../hooks/useMouseParallax';
import useMediaQuery from '../hooks/useMediaQuery';
import { heroData, contactInfo } from '../data/portfolioData';

const ROLES = ['Product Engineer', 'Systems Engineer', 'Problem Solver'];

export default function Hero() {
  const ref = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const parallax = useMouseParallax(isMobile ? 0 : 0.012);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.h-badge',   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.2)
        .fromTo('.h-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.4)
        .fromTo('.h-name',    { y: 60, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 1.0 }, 0.55)
        .fromTo('.h-role',    { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.9)
        .fromTo('.h-tagline', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.05)
        .fromTo('.h-actions', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 1.2)
        .fromTo('.h-socials', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 1.35)
        .fromTo('.h-scroll',  { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.7);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="section-container w-full">
        {/* Parallax wrapper — very subtle depth shift */}
        <div
          className="max-w-3xl"
          style={{
            transform: `translate(${parallax.x * 18}px, ${parallax.y * 12}px)`,
            transition: 'transform 0.1s linear',
            willChange: 'transform',
          }}
        >
          {/* Status */}
          <div className="h-badge flex items-center gap-2.5 mb-10">
            <span className="status-dot" />
            <span className="mono text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--text3)' }}>
              Available for work
            </span>
          </div>

          <div className="h-eyebrow mono text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--accent)' }}>
            {heroData.greeting}
          </div>

          {/* Name — with a very soft glow behind for depth */}
          <div className="relative">
            {/* Glow behind name */}
            <div
              aria-hidden
              className="absolute -inset-8 -z-10 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(0,234,255,0.06) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
            <h1
              className="h-name font-heading font-bold text-white"
              style={{
                fontSize: 'clamp(2.8rem, 10vw, 7.5rem)',
                letterSpacing: '-0.04em',
                lineHeight: 1.0,
                marginBottom: '1.5rem',
                willChange: 'transform',
              }}
            >
              {heroData.name}
            </h1>
          </div>

          {/* Rotating Role Tiles */}
          <div className="h-role flex items-center gap-3 mb-8 overflow-hidden" style={{ minWidth: '22ch', height: '42px' }}>
            <div style={{ width: 28, height: 1, background: 'var(--accent)', opacity: 0.45, flexShrink: 0 }} />
            <div className="font-heading font-medium text-xl md:text-2xl flex items-center" style={{ color: 'var(--text2)' }}>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="inline-block whitespace-nowrap"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="inline-block w-0.5 h-6 ml-2 align-middle animate-blink" style={{ background: 'var(--accent)', flexShrink: 0 }} />
            </div>
          </div>

          <p className="h-tagline section-body mb-12 max-w-lg" style={{ color: '#d1d5db' }}>{heroData.tagline}</p>

          <div className="h-actions flex flex-wrap items-center gap-4 mb-14">
            <MagneticButton>
              <Link to="projects" smooth offset={0} duration={600} className="btn-primary cursor-pointer">
                See My Work <FiArrowRight size={14} />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a href={heroData.resumeUrl} download className="btn-outline">
                <FiDownload size={14} /> Resume
              </a>
            </MagneticButton>
          </div>

          <div className="h-socials flex items-center gap-5">
            {contactInfo.socials.slice(0, 4).map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                className="transition-all duration-200 hover:scale-110"
                style={{ color: 'var(--text3)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text3)'}>
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="h-scroll absolute bottom-10 left-1/2 -translate-x-1/2">
        <Link to="about" smooth offset={0} duration={600} className="cursor-pointer flex flex-col items-center gap-2">
          <span className="mono text-[10px] tracking-[0.25em] uppercase" style={{ color: 'var(--text5)' }}>scroll</span>
          <div className="w-4 h-7 rounded-full border flex justify-center pt-1.5" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="w-0.5 h-2 rounded-full" style={{ background: 'var(--accent)', animation: 'bob 1.8s ease-in-out infinite' }} />
          </div>
        </Link>
      </div>
    </section>
  );
}
