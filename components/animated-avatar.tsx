"use client"

import { useEffect, useState } from "react"

export function AnimatedAvatar() {
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 150)
    }, 3000)
    return () => clearInterval(blinkInterval)
  }, [])

  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="95"
          className="fill-card stroke-primary/30"
          strokeWidth="2"
        />

        {/* Animated background pattern */}
        <g className="animate-pulse opacity-20">
          <circle cx="100" cy="100" r="80" className="stroke-primary fill-none" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="60" className="stroke-primary fill-none" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="40" className="stroke-primary fill-none" strokeWidth="0.5" strokeDasharray="4 4" />
        </g>

        {/* Head/Face base */}
        <ellipse
          cx="100"
          cy="95"
          rx="45"
          ry="50"
          className="fill-primary/10 stroke-primary/50"
          strokeWidth="2"
        />

        {/* Hair */}
        <path
          d="M55 75 Q55 45 100 45 Q145 45 145 75 Q145 60 130 55 Q115 50 100 52 Q85 50 70 55 Q55 60 55 75"
          className="fill-foreground/80"
        />
        
        {/* Glasses frame */}
        <g className="stroke-foreground/70 fill-none" strokeWidth="2">
          {/* Left lens */}
          <rect x="62" y="85" width="28" height="22" rx="4" className="fill-primary/5" />
          {/* Right lens */}
          <rect x="110" y="85" width="28" height="22" rx="4" className="fill-primary/5" />
          {/* Bridge */}
          <path d="M90 96 Q100 92 110 96" />
          {/* Temple arms */}
          <path d="M62 92 L55 88" />
          <path d="M138 92 L145 88" />
        </g>

        {/* Eyes */}
        <g>
          {/* Left eye */}
          <ellipse
            cx="76"
            cy={blink ? "96" : "96"}
            rx="5"
            ry={blink ? "1" : "5"}
            className="fill-foreground transition-all duration-100"
          />
          {/* Right eye */}
          <ellipse
            cx="124"
            cy={blink ? "96" : "96"}
            rx="5"
            ry={blink ? "1" : "5"}
            className="fill-foreground transition-all duration-100"
          />
          {/* Eye shine */}
          {!blink && (
            <>
              <circle cx="78" cy="94" r="2" className="fill-background/80" />
              <circle cx="126" cy="94" r="2" className="fill-background/80" />
            </>
          )}
        </g>

        {/* Nose */}
        <path
          d="M100 100 L100 112 Q97 115 100 115"
          className="stroke-foreground/30 fill-none"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Smile */}
        <path
          d="M85 125 Q100 135 115 125"
          className="stroke-foreground/60 fill-none"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Neck */}
        <rect
          x="88"
          y="143"
          width="24"
          height="15"
          className="fill-primary/10"
        />

        {/* Shoulders/Hoodie */}
        <path
          d="M50 195 Q50 160 75 155 L88 155 L88 158 Q100 165 112 158 L112 155 L125 155 Q150 160 150 195"
          className="fill-primary/20 stroke-primary/40"
          strokeWidth="2"
        />
        
        {/* Hoodie collar */}
        <path
          d="M88 158 Q100 170 112 158"
          className="stroke-primary/40 fill-none"
          strokeWidth="2"
        />

        {/* Code brackets decoration */}
        <g className="animate-float-slow">
          <text x="30" y="60" className="fill-primary/40 text-xl font-mono">{"{"}</text>
          <text x="160" y="150" className="fill-primary/40 text-xl font-mono">{"}"}</text>
        </g>

        {/* Floating particles */}
        <g className="animate-pulse">
          <circle cx="45" cy="90" r="2" className="fill-primary/30" />
          <circle cx="155" cy="80" r="1.5" className="fill-primary/40" />
          <circle cx="40" cy="130" r="1" className="fill-primary/20" />
          <circle cx="160" cy="120" r="2" className="fill-primary/30" />
        </g>
      </svg>

      {/* Orbiting elements */}
      <div className="absolute inset-0 animate-spin-slow">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/40 blur-[1px]" />
      </div>
      <div className="absolute inset-0 animate-spin-slow-reverse">
        <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-primary/30 blur-[1px]" />
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl -z-10 animate-pulse" />
    </div>
  )
}
