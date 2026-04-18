import { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { services } from '../data/portfolioData';

export default function Services() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sv-heading', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.sv-heading', start: 'top 82%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo('.svc-card', 
        { y: 40, opacity: 0, scale: 0.96 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: { each: 0.09, from: 'start' }, Math: false, ease: 'power3.out', scrollTrigger: { trigger: '.sv-grid', start: 'top 78%', toggleActions: 'play none none none' } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={ref} className="relative">
      <div className="section-container">
        <div className="sv-heading flex items-end justify-between gap-8 mb-16 flex-wrap">
          <div>
            <span className="section-label">Services</span>
            <h2 className="section-title">What I can <span className="gradient-text">do for you</span></h2>
          </div>
          <p className="section-body text-sm max-w-xs" style={{ color: 'var(--text4)' }}>
            End-to-end development from a single feature to a full product.
          </p>
        </div>
        <div className="sv-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc, i) => (
            <div key={svc.title}
              className="svc-card p-7 rounded-2xl glass glass-hover cursor-default"
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(0,234,255,0.15)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}
              style={{ transition: 'all 0.25s ease' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                style={{ background: 'var(--accent-dim)', border: '1px solid rgba(0,234,255,0.15)' }}>
                <svc.icon size={18} style={{ color: 'var(--accent)', opacity: 0.9 }} />
              </div>
              <h3 className="font-heading font-semibold text-sm text-white mb-3">{svc.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text4)' }}>{svc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
