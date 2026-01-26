"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowRight, FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Note {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  content: string
  keyTakeaways: string[]
}

const notes: Note[] = [
  {
    id: 1,
    title: "Building a Linux distro from scratch",
    excerpt: "Learnings from compiling the kernel, configuring BusyBox, and creating bootable ISOs with Syslinux.",
    date: "Nov 2025",
    category: "systems",
    content: "This project started as a curiosity about how Linux systems actually boot and evolved into a full minimal distribution. I compiled the Linux kernel from source with a custom configuration, set up BusyBox as the init system and core utilities, and used Syslinux as the bootloader. The result is a ~15MB bootable ISO that runs entirely in RAM.",
    keyTakeaways: [
      "The kernel is surprisingly configurable - you can strip it down to just what you need",
      "BusyBox is an incredible piece of software that replaces hundreds of utilities",
      "Understanding the boot process demystifies a lot of 'magic' in modern distros",
      "Docker makes reproducible builds much easier for this kind of project",
    ],
  },
  {
    id: 2,
    title: "MCP protocol in LLM apps",
    excerpt: "Implementing Model Context Protocol for seamless AI model interactions with vector databases in RAG apps.",
    date: "Apr 2025",
    category: "ai",
    content: "Model Context Protocol (MCP) provides a standardized way for LLMs to interact with external tools and data sources. I integrated MCP into a RAG application to allow the model to query vector databases, fetch documents, and maintain conversation context across multiple turns without custom tool implementations.",
    keyTakeaways: [
      "MCP simplifies tool integration by providing a standard interface",
      "Context management becomes much cleaner with protocol-level support",
      "Vector database queries can be abstracted as MCP resources",
      "The protocol handles serialization and error handling automatically",
    ],
  },
  {
    id: 3,
    title: "Next.js 16 + Tailwind v4",
    excerpt: "Exploring the new features in Next.js 16 and migrating to Tailwind CSS v4's new configuration system.",
    date: "Dec 2024",
    category: "frontend",
    content: "Next.js 16 brings significant improvements including better caching, improved turbopack stability, and the new 'use cache' directive. Combined with Tailwind v4's CSS-first configuration approach, the developer experience has improved dramatically. Migration required updating the config from JS to CSS but the result is cleaner and more maintainable.",
    keyTakeaways: [
      "Tailwind v4 uses @theme in CSS instead of tailwind.config.js",
      "The 'use cache' directive makes caching explicit and predictable",
      "Turbopack is now stable and noticeably faster than webpack",
      "Migration is straightforward but requires touching global styles",
    ],
  },
  {
    id: 4,
    title: "Self-hosting LLMs with FastAPI",
    excerpt: "Running Llama2 locally and building a personal chatbot API for natural language tasks.",
    date: "Oct 2023",
    category: "ai",
    content: "Setting up a local LLM inference server using FastAPI and llama.cpp. The goal was to have a private, offline-capable chatbot API that could be used for development and testing without sending data to external services. Quantized models make this feasible on consumer hardware with 16GB+ RAM.",
    keyTakeaways: [
      "4-bit quantization reduces memory requirements significantly with minimal quality loss",
      "FastAPI's async support is crucial for handling multiple concurrent requests",
      "Streaming responses provide much better UX for chat applications",
      "Local inference is viable for development but production needs more consideration",
    ],
  },
]

export function LabNotes() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  return (
    <section id="notes" className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 space-y-3 animate-fade-in-up">
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">Field Notes</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Lab Notes</h2>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Brief observations, technical findings, and thoughts from the workbench.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {notes.map((note, index) => (
            <article
              key={note.id}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card/40 glass p-8 sm:p-10 transition-all duration-400 hover:border-primary/40 hover:bg-card/60 active:scale-[0.99] hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 100 + 200}ms` }}
              onClick={() => setSelectedNote(note)}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary/15 to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="relative z-10">
                <div className="mb-5 sm:mb-6 flex items-center justify-between gap-3">
                  <span className="rounded-lg border border-border/80 bg-secondary/60 px-4 py-2 font-mono text-sm text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-foreground">
                    {note.category}
                  </span>
                  <span className="font-mono text-sm text-muted-foreground">{note.date}</span>
                </div>

                <h3 className="mb-4 text-xl sm:text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-gradient">
                  {note.title}
                </h3>

                <p className="text-base leading-relaxed text-muted-foreground">{note.excerpt}</p>

                <div className="mt-6 flex items-center gap-2 font-mono text-sm text-primary transition-all duration-300 sm:opacity-0 sm:translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0">
                  <span>read more</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>

      {/* Note Detail Modal */}
      <Dialog open={!!selectedNote} onOpenChange={(open) => !open && setSelectedNote(null)}>
        <DialogContent className="max-w-[1500px] max-h-[85vh] overflow-y-auto bg-background backdrop-blur-xl border-border shadow-2xl">
          {selectedNote && (
            <>
              <DialogHeader className="flex flex-row items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 border border-primary/30">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-xl font-bold">{selectedNote.title}</DialogTitle>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="rounded-md border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
                      {selectedNote.category}
                    </span>
                    <span className="font-mono text-sm text-muted-foreground">{selectedNote.date}</span>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Content */}
                <p className="text-muted-foreground leading-relaxed">{selectedNote.content}</p>

                {/* Key Takeaways */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-primary" />
                    <h4 className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                      Key Takeaways
                    </h4>
                  </div>
                  <ul className="space-y-2 pl-11">
                    {selectedNote.keyTakeaways.map((takeaway, index) => (
                      <li key={index} className="text-muted-foreground leading-relaxed text-sm flex items-start gap-2">
                        <span className="text-primary mt-1.5 shrink-0">-</span>
                        <span>{takeaway}</span>
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
