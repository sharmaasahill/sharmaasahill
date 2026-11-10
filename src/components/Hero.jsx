import { FiArrowDown, FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import SystemDiagram from './SystemDiagram';
import useClock from '../hooks/useClock';
import { hero, links, site } from '../data/portfolioData';

/*
 * The entrance and the scroll drift are CSS ("Hero" and "Motion" in index.css), so they
 * start with the first paint of the prerendered page instead of waiting for JavaScript.
 * The portrait is a CSS background so each theme and screen downloads only its own file.
 */
export default function Hero() {
  const time = useClock(site.timeZone);

  return (
    <section id="intro" className="hero" aria-labelledby="hero-title">
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
        <time aria-label={`Local time in ${site.city}`}>{time || '--:--'}</time>&nbsp;IST
      </p>

      <div className="hero__body">
        <div className="hero__stage">
          <div className="hero__figure">
            <div className="hero__portrait" role="img" aria-label="Portrait of Sahil Sharma" />
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
