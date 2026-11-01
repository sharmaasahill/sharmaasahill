import { Camera, Chip, Text } from './kit';
import { C, show } from './tokens';

/*
 * MeetSync, one booking that clashes and then lands in a free slot.
 * Real details: the seeded employees and meetings (Rahul, Priya, Amit, Vikram; the 09:00
 * stand-up and the 14:00–16:00 planning session), working hours 09:00–18:00, the
 * per-participant overlap query, 400 for a clash, 201 for a booking.
 */

const FOCUS = [
  [16, 10, 400],
  [16, 150, 400],
  [208, 60, 400],
  [104, 70, 512],
  [208, 60, 400],
];

const X0 = 104; // 09:00
const HOUR = 56; // px per hour
const at = (h) => X0 + (h - 9) * HOUR;

const PEOPLE = ['rahul', 'priya', 'amit', 'vikram'];
const ROW = (i) => 124 + i * 46;
const ROW_H = 36;

// Seeded meetings: [label, start, end, people]
const MEETINGS = [
  ['', 9, 9.5, ['rahul', 'vikram']],
  ['Product Planning', 14, 16, ['priya', 'rahul', 'amit']],
];

// [label, x, y, width]: two rows, so the whole check fits the phone crop
const CHECKS = [
  ['start < end', X0, 316, 128],
  ['not in the past', X0 + 138, 316, 140],
  ['people exist', X0, 344, 128],
  ['09:00–18:00', X0 + 138, 344, 140],
];

const STATUS = [
  ['→ sending…', C.faint],
  ['→ valid', C.signal],
  ['→ 400 · conflicts for 2 people', C.danger],
  ['→ POST /api/calendar/free-slots', C.blue],
  ['→ 201 Created', C.signal],
];

export default function CalendarScene({ step, compact }) {
  const clash = step === 2;
  const booked = step === 4;
  const reqX = booked ? at(16) : at(14.5);

  return (
    <Camera step={step} focus={FOCUS} compact={compact}>
      {/* Request */}
      <rect x="24" y="16" width="592" height="80" rx="7" fill={C.node} stroke={step === 0 ? C.signalLine : C.line} className="sc" />
      <Text x={40} y={40} size={12} weight={600} color={C.signal}>
        POST
      </Text>
      <Text x={78} y={40} size={12} color={C.text}>
        /api/meetings
      </Text>
      {STATUS.map(([label, color], i) => (
        <Text key={label} x={186} y={40} size={11} color={color} className="sc" style={show(step === i)}>
          {label}
        </Text>
      ))}
      <Text x={40} y={63} size={10.5}>
        {'{ title: "Team Meeting", 14:30–15:30,'}
      </Text>
      <Text x={40} y={80} size={10.5}>
        {'  organizer: rahul, participants: [priya] }'}
      </Text>
      <Text x={600} y={80} size={9.5} color={C.faint} anchor="end">
        Spring Boot 3.2 · H2
      </Text>

      {/* Calendar */}
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <line x1={at(9 + i)} x2={at(9 + i)} y1="116" y2={ROW(3) + ROW_H + 4} stroke={C.lineSoft} />
          <Text x={at(9 + i)} y={110} size={9.5} color={C.faint} anchor="middle">
            {String(9 + i).padStart(2, '0')}
          </Text>
        </g>
      ))}
      {PEOPLE.map((p, i) => (
        <g key={p}>
          <rect x={X0} y={ROW(i)} width={HOUR * 9} height={ROW_H} rx="4" fill="rgba(17,25,37,0.55)" stroke={C.lineSoft} />
          <Text x={24} y={ROW(i) + 22} size={11} color={i < 2 ? C.text : C.copy}>
            {p}
          </Text>
        </g>
      ))}

      {/* Free slots for both people, found in step 3 */}
      <g className="sc" style={show(step === 3)}>
        {[
          [9.5, 14],
          [16, 18],
        ].map(([s, e]) => (
          <g key={s}>
            <rect
              x={at(s) + 1}
              y={ROW(0) - 3}
              width={(e - s) * HOUR - 2}
              height={ROW_H * 2 + 16}
              rx="5"
              fill={C.signalSoft}
              stroke={C.signalLine}
              strokeDasharray="4 3"
            />
            <Text x={at(s) + ((e - s) * HOUR) / 2} y={ROW(0) + 22} size={10} weight={600} color={C.signalText} anchor="middle">
              {`${String(Math.floor(s)).padStart(2, '0')}:${s % 1 ? '30' : '00'}–${e}:00`}
            </Text>
            <Text x={at(s) + ((e - s) * HOUR) / 2} y={ROW(1) + 22} size={9} color={C.signalText} anchor="middle">
              free for both
            </Text>
          </g>
        ))}
      </g>

      {/* Existing meetings. The name is shown where nothing sits on top of it. */}
      {MEETINGS.map(([label, s, e, who]) =>
        who.map((p) => {
          const i = PEOPLE.indexOf(p);
          return (
            <g key={`${label}-${p}`}>
              <rect x={at(s) + 1} y={ROW(i) + 4} width={(e - s) * HOUR - 2} height={ROW_H - 8} rx="3" fill="#1b2533" stroke={C.line} />
              {label && p === 'amit' && (
                <Text x={at(s) + 8} y={ROW(i) + 22} size={9.5} color={C.copy}>
                  {label}
                </Text>
              )}
            </g>
          );
        })
      )}

      {/* The requested meeting, for rahul and priya */}
      {[0, 1].map((i) => (
        <g key={i} className="sc" style={{ transform: `translateX(${reqX - at(14.5)}px)` }}>
          <rect x={at(14.5) + 1} y={ROW(i) + 2} width={HOUR - 2} height={ROW_H - 4} rx="3" fill={C.nodeDeep} />
          <rect
            x={at(14.5) + 1}
            y={ROW(i) + 2}
            width={HOUR - 2}
            height={ROW_H - 4}
            rx="3"
            className="sc"
            style={{
              fill: booked ? C.signal : clash ? C.dangerSoft : 'rgba(232,234,237,0.06)',
              stroke: booked ? C.signal : clash ? C.danger : C.text,
            }}
            strokeDasharray={booked ? undefined : '4 3'}
            strokeWidth="1.3"
          />
          <Text x={at(14.5) + HOUR / 2} y={ROW(i) + 22} size={9.5} anchor="middle" weight={600} style={{ fill: booked ? C.ink : clash ? C.danger : C.text }} className="sc">
            {booked ? 'booked' : clash ? 'clash' : 'new'}
          </Text>
        </g>
      ))}
      <Chip x={at(16) + 2} y={ROW(0) + 8} w={104} h={20} size={9.5} label="both busy 14–16" tone="danger" style={show(clash)} />

      {/* Validation */}
      <Text x={24} y={331} size={10} color={C.faint}>
        @Valid
      </Text>
      {CHECKS.map(([label, x, y, w], i) => (
        <Chip
          key={label}
          x={x}
          y={y}
          w={w}
          h={22}
          size={10}
          label={`${label} ✓`}
          tone={step >= 1 ? 'signal' : 'plain'}
          style={{ ...show(step >= 1, 0.3), transitionDelay: step === 1 ? `${200 + i * 160}ms` : '0ms' }}
        />
      ))}
      {/* Footnotes sit outside the phone crop, so they are drawn only on wider screens. */}
      {!compact && (
        <g>
          <Text x={400} y={331} size={9.5} color={C.faint}>
            overlap query per participant
          </Text>
          <Text x={400} y={348} size={9.5} color={C.faint}>
            one @Transactional save
          </Text>
          <Text x={400} y={365} size={9.5} color={C.faint}>
            54 JUnit 5 tests
          </Text>
        </g>
      )}
    </Camera>
  );
}
