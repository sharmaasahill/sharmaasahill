import { useRef, useState } from 'react';
import { FiArrowUpRight, FiClock } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import FlowScene from './scenes/FlowScene';
import LensScene from './scenes/LensScene';
import FaceScene from './scenes/FaceScene';
import CalendarScene from './scenes/CalendarScene';
import BoardScene from './scenes/BoardScene';
import useInView from '../hooks/useInView';
import useMediaQuery from '../hooks/useMediaQuery';
import useStepper from '../hooks/useStepper';
import { pad2 } from '../lib/text';
import { archive, builds, links } from '../data/portfolioData';

const SCENES = {
  flowmancer: FlowScene,
  skilllens: LensScene,
  attendance: FaceScene,
  meetsync: CalendarScene,
  pulse: BoardScene,
};
const INTERVAL = 3800; // ms per step while a build is on screen

function BuildCase({ build, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, '-18% 0px');
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const compact = useMediaQuery('(max-width: 640px)');
  const [reading, setReading] = useState(false); // pointer over the step list
  const running = inView && !reduced && !reading;
  const { step, held, select, release } = useStepper(build.steps.length, { interval: INTERVAL, running });

  const Scene = SCENES[build.slug];
  const current = build.steps[step];
  const titleId = `build-${build.slug}`;

  // Leaving the case with pointer or focus hands control back to the autoplay.
  const onBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) release();
  };

  return (
    <article
      ref={ref}
      className={`build${index % 2 ? ' build--flip' : ''}${inView ? ' is-visible' : ''}`}
      aria-labelledby={titleId}
      onPointerLeave={release}
      onBlur={onBlur}
    >
      <div className="build__stage" data-reveal>
        <div className="build__screen">
          <div className="build__chrome" aria-hidden="true">
            <span className="build__window">{build.window}</span>
            <span className="build__state">
              <i />
              sample run · {pad2(step + 1)}/{pad2(build.steps.length)} · {current.title.toLowerCase()}
            </span>
          </div>
          <div className="build__canvas">
            <svg className="scene" viewBox="0 0 640 400" aria-hidden="true" focusable="false">
              <Scene step={step} compact={compact} />
            </svg>
          </div>
          <p className="build__log" aria-hidden="true">
            <span key={step}>{current.log}</span>
          </p>
        </div>
      </div>

      <div className="build__info">
        <p className="build__kicker" data-reveal>
          <b>{build.code}</b> · {build.kind}
        </p>
        <h3 id={titleId} className="build__name" data-reveal>
          {build.name}
        </h3>
        <p className="build__hook" data-reveal>
          {build.hook}
        </p>
        <p className="build__summary" data-reveal>
          {build.summary}
        </p>

        <ol
          className="build__steps"
          aria-label={`How ${build.name} works, step by step`}
          onPointerEnter={() => setReading(true)}
          onPointerLeave={() => setReading(false)}
          data-reveal
        >
          {build.steps.map((s, i) => (
            <li key={s.title} className={`step${i === step ? ' is-active' : ''}`} onClick={() => select(i)}>
              <button type="button" className="step__head" aria-current={i === step ? 'step' : undefined}>
                <span className="step__n">{pad2(i + 1)}</span>
                {s.title}
              </button>
              <p className="step__body">{s.body}</p>
              {i === step && !held && !reduced && (
                <span
                  key={`${step}-${running}`}
                  className={`step__timer${running ? '' : ' is-paused'}`}
                  style={{ animationDuration: `${INTERVAL}ms` }}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>

        <dl className="build__proof" data-reveal>
          {build.proof.map((p) => (
            <div key={p.label}>
              <dt>{p.label}</dt>
              <dd>{p.value}</dd>
            </div>
          ))}
        </dl>
        <p className="build__note" data-reveal>
          {build.note}
        </p>

        <div className="build__stack" aria-label="Built with" data-reveal>
          {build.stack.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="build__links" data-reveal>
          {build.live && (
            <a className="btn btn--primary btn--sm" href={build.live} target="_blank" rel="noreferrer">
              Open live<span className="sr-only"> demo of {build.name}</span> <FiArrowUpRight aria-hidden="true" />
            </a>
          )}
          <a className="btn btn--ghost btn--sm" href={build.repo} target="_blank" rel="noreferrer">
            Source<span className="sr-only"> code for {build.name}</span> <FiArrowUpRight aria-hidden="true" />
          </a>
          {build.extra && (
            <a className="text-link" href={build.extra.href} target="_blank" rel="noreferrer">
              {build.extra.label}
              <span className="sr-only"> for {build.name}</span> <FiArrowUpRight aria-hidden="true" />
            </a>
          )}
          <span className="build__host">
            {build.wakes && <FiClock aria-hidden="true" />}
            {build.hosting}
            {build.wakes && ' · free tier, first load can take a minute'}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="rail">
        <SectionHeading
          id="projects-title"
          index="03"
          label="Builds"
          title="After hours, same standards"
          action={
            <a className="text-link" href={links.githubRepos} target="_blank" rel="noreferrer">
              Every repository <FiArrowUpRight aria-hidden="true" />
            </a>
          }
        />
        <p className="builds__intro" data-reveal>
          Five case files. Each screen replays a sample run of the real pipeline, with the thresholds, routes and
          numbers taken from the code. Click a step to hold it.
        </p>

        <div className="builds">
          {builds.map((build, i) => (
            <BuildCase key={build.slug} build={build} index={i} />
          ))}
        </div>

        <div className="more">
          <div className="more__label" data-reveal>
            <p className="eyebrow">More from the workbench</p>
          </div>
          <ul className="more__list">
            {archive.map((item) => (
              <li key={item.name} data-reveal>
                <a className="more__row" href={item.href} target="_blank" rel="noreferrer">
                  <span className="more__name">{item.name}</span>
                  <span className="more__desc">{item.description}</span>
                  <span className="more__stack">{item.stack}</span>
                  <span className="more__kind">
                    {item.kind} <FiArrowUpRight aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
