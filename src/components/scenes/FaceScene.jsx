import { Camera, Text, Tick } from './kit';
import { C, SANS, show } from './tokens';

/*
 * Smart Attendance, one kiosk check-in.
 * Real details from the repo's config and liveness service: detection ≥ 0.55, face ≥ 50 px,
 * sharpness (Laplacian variance) ≥ 40, a server-issued head-turn challenge that is single-use
 * and lasts 90 s, a 12-frame burst, a 12° yaw sweep, ArcFace 512-d, k-NN with k = 5 and a
 * 0.42 cosine threshold. The person, scores and time are a sample.
 */

const FOCUS = [
  [232, 40, 400],
  [232, 40, 400],
  [232, 40, 400],
  [232, 40, 400],
  [232, 40, 400],
];

const CX = 174;
const CY = 186;

function ring(cx, cy, rx, ry, n, from = 0, to = Math.PI * 2) {
  const closed = to - from >= Math.PI * 2;
  return Array.from({ length: n }, (_, i) => {
    const t = from + ((to - from) * i) / (closed ? n : n - 1);
    return [cx + rx * Math.cos(t), cy + ry * Math.sin(t)];
  });
}

const JAW = ring(CX, CY, 70, 92, 34);
const EYE_L = ring(CX - 27, CY - 21, 12.5, 5.2, 10);
const EYE_R = ring(CX + 27, CY - 21, 12.5, 5.2, 10);
const BROW_L = ring(CX - 27, CY - 29, 16, 9, 5, Math.PI * 1.1, Math.PI * 1.9);
const BROW_R = ring(CX + 27, CY - 29, 16, 9, 5, Math.PI * 1.1, Math.PI * 1.9);
const NOSE = [
  [CX, CY - 13],
  [CX, CY - 2],
  [CX, CY + 9],
  [CX - 8.5, CY + 17],
  [CX, CY + 19],
  [CX + 8.5, CY + 17],
];
const MOUTH = ring(CX, CY + 42, 21, 7.5, 14);
const pts = (list) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

// A fixed, made-up embedding: 512 values in [-1, 1].
const EMBEDDING = Array.from({ length: 512 }, (_, i) => {
  const v = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return (v - Math.floor(v)) * 2 - 1;
});

const PROMPTS = [
  'hold still · checking the frame',
  'blink once',
  'turn your head left, then back',
  'hold still',
  'welcome, Sahil',
];

const QUALITY = [
  ['detection', '0.91', '≥ 0.55'],
  ['face size', '212 px', '≥ 50 px'],
  ['sharpness', '96', '≥ 40'],
  ['brightness', '131', 'in range'],
];

const MATCHES = [
  ['sahil', 0.83],
  ['aman', 0.29],
  ['riya', 0.18],
];

function Dots({ list, r = 1.7, fill }) {
  return list.map(([x, y], i) => <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={r} fill={fill} />);
}

// Point on the gauge arc for a yaw angle in degrees (−30 left … +30 right).
const GX = 480;
const GY = 196;
const GR = 86;
const onArc = (deg, r = GR) => {
  // −30° sits at the left end, 0° at the top, +30° at the right end.
  const a = Math.PI / 2 - (deg / 30) * (Math.PI / 2);
  return [GX + r * Math.cos(a), GY - r * Math.sin(a)];
};
const arc = (from, to, r = GR) => {
  const [x1, y1] = onArc(from, r);
  const [x2, y2] = onArc(to, r);
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
};

export default function FaceScene({ step, compact }) {
  const live = step >= 1;
  const bracket = live ? C.signal : 'rgba(173,186,205,0.55)';

  return (
    <Camera step={step} focus={FOCUS} compact={compact}>
      {/* Camera */}
      <rect x="24" y="24" width="300" height="352" rx="8" fill="#0c1119" stroke={C.line} />
      <g fill="none" strokeWidth="1.6" className="sc" style={{ stroke: bracket }}>
        <path d="M40 58 V40 H58" />
        <path d="M290 40 H308 V58" />
        <path d="M40 342 V360 H58" />
        <path d="M290 360 H308 V342" />
      </g>
      <text x="64" y="371" fill={C.faint} fontFamily="'IBM Plex Mono', monospace" fontSize="9">
        mirrored preview · 640×480
      </text>

      {/* Face box */}
      <rect x="98" y="82" width="152" height="210" rx="4" fill="none" stroke={C.signalLine} strokeDasharray="4 4" />
      <rect x="98" y="66" width="96" height="16" rx="3" fill={C.signalSoft} />
      <Text x={104} y={77.5} size={9} color={C.signalText}>
        face · det 0.91
      </Text>

      {/* Face mesh; turns during the challenge */}
      <g key={step === 2 ? 'turning' : 'still'} className={step === 2 ? 'at-yaw' : undefined}>
        <polygon points={pts(JAW)} fill="none" stroke="rgba(173,186,205,0.16)" />
        <polyline points={pts([EYE_L[0], NOSE[2], EYE_R[5], EYE_L[0]])} fill="none" stroke="rgba(173,186,205,0.1)" />
        <polyline points={pts([NOSE[3], MOUTH[0], MOUTH[7], NOSE[5]])} fill="none" stroke="rgba(173,186,205,0.1)" />
        <Dots list={JAW} r={1.5} fill="rgba(173,186,205,0.55)" />
        <Dots list={BROW_L} fill="rgba(232,234,237,0.7)" />
        <Dots list={BROW_R} fill="rgba(232,234,237,0.7)" />
        <Dots list={NOSE} fill="rgba(232,234,237,0.7)" />
        <Dots list={MOUTH} fill="rgba(232,234,237,0.7)" />
        {[EYE_L, EYE_R].map((eye, i) => (
          <g key={`${i}-${step === 1 ? 'blink' : 'open'}`} className={step === 1 ? 'at-blink' : undefined}>
            <Dots list={eye} r={1.8} fill={C.signal} />
          </g>
        ))}
      </g>

      {step === 0 && (
        <g key="scan" className="at-scan">
          <rect x="30" y="34" width="288" height="16" fill="url(#at-scan-glow)" />
          <rect x="30" y="49" width="288" height="1.2" fill={C.signal} opacity="0.9" />
        </g>
      )}
      <defs>
        <linearGradient id="at-scan-glow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={C.signal} stopOpacity="0" />
          <stop offset="1" stopColor={C.signal} stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* Burst capture during the turn: 12 frames, 200 ms apart */}
      <g className="sc" style={show(step === 2)}>
        {Array.from({ length: 12 }, (_, i) => (
          <circle key={`${i}-${step}`} cx={119 + i * 10} cy="314" r="3" fill={C.signal} className={step === 2 ? 'at-frame' : undefined} style={{ animationDelay: `${0.25 + i * 0.2}s` }} />
        ))}
      </g>

      {/* Prompt */}
      <rect x="64" y="326" width="220" height="26" rx="13" fill="rgba(12,17,25,0.92)" stroke={C.line} />
      <circle cx="82" cy="339" r="3.2" className="sc" style={{ fill: step === 4 ? C.signal : C.amber }} />
      {PROMPTS.map((p, i) => (
        <text key={p} x="182" y="343" textAnchor="middle" fill={C.text} fontFamily={SANS} fontSize="11" fontWeight="600" className="sc" style={show(step === i)}>
          {p}
        </text>
      ))}

      {/* The right-hand readout changes with the step */}
      <rect x="344" y="36" width="272" height="244" rx="7" fill={C.node} stroke={C.line} />

      {/* 0 · quality */}
      <g className="sc" style={show(step === 0)}>
        <Text x={360} y={60} size={10.5} color={C.label}>
          quality gate · insightface
        </Text>
        {QUALITY.map(([k, v, rule], i) => (
          <g key={k}>
            <Text x={360} y={94 + i * 30} size={11}>
              {k}
            </Text>
            <Text x={462} y={94 + i * 30} size={11} color={C.text}>
              {v}
            </Text>
            <Text x={522} y={94 + i * 30} size={10} color={C.faint}>
              {rule}
            </Text>
            <Tick cx={598} cy={90 + i * 30} r={6} className="sc" style={{ ...show(step === 0), transitionDelay: step === 0 ? `${300 + i * 220}ms` : '0ms' }} />
          </g>
        ))}
        <Text x={360} y={226} size={10} color={C.faint}>
          a blurry or tiny face never reaches
        </Text>
        <Text x={360} y={242} size={10} color={C.faint}>
          the model: the kiosk asks again
        </Text>
      </g>

      {/* 1 · blink */}
      <g className="sc" style={show(step === 1)}>
        <Text x={360} y={60} size={10.5} color={C.label}>
          blink · mediapipe facelandmarker
        </Text>
        <line x1="360" x2="600" y1="176" y2="176" stroke={C.line} />
        <line x1="360" x2="600" y1="150" y2="150" stroke={C.lineSoft} strokeDasharray="3 4" />
        <Text x={600} y={145} size={9} color={C.faint} anchor="end">
          eyes closed
        </Text>
        <polyline
          key={step === 1 ? 'draw' : 'rest'}
          className={step === 1 ? 'at-draw' : undefined}
          points="360,100 400,99 420,101 432,100 440,164 448,100 470,99 500,101 512,100 520,166 528,100 560,99 600,100"
          fill="none"
          stroke={C.signal}
          strokeWidth="1.6"
          strokeLinejoin="round"
          pathLength="1"
        />
        <Text x={360} y={88} size={9} color={C.faint}>
          eye openness
        </Text>
        <Text x={360} y={212} size={11.5} mono={false} weight={600} color={C.signal}>
          ✓ live face · capture can start
        </Text>
        <Text x={360} y={234} size={10} color={C.faint}>
          runs in the browser, before any upload
        </Text>
      </g>

      {/* 2 · head turn */}
      <g className="sc" style={show(step === 2)}>
        <Text x={360} y={60} size={10.5} color={C.label}>
          head turn · server challenge
        </Text>
        <path d={arc(-30, 30)} fill="none" stroke={C.line} strokeWidth="6" strokeLinecap="round" />
        <path d={arc(-30, -12)} fill="none" stroke={C.signalLine} strokeWidth="6" strokeLinecap="round" />
        <path d={arc(12, 30)} fill="none" stroke={C.signalLine} strokeWidth="6" strokeLinecap="round" />
        {[-30, -12, 0, 12, 30].map((d) => {
          const [x, y] = onArc(d, GR + 14);
          return (
            <Text key={d} x={x} y={y + 3} size={9} color={d === 0 ? C.label : C.faint} anchor="middle">
              {d > 0 ? `+${d}°` : `${d}°`}
            </Text>
          );
        })}
        <g key={step === 2 ? 'swing' : 'rest'} className={step === 2 ? 'at-needle' : undefined} style={{ transformOrigin: `${GX}px ${GY}px` }}>
          <line x1={GX} x2={GX} y1={GY} y2={GY - GR + 10} stroke={C.text} strokeWidth="2" strokeLinecap="round" />
        </g>
        <circle cx={GX} cy={GY} r="5" fill={C.text} />
        <Text x={360} y={226} size={11.5} mono={false} weight={600} color={C.signal}>
          ✓ sweep 18.4° (needs ≥ 12°)
        </Text>
        <Text x={360} y={246} size={10} color={C.faint}>
          challenge 7f3c… · single use · 90 s
        </Text>
        <Text x={360} y={264} size={10} color={C.faint}>
          a printed photo sweeps about 0°
        </Text>
      </g>

      {/* 3 · embedding */}
      <g className="sc" style={show(step === 3)}>
        <Text x={360} y={60} size={10.5} color={C.label}>
          arcface · 512-d embedding
        </Text>
        {EMBEDDING.map((v, i) => (
          <rect
            key={i}
            x={360 + (i % 32) * 7.5}
            y={76 + Math.floor(i / 32) * 7.5}
            width="6.4"
            height="6.4"
            rx="1"
            fill={v >= 0 ? C.signal : C.blue}
            opacity={(0.14 + Math.abs(v) * 0.8).toFixed(2)}
          />
        ))}
        {step === 3 && <rect key="cover" x="356" y="72" width="250" height="128" fill={C.node} className="at-reveal" />}
        <Text x={360} y={222} size={10}>
          [ 0.031, −0.112, 0.087, … 0.054 ]
        </Text>
        <Text x={360} y={242} size={10} color={C.faint}>
          L2-normalised · frontal frames only
        </Text>
      </g>

      {/* 4 · match and vote */}
      <g className="sc" style={show(step === 4)}>
        <Text x={360} y={60} size={10.5} color={C.label}>
          cosine k-NN · k = 5
        </Text>
        <line x1={410 + 0.42 * 156} x2={410 + 0.42 * 156} y1="76" y2="168" stroke={C.amber} strokeDasharray="3 3" />
        <Text x={410 + 0.42 * 156} y={72} size={9} color={C.amber} anchor="middle">
          0.42
        </Text>
        {MATCHES.map(([name, sim], i) => (
          <g key={name}>
            <Text x={360} y={98 + i * 30} size={11} color={i === 0 ? C.text : C.copy}>
              {name}
            </Text>
            <rect x="410" y={90 + i * 30} width="156" height="7" rx="3.5" fill={C.lineSoft} />
            <rect
              x="410"
              y={90 + i * 30}
              width={156 * sim}
              height="7"
              rx="3.5"
              fill={i === 0 ? C.signal : 'rgba(173,186,205,0.35)'}
              className="sc sc-grow"
              style={{ transform: step === 4 ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: step === 4 ? `${150 + i * 120}ms` : '0ms' }}
            />
            <Text x={604} y={98 + i * 30} size={10} anchor="end" color={i === 0 ? C.signal : C.faint}>
              {sim.toFixed(2)}
            </Text>
          </g>
        ))}
        <Text x={360} y={196} size={11}>
          frames: 3 of 3 agree
        </Text>
        <Text x={360} y={222} size={12} mono={false} weight={700} color={C.signal}>
          ✓ marked present · 09:02 IST
        </Text>
        <Text x={360} y={244} size={10} color={C.faint}>
          signed in? only your own face counts
        </Text>
      </g>

      <text x="344" y="300" fill={C.faint} fontFamily="'IBM Plex Mono', monospace" fontSize="9.5">
        embeddings and images live in PostgreSQL
      </text>
      <text x="344" y="316" fill={C.faint} fontFamily="'IBM Plex Mono', monospace" fontSize="9.5">
        so the API survives restarts and redeploys
      </text>
    </Camera>
  );
}
