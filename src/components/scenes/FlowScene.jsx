import { Camera, Chip, Panel, Pointer, Text, Tick } from './kit';
import { C, MONO, SANS, show } from './tokens';

/*
 * FlowMancer, one lead from form to approved CRM write.
 * Real details: the six-category rubric and its weights, the four crew agents in order,
 * chunk retrieval within 0.75 cosine, Slack firing on its own at 80+, the approval queue.
 * The lead is the example from the project's README.
 */

const FOCUS = [
  [12, 16, 360], // trigger: the lead card
  [12, 170, 360], // ground: research and knowledge
  [200, 30, 360], // crew
  [292, 14, 344], // score
  [292, 182, 344], // approve
];

const AGENTS = [
  ['Lead Analyzer', 'buying signals'],
  ['Research Specialist', 'sourced summary'],
  ['Scoring Expert', 'points per category'],
  ['Routing Manager', 'owner and next step'],
];

// [category, points, max]. Weights are the project's scoring guide.
const RUBRIC = [
  ['company_size', 25, 25],
  ['industry_fit', 20, 20],
  ['budget', 20, 20],
  ['urgency', 15, 15],
  ['decision_maker', 5, 10],
  ['intent', 10, 10],
];

const CHUNKS = [
  ['pricing.md #3', 0.21],
  ['routing.md #1', 0.34],
  ['faq.md #7', 0.58],
];

const grow = (on, delay = 0) => ({
  transform: on ? 'scaleX(1)' : 'scaleX(0)',
  transitionDelay: on ? `${delay}ms` : '0ms',
});

export default function FlowScene({ step, compact }) {
  const crew = step < 2 ? 'wait' : step === 2 ? 'run' : 'done';
  const scored = step >= 3;
  const signal = (on) => ({ fill: on ? C.signal : C.copy });

  return (
    <Camera step={step} focus={FOCUS} compact={compact}>
      {/* Wires: lead and research feed the crew; the crew feeds the score. */}
      <g fill="none" strokeWidth="1.2">
        <path d="M220 100 H232 V82 H244" className="sc" style={{ stroke: step >= 2 ? C.signalLine : C.line }} />
        <path d="M220 286 H232 V134 H244" className="sc" style={{ stroke: step >= 2 ? C.signalLine : C.line }} />
        <path d="M404 238 H416 V128 H428" className="sc" style={{ stroke: scored ? C.signalLine : C.line }} />
      </g>

      {/* The lead */}
      <g key={step === 0 ? 'lead-in' : 'lead'} className={step === 0 ? 'sc-enter' : undefined}>
        <Panel x={24} y={28} w={196} h={150} title="website form · lead #1042" hot={step === 0} />
        <Text x={38} y={76} size={13.5} mono={false} weight={600} color={C.text}>
          Priya Sharma
        </Text>
        <Text x={38} y={93} size={10} color={C.label}>
          priya@stripe.com · Stripe
        </Text>
        <text fontFamily={SANS} fontSize="12" fill={C.copy}>
          <tspan x="38" y="120">
            “Automate lead routing for our
          </tspan>
          <tspan x="38" y="137">
            <tspan className="sc" style={signal(step >= 2)}>
              300-person
            </tspan>{' '}
            sales team{' '}
            <tspan className="sc" style={signal(step >= 2)}>
              this
            </tspan>
          </tspan>
          <tspan x="38" y="154">
            <tspan className="sc" style={signal(step >= 2)}>
              quarter.
            </tspan>{' '}
            <tspan className="sc" style={signal(step >= 2)}>
              Budget approved.
            </tspan>
            ”
          </tspan>
        </text>
        <Text x={38} y={170} size={9.5} color={C.faint} className="sc" style={show(step >= 2)}>
          ↳ signals the analyzer pulled out
        </Text>
      </g>

      {/* Grounding: web research and the knowledge base */}
      <Panel x={24} y={194} w={196} h={182} title="ground" meta="web + rag" hot={step === 1} style={show(step >= 1, 0.35)} />
      <g className="sc" style={show(step >= 1, 0.35)}>
        <Text x={38} y={238} size={10.5}>
          duckduckgo
        </Text>
        <Text x={206} y={238} size={10.5} anchor="end" color={C.text}>
          5 sources
        </Text>
        <Text x={38} y={256} size={10.5}>
          stripe.com
        </Text>
        <Text x={206} y={256} size={10.5} anchor="end" color={C.text}>
          company site
        </Text>
        <line x1="38" x2="206" y1="268" y2="268" stroke={C.lineSoft} />
        <Text x={38} y={286} size={9.5} color={C.faint}>
          chromadb · top 4 · within 0.75
        </Text>
        {CHUNKS.map(([name, d], i) => (
          <g key={name}>
            <Text x={38} y={306 + i * 20} size={10}>
              {name}
            </Text>
            <rect x="124" y={300 + i * 20} width="50" height="5" rx="2.5" fill={C.lineSoft} />
            <rect
              x="124"
              y={300 + i * 20}
              width={50 * (1 - d / 0.75)}
              height="5"
              rx="2.5"
              fill={C.signal}
              className="sc sc-grow"
              style={grow(step >= 1, 250 + i * 140)}
            />
            <Text x={206} y={306 + i * 20} size={10} anchor="end" color={C.text}>
              {d.toFixed(2)}
            </Text>
          </g>
        ))}
        <Text x={38} y={366} size={9.5} color={C.faint}>
          MiniLM embeddings, run locally
        </Text>
      </g>

      {/* The crew */}
      <Text x={244} y={46} size={10.5} color={C.label}>
        crew · 4 agents, in order
      </Text>
      <line x1="258" x2="258" y1="82" y2="238" stroke={C.line} />
      {crew === 'run' && <circle key="packet" cx="258" cy="82" r="3.2" fill={C.signal} className="fm-packet" />}
      {AGENTS.map(([name, out], i) => {
        const y = 64 + i * 52;
        return (
          <g key={name}>
            <rect
              x="244"
              y={y}
              width="160"
              height="36"
              rx="6"
              fill={C.node}
              className="sc"
              style={{ stroke: crew === 'done' ? C.signalLine : C.line, transitionDelay: crew === 'run' ? `${0.55 + i * 0.5}s` : '0s' }}
            />
            <circle cx="258" cy={y + 18} r="5.5" fill={C.nodeDeep} stroke={C.line} />
            {crew === 'run' && (
              <g key={`run-${i}`}>
                <circle cx="258" cy={y + 18} r="5.5" fill="none" stroke={C.signal} className="sc-ping" style={{ animationDelay: `${i * 0.5}s` }} />
                <Tick cx={258} cy={y + 18} r={5.5} className="sc-pop" style={{ animationDelay: `${0.5 + i * 0.5}s` }} />
              </g>
            )}
            {crew === 'done' && <Tick cx={258} cy={y + 18} r={5.5} />}
            <Text x={272} y={y + 16} size={11.5} mono={false} weight={600} color={C.text}>
              {name}
            </Text>
            <Text x={272} y={y + 29} size={9.5} color={C.faint}>
              {out}
            </Text>
          </g>
        );
      })}
      <Text x={244} y={282} size={9.5} color={C.faint}>
        or quick mode: 1 call
      </Text>
      <Text x={244} y={300} size={9.5} color={C.faint} className="sc" style={show(step >= 2)}>
        every step streams over SSE
      </Text>

      {/* The score, added up in code */}
      <Panel x={428} y={28} w={188} h={196} title="score · added in code" hot={step === 3} style={show(scored, 0.35)} />
      {RUBRIC.map(([key, pts, max], i) => {
        const y = 66 + i * 20;
        return (
          <g key={key} className="sc" style={show(scored, 0.35)}>
            <Text x={442} y={y} size={9.5}>
              {key}
            </Text>
            <rect x="542" y={y - 6} width={(44 * max) / 25} height="5" rx="2.5" fill={C.lineSoft} />
            <rect
              x="542"
              y={y - 6}
              width={(44 * pts) / 25}
              height="5"
              rx="2.5"
              fill={pts === max ? C.signal : C.amber}
              className="sc sc-grow"
              style={grow(scored, 150 + i * 90)}
            />
            <Text x={604} y={y} size={9.5} anchor="end" color={C.text}>
              {scored ? pts : '–'}
            </Text>
          </g>
        );
      })}
      <g className="sc" style={show(scored, 0.15)}>
        <text x="442" y="200" fill={C.text} fontFamily="'Instrument Serif', Georgia, serif" fontSize="30">
          95
        </text>
        <Text x={476} y={199} size={10.5} color={C.signal}>
          /100 · High
        </Text>
        <Text x={442} y={215} size={9.5} color={C.label}>
          owner: enterprise sales
        </Text>
      </g>
      <Chip x={428} y={232} w={188} h={18} size={9.5} label="slack #sales · auto at 80+" tone={scored ? 'signal' : 'plain'} style={show(scored, 0.3)} />

      {/* Approval */}
      <Panel
        x={428}
        y={258}
        w={188}
        h={118}
        title="approval #318"
        meta={scored ? 'pending' : ''}
        metaColor={C.amber}
        hot={step === 4}
        style={show(scored, 0.3)}
      />
      <g className="sc" style={show(scored, 0.3)}>
        <Text x={442} y={300} size={12.5} mono={false} weight={600} color={C.text}>
          Add to HubSpot
        </Text>
        <Text x={442} y={316} size={9.5} color={C.label}>
          contact · Priya Sharma, Stripe
        </Text>
        <rect x="442" y="328" width="76" height="24" rx="4" fill={C.signal} />
        <text x="480" y="344" textAnchor="middle" fill={C.ink} fontFamily={SANS} fontSize="11" fontWeight="700">
          Approve
        </text>
        <rect x="526" y="328" width="64" height="24" rx="4" fill="none" stroke={C.line} />
        <text x="558" y="344" textAnchor="middle" fill={C.copy} fontFamily={SANS} fontSize="11" fontWeight="600">
          Reject
        </text>
      </g>
      {step === 4 && (
        <g key="approve">
          <circle cx="480" cy="340" r="15" fill="none" stroke={C.signal} strokeWidth="1.5" className="fm-click" />
          <Pointer x={572} y={384} className="fm-cursor" />
          <g className="fm-done">
            <rect x="548" y="266" width="60" height="16" fill={C.node} />
            <Text x={602} y={278} size={10} color={C.signal} anchor="end">
              approved
            </Text>
            <Text x={442} y={369} size={9.5} color={C.signal}>
              ✓ hubspot contact created
            </Text>
          </g>
        </g>
      )}

      {/* Fallback chain, always visible as a footnote */}
      <text x="24" y="394" fill={C.faint} fontFamily={MONO} fontSize="9">
        gemini-3.5-flash-lite → gemini-3.1-flash-lite → ollama
      </text>
    </Camera>
  );
}
