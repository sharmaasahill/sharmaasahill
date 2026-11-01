import { Camera, Chip, Panel, Text } from './kit';
import { C, SANS, show } from './tokens';

/*
 * SkillLens, one résumé through the pipeline.
 * Real details: pypdf, the 870-skill taxonomy and its aliases (k8s, postgres), the seven
 * ATS parts and their points, Ridge plus boosted quantiles, 22.5% error on unseen companies,
 * PII removed before Gemini, and rewrites with invented numbers thrown away.
 * The résumé, scores and percentile are a sample.
 */

const FOCUS = [
  [12, 16, 336],
  [118, 16, 336],
  [128, 190, 336],
  [296, 16, 336],
  [296, 190, 336],
];

// Résumé page: [y, width] for each text line, grouped under section labels.
const PAGE = [
  { label: 'EXPERIENCE', y: 92, lines: [128, 136, 104, 132, 92, 124, 116] },
  { label: 'PROJECTS', y: 186, lines: [130, 112, 136, 98, 120] },
  { label: 'SKILLS', y: 262, lines: [134, 118, 128] },
  { label: 'EDUCATION', y: 320, lines: [122, 90] },
];
// Line segments that light up as matched skills: [section, line, x offset, width].
const HITS = [
  [0, 0, 64, 34],
  [0, 3, 18, 40],
  [1, 0, 70, 30],
  [1, 2, 36, 44],
  [2, 0, 0, 48],
  [2, 0, 58, 40],
  [2, 1, 22, 52],
  [2, 2, 64, 46],
];

const SKILLS = [
  { x: 228, y: 58, w: 58, label: 'Python' },
  { x: 292, y: 58, w: 62, label: 'FastAPI' },
  { x: 360, y: 58, w: 40, label: 'SQL' },
  { x: 228, y: 86, w: 84, label: 'AWS Lambda' },
  { x: 318, y: 86, w: 54, label: 'Docker' },
  { x: 228, y: 114, w: 56, label: 'React' },
  { x: 290, y: 114, w: 110, label: 'k8s → Kubernetes', alias: true },
  { x: 228, y: 142, w: 172, label: 'postgres → PostgreSQL', alias: true },
];

// The seven ATS parts: [name, points, max]. 82 in total.
const ATS = [
  ['contact', 10, 10],
  ['sections', 18, 20],
  ['skills', 17, 20],
  ['impact', 9, 15],
  ['verbs', 12, 15],
  ['length', 8, 10],
  ['format', 8, 10],
];

// Salary histogram, ₹3L to ₹40L+. The offer falls in bar 9.
const BARS = [7, 15, 29, 48, 66, 78, 75, 65, 53, 43, 33, 26, 19, 13, 9, 5];
const OFFER = 9;
const BASE = 150; // histogram baseline

export default function LensScene({ step, compact }) {
  const grow = (on, delay) => ({ transform: on ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: on ? `${delay}ms` : '0ms' });
  const rise = (on, delay) => ({ transform: on ? 'scaleY(1)' : 'scaleY(0.04)', transitionDelay: on ? `${delay}ms` : '0ms' });

  return (
    <Camera step={step} focus={FOCUS} compact={compact}>
      {/* The résumé page */}
      <rect x="24" y="24" width="172" height="352" rx="5" fill="#0f1622" stroke={step === 0 ? C.signalLine : C.line} className="sc" />
      <rect x="40" y="44" width="92" height="8" rx="2" className="sc" style={{ fill: step === 4 ? C.faint : 'rgba(232,234,237,0.75)' }} />
      <rect x="40" y="58" width="132" height="4" rx="2" className="sc" style={{ fill: step === 4 ? C.faint : 'rgba(173,186,205,0.35)' }} />
      <g className="sc" style={show(step === 4)}>
        <rect x="36" y="40" width="148" height="26" rx="3" fill="#06090f" opacity="0.92" />
        <text x="110" y="57" textAnchor="middle" fill={C.amber} fontFamily="'IBM Plex Mono', monospace" fontSize="9">
          name · phone · email removed
        </text>
      </g>
      {PAGE.map((section) => (
        <g key={section.label}>
          <Text x={40} y={section.y} size={7.5} color={C.faint} letterSpacing="1.2">
            {section.label}
          </Text>
          {section.lines.map((w, l) => (
            <rect key={l} x="40" y={section.y + 8 + l * 9} width={w} height="3.5" rx="1.75" fill="rgba(173,186,205,0.2)" />
          ))}
        </g>
      ))}
      {HITS.map(([s, l, dx, w], i) => (
        <rect
          key={i}
          x={40 + dx}
          y={PAGE[s].y + 7.5 + l * 9}
          width={w}
          height="4.5"
          rx="2"
          fill={C.signal}
          className="sc"
          style={{ ...show(step >= 1), transitionDelay: step >= 1 ? `${120 + i * 70}ms` : '0ms' }}
        />
      ))}
      {step === 0 && (
        <g key="scan" className="ln-scan">
          <rect x="28" y="30" width="164" height="16" fill="url(#ln-scan-glow)" />
          <rect x="28" y="45" width="164" height="1.2" fill={C.signal} />
        </g>
      )}
      <defs>
        <linearGradient id="ln-scan-glow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={C.signal} stopOpacity="0" />
          <stop offset="1" stopColor={C.signal} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <Chip x={40} y={348} w={112} h={18} size={9} label="pypdf · 612 words" tone={step === 0 ? 'signal' : 'plain'} />

      {/* Skills */}
      <Panel x={214} y={24} w={200} h={170} title="taxonomy · 870 skills" hot={step === 1} style={show(step >= 1, 0.35)} />
      {SKILLS.map((s, i) => (
        <Chip
          key={s.label}
          x={s.x}
          y={s.y}
          w={s.w}
          h={22}
          size={10}
          label={s.label}
          tone={s.alias ? 'amber' : 'signal'}
          className="sc sc-lift"
          style={{ ...show(step >= 1), transform: step >= 1 ? 'none' : 'translateY(6px)', transitionDelay: step >= 1 ? `${200 + i * 90}ms` : '0ms' }}
        />
      ))}
      <Text x={228} y={182} size={9.5} color={C.faint} className="sc" style={show(step >= 1, 0.35)}>
        23 matched · 2 aliases
      </Text>

      {/* ATS score */}
      <Panel x={214} y={210} w={200} h={166} title="ATS score · no AI" hot={step === 2} style={show(step >= 2, 0.35)} />
      <text x="400" y="232" textAnchor="end" fill={C.text} fontFamily={SANS} fontSize="14" fontWeight="700" className="sc" style={show(step >= 2, 0.2)}>
        82/100
      </text>
      {ATS.map(([name, pts, max], i) => {
        const y = 252 + i * 16;
        return (
          <g key={name} className="sc" style={show(step >= 2, 0.35)}>
            <Text x={228} y={y} size={9.5}>
              {name}
            </Text>
            <rect x="290" y={y - 6} width={(80 * max) / 20} height="5" rx="2.5" fill={C.lineSoft} />
            <rect
              x="290"
              y={y - 6}
              width={(80 * pts) / 20}
              height="5"
              rx="2.5"
              fill={pts === max ? C.signal : C.amber}
              className="sc sc-grow"
              style={grow(step >= 2, 150 + i * 80)}
            />
            <Text x={400} y={y} size={9.5} anchor="end" color={C.text}>
              {pts}/{max}
            </Text>
          </g>
        );
      })}
      <Text x={228} y={366} size={9} color={C.amber} className="sc" style={show(step >= 2)}>
        −6 impact: 4 bullets have no numbers
      </Text>

      {/* Salary */}
      <Panel x={430} y={24} w={186} h={196} title="salary · LPA, India" hot={step === 3} style={show(step >= 3, 0.35)} />
      {BARS.map((v, i) => (
        <rect
          key={i}
          x={444 + i * 10}
          y={BASE - v}
          width="7.5"
          height={v}
          rx="1.5"
          fill={i === OFFER ? C.signal : 'rgba(173,186,205,0.16)'}
          className="sc sc-rise"
          style={rise(step >= 3, 120 + i * 35)}
        />
      ))}
      <line x1="440" x2="608" y1={BASE + 0.5} y2={BASE + 0.5} stroke={C.line} />
      <g className="sc" style={show(step >= 3)}>
        <line x1={444 + OFFER * 10 + 3.75} x2={444 + OFFER * 10 + 3.75} y1="72" y2={BASE} stroke={C.signal} strokeDasharray="3 3" />
        <Chip x={470} y={52} w={134} h={18} size={9.5} label="₹12 LPA · 68th pct" tone="signal" className="" />
      </g>
      <Text x={444} y={165} size={9} color={C.faint}>
        ₹3L
      </Text>
      <Text x={604} y={165} size={9} color={C.faint} anchor="end">
        ₹40L+
      </Text>
      <g className="sc" style={show(step >= 3, 0.35)}>
        <Text x={444} y={184} size={9.5} color={C.label}>
          ridge + boosted quantiles
        </Text>
        <Text x={444} y={199} size={9} color={C.faint}>
          tested on unseen companies:
        </Text>
        <Text x={444} y={212} size={9} color={C.signalText}>
          22.5% median error
        </Text>
      </g>

      {/* Coach */}
      <Panel x={430} y={236} w={186} h={140} title="gemini · coach" meta="PII out" metaColor={C.signal} hot={step === 4} style={show(step >= 4, 0.35)} />
      <g className="sc" style={show(step >= 4, 0.35)}>
        <Text x={444} y={276} size={8.5} color={C.faint} letterSpacing="1">
          BEFORE
        </Text>
        <text x="444" y="291" fill={C.copy} fontFamily={SANS} fontSize="11">
          Worked on the checkout API
        </text>
        <Text x={444} y={312} size={8.5} color={C.faint} letterSpacing="1">
          AFTER
        </Text>
        <text fontFamily={SANS} fontSize="11" fill={C.text}>
          <tspan x="444" y="327">
            Rebuilt the checkout API,
          </tspan>
          <tspan x="444" y="342">
            cutting errors by{' '}
            <tspan fill={C.danger} textDecoration="line-through">
              40%
            </tspan>{' '}
            <tspan fill={C.amber}>[X]%</tspan>
          </tspan>
        </text>
        <Text x={444} y={364} size={9} color={C.amber}>
          number not in résumé → removed
        </Text>
      </g>
    </Camera>
  );
}
