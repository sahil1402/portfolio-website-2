import { WorkbenchPageContent } from "@/components/public/workbench/workbench-page-content";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eindev.ir';

export const metadata: Metadata = {
  title: "Arsenal",
  description: "Active experiments, prototypes, and TOOLS & CRAFT. A peek into the digital workshop where ideas take shape.",
  keywords: ["experiments", "prototypes", "TOOLS & CRAFT", "playground", "dev tools"],
  openGraph: {
    title: "Arsenal — EINCODE",
    description: "Active experiments, prototypes, and TOOLS & CRAFT.",
    url: `${baseUrl}/workbench`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image-workbench.png`,
        width: 1200,
        height: 630,
        alt: "EINCODE Arsenal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arsenal — EINCODE",
    description: "Active experiments, prototypes, and TOOLS & CRAFT.",
    images: [`${baseUrl}/og-image-workbench.png`],
  },
  alternates: {
    canonical: `${baseUrl}/workbench`,
  },
};

export default function WorkbenchPage() {
  return (
    <div className="pt-24">
      <WorkbenchPageContent />
    </div>
  );
}
