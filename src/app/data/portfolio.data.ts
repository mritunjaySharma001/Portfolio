import {
  Education,
  Experience,
  Profile,
  Project,
  SkillGroup,
  Stat,
  Training,
} from '../models/portfolio.models';

export const PROFILE: Profile = {
  name: 'Mritunjay Sharma',
  initials: 'MS',
  title: 'Full Stack Software Engineer',
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
    'I build scalable, secure and high-performance enterprise applications with C#, .NET, Angular, SQL Server and Azure.',
  summary: [
    'Software Engineer with 5+ years of experience designing, developing and maintaining enterprise PLM/ERP platforms using C#, .NET Core, ASP.NET MVC, Web API, Angular, TypeScript, SQL Server and Microsoft Azure.',
    'I specialise in clean architecture, SOLID principles and robust REST API design, and I enjoy turning complex business problems into maintainable, production-ready solutions — from requirements all the way through deployment.',
    'I mentor team members, collaborate closely with product, QA and support teams, and use AI-assisted tools like GitHub Copilot, ChatGPT and Cursor to ship faster without compromising engineering quality.',
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
    icon: 'server',
    skills: ['C#', '.NET Core', 'ASP.NET Core', 'ASP.NET MVC', 'Web API', 'REST', 'LINQ', 'Entity Framework Core', 'Async/Await'],
  },
  {
    title: 'Frontend',
    icon: 'layout',
    skills: ['Angular 15+', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'RxJS'],
  },
  {
    title: 'Database',
    icon: 'database',
    skills: ['SQL Server', 'T-SQL', 'Stored Procedures', 'Triggers', 'Query Optimization', 'Indexing'],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud',
    skills: ['Microsoft Azure', 'Azure Functions', 'Azure App Service', 'Azure DevOps', 'CI/CD', 'Docker', 'Git', 'GitHub', 'GitLab'],
  },
  {
    title: 'Architecture & Security',
    icon: 'layers',
    skills: ['Clean Architecture', 'Microservices', 'Repository Pattern', 'SOLID', 'Design Patterns', 'Dependency Injection', 'JWT', 'OAuth2', 'RBAC'],
  },
  {
    title: 'Tools & Practices',
    icon: 'tool',
    skills: ['Visual Studio', 'VS Code', 'Postman', 'Swagger', 'GitHub Copilot', 'Agile / Scrum', 'Code Reviews', 'Unit Testing'],
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
