"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowRight, ChevronDown } from "lucide-react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

interface Experience {
  id: number
  role: string
  company: string
  duration: string
  type: string
  location?: string
  summary: string
  description: string
  achievements: string[]
  impact?: { value: string; label: string }[]
  techStack?: string[]
  category: "technical" | "ventures"
}

const experiences: Experience[] = [
  {
    id: 1,
    role: "Co-Founder & Founding ML Engineer",
    company: "CampusX",
    duration: "Sep 2025 - Jan 2026",
    type: "full-time",
    location: "Los Angeles, CA",
    category: "technical",
    summary: "Built two production ML systems from scratch — an LLM-based trust & safety classifier and a two-tower recommendation engine — improving feed conversion by 12% and reducing policy violations by 41%.",
    description: "As Co-Founder and Founding ML Engineer at CampusX, I owned the entire ML stack from day one — no existing infrastructure, no prior models. I fine-tuned a Mistral 7B classifier via SFT for content moderation, built a two-tower retrieval and reranking pipeline for personalized feeds, and shipped real-time inference infrastructure serving 2K+ concurrent transactions at 99.9% uptime. Every system was built for production: A/B tested, monitored for drift, and embedded in a continuous retraining flywheel.",
    achievements: [
      "Fine-tuned Mistral 7B via SFT (HuggingFace TRL) on policy-violation vs. compliant content pairs, achieving 92% precision in production — chose precision over accuracy to minimize false positives that harm innocent users",
      "Shipped a two-tower retrieval + reranking pipeline using embedding-based candidate generation (FAISS ANN search, 128-dim embeddings) and cross-feature reranker, improving feed conversion by 12% via A/B test",
      "Designed and deployed LLM-based trust & safety classifier reducing policy violations by 41%, with three-tier confidence thresholds (auto-publish / human review / auto-remove) and full prediction logging",
      "Built real-time inference infrastructure with FastAPI (async, non-blocking), load balancing, and caching by text hash — sustaining 99.9% uptime across 2K+ concurrent transactions at ~150ms latency",
      "Established post-training evaluation and retraining workflows using offline ranking metrics and MLflow experiment tracking, detecting production drift and triggering continuous retraining cycles",
      "Conducted in-depth EDA on marketplace behavioral data to identify seasonality trends and demand shifts, supporting data-driven product and model decisions",
    ],
    impact: [
      { value: "41%", label: "policy violation reduction" },
      { value: "12%", label: "feed conversion lift" },
      { value: "99.9%", label: "production uptime" },
    ],
    techStack: ["Mistral 7B", "SFT / TRL", "FAISS", "FastAPI", "MLflow", "Python", "AWS", "PyTorch"],
  },
  {
    id: 2,
    role: "Co-Founder",
    company: "CampusX",
    duration: "Sep 2025 - Jan 2026",
    type: "full-time",
    location: "Los Angeles, CA",
    category: "ventures",
    summary: "Co-founded a student marketplace startup at USC — led product vision, go-to-market strategy, and early team building from zero to first users.",
    description: "As Co-Founder of CampusX, I led the non-technical side of the venture — defining the product vision, shaping go-to-market strategy, recruiting early team members, and driving user acquisition on campus. I worked closely with the engineering and design team to translate user feedback into product decisions, and navigated the early-stage chaos of building a startup from scratch.",
    achievements: [
      "Co-founded CampusX from zero — defined the founding vision, core value proposition, and initial product roadmap",
      "Led go-to-market strategy and early user acquisition on USC campus, driving initial traction",
      "Recruited and onboarded early team members across engineering and design",
      "Translated user research and feedback into actionable product decisions",
      "Managed stakeholder communication, investor conversations, and strategic partnerships",
    ],
    impact: [
      { value: "0→1", label: "product built from scratch" },
      { value: "USC", label: "campus launch" },
      { value: "seed", label: "early stage venture" },
    ],
  },
  {
    id: 3,
    role: "Software Engineer",
    company: "Tata Consultancy Services",
    duration: "May 2024 - Jun 2025",
    type: "full-time",
    location: "Pune, India",
    category: "technical",
    summary: "Built production data infrastructure for Givaudan ($8.5B Swiss MNC) — scalable PySpark pipelines across 6 data sources, behavioral modeling on 50K+ events, and systematic ETL stabilization reducing pipeline failures by 15%.",
    description: "As an Software Engineer at TCS, I served Givaudan — the world's largest flavour and fragrance company — building the Martrix platform, an internal analytics system aggregating data from 6 sources across 80K+ URLs. My work spanned three workstreams: architecting distributed ETL pipelines, behavioral ranking analysis on B2B customer interaction data, and a systematic audit that shifted the team from reactive debugging to proactive prevention across 20+ workflows.",
    achievements: [
      "Architected PySpark ETL pipelines with explicit StructType schemas and a schema validation gate — quarantining unexpected records into a rejected partition instead of silently dropping them, preventing silent data loss across 6 sources (Google Search Console, New Relic, Medallia, Screaming Frog, SonarQube, Google Analytics)",
      "Optimized pipeline performance using broadcast joins for small dimension tables, salting for partition skew on high-traffic URL data, and .persist(MEMORY_AND_DISK) for reused intermediate DataFrames — processing 80K+ URLs daily",
      "Performed behavioral modeling and ranking analysis on 10K+ web pages and 50K+ interaction events — discovered and fixed a logging deduplication bug causing double-counted events before it corrupted downstream ML training data",
      "Built composite ranking scores with business-weighted metrics (conversion 0.35, engagement 0.25, time-on-page 0.20, search position 0.15) validated with confidence intervals and Bonferroni correction across 100+ page comparisons",
      "Conducted systematic audit of 20+ ETL workflows — categorized 3 months of failure logs by root cause (null handling 35%, partition skew 25%, join explosions 12%, schema drift 8%), built reusable fix templates, reducing pipeline failures by 15%",
      "Stored all pipeline outputs in date-partitioned Parquet format enabling predicate pushdown and column pruning — 5-10x compression vs CSV with orders-of-magnitude faster time-bounded analytical queries",
    ],
    impact: [
      { value: "80K+", label: "URLs processed daily" },
      { value: "15%", label: "fewer pipeline failures" },
      { value: "$8.5B", label: "scale of client served" },
    ],
    techStack: ["PySpark", "Python", "SQL", "Parquet", "MLflow", "AWS", "ETL", "Git", "CI/CD"],
  },
  {
    id: 4,
    role: "Machine Learning Engineer Intern",
    company: "RethinkSoft",
    duration: "May 2023 - Jul 2023",
    type: "internship",
    location: "Ahmedabad, India",
    category: "technical",
    summary: "Built end-to-end ML pipeline for flight price and delay forecasting on 55K+ records — Logistic Regression outperformed XGBoost at 98% accuracy, and automated EDA framework cut analysis time by 30%.",
    description: "As an ML Engineer Intern at RethinkSoft, I covered the full ML lifecycle for aviation analytics — predicting ticket prices (regression) and delay likelihood (classification). I engineered and cleaned a 55K+ flight dataset, benchmarked 4 models with stratified cross-validation, and built a modular automated EDA framework. The key insight: Logistic Regression outperformed Random Forest and XGBoost because delay patterns were largely linearly separable — a lesson in always baselining simple models before adding complexity.",
    achievements: [
      "Engineered 55K+ flight records dataset with MCAR vs MNAR missing value analysis (median imputation within route/airline groups), IQR-based outlier detection with manual inspection, and composite-key deduplication (airline + flight_number + date + source + destination)",
      "Benchmarked 4 models (Logistic Regression, Decision Trees, Random Forest, XGBoost) with stratified k-fold cross-validation (k=5) — Logistic Regression achieved 98% accuracy, outperforming XGBoost (97%) because delay patterns were linearly separable; complex models added variance without improving the decision boundary",
      "Applied one-hot encoding for nominal categories (airline, city) and label encoding for ordinal features (flight class: economy=0, business=1, first=2); extracted hour_of_day, is_weekend, days_until_departure as key pricing signals",
      "Built a modular automated EDA framework with pluggable analyzers — NumericalAnalyzer, CategoricalAnalyzer, CorrelationAnalyzer (Pearson/Spearman + VIF), MissingDataAnalyzer, OutlierAnalyzer — reducing 2-3 hours of manual analysis to a single function call (~10 minutes), cutting effort by 30%",
      "Performed feature importance analysis and hyperparameter tuning for model optimization; tracked precision, recall, F1, AUC-ROC, and confusion matrix across all model variants",
    ],
    impact: [
      { value: "98%", label: "model accuracy achieved" },
      { value: "55K+", label: "flight records engineered" },
      { value: "30%", label: "EDA effort reduction" },
    ],
    techStack: ["Python", "Scikit-learn", "XGBoost", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
  },
  {
    id: 5,
    role: "Machine Learning Intern",
    company: "NeuroNexus Innovations",
    duration: "Feb 2023 - Apr 2023",
    type: "internship",
    location: "Remote",
    category: "technical",
    summary: "Developed student performance prediction pipeline achieving 87% accuracy using supervised learning on 20K+ records.",
    description: "As an ML Intern at NeuroNexus Innovations, I built a supervised learning pipeline to predict student performance using academic and behavioral data. I implemented multiple models and created automated evaluation scripts to improve experiment reproducibility.",
    achievements: [
      "Developed supervised learning pipeline for student performance prediction on 20K+ records",
      "Implemented and compared logistic regression, random forest, and XGBoost models",
      "Achieved 87% classification accuracy through cross-validation and hyperparameter tuning",
      "Built automated EDA and evaluation scripts, improving experiment reproducibility",
    ],
    impact: [
      { value: "87%", label: "classification accuracy" },
      { value: "20K+", label: "records trained on" },
      { value: "3", label: "models benchmarked" },
    ],
    techStack: ["Python", "XGBoost", "Random Forest", "Scikit-learn", "Pandas"],
  },
  {
    id: 6,
    role: "Web Developer",
    company: "R. R. Infraprojects Pvt. Ltd",
    duration: "Jan 2023",
    type: "contract",
    location: "Remote",
    category: "technical",
    summary: "Developed responsive, scalable web applications using React and Next.js, optimizing performance and deployment workflows.",
    description: "As a Web Developer at R. R. Infraprojects Pvt. Ltd, I designed and developed responsive, user-centric web applications using React.js and Next.js. I implemented reusable component architectures, integrated RESTful APIs, and optimized application performance through modern frontend best practices.",
    achievements: [
      "Designed and developed responsive web applications using React.js, Next.js, and ES6+",
      "Implemented reusable component architectures with Tailwind CSS and Material UI",
      "Integrated RESTful APIs and managed state using Redux and Context API",
      "Optimized performance through lazy loading, code splitting, and Lighthouse best practices",
      "Ensured cross-browser compatibility and improved frontend scalability",
      "Utilized Git, GitHub, CI/CD workflows, and deployed via Vercel and Docker",
    ],
    impact: [
      { value: "React", label: "component architecture" },
      { value: "CI/CD", label: "deployment workflow" },
      { value: "Vercel", label: "production deployment" },
    ],
    techStack: ["React.js", "Next.js", "Tailwind CSS", "Redux", "REST APIs", "Docker", "Vercel"],
  },
  {
  id: 7,
  role: "Head of Expansion",
  company: "AIESEC in Chennai",
  duration: "Sep 2021 - Jan 2023 · 1 yr 5 mos",
  type: "volunteer",
  location: "Chennai, India",
  category: "ventures",
  summary: "Led expansion and operational strategy across three regional chapters (90+ members) — built KPI dashboards, designed market analysis models for new-region launches, and mentored startup leadership teams across AIESEC India.",
  description: "At AIESEC — the world's largest youth-run organization operating in 120+ countries — I progressed through four roles over 1.5 years, from Marketing Team Member to Head of Expansion. In my final and most senior role, I directed cross-regional expansion strategy, built data infrastructure for organizational decision-making, and mentored chapter leadership teams. Earlier roles spanned digital marketing, UI/UX design, and national-level data analytics as part of AIESEC's National Support Team.",
  achievements: [
    "Directed operational and expansion strategy across three regional chapters (90+ members), applying structured performance tracking frameworks to improve organizational scalability and execution efficiency",
    "Built KPI dashboards to monitor financial health, growth metrics, and operational throughput; conducted monthly and quarterly audits to ensure data-backed decision-making",
    "Designed market analysis models to evaluate expansion feasibility using demographic, financial, and engagement metrics — reducing strategic risk in new-region launches",
    "Mentored startup leadership teams using goal-setting frameworks and performance analytics, driving measurable improvements in retention, revenue targets, and operational stability",
    "As Data Analyst on the National Support Team, managed nationwide operational data tracking pipelines for startup entities across India, standardizing reporting structures across lifecycle stages",
    "Performed funnel and cohort analysis to identify bottlenecks in engagement and conversion; developed forecasting models for capacity planning at the national level",
    "As Senior Marketing Manager, designed UI/UX assets and marketing creatives in Figma and Canva, contributed to website layout improvements, and led digital campaigns across social and campus channels",
    "Collaborated cross-functionally to align expansion initiatives with national growth strategy, ensuring regulatory compliance and cost-efficient scaling",
  ],
  impact: [
    { value: "90+", label: "members across 3 chapters" },
    { value: "87%", label: "member retention rate" },
    { value: "2/3", label: "chapters upgraded to next level" },
  ],
},

{
  id: 8,
  role: "Co-Founder",
  company: "Veritas Designer",
  duration: "2019 - Present",
  type: "full-time",
  location: "India",
  category: "ventures",
  summary: "Built a 3D printing startup from a single self-assembled printer in a friend's room to an 11-printer operation — serving real estate, mobile accessories, and commercial clients with end-to-end 3D modeling and fabrication.",
  description: "Veritas Designer started with zero capital infrastructure — I assembled the first printer by hand in a friend's room, learned the hardware inside-out, and figured out the business as it grew. Today we run 11 printers serving real estate developers who need 3D models of projects for client presentations and office bookings, mobile accessories clients, and a growing pipeline of commercial use cases. Every client, every printer, and every workflow was built from scratch.",
  achievements: [
    "Founded and scaled Veritas Designer from a single self-assembled FDM printer to an 11-printer production operation — zero external funding, fully bootstrapped",
    "Acquired and retained real estate clients for architectural 3D modeling — producing physical project models used in client presentations, office space bookings, and property showcases",
    "Expanded into mobile accessories manufacturing, diversifying the client base beyond architecture into consumer product verticals",
    "Managed end-to-end operations — hardware maintenance, material procurement, client scoping, print workflow optimization, and delivery — across all 11 machines",
    "Built repeatable client acquisition and project scoping workflows, turning a hobby-scale setup into a revenue-generating multi-vertical business",
    "Developed hands-on expertise in FDM printing, slicing software, material selection, and post-processing across diverse client requirements",
  ],
  impact: [
    { value: "11", label: "printers in operation" },
    { value: "3+", label: "services: design, print, consult" },
    { value: "2+", label: "industry verticals served" },
  ],
},

{
  id: 9,
  role: "Co-Founder",
  company: "Serenity & Co.",
  duration: "2022",
  type: "full-time",
  location: "India",
  category: "ventures",
  summary: "Founded a scented candle brand from scratch — handled product development, branding, and direct-to-consumer sales across online and offline channels.",
  description: "Serenity & Co. was a bootstrapped scented candle startup built from the ground up — from sourcing raw materials and developing scent profiles to designing packaging and acquiring customers. I owned every function: product, brand, operations, and sales. The goal was to build a premium-feel DTC brand on zero budget.",
  achievements: [
    "Founded and launched Serenity & Co. from scratch — developed product line, brand identity, and packaging with zero external funding",
    "Sourced and tested raw materials including wax blends, fragrance oils, and wicks to develop consistent, high-quality scent profiles",
    "Built direct-to-consumer sales across online and offline channels, acquiring first customers through organic outreach and word-of-mouth",
    "Managed end-to-end operations — procurement, production, packaging, fulfillment, and customer communication — as a solo founder",
    "Designed brand identity and marketing creatives to position Serenity & Co. as a premium lifestyle product in a crowded market",
  ],
  impact: [
    { value: "150+", label: "units production capacity per batch" },
    { value: "11", label: "long-term clients retained" },
    { value: "20+", label: "scent varieties developed" },
  ],
},

]

type FilterType = "technical" | "ventures"

export function WorkExperience() {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null)
  const [activeFilter, setActiveFilter] = useState<FilterType>("technical")
  const [showAll, setShowAll] = useState(false)

  const filters: { label: string; value: FilterType }[] = [
    { label: "TECHNICAL", value: "technical" },
    { label: "VENTURES", value: "ventures" },
  ]

  const filteredExperiences = experiences.filter((exp) => exp.category === activeFilter)

  const visibleExperiences = showAll ? filteredExperiences : filteredExperiences.slice(0, 3)

  return (
    <section id="experience" className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30">
      <div className="mx-auto max-w-7xl">

        {/* Header + Filter Row */}
        <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 animate-fade-in-up">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">Career</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Work Experience</h2>
            <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              My professional journey and the roles that shaped my skills.
            </p>
          </div>

          {/* Filter Toggle */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap scrollbar-hide animate-fade-in-up stagger-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => { setActiveFilter(filter.value); setShowAll(false) }}
                className={cn(
                  "shrink-0 rounded-lg border px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 active:scale-[0.98]",
                  activeFilter === filter.value
                    ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20"
                    : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground hover:bg-secondary/50",
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Cards */}
        <div className="flex flex-col gap-6">
          {visibleExperiences.map((exp, index) => (
            <article
              key={exp.id}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card/40 glass p-8 sm:p-10 transition-all duration-400 hover:border-primary/40 hover:bg-card/60 active:scale-[0.99] hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 100 + 200}ms` }}
              onClick={() => setSelectedExp(exp)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-gradient">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-base text-muted-foreground">{exp.duration}</span>
                </div>

                <p className="mb-4 text-lg text-primary font-medium">{exp.company}</p>

                <p className="text-lg leading-relaxed text-muted-foreground">{exp.summary}</p>

                <div className="mt-6 flex items-center gap-2 font-mono text-base text-primary transition-all duration-300 sm:opacity-0 sm:translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0">
                  <span>view details</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {filteredExperiences.length > 3 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card/40 glass font-mono text-base text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary hover:bg-card/60"
            >
              <span>{showAll ? "Show Less" : "Load More"}</span>
              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}

      </div>

      {/* Experience Detail Modal */}
      <Dialog open={!!selectedExp} onOpenChange={(open) => !open && setSelectedExp(null)}>
        <DialogContent
          className="max-h-[90vh] overflow-y-auto bg-background border-border shadow-2xl rounded-2xl p-0"
          style={{ width: "clamp(320px, 88vw, 1000px)", maxWidth: "1000px" }}
        >
          {selectedExp && (
            <>
              {/* Modal Header */}
              <div className="p-7 border-b border-border/40">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 font-mono text-sm text-primary font-semibold">
                    {selectedExp.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold tracking-tight">{selectedExp.role}</h2>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-primary font-medium text-sm">{selectedExp.company}</span>
                      <span className="text-muted-foreground text-xs">·</span>
                      <span className="font-mono text-sm text-muted-foreground">{selectedExp.duration}</span>
                    </div>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 font-mono text-xs text-primary">
                        {selectedExp.type}
                      </span>
                      <span className={cn(
                        "rounded-full border px-3 py-0.5 font-mono text-xs",
                        selectedExp.category === "technical"
                          ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                          : "border-purple-500/30 bg-purple-500/10 text-purple-400"
                      )}>
                        {selectedExp.category === "technical" ? "TECHNICAL" : "VENTURES"}
                      </span>
                      {selectedExp.location && (
                        <span className="rounded-full border border-border bg-secondary/50 px-3 py-0.5 font-mono text-xs text-muted-foreground">
                          {selectedExp.location}
                        </span>
                      )}
                    </div>
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
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedExp.description}</p>
                </div>

                {/* Impact */}
                {selectedExp.impact && (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-3">
                      Impact
                      <span className="flex-1 h-px bg-border/40" />
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedExp.impact.map((item, i) => (
                        <div key={i} className="rounded-xl bg-secondary/40 border border-border/40 p-3 text-center">
                          <div className="text-xl font-semibold font-mono text-primary">{item.value}</div>
                          <div className="text-xs text-muted-foreground mt-1 leading-snug">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Achievements */}
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-3">
                    Key achievements
                    <span className="flex-1 h-px bg-border/40" />
                  </p>
                  <ul className="space-y-2.5">
                    {selectedExp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                {selectedExp.techStack && (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-3">
                      Tech stack
                      <span className="flex-1 h-px bg-border/40" />
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedExp.techStack.map((tech, i) => (
                        <span key={i} className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary transition-all duration-300 hover:bg-primary/20 hover:border-primary/60 hover:scale-105 cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
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