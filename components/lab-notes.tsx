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
  summary: string
  description: string
  achievements: string[]
}

const experiences: Experience[] = [
  {
    id: 1,
    role: "Co-Founder & Founding ML Engineer",
    company: "CampusX",
    duration: "Sep 2025 - Jan 2026",
    summary: "Built end-to-end ML pipelines and predictive models for a marketplace platform, improving feed conversion by 12%.",
    description: "As Co-Founder and Founding ML Engineer at CampusX in Los Angeles, I led the development of machine learning infrastructure and data analytics systems. I worked on marketplace behavioral data to drive product decisions and built scalable ML solutions from the ground up.",
    achievements: [
      "Conducted in-depth EDA on marketplace data to identify seasonality trends and demand shifts",
      "Designed and deployed end-to-end ML pipelines using Python, SQL, and AWS",
      "Built predictive ranking and classification models, improving feed conversion by 12%",
      "Collaborated cross-functionally to translate requirements into scalable ML solutions",
    ],
  },
  {
    id: 2,
    role: "AI Engineer",
    company: "Tata Consultancy Services LTD.",
    duration: "May 2024 - June 2025",
    summary: "Developed scalable data pipelines processing 80K+ records and built forecasting models, reducing pipeline failures by 15%.",
    description: "As an AI Engineer at TCS in Pune, I focused on building robust data infrastructure and predictive analytics systems. I worked on demand forecasting initiatives, developing end-to-end pipelines from data ingestion to model deployment while ensuring reliability through CI/CD practices.",
    achievements: [
      "Developed scalable PySpark and SQL-based pipelines processing 80K+ records",
      "Performed large-scale data wrangling, normalization, and feature engineering",
      "Built regression and forecasting models using time-aware cross-validation",
      "Improved reliability of 20+ ETL workflows, reducing pipeline failures by 15%",
    ],
  },
  {
    id: 3,
    role: "Machine Learning Engineer Intern",
    company: "RethinkSoft",
    duration: "May 2023 - July 2023",
    summary: "Built flight price forecasting models achieving 98% accuracy and automated EDA pipelines, reducing manual analysis time by 30%.",
    description: "As an ML Engineer Intern at RethinkSoft in Ahmedabad, I worked on flight pricing optimization using predictive analytics. I analyzed large-scale time-series data to identify demand patterns and built accurate forecasting models to support data-driven pricing decisions.",
    achievements: [
      "Performed EDA and time-series analysis on 55K+ flight dataset for demand patterns",
      "Developed forecasting models achieving 98% accuracy on predictive benchmarks",
      "Automated EDA and visualization pipelines, reducing manual analysis time by 30%",
      "Performed feature importance analysis and hyperparameter tuning for model optimization",
    ],
  },
  {
    id: 4,
    role: "Machine Learning Intern",
    company: "NeuroNexus Innovations",
    duration: "Feb 2023 - Apr 2023",
    summary: "Developed student performance prediction pipeline achieving 87% accuracy using supervised learning on 20K+ records.",
    description: "As an ML Intern at NeuroNexus Innovations, I built a supervised learning pipeline to predict student performance using academic and behavioral data. I implemented multiple models and created automated evaluation scripts to improve experiment reproducibility.",
    achievements: [
      "Developed supervised learning pipeline for student performance prediction on 20K+ records",
      "Implemented and compared logistic regression, random forest, and XGBoost models",
      "Achieved 87% classification accuracy through cross-validation and hyperparameter tuning",
      "Built automated EDA and evaluation scripts, improving experiment reproducibility",
    ],
  },
  {
  id: 5,
  role: "Web Developer",
  company: "R. R. Infraprojects Pvt. Ltd",
  duration: "Jan 2023",
  summary: "Developed responsive, scalable web applications using React and Next.js, optimizing performance and deployment workflows.",
  description: "As a Web Developer at R. R. Infraprojects Pvt. Ltd, I designed and developed responsive, user-centric web applications using React.js and Next.js. I implemented reusable component architectures, integrated RESTful APIs, and optimized application performance through modern frontend best practices. I collaborated with cross-functional teams in Agile environments to translate business requirements into scalable, maintainable solutions.",
  achievements: [
    "Designed and developed responsive web applications using React.js, Next.js, and modern JavaScript (ES6+)",
    "Implemented reusable component architectures with Tailwind CSS and Material UI",
    "Integrated RESTful APIs and managed state using Redux and Context API",
    "Optimized performance through lazy loading, code splitting, and Lighthouse best practices",
    "Ensured cross-browser compatibility and improved frontend scalability",
    "Utilized Git, GitHub, CI/CD workflows, and deployed applications via Vercel and Docker"
  ],
},
]

export function LabNotes() {
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
        <DialogContent className="max-w-[1500px] max-h-[85vh] overflow-y-auto bg-background backdrop-blur-xl border-border shadow-2xl">
          {selectedExp && (
            <>
              <DialogHeader className="flex flex-row items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 border border-primary/30">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-xl font-bold">{selectedExp.role}</DialogTitle>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="rounded-md border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
                      {selectedExp.company}
                    </span>
                    <span className="font-mono text-sm text-muted-foreground">{selectedExp.duration}</span>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <p className="text-muted-foreground leading-relaxed">{selectedExp.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-primary" />
                    <h4 className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                      Key Achievements
                    </h4>
                  </div>
                  <ul className="space-y-2 pl-11">
                    {selectedExp.achievements.map((achievement, index) => (
                      <li key={index} className="text-muted-foreground leading-relaxed text-sm flex items-start gap-2">
                        <span className="text-primary mt-1.5 shrink-0">-</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}