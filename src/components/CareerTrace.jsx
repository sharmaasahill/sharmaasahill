import { useMemo } from 'react';
import useMonth from '../hooks/useMonth';
import { trace } from '../data/portfolioData';

/*
 * The career drawn like a distributed trace: one row per span on a shared time axis,
 * so overlaps and gaps are visible at a glance. Months are inclusive.
 * The bars grow when the figure is revealed (`data-in`, see lib/reveal.js and index.css).
 */

const toIndex = (ym) => {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
};
const START = toIndex(trace.start);

const KIND_LABEL = { work: 'work', train: 'training', edu: 'study' };
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function duration(months) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (!y) return `${m} mo`;
  return m ? `${y} yr ${m} mo` : `${y} yr`;
}

const fmt = (index) => `${MONTHS[index % 12]} ${Math.floor(index / 12)}`;

// Positions as percentages of the axis, from the first span to `end` (the current month).
function layout(end) {
  const total = end - START + 1;
  const spans = trace.spans.map((s) => {
    const from = toIndex(s.from);
    const to = s.to ? toIndex(s.to) : end;
    const months = to - from + 1;
    return {
      ...s,
      live: !s.to,
      left: ((from - START) / total) * 100,
      width: Math.max((months / total) * 100, 1.4),
      months,
      range: `${fmt(from)} – ${s.to ? fmt(to) : 'now'}`,
    };
  });

  // January of each year inside the window.
  const years = [];
  for (let i = START; i <= end; i += 1) {
    if (i % 12 === 0) years.push({ year: i / 12, left: ((i - START) / total) * 100 });
  }
  return { spans, years };
}

export default function CareerTrace() {
  const month = useMonth();
  const { spans, years } = useMemo(() => layout(month), [month]);

  return (
    <figure className="trace" data-reveal>
      <figcaption className="trace__head">
        <span className="eyebrow">{trace.id}</span>
        <span className="trace__legend" aria-hidden="true">
          {Object.entries(KIND_LABEL).map(([kind, label]) => (
            <span key={kind} className={`trace__key trace__key--${kind}`}>
              {label}
            </span>
          ))}
        </span>
      </figcaption>

      <div className="trace__axis" aria-hidden="true">
        {years.map((y) => (
          <span key={y.year} style={{ left: `${y.left}%` }}>
            {y.year}
          </span>
        ))}
        <span className="trace__now" style={{ left: '100%' }}>
          now
        </span>
      </div>

      <ol className="trace__rows">
        {spans.map((s, i) => (
          <li key={s.label} className={`trace__row trace__row--${s.kind}`}>
            <span className="trace__label">
              {s.label}
              <span className="trace__when">
                <span className="sr-only">{KIND_LABEL[s.kind]}, </span>
                {s.range} · {duration(s.months)}
              </span>
            </span>
            <span className="trace__lane" aria-hidden="true">
              {years.map((y) => (
                <i key={y.year} className="trace__grid" style={{ left: `${y.left}%` }} />
              ))}
              <span
                className={`trace__bar${s.live ? ' is-live' : ''}`}
                style={{ left: `${s.left}%`, width: `${s.width}%`, transitionDelay: `${120 + i * 90}ms` }}
              />
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
