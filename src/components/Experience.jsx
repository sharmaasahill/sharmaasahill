import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import CareerTrace from './CareerTrace';
import { pad2 } from '../lib/text';
import { experience, site } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="rail">
        <SectionHeading
          id="experience-title"
          index="02"
          label="Production"
          title="Code with real traffic"
          action={
            <a className="text-link is-down" href={site.resume.href} download={site.resume.fileName}>
              {site.resume.label} <FiArrowDown aria-hidden="true" />
            </a>
          }
        />

        <CareerTrace />

        {experience.map((job, i) => (
          <article key={job.id} className="job" data-reveal aria-labelledby={`job-${job.id}`}>
            <div className="job__index" aria-hidden="true">
              {pad2(i + 1)}
            </div>

            <div>
              <div className="job__tags">
                <span className="tag tag--signal">{job.type}</span>
                {job.stack.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
              <h3 id={`job-${job.id}`} className="job__title">
                {job.role}
              </h3>
              <p className="job__company">
                {job.href ? (
                  <a className="text-link" href={job.href} target="_blank" rel="noreferrer">
                    {job.company} <FiArrowUpRight aria-hidden="true" />
                  </a>
                ) : (
                  job.company
                )}
              </p>

              {job.metrics && (
                <dl className="job__metrics">
                  {job.metrics.map((m) => (
                    <div key={m.label}>
                      <dt>{m.label}</dt>
                      <dd>{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <ul className="job__points">
                {job.points.map((point) => (
                  <li key={point.slice(0, 32)}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="job__meta">
              <div className="when">{job.period}</div>
              <div>{job.place}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
