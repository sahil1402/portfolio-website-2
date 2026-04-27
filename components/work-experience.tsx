"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowRight, Briefcase, ChevronDown } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
}

const experiences: Experience[] = [
  {
  id: 1,
  role: "Co-Founder & Founding ML Engineer",
  company: "CampusX",
  duration: "Sep 2025 - Jan 2026",
  type: "full-time",
  location: "Los Angeles, CA",
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
  role: "Software Engineer",
  company: "Tata Consultancy Services",
  duration: "May 2024 - Jun 2025",
  type: "full-time",
  location: "Pune, India",
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
  id: 3,
  role: "Machine Learning Engineer Intern",
  company: "RethinkSoft",
  duration: "May 2023 - Jul 2023",
  type: "internship",
  location: "Ahmedabad, India",
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
    id: 4,
    role: "Machine Learning Intern",
    company: "NeuroNexus Innovations",
    duration: "Feb 2023 - Apr 2023",
    type: "internship",
    location: "Remote",
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
    id: 5,
    role: "Web Developer",
    company: "R. R. Infraprojects Pvt. Ltd",
    duration: "Jan 2023",
    type: "contract",
    location: "Remote",
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
]

export function WorkExperience() {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null)
  const [showAll, setShowAll] = useState(false)

  const visibleExperiences = showAll ? experiences : experiences.slice(0, 3)

  return (
    <section id="experience" className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 space-y-3 animate-fade-in-up">
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">Career</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Work Experience</h2>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            My professional journey and the roles that shaped my skills.
          </p>
        </div>

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
        {experiences.length > 3 && (
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
        <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto bg-background border-border shadow-2xl rounded-2xl p-0">
  {selectedExp && (
    <>
      {/* Header */}
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

        {/* Impact metrics */}
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
            {selectedExp.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
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

      {/* Footer */}
      <div className="px-7 py-4 border-t border-border/40 flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground">
          {experiences.indexOf(selectedExp) + 1} of {experiences.length} experiences
        </span>
        <button
          onClick={() => setSelectedExp(null)}
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