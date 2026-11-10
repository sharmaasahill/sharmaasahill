/*
 * Everything the site says lives here. Edit copy in this file, not in components.
 *
 * Sources, checked Nov 2026:
 *   - the five résumé versions Sahil shared (Software Engineer / AI Engineer / Backend / Cloud variants)
 *   - each repository's README and source (thresholds, test counts and route names are quoted from code)
 *   - github.com/sharmaasahill and the live demos, all of which answered 200 when checked
 *
 * The voice follows one idea from his résumé: a model's answer is only useful once it turns into
 * an action someone can trust. Section names follow that path: prompt, context, production,
 * builds, toolchain, and a handoff to a human.
 */

export const site = {
  name: 'Sahil Sharma',
  fullName: 'Sahil Kumar Sharma',
  handle: 'sharmaasahill',
  headline: 'Software Engineer (AI, Backend and Cloud)',
  city: 'Bengaluru',
  timeZone: 'Asia/Kolkata',
  url: 'https://sharmaasahill.vercel.app',
  resume: {
    href: '/_Sahil_Sharma_Software_Engineer_Resume.pdf',
    fileName: 'Sahil_Sharma_Software_Engineer_Resume.pdf',
    label: 'résumé.pdf',
  },
};

export const links = {
  email: 'i.sahilkrsharma@gmail.com',
  github: 'https://github.com/sharmaasahill',
  githubRepos: 'https://github.com/sharmaasahill?tab=repositories',
  linkedin: 'https://www.linkedin.com/in/sharmaasahill/',
  whatsapp: 'https://wa.me/918521900395',
};

// `hint` appears in the mobile menu and the command palette, so each name explains itself.
export const nav = [
  { id: 'intro', label: 'Prompt', hint: 'The short version', icon: 'terminal' },
  { id: 'about', label: 'Context', hint: 'Who is behind the code', icon: 'user' },
  { id: 'experience', label: 'Production', hint: 'Jobs with real traffic', icon: 'briefcase' },
  { id: 'projects', label: 'Builds', hint: 'Five case files', icon: 'branch' },
  { id: 'credentials', label: 'Toolchain', hint: 'Skills and the paper trail', icon: 'award' },
  { id: 'contact', label: 'Handoff', hint: 'Reach a human', icon: 'mail', separated: true },
];

export const cta = {
  request: 'Send a request',
  palette: 'Jump to',
};

/* ── Prompt (hero) ────────────────────────────────────────────── */
export const hero = {
  status: 'Accepting new requests',
  statusShort: 'Accepting requests',
  eyebrow: site.headline,
  firstName: 'Sahil',
  lastName: 'Sharma',
  intro: [
    'Most AI demos stop at the answer. I build the part after it:',
    'validation, bounded retries, and a person on the risky step.',
  ],
  primary: 'Inspect the builds',
  endpointsLabel: 'Endpoints',
  runningLabel: 'Running now',
  running: [
    'Cloud Application Engineer · TCS',
    'Bedrock rules · 10K+ records a batch',
    'Connect + Lex · 15K+ interactions a month',
  ],
  scroll: 'Follow the trace',
};

/* ── 01 Context (about) ───────────────────────────────────────── */
export const about = {
  // Rendered as two lines. The word in `emphasis` is set in italics.
  // One entry per line. The last line is set in the muted colour.
  statement: ['I like knowing', 'what happens', 'behind the feature.'],
  emphasis: 'behind',
  paragraphs: [
    "I'm Sahil, a software engineer at Tata Consultancy Services in Bengaluru. Most of my day is Python on AWS: Bedrock prompts that turn a plain-English request into a filtering rule, DynamoDB tables that remember where every batch got to, and Amazon Connect flows that decide where a customer's call goes.",
    'The part I enjoy is the path a request takes, where its data lives, and what happens when a step fails halfway. So a generated rule is validated before it runs, a retry has a limit, and a prompt change has to pass its evaluation suite in CI before it ships.',
    'Outside work I build agentic tools, retrieval-grounded assistants and ML apps. Each one has tests and CI, and four of the five below have a live URL you can try.',
  ],
  // A few lines of pseudo-Python. Token kinds: c comment, k keyword, f function, t text.
  snippet: [
    [['c', '# the short version']],
    [['t', 'answer = '], ['f', 'model'], ['t', '(prompt)']],
    [['k', 'assert '], ['f', 'schema'], ['t', '.valid(answer)'], ['c', '   # before anything acts']],
    [['f', 'act'], ['t', '(answer, approve='], ['k', 'human'], ['t', ')'], ['c', '    # on the risky step']],
  ],
  principlesLabel: 'House rules',
  principles: [
    {
      title: 'Check what the model says.',
      body: 'Every LLM output fills a schema and is validated before anything acts on it. A rule that fails validation is retried, not run.',
      proof: 'TCS rule engine · FlowMancer · SkillLens',
    },
    {
      title: 'Do the arithmetic in code.',
      body: 'Lead scores, invoice totals and ATS points are added up in Python. A model cannot get a sum wrong if it never does one.',
      proof: 'FlowMancer scoring · SkillLens ATS score',
    },
    {
      title: 'Fail over, not down.',
      body: 'Only temporary errors (rate limits, timeouts, overloads) move a call to the backup model. A bad API key fails at once, with a clear message.',
      proof: 'Gemini → backup Gemini → local Ollama',
    },
    {
      title: 'Measure before claiming.',
      body: 'Accuracy numbers come from labelled cases or from data the model never saw, and they are rerun in CI when prompts change.',
      proof: '30-case eval gate · 22.5% held-out error',
    },
    {
      title: 'Keep a person on the risky step.',
      body: 'CRM writes, reply drafts and sign-offs wait in an approval queue. The assistant can search and propose. It cannot send.',
      proof: 'FlowMancer approval queue',
    },
  ],
  toolkitLabel: 'Daily drivers',
  toolkit: ['Python', 'FastAPI', 'AWS Lambda', 'Amazon Bedrock', 'DynamoDB', 'PostgreSQL', 'LangChain', 'Docker'],
};

/* ── 02 Production (experience) ───────────────────────────────── */
export const experience = [
  {
    id: 'tcs',
    role: 'Cloud Application Engineer',
    company: 'Tata Consultancy Services',
    period: 'Dec 2025 – Present',
    place: 'Bengaluru · On-site',
    type: 'Full-time',
    stack: ['Python', 'Amazon Bedrock', 'Lambda', 'DynamoDB', 'S3', 'API Gateway', 'Connect', 'Lex'],
    metrics: [
      { value: '10K+', label: 'records per batch' },
      { value: '<2 s', label: 'rule processing' },
      { value: '−45%', label: 'manual campaign work' },
      { value: '15K+', label: 'interactions a month' },
    ],
    points: [
      'Engineered an AI lead-processing pipeline on AWS Lambda, Amazon Bedrock (Claude and Nova) and S3 that turns plain-English business requests into executable filtering rules for batches of 10K+ records.',
      'Added generated-rule validation, automated retries and a four-table DynamoDB design for workflow state, with real-time Do Not Disturb registry checks and every timestamp normalised to IST.',
      'Optimised 5+ event-driven services and their API Gateway endpoints, bringing rule processing under two seconds and cutting manual campaign work by 45%.',
      'Replaced keypad-driven DTMF menus with conversational self-service on Amazon Connect and Lex, across 15K+ customer interactions a month.',
      'Wrote Python Lambda integrations between Connect contact flows and backend REST APIs, so customer data decides where each call is routed.',
    ],
  },
  {
    id: 'fundbridge',
    role: 'SDE Intern',
    company: 'Fundbridge Consultation Ltd.',
    period: 'Jul 2025 – Dec 2025',
    place: 'Remote · Lagos, Nigeria',
    type: 'Internship',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs', 'Payments'],
    points: [
      'Built 13+ REST endpoints in Node.js, Express and PostgreSQL for investment and administration workflows, with authenticated CRUD throughout.',
      'Integrated payment gateway services, and traced production failures in transaction processing across the APIs and the application logic.',
      'Delivered full-stack features for authentication, media management and automated financial calculations.',
    ],
  },
  {
    id: 'playzarro',
    role: 'Freelance Full-Stack Developer',
    company: 'PlayZarro',
    href: 'https://playzarro.com/',
    period: 'Apr 2025 – Jun 2025',
    place: 'Remote · Freelance',
    type: 'Freelance',
    stack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Prisma', 'Vitest', 'Playwright'],
    metrics: [
      { value: '295', label: 'deterministic tests' },
      { value: '14 → 60', label: 'FPS on the poker table' },
    ],
    points: [
      'Built backend features for a small-stakes card-game platform in Next.js, PostgreSQL and Prisma: server-side sessions with hashed tokens, bcrypt passwords, and role-based access for players and admins.',
      'Split the game rules into engines that can be tested on their own, then wrote 295 deterministic tests across 10 files for valid actions, state transitions and chip conservation, plus Playwright flows and layout checks at five viewport sizes.',
      'Profiled the poker table and took it from 14 to 60 FPS by restructuring how the simulation runs and removing the most expensive visual effects.',
    ],
  },
];

// The career as a trace: every span on one time axis. Months come from the résumé and the earlier site.
export const trace = {
  id: 'trace 21b9·sahil',
  start: '2021-11',
  spans: [
    { label: 'B.Tech CSE · ITER, SOA University', from: '2021-11', to: '2025-08', kind: 'edu' },
    { label: 'EY Cyber Security Boot Camp', from: '2024-06', to: '2024-07', kind: 'train' },
    { label: 'Amazon ML Summer School', from: '2024-07', to: '2024-07', kind: 'train' },
    { label: 'PlayZarro · freelance', from: '2025-04', to: '2025-06', kind: 'work' },
    { label: 'Fundbridge · SDE intern', from: '2025-07', to: '2025-12', kind: 'work' },
    { label: 'TCS · Cloud Application Engineer', from: '2025-12', to: null, kind: 'work' },
  ],
};

/* ── 03 Builds (projects) ─────────────────────────────────────── */
// `steps` drive the animated scene for each build: one scene state per step.
export const builds = [
  {
    slug: 'flowmancer',
    code: 'B-01',
    name: 'FlowMancer',
    kind: 'AI operations platform',
    window: 'flowmancer · studio · run #1042',
    hook: 'Reads the lead, checks the facts, proposes the next move, then waits for a yes.',
    summary:
      'FlowMancer takes a sales lead, an email or an invoice and returns a structured verdict: a score, a category, a checked total. Then it proposes an action, such as a HubSpot contact, a reply draft or a Finance sign-off. Nothing goes out until a person approves it.',
    steps: [
      {
        title: 'Trigger',
        body: 'A website form, an IMAP inbox, a webhook or the Studio hands in the input. Every step of the run streams to the browser over Server-Sent Events.',
        log: 'POST /api/triggers/form?key=•••• → run #1042 queued',
      },
      {
        title: 'Ground',
        body: "Live web research from DuckDuckGo and the company's own site, plus the account's knowledge base: 900-character chunks with 150 of overlap, embedded locally into ChromaDB, best four by cosine.",
        log: 'research: 5 sources · knowledge: 3 chunks within 0.75 cosine',
      },
      {
        title: 'Crew',
        body: 'In crew mode, four CrewAI agents work in turn: Lead Analyzer, Research Specialist, Scoring Expert, Routing Manager. Quick mode does the same job in one call.',
        log: 'crew: analyzer ✓ → research ✓ → scoring ✓ → routing ✓',
      },
      {
        title: 'Score in code',
        body: 'The model fills a JSON schema and Python adds up six categories out of 100. A lead at 80 or above is High, and a High lead alerts Slack on its own.',
        log: 'score 95/100 · level High · owner Enterprise sales',
      },
      {
        title: 'Approve',
        body: 'The HubSpot write waits in the approval queue until someone signs it off. The Ask FlowMancer assistant can search and propose, but it cannot send.',
        log: 'approval #318 → approved · hubspot contact created',
      },
    ],
    proof: [
      { value: '30/30', label: 'labelled eval cases pass' },
      { value: '90%', label: 'CI accuracy floor' },
      { value: '114', label: 'backend tests, no network' },
      { value: '≈$0.011', label: 'per crew-mode lead' },
    ],
    note: 'Measured on gemini-3.5-flash-lite: 8.2 s per case in quick mode. A crew-mode lead made 17 model requests, about 14,800 tokens. If the main model is busy, the call moves to a backup Gemini model, then to a local Ollama model.',
    stack: ['FastAPI', 'Gemini', 'CrewAI', 'LangChain', 'ChromaDB', 'PostgreSQL', 'Next.js 14', 'Docker'],
    hosting: 'Vercel · Render · Neon',
    live: 'https://flowmancer.vercel.app',
    repo: 'https://github.com/sharmaasahill/FlowMancer',
    wakes: true,
  },
  {
    slug: 'skilllens',
    code: 'B-02',
    name: 'SkillLens',
    kind: 'AI career analytics',
    window: 'skilllens · resume · v3',
    hook: 'What does this role pay in India, and why does my résumé keep getting skipped?',
    summary:
      'Salary estimates in lakhs per annum, built from 97,316 real Naukri postings. An ATS score where every lost point is explained. And Gemini feedback that is not allowed to invent a single number.',
    steps: [
      {
        title: 'Parse',
        body: 'pypdf pulls the text out of the upload. Sections, job dates and degrees, Indian CGPA included, are read without any AI.',
        log: 'pypdf → 612 words · 7 sections · 2 roles',
      },
      {
        title: 'Match skills',
        body: 'Words are matched against an 870-skill taxonomy with aliases, so "k8s" counts as Kubernetes and Tally or GST are recognised too.',
        log: 'taxonomy: 23 skills · 2 aliases normalised',
      },
      {
        title: 'Score',
        body: 'A deterministic ATS score out of 100, over seven parts from contact details to ATS-safe formatting. The same résumé always gets the same score.',
        log: 'ATS 82/100 · −6 impact: 4 bullets have no numbers',
      },
      {
        title: 'Price',
        body: 'Ridge regression and quantile gradient boosting on TF-IDF features, trained on 31,566 postings with a disclosed salary and tested on companies the model never saw.',
        log: 'ridge + boosted quantiles → ₹12 LPA sits at the 68th percentile',
      },
      {
        title: 'Coach',
        body: 'Gemini writes the six-second recruiter read, bullet rewrites and interview questions. Names and contact details are removed first, and a rewrite that adds a number the résumé never had is thrown away.',
        log: 'gemini: 3 rewrites kept · 1 invented number removed',
      },
    ],
    proof: [
      { value: '97,316', label: 'postings, 18,595 companies' },
      { value: '22.5%', label: 'median error on unseen companies' },
      { value: '870', label: 'skills in the taxonomy' },
      { value: '218', label: 'tests: 178 backend, 40 frontend' },
    ],
    note: '54% of estimates land within 25% of the posted salary. Posted pay is what companies advertise, so the estimate is a starting point for a negotiation, not a promise.',
    stack: ['Flask', 'React 19', 'scikit-learn', 'Gemini', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'Docker'],
    hosting: 'Render · Neon',
    live: 'https://skilllens-ljqu.onrender.com',
    repo: 'https://github.com/sharmaasahill/SkillLens',
    wakes: true,
  },
  {
    slug: 'attendance',
    code: 'B-03',
    name: 'Smart Attendance',
    kind: 'Face-recognition attendance',
    window: 'attendance · kiosk · camera 1',
    hook: 'Marks you present only if you are really there, and really you.',
    summary:
      'Attendance by face, with a liveness check a printed photo cannot pass. ArcFace embeddings are matched on the server, and every face image and embedding lives in PostgreSQL, so the backend survives restarts and redeploys.',
    steps: [
      {
        title: 'Quality gate',
        body: 'InsightFace finds the face, then detection score, face size, sharpness and brightness must all pass before a frame is used.',
        log: 'quality: det 0.91 · face 212 px · sharpness 96 → pass',
      },
      {
        title: 'Blink',
        body: 'In the browser, MediaPipe FaceLandmarker waits for a real blink before anything is captured.',
        log: 'mediapipe: blink detected → live face',
      },
      {
        title: 'Turn',
        body: 'The server issues a single-use challenge, valid for 90 seconds, to turn left or right. Twelve frames are captured and the head must sweep at least 12° of yaw. A photo sweeps about 0°.',
        log: 'challenge 7f3c… "turn left" · 12 frames · sweep 18.4°',
      },
      {
        title: 'Embed',
        body: 'The most frontal frames go through ArcFace, which turns each face into a vector of 512 numbers.',
        log: 'arcface (buffalo_l) → 512-d embedding',
      },
      {
        title: 'Match & vote',
        body: 'Cosine k-NN against every enrolled image (k = 5, threshold 0.42). Several frames have to agree before attendance is marked, in IST.',
        log: 'k-NN best 0.83 ≥ 0.42 · 3/3 frames agree → marked 09:02 IST',
      },
    ],
    proof: [
      { value: '512-d', label: 'ArcFace embeddings' },
      { value: '≥12°', label: 'head turn a photo cannot fake' },
      { value: '0.42', label: 'cosine match threshold' },
      { value: '1', label: 'account per face' },
    ],
    note: 'Why geometry instead of a model: a passive anti-spoofing model was tried first. It flagged all 64 real enrollment photos as spoofs, which would have locked everyone out.',
    stack: ['FastAPI', 'InsightFace', 'ONNX Runtime', 'MediaPipe', 'OpenCV', 'PostgreSQL', 'React', 'Docker'],
    hosting: 'Vercel · Hugging Face Spaces · Neon',
    live: 'https://smart-attendance-system-kappa-brown.vercel.app',
    repo: 'https://github.com/sharmaasahill/Smart_Attendance_System',
    extra: { label: 'API docs', href: 'https://sharmaasahill-smart-attendance-api.hf.space/docs' },
    wakes: true,
  },
  {
    slug: 'meetsync',
    code: 'B-04',
    name: 'MeetSync',
    kind: 'Meeting calendar backend',
    window: 'meetsync · POST /api/meetings',
    hook: 'Books the meeting, or says who is busy and when everyone is free.',
    summary:
      'A Spring Boot REST API for employee calendars. It books meetings with several people, catches clashes before they are saved, and searches for slots where everyone is free inside working hours.',
    steps: [
      {
        title: 'Request',
        body: 'POST /api/meetings with a title, a time range, the organiser and the participants.',
        log: 'POST /api/meetings {"start": "14:30", "end": "15:30", participants: 2}',
      },
      {
        title: 'Validate',
        body: 'Bean Validation checks the request DTO, then the business rules: start before end, not in the past, people who exist, and inside 09:00 to 18:00.',
        log: '@Valid MeetingRequestDto → ok · inside 09:00–18:00',
      },
      {
        title: 'Detect',
        body: 'A JPA query looks for overlapping meetings for every participant. A clash stops the booking with a 400, and the conflict-check endpoint lists who is busy.',
        log: 'findConflictingMeetingsForParticipant → 2 clashes → 400',
      },
      {
        title: 'Search',
        body: "The free-slot search merges everyone's meetings in time order and returns the gaps inside working hours.",
        log: 'POST /api/calendar/free-slots → 09:30–14:00, 16:00–18:00',
      },
      {
        title: 'Book',
        body: 'The meeting is saved in a single transaction, and the API answers 201 Created.',
        log: '201 Created · meeting #4 saved in one transaction',
      },
    ],
    proof: [
      { value: '54', label: 'JUnit 5 and Mockito tests' },
      { value: '8', label: 'MockMvc integration tests' },
      { value: '28', label: 'REST endpoints' },
      { value: '09–18', label: 'working hours enforced' },
    ],
    note: 'Controllers, request DTOs, services and repositories are kept apart, and one exception handler turns every failure into a clear JSON error.',
    stack: ['Java 17', 'Spring Boot 3.2', 'Spring Data JPA', 'Hibernate', 'H2', 'Maven', 'JUnit 5', 'Mockito'],
    hosting: 'Runs locally with ./mvnw',
    repo: 'https://github.com/sharmaasahill/MeetSync',
  },
  {
    slug: 'pulse',
    code: 'B-05',
    name: 'Pulse',
    kind: 'Real-time Kanban',
    window: 'pulse · project:42 · 3 online',
    hook: 'Move a card, and everyone on the project watches it move.',
    summary:
      "A Kanban board for small teams. Drag a task and it moves on every teammate's screen, while Owner, Editor and Viewer permissions are checked on the server, not just hidden in the UI.",
    steps: [
      {
        title: 'Invite',
        body: 'The owner shares an invite link or a six-character access code with no look-alike characters, plus a default role and an optional expiry.',
        log: 'invite K7QM2X · role EDITOR · expires in 24 h',
      },
      {
        title: 'Join',
        body: 'Each browser joins two Socket.IO rooms on the /ws namespace: one for the project, one for the user.',
        log: 'socket join → project:42 + user:sahil · 3 online',
      },
      {
        title: 'Guard',
        body: 'Roles rank VIEWER below EDITOR below OWNER. Changing a ticket needs EDITOR, so a viewer’s drag is refused with a 403.',
        log: 'PATCH /tickets/:id as VIEWER → 403 (needs EDITOR)',
      },
      {
        title: 'Move',
        body: 'An editor drags the card, with dnd-kit on desktop and a quick-move menu on phones, and the API saves the new status.',
        log: 'PATCH /tickets/:id status=DONE as EDITOR → 200',
      },
      {
        title: 'Broadcast',
        body: "The server emits ticket:updated to the project room, logs the activity and rings every teammate's bell. Logging out cleans up the room subscriptions.",
        log: 'emit ticket:updated → 3 clients · "Sahil dropped a task in Done"',
      },
    ],
    proof: [
      { value: '3', label: 'roles, enforced on the server' },
      { value: '6', label: 'characters per access code' },
      { value: '2', label: 'socket rooms per session' },
    ],
    note: 'Stale room subscriptions are removed on logout, so a second account in the same browser never receives the first account’s updates.',
    stack: ['Next.js 14', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Socket.IO', 'Zustand', 'dnd-kit'],
    hosting: 'Netlify',
    live: 'https://pulse-front.netlify.app/',
    repo: 'https://github.com/sharmaasahill/pulse',
  },
];

export const archive = [
  {
    name: 'QuickPoll',
    description: 'Polls where every vote and like updates for everyone at once, over WebSockets.',
    stack: 'FastAPI · Next.js',
    href: 'https://quickpoll-three.vercel.app',
    kind: 'Live',
  },
  {
    name: 'Lead Scoring API',
    description: "Scores a CSV of leads out of 100: up to 50 from rules, up to 50 from Gemini's read of buying intent.",
    stack: 'FastAPI · Gemini',
    href: 'https://github.com/sharmaasahill/intent_scoring_api',
    kind: 'Code',
  },
  {
    name: 'Offset Ledger',
    description: 'Carbon-credit ledger with deterministic IDs and an append-only event log, from CREATED to RETIRED.',
    stack: 'FastAPI · SQLAlchemy',
    href: 'https://github.com/sharmaasahill/offset-credit-ledger',
    kind: 'Code',
  },
  {
    name: 'MausamAPI',
    description: 'Weather for any Indian pincode, cached in the database: about 10 ms from cache against 500 ms from OpenWeather.',
    stack: 'FastAPI · SQLite',
    href: 'https://github.com/sharmaasahill/MausamAPI',
    kind: 'Code',
  },
  {
    name: 'Webhook Receiver',
    description: 'Verifies GitHub webhook signatures (SHA-256), stores push and pull-request events in MongoDB and shows them live.',
    stack: 'Flask · MongoDB',
    href: 'https://github.com/sharmaasahill/webhook-repo',
    kind: 'Code',
  },
  {
    name: 'Goal Platform',
    description: 'Breaks a big goal into a 6-week to 6-month journey of weekly chunks, with check-ins and an AI tutor.',
    stack: 'React · Express · SQLite',
    href: 'https://goal-achievement-platform.vercel.app',
    kind: 'Live',
  },
  {
    name: 'S3 Static Hosting',
    description: 'Terraform for S3, CloudFront, Route 53 and ACM, with GitHub Actions syncing the site on every push.',
    stack: 'Terraform · AWS',
    href: 'https://github.com/sharmaasahill/Terraform-S3-Static-Site-Hosting',
    kind: 'Code',
  },
];

/* ── 04 Toolchain (skills and credentials) ────────────────────── */
export const certifications = [
  { year: '2026', title: 'AWS Certified AI Practitioner', issuer: 'Amazon Web Services · AIF-C01' },
  { year: '2026', title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services · CLF-C02' },
  { year: '2024', title: 'Cloud Foundations, Architecting & Security', issuer: 'AWS Academy' },
];

export const training = [
  {
    year: '2024',
    title: 'Amazon ML Summer School',
    badge: 'Selected participant',
    body: 'Eight topics, including supervised learning, deep neural networks, generative AI, large language models and reinforcement learning.',
  },
  {
    year: '2024',
    title: 'EY Cyber Security Boot Camp',
    badge: 'Top 1% performer',
    body: "Completed under EY Global Delivery Services' Curriculum Immersion Program.",
  },
];

export const education = {
  degree: 'B.Tech, Computer Science and Engineering',
  school: 'ITER, Siksha ‘O’ Anusandhan University',
  place: 'Bhubaneswar, Odisha',
  years: 'Nov 2021 – Aug 2025',
};

export const skills = [
  { group: 'Generative AI', items: ['Amazon Bedrock (Claude, Nova)', 'Google Gemini', 'LangChain', 'CrewAI', 'Ollama', 'Prompt engineering', 'Structured outputs'] },
  { group: 'Retrieval & agents', items: ['RAG', 'Embeddings', 'ChromaDB', 'Semantic search', 'Tool calling', 'Multi-agent workflows', 'Human-in-the-loop approvals'] },
  { group: 'Evaluation', items: ['LLM eval suites', 'JSON Schema validation', 'Model fallback', 'Token and latency tracking', 'Pytest'] },
  { group: 'Machine learning', items: ['scikit-learn', 'TF-IDF', 'Ridge', 'Gradient boosting', 'TruncatedSVD', 'InsightFace / ArcFace', 'ONNX Runtime', 'OpenCV', 'MediaPipe'] },
  { group: 'Languages', items: ['Python', 'Java 17', 'TypeScript', 'JavaScript', 'SQL'] },
  { group: 'Backend', items: ['FastAPI', 'Flask', 'Pydantic', 'Spring Boot', 'Spring Data JPA', 'Node.js', 'Express', 'NestJS', 'OpenAPI'] },
  { group: 'Data', items: ['PostgreSQL', 'SQLAlchemy', 'Alembic', 'Prisma', 'SQLite', 'Pandas', 'NumPy'] },
  { group: 'AWS', items: ['Lambda', 'API Gateway', 'S3', 'DynamoDB', 'IAM', 'Bedrock', 'Connect', 'Lex', 'CloudFront'] },
  { group: 'Delivery & testing', items: ['Docker', 'GitHub Actions', 'CI/CD', 'JUnit 5', 'Mockito', 'Vitest', 'Playwright', 'Maven', 'Git'] },
  { group: 'Frontend', items: ['React', 'Next.js'] },
];

/* ── 05 Handoff (contact) ─────────────────────────────────────── */
export const contact = {
  eyebrow: 'Handoff',
  title: ['Every good pipeline', 'ends with a human.'],
  body: [
    'This is the approval step. Roles, freelance work and questions',
    'about the builds all land in my inbox, and I answer them myself.',
  ],
  fields: {
    name: { label: 'from', placeholder: 'Your name' },
    email: { label: 'reply_to', placeholder: 'you@company.com' },
    message: { label: 'payload', placeholder: 'What should we build, fix or automate?' },
  },
  idle: 'No bots on this end. I read every message.',
  submit: 'Send for approval',
  success: "Delivered. I'll read it and reply myself.",
  alt: 'Rather skip the form?',
  copy: 'Copy email',
  copied: 'Copied',
  sign: '// end of trace',
};

export const footer = {
  tagline: 'Make it work, then make it boring.',
  github: 'More code on GitHub',
  top: 'Back to the prompt',
};
