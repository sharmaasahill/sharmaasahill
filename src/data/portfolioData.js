import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaPython, FaInstagram,
} from 'react-icons/fa';
import {
    SiExpress, SiSqlite, SiVite, SiTypescript, SiNextdotjs, SiNestjs, SiFlask, SiFastapi, SiMongodb, SiPostgresql,
} from 'react-icons/si';
import { HiCode, HiServer, HiGlobeAlt, HiLightningBolt, HiShieldCheck, HiCube } from 'react-icons/hi';

/* ── Navigation Links ─────────────────────────────────────────── */
export const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Services', to: 'services' },
    { name: 'Contact', to: 'contact' },
];

/* ── Hero ─────────────────────────────────────────────────────── */
export const heroData = {
    greeting: 'Hello, I\'m',
    name: 'Sahil Sharma',
    title: 'Full Stack Developer & Freelancer',
    tagline: 'I build fast, scalable web applications that look great and work even better. Whether you need a complete product or a single feature, I take it from idea to launch.',
    resumeUrl: '/src/assets/Sahil-Sharma-SDE.pdf',
};

/* ── About ────────────────────────────────────────────────────── */
export const aboutData = {
    intro: "I'm a Full Stack Developer who loves building things that work well. I've shipped e-commerce platforms, AI-powered APIs, real-time dashboards, and more for clients across different continents. I don't just build features, I build products which people actually want to use.",
    objective: 'Most developers focus on the code. I focus on the outcome. Every project I take on starts with one question -> What does the end user actually need? That thinking shapes everything I build. Clean architecture, smart tech choices, and shipping something that matters.',
    highlights: [
        { label: 'Experience', value: '2+ Years' },
        { label: 'Projects', value: '23+' },
        { label: 'Tech Stack', value: '15+' },
        { label: 'Clients', value: '5+' },
    ],
};

/* ── Skills ───────────────────────────────────────────────────── */
export const skillCategories = [
    {
        title: 'Frontend',
        skills: [
            { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
            { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
            { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
            { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
            { name: 'React', icon: FaReact, color: '#61DAFB' },
            { name: 'Next.js', icon: SiNextdotjs, color: '#888888' },
        ],
    },
    {
        title: 'Backend',
        skills: [
            { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
            { name: 'Express', icon: SiExpress, color: '#888888' },
            { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
            { name: 'Python', icon: FaPython, color: '#3776AB' },
            { name: 'Flask', icon: SiFlask, color: '#888888' },
            { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
        ],
    },
    {
        title: 'Database',
        skills: [
            { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
            { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
            { name: 'SQLite', icon: SiSqlite, color: '#003B57' },
        ],
    },
    {
        title: 'Tools',
        skills: [
            { name: 'Git', icon: FaGitAlt, color: '#F05032' },
            { name: 'GitHub', icon: FaGithub, color: '#888888' },
            { name: 'Vite', icon: SiVite, color: '#646CFF' },
        ],
    },
];

/* ── Projects ─────────────────────────────────────────────────── */
export const projects = [
    {
        title: 'Smart Attendance System',
        description: 'Full-stack attendance system with face recognition, live analytics, and role-based access. Built it for my college and it replaced their entire manual process.',
        tech: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        image: null,
        liveUrl: '#',
        githubUrl: 'https://github.com/sharmaasahill/Smart_Attendance_System',
    },
    {
        title: 'Project Management Dashboard',
        description: 'Ticket management dashboard with authentication, real-time updates, and team workspaces. Built end-to-end with Next.js and NestJS.',
        tech: ['TypeScript', 'Next.js', 'NestJS'],
        image: null,
        liveUrl: '#',
        githubUrl: 'https://github.com/sharmaasahill/ticket-dashboard',
    },
    {
        title: 'AI Lead Scoring API',
        description: 'Backend service that scores and qualifies leads using rule-based logic combined with AI. Reduced manual review time by ~70%.',
        tech: ['Python', 'FastAPI', 'AI/ML'],
        image: null,
        liveUrl: '#',
        githubUrl: 'https://github.com/sharmaasahill/intent_scoring_api',
    },
    {
        title: 'Real-Time Webhook Dashboard',
        description: 'Real-time dashboard that captures GitHub webhook events -> pushes, PRs, merges, and displays live. Flask + MongoDB under the hood.',
        tech: ['Python', 'Flask', 'MongoDB', 'HTML'],
        image: null,
        liveUrl: '#',
        githubUrl: 'https://github.com/sharmaasahill/webhook-repo',
    },
    {
        title: 'Investment Platform API',
        description: 'Contributed to backend for an investment platform with RESTful endpoints, admin panel, full CRUD. Built during my internship at F-Bridge Africa.',
        tech: ['Node.js', 'Express', 'JavaScript'],
        image: null,
        liveUrl: '#',
        githubUrl: 'https://github.com/Ogirimaobey/jjb24-backend',
    },
    {
        title: 'View All Projects →',
        description: 'More projects on my GitHub -> web apps, APIs, dashboards, and tools.',
        tech: ['React', 'Node.js', 'Python', 'TypeScript'],
        image: null,
        liveUrl: 'https://github.com/sharmaasahill?tab=repositories',
        githubUrl: 'https://github.com/sharmaasahill?tab=repositories',
    },
];

/* ── Experience ───────────────────────────────────────────────── */
export const experiences = [
    {
        company: 'Tata Consultancy Services',
        role: 'Assistant System Engineer',
        duration: 'Dec 2025 – Present',
        type: 'Full-time',
        location: 'Chennai, Tamil Nadu, India · On-site',
        description: 'Working with cross-functional teams on enterprise-level systems. Learning how large-scale software is built, maintained, and shipped in production.',
    },
    {
        company: 'F-Bridge Africa',
        role: 'Software Developer Intern',
        duration: 'Oct 2025 – Dec 2025',
        type: 'Internship',
        location: 'Lagos State, Nigeria · Remote',
        description: 'Built the backend from scratch with API endpoints, admin panel, full CRUD. Node.js, Express, PostgreSQL. Shipped everything they asked for.',
    },
    {
        company: 'Detour Berlin',
        role: 'Software Developer',
        duration: 'Apr 2025 – Sep 2025',
        type: 'Freelance',
        location: 'Berlin, Germany · Remote',
        description: 'Built their luxe platform end-to-end with Next.js, TypeScript, Tailwind CSS. 500+ active users, 99.9% uptime since day one.',
    },
    {
        company: 'Amazon',
        role: 'ML Summer School 2024 Trainee',
        duration: 'Jul 2024',
        type: 'Selected Participant',
        location: 'Remote',
        description: 'Got selected for Amazon\'s ML program. Hands-on work with neural networks, deep learning, and supervised/unsupervised learning.',
    },
    {
        company: 'EY (Ernst & Young)',
        role: 'Cybersecurity Trainee',
        duration: 'Jun 2024 – Jul 2024',
        type: 'Training',
        location: 'Bhubaneswar, Odisha, India',
        description: 'Completed their cybersecurity immersion with threat detection, incident response, vulnerability assessment, ethical hacking.',
    },
    {
        company: 'HealthoReview',
        role: 'Web Designer & Developer',
        duration: 'Apr 2023 – Jul 2023',
        type: 'Part-time',
        location: 'Kolkata, West Bengal, India · Remote',
        description: 'Designed responsive websites, handled SEO. User engagement went up 30%, organic traffic grew significantly.',
    },
];

/* ── Services ─────────────────────────────────────────────────── */
export const services = [
    {
        title: 'Web Applications',
        description: 'Dashboards, e-commerce stores, and internal tools. I build web apps from scratch with the stack that fits best.',
        icon: HiGlobeAlt,
    },
    {
        title: 'Full Stack Development',
        description: 'Frontend, backend, database, deployment. I handle the full picture. One person, fewer moving parts.',
        icon: HiCode,
    },
    {
        title: 'API & Backend',
        description: 'Clean REST APIs, auth systems, database design, and third-party integrations.',
        icon: HiServer,
    },
    {
        title: 'Performance & SEO',
        description: 'Faster load times, better Core Web Vitals, proper SEO setup. Making sure your site actually gets found.',
        icon: HiLightningBolt,
    },
    {
        title: 'Maintenance & Support',
        description: 'Bug fixes, new features, security patches after launch. I stick around as long as you need me.',
        icon: HiShieldCheck,
    },
    {
        title: 'AI & Automation',
        description: 'AI-powered features, lead scoring, data processing pipelines. I can plug intelligence into your existing product.',
        icon: HiCube,
    },
];

/* ── Contact / Socials ────────────────────────────────────────── */
export const contactInfo = {
    email: 'i.sahilkrsharma@gmail.com',
    phone: '+91 98765 43210',
    socials: [
        { name: 'GitHub', url: 'https://github.com/sharmaasahill', icon: FaGithub },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sharmaasahill/', icon: FaLinkedin },
        { name: 'WhatsApp', url: 'https://api.whatsapp.com/qr/DJRKRNUD3AXCB1?autoload=1&app_absent=0', icon: FaWhatsapp },
        { name: 'Instagram', url: 'https://www.instagram.com/sharmaasahill/', icon: FaInstagram },
        { name: 'Email', url: 'mailto:i.sahilkrsharma@gmail.com', icon: FaEnvelope },
    ],
};
