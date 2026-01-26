"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Github, Star, GitFork, ExternalLink, Sparkles, Code2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  status: "shipped" | "in-progress" | "archived"
  year: string
  stars: number
  forks: number
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
    title: "EinUI",
    description:
      "A collection of beautiful, ready-made Liquid Glass UI components you can preview, copy, and drop into any web app. Built on Tailwind, shadcn/ui, and Radix UI primitives.",
    tags: ["TypeScript", "Next.js 16", "shadcn", "Radix UI", "Tailwind"],
    status: "in-progress",
    year: "2025",
    stars: 34,
    forks: 1,
    url: "https://github.com/ehsanghaffar/einui",
    homepage: "https://ui.eindev.ir",
    featured: true,
    highlight: true,
    challenge: "Developers often struggle to find high-quality, customizable UI components that work seamlessly with modern frameworks and support glassmorphism design trends.",
    solution: "Built a comprehensive component library with 30+ Liquid Glass UI components, featuring live previews, one-click copy functionality, and full compatibility with Tailwind CSS v4 and shadcn/ui.",
    keyDecisions: "Chose compound component patterns for flexibility. Used CSS variables for theming to enable runtime customization. Implemented strict TypeScript to catch integration issues early.",
    learnings: "Learned that the best design systems optimize for deletion—making it easy to remove or replace components matters as much as building them well initially.",
  },
  {
    id: 1,
    title: "EinBioGPT",
    description:
      "An intelligent web application built with Next.js, Tailwind CSS, and OpenAI's GPT models. Generates engaging and personalized bios for social media platforms.",
    tags: ["TypeScript", "Next.js", "GPT", "LangChain"],
    status: "shipped",
    year: "2023",
    stars: 17,
    forks: 8,
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
    year: "2020",
    stars: 19,
    forks: 5,
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
    year: "2025",
    stars: 9,
    forks: 4,
    url: "https://github.com/ehsanghaffar/next16-docker-tw4-starter",
    homepage: "https://nextjs-16-docker.vercel.app",
    featured: true,
    challenge: "Setting up a production-ready Next.js application with Docker, authentication, and modern tooling requires significant boilerplate and configuration.",
    solution: "Built a comprehensive starter template with pre-configured Docker multi-stage builds, Next-Auth v5 integration, Tailwind v4, and optimized production settings.",
    keyDecisions: "Used multi-stage Docker builds to minimize image size. Implemented PNPM for faster installs. Added health checks and proper environment variable handling.",
    learnings: "Container optimization can reduce image sizes by 70%+ and significantly improve deployment times in CI/CD pipelines.",
  },
  {
    id: 4,
    title: "Awesome Clubhouses",
    description:
      "Curated list of resources for Clubhouse, the voice-based social network where people come together to talk, listen and learn.",
    tags: ["Python", "Awesome List", "Social"],
    status: "archived",
    year: "2022",
    stars: 41,
    forks: 8,
    url: "https://github.com/ehsanghaffar/awesome-clubhouse",
    homepage: "https://ehsanghaffar.github.io/awesome-clubhouse/",
    featured: false,
    challenge: "During Clubhouse's peak popularity, developers and users struggled to find reliable resources, tools, and unofficial APIs in one place.",
    solution: "Created a comprehensive awesome-list aggregating tools, libraries, tutorials, and community resources for the Clubhouse platform.",
    keyDecisions: "Followed the awesome-list format for discoverability. Added contribution guidelines. Implemented automated link checking to maintain quality.",
    learnings: "Community-driven projects require clear contribution guidelines and active maintenance to stay relevant and useful.",
  },
  {
    id: 5,
    title: "LLM Practice",
    description:
      "A self-hosted personal chatbot API with FastAPI. Interact with Llama2 and other open-source LLMs for natural language conversations.",
    tags: ["Python", "FastAPI", "Llama2", "MCP"],
    status: "shipped",
    year: "2023",
    stars: 13,
    forks: 3,
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
    year: "2025",
    stars: 8,
    forks: 1,
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
    year: "2023",
    stars: 19,
    forks: 6,
    url: "https://github.com/ehsanghaffar/nextjs-appdir-docker",
    featured: false,
    challenge: "The Next.js App Router was new and developers needed practical examples of integrating it with databases and containerization.",
    solution: "Created a full-stack template demonstrating App Router patterns, MongoDB integration with Mongoose, and Docker Compose for local development.",
    keyDecisions: "Used server actions for data mutations. Implemented proper error boundaries. Added database connection pooling for serverless environments.",
    learnings: "Early adoption of new frameworks helps you understand their design philosophy and prepares you for production challenges others will face later.",
  },
]

const filters = ["all", "shipped", "in-progress", "archived"]

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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Open Source Projects</h2>
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

              {/* Status indicator */}
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
                    project.status === "archived" && "bg-muted-foreground",
                  )}
                />
                <span className="font-mono text-xs text-muted-foreground">{project.status}</span>
              </div>

              <div
                className={cn(
                  "mb-5 font-mono text-xs text-muted-foreground",
                  "highlight" in project && project.highlight && "mt-10",
                )}
              >
                {project.year}
              </div>

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

              <div className="mb-5 flex items-center gap-5 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 transition-colors group-hover:text-yellow-500">
                  <Star className="h-3.5 w-3.5" />
                  {project.stars}
                </span>
                <span className="flex items-center gap-1.5 transition-colors group-hover:text-foreground">
                  <GitFork className="h-3.5 w-3.5" />
                  {project.forks}
                </span>
              </div>

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
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-background backdrop-blur-xl border-border shadow-2xl">
          {selectedProject && (
            <>
              <DialogHeader className="flex flex-row items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 border border-primary/30">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-xl font-bold">{selectedProject.title}</DialogTitle>
                  <p className="font-mono text-sm text-muted-foreground mt-1">{selectedProject.year}</p>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">{selectedProject.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* The Challenge */}
                {selectedProject.challenge && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-8 bg-primary" />
                      <h4 className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                        The Challenge
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed pl-11">
                      {selectedProject.challenge}
                    </p>
                  </div>
                )}

                {/* The Solution */}
                {selectedProject.solution && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-8 bg-primary" />
                      <h4 className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                        The Solution
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed pl-11">
                      {selectedProject.solution}
                    </p>
                  </div>
                )}

                {/* Key Decisions */}
                {selectedProject.keyDecisions && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-8 bg-primary" />
                      <h4 className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                        Key Decisions
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed pl-11">
                      {selectedProject.keyDecisions}
                    </p>
                  </div>
                )}

                {/* Learnings */}
                {selectedProject.learnings && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-8 bg-primary" />
                      <h4 className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                        Learnings
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed pl-11">
                      {selectedProject.learnings}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4">
                  {selectedProject.homepage && (
                    <Button asChild className="gap-2">
                      <a href={selectedProject.homepage} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        View Live
                      </a>
                    </Button>
                  )}
                  <Button asChild variant="outline" className="gap-2 bg-transparent">
                    <a href={selectedProject.url} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      Source Code
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
