"use client"

import { useState, useEffect } from "react"

const allIcons = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
]

const getRandomIcons = (count: number) => {
  const shuffled = [...allIcons].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [icons, setIcons] = useState<string[]>([])

  // Initialize icons
  useEffect(() => {
    setIcons(getRandomIcons(6))
  }, [])

// Progress bar - 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 200)
          return 100
        }
        return prev + 4
      })
    }, 80)

    return () => clearInterval(interval)
  }, [onComplete])

  // Change icons every 800ms
  useEffect(() => {
    const iconInterval = setInterval(() => {
      setIcons(getRandomIcons(6))
    }, 800)

    return () => clearInterval(iconInterval)
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <style>{`
        @keyframes gridPulse {
          0%, 100% { transform: scale(0.7); opacity: 0.3; }
          50% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Pulse Grid */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {icons.map((icon, i) => (
          <img
            key={`${i}-${icon}`}
            src={icon}
            alt=""
            className="w-12 h-12"
            style={{
              filter: "brightness(0) invert(1) drop-shadow(0 0 10px rgba(45, 212, 191, 0.7))",
              animation: "gridPulse 1.4s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Brand name */}
      <div 
        className="font-mono text-[28px] mb-7 text-foreground"
        style={{ animation: "slideUp 0.5s ease-out" }}
      >
        SAHIL
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">
          DEV
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-[220px] h-1 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading text */}
      <p className="mt-4 font-mono text-xs text-muted-foreground">
        {progress < 100 ? "Loading..." : "Ready!"}
      </p>
    </div>
  )
}