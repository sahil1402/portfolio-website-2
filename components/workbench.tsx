import { cn } from "@/lib/utils"
import { Github, ExternalLink } from "lucide-react"

const wipItems = [
  {
    id: 1,
    name: "Python",
    description: "Expert — NumPy, Pandas, asyncio, packaging",
    progress: 85,
    lastUpdated: "Expert",
    url: "#",
  },
  {
    id: 2,
    name: "ML / DL Modeling",
    description: "Expert — PyTorch, scikit-learn, XGBoost, model evaluation",
    progress: 85,
    lastUpdated: "Expert",
    url: "#",
  },
  {
    id: 3,
    name: "LLM Engineering",
    description: "Expert — RAG pipelines, prompt engineering, LangChain, LangGraph",
    progress: 85,
    lastUpdated: "Expert",
    url: "#",
  },
  {
    id: 4,
    name: "FastAPI / Backend Systems",
    description: "Proficient — async APIs, Celery, Redis, WebSockets",
    progress: 65,
    lastUpdated: "Proficient",
    url: "#",
  },
  {
    id: 5,
    name: "Data Engineering",
    description: "Proficient — AWS Glue, S3, Athena, pipeline orchestration",
    progress: 65,
    lastUpdated: "Proficient",
    url: "#",
  },
  {
    id: 6,
    name: "Full Stack",
    description: "Proficient — Next.js 14, TypeScript, Tailwind, Supabase",
    progress: 65,
    lastUpdated: "Proficient",
    url: "#",
  },
  {
    id: 7,
    name: "MLOps / Infra",
    description: "Proficient — Docker, GitHub Actions, CI/CD, Vercel",
    progress: 65,
    lastUpdated: "Proficient",
    url: "#",
  },
  {
    id: 8,
    name: "Vector Search & Graphs",
    description: "Proficient — pgvector, Neo4j, Graph RAG, embeddings",
    progress: 45,
    lastUpdated: "Proficient",
    url: "#",
  },
]

export function Workbench() {
  return (
    <section id="arsenal" className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 space-y-3 animate-fade-in-up">
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            TOOLS & CRAFT
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Arsenal</h2>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Active experiments and prototypes. Things that are being built, broken, and rebuilt.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/40 glass backdrop-blur-sm overflow-hidden hover-lift animate-scale-in stagger-2">
          {/* Terminal header */}
          <div className="flex items-center gap-3 border-b border-border/50 bg-secondary/40 px-4 sm:px-5 py-3.5 sm:py-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive/60 transition-colors hover:bg-destructive cursor-pointer" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500 cursor-pointer" />
              <div className="h-3 w-3 rounded-full bg-primary/60 transition-colors hover:bg-primary cursor-pointer" />
            </div>
            <span className="ml-4 font-mono text-xs text-muted-foreground truncate">~/sahil/arsenal</span>
            <div className="ml-auto hidden sm:flex items-center gap-2 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs">live</span>
            </div>
          </div>

          <div className="divide-y divide-border/30">
            {wipItems.map((item, index) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 p-5 sm:p-6 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between hover:bg-secondary/30 animate-fade-in"
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-mono text-sm shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                      $
                    </span>
                    <h4 className="font-mono text-sm font-medium tracking-tight transition-colors group-hover:text-gradient truncate">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Github className="h-3.5 w-3.5 text-muted-foreground" />
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="pl-6 text-xs text-muted-foreground line-clamp-2 sm:line-clamp-1">{item.description}</p>
                </div>

                <div className="flex items-center justify-between gap-6 pl-6 sm:pl-0 sm:justify-end">
                  <div className="flex items-center gap-3 flex-1 sm:flex-none">
                    <div className="h-2 w-full sm:w-28 overflow-hidden rounded-full bg-secondary/80 relative">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-700 ease-out",
                          item.progress >= 80 ? "bg-primary" : item.progress >= 50 ? "bg-yellow-500" : "bg-orange-500",
                        )}
                        style={{ width: `${item.progress}%` }}
                      />
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 animate-shimmer opacity-30" />
                    </div>
                    <span
                      className={cn(
                        "font-mono text-xs w-10 shrink-0 transition-colors",
                        item.progress >= 80 ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {item.progress}%
                    </span>
                  </div>

                  <span className="font-mono text-xs text-muted-foreground shrink-0">{item.lastUpdated}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="border-t border-border/50 bg-secondary/30 px-4 sm:px-5 py-4">
            <div className="mb-3">
              <div className="font-mono text-xs text-primary/60">// currently exploring</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary font-mono">&gt;</span>
                <div className="min-w-0">
                  <div className="font-mono text-sm font-medium">Multi-agent systems</div>
                  <p className="text-xs text-muted-foreground">LangGraph stateful agents, tool-calling patterns, memory architectures</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-primary font-mono">&gt;</span>
                <div className="min-w-0">
                  <div className="font-mono text-sm font-medium">LLM fine-tuning</div>
                  <p className="text-xs text-muted-foreground">LoRA, QLoRA, RLHF, instruction tuning on domain-specific data</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-primary font-mono">&gt;</span>
                <div className="min-w-0">
                  <div className="font-mono text-sm font-medium">Distributed MLOps</div>
                  <p className="text-xs text-muted-foreground">Kubernetes, Kubeflow, model serving at scale</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 bg-secondary/30 px-4 sm:px-5 py-4">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="text-primary">❯</span>
              <span className="typing-cursor truncate">git status --all</span>
              <span className="ml-auto text-primary/50 hidden sm:block">press enter to run</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
