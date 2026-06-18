"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Github, Star, GitFork, ExternalLink, Sparkles, Code2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  status: "shipped" | "in-progress" | "brewing"
  impact?: { value: string; label: string }[]
  url: string
  homepage?: string
  featured: boolean
  highlight?: boolean
  challenge?: string
  solution?: string
  keyDecisions?: string
  learnings?: string
}

const projects: Project[] = [

{
  id: 0,
  title: "AgentForge",
  description:
    "A full-stack Visual IDE for designing, executing, and deploying multi-agent AI systems on a drag-and-drop canvas — with real-time token-level trace streaming, a built-in test harness, and one-click production deployment.",
  tags: ["Next.js", "React Flow", "FastAPI", "LangGraph", "Redis", "PostgreSQL", "Celery", "Docker", "Kubernetes"],
  status: "in-progress",
  impact: [
    { value: "5", label: "node types supported" },
    { value: "50ms", label: "WebSocket trace latency" },
    { value: "1-click", label: "production deploy" },
  ],
  url: "https://github.com/sahil1402/agentforge",
  featured: true,
  highlight: true,
  challenge: "Multi-agent AI workflows built in LangGraph and CrewAI are completely invisible during execution — engineers stare at logs hoping to understand why an agent routed incorrectly. There's no built-in test harness, no version control, and deploying a graph as a production API requires writing boilerplate FastAPI, Dockerfiles, and Helm charts from scratch.",
  solution: "Building a Visual IDE where agent topology is as inspectable as a React component tree. The JSON DAG is transpiled to runnable LangGraph Python via Jinja2 templates. Execution traces stream at token-level granularity via WebSocket + Redis pub/sub. A built-in test harness catches regressions before deploy. One-click deploy wraps the graph in a FastAPI endpoint, builds a Docker image programmatically, and pushes to Kubernetes via Helm.",
  keyDecisions: "Chose React Flow over D3.js — purpose-built for node graphs, saves 2000+ lines of custom interaction code. LangGraph over a custom runtime because its state machine maps 1:1 to the visual graph and interrupt() solves human gates cleanly. Redis pub/sub over Kafka for ephemeral trace events — sub-1ms delivery, zero setup overhead. PostgreSQL with JSONB over MongoDB — same schema flexibility with full ACID guarantees for graph versioning.",
  learnings: "The hardest part of a visual IDE isn't the canvas — it's the transpiler. Walking a JSON DAG in topological order and handling 4 patterns (linear chain, conditional routing, parallel fan-out, human interrupt) requires careful graph validation before any code generation. Real-time streaming at token granularity requires decoupling execution from delivery — Redis pub/sub as a message bus between Celery workers and the WebSocket relay is the right abstraction.",
},
{
  id: 1,
  title: "Graph RAG Agent",
  description:
    "A Graph-based RAG agent that executes multi-step browser tasks while learning from past interactions via a persistent knowledge graph — enabling multi-hop reasoning and continuous improvement without retraining.",
  tags: ["Python", "Graph RAG", "FastAPI", "HTML/CSS/JS", "JSON"],
  status: "shipped",
  impact: [
  { value: "28%", label: "reduction in task steps" },
  { value: "2×", label: "faster decision-making" },
  { value: "100%", label: "memory persistence" },
],
  url: "https://github.com/sahil1402/Graph_Rag_Agent",
  featured: true,
  challenge: "Traditional LLM agents are stateless — they forget everything after each run, struggle with sequential decision-making, repeat bad actions, and can't learn from past interactions. Simple vector RAG fails on tasks with dependencies between actions and multi-hop reasoning requirements.",
  solution: "Designed a Graph RAG architecture where each interaction is stored as nodes (states/entities) and edges (actions + outcomes). The agent retrieves past trajectories, prioritizes successful paths, avoids previously failed actions, and uses memory reinforcement to boost successful edges — transforming a reactive agent into a learning agent with structured memory. Added a browser UI with live graph visualization for explainability.",
  keyDecisions: "Chose graphs over vector RAG because relationships matter more than similarity and graphs enable multi-hop reasoning. Simulated the environment first (not real browser automation) for faster iteration and cleaner architecture. Treated memory as a first-class component central to decision-making rather than optional. Added a visualization layer to improve explainability and make system behavior interpretable.",
  learnings: "Graph structures outperform embeddings for sequential decision problems. Persistent memory is the key differentiator in agent systems. Building agents is less about LLMs and more about state management and decision policies. Visualization dramatically improves both debugging and storytelling. Iterative approach (CLI → Web → real browser) is far more effective than overbuilding upfront.",
},
{
  id: 2,
  title: "Resume Tweaker AI",
  description:
    "A personal AI tool that takes a job description + your base LaTeX resume, uses GPT to tailor content without touching the layout, and lets you preview and download the updated .tex and PDF in the browser.",
  tags: ["Python", "FastAPI", "OpenAI", "TypeScript", "Vite", "LaTeX", "Google OAuth"],
  status: "shipped",
  impact: [
    { value: "100%", label: "layout preservation" },
    { value: "~30s", label: "resume tailored end-to-end" },
    { value: "2x", label: "faster than manual tailoring" },
  ],
  url: "https://github.com/sahil1402/resume-tweaker-ai",
  homepage: "https://tweakly.pro/",
  featured: true,
  highlight: true,
  challenge: "Manually tailoring a resume for every job description is tedious and error-prone — especially when the resume is in LaTeX where changing content risks breaking the layout. Generic AI rewrites change formatting and structure, not just content.",
  solution: "Built a full-stack tool where GPT only edits content inside specific LaTeX commands like \\resumeItem{} and the Technical Skills section — leaving the layout completely untouched. FastAPI backend compiles LaTeX to PDF via pdflatex. Optional Google Docs mode via OAuth for non-LaTeX workflows. One-command dev setup runs both backend and frontend together.",
  keyDecisions: "Chose LaTeX over DOCX because it's deterministic and layout-stable — GPT can safely edit content without risking format corruption. Scoped edits to specific LaTeX commands rather than full-file rewrites to minimize blast radius. Added Google Docs mode as an optional path for users without a LaTeX setup.",
  learnings: "Constraining AI to edit only specific parts of a structured document is far more reliable than asking it to rewrite the whole thing. Deterministic formats like LaTeX are a better foundation for AI-assisted editing than rich text formats.",
},
{
  id: 3,
  title: "ByteFoundary",
  description:
    "A full-stack multi-track learning platform for AI/ML, Data Engineering, Software Development, and DSA — with an AI Tutor, browser-based code execution, 200+ DSA problems, and RAG-powered context retrieval per lesson.",
  tags: ["Next.js 14", "FastAPI", "Supabase", "pgvector", "LangChain", "Gemini", "Judge0", "Redis", "Docker"],
  status: "brewing",
  impact: [
    { value: "4", label: "learning tracks" },
    { value: "200+", label: "DSA problems" },
    { value: "63", label: "day build roadmap" },
  ],
  url: "",
  featured: false,
  challenge: "Existing learning platforms (LeetCode, Coursera) are either too narrow (just DSA) or too shallow (no hands-on execution). Engineers learning AI/ML, Data Engineering, or System Design have no single place that combines structured curriculum, browser-based code execution, and AI-assisted tutoring with actual lesson context.",
  solution: "Building a platform with 4 structured tracks (AI/ML, Data Engineering, SWE, DSA), MDX-rendered interactive lessons, Monaco Editor + Judge0 for in-browser code execution, and a RAG-powered AI Tutor (Gemini Flash + pgvector cosine similarity) that knows exactly which lesson you're on and what you've completed. GPT-4o-mini for code review, Gemini for quiz generation, all rate-limited via Upstash Redis.",
  keyDecisions: "Chose Supabase + pgvector over a dedicated vector DB — avoids an extra service while giving full ACID guarantees alongside embeddings. Hugging Face Spaces for FastAPI backend — free Docker hosting with zero ops overhead. MDX over a CMS — lessons live in Git, get PR review, and deploy automatically. Judge0 over custom execution sandbox — handles multi-language support and security isolation out of the box.",
  learnings: "Still in planning — architecture and implementation roadmap fully documented across 63-day phased build plan covering database schema, AI feature architecture, CI/CD pipeline, and content strategy for all 4 tracks.",
},
  
{
  id: 4,
  title: "Medical Health Diagnosis",
  description:
    "A Flask web app that predicts 7 diseases — Diabetes, Breast Cancer, Heart Disease, Kidney Disease, Liver Disease, Malaria, and Pneumonia — using ML and CNN models trained on Kaggle datasets, with doctor appointment and chat features.",
  tags: ["Python", "Flask", "Scikit-learn", "CNN", "Deep Learning", "Bootstrap", "Kaggle"],
  status: "shipped",
  impact: [
    { value: "7", label: "diseases detected" },
    { value: "99%", label: "top model accuracy (Kidney)" },
    { value: "98.25%", label: "Diabetes & Cancer accuracy" },
  ],
  url: "https://github.com/sahil1402/Medical-Health-Diagnosis",
  featured: false,
  challenge: "Medical diagnosis requires high accuracy across very different disease types — some are tabular (Diabetes, Heart Disease) and some are image-based (Malaria cell images, Pneumonia X-rays). A single model architecture can't handle all of them, and low accuracy in a medical context is not acceptable.",
  solution: "Built separate ML models per disease — classical Scikit-learn models for tabular diseases and CNN-based deep learning models for image classification (Malaria, Pneumonia). Integrated all 7 models into a single Flask web app where users upload data, get predictions instantly, and can book doctor appointments or chat via email.",
  keyDecisions: "Used ML over DL for tabular diseases because classical models like Random Forest achieved 98-99% accuracy — no benefit in adding DL complexity. Used CNN for image-based diseases where spatial feature extraction is essential. Kept all models as serialized .pkl files for fast inference without reloading.",
  learnings: "Choosing the right model class per data type matters more than picking the most complex architecture. CNNs are the right tool for image classification but overkill for structured tabular data where tree-based models dominate.",
},
{
  id: 5,
  title: "YouTube Trending Analysis",
  description:
    "A scalable AWS data engineering pipeline that ingests, transforms, and analyzes structured and semi-structured YouTube trending data across regions — with a QuickSight dashboard for reporting.",
  tags: ["Python", "PySpark", "AWS S3", "AWS Glue", "AWS Lambda", "AWS Athena", "QuickSight"],
  status: "shipped",
  impact: [
    { value: "6+", label: "AWS services integrated" },
    { value: "200", label: "trending videos/day per region" },
    { value: "10", label: "regions analyzed" },
  ],
  url: "https://github.com/sahil1402/YouTube-Analysis-Data-Engineering-",
  featured: false,
  challenge: "YouTube trending data is semi-structured, multi-regional, and arrives in inconsistent formats (CSV + JSON). Processing it locally doesn't scale, and querying raw S3 data without proper ETL leads to slow, expensive analytics.",
  solution: "Built a fully cloud-native pipeline on AWS — S3 as the data lake, AWS Glue for serverless ETL and schema cataloging, Lambda for event-driven transformation triggers, and Athena for interactive SQL queries directly on S3. QuickSight sits on top for BI dashboards.",
  keyDecisions: "Chose AWS Glue over custom Spark clusters for serverless scalability. Used Athena to avoid loading data into a separate DB — queries run directly on S3 with no infrastructure. Separated raw and processed zones in S3 for clean data lineage. Lambda triggers kept the pipeline event-driven rather than scheduled.",
  learnings: "Serverless data pipelines dramatically reduce ops overhead — no cluster management, pay-per-query with Athena. Separating raw and curated S3 zones early saves enormous pain later. Schema evolution is the hardest problem in data engineering — AWS Glue crawlers help but require careful partition design.",
},
{
  id: 10,
  title: "JobPulse AI",
  description:
    "An autonomous, zero-cost career OS that wakes up before you do — scrapes 4 job boards, surgically tailors your LaTeX resume per JD via AI-generated diffs, hunts down the hiring manager, and drafts personalized outreach. The evolved, full-stack version of Resume Tweaker.",
  tags: ["Next.js", "FastAPI", "Python", "Gemini 1.5 Flash", "Supabase", "pgvector", "n8n", "GitHub Actions", "LaTeX"],
  status: "brewing",
  impact: [
    { value: "90%+", label: "ATS score target" },
    { value: "$0", label: "monthly infra cost" },
    { value: "4", label: "job boards scraped" },
  ],
  url: "https://github.com/sahil1402",
  featured: false,
  challenge: "Resume Tweaker proved the LaTeX diff concept — but stopped at tailoring. The real bottleneck is the entire application loop: finding jobs fast enough to be early, tailoring for each one without burning 45 minutes, tracking down the actual human to contact, and sending something that doesn't read like a template. No existing tool handles all four.",
  solution: "Evolved Resume Tweaker into a full agentic pipeline: n8n + Apify scrape LinkedIn, Wellfound, and YC Jobs every morning, feeding into 4 Gemini agents — JD Analyzer, LaTeX Tailor, Recruiter Finder (Serper.dev), and RAG Outreach Writer. GitHub Actions compiles the tailored .tex to PDF. A React dashboard surfaces everything: split JD vs resume view, Kanban tracker, and one-click copy for all outreach drafts.",
  keyDecisions: "Kept the LaTeX diff approach from Resume Tweaker (REPLACE THIS / WITH THIS blocks) — surgical, reviewable, never a full rewrite. Added pgvector RAG over a GitHub Project Bank so the agent swaps in your strongest relevant project automatically. GitHub Actions as a free LaTeX compiler avoids any paid infra. Entire stack — Supabase, Gemini Flash, Serper.dev, Vercel, HF Spaces — runs at $0/month.",
  learnings: "Still in active build — full technical documentation complete across architecture diagrams, 7-phase implementation checklist, API spec, database schema, and agent prompt templates covering all 4 intelligence-layer agents.",
},
{
  id: 8,
  title: "Customer Segmentation",
  description:
    "RFM-based customer segmentation analysis for an automobile bike company — 11 customer segments identified from transaction history, with a Tableau Sales Dashboard and full data quality assessment pipeline in Python.",
  tags: ["Python", "Pandas", "Tableau", "RFM Analysis", "EDA", "Jupyter"],
  status: "shipped",
  impact: [
    { value: "11", label: "customer segments identified" },
    { value: "4", label: "datasets cleaned & merged" },
    { value: "3yr", label: "transaction history analyzed" },
  ],
  url: "https://github.com/sahil1402/Customer_Segmentation-with-Dashboard",
  homepage: "https://public.tableau.com/app/profile/sahil.satasiya/viz/CustomerSegmentation_16813763396960/RFMDashboard#1",
  featured: false,
  challenge: "Raw customer data for an automobile company was spread across 4 inconsistent Excel sheets — missing values, unstandardized gender/state columns, wrong data types, and no unified customer view. Without segmentation, the business had no way to identify which customers to target to maximize revenue.",
  solution: "Built a full DQA and cleaning pipeline in Python across all 4 datasets — imputing missing values, standardizing categorical columns, engineering Age and Profit features, and merging into a unified dataset. Applied RFM (Recency, Frequency, Monetary) scoring to segment customers into 11 groups (Platinum, Very Loyal, High Risk, Lost, etc.) and built a Tableau Sales Dashboard with scatter plots showing Recency vs Monetary and Frequency vs Monetary relationships.",
  keyDecisions: "Chose RFM over clustering (K-Means) because RFM produces business-interpretable segments that marketing teams can act on directly — 'Platinum Customers' is more actionable than 'Cluster 2'. Separated DQA notebooks per dataset to isolate cleaning logic and make each step auditable. Used Tableau over matplotlib for the final dashboard because interactivity matters for business stakeholder presentations.",
  learnings: "Data quality assessment is the most time-consuming and highest-leverage part of any analytics project — the RFM model itself took less time than cleaning the 4 input datasets. RFM is a deceptively simple but powerful segmentation framework: the 11 segments gave the business immediately actionable targeting priorities without any ML complexity.",
},
{
  id: 9,
  title: "Cricket T20 Analytics",
  description:
    "End-to-end data analytics pipeline on T20 World Cup data — web scraped from ESPN Cricinfo, cleaned in Pandas, transformed in Power Query, and visualized in a Power BI dashboard that lets you pick your best playing 11 from the entire player pool.",
  tags: ["Python", "Pandas", "Power BI", "DAX", "Web Scraping", "Jupyter"],
  status: "shipped",
  impact: [
    { value: "11", label: "optimal players selectable" },
    { value: "6", label: "pipeline stages end-to-end" },
    { value: "7", label: "player role categories" },
  ],
  url: "https://github.com/sahil1402/Cricket-T20-World-Cup-Data-Analysis",
  featured: false,
  challenge: "Raw T20 World Cup data from ESPN Cricinfo is unstructured and spread across multiple pages — no single clean dataset exists. Manually comparing players across roles (openers, anchors, finishers, all-rounders, fast bowlers) to pick an optimal XI is nearly impossible without a structured analytical framework.",
  solution: "Built a full analytics pipeline: scraped match and player data from ESPN Cricinfo via Python, cleaned and preprocessed with Pandas, transformed in Power Query, and modeled in Power BI with DAX measures. The final dashboard has role-specific views (Power Hitters, Anchors, Finishers, All-Rounders, Fast Bowlers) with hover tooltips showing individual stats, and a Pick Final 11 screen for data-driven team selection.",
  keyDecisions: "Chose Power BI over a custom viz layer because DAX handles role-based filtering and dynamic player comparisons natively. Separated data cleaning (Python/Pandas) from transformation (Power Query) to keep each stage focused — Python handles raw scraping artifacts, Power Query handles analytical reshaping. Modeled player roles as separate fact tables to enable independent filtering per role.",
  learnings: "Web scraping sports data requires handling inconsistent HTML across match types and seasons — robust null handling and deduplication matter more than the model itself. DAX is surprisingly powerful for sports analytics: calculated columns for strike rate, economy, and batting average with dynamic filters made the dashboard genuinely interactive.",
},
]

const filters = ["all", "shipped", "in-progress", "brewing"]

export function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.status === activeFilter)

  return (
    <section id="projects" className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 flex flex-col gap-6 sm:gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3 animate-fade-in-up">
            <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">Artifacts</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Projects</h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap scrollbar-hide animate-fade-in-up stagger-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "shrink-0 rounded-lg border px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 active:scale-[0.98]",
                  activeFilter === filter
                    ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20"
                    : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground hover:bg-secondary/50",
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-card/40 p-6 sm:p-7 glass transition-all duration-400 active:scale-[0.99] hover-lift hover:border-primary/40 hover:bg-card/70 animate-fade-in-up cursor-pointer",
                "highlight" in project && project.highlight
                  ? "sm:col-span-2 lg:col-span-2 border-primary/30 bg-gradient-to-br from-primary/8 via-card/50 to-primary/8"
                  : "border-border/60",
                project.featured && !("highlight" in project && project.highlight) && "sm:col-span-2 lg:col-span-1",
              )}
              style={{ animationDelay: `${(index % 6) * 100 + 200}ms` }}
            >
              {"highlight" in project && project.highlight && (
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1.5 animate-pulse-glow">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-medium">
                    Featured
                  </span>
                </div>
              )}

              <div
                className={cn(
                  "absolute right-5 top-5 flex items-center gap-2.5",
                  "highlight" in project && project.highlight && "top-5",
                )}
              >
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-shadow duration-300",
                    project.status === "shipped" && "bg-primary shadow-sm shadow-primary/50",
                    project.status === "in-progress" && "bg-yellow-500 animate-pulse shadow-sm shadow-yellow-500/50",
                    project.status === "brewing" && "bg-purple-500 animate-pulse shadow-sm shadow-purple-500/50",
                  )}
                />
                <span className="font-mono text-xs text-muted-foreground">{project.status}</span>
              </div>

              <div className={cn("highlight" in project && project.highlight && "mt-10")} />

              <h3
                className={cn(
                  "mb-3 font-bold tracking-tight transition-all duration-300 group-hover:text-gradient",
                  "highlight" in project && project.highlight ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
                )}
              >
                {project.title}
              </h3>

              <p
                className={cn(
                  "mb-5 text-sm leading-relaxed text-muted-foreground",
                  "highlight" in project && project.highlight ? "line-clamp-3" : "line-clamp-2",
                )}
              >
                {project.description}
              </p>

              <div className="mb-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border/80 bg-secondary/60 px-2.5 py-1 font-mono text-xs text-secondary-foreground transition-colors hover:border-primary/50 hover:bg-primary/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-all duration-300 group/link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                  <span className="underline-animate">source</span>
                </a>
                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs text-primary hover:text-foreground transition-all duration-300 group/link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110 group-hover/link:rotate-12" />
                    <span className="underline-animate">live</span>
                  </a>
                )}
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
<DialogContent className="max-h-[90vh] overflow-y-auto bg-background border-border shadow-2xl rounded-2xl p-0" style={{ width: "clamp(320px, 88vw, 1000px)", maxWidth: "1000px" }}>
          {selectedProject && (
            <>
              <DialogTitle className="sr-only">{selectedProject.title}</DialogTitle>

              {/* Header */}
              <div className="p-7 border-b border-border/40">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 font-mono text-sm text-primary font-semibold">
                    <Code2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold tracking-tight">{selectedProject.title}</h2>
                    <div className="flex items-center gap-2 mt-1 flex-wrap" />
                    <div className="flex gap-2 mt-3 flex-wrap">
                      <span
                        className={cn(
                          "rounded-full border px-3 py-0.5 font-mono text-xs",
                          selectedProject.status === "shipped"
                            ? "border-primary/30 bg-primary/10 text-primary"
                            : selectedProject.status === "in-progress"
                              ? "border-blue-500/30 bg-blue-500/10 text-blue-500"
                              : "border-purple-500/30 bg-purple-500/10 text-purple-500"
                        )}
                      >
                        {selectedProject.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 mr-8">
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-border/50 hover:border-primary/40 hover:bg-muted/30 transition-all"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {selectedProject.homepage && (
                      <a
                        href={selectedProject.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-border/50 hover:border-primary/40 hover:bg-muted/30 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-7 pb-7 pt-1 space-y-7">

                {/* Overview */}
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-3">
                    Overview
                    <span className="flex-1 h-px bg-border/40" />
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Tech Stack */}
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-3">
                    Tech Stack
                    <span className="flex-1 h-px bg-border/40" />
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary transition-all duration-300 hover:bg-primary/20 hover:border-primary/60 hover:scale-105 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                {selectedProject.impact && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-3">
                  Impact
                  <span className="flex-1 h-px bg-border/40" />
                  </p>
                <div className="grid grid-cols-3 gap-3">
                  {selectedProject.impact.map((item, i) => (
                <div key={i} className="rounded-xl bg-secondary/40 border border-border/40 p-3 text-center">
                <div className="text-xl font-semibold font-mono text-primary">{item.value}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-snug">{item.label}</div>
              </div>
          ))}
        </div>
      </div>
      )}

                {/* The Challenge */}
                {selectedProject.challenge && (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-3">
                      The Challenge
                      <span className="flex-1 h-px bg-border/40" />
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.challenge}</p>
                  </div>
                )}

                {/* The Solution */}
                {selectedProject.solution && (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-3">
                      The Solution
                      <span className="flex-1 h-px bg-border/40" />
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.solution}</p>
                  </div>
                )}

                {/* Key Decisions */}
                {selectedProject.keyDecisions && (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-3">
                      Key Decisions
                      <span className="flex-1 h-px bg-border/40" />
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.keyDecisions}</p>
                  </div>
                )}

                {/* Learnings */}
                {selectedProject.learnings && (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-3">
                      Learnings
                      <span className="flex-1 h-px bg-border/40" />
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.learnings}</p>
                  </div>
                )}

              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}