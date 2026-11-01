/*
 * Shared pieces for the build scenes. Every scene draws in a 640×400 space and
 * receives the current `step`. Elements with the `sc` class transition between
 * states (see index.css); one-off motion uses keyframes that restart because the
 * element is re-keyed when its step begins.
 */

import { C, MONO, SANS, W } from './tokens';

/**
 * On narrow screens the scene zooms into the part that matters for the current step,
 * so labels stay readable. `focus[step]` is [x, y, width] in scene units (16:10 crop).
 */
export function Camera({ step, focus, compact, children }) {
  const f = compact && focus ? focus[Math.min(step, focus.length - 1)] : null;
  const scale = f ? W / f[2] : 1;
  const transform = f ? `scale(${scale}) translate(${-f[0]}px, ${-f[1]}px)` : 'none';
  return (
    <g className="sc-camera" style={{ transform }}>
      {children}
    </g>
  );
}

export function Panel({ x, y, w, h, title, meta, hot = false, metaColor = C.faint, style, className = 'sc' }) {
  return (
    <g className={className} style={style}>
      <rect x={x} y={y} width={w} height={h} rx="7" fill={C.node} stroke={hot ? C.signalLine : C.line} className="sc" />
      {title && (
        <text x={x + 14} y={y + 20} fill={C.label} fontFamily={MONO} fontSize="10.5" letterSpacing="0.3">
          {title}
        </text>
      )}
      {meta && (
        <text x={x + w - 14} y={y + 20} fill={metaColor} fontFamily={MONO} fontSize="10" textAnchor="end">
          {meta}
        </text>
      )}
    </g>
  );
}

export function Text({ x, y, children, size = 11, color = C.copy, mono = true, weight, anchor, style, className, ...rest }) {
  return (
    <text
      x={x}
      y={y}
      fill={color}
      fontFamily={mono ? MONO : SANS}
      fontSize={size}
      fontWeight={weight}
      textAnchor={anchor}
      style={style}
      className={className}
      {...rest}
    >
      {children}
    </text>
  );
}

/** A rounded label, e.g. a status or a matched skill. */
export function Chip({ x, y, w, h = 22, label, tone = 'plain', style, className = 'sc', size = 10.5 }) {
  const tones = {
    plain: { fill: C.node, stroke: C.line, text: C.copy },
    signal: { fill: C.signalSoft, stroke: C.signalLine, text: C.signalText },
    danger: { fill: C.dangerSoft, stroke: 'rgba(242,139,130,0.55)', text: C.danger },
    amber: { fill: 'rgba(242,198,109,0.12)', stroke: 'rgba(242,198,109,0.5)', text: C.amber },
    solid: { fill: C.signal, stroke: C.signal, text: C.ink },
  };
  const t = tones[tone];
  return (
    <g className={className} style={style}>
      <rect x={x} y={y} width={w} height={h} rx="4" fill={t.fill} stroke={t.stroke} />
      <text x={x + w / 2} y={y + h / 2 + 3.6} fill={t.text} fontFamily={MONO} fontSize={size} textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

/** A small check mark drawn inside a filled circle. */
export function Tick({ cx, cy, r = 6, color = C.signal, style, className = 'sc' }) {
  return (
    <g className={className} style={style}>
      <circle cx={cx} cy={cy} r={r} fill={color} />
      <path
        d={`M${cx - r * 0.45} ${cy + r * 0.02} l${r * 0.32} ${r * 0.33} l${r * 0.6} ${-r * 0.66}`}
        fill="none"
        stroke={C.ink}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** A mouse pointer whose tip sits at (x, y). */
export function Pointer({ x, y, name, color = C.signal, style, className }) {
  // Outer group takes any CSS motion; the inner one holds the resting position.
  return (
    <g className={className} style={style}>
      <g transform={`translate(${x} ${y})`}>
        <path d="M0 0 l0 15 l4 -4 l3 7 l3 -1.4 l-3 -7 l5.6 0 z" fill={C.text} stroke={C.nodeDeep} strokeWidth="0.8" />
        {name && (
          <g transform="translate(12 16)">
            <rect width={name.length * 6.4 + 14} height="17" rx="8.5" fill={color} />
            <text x={(name.length * 6.4 + 14) / 2} y="12" textAnchor="middle" fill={C.ink} fontFamily={MONO} fontSize="9.5" fontWeight="600">
              {name}
            </text>
          </g>
        )}
      </g>
    </g>
  );
}
