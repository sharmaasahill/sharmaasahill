import { useRef, useCallback, useState, useEffect } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { gsap } from '../lib/gsap';
import { projects } from '../data/portfolioData';
import useMediaQuery from '../hooks/useMediaQuery';

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const isMobile = useMediaQuery('(max-width: 768px)');

  const onMove = useCallback((e) => {
    if (isMobile) return;
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top)  / r.height;
    setTilt({ x: (y - 0.5) * -12, y: (x - 0.5) * 12 });
    setGlow({ x: x * 100, y: y * 100 });
  }, [isMobile]);

  const onEnter = useCallback(() => {
    if (isMobile) return;
    gsap.to(cardRef.current, {
      y: -6,
      boxShadow: '0 20px 55px rgba(0,0,0,0.55), 0 0 28px rgba(0,234,255,0.07)',
      duration: 0.35,
      ease: 'power2.out',
    });
  }, [isMobile]);

  const onLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: '0 0px 0px rgba(0,0,0,0)',
      duration: 0.45,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`project-card-item relative flex flex-col rounded-2xl overflow-hidden group ${project.title.includes('View All') ? 'cursor-pointer' : ''}`}
      onClick={(e) => {
        if (e.target.closest('a')) return;
        if (project.title.includes('View All')) {
          window.open('https://github.com/sharmaasahill?tab=repositories', '_blank');
        }
      }}
      onMouseMove={onMove}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,234,255,0.2)'; onEnter(); }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--glass-border)'; onLeave(); }}
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'border-color 0.3s ease',
        willChange: 'transform',
      }}
    >
      {/* Mouse-tracked cyan glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(0,234,255,0.07) 0%, transparent 55%)` }} />

      <div className="relative flex flex-col flex-1 p-7"
        style={{ backdropFilter: 'blur(14px)' }}>
        <span className="mono text-xs block mb-5" style={{ color: 'var(--text4)' }}>
          {String(index + 1).padStart(2, '00')}
        </span>
        <h3 className="font-heading font-semibold text-base leading-snug mb-3 text-white transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: 'var(--text3)' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
        <div className="flex items-center gap-4 pt-4" style={{ borderTop: '1px solid var(--line)' }}>
          {project.githubUrl && project.githubUrl !== '#' && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs transition-colors duration-200"
              style={{ color: 'var(--text3)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text3)'}>
              <FiGithub size={12} /> Code
            </a>
          )}
          {project.liveUrl && project.liveUrl !== '#' && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs ml-auto transition-colors duration-200"
              style={{ color: 'var(--text3)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text3)'}>
              <FiExternalLink size={12} /> Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pr-heading', {
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.pr-heading', start: 'top 82%' },
      });
      gsap.from('.project-card-item', {
        y: 60, opacity: 0, scale: 0.96, duration: 0.7,
        stagger: { each: 0.1, from: 'start' },
        ease: 'power3.out',
        scrollTrigger: { trigger: '.pr-grid', start: 'top 78%', toggleActions: 'play none none none' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={ref} className="relative">
      <div className="section-container">
        <div className="pr-heading flex items-end justify-between gap-8 mb-16 flex-wrap">
          <div>
            <span className="section-label">Projects</span>
            <h2 className="section-title">Things I've <span className="gradient-text">built</span></h2>
          </div>
          <a href="https://github.com/sharmaasahill?tab=repositories" target="_blank" rel="noopener noreferrer"
            className="btn-ghost" style={{ border: '1px solid var(--glass-border)', borderRadius: 10 }}>
            <FiGithub size={13} /> All repos
          </a>
        </div>

        <div className="pr-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ perspective: '1000px' }}>
          {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
