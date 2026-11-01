import { useEffect } from 'react';
import { gsap, ScrollTrigger } from './lib/gsap';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Credentials from './components/Credentials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  // Scroll reveals. Start states live in CSS under .motion-ok (set in index.html),
  // so nothing is hidden for visitors who prefer reduced motion.
  useEffect(() => {
    if (!document.documentElement.classList.contains('motion-ok')) return undefined;

    const ctx = gsap.context(() => {
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 92%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out', stagger: 0.07, overwrite: true }),
      });

      gsap.utils.toArray('[data-lines]').forEach((heading) => {
        gsap.to(heading.querySelectorAll('.line > span'), {
          y: 0,
          duration: 1.15,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: { trigger: heading, start: 'top 90%', once: true },
        });
      });
    });

    // Fonts and images change layout after first paint; re-measure trigger points.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
