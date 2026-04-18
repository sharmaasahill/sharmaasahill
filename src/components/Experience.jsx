import { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { experiences } from '../data/portfolioData';

const TYPE_STYLE = {
  'Full-time':            { color: 'var(--accent)', bg: 'var(--accent-dim)' },
  'Internship':           { color: '#fca5a5',       bg: 'rgba(252,165,165,0.08)' },
  'Freelance':            { color: '#6ee7b7',        bg: 'rgba(110,231,183,0.08)' },
  'Training':             { color: 'var(--text3)',   bg: 'rgba(255,255,255,0.05)' },
  'Selected Participant': { color: 'var(--text3)',   bg: 'rgba(255,255,255,0.05)' },
};

export default function Experience() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ex-heading', {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.ex-heading', start: 'top 85%' },
      });
      gsap.from('.ex-item', {
        x: -35, opacity: 0, scale: 0.98, duration: 0.65, stagger: 0.09, ease: 'power2.out',
        scrollTrigger: { trigger: '.ex-list', start: 'top 80%', toggleActions: 'play none none none' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={ref} className="relative">
      <div className="section-container">
        <div className="ex-heading mb-16">
          <span className="section-label">Experience</span>
          <h2 className="section-title">My professional <span className="gradient-text">journey</span></h2>
        </div>
        <div className="ex-list relative">
          <div className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(180deg, transparent, var(--line) 10%, var(--line) 90%, transparent)' }} />
          <div className="space-y-0">
            {experiences.map((exp) => {
              const st = TYPE_STYLE[exp.type] || TYPE_STYLE['Training'];
              return (
                <div key={exp.company + exp.role} className="ex-item relative md:pl-10 pb-12">
                  <div className="hidden md:block absolute left-0 -translate-x-[2px] rounded-full" style={{ width:5, height:5, background: st.color, top:4 }} />
                  <div className="grid md:grid-cols-[180px_1fr] gap-5 md:gap-10">
                    <div className="pt-0.5">
                      <p className="mono text-xs leading-relaxed" style={{ color: 'var(--text3)' }}>{exp.duration}</p>
                      <p className="mono text-xs mt-1" style={{ color: 'var(--text4)' }}>{exp.location.split('·')[0].trim()}</p>
                    </div>
                    <div className="p-5 rounded-xl glass glass-hover transition-all duration-300">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="font-heading font-semibold text-sm text-white">{exp.role}</h3>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--accent)' }}>{exp.company}</p>
                        </div>
                        <span className="mono shrink-0" style={{ fontSize:10, padding:'3px 10px', borderRadius:99, color:st.color, background:st.bg, border:`1px solid ${st.color}22` }}>
                          {exp.type}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed mt-2" style={{ color: 'var(--text3)' }}>{exp.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
