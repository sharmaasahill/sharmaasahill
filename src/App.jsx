import { Suspense, useEffect } from 'react';
import { pauseOffscreen } from './lib/pauseOffscreen';
import { startReveals } from './lib/reveal';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Credentials from './components/Credentials';
import Contact from './components/Contact';
import Footer from './components/Footer';

/*
 * Nothing here ever suspends. The boundaries split hydration of the prerendered page into
 * one piece per section, so React hydrates the nav and hero first and the rest in separate
 * short tasks instead of one long one (and a click jumps its section to the front).
 */
const Section = ({ children }) => <Suspense fallback={null}>{children}</Suspense>;

export default function App() {
  // Scroll reveals (lib/reveal.js). The hero's entrance is pure CSS, so it starts with the first paint.
  useEffect(() => startReveals(), []);
  // The regions with endless loops: the hero, the top bar, and the footer's wordmark.
  useEffect(() => pauseOffscreen(['#intro', '#topbar', '#site-footer']), []);

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Section>
          <About />
        </Section>
        <Section>
          <Experience />
        </Section>
        <Section>
          <Projects />
        </Section>
        <Section>
          <Credentials />
        </Section>
        <Section>
          <Contact />
        </Section>
      </main>
      <Section>
        <Footer />
      </Section>
    </>
  );
}
