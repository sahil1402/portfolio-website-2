import { WorkbenchPageContent } from "@/components/public/workbench/workbench-page-content";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

const description =
  "Skills, tools, and what Sahil Satasiya is exploring: Python, ML and LLM engineering, backend systems, data engineering.";

export const metadata: Metadata = {
  title: "Arsenal",
  description,
  keywords: ["skills", "machine learning", "LLM engineering", "backend", "data engineering"],
  openGraph: {
    title: "Arsenal — SAHILDEV",
    description,
    url: `${siteUrl}/workbench`,
    type: "website",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "SAHILDEV Arsenal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arsenal — SAHILDEV",
    description,
    images: [`${siteUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${siteUrl}/workbench`,
  },
};

export default function WorkbenchPage() {
  return (
    <div className="pt-24">
      <WorkbenchPageContent />
    </div>
  );
}
