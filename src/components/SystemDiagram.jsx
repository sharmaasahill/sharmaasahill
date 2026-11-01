import { useEffect, useRef } from 'react';

/*
 * Hero backdrop: one loop drawn from the harder parts of the work. The model side is
 * on the left (rules generated from plain English, a four-agent crew, retrieval, face
 * embeddings); the action side is on the right (durable state, an eval gate in CI, a
 * human approval queue, live voice flows). Packets run from answer to action and back.
 * Every label is something shipped at TCS or in one of the builds.
 * Drawn in a 1440x900 space and scaled to cover the hero.
 */

const H = 28;
const width = (label) => Math.round(label.length * 6.75 + 26);

// Left nodes give `x`, right nodes give `right` (their right edge), so long labels stay off the edge.
// `bus` is the line the node hangs from; `stub` is where along the node the wire attaches.
const NODES = [
  { label: 'bedrock · english → rules', x: 96, y: 210, bus: 290, stub: 30, hot: true },
  { label: 'crewai · 4-agent crew', x: 196, y: 322, bus: 290, stub: 30 },
  { label: 'rag · chromadb top-4', x: 88, y: 452, bus: 540, stub: 30 },
  { label: 'arcface · 512-d k-NN', x: 196, y: 572, bus: 540, stub: 30 },
  { label: 'dynamodb · 4-table state', right: 1270, y: 210, bus: 290, stub: -30 },
  { label: 'eval gate ≥ 90% · CI', right: 1330, y: 322, bus: 290, stub: -30 },
  { label: 'human approval queue', right: 1252, y: 452, bus: 540, stub: -30, hot: true },
  { label: 'connect + lex · 15K/mo', right: 1342, y: 572, bus: 540, stub: -30 },
].map((n) => {
  const w = width(n.label);
  return { ...n, w, x: n.x ?? n.right - w };
});

// One rounded loop: top bus left to right, down the right side, bottom bus back, up the left.
const LOOP = 'M84 290 H1356 Q1380 290 1380 314 V516 Q1380 540 1356 540 H84 Q60 540 60 516 V314 Q60 290 84 290 Z';

const CROSSES = [
  [420, 168], [1020, 168], [330, 690], [1110, 690], [720, 120], [560, 640], [900, 640],
];

function stubPath(n) {
  const x = n.stub > 0 ? n.x + n.stub : n.x + n.w + n.stub;
  const above = n.y + H <= n.bus;
  return above ? `M${x} ${n.y + H} V${n.bus}` : `M${x} ${n.bus} V${n.y}`;
}

export default function SystemDiagram({ className = '' }) {
  const svgRef = useRef(null);

  // SMIL keeps running off-screen; pause it there, and entirely for reduced motion.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg?.pauseAnimations) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      svg.pauseAnimations();
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) svg.unpauseAnimations();
      else svg.pauseAnimations();
    });
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <path id="sd-loop" d={LOOP} />
        <radialGradient id="sd-packet-glow">
          <stop offset="0%" className="sd-glow" stopOpacity="0.45" />
          <stop offset="100%" className="sd-glow" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="sd-wire" fill="none" strokeWidth="1">
        <use href="#sd-loop" />
      </g>
      {/* Labels and their wires: hidden on narrow screens, where they'd be clipped at the edges. */}
      <g className="sd-detail sd-wire" fill="none" strokeWidth="1">
        {NODES.map((n) => (
          <path key={`s-${n.label}`} d={stubPath(n)} />
        ))}
      </g>

      {/* Ticks along the top bus, like a scale on an instrument */}
      <g className="sd-tick">
        {Array.from({ length: 15 }, (_, i) => 420 + i * 40).map((x) => (
          <line key={x} x1={x} x2={x} y1="286" y2="294" />
        ))}
      </g>

      <g className="sd-detail" fontFamily="'IBM Plex Mono', ui-monospace, monospace" fontSize="11" letterSpacing="0.2">
        {NODES.map((n) => (
          <g key={n.label}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={H}
              rx="4"
              className={`sd-node${n.hot ? ' is-hot' : ''}`}
            />
            <circle cx={n.x + 12} cy={n.y + H / 2} r="2.2" className={`sd-dot${n.hot ? ' is-hot' : ''}`} />
            <text x={n.x + 22} y={n.y + 18} className={`sd-label${n.hot ? ' is-hot' : ''}`}>
              {n.label}
            </text>
          </g>
        ))}
        <text x="1366" y="420" textAnchor="end" className="sd-note">
          action
        </text>
        <text x="74" y="420" className="sd-note">
          answer
        </text>
      </g>

      <g className="sd-cross" strokeWidth="1">
        {CROSSES.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <line x1={x - 4} x2={x + 4} y1={y} y2={y} />
            <line x1={x} x2={x} y1={y - 4} y2={y + 4} />
          </g>
        ))}
      </g>

      {/* Packets moving round the loop */}
      {[0, -4.6, -9.2].map((begin) => (
        <g key={begin}>
          <circle r="9" fill="url(#sd-packet-glow)">
            <animateMotion dur="14s" begin={`${begin}s`} repeatCount="indefinite" rotate="auto">
              <mpath href="#sd-loop" />
            </animateMotion>
          </circle>
          <circle r="2.4" className="sd-packet">
            <animateMotion dur="14s" begin={`${begin}s`} repeatCount="indefinite" rotate="auto">
              <mpath href="#sd-loop" />
            </animateMotion>
          </circle>
        </g>
      ))}

      {/* A packet dropping in from the rule generator and one leaving for the voice flow */}
      {[NODES[0], NODES[7]].map((n, i) => (
        <circle key={n.label} className="sd-detail sd-packet" r="2" opacity="0.85">
          <animateMotion dur="3.6s" begin={`-${i * 1.8}s`} repeatCount="indefinite" path={stubPath(n)} />
        </circle>
      ))}
    </svg>
  );
}
