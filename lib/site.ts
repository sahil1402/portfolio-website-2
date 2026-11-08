// Single source of truth for the public URL. Set NEXT_PUBLIC_SITE_URL in the deployment environment.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://sahildev.vercel.app").replace(/\/$/, "")
export const siteName = "SAHILDEV"
