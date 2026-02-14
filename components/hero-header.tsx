"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

export default function HeroHeader() {
  const [visible, setVisible] = useState(false)
  const [apologyVisible, setApologyVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 300)
    const t2 = setTimeout(() => setApologyVisible(true), 1200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <header className="relative flex flex-col items-center justify-center py-12 md:py-20 text-center overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-accent/8 animate-pulse"
            style={{
              width: `${16 + i * 6}px`,
              height: `${16 + i * 6}px`,
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 4) * 22}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2.5 + i * 0.4}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div
        className="relative z-10 transition-all duration-1000 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
        }}
      >
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4">
          February 14, 2026
        </p>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground mb-4 text-balance leading-tight">
          Us, Always
        </h1>

        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-12 bg-primary/40" />
          <Heart className="h-4 w-4 text-accent" fill="currentColor" />
          <span className="h-px w-12 bg-primary/40" />
        </div>

        <p className="font-sans text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
          Every photo tells a piece of our story. Here are the moments
          that make my heart yours, today and always.
        </p>
      </div>

      {/* Apology Section */}
      <div
        className="relative z-10 mt-10 md:mt-14 max-w-lg mx-auto transition-all duration-1000 ease-out"
        style={{
          opacity: apologyVisible ? 1 : 0,
          transform: apologyVisible ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <div className="rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 p-6 md:p-8">
          <Heart className="h-5 w-5 text-accent mx-auto mb-4" fill="currentColor" />
          <p className="font-serif text-base md:text-lg text-foreground leading-relaxed text-balance">
            I know I haven{"'"}t been easy to deal with this week. I would like to apologise and although this might not be the last, I will try to be better
          </p>
          <p className="mt-3 text-xl" aria-label="love hearts">
            {"❤️❤️❤️"}
          </p>
        </div>
      </div>
    </header>
  )
}
