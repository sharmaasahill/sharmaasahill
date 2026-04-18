import { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { skillCategories } from '../data/portfolioData';

const EXTRA = ['Docker','Redis','GraphQL','WebSockets','JWT','OAuth2','REST APIs','NGINX','AWS','Vercel','Supabase','Prisma','Tailwind','Jest','CI/CD','Linux'];

export default function Skills() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sk-heading', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.sk-heading', start: 'top 88%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo('.sk-cat', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.sk-grid', start: 'top 88%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo('.skill-badge', 
        { scale: 0.75, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.5, stagger: { each: 0.04, from: 'random' }, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: '.sk-grid', start: 'top 88%', toggleActions: 'play none none none', onEnter: () => setTimeout(startFloat, 600) }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  function startFloat() {
    document.querySelectorAll('.skill-badge').forEach((el) => {
      gsap.to(el, {
        y: gsap.utils.random(-7, 7),
        duration: gsap.utils.random(1.8, 3.5),
        ease: 'power1.inOut', yoyo: true, repeat: -1,
        delay: gsap.utils.random(0, 2),
      });
    });
  }

  return (
    <section id="skills" ref={ref} className="relative">
      <div className="section-container">
        <div className="sk-heading mb-16">
          <span className="section-label">Tech Stack</span>
          <h2 className="section-title">
            Tools I build <span className="gradient-text">things with</span>
          </h2>
        </div>

        <div className="sk-grid space-y-14">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="sk-cat">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-5 rounded-full" style={{ background: 'var(--accent)', opacity: 0.5 }} />
                <span className="mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>{cat.title}</span>
                <div className="flex-1 h-px" style={{ background: 'var(--line)' }} />
              </div>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="skill-badge"
                    onMouseEnter={(e) => { gsap.killTweensOf(e.currentTarget); gsap.to(e.currentTarget, { y: 0, duration: 0.15 }); }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { y: gsap.utils.random(-7, 7), duration: gsap.utils.random(1.8, 3.2), ease: 'power1.inOut', yoyo: true, repeat: -1 });
                    }}>
                    <skill.icon size={15} style={{ color: skill.color, opacity: 0.85 }} />
                    <span className="font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div className="mt-16 overflow-hidden relative">
          <div className="absolute left-0 inset-y-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #000, transparent)' }} />
          <div className="absolute right-0 inset-y-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #000, transparent)' }} />
          <div className="flex gap-3 animate-marquee" style={{ width: 'max-content' }}>
            {[...EXTRA, ...EXTRA].map((t, i) => (
              <span key={i} className="mono text-xs px-3 py-1.5 rounded-lg shrink-0"
                style={{ color: 'var(--text4)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
