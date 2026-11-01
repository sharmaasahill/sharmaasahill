import { useEffect, useRef } from 'react';

/*
 * Hero backdrop: a quiet schematic of an event-driven pipeline, the kind of system
 * this site is about. Leads come in on the left, get parsed and turned into rules,
 * state and calls go out on the right, and failures loop back round for a retry.
 * Drawn in a 1440x900 space and scaled to cover the hero.
 */

const H = 28;
const width = (label) => Math.round(label.length * 6.75 + 26);

// x, y = top-left of the node. `bus` is the line the node hangs from, `stub` is where along the node the wire attaches.
const NODES = [
  { label: 's3://leads/batch.csv', x: 104, y: 210, bus: 290, stub: 30 },
  { label: 'λ parse_request', x: 236, y: 322, bus: 290, stub: 30 },
  { label: 'bedrock · claude', x: 88, y: 452, bus: 540, stub: 30, hot: true },
  { label: 'validate_rules()', x: 220, y: 572, bus: 540, stub: 30 },
  { label: 'dynamodb · run_state', x: 1096, y: 210, bus: 290, stub: -30 },
  { label: 'dnd_check', x: 1236, y: 322, bus: 290, stub: -30 },
  { label: 'tz → Asia/Kolkata', x: 1080, y: 452, bus: 540, stub: -30 },
  { label: 'amazon connect · lex', x: 1176, y: 572, bus: 540, stub: -30 },
].map((n) => ({ ...n, w: width(n.label) }));

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
          <stop offset="0%" stopColor="#3ddc97" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#3ddc97" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g fill="none" stroke="rgba(173,186,205,0.16)" strokeWidth="1">
        <use href="#sd-loop" />
      </g>
      {/* Labels and their wires: hidden on narrow screens, where they'd be clipped at the edges. */}
      <g className="sd-detail" fill="none" stroke="rgba(173,186,205,0.16)" strokeWidth="1">
        {NODES.map((n) => (
          <path key={`s-${n.label}`} d={stubPath(n)} />
        ))}
      </g>

      {/* Ticks along the top bus, like a scale on an instrument */}
      <g stroke="rgba(173,186,205,0.14)">
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
              fill="#101722"
              stroke={n.hot ? 'rgba(61,220,151,0.45)' : 'rgba(173,186,205,0.22)'}
            />
            <circle cx={n.x + 12} cy={n.y + H / 2} r="2.2" fill={n.hot ? '#3ddc97' : 'rgba(173,186,205,0.45)'} />
            <text x={n.x + 22} y={n.y + 18} fill={n.hot ? '#8fd9b6' : '#7d8899'}>
              {n.label}
            </text>
          </g>
        ))}
        <text x="1366" y="420" textAnchor="end" fill="#5e6776">retry ×3</text>
        <text x="74" y="420" fill="#5e6776">ingest</text>
      </g>

      <g stroke="rgba(173,186,205,0.22)" strokeWidth="1">
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
          <circle r="2.4" fill="#3ddc97">
            <animateMotion dur="14s" begin={`${begin}s`} repeatCount="indefinite" rotate="auto">
              <mpath href="#sd-loop" />
            </animateMotion>
          </circle>
        </g>
      ))}

      {/* A packet dropping in from the S3 node and one leaving for the voice bot */}
      {[NODES[0], NODES[7]].map((n, i) => (
        <circle key={n.label} className="sd-detail" r="2" fill="#3ddc97" opacity="0.85">
          <animateMotion dur="3.6s" begin={`-${i * 1.8}s`} repeatCount="indefinite" path={stubPath(n)} />
        </circle>
      ))}
    </svg>
  );
}
