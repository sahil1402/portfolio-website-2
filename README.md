# SAHILDEV

A modern, minimal portfolio website built with Next.js, React, and Tailwind CSS.

Version: `1.0.0`

## About

SAHILDEV is a personal portfolio website for Sahil Satasiya — an AI/ML Engineer and MS Computer Science student at USC. The site showcases work experience, projects, skills, and features an AI-powered chatbot assistant.

### Key Features

- **Modern Stack** — Next.js 16, React 19, TypeScript, Tailwind CSS
- **AI Chatbot** — Voice & text enabled assistant that answers questions about Sahil
- **Animated Loading Screen** — Pulse grid animation with rotating tech icons
- **Floating Tech Icons** — Interactive hero section with floating technology logos
- **Work Experience** — Detailed career timeline with expandable details
- **Responsive Design** — Optimized for desktop, tablet, and mobile
- **Dark Theme** — Sleek dark UI with teal accent colors

## Live Demo

Coming Soon!!

## Getting Started

### Prerequisites

- Node.js 18 or newer
- pnpm (recommended) — install from https://pnpm.io/

### Quick Start
```bash
# Clone the repository
git clone https://github.com/sahil1402/sahildev.git

# Navigate to project
cd sahildev

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open http://localhost:3000 to view the site.

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Create production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | Run ESLint |

### Building for Production
```bash
pnpm build
pnpm start
```

## Project Structure
```
├── app/                    # Next.js App Router pages and layout
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── ai-chatbot.tsx      # AI assistant chatbot
│   ├── animated-avatar.tsx # Floating tech icons
│   ├── header.tsx          # Navigation header
│   ├── hero-section.tsx    # Hero section
│   ├── lab-notes.tsx       # Work experience section
│   ├── loading-screen.tsx  # Animated loading screen
│   ├── projects-grid.tsx   # Projects showcase
│   ├── footer.tsx          # Site footer
│   └── ui/                 # Reusable UI primitives
├── lib/                    # Utilities and helpers
├── public/                 # Static assets
├── styles/                 # Additional styles
└── types/                  # TypeScript type definitions
```

## Tech Stack

- **Framework:** Next.js 16
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Fonts:** Geist, Space Grotesk

## Preview

## Hero Section

The hero features technology icons arranged in a fixed orbital layout
around a central avatar, each with a continuous vertical float animation.

### How it works

Icons are rendered as `<img>` tags pulling SVG logos from a CDN. Each
icon has a **fixed absolute position** defined manually to maintain a
consistent layout across page loads — an earlier approach using random
positions on each render caused layout chaos and collisions, so positions
were hardcoded to match a specific arrangement.

Animation is pure CSS (`@keyframes float`) with each icon assigned a
different `animation-delay` and `animation-duration` so they drift
independently rather than in sync. A subtle teal `box-shadow` glow on
hover is applied via Tailwind's `hover:` utilities.

### Key decisions

- **Fixed positions over random** — random placement caused icons to
  collide and shift on every refresh, which hurt perceived quality.
  Hardcoding positions trades flexibility for visual consistency.
- **CDN-sourced SVGs** — avoids bundling icon assets, keeping the
  initial JS payload smaller.
- **CSS animations over Framer Motion** — the float effect is simple
  enough that pulling in a library would be unnecessary overhead.

---

## Work Experience

Each role is displayed as a card showing a one-line summary. Clicking
a card opens a **Radix UI Dialog** with the full detail — company,
duration, description, and a list of achievements.

### How it works

The component uses React `useState` to track which card is selected.
Clicking a card sets that experience as the active item and opens the
dialog. The dialog is built on **Radix UI's `Dialog` primitive**, which
handles focus trapping, accessibility (ARIA roles), and the escape-to-
close behaviour out of the box.

Experience data is defined as a typed `Experience[]` array in the
component file, making it easy to add or update entries without touching
any UI logic.

### Key decisions

- **Dialog over accordion** — a dialog gives the detail view its own
  focused space without pushing other cards down the page, which felt
  cleaner for a portfolio context.
- **Radix UI for accessibility** — building an accessible modal from
  scratch (focus trap, aria-modal, scroll lock) is non-trivial. Radix
  handles all of it, so the code stays focused on content and styling.
- **Typed data array** — separating content from UI makes the component
  easier to maintain and test independently.

## Hero Section

The hero features technology icons arranged in a fixed orbital layout
around a central avatar, each with a continuous vertical float animation.

### How it works

Icons are rendered as `<img>` tags pulling SVG logos from a CDN. Each
icon has a **fixed absolute position** defined manually to maintain a
consistent layout across page loads — an earlier approach using random
positions on each render caused layout chaos and collisions, so positions
were hardcoded to match a specific arrangement.

Animation is pure CSS (`@keyframes float`) with each icon assigned a
different `animation-delay` and `animation-duration` so they drift
independently rather than in sync. A subtle teal `box-shadow` glow on
hover is applied via Tailwind's `hover:` utilities.

### Key decisions

- **Fixed positions over random** — random placement caused icons to
  collide and shift on every refresh, which hurt perceived quality.
  Hardcoding positions trades flexibility for visual consistency.
- **CDN-sourced SVGs** — avoids bundling icon assets, keeping the
  initial JS payload smaller.
- **CSS animations over Framer Motion** — the float effect is simple
  enough that pulling in a library would be unnecessary overhead.

---

## Work Experience

Each role is displayed as a card showing a one-line summary. Clicking
a card opens a **Radix UI Dialog** with the full detail — company,
duration, description, and a list of achievements.

### How it works

The component uses React `useState` to track which card is selected.
Clicking a card sets that experience as the active item and opens the
dialog. The dialog is built on **Radix UI's `Dialog` primitive**, which
handles focus trapping, accessibility (ARIA roles), and the escape-to-
close behaviour out of the box.

Experience data is defined as a typed `Experience[]` array in the
component file, making it easy to add or update entries without touching
any UI logic.

### Key decisions

- **Dialog over accordion** — a dialog gives the detail view its own
  focused space without pushing other cards down the page, which felt
  cleaner for a portfolio context.
- **Radix UI for accessibility** — building an accessible modal from
  scratch (focus trap, aria-modal, scroll lock) is non-trivial. Radix
  handles all of it, so the code stays focused on content and styling.
- **Typed data array** — separating content from UI makes the component
  easier to maintain and test independently.

## AI Chatbot

The portfolio includes a conversational assistant that answers questions
about my background, experience, and projects.

### How it works

The chatbot is powered by the **Anthropic Claude API**. On each message,
the frontend sends the user's question to a Next.js API route, which
constructs a prompt containing my resume context — work experience,
projects, and skills — as a system prompt. Claude uses that context to
answer questions accurately without hallucinating details I haven't
provided.

Voice input is handled via the browser's **Web Speech API**. When the
mic button is active, speech is transcribed locally in the browser and
passed into the same text pipeline, so no audio ever leaves the client.

### Key decisions

- **System prompt as context** — rather than fine-tuning a model, I
  inject my resume as structured context on every request. This keeps
  responses grounded and makes it trivial to update when my experience
  changes.
- **API route as proxy** — the Claude API key never touches the client.
  All requests go through `/api/chat`, which handles the Anthropic SDK
  call server-side.
- **Voice as progressive enhancement** — the chatbot is fully functional
  without voice; speech input is layered on top for browsers that
  support it.

## Contact

- **Email:** satasiyasahil14@gmail.com
- **LinkedIn:** [linkedin.com/in/sahilsatasiya](https://linkedin.com/in/sahilsatasiya)
- **GitHub:** [github.com/sahil1402](https://github.com/sahil1402)
- **Portfolio:** Coming Soon!!

## Author

**Sahil Satasiya**
- MS Computer Science @ University of Southern California
- AI/ML Engineer
- Full Stack Developer

---

Built with ❤️ by Sahil Satasiya
