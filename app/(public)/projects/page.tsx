import { ProjectsPageContent } from "@/components/public/projects/projects-page-content";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

const description =
  "Projects by Sahil Satasiya: production ML systems, agent tooling, data pipelines, and the code behind them.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  keywords: ["projects", "machine learning", "AI agents", "data engineering", "open source"],
  openGraph: {
    title: "Projects — SAHILDEV",
    description,
    url: `${siteUrl}/projects`,
    type: "website",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "SAHILDEV Projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — SAHILDEV",
    description,
    images: [`${siteUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      <ProjectsPageContent />
    </div>
  );
}
