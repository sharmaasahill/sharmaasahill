import { useRef, useState, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { aboutData } from '../data/portfolioData';

function Counter({ value, label }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const ran = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran.current) {
        ran.current = true;
        const num = parseInt(value) || 0;
        let cur = 0; const step = Math.ceil(num / 40);
        const t = setInterval(() => { cur = Math.min(cur + step, num); setCount(cur); if (cur >= num) clearInterval(t); }, 28);
      }
    }, { threshold: 0.7 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return (
    <div ref={ref}>
      <p className="font-heading font-bold text-white" style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', letterSpacing:'-0.03em' }}>
        {count}<span style={{ color: 'var(--accent)' }}>+</span>
      </p>
      <p className="mono text-xs tracking-widest uppercase mt-1" style={{ color: 'var(--text4)' }}>{label}</p>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ab-heading', {
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-heading', start: 'top 82%' },
      });
      gsap.from('.ab-image', {
        x: -50, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.ab-image', start: 'top 80%' },
      });
      gsap.from('.ab-text', {
        y: 35, opacity: 0, duration: 0.7, stagger: 0.13, ease: 'power2.out',
        scrollTrigger: { trigger: '.ab-text-group', start: 'top 78%' },
      });
      gsap.from('.ab-kv', {
        y: 20, opacity: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.ab-kv-list', start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="relative">
      <div className="section-container">
        <div className="ab-heading mb-16">
          <span className="section-label">About Me</span>
          <h2 className="section-title">
            Focused on <span className="gradient-text">real outcomes</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          {/* Left */}
          <div className="flex flex-col justify-between h-full">
            <div className="ab-image relative w-fit mb-12 lg:mb-0">
              <div className="w-56 h-64 sm:w-64 sm:h-72 rounded-2xl overflow-hidden"
                style={{ border: '1px solid var(--glass-border)' }}>
                <img src="/Profile-Sahil.jpeg" alt="Sahil Sharma" loading="lazy"
                  className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl -z-10"
                style={{ border: '1px solid rgba(0,234,255,0.12)' }} />
              <div className="absolute -bottom-5 left-4 glass rounded-xl px-3 py-2 flex items-center gap-2">
                <span className="status-dot" />
                <span className="mono text-xs" style={{ color: 'var(--text4)' }}>Open to work</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-4">
              {aboutData.highlights.map((h) => (
                <Counter key={h.label} value={h.value.replace(/\D/g,'')||'1'} label={h.label} />
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="ab-text-group flex flex-col justify-between h-full pt-2">
            <div className="space-y-4 mb-8">
              {aboutData.paragraphs.map((text, i) => (
                <p key={i} className="ab-text section-body text-[15px] leading-[1.8]">{text}</p>
              ))}
            </div>
            
            <div className="w-full">
              <div className="ab-text h-px mb-6" style={{ background: 'var(--line)' }} />
            <ul className="ab-kv-list space-y-4">
              {[
                { label: 'Currently',   value: 'Tata Consultancy Services' },
                { label: 'Experience',  value: 'India · Europe · Africa' },
                { label: 'Recognition', value: 'Amazon ML Summer School 2024' },
                { label: 'Education',   value: 'B.Tech CSE · ITER, SOA University' },
              ].map((item) => (
                <li key={item.label} className="ab-kv flex items-baseline gap-4 text-sm">
                  <span className="mono shrink-0 text-xs tracking-wider" style={{ color: 'var(--text4)', width: 86 }}>{item.label}</span>
                  <span style={{ color: 'var(--text2)' }}>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
