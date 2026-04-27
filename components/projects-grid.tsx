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
  title: "Graph RAG Agent",
  description:
    "A Graph-based RAG agent that executes multi-step browser tasks while learning from past interactions via a persistent knowledge graph — enabling multi-hop reasoning and continuous improvement without retraining.",
  tags: ["Python", "Graph RAG", "FastAPI", "HTML/CSS/JS", "JSON"],
  status: "in-progress",
  impact: [
  { value: "28%", label: "reduction in task steps" },
  { value: "2×", label: "faster decision-making" },
  { value: "100%", label: "memory persistence" },
],
  url: "https://github.com/sahil1402/Graph_Rag_Agent",
  featured: true,
  highlight: true,
  challenge: "Traditional LLM agents are stateless — they forget everything after each run, struggle with sequential decision-making, repeat bad actions, and can't learn from past interactions. Simple vector RAG fails on tasks with dependencies between actions and multi-hop reasoning requirements.",
  solution: "Designed a Graph RAG architecture where each interaction is stored as nodes (states/entities) and edges (actions + outcomes). The agent retrieves past trajectories, prioritizes successful paths, avoids previously failed actions, and uses memory reinforcement to boost successful edges — transforming a reactive agent into a learning agent with structured memory. Added a browser UI with live graph visualization for explainability.",
  keyDecisions: "Chose graphs over vector RAG because relationships matter more than similarity and graphs enable multi-hop reasoning. Simulated the environment first (not real browser automation) for faster iteration and cleaner architecture. Treated memory as a first-class component central to decision-making rather than optional. Added a visualization layer to improve explainability and make system behavior interpretable.",
  learnings: "Graph structures outperform embeddings for sequential decision problems. Persistent memory is the key differentiator in agent systems. Building agents is less about LLMs and more about state management and decision policies. Visualization dramatically improves both debugging and storytelling. Iterative approach (CLI → Web → real browser) is far more effective than overbuilding upfront.",
},
  {
    id: 1,
    title: "EinBioGPT",
    description:
      "An intelligent web application built with Next.js, Tailwind CSS, and OpenAI's GPT models. Generates engaging and personalized bios for social media platforms.",
    tags: ["TypeScript", "Next.js", "GPT", "LangChain"],
    status: "brewing",
    impact: [
      { value: "28%", label: "reduction in task steps" },
      { value: "2×", label: "faster decision-making" },
      { value: "100%", label: "memory persistence" },
    ],
    url: "https://github.com/ehsanghaffar/einbiogpt",
    homepage: "https://bio.eindev.ir/",
    featured: true,
    challenge: "Writing compelling social media bios is time-consuming and many people struggle to effectively communicate their personal brand in limited characters.",
    solution: "Created an AI-powered bio generator that uses GPT models with custom prompts to generate platform-specific, engaging bios based on user input about their profession and personality.",
    keyDecisions: "Used LangChain for prompt engineering and response formatting. Implemented streaming responses for better UX. Added platform-specific templates for Twitter, LinkedIn, and Instagram.",
    learnings: "Prompt engineering is crucial for AI applications—small changes in prompts can dramatically affect output quality and consistency.",
  },
  {
    id: 2,
    title: "JavaScript Playground",
    description:
      "A collection of JavaScript code snippets, algorithms, and mini-projects for learning and reference purposes.",
    tags: ["JavaScript", "Algorithms", "Snippets"],
    status: "shipped",
    impact: [
      { value: "28%", label: "reduction in task steps" },
      { value: "2×", label: "faster decision-making" },
      { value: "100%", label: "memory persistence" },
    ],
    url: "https://github.com/ehsanghaffar/javascript-playground",
    featured: false,
    challenge: "Learning JavaScript algorithms and patterns requires practical examples, but many resources are either too theoretical or lack real-world context.",
    solution: "Created a curated collection of JavaScript snippets covering data structures, algorithms, and common programming patterns with clear explanations and use cases.",
    keyDecisions: "Organized content by difficulty level and category. Added comments explaining time/space complexity. Included unit tests for algorithm verification.",
    learnings: "Teaching others is the best way to solidify your own understanding—documenting these patterns helped me master them.",
  },
  {
    id: 3,
    title: "Next.js 16 Docker Starter",
    description:
      "A batteries-included starter for building Next.js 16.1.0 apps with App Router, PNPM, Tailwind v4+, Next-Auth v5, and multi-stage Docker setup.",
    tags: ["Next.js 16.1.0", "Docker", "Tailwind v4"],
    status: "in-progress",
    impact: [
      { value: "28%", label: "reduction in task steps" },
      { value: "2×", label: "faster decision-making" },
      { value: "100%", label: "memory persistence" },
    ],
    url: "https://github.com/ehsanghaffar/next16-docker-tw4-starter",
    homepage: "https://nextjs-16-docker.vercel.app",
    featured: true,
    challenge: "Setting up a production-ready Next.js application with Docker, authentication, and modern tooling requires significant boilerplate and configuration.",
    solution: "Built a comprehensive starter template with pre-configured Docker multi-stage builds, Next-Auth v5 integration, Tailwind v4, and optimized production settings.",
    keyDecisions: "Used multi-stage Docker builds to minimize image size. Implemented PNPM for faster installs. Added health checks and proper environment variable handling.",
    learnings: "Container optimization can reduce image sizes by 70%+ and significantly improve deployment times in CI/CD pipelines.",
  },
  {
    id: 5,
    title: "LLM Practice",
    description:
      "A self-hosted personal chatbot API with FastAPI. Interact with Llama2 and other open-source LLMs for natural language conversations.",
    tags: ["Python", "FastAPI", "Llama2", "MCP"],
    status: "shipped",
    impact: [
      { value: "28%", label: "reduction in task steps" },
      { value: "2×", label: "faster decision-making" },
      { value: "100%", label: "memory persistence" },
    ],
    url: "https://github.com/ehsanghaffar/llm-practice",
    featured: false,
    challenge: "Running LLMs locally for development and testing often requires complex setup and significant computational resources.",
    solution: "Built a lightweight FastAPI wrapper for local LLM inference, supporting multiple models including Llama2 with configurable parameters and conversation history.",
    keyDecisions: "Used FastAPI for async request handling. Implemented model caching to reduce memory overhead. Added MCP support for tool integration.",
    learnings: "Local LLM development is becoming increasingly accessible—quantized models can run effectively on consumer hardware with proper optimization.",
  },
  {
    id: 6,
    title: "Hand-Build Linux",
    description:
      "A minimal, customizable Linux distribution built from scratch using the Linux kernel, BusyBox, and Syslinux bootloader.",
    tags: ["Shell", "Linux", "Docker"],
    status: "in-progress",
    impact: [
      { value: "28%", label: "reduction in task steps" },
      { value: "2×", label: "faster decision-making" },
      { value: "100%", label: "memory persistence" },
    ],
    url: "https://github.com/ehsanghaffar/handbuilt-linux",
    featured: true,
    challenge: "Understanding how Linux systems work at a fundamental level is difficult without hands-on experience building one from scratch.",
    solution: "Created a minimal Linux distribution using only essential components: a custom-compiled kernel, BusyBox for core utilities, and Syslinux as the bootloader.",
    keyDecisions: "Started with the smallest possible system and added components incrementally. Used Docker for reproducible builds. Documented each step for educational purposes.",
    learnings: "Building a Linux system from scratch teaches you more about operating systems than any textbook—you understand every component because you had to add it yourself.",
  },
  {
    id: 7,
    title: "Next.js AppDir Template",
    description:
      "An all-inclusive Next.js web application template showcasing seamless integration of Next.js, Docker, MongoDB, and Tailwind CSS.",
    tags: ["TypeScript", "Next.js", "Docker", "MongoDB"],
    status: "shipped",
    impact: [
      { value: "28%", label: "reduction in task steps" },
      { value: "2×", label: "faster decision-making" },
      { value: "100%", label: "memory persistence" },
    ],
    url: "https://github.com/ehsanghaffar/nextjs-appdir-docker",
    featured: false,
    challenge: "The Next.js App Router was new and developers needed practical examples of integrating it with databases and containerization.",
    solution: "Created a full-stack template demonstrating App Router patterns, MongoDB integration with Mongoose, and Docker Compose for local development.",
    keyDecisions: "Used server actions for data mutations. Implemented proper error boundaries. Added database connection pooling for serverless environments.",
    learnings: "Early adoption of new frameworks helps you understand their design philosophy and prepares you for production challenges others will face later.",
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
        <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto bg-background border-border shadow-2xl rounded-2xl p-0">
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
                  <div className="flex gap-2 flex-shrink-0">
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

              {/* Footer */}
              <div className="px-7 py-4 border-t border-border/40 flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">
                  {projects.indexOf(selectedProject) + 1} of {projects.length} projects
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono border border-border/60 rounded-lg px-4 py-1.5 hover:bg-secondary/50"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}