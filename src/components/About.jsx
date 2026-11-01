import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import { pad2, withEmphasis } from '../lib/text';
import { about, links, site } from '../data/portfolioData';

export default function About() {
  const last = about.statement.length - 1;

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="rail">
        <div className="sec-rule" data-reveal>
          <p className="eyebrow">
            <b>01</b> / Context
          </p>
          <span className="cross" aria-hidden="true">
            +
          </span>
        </div>

        <div className="about__grid">
          <h2 id="about-title" className="h2 about__statement" data-lines>
            {about.statement.map((text, i) => (
              <span key={text} className={`line${i === last ? ' muted' : ''}`}>
                <span>{i === last ? withEmphasis(text, about.emphasis) : `${text} `}</span>
              </span>
            ))}
          </h2>

          <div className="about__body">
            {about.paragraphs.map((text) => (
              <p key={text.slice(0, 24)} className="lead" data-reveal>
                {text}
              </p>
            ))}

            <pre className="snippet" data-reveal aria-label="The approach, written as code">
              <code>
                {about.snippet.map((line, i) => (
                  <span key={i} className="snippet__line">
                    {line.map(([kind, text], j) => (
                      <span key={j} className={kind}>
                        {text}
                      </span>
                    ))}
                  </span>
                ))}
              </code>
            </pre>

            <div className="about__links" data-reveal>
              <a className="text-link is-down" href={site.resume.href} download={site.resume.fileName}>
                {site.resume.label} <FiArrowDown aria-hidden="true" />
              </a>
              <a className="text-link" href={links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="rules">
          <p className="eyebrow rules__label" data-reveal>
            {about.principlesLabel}
          </p>
          <ol className="rules__list">
            {about.principles.map((rule, i) => (
              <li key={rule.title} className="rule" data-reveal>
                <span className="rule__index" aria-hidden="true">
                  {pad2(i + 1)}
                </span>
                <h3 className="rule__title">{rule.title}</h3>
                <p className="rule__body">{rule.body}</p>
                <p className="rule__proof">{rule.proof}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="toolkit" data-reveal>
          <p className="eyebrow">{about.toolkitLabel}</p>
          <ul aria-label={about.toolkitLabel}>
            {about.toolkit.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
