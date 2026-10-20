/**
 * Uniway case study content — sourced from the team's original research
 * (Behance case study, April 2022) and the Figma file.
 * Edit text here; screens live in /public/case/uniway/.
 */

export const ORANGE = "#F37500";

export const meta = {
  title: "Uniway",
  tagline: "Higher study guide",
  summary:
    "A study-abroad companion that helps students find the right university, prepare the right documents and get scholarships — with experts on hand when the process gets hard.",
  role: "Team Lead · UX/UI Designer",
  team: "5 people (incl. mentor)",
  timeline: "12 weeks · Oct 2021 – Jan 2022",
  platform: "iOS & Android",
  tools: ["Figma", "FigJam", "Illustrator", "Photoshop", "Miro"],
  behance: "https://www.behance.net/gallery/141923013/Uniway-a-UIUX-Case-Study-of-a-University-Finding-App",
};

export const glance = [
  { value: "12+", label: "Weeks" },
  { value: "100+", label: "Surveys" },
  { value: "60+", label: "Screens" },
  { value: "40+", label: "Components" },
];

export const recognition = [
  { value: "6.7K", label: "Behance views" },
  { value: "472", label: "Appreciations" },
];

export const problemCopy = {
  lead: "Every year, hundreds of thousands of students apply to universities abroad — and thousands of applications are rejected simply because applicants lack information.",
  body: "Even finding a trustworthy agency can be a nightmare among the hundreds out there. Students end up with broken dreams: they lose their chance at the university and country they wanted.",
};

export const problems = [
  "Finding and keeping track of ECAs throughout the year — and which universities offer scholarships for them — is hard.",
  "Researching and shortlisting universities and countries that fit you is time-consuming and intimidating.",
  "There's no clear indication of which documents a visa needs, or whether yours are good enough.",
  "It's very hard to find a trustworthy platform or agency that guides you through admission and visa.",
];

export const hypotheses = [
  "Give people one trustworthy platform with all the information they need.",
  "Recommend universities based on each user's major, country and preferences.",
  "Notify users about upcoming ECA events and give them everything they need to attend.",
  "Explain the whole visa and admission process — and every document — with demos.",
  "Offer expert help, with consultation appointments for applications and related problems.",
];

export const stages = [
  { name: "Empathize", items: ["User research", "Empathy mapping", "User persona", "Journey map", "Competitor analysis"] },
  { name: "Define", items: ["Value proposition", "Competitive analysis", "Goal statement", "Problem statement", "Hypothesis"] },
  { name: "Ideate", items: ["Brainstorming", "User flow", "Information architecture"] },
  { name: "Design", items: ["Sketch", "Wireframe", "Prototype", "Style guide", "Visual design"] },
  { name: "Test", items: ["Usability testing", "Affinity mapping", "Survey insight"] },
];

/** Gantt rows: start/end in weeks (1–12). */
export const timeline = [
  { name: "Strategy", detail: "Topic selection, secondary research", start: 1, end: 2.5, color: "#14B8A6" },
  { name: "Empathize", detail: "Interviews, empathy maps, personas, user stories, journey maps", start: 1.5, end: 4.5, color: ORANGE },
  { name: "Define", detail: "Problem & hypothesis statements, goal statement, crazy eights", start: 5, end: 7.5, color: "#8B5CF6" },
  { name: "Ideate", detail: "Value proposition, competitive analysis, user flow, site map", start: 6, end: 8.5, color: "#3B82F6" },
  { name: "Test", detail: "Usability test, survey, affinity mapping", start: 9, end: 10.5, color: "#EF4444" },
  { name: "Design", detail: "Lo-fi & mid-fi wireframes, usability testing, hi-fi design, presentation", start: 8, end: 12.5, color: "#22C55E" },
];

export const interviewGroups = [
  {
    title: "Introduction",
    questions: ["How are you?", "How old are you?", "Where do you currently live?", "What do you currently do?"],
  },
  {
    title: "Admission process",
    questions: [
      "Are you looking for a scholarship?",
      "What type of scholarship are you hoping to get?",
      "How important are extracurriculars when applying? Do they help with scholarships?",
      "How easy or hard is it to find extracurricular activities in our country?",
    ],
  },
  {
    title: "Scholarships",
    questions: [
      "What is your education status now?",
      "Have you thought about going abroad for higher studies?",
      "Is there a particular country, university or degree you want?",
      "Do you know anything about the admission process?",
      "Is it reliable information? How did you learn about it?",
      "What might make it easier to find information?",
    ],
  },
  {
    title: "Visa processing",
    questions: [
      "Do you know how to apply for a student visa?",
      "What kind of help would you want during visa processing?",
      "Is it reliable information? How did you learn about it?",
    ],
  },
  {
    title: "Agencies",
    questions: ["Will you take help from agencies?", "Why, or why not?"],
  },
];

export type Empathy = {
  who: string;
  context: string;
  says: string[];
  thinks: string[];
  does: string[];
  feels: string[];
};

export const empathyMaps: Empathy[] = [
  {
    who: "Participant A",
    context: "Applied to master's programmes in Germany",
    says: [
      "I filtered out universities according to my subject choice.",
      "I did my own research.",
      "Because of my friends, I knew from the start how much money I needed.",
      "My ECA skills helped me a lot — my ECAs were related to my subject.",
    ],
    thinks: [
      "An option for 3rd/4th-year students to gather information easily would be great.",
      "It would help if someone could suggest which bank to send the money from.",
      "There are lots of ECA opportunities here — you just have to find them.",
    ],
    does: ["Attends classes online", "Filters universities by subject", "Does her own research", "Asks friends living in Germany"],
    feels: [
      "Happy — friends abroad made information gathering easier.",
      "Sad — Facebook-group guidance is never to the point.",
      "Frustrated — nobody could tell her which bank to pay fees through.",
      "Depressed — she didn't know about the German visa processing lag.",
    ],
  },
  {
    who: "Participant B",
    context: "High-school graduate on a gap year, Dhaka",
    says: [
      "I prefer the US over any other country.",
      "I also like Asian countries like Japan or Korea.",
      "In Asia, all universities have their own application portal.",
      "US and Canadian universities need transcripts submitted by your school counsellor.",
    ],
    thinks: [
      "Going abroad is the best way to challenge myself.",
      "The US and Canada take a holistic approach — but they're expensive.",
      "Extracurriculars will always be a booster.",
      "Even with an agency, you should enquire first.",
    ],
    does: ["Took a gap year to apply", "Focused on ECAs through high school", "Started an environmental project in 2019"],
    feels: [
      "The Common App reduces the workload so much.",
      "A 100% scholarship is rare.",
      "Kids in remote areas don't have internet — or access to ECAs.",
      "Visa rules are strict; tutorials would make it easier.",
    ],
  },
  {
    who: "Participant C",
    context: "Senior research assistant, planning a research master's",
    says: [
      "My master's will be research-based, with funding.",
      "I'm looking for a lab where my interests align with the PI.",
      "Funding comes through teaching or research assistantships.",
      "Agencies scam people.",
    ],
    thinks: [
      "The admission process is pretty much the same everywhere.",
      "Volunteer work — like at an NGO — matters a lot.",
      "The main visa problem is collecting and submitting documents.",
    ],
    does: ["Works at a national research centre", "Did everything required, efficiently", "Visited an education consultancy for information"],
    feels: [
      "University websites are straightforward — you just follow their guidelines.",
      "It's very time-consuming.",
      "Finding ECAs outside university is pretty hard.",
      "The visa process is lengthy, with a lot of paperwork.",
    ],
  },
];

export const personas = [
  {
    name: "Rifa Khatun",
    initials: "RK",
    facts: [
      ["Age", "25"],
      ["Education", "MBA"],
      ["Occupation", "Banker"],
      ["Hometown", "Dhaka"],
    ],
    quote:
      "I'd like to pursue a master's degree abroad, but I don't have time to research or prepare my documents. I could go to an agency — but I'm not sure I can trust them.",
    goals: [
      "A trusted agency",
      "Help writing her SOP",
      "Guidelines on which documents universities and visas need — and a way to verify them",
    ],
    frustrations: [
      "Too busy at work to research universities",
      "Doesn't trust agencies",
      "No clear list of documents for a visa",
    ],
    tone: "#FF8A3D",
  },
  {
    name: "Nafee Ahmed",
    initials: "NA",
    facts: [
      ["Age", "20"],
      ["Education", "BSc"],
      ["Occupation", "Freelancer"],
      ["Hometown", "Rajshahi"],
    ],
    quote:
      "I want to go abroad for my BSc and hope to get a scholarship for my ECA skills — but it's hard to keep up with ECA events and their schedules.",
    goals: [
      "A scholarship for a BSc abroad",
      "Find ECA events and places to learn new skills",
      "Someone to shortlist universities and countries for his qualifications",
    ],
    frustrations: [
      "Doesn't know which countries offer ECA-based scholarships",
      "Unfamiliar with ECA event schedules",
      "No trusted platform that shortlists by qualification",
    ],
    tone: "#3B82F6",
  },
];

export const stories = [
  { name: "Nafee", text: "As a mechanical engineering graduate, I need proper guidelines for every document for my MSc, so I can focus on research." },
  { name: "Rifa", text: "As a banker, I want a trusted agency that handles the process — choosing a university or country — so I can focus on my job." },
  { name: "Humayun", text: "As a job holder, I need guidance on which ECAs win scholarships, so I can build the right skills." },
  { name: "Sayor", text: "As a BBA candidate, I need a community to talk about the process with, so I can feel assured." },
  { name: "Zara", text: "As a BSc candidate, I want a platform that finds me scholarships, so I can afford to study abroad." },
];

export const journey = {
  persona: "Nafee Ahmed",
  goal: "Find proper guidelines for every document needed for admission and visa processing.",
  steps: [
    {
      stage: "Search",
      tasks: ["Opens laptop", "Opens a search engine", "Types keywords"],
      mood: 2,
      emoji: "😟",
      opportunity: "A reliable platform he can trust to have the answer.",
    },
    {
      stage: "Enters sites",
      tasks: ["Scrolls results", "Finds a few matching sites", "Opens them"],
      mood: 1.6,
      emoji: "🙄",
      opportunity: "Every requirement and guideline in one place.",
    },
    {
      stage: "Finds the info",
      tasks: ["Figures out navigation", "Hunts for the right page", "Scrolls for his part"],
      mood: 0.6,
      emoji: "😫",
      opportunity: "Filters that surface exactly what he needs.",
    },
    {
      stage: "Highlights",
      tasks: ["Skims the info", "Focuses on what matters"],
      mood: 3.6,
      emoji: "😀",
      opportunity: "Visual, enjoyable instructions that highlight what's important.",
    },
    {
      stage: "Saves it",
      tasks: ["Bookmarks sites", "Copies notes into a doc", "Takes screenshots"],
      mood: 4.2,
      emoji: "😇",
      opportunity: "Bookmarks and a document checklist per university or country.",
    },
  ],
};

export const competitors = [
  {
    name: "Competitor A",
    kind: "University search app",
    color: "#F97316",
    strengths: ["Strong visual design that communicates its ethos", "Informative filters", "Excellent community discussion area"],
    weaknesses: ["Unusable without an account", "Premium service is pricey"],
  },
  {
    name: "Competitor B",
    kind: "Study-abroad platform",
    color: "#1D6FD1",
    strengths: ["Easy to navigate website", "Well-organized content"],
    weaknesses: ["App is weaker than the website", "Not for students everywhere", "Log in every time you open it"],
  },
  {
    name: "Competitor C",
    kind: "Admissions counselling app",
    color: "#14B8A6",
    strengths: ["Easy to find important information", "Organized and orderly"],
    weaknesses: ["No in-app sign up", "Slow and buggy"],
  },
];

export const goals = [
  { title: "Application status", text: "Show the live state of every visa and admission process — measured by how many users it helps." },
  { title: "Document walkthroughs", text: "Step-by-step document submission with demo documents — measured by documents submitted." },
  { title: "Qualification matching", text: "Filter universities, countries and courses by the user's qualifications — measured by app ratings." },
  { title: "Expert community", text: "Categorized Q&A verified by experts — measured by community usage." },
  { title: "ECA discovery", text: "Suggest ECA events users can actually attend — measured by feature usage." },
  { title: "ECA scholarships", text: "Surface scholarships that reward extracurriculars — measured by users who use it." },
  { title: "Scholarship search", text: "Search scholarships by IELTS, GRE, GMAT, SAT, ACT, ECA and more — measured by applications." },
];

/** Information architecture, simplified from the full site map. */
export const ia = {
  root: "Home",
  onboarding: ["Splash", "Onboarding", "Sign in / Sign up", "Study questions"],
  branches: [
    { name: "Search & filter", children: ["Filter options", "University list", "University details", "Document checklist", "Payment"] },
    { name: "Recommended", children: ["University list", "University details", "Start the process"] },
    { name: "Scholarships", children: ["Top", "Categorized", "Details", "Apply"] },
    { name: "Events & ECA", children: ["Event details", "Book a seat"] },
    { name: "Get help", children: ["Our services", "Set an appointment", "Payment", "Confirm"] },
    { name: "Community", children: ["FAQs", "Chat"] },
    { name: "Profile", children: ["Check status", "Applied", "Bookmarks", "Preferences", "Settings"] },
  ],
};

/** The core "apply with confidence" flow. */
export const coreFlow = [
  { label: "Select university", kind: "node" },
  { label: "Requirements", kind: "step" },
  { label: "Admission & visa info", kind: "node" },
  { label: "Document list", kind: "step" },
  { label: "Make payment", kind: "decision" },
  { label: "Demo documents", kind: "step" },
  { label: "Upload documents", kind: "node" },
  { label: "Expert review", kind: "node" },
  { label: "Suggestions", kind: "step" },
  { label: "Appointment confirmed", kind: "end" },
] as const;

export const styleGuide = {
  colors: [
    { hex: "#F37500", name: "Uniway Orange", use: "Primary actions, highlights" },
    { hex: "#404040", name: "Graphite", use: "Headings & body text" },
    { hex: "#C4C4C4", name: "Silver", use: "Borders, disabled, placeholders" },
    { hex: "#FFFFFF", name: "White", use: "Surfaces & cards" },
  ],
  type: [
    { tag: "H1", label: "Main heading", weight: 600, size: 20 },
    { tag: "H2", label: "Sub heading", weight: 500, size: 18 },
    { tag: "H3", label: "Heading", weight: 500, size: 16 },
    { tag: "P", label: "Paragraph", weight: 400, size: 14 },
    { tag: "C", label: "Caption", weight: 300, size: 12 },
  ],
};

/** Usability survey — 11 participants, statements from the SUS questionnaire. */
export const survey = [
  { q: "I'd imagine most people would learn this app quickly", agree: 100, neutral: 0, disagree: 0 },
  { q: "The main user flow is clear", agree: 90.9, neutral: 9.1, disagree: 0 },
  { q: "I think the app is easy to use", agree: 72.7, neutral: 27.3, disagree: 0 },
  { q: "I feel confident using the app", agree: 72.7, neutral: 27.3, disagree: 0 },
  { q: "I find the app easy to navigate", agree: 54.5, neutral: 36.4, disagree: 9.1 },
  { q: "I would use this app frequently", agree: 45.5, neutral: 27.3, disagree: 27.3 },
  { q: "I need a technical person to use this app", agree: 27.3, neutral: 18.2, disagree: 54.5 },
  { q: "I need to learn a lot before using this app", agree: 0, neutral: 18.2, disagree: 81.8 },
  { q: "There's inconsistency within the app", agree: 0, neutral: 9.1, disagree: 90.9 },
  { q: "I find the app unnecessarily complex", agree: 0, neutral: 0, disagree: 100 },
];

export const affinity = {
  problems: [
    "Hard to gather information and proper guidelines for studying abroad",
    "Some icons were hard to identify",
    "The Event icon especially confused people",
  ],
  exceptions: ["Some users found navigation easy", "A few found the navigation system quite hard"],
  changes: ["Added a global search with filters", "Removed and replaced the Event icon"],
};

export const team = [
  { name: "Shams Tabraze Uddin Ahmed", role: "Team Lead · UX/UI Designer", me: true },
  { name: "Mayeeshat Shamama Muskan", role: "UX/UI Designer" },
  { name: "Md Nur Hossan", role: "UX/UI Designer" },
  { name: "Ahmed Jespar", role: "UX/UI Designer" },
  { name: "Raiyan Sofwan", role: "Mentor" },
];
