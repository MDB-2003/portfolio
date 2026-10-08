/**
 * Central, typed source of truth for all portfolio content.
 *
 * Editing note for Mohit:
 * - Fill in fields marked with `null` or empty strings when you have the info.
 * - Add a project by appending an object to `projects`.
 * - Add a certification by appending to `certifications`.
 * - Never invent metrics — leave optional fields undefined to hide them in the UI.
 */

export type ProjectCategory = 'main' | 'academic' | 'interest'

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  description: string
  technologies: string[]
  /** Optional deep-dive fields. Only rendered when present. */
  problem?: string
  approach?: string
  features?: string[]
  results?: string
  lessonsLearned?: string
  github?: string
  demo?: string
  image?: string
  /** When true, renders an elegant "coming soon" placeholder card. */
  placeholder?: boolean
}

export interface EducationItem {
  id: string
  institution: string
  degree: string
  field: string
  location?: string
  start: string | null
  end: string | null
  current?: boolean
  coursework?: string[]
  gpa?: string | null
  achievements?: string[]
}

export interface SkillCategory {
  id: string
  label: string
  description: string
  skills: string[]
}

export interface Certification {
  name: string
  organization: string
  date?: string
  credentialId?: string
  credentialUrl?: string
  logo?: string
}

export interface Achievement {
  id: string
  title: string
  points: string[]
}

export interface Hobby {
  id: string
  title: string
  summary: string
  themes: string[]
}

export interface SocialLink {
  id: string
  label: string
  /** Set to a real URL/mailto when available; null renders a "coming soon" state. */
  href: string | null
  handle?: string
}

export const personal = {
  name: 'Mohith Dodapaneni Balaraju',
  monogram: 'MDB',
  photo: '/images/profile.jpeg',
  eyebrow: 'ENGINEERING DATA SCIENCE AND AI',
  role: '',
  statement:
    "Hey, welcome to my Portofilio! thanks for coming here.",
  motto: 'Build. Learn. Improve. Repeat.',
  about: {
    heading: 'Curious by nature. Driven to improve.',
    paragraphs: [
      "I'm a Master's student in Engineering Data Science & AI at the University of Houston.",
      "I'm genuinely enthusiastic about new ideas — I like to learn, experiment, and refine. I treat every project as another step toward becoming a better engineer.",
      "Outside of tech, cricket has been a huge part of my life. Out of my 23 years on this planet, I've probably spent more time playing cricket than studying — and honestly, I'm not even sure if that's something to be proud of or concerned about.",
      "My philosophy: If you are passionate and believe that you will acheive it, you don't need to search for it, it will find you..."
    ],
    interests: [
      'Python',
      'SQL',
      'Machine Learning',
      'LLMs',
      'RAG',
      'AWS',
      'GCP',
      'Snowflake',
      'Databricks',
      'dbt',
    ],
    roles: [
      'Data Engineering',
      'AI & ML',
      'Data Scientist',
      'Data Analyst',
      'ML Scientist',
    ],
  },
} as const

export const education: EducationItem[] = [
  {
    id: 'uh',
    institution: 'University of Houston',
    degree: "Master's",
    field: 'Engineering Data Science & AI',
    location: 'Houston, TX',
    start: null, // e.g. 'Aug 2024'
    end: null, // e.g. 'May 2026'
    current: true,
    coursework: [], // add relevant coursework
    gpa: null,
  },
  {
    id: 'gitam',
    institution: 'GITAM University',
    degree: "Bachelor's",
    field: 'Computer Science',
    location: 'India',
    start: null,
    end: null,
    coursework: [],
    gpa: null,
    achievements: [],
  },
]

export const projects: Project[] = [
  // ---- ACADEMIC (ordered strongest-first for a data engineering / ML profile) ----
  {
    id: 'ercot-lakehouse',
    title: 'ERCOT Real-Time Lakehouse and Price-Spike Forecaster',
    category: 'academic',
    description:
      'A Snowflake and dbt lakehouse over 5-minute ERCOT telemetry that estimates the chance the Houston hub price spikes above $250/MWh in the next 60 minutes, and costs out the response for a 50 MW industrial load.',
    technologies: [
      'Snowflake',
      'dbt',
      'LightGBM',
      'SHAP',
      'FastAPI',
      'Streamlit',
      'Python',
      'Pandas',
      'Scikit-learn',
      'Pydantic',
    ],
    problem:
      'Houston hub prices stay quiet for long stretches and then jump. A continuous industrial plant needs to know in the hour before a spike whether to shed discretionary load or discharge a battery, while keeping critical load online.',
    approach:
      'Landed 5-minute HB_HOUSTON and HB_WEST telemetry (LMP, operating reserves, net load, heat index) in Snowflake bronze, then built dbt silver features for reserve-depletion velocity, congestion spread, and net-load acceleration. Trained a walk-forward LightGBM classifier on a 60-minute-ahead spike label, with an embargo so the current price cannot leak into the target, and served probabilities plus SHAP attributions from FastAPI.',
    features: [
      'Forward spike label (LMP above $250/MWh within 60 minutes) that stays empty until the hour is observed',
      'Walk-forward evaluation; model is only saved once enough test folds contain both spikes and non-spikes',
      'FastAPI endpoints for /predict and /explain with probability-scale SHAP attributions',
      'Streamlit dispatch desk comparing taking the price, shedding up to 20 MW, and discharging a 10 MW battery, including downtime cost and 4CP transmission exposure',
    ],
    github: 'https://github.com/MDB-2003/ercot-realtime-lakehouse-mlops',
  },
  {
    id: 't2d-lakehouse',
    title: 'Type 2 Diabetes Trial-Screening Lakehouse',
    category: 'academic',
    description:
      'A Snowflake and dbt medallion lakehouse that screens every patient against 50 recruiting type 2 diabetes trials as eligible, needs-review, or ineligible, with a Streamlit screening desk and a Gemini protocol copilot.',
    technologies: ['Snowflake', 'dbt', 'Python', 'Streamlit', 'Gemini', 'Pandas'],
    problem:
      'Trial coordinators spend review time reading protocols against charts that were never candidates. The useful first cut is what can be checked from the chart and the inclusion text: age, a type 2 diabetes condition, and the latest HbA1c against a stated window.',
    approach:
      'Landed Synthea patients, observations, conditions, and medications plus 50 recruiting ClinicalTrials.gov protocols in Snowflake bronze, then built dbt silver models for typed demographics, type 2 diabetes conditions, and latest HbA1c (LOINC 4548-4). A Gold fact scores every patient–trial pair from age windows and an HbA1c bound parsed from the inclusion text.',
    features: [
      'Header-checked bronze loads; direct identifiers stay in bronze and never reach silver',
      'HbA1c window parsed from inclusion text only, with no default range invented when a protocol is silent',
      'Implausible lab values audited and enforced by dbt tests',
      'Streamlit desk for eligible, needs-review, and ineligible cohorts, with a Gemini copilot that answers from the protocol text and never changes match status',
    ],
    results:
      'Gold fact of 58,550 patient–trial rows (1,171 patients × 50 trials): 255 eligible, 1,431 needing review, 56,864 ineligible. 9 dbt models and 29 passing dbt tests.',
    github: 'https://github.com/MDB-2003/Type-2-diabetes-trial-screening-lakehouse',
  },
  {
    id: 'churn',
    title: 'Telecom Customer Churn Prediction',
    category: 'academic',
    description:
      'ChurnGuard Pro: a Flask web application that estimates a telecom customer’s churn probability, assigns a risk level, and suggests retention actions.',
    technologies: [
      'Python',
      'Scikit-learn',
      'Flask',
      'Random Forest',
      'Pandas',
      'Jupyter Notebook',
      'HTML',
      'CSS',
    ],
    problem:
      'Telecom providers lose revenue when customers leave unexpectedly, and the signals are spread across contracts, billing details, and service subscriptions.',
    approach:
      'Rebuilt the original exploratory analysis into a reproducible scikit-learn pipeline: cleaned TotalCharges and missing values, one-hot encoded service and billing fields, used a stratified 80/20 split, and trained a Random Forest with balanced class weights behind a Flask interface.',
    features: [
      'Churn probability with a Low, Moderate, or High risk level',
      'Retention suggestions based on the customer profile',
      'Reproducible training from the telecom CSV',
      'Metrics evaluated on a held-out test set',
    ],
    results: 'Test accuracy 75.73% and ROC-AUC 0.8371 on the held-out test set.',
    github: 'https://github.com/MDB-2003/Telecom_customer_churn_prediction',
  },
  {
    id: 'job-application-agent',
    title: 'Job Application Agent',
    category: 'academic',
    description:
      'A local Python and SQLite foundation for a job-application agent that models candidates, resumes, approved answers, jobs, applications, and audit history. It performs no external actions yet.',
    technologies: ['Python', 'SQLite', 'unittest'],
    approach:
      'Built a domain layer over database protocols with versioned SQLite schema migrations, and a restricted JSON-lines worker interface with a fixed command allowlist and strict argument schemas, so a worker can only send messages and never receives database or host access.',
    features: [
      'Atomic schema initialization and migrations (schema version 3)',
      'Allowlisted worker commands; human approval and execution authority stay with the trusted host',
      'Transactional audit history for domain mutations',
      'Test suites for safety, persistence, concurrency, and migrations',
    ],
    github: 'https://github.com/MDB-2003/auto_job_applier',
  },
  {
    id: 'face-attendance',
    title: 'Face Recognition Attendance System',
    category: 'academic',
    description:
      'A Python desktop application that registers people, captures face samples, trains a recognizer, and records attendance with a date and time stamp.',
    technologies: ['Python', 'OpenCV', 'Tkinter', 'LBPH', 'Haar Cascade', 'Pandas'],
    problem:
      'Manual attendance is slow and error-prone. The project automates it through face recognition.',
    approach:
      'Detected faces with an OpenCV Haar cascade and recognized them with the LBPH recognizer, behind a Tkinter interface that writes attendance records.',
    features: [
      'Camera-based registration of new people',
      'Attendance saved with ID, name, date, and time',
      'Live attendance table inside the application',
      'Password prompt before training a new recognition profile',
    ],
    github: 'https://github.com/MDB-2003/face-recognition-attendance-system',
  },
  {
    id: 'travel-website',
    title: 'Team Adventures Travel Website',
    category: 'academic',
    description:
      'A responsive travel-website front end built during my Phoenix Global internship as an Intern Web Development Engineer (May–June 2024).',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    features: [
      'Responsive navigation for desktop and mobile',
      'Video hero section with typewriter text',
      'Destination pages for Singapore, Andaman, Dubai, Bangkok, Italy, and Malaysia',
      'Booking form with countdown timer, filterable gallery, and holiday carousel',
    ],
    github: 'https://github.com/MDB-2003/Travelling-Website-Front-End',
  },

  // ---- PERSONAL ----
  // Add personal projects here with category: 'interest'.
]

export const skills: SkillCategory[] = [
  {
    id: 'programming',
    label: 'Programming',
    description: 'Languages and frameworks I write systems with.',
    skills: ['Python', 'SQL', 'FastAPI', 'Flask', 'HTML', 'CSS', 'JavaScript', 'Git'],
  },
  {
    id: 'machine-learning',
    label: 'Machine Learning',
    description: 'Models that learn from data, and building with LLMs.',
    skills: [
      'Scikit-learn',
      'LightGBM',
      'XGBoost',
      'Random Forest',
      'SHAP',
      'Feature Engineering',
      'Walk-Forward Validation',
      'PyTorch',
      'TensorFlow',
      'OpenCV',
      'LLM',
      'RAG',
      'Prompt Engineering',
      'Gemini',
    ],
  },
  {
    id: 'data-engineering',
    label: 'Data Engineering',
    description: 'Moving and shaping data at scale.',
    skills: [
      'ETL',
      'ELT',
      'Medallion Architecture (Bronze/Silver/Gold)',
      'Data Pipelines',
      'dbt',
      'Schema Validation',
      'Data Quality Testing',
      'Pandas',
      'NumPy',
      'Pydantic',
    ],
  },
  {
    id: 'cloud-databases',
    label: 'Cloud & Databases',
    description: 'Platforms where data lives and runs.',
    skills: ['AWS', 'GCP', 'Snowflake', 'Databricks', 'PostgreSQL', 'MySQL', 'SQLite'],
  },
  {
    id: 'bi',
    label: 'BI / Visualization',
    description: 'Communicating insight clearly.',
    skills: ['Power BI', 'Excel', 'Streamlit', 'Jupyter Notebook'],
  },
]

/** Short, honest descriptions revealed on skill hover. No proficiency percentages. */
export const skillNotes: Record<string, string> = {
  Python: 'My primary language for data work and ML.',
  SQL: 'Querying and shaping relational data.',
  RAG: 'Grounding LLM answers in retrieved context.',
  PyTorch: 'Building and training neural networks.',
  'Retrieval-Augmented Generation': 'Combining search with generation for grounded answers.',
  XGBoost: 'Gradient-boosted trees for tabular problems.',
  Docker: 'Packaging environments for reproducibility.',
}

export const currentlyLearning: string[] = [
  'Advanced Machine Learning',
  'Deep Learning',
  'LLMs',
  'RAG',
  'Generative AI',
  'MLOps',
  'Cloud',
  'Data Engineering',
  'Advanced Analytics',
]

export const certifications: Certification[] = [
  {
    name: 'Introduction to Machine Learning',
    organization: 'Duke University — Coursera',
    date: 'Aug 2023',
    credentialUrl: 'https://coursera.org/verify/JMZXUGA5VHFD',
  },
  {
    name: 'Managing Machine Learning Projects',
    organization: 'Duke University — Coursera',
    date: 'Aug 2023',
    credentialUrl: 'https://coursera.org/verify/7BMVH4VVXFN8',
  },
  {
    name: 'Preparing Data for Analysis with Microsoft Excel',
    organization: 'Microsoft — Coursera',
    date: 'Dec 2024',
    credentialUrl: 'https://coursera.org/verify/MX9COU6TWEH1',
  },
  {
    name: 'Foundations: Data, Data, Everywhere',
    organization: 'Google — Coursera',
    date: 'Dec 2024',
    credentialUrl: 'https://coursera.org/verify/V0EAY0OVV2H1',
  },
  {
    name: 'Ask Questions to Make Data-Driven Decisions',
    organization: 'Google — Coursera',
    date: 'Dec 2024',
    credentialUrl: 'https://coursera.org/verify/LEOWKK411O0E',
  },
  {
    name: 'What is Data Science?',
    organization: 'IBM — Coursera',
    date: 'Dec 2024',
    credentialUrl: 'https://coursera.org/verify/89G1NQ0VTFZT',
  },
  {
    name: 'Python Data Structures',
    organization: 'University of Michigan — Coursera',
    date: 'Jul 2022',
    credentialUrl: 'https://coursera.org/verify/3HPBCCXEKVDH',
  },
  {
    name: 'Data Structures',
    organization: 'UC San Diego — Coursera',
    date: 'Dec 2022',
    credentialUrl: 'https://coursera.org/verify/QGLVDDNA7N94',
  },
  {
    name: 'Basic Statistics',
    organization: 'University of Amsterdam — Coursera',
    date: 'Apr 2023',
    credentialUrl: 'https://coursera.org/verify/HQRZMGBS286Q',
  },
  {
    name: 'Matrix Algebra for Engineers',
    organization: 'HKUST — Coursera',
    date: 'Nov 2022',
    credentialUrl: 'https://coursera.org/verify/WX9GUSGDPW5Q',
  },
  {
    name: 'Cloud Computing Basics (Cloud 101)',
    organization: 'LearnQuest — Coursera',
    date: 'Apr 2023',
    credentialUrl: 'https://coursera.org/verify/R3D23C5S3Q3D',
  },
  {
    name: 'Linux Fundamentals',
    organization: 'LearnQuest — Coursera',
    date: 'Nov 2022',
    credentialUrl: 'https://coursera.org/verify/ZSFJC8WVSAZE',
  },
]

export const achievements: Achievement[] = [
  {
    id: 'cricket',
    title: 'Cricket',
    points: [
      'Regular tournament participant',
      'Multiple tournament wins',
      'Multiple Man of the Match awards',
    ],
  },
]

export const hobbies: Hobby[] = [
  {
    id: 'cricket',
    title: 'Cricket',
    summary: 'I play cricket every Saturday and compete in tournaments.',
    themes: [
      'Competition',
      'Teamwork',
      'Consistency',
      'Discipline',
      'Multiple tournament wins',
      'Multiple Man of the Match awards',
    ],
  },
  {
    id: 'fitness',
    title: 'Fitness',
    summary: 'I go to the gym every day and work toward personal fitness goals.',
    themes: [
      'Discipline',
      'Consistency',
      'Physical improvement',
      'Mental wellbeing',
      'Long-term goals',
      'Continuous self-improvement',
    ],
  },
]

export const socialLinks: SocialLink[] = [
  { id: 'email', label: 'Email', href: 'mailto:dodapanenimohith2003@gmail.com' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dodapaneni-balaraju-mohith/',
  },
  { id: 'github', label: 'GitHub', href: 'https://github.com/MDB-2003' },
]

/** Path to the resume PDF. Drop a file at /public/resume.pdf to enable it. */
export const resume = {
  path: '/resume.pdf',
  /** Set to true once /public/resume.pdf exists. Controls graceful fallback. */
  available: true,
}

/** Ordered navigation model. `more` items live in a dropdown. */
export const navigation = {
  primary: [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'contact', label: 'Contact' },
  ],
  more: [
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'learning', label: 'Currently Learning' },
    { id: 'resume', label: 'Resume' },
  ],
} as const
