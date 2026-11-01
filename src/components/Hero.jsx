import { useLayoutEffect, useRef } from 'react';
import { FiArrowDown, FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { gsap } from '../lib/gsap';
import SystemDiagram from './SystemDiagram';
import useClock from '../hooks/useClock';
import { hero, links, site } from '../data/portfolioData';

export default function Hero() {
  const root = useRef(null);
  const time = useClock(site.timeZone);

  useLayoutEffect(() => {
    if (!document.documentElement.classList.contains('motion-ok')) return undefined;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero__frame', { opacity: 0, duration: 1.6, ease: 'power2.out' }, 0)
        .from('.hero__diagram', { opacity: 0, duration: 2.2, ease: 'power1.out' }, 0.2)
        .from('.hero__portrait', { opacity: 0, y: 36, duration: 1.5 }, 0.1)
        .from('.hero__name .line > span', { yPercent: 106, duration: 1.3, ease: 'power4.out', stagger: 0.12 }, 0.35)
        .from(['.hero__eyebrow', '.hero__intro', '.hero__actions'], { opacity: 0, y: 14, duration: 0.9, stagger: 0.1 }, 0.8)
        .from(['.hero__caption', '.hero__aside', '.hero__scroll'], { opacity: 0, duration: 1, stagger: 0.06 }, 1.05);

      // A little depth as the hero scrolls away: portrait drifts slower than the type.
      const away = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.hero__portrait', { yPercent: 9, ease: 'none', scrollTrigger: away });
      gsap.to('.hero__text', { y: -60, ease: 'none', scrollTrigger: { ...away } });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="intro" ref={root} className="hero" aria-labelledby="hero-title">
      <SystemDiagram className="hero__diagram" />

      <div className="hero__frame" aria-hidden="true">
        <span className="hero__corner hero__corner--tl" />
        <span className="hero__corner hero__corner--tr" />
        <span className="hero__corner hero__corner--bl" />
        <span className="hero__corner hero__corner--br" />
      </div>

      <p className="hero__caption hero__caption--left eyebrow">
        <span className="status-dot" aria-hidden="true" />
        <span className="long">{hero.status}</span>
        <span className="short">{hero.statusShort}</span>
      </p>
      <p className="hero__caption hero__caption--right eyebrow">
        <span className="long">{site.city} · </span>
        <time aria-label={`Local time in ${site.city}`}>{time}</time>&nbsp;IST
      </p>

      <div className="hero__body">
        <div className="hero__stage">
          <div className="hero__figure">
            <img
              className="hero__portrait"
              src="/images/portfolio-photo.webp"
              width="1122"
              height="1402"
              alt="Portrait of Sahil Sharma"
              fetchPriority="high"
              draggable="false"
            />
          </div>

          <div className="hero__text">
            <p className="hero__eyebrow eyebrow">{hero.eyebrow}</p>
            <h1 id="hero-title" className="hero__name">
              <span className="line">
                <span>{hero.firstName} </span>
              </span>
              <span className="line">
                <span>
                  {hero.lastName}
                  <span className="dot">.</span>
                </span>
              </span>
            </h1>
            <p className="hero__intro">
              {hero.intro[0]} <br className="br-desktop" />
              {hero.intro[1]}
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#projects">
                {hero.primary} <FiArrowUpRight aria-hidden="true" />
              </a>
              <a className="btn btn--ghost btn--down btn--file" href={site.resume.href} download={site.resume.fileName}>
                {site.resume.label} <FiArrowDown aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__aside hero__aside--left">
        <p className="eyebrow">{hero.endpointsLabel}</p>
        <a href={links.github} target="_blank" rel="noreferrer">
          <FiGithub aria-hidden="true" /> GitHub <FiArrowUpRight aria-hidden="true" />
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer">
          <FiLinkedin aria-hidden="true" /> LinkedIn <FiArrowUpRight aria-hidden="true" />
        </a>
        <a href={`mailto:${links.email}`}>
          <FiMail aria-hidden="true" /> Email <FiArrowUpRight aria-hidden="true" />
        </a>
      </div>

      <div className="hero__aside hero__aside--right">
        <p className="eyebrow">
          <span className="status-dot" aria-hidden="true" /> {hero.runningLabel}
        </p>
        {hero.running.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>

      <a href="#about" className="hero__scroll eyebrow">
        {hero.scroll} <FiArrowDown aria-hidden="true" />
      </a>
    </section>
  );
}
