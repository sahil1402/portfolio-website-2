"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WorkExperience } from "@/components/work-experience"
import { ProjectsGrid } from "@/components/projects-grid"
import { Workbench } from "@/components/workbench"
import { Footer } from "@/components/footer"
import { CursorGlow } from "@/components/cursor-glow"
import { LoadingScreen } from "@/components/loading-screen"
import { generateWebsiteStructuredData, generatePersonStructuredData } from "@/lib/structured-data"
import { siteUrl } from "@/lib/site"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const websiteStructuredData = generateWebsiteStructuredData(siteUrl)
  const personStructuredData = generatePersonStructuredData(siteUrl)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
      />

      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <main
        className={`relative min-h-screen overflow-hidden scanlines transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <CursorGlow />
        <div className="relative z-10">
          <Header />
          <HeroSection />
          <WorkExperience />
          <ProjectsGrid />
          <Workbench />
          <Footer />
        </div>
      </main>
    </>
  )
}
