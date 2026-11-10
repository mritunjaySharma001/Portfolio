import {
  ArchNode,
  AssistantEntry,
  Education,
  Experience,
  Profile,
  Project,
  SkillGroup,
  SkillLevel,
  Stat,
  Training,
} from '../models/portfolio.models';

export const PROFILE: Profile = {
  name: 'Mritunjay Sharma',
  initials: 'MS',
  title: 'Full Stack .NET Engineer',
  roles: [
    'Full Stack .NET Engineer',
    'Angular Developer',
    'REST API Architect',
    'SQL Server Optimizer',
    'Azure Cloud Enthusiast',
  ],
  location: 'Gurugram, Haryana, India',
  email: 'mritunjay.sharma1954@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mritunjay-sharma2021',
  photo: 'assets/profile.jpg',
  resume: 'assets/Mritunjay_Sharma_Resume.pdf',
  tagline:
    'I build scalable, secure, high-performance enterprise applications with C#, .NET, Angular, SQL Server and Azure, and I use AI-assisted workflows to ship them faster without cutting corners.',
  summary: [
    'Software Engineer with 5+ years of experience designing, developing and maintaining enterprise PLM/ERP platforms using C#, .NET Core, ASP.NET MVC, Web API, Angular, TypeScript, SQL Server and Microsoft Azure.',
    'I specialise in clean architecture, SOLID principles and robust REST API design, and I enjoy turning complex business problems into maintainable, production-ready solutions — from requirements all the way through deployment.',
    'AI is part of my everyday engineering loop: I use GitHub Copilot, Cursor and Claude for scaffolding, refactoring legacy code, generating test cases and reviewing changes, and I treat every suggestion with the same scrutiny as a code review. I also mentor team members and work closely with product, QA and support teams.',
  ],
};

export const STATS: Stat[] = [
  { value: '5+', label: 'Years of experience' },
  { value: '20+', label: 'Enterprise modules & APIs' },
  { value: '15+', label: 'Production deployments' },
  { value: '35%', label: 'Faster API responses' },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Backend',
    category: 'backend',
    icon: 'server',
    skills: ['C#', '.NET Core', 'ASP.NET Core', 'ASP.NET MVC', 'Web API', 'REST', 'LINQ', 'Entity Framework Core', 'Async/Await'],
  },
  {
    title: 'Frontend',
    category: 'frontend',
    icon: 'layout',
    skills: ['Angular 15+', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'RxJS'],
  },
  {
    title: 'Database',
    category: 'data',
    icon: 'database',
    skills: ['SQL Server', 'T-SQL', 'Stored Procedures', 'Triggers', 'Query Optimization', 'Indexing'],
  },
  {
    title: 'Cloud & DevOps',
    category: 'cloud',
    icon: 'cloud',
    skills: ['Microsoft Azure', 'Azure Functions', 'Azure App Service', 'Azure DevOps', 'CI/CD', 'Docker', 'Git', 'GitHub', 'GitLab'],
  },
  {
    title: 'AI-Assisted Engineering',
    category: 'ai',
    icon: 'sparkles',
    skills: ['GitHub Copilot', 'Cursor', 'Claude', 'Prompt Engineering', 'AI-assisted Refactoring', 'AI-assisted Code Review', 'AI-assisted Test Generation'],
  },
  {
    title: 'Architecture & Security',
    category: 'practices',
    icon: 'layers',
    skills: ['Clean Architecture', 'Microservices', 'Repository Pattern', 'SOLID', 'Design Patterns', 'Dependency Injection', 'JWT', 'OAuth2', 'RBAC'],
  },
  {
    title: 'Tools & Practices',
    category: 'practices',
    icon: 'tool',
    skills: ['Visual Studio', 'VS Code', 'Postman', 'Swagger', 'Agile / Scrum', 'Code Reviews', 'Unit Testing'],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    company: 'ReverseLogix',
    location: 'Gurugram, Haryana',
    period: 'Sep 2026 – Present',
    current: true,
    roles: [{ title: 'Software Engineer', period: 'Sep 2026 – Present' }],
    highlights: [
      'Building and enhancing features for an enterprise returns-management (reverse logistics) SaaS platform.',
      'Working across the .NET backend, REST APIs, SQL Server and Angular front end within an Agile team.',
    ],
  },
  {
    company: 'Royal Datamatics Pvt. Ltd.',
    location: 'Faridabad / Okhla, Delhi NCR',
    period: 'Feb 2021 – May 2026',
    note: 'BlueKaktus — PLM & ERP for the fashion industry',
    roles: [
      { title: 'Senior Software Engineer', period: 'Oct 2024 – May 2026' },
      { title: 'Software Engineer', period: 'Oct 2023 – Oct 2024' },
      { title: 'Associate Software Engineer', period: 'Jul 2021 – Oct 2023' },
      { title: 'Software Developer Trainee', period: 'Feb 2021 – Jul 2021' },
    ],
    highlights: [
      'Engineered enterprise-grade PLM/ERP web applications using Angular, .NET Core, ASP.NET MVC, SQL Server, REST APIs and Microsoft Azure.',
      'Architected REST APIs for 20+ enterprise modules and built configurable file upload/validation pipelines, cutting manual effort by 40% and raising data accuracy by 50%.',
      'Optimised SQL queries and stored procedures, improving backend throughput by 35%, and established centralised authentication for secure, compliant access control.',
      'Refactored legacy codebases into a modular architecture, reducing technical debt and accelerating bug resolution by 30%.',
      'Managed CI/CD pipelines for 15+ production deployments, reducing release time by 40%.',
      'Led a cross-functional team of 5 engineers and mentored 3+ junior developers, boosting sprint delivery efficiency by 20%.',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: 'Fashion PLM & ERP Platform',
    client: 'Arvind — BK2',
    period: '2023 – 2025',
    stack: ['Angular 15', '.NET Core', 'SQL Server', 'Microsoft Azure'],
    summary:
      'End-to-end product lifecycle and ERP platform streamlining apparel manufacturing workflows for 30+ business users.',
    highlights: [
      'Delivered Costing, BOM and Vendor Management modules.',
      'Built a configurable Excel ingestion engine with schema mapping & validation — 40% less manual processing.',
      'RESTful APIs and stored procedures for high-volume transactions with role-based auth and full audit tracking.',
      'SQL optimisation and refactoring reduced API response time by 35%.',
    ],
  },
  {
    name: 'TASVA Fashion PLM System',
    client: 'TASVA',
    period: '2022 – 2023',
    stack: ['Angular 15', 'ASP.NET MVC', 'SQL Server', 'Microsoft Azure'],
    summary:
      'Product lifecycle management system for a premium fashion brand covering design, sourcing and sampling.',
    highlights: [
      'Designed Techpack, Raw Material Tracker, Sampling Tracker and Master Data modules.',
      'Dashboards for 50+ users backed by 10+ consolidated REST APIs.',
      'Reusable Angular components and modular .NET services.',
      'Improved workflow efficiency by 35% and cut reporting inconsistencies by 25%.',
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Dr. A.P.J. Abdul Kalam Technical University',
    period: '2018 – 2020',
    detail: 'CGPA: 7.9',
  },
  {
    degree: "Bachelor's Degree, Information Technology",
    institution: 'Jagannath University, Jaipur',
    period: '2014 – 2017',
  },
];

export const TRAININGS: Training[] = [
  {
    title: 'Java with Android',
    org: 'MCN Solutions Pvt. Ltd., Noida',
    period: 'Jun 2019 – Jul 2019',
    detail: 'Hands-on training in Java and Android application fundamentals.',
  },
  {
    title: 'Business Intelligence, Big Data & Hadoop',
    org: 'Insight Sigma & Aath Info Solution',
    period: 'Jun 2016 – Jul 2016',
    detail: 'MSBI for data analytics on AdventureWorks, Hadoop & MapReduce, and enterprise big-data architecture.',
  },
];

/** Self-assessed proficiency for core skills (text levels — no made-up percentages). */
export const SKILL_LEVELS: Record<string, SkillLevel> = {
  'C#': 'Expert',
  '.NET Core': 'Expert',
  'ASP.NET Core': 'Advanced',
  'ASP.NET MVC': 'Expert',
  'Web API': 'Expert',
  REST: 'Expert',
  LINQ: 'Expert',
  'Entity Framework Core': 'Advanced',
  'Angular 15+': 'Advanced',
  TypeScript: 'Advanced',
  RxJS: 'Proficient',
  'SQL Server': 'Expert',
  'T-SQL': 'Expert',
  'Stored Procedures': 'Expert',
  'Query Optimization': 'Advanced',
  'Microsoft Azure': 'Proficient',
  'Azure DevOps': 'Proficient',
  'CI/CD': 'Advanced',
  Docker: 'Proficient',
  'Clean Architecture': 'Advanced',
  SOLID: 'Advanced',
  JWT: 'Advanced',
  RBAC: 'Advanced',
  'GitHub Copilot': 'Advanced',
  Cursor: 'Advanced',
  Claude: 'Advanced',
  'Prompt Engineering': 'Proficient',
};

const ARVIND = 'Fashion PLM & ERP (Arvind)';
const TASVA = 'TASVA PLM';
const RLX = 'ReverseLogix';
const DAILY = 'Daily engineering workflow';

/** Where each skill has been used — shown as a popover on the skill chips. */
export const SKILL_PROJECTS: Record<string, string[]> = {
  'C#': [RLX, ARVIND, TASVA],
  '.NET Core': [RLX, ARVIND],
  'ASP.NET MVC': [TASVA],
  'Web API': [RLX, ARVIND, TASVA],
  REST: [RLX, ARVIND, TASVA],
  'Angular 15+': [RLX, ARVIND, TASVA],
  TypeScript: [RLX, ARVIND, TASVA],
  'SQL Server': [RLX, ARVIND, TASVA],
  'Stored Procedures': [ARVIND, TASVA],
  'Query Optimization': [ARVIND],
  'Microsoft Azure': [ARVIND, TASVA],
  'CI/CD': ['15+ production deployments'],
  RBAC: [ARVIND],
  'Clean Architecture': ['Legacy refactor at Royal Datamatics'],
  'GitHub Copilot': [DAILY],
  Cursor: [DAILY],
  Claude: [DAILY],
  'AI-assisted Refactoring': ['Legacy refactor at Royal Datamatics', DAILY],
};

/** Layers of the "How I build" architecture diagram. */
export const ARCH_NODES: ArchNode[] = [
  {
    id: 'ui',
    title: 'Angular SPA',
    subtitle: 'TypeScript · RxJS',
    icon: 'layout',
    detail: 'Reusable, modular Angular components and dashboards for business users.',
    points: [
      'Dashboards for 50+ users on the TASVA PLM system',
      'Shared component libraries across Costing, BOM and Vendor modules',
      'Reactive forms and RxJS-driven data flows',
    ],
  },
  {
    id: 'api',
    title: 'ASP.NET Core Web API',
    subtitle: 'REST · JWT · RBAC',
    icon: 'server',
    detail: 'Secure, versioned REST APIs with centralised authentication and role-based access.',
    points: [
      'REST APIs for 20+ enterprise modules',
      'Centralised authentication for secure, compliant access control',
      'Swagger-documented contracts consumed by Angular clients',
    ],
  },
  {
    id: 'domain',
    title: 'Services & EF Core',
    subtitle: 'Clean Architecture · SOLID',
    icon: 'layers',
    detail: 'Business logic in testable services behind repositories and dependency injection.',
    points: [
      'Configurable Excel ingestion engine: 40% less manual processing',
      'Legacy code refactored into modules, cutting bug-fix time by 30%',
      'Audit tracking on high-volume transactions',
    ],
  },
  {
    id: 'db',
    title: 'SQL Server',
    subtitle: 'T-SQL · Stored Procedures',
    icon: 'database',
    detail: 'Tuned queries, indexes and stored procedures for high-volume workloads.',
    points: [
      'Query and stored-procedure tuning: 35% faster API responses',
      'Indexing strategy for large PLM datasets',
      'Data validation pipelines that raised data accuracy by 50%',
    ],
  },
  {
    id: 'cloud',
    title: 'Microsoft Azure',
    subtitle: 'App Service · Functions · DevOps',
    icon: 'cloud',
    detail: 'Hosting, background jobs and CI/CD pipelines on Azure.',
    points: [
      'CI/CD pipelines for 15+ production deployments',
      'Release time cut by 40%',
      'Azure App Service and Azure Functions workloads',
    ],
  },
  {
    id: 'ai',
    title: 'AI-assisted delivery',
    subtitle: 'Copilot · Cursor · Claude',
    icon: 'sparkles',
    detail: 'How the code gets built: AI speeds up the loop, and engineering judgement keeps it correct.',
    points: [
      'Scaffolding endpoints, DTOs and Angular components',
      'Refactoring legacy code and generating unit-test cases',
      'Every AI suggestion is reviewed, tested and owned before it merges',
    ],
  },
];

/** Knowledge base for the client-side portfolio assistant (no LLM — keyword intent matching). */
export const ASSISTANT_KB: AssistantEntry[] = [
  // Topic-specific entries first: ties are broken in favour of earlier entries.
  {
    intents: ['.net', 'dotnet', 'c#', 'csharp', 'backend', 'asp.net', 'api', 'apis', 'rest', 'web api', 'entity framework', 'ef core'],
    answer:
      "C# and .NET are his core stack. He has architected REST APIs for 20+ enterprise modules with ASP.NET Core, ASP.NET MVC, EF Core and LINQ, following Clean Architecture and SOLID, and he's set up JWT/RBAC security.",
    actions: [
      { label: 'How I build', href: '#architecture' },
      { label: 'Skills', href: '#skills' },
    ],
  },
  {
    intents: ['angular', 'frontend', 'front end', 'typescript', 'ui', 'rxjs'],
    answer:
      'He builds Angular 15+ front ends with TypeScript and RxJS: reusable components, reactive forms and business dashboards used by 50+ people.',
    actions: [{ label: 'Skills', href: '#skills' }],
  },
  {
    intents: ['sql', 'database', 'stored procedure', 'performance', 'optimization', 'optimisation', 't-sql', 'query'],
    answer:
      'He works deeply with SQL Server. Tuning queries, indexes and stored procedures improved API response times and backend throughput by 35% on the Fashion PLM & ERP platform.',
    actions: [{ label: 'How I build', href: '#architecture' }],
  },
  {
    intents: ['azure', 'cloud', 'devops', 'ci/cd', 'cicd', 'pipeline', 'deploy', 'deployment', 'docker'],
    answer:
      'He uses Microsoft Azure (App Service, Functions, Azure DevOps). He has managed CI/CD pipelines for 15+ production deployments, which cut release time by 40%.',
    actions: [{ label: 'How I build', href: '#architecture' }],
  },
  {
    intents: ['ai', 'copilot', 'claude', 'chatgpt', 'cursor', 'llm', 'gpt', 'artificial intelligence', 'prompt', 'genai'],
    answer:
      'AI is part of his daily engineering loop. He uses GitHub Copilot, Cursor and Claude to scaffold code, refactor legacy modules, generate test cases and review changes, and he reviews and tests every suggestion before it ships.',
    actions: [{ label: 'AI skills', href: '#skills' }],
  },
  {
    intents: ['project', 'projects', 'portfolio', 'built', 'plm', 'erp', 'tasva', 'arvind', 'work samples'],
    answer:
      'His featured work: a Fashion PLM & ERP platform for Arvind (Costing, BOM, Vendor Management, and an Excel ingestion engine that cut manual processing by 40%) and the TASVA Fashion PLM system (Techpack, sampling and raw-material trackers).',
    actions: [{ label: 'See projects', href: '#projects' }],
  },
  {
    intents: ['lead', 'leadership', 'mentor', 'team', 'manage', 'mentoring'],
    answer:
      'He led a cross-functional team of 5 engineers and mentored 3+ junior developers, which raised sprint delivery efficiency by 20%.',
    actions: [{ label: 'See experience', href: '#experience' }],
  },
  {
    intents: ['education', 'degree', 'mca', 'university', 'study', 'college', 'qualification'],
    answer:
      "He holds an MCA from Dr. A.P.J. Abdul Kalam Technical University (2018–2020, CGPA 7.9) and a Bachelor's in Information Technology from Jagannath University, Jaipur.",
    actions: [{ label: 'Education', href: '#education' }],
  },
  {
    intents: ['location', 'where', 'based', 'relocate', 'relocation', 'remote', 'city'],
    answer: "He's based in Gurugram, Haryana, India. For remote or relocation questions, it's best to ask him directly.",
    actions: [{ label: 'Contact', href: '#contact' }],
  },
  {
    intents: ['hire', 'hiring', 'available', 'availability', 'open to', 'opportunity', 'opportunities', 'roles', 'job offer', 'interview'],
    answer:
      "For opportunities, the quickest route is the contact form or LinkedIn. He'll be happy to talk about roles that fit his .NET, Angular and Azure experience.",
    actions: [
      { label: 'Send a message', href: '#contact' },
      { label: 'LinkedIn', href: PROFILE.linkedin },
    ],
  },
  {
    intents: ['contact', 'email', 'mail', 'reach', 'linkedin', 'phone', 'message', 'connect'],
    answer: 'The best way to reach him is the message form on this page or LinkedIn.',
    actions: [
      { label: 'Send a message', href: '#contact' },
      { label: 'LinkedIn', href: PROFILE.linkedin },
    ],
  },
  {
    intents: ['resume', 'cv', 'download', 'pdf'],
    answer: 'You can download his resume here.',
    actions: [{ label: 'Download resume', href: PROFILE.resume, download: true }],
  },
  {
    intents: ['who', 'yourself', 'introduce', 'summary', 'overview', 'mritunjay'],
    answer:
      "Mritunjay is a Full Stack .NET Engineer with 5+ years of experience building enterprise PLM/ERP platforms with C#, .NET Core, ASP.NET, Angular, SQL Server and Azure. He's currently a Software Engineer at ReverseLogix in Gurugram.",
    actions: [{ label: 'Read more', href: '#about' }],
  },
  {
    intents: ['experience', 'years', 'career', 'work history', 'worked', 'background', 'senior'],
    answer:
      'He has 5+ years of experience. He spent Feb 2021 to May 2026 at Royal Datamatics (BlueKaktus PLM/ERP), growing from trainee to Senior Software Engineer, and joined ReverseLogix in Sep 2026.',
    actions: [{ label: 'See experience', href: '#experience' }],
  },
  {
    intents: ['current', 'currently', 'now', 'work now', 'working', 'employer', 'reverselogix', 'present', 'job', 'company'],
    answer:
      "He's currently a Software Engineer at ReverseLogix, working across the .NET backend, REST APIs, SQL Server and Angular front end of an enterprise returns-management SaaS platform.",
    actions: [{ label: 'See experience', href: '#experience' }],
  },
];
