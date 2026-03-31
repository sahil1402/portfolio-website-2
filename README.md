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

Visit: [https://sahildev.vercel.app](https://sahildev.vercel.app)

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

## Screenshots

### Loading Screen
Animated pulse grid with rotating tech icons

### Hero Section
Floating technology icons with teal glow effect

### Work Experience
Expandable cards with detailed achievements

### AI Chatbot
Voice and text enabled assistant

## Contact

- **Email:** satasiyasahil14@gmail.com
- **LinkedIn:** [linkedin.com/in/sahilsatasiya](https://linkedin.com/in/sahilsatasiya)
- **GitHub:** [github.com/sahil1402](https://github.com/sahil1402)
- **Portfolio:** [sahildev.vercel.app](https://sahildev.vercel.app)

## Author

**Sahil Satasiya**
- MS Computer Science @ University of Southern California
- AI/ML Engineer
- Full Stack Developer

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Sahil Satasiya
