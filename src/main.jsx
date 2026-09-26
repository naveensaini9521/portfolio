import React, { useEffect, useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight, ArrowRight, Mail, Download, ExternalLink, Menu, X,
  Moon, Sun, Terminal, Server, Database, Cloud, GitBranch, Code2,
  Layers, Wrench, MapPin, Cpu, ShieldCheck, Activity, Boxes,
  CheckCircle2, Sparkles, Briefcase, Award
} from 'lucide-react';
import './styles.css';

const IDENTITY = {
  name: 'Naveen Saini',
  role: 'Backend & DevOps Engineer',
  location: 'Jaipur, IN · Remote-friendly · Open to relocation',
  email: 'mailto:naveensaini6378@gmail.com',
  emailDisplay: 'naveensaini6378@gmail.com',
  github: 'https://github.com/naveensaini9521',
  linkedin: 'https://www.linkedin.com/in/naveen-saini-7ba247262',
  resume: '/Naveen_resume_SD.pdf'
};

const SIGNALS = [
  { value: '10+', label: 'Production API endpoints shipped' },
  { value: '25%', label: 'Latency reduced via query tuning' },
  { value: '85%', label: 'Faster local deploy (one-command)' },
  { value: '4',   label: 'End-to-end systems delivered' }
];

const SKILLS = [
  {
    area: 'Backend Engineering',
    icon: Code2,
    summary: 'Service design, API contracts, data modeling, auth.',
    core: ['Python', 'FastAPI', 'Flask', 'REST', 'JWT', 'Pydantic', 'SQLAlchemy', 'AsyncIO'],
    working: ['OAuth2', 'Celery', 'WebSockets', 'Socket.IO', 'Alembic', 'Uvicorn']
  },
  {
    area: 'Cloud & DevOps',
    icon: Cloud,
    summary: 'Build → ship → run. Containerized, orchestrated, IaC-managed.',
    core: ['Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Jenkins', 'Nginx',
           'Minikube', 'Helm', 'AWS (EC2/VPC/IAM/S3)', 'GitHub Actions', 'Bash'],
    working: ['Gunicorn', 'Prometheus', 'Grafana', 'ArgoCD', 'systemd']
  },
  {
    area: 'Data & Caching',
    icon: Database,
    summary: 'Schema design, indexing, query tuning, caching strategy.',
    core: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'SQLAlchemy ORM'],
    working: ['Aggregation Pipelines', 'TTL & eviction policy', 'Alembic migrations',
              'Composite indexing', 'Connection pooling']
  },
  {
    area: 'Frontend & Interfaces',
    icon: Layers,
    summary: 'Typed, component-driven UIs wired to real APIs.',
    core: ['React', 'TypeScript', 'Redux', 'REST/JSON Integration', 'Bootstrap', 'HTML5', 'CSS3'],
    working: ['Vite', 'Framer Motion', 'Axios', 'Responsive design', 'Accessibility']
  },
  {
    area: 'Systems & Tooling',
    icon: Terminal,
    summary: 'Daily driver: Python, C++, shell, Linux, Git workflows.',
    core: ['Python', 'C++', 'JavaScript', 'SQL', 'Bash', 'Linux', 'Git', 'GitHub', 'VS Code', 'Makefile'],
    working: ['Debugging & profiling', 'Valgrind', 'Postman', 'Vim', 'grep/awk/sed']
  },
  {
    area: 'Security & Reliability',
    icon: ShieldCheck,
    summary: 'Authn/z, network policy, resource governance, probes.',
    core: ['JWT', 'NetworkPolicies', 'Secrets management', 'Rate limiting',
           'TLS/SSL', 'Health probes'],
    working: ['OpenCV (verification)', 'PodDisruptionBudgets', 'RBAC', 'OWASP basics']
  }
];

const EXPERIENCE = [
  {
    role: 'Python Backend Developer Intern',
    company: 'Datacube Softech Pvt. Ltd.',
    location: 'Jaipur, India',
    period: 'May 2024 — Jul 2024',
    scope: 'Owned backend endpoints end-to-end, from schema design through deployment.',
    highlights: [
      'Architected and deployed **10+ REST API endpoints** in Flask + SQLAlchemy, serving production traffic.',
      'Cut p95 response latency by **25%** through composite indexing and query restructuring.',
      'Built integrated UI surfaces (HTML/CSS/Bootstrap/jQuery) directly against the API layer.',
      'Used Scrapy + BeautifulSoup to build extraction pipelines for downstream data services.'
    ]
  }
];

const PROJECTS = [
  {
    title: 'Voting App — Kubernetes Deployment',
    category: 'Cloud Native · DevOps',
    summary:
      'Multi-service voting platform shipped on Kubernetes with automated one-command bootstrap, ingress routing, stateful data services, and production-grade security posture.',
    impact: [
      '**~85%** faster local environment spin-up via bootstrap scripts + Makefile targets.',
      'Redis + PostgreSQL configured as **stateful workloads** with persistent volumes.',
      'Hardened with **Nginx Ingress, NetworkPolicies, liveness/readiness probes, resource limits, and PodDisruptionBudgets**.',
      'Reproducible CI-driven deploy pipeline.'
    ],
    stack: ['Docker', 'Kubernetes', 'Minikube', 'Jenkins', 'Nginx', 'Redis', 'PostgreSQL'],
    repo: `${IDENTITY.github}/voting-app`
  },
  {
    title: 'Real-Time Log Monitoring Platform',
    category: 'Backend · Observability',
    summary:
      'Distributed log ingestion and observability platform: async Python agents stream filesystem events into non-blocking FastAPI services backed by MongoDB, with a React operator console.',
    impact: [
      'Designed **async agent** architecture for continuous filesystem tailing and event streaming.',
      'Built **non-blocking FastAPI** endpoints with MongoDB aggregation for high-throughput queries.',
      'Split **ingestion / API / UI** into independently deployable services for horizontal scale.'
    ],
    stack: ['Python', 'FastAPI', 'AsyncIO', 'MongoDB', 'React'],
    repo: `${IDENTITY.github}/Log_monitoring_system`
  },
  {
    title: 'Smart Voting System with Face Recognition',
    category: 'Full Stack · Applied CV',
    summary:
      'Secure voting platform combining Flask + React, JWT auth, Socket.IO real-time updates, Redis caching, Docker packaging, and OpenCV/KNN-based voter verification.',
    impact: [
      'Implemented **JWT-based authentication** and role-scoped REST APIs.',
      'Integrated **OpenCV + KNN** face verification as a second factor at the ballot.',
      'Delivered **real-time election updates** over Socket.IO.',
      'Containerized all services and added CI-oriented test checks.'
    ],
    stack: ['Flask', 'React', 'MongoDB', 'JWT', 'OpenCV', 'Docker', 'Redis'],
    repo: `${IDENTITY.github}/Smart-Voting-System-with-Face-Recognition`
  },
  {
    title: 'Cloud / DevOps Playground',
    category: 'Infrastructure as Code',
    summary:
      'Reference AWS environment provisioned entirely with Terraform, configured with Ansible, and served through Nginx + Gunicorn — used to validate real deployment topologies.',
    impact: [
      'Provisioned **AWS VPC, subnets, security groups, EC2** and ALB routing via Terraform.',
      'Codified repeatable configuration with **Ansible playbooks and inventories**.',
      'Practiced **public/private subnet isolation, bastion + SSM access**, and blue/green-style cutover.'
    ],
    stack: ['AWS', 'Terraform', 'Ansible', 'Nginx', 'Gunicorn', 'Linux'],
    repo: IDENTITY.github
  }
];

function RichText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**')
          ? <strong key={i}>{p.slice(2, -2)}</strong>
          : <React.Fragment key={i}>{p}</React.Fragment>
      )}
    </>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
});

function App() {
  const prefersReduced = useReducedMotion();

  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = window.localStorage.getItem('ns-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('ns-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = useMemo(
    () => [
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Stack' },
      { id: 'experience', label: 'Experience' },
      { id: 'projects', label: 'Work' },
      { id: 'contact', label: 'Contact' }
    ],
    []
  );

  return (
    <div className="app">
      {/*  NAV  */}
      <header className={scrolled ? 'nav scrolled' : 'nav'}>
        <a className="brand" href="#top" aria-label="Home">
          <span className="brand-mark">NS</span>
          <span className="brand-text">
            Naveen Saini <em>/ engineer</em>
          </span>
        </a>

        <nav className={open ? 'navlinks open' : 'navlinks'} aria-label="Primary">
          {nav.map((x) => (
            <a key={x.id} href={`#${x.id}`} onClick={() => setOpen(false)}>
              {x.label}
            </a>
          ))}
        </nav>

        <div className="navactions">
          <button
            className="iconbtn"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle color theme"
            aria-pressed={theme === 'dark'}
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          <a className="contactbtn" href={IDENTITY.email}>
            Let's talk <ArrowUpRight size={15} />
          </a>

          <button
            className="menu"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="top">
        {/*  HERO */}
        <section className="hero section">
          <div className="hero-grid">
            <div>
              <motion.div className="eyebrow" {...(prefersReduced ? {} : fadeUp(0))}>
                <span className="dot" />
                Backend &amp; DevOps · Shipping production systems
              </motion.div>

              <motion.h1 {...(prefersReduced ? {} : fadeUp(0.05))}>
                I build backend services
                <br />
                and the <em>infrastructure</em> they
                <br />
                run on.
              </motion.h1>

              <motion.p className="hero-lead" {...(prefersReduced ? {} : fadeUp(0.1))}>
                Python engineer focused on APIs, containers, and cloud-native
                delivery. I take systems from schema design to a one-command
                deploy — with the tests, probes, and pipelines to keep them up.
              </motion.p>

              <motion.div className="hero-actions" {...(prefersReduced ? {} : fadeUp(0.15))}>
                <a className="primary" href="#projects">
                  See selected work <ArrowRight size={17} />
                </a>
                <a className="secondary" href={IDENTITY.resume} download>
                  <Download size={16} /> Résumé
                </a>
                <a className="ghost" href={IDENTITY.github} target="_blank" rel="noreferrer">
                  <ExternalLink size={15} /> GitHub
                </a>
                <a className="ghost" href={IDENTITY.linkedin} target="_blank" rel="noreferrer">
                  <ExternalLink size={15} /> LinkedIn
                </a>
              </motion.div>

              <div className="trustline">
                <CheckCircle2 size={15} />
                <span>B.Tech IT · CGPA 8.5/10</span>
                <span className="sep" />
                <MapPin size={14} />
                <span>Jaipur, IN · open to relocation</span>
              </div>
            </div>

            <div className="terminal" aria-hidden="true">
              <div className="termbar">
                <span /><span /><span />
                <label>naveen@prod — zsh</label>
              </div>
              <div className="termcode">
                <p><b>$</b> whoami</p>
                <p className="accent">naveen-saini :: backend / devops</p>

                <p><b>$</b> cat stack.yml</p>
                <p><span className="k">runtime</span>:   <span className="v">python 3.11</span></p>
                <p><span className="k">api</span>:       <span className="v">fastapi · flask · pydantic</span></p>
                <p><span className="k">auth</span>:      <span className="v">jwt · oauth2</span></p>
                <p><span className="k">infra</span>:     <span className="v">docker · k8s · terraform</span></p>
                <p><span className="k">ci/cd</span>:     <span className="v">jenkins · github-actions</span></p>
                <p><span className="k">config</span>:    <span className="v">ansible · helm</span></p>
                <p><span className="k">cloud</span>:     <span className="v">aws · ec2 · vpc · iam</span></p>
                <p><span className="k">observ.</span>:   <span className="v">prometheus · grafana</span></p>

                <p><b>$</b> ls ~/shipped</p>
                <p className="muted">voting-app-k8s/</p>
                <p className="muted">log-monitoring/</p>
                <p className="muted">smart-voting/</p>
                <p className="muted">cloud-playground/</p>

                <p><b>$</b> <span className="cursor">_</span></p>
              </div>
            </div>
          </div>

          {/* Signal bar */}
          <div className="stats">
            {SIGNALS.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="section split">
          <div className="sectionhead">
            <span>01 — About</span>
            <h2>Engineer, end to end.</h2>
            <p>Backend by default, infrastructure when it matters.</p>
          </div>

          <div className="aboutcopy">
            <p className="lead">
              I'm Naveen — a backend and DevOps engineer who owns systems from
              the first schema migration to the one-command deploy.
            </p>

            <p>
              My work sits at the seam between <strong>application code</strong> and{' '}
              <strong>infrastructure</strong>: designing REST APIs in Flask and
              FastAPI, containerizing them with Docker, orchestrating on
              Kubernetes, and provisioning the AWS layer underneath with
              Terraform and Ansible. I care about p95 latency, deploy
              reproducibility, and readable runbooks — not just “it works on my
              machine.”
            </p>

            <p>
              At Datacube Softech I shipped <strong>10+ production API endpoints</strong>{' '}
              and reduced response latency by <strong>25%</strong> through indexing
              and query restructuring. Since then I've built four independent
              systems — each with automated deploys, health probes, and
              security controls baked in — to keep sharpening that same
              end-to-end ownership.
            </p>

            <div className="mini-grid">
              <div>
                <Code2 size={18} />
                <b>Backend first</b>
                <span>Flask · FastAPI · REST · SQLAlchemy</span>
              </div>
              <div>
                <Server size={18} />
                <b>Cloud native</b>
                <span>Docker · Kubernetes · AWS · Terraform</span>
              </div>
              <div>
                <GitBranch size={18} />
                <b>Automation</b>
                <span>Jenkins · GitHub Actions · Makefile</span>
              </div>
            </div>
          </div>

          <aside className="quickfacts">
            <h3>At a glance</h3>
            <ul>
              <li>
                <MapPin size={16} />
                <span>Jaipur, Rajasthan · open to relocation</span>
              </li>
              <li>
                <Award size={16} />
                <span>B.Tech Information Technology, 2022–2026 · CGPA 8.5/10</span>
              </li>
              <li>
                <Activity size={16} />
                <span>Currently deepening Kubernetes + AWS depth</span>
              </li>
              <li>
                <Briefcase size={16} />
                <span>Available for full-time roles — immediate start</span>
              </li>
            </ul>
          </aside>
        </section>

        <section id="skills" className="section">
          <div className="sectionhead">
            <span>02 — Stack</span>
            <h2>What I actually work with.</h2>
            <p>Grouped by capability. <strong>Solid chips = core</strong>, dashed = working knowledge.</p>
          </div>

          <div className="skillgrid">
            {SKILLS.map((group, i) => {
              const Icon = group.icon;
              return (
                <motion.div
                  className="skillcard"
                  key={group.area}
                  {...(prefersReduced ? {} : fadeUp(i * 0.05))}
                >
                  <div className="skillcard-head">
                    <span className="skill-icon"><Icon size={17} /></span>
                    <h3>{group.area}</h3>
                  </div>
                  <p className="skillcard-blurb">{group.summary}</p>

                  <div className="skill-tier">
                    <span className="tier-label">Core</span>
                    <div className="chips">
                      {group.core.map((s) => <span key={s} className="chip-core">{s}</span>)}
                    </div>
                  </div>

                  <div className="skill-tier">
                    <span className="tier-label">Working</span>
                    <div className="chips">
                      {group.working.map((s) => <span key={s} className="chip-soft">{s}</span>)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="experience" className="section split">
          <div className="sectionhead">
            <span>03 — Experience</span>
            <h2>Where I've shipped.</h2>
          </div>

          <div className="timeline">
            {EXPERIENCE.map((job) => (
              <div className="timelineitem" key={job.role}>
                <div className="time">
                  <span>{job.period}</span>
                  <b>{job.role}</b>
                  <small>{job.company} · {job.location}</small>
                  <em className="scope">{job.scope}</em>
                </div>
                <ul>
                  {job.highlights.map((h) => (
                    <li key={h}><RichText text={h} /></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="sectionhead">
            <span>04 — Selected work</span>
            <h2>Systems, not screenshots.</h2>
            <p>
              Four end-to-end builds covering APIs, containers, orchestration,
              IaC, and observability. Each ships with automated deploy and
              production-grade controls.
            </p>
          </div>

          <div className="projectgrid">
            {PROJECTS.map((p, i) => (
              <motion.article
                className="project"
                key={p.title}
                {...(prefersReduced ? {} : fadeUp(i * 0.05))}
              >
                <div className="projecttop">
                  <span className="projectnum">{String(i + 1).padStart(2, '0')}</span>
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${p.title} repository`}
                    className="iconlink"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>

                <span className="projecttype">{p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>

                <ul className="impact">
                  {p.impact.map((b) => (
                    <li key={b}><RichText text={b} /></li>
                  ))}
                </ul>

                <div className="chips">
                  {p.stack.map((t) => <span key={t}>{t}</span>)}
                </div>

                <a className="repolink" href={p.repo} target="_blank" rel="noreferrer">
                  View source <ArrowUpRight size={15} />
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section education">
          <div className="edu-card">
            <div className="eduicon"><Award size={20} /></div>
            <div>
              <span>Education · 2022 — 2026</span>
              <h2>B.Tech, Information Technology</h2>
              <p>Rajasthan Technical University, Kota · CGPA 8.5 / 10</p>
            </div>
          </div>
        </section>

        {/*  CONTACT */}
        <section id="contact" className="section contact">
          <div>
            <span className="eyebrow">05 — Get in touch</span>
            <h2>
              Building something
              <br />
              <em>that needs an owner?</em>
            </h2>
            <p>
              I'm available for full-time backend, platform, or DevOps roles.
              Immediate start · open to relocation.
            </p>
          </div>

          <div className="contactlinks">
            <a href={IDENTITY.email}>
              <Mail size={18} />
              <span>
                <small>Email</small>
                {IDENTITY.emailDisplay}
              </span>
              <ArrowUpRight size={16} />
            </a>

            <a href={IDENTITY.linkedin} target="_blank" rel="noreferrer">
              <ExternalLink size={18} />
              <span>
                <small>LinkedIn</small>
                naveen-saini-7ba247262
              </span>
              <ArrowUpRight size={16} />
            </a>

            <a href={IDENTITY.github} target="_blank" rel="noreferrer">
              <ExternalLink size={18} />
              <span>
                <small>GitHub</small>
                naveensaini9521
              </span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} Naveen Saini</span>
        <span className="footer-mid">
          <Sparkles size={13} /> React · Vite · Framer Motion
        </span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);