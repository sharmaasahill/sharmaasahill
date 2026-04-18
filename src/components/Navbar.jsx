import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { gsap } from '../lib/gsap';
import { navLinks } from '../data/portfolioData';

export default function Navbar() {
  const [active, setActive] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.nav-bar', 
        { y: -50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.3 }
      );
    });

    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', fn);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="nav-bar"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 999,
          background: 'rgba(0,0,0,0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="hero" smooth duration={600} className="cursor-pointer shrink-0">
            <span className="font-heading font-bold text-white text-sm tracking-wide select-none">
              Sahil Sharma
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                offset={0}
                duration={500}
                spy
                onSetActive={() => setActive(link.to)}
                className="relative px-4 py-2 rounded-lg text-sm font-medium cursor-pointer select-none transition-colors duration-200"
                style={{ color: active === link.to ? '#fff' : 'var(--text2)' }}
              >
                {active === link.to && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.07)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="mailto:i.sahilkrsharma@gmail.com" className="hidden md:inline-flex btn-primary text-xs py-2 px-4">
              Hire Me
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-white"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              aria-label="Toggle menu">
              {menuOpen ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div key="mob" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position:'fixed', inset:0, zIndex:998, background:'rgba(0,0,0,0.96)', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <nav className="flex flex-col items-center gap-2 w-full max-w-xs">
              {navLinks.map((l, i) => (
                <motion.div key={l.to} className="w-full" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.05 }}>
                  <Link to={l.to} smooth offset={0} duration={500} onClick={() => setMenuOpen(false)}
                    className="block w-full text-center py-4 font-heading text-2xl font-semibold cursor-pointer"
                    style={{ color:'var(--text4)', transition:'color 0.2s ease' }}
                    onMouseEnter={e=>{e.currentTarget.style.color='#fff';}}
                    onMouseLeave={e=>{e.currentTarget.style.color='var(--text4)';}}>
                    {l.name}
                  </Link>
                </motion.div>
              ))}
              <motion.a href="mailto:i.sahilkrsharma@gmail.com" onClick={() => setMenuOpen(false)}
                className="btn-primary mt-8 w-64 justify-center"
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: navLinks.length*0.05+0.05 }}>
                Hire Me
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
