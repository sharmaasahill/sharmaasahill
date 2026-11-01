import { Camera, Panel, Pointer, Text, Tick } from './kit';
import { C, SANS, show } from './tokens';

/*
 * Pulse, one card moved by an editor while a viewer is refused.
 * Real details: six-character codes from an alphabet without look-alikes, EDITOR as the
 * default invite role, rooms project:{id} and user:{id} on /ws, the role ladder
 * VIEWER 1 < EDITOR 2 < OWNER 3, PATCH /tickets/:id needing EDITOR, the ticket:updated event
 * and the "dropped a task" notification. Names and tickets are a sample.
 */

const FOCUS = [
  [232, 30, 400],
  [232, 30, 400],
  [16, 40, 400],
  [100, 40, 400],
  [232, 30, 400],
];

const COLS = [
  { x: 24, label: 'To do', cards: ['Invite flow', 'Rate limits', 'Empty states'] },
  { x: 160, label: 'In progress', cards: ['Socket auth', 'Activity feed'] },
  { x: 296, label: 'Done', cards: ['Prisma schema'] },
];
const CARD_Y = (i) => 96 + i * 54;
const PEOPLE = [
  { id: 'riya', role: 'OWNER', rank: 3, fill: '#3a2a40' },
  { id: 'sahil', role: 'EDITOR', rank: 2, fill: '#1d3a2f' },
  { id: 'aman', role: 'VIEWER', rank: 1, fill: '#22304a' },
];

function Card({ x, y, title, hot = false, tone = 'plain' }) {
  const stroke = tone === 'danger' ? C.danger : hot ? C.signalLine : C.line;
  return (
    <g>
      <rect x={x} y={y} width="108" height="44" rx="5" fill={hot ? C.hot : C.node} stroke={stroke} className="sc" />
      <text x={x + 10} y={y + 18} fill={C.text} fontFamily={SANS} fontSize="10.5" fontWeight="600">
        {title}
      </text>
      <rect x={x + 10} y={y + 27} width="34" height="7" rx="3.5" fill="rgba(173,186,205,0.18)" />
      <circle cx={x + 95} cy={y + 31} r="5" fill={hot ? '#1d3a2f' : '#22304a'} stroke={C.nodeDeep} />
    </g>
  );
}

export default function BoardScene({ step, compact }) {
  const moved = step >= 3;
  const DX = 136;
  const DY = 54;

  return (
    <Camera step={step} focus={FOCUS} compact={compact}>
      <Text x={24} y={42} size={10.5} color={C.label}>
        board · project:42
      </Text>

      {/* Columns */}
      {COLS.map((col, c) => (
        <g key={col.label}>
          <rect x={col.x} y="56" width="128" height="320" rx="8" fill="rgba(17,25,37,0.55)" stroke={C.lineSoft} />
          <Text x={col.x + 12} y={80} size={10.5} color={C.label}>
            {col.label}
          </Text>
          <Text x={col.x + 116} y={80} size={10} color={C.faint} anchor="end">
            {c === 1 ? (moved ? 1 : 2) : c === 2 ? (moved ? 2 : 1) : col.cards.length}
          </Text>
        </g>
      ))}
      {COLS[0].cards.map((t, i) => (
        <Card key={t} x={34} y={CARD_Y(i)} title={t} />
      ))}
      <Card x={306} y={CARD_Y(0)} title={COLS[2].cards[0]} />

      {/* "Activity feed": the card a viewer tries to drag, and that slides up after the move */}
      <g className="sc" style={{ transform: moved ? `translateY(${-DY}px)` : 'none', transitionDelay: moved ? '0.9s' : '0s' }}>
        <g key={step === 2 ? 'shake' : 'still'} className={step === 2 ? 'pl-shake' : undefined}>
          <Card x={170} y={CARD_Y(1)} title="Activity feed" tone={step === 2 ? 'danger' : 'plain'} />
        </g>
      </g>
      <g className="sc" style={show(step === 2)}>
        <rect x="146" y={CARD_Y(1) + 62} width="160" height="42" rx="5" fill="#2a1719" stroke="rgba(242,139,130,0.6)" />
        <Text x={158} y={CARD_Y(1) + 79} size={10} weight={600} color={C.danger}>
          403 · VIEWER can’t edit
        </Text>
        <Text x={158} y={CARD_Y(1) + 95} size={9.5} color={C.copy}>
          needs EDITOR or above
        </Text>
        <Pointer x={236} y={CARD_Y(1) + 26} name="aman" color={C.blue} />
      </g>

      {/* "Socket auth": the card an editor moves to Done */}
      <g className="sc" style={{ transform: moved ? `translate(${DX}px, ${DY}px)` : 'none', transitionDelay: step === 3 ? '0.35s' : '0s' }}>
        <Card x={170} y={CARD_Y(0)} title="Socket auth" hot={step >= 3} />
        <g className="sc" style={show(step === 3)}>
          <Pointer x={238} y={CARD_Y(0) + 26} name="sahil" />
        </g>
      </g>

      {/* Presence */}
      {PEOPLE.map((p, i) => (
        <g key={p.id}>
          <circle cx={454 + i * 19} cy="40" r="9" fill={p.fill} stroke={C.nodeDeep} strokeWidth="2" />
          <text x={454 + i * 19} y="43.5" textAnchor="middle" fill={C.text} fontFamily={SANS} fontSize="9" fontWeight="700">
            {p.id[0].toUpperCase()}
          </text>
        </g>
      ))}
      <circle cx="503" cy="34" r="3" fill={C.signal} />
      <Text x={512} y={44} size={10} color={C.copy}>
        3 online
      </Text>

      {/* 0 · invite */}
      <g className="sc" style={show(step === 0)}>
        <Panel x={444} y={60} w={172} h={176} title="invite · project:42" hot className="" />
        <text x="458" y="118" fill={C.text} fontFamily="'IBM Plex Mono', monospace" fontSize="23" fontWeight="600" letterSpacing="3">
          K7QM2X
        </text>
        <Text x={458} y={136} size={9.5} color={C.faint}>
          no 0/O or 1/I look-alikes
        </Text>
        {[
          ['role', 'EDITOR'],
          ['expires', 'in 24 h'],
          ['link', '/join/3f9c…'],
        ].map(([k, v], i) => (
          <g key={k}>
            <Text x={458} y={166 + i * 20} size={10.5}>
              {k}
            </Text>
            <Text x={602} y={166 + i * 20} size={10.5} color={C.text} anchor="end">
              {v}
            </Text>
          </g>
        ))}
      </g>

      {/* 1 · join rooms */}
      <g className="sc" style={show(step === 1)}>
        <Panel x={444} y={60} w={172} h={176} title="socket.io · /ws" hot className="" />
        {[
          [474, 104],
          [594, 114],
          [478, 204],
        ].map(([x, y], i) => (
          <g key={i}>
            <line
              key={`l-${step === 1}`}
              x1={x}
              y1={y}
              x2="536"
              y2="154"
              stroke={C.signalLine}
              strokeWidth="1.3"
              pathLength="1"
              className={step === 1 ? 'pl-wire' : undefined}
              style={{ animationDelay: `${0.2 + i * 0.25}s` }}
            />
            <circle cx={x} cy={y} r="9" fill={PEOPLE[i].fill} stroke={C.nodeDeep} strokeWidth="2" />
            <text x={x} y={y + 3.5} textAnchor="middle" fill={C.text} fontFamily={SANS} fontSize="9" fontWeight="700">
              {PEOPLE[i].id[0].toUpperCase()}
            </text>
          </g>
        ))}
        <circle cx="536" cy="154" r="27" fill={C.nodeDeep} stroke={C.signal} />
        <Text x={536} y={151} size={9} color={C.signalText} anchor="middle">
          project
        </Text>
        <Text x={536} y={163} size={9} color={C.signalText} anchor="middle">
          :42
        </Text>
        <Text x={602} y={226} size={9.5} color={C.faint} anchor="end">
          + a user:{'{id}'} room each
        </Text>
      </g>

      {/* 2 · role guard */}
      <g className="sc" style={show(step === 2)}>
        <Panel x={444} y={60} w={172} h={176} title="role guard" className="" />
        {PEOPLE.map((p, i) => (
          <g key={p.id}>
            <Text x={458} y={100 + i * 34} size={10.5} color={p.rank === 1 ? C.danger : C.text}>
              {p.role}
            </Text>
            <Text x={602} y={100 + i * 34} size={9.5} color={C.faint} anchor="end">
              {p.rank} · {p.id}
            </Text>
            <rect x="458" y={107 + i * 34} width="144" height="5" rx="2.5" fill={C.lineSoft} />
            <rect x="458" y={107 + i * 34} width={48 * p.rank} height="5" rx="2.5" fill={p.rank === 1 ? C.danger : C.signal} />
          </g>
        ))}
        <line x1={458 + 96} x2={458 + 96} y1="84" y2="184" stroke={C.amber} strokeDasharray="3 3" />
        <Text x={458} y={210} size={9.5} color={C.amber}>
          edits need EDITOR or above
        </Text>
      </g>

      {/* 3 · the move */}
      <g className="sc" style={show(step === 3)}>
        <Panel x={444} y={60} w={172} h={176} title="PATCH /tickets/:id" hot className="" />
        <Text x={458} y={102} size={10.5}>
          status
        </Text>
        <Text x={602} y={102} size={10.5} color={C.text} anchor="end">
          → Done
        </Text>
        <Text x={458} y={124} size={10.5}>
          actor
        </Text>
        <Text x={602} y={124} size={10.5} color={C.text} anchor="end">
          sahil · EDITOR
        </Text>
        <Tick cx={466} cy={153} r={7} />
        <Text x={480} y={157} size={11} weight={600} color={C.signal}>
          200 · saved
        </Text>
        <Text x={458} y={196} size={9.5} color={C.faint}>
          dnd-kit on desktop,
        </Text>
        <Text x={458} y={212} size={9.5} color={C.faint}>
          quick-move menu on phones
        </Text>
      </g>

      {/* 4 · broadcast */}
      <g className="sc" style={show(step === 4)}>
        <Panel x={444} y={60} w={172} h={176} title="emit ticket:updated" hot className="" />
        <rect x="456" y="92" width="148" height="48" rx="6" fill={C.hot} stroke={C.signalLine} />
        <path d="M468 103 a6 6 0 0 1 12 0 v5 l2 3 h-16 l2 -3 z M472 114 a2 2 0 0 0 4 0" fill="none" stroke={C.signal} strokeWidth="1.3" />
        <text fontFamily={SANS} fontSize="10.5" fill={C.text} fontWeight="600">
          <tspan x="488" y="111">
            Sahil dropped a task
          </tspan>
          <tspan x="488" y="126" fill={C.copy} fontWeight="500">
            in Done · just now
          </tspan>
        </text>
        {PEOPLE.map((p, i) => (
          <g key={`${p.id}-${step === 4}`} className={step === 4 ? 'pl-flash' : undefined} style={{ animationDelay: `${0.35 + i * 0.18}s` }}>
            <rect x={456 + i * 50} y="152" width="44" height="26" rx="5" fill={C.node} stroke={C.signalLine} />
            <Text x={478 + i * 50} y={169} size={9.5} color={C.signalText} anchor="middle">
              {p.id}
            </Text>
          </g>
        ))}
        <Text x={458} y={202} size={9.5} color={C.faint}>
          activity logged
        </Text>
        <Text x={458} y={218} size={9.5} color={C.faint}>
          logout cleans up rooms
        </Text>
      </g>

      <text x="444" y="262" fill={C.faint} fontFamily="'IBM Plex Mono', monospace" fontSize="9.5">
        NestJS gateway · Prisma · Postgres
      </text>
    </Camera>
  );
}
