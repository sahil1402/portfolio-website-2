"use client"

import { useState, useEffect } from "react"

const technologies = [
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", x: 15, y: 5, size: 38 },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg", x: 75, y: 8, size: 52 },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", x: 45, y: 3, size: 34 },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", x: 8, y: 25, size: 55 },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", x: 35, y: 20, size: 38 },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg", x: 58, y: 28, size: 48 },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", x: 85, y: 25, size: 44 },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", x: 12, y: 48, size: 42 },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg", x: 48, y: 45, size: 50 },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", x: 80, y: 48, size: 40 },
  { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", x: 30, y: 42, size: 36 },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", x: 25, y: 68, size: 46 },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", x: 65, y: 65, size: 38 },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", x: 88, y: 70, size: 34 },
  { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", x: 50, y: 82, size: 32 },
  { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", x: 10, y: 85, size: 30 },
];

export function AnimatedAvatar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 400;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getGridPosition = (tech: typeof technologies[0], index: number) => {
    const progress = scrollProgress;
    const cols = 4;
    const row = Math.floor(index / cols);
    const col = index % cols;

    return {
      left: `${tech.x + (10 + col * 22 - tech.x) * progress}%`,
      top: `${tech.y + (10 + row * 22 - tech.y) * progress}%`,
      size: tech.size * (1 - progress * 0.2) + 36 * progress,
      opacity: (1 - (tech.y / 100) * 0.8) * (1 - progress) + progress,
    };
  };

  return (
    <div className="relative w-[400px] h-[450px] sm:w-[450px] sm:h-[500px]">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      {technologies.map((tech, i) => {
        const animated = getGridPosition(tech, i);
        return (
          <img
            key={tech.name}
            src={tech.logo}
            alt={tech.name}
            title={tech.name}
            style={{
              position: "absolute",
              left: animated.left,
              top: animated.top,
              width: `${animated.size}px`,
              height: `${animated.size}px`,
              objectFit: "contain",
              opacity: animated.opacity,
              filter: "brightness(0) invert(1) drop-shadow(0 0 10px rgba(45, 212, 191, 0.7))",
              animation: scrollProgress < 0.1 ? `float 3s ease-in-out infinite` : "none",
              animationDelay: `${i * 0.12}s`,
              transition: "left 0.15s ease-out, top 0.15s ease-out, width 0.15s, height 0.15s, opacity 0.15s",
            }}
          />
        );
      })}
    </div>
  );
}