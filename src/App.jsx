import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, ScrollTrigger } from './lib/gsap';

import Loader       from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Background   from './components/Background';
import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import About        from './components/About';
import Skills       from './components/Skills';
import Projects     from './components/Projects';
import Experience   from './components/Experience';
import Services     from './components/Services';
import Contact      from './components/Contact';
import Footer       from './components/Footer';

if (typeof window !== 'undefined') history.scrollRestoration = 'manual';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = () => {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    requestAnimationFrame(() => { window.scrollTo(0, 0); setLoaded(true); });
  };

  useEffect(() => {
    if (!loaded) return;
    
    // Fade in the app contents
    gsap.to('.app-main-wrapper', { opacity: 1, duration: 0.6, ease: 'power2.out' });

    let lenis;
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothTouch: false,
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }).catch(() => {});

    return () => {
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [loaded]);

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {!loaded && <Loader key="loader" onComplete={handleLoaded} />}
      </AnimatePresence>

      {loaded && (
        <div className="app-main-wrapper" style={{ position: 'relative', minHeight: '100vh', opacity: 0 }}>
          {/* Fixed background layers (dots + orbs) — lowest z-index */}
          <Background />

          {/* Navbar — always on top */}
          <Navbar />

          {/* Page content — above all background effects */}
          <main style={{ position: 'relative', zIndex: 1 }}>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Services />
            <Contact />
          </main>

          <Footer style={{ position: 'relative', zIndex: 1 }} />
        </div>
      )}
    </>
  );
}
