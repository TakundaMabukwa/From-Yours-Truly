"use client"

import { useEffect, useRef, useState } from "react"
import { Heart } from "lucide-react"

const giftImages = [
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 01.53.53.jpeg",
    alt: "Kiss card from Decent Crook - lipstick kisses on paper",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 01.53.54.jpeg",
    alt: "Handwritten love letter - 5 kisses for Mon to Friday",
  },
]

export default function GiftHeart() {
  const [visible, setVisible] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-32" aria-label="Your special gift">
      {/* Hidden SVG clip path definition */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="heartClip" clipPathUnits="objectBoundingBox">
            <path d="M0.5,0.18 C0.5,0.18,0.0,0.0,0.0,0.36 C0.0,0.6,0.5,1.0,0.5,1.0 C0.5,1.0,1.0,0.6,1.0,0.36 C1.0,0.0,0.5,0.18,0.5,0.18Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        className="transition-all duration-1000 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
        }}
      >
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <p className="font-sans text-xs md:text-sm uppercase tracking-[0.25em] text-primary mb-4">
            A gift from you
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
            The Sweetest Thing
          </h2>
          <p className="font-sans text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Not gonna lie, I love this so much it made me so giggly when you gave it to me.
          </p>
        </div>

        {/* Heart-shaped flip card */}
        <div className="flex justify-center px-4">
          <button
            onClick={() => setFlipped(!flipped)}
            className="group relative focus:outline-none cursor-pointer"
            aria-label={flipped ? "Show kiss card" : "Show love letter"}
            style={{ perspective: "1200px" }}
          >
            <div
              className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] lg:w-[580px] lg:h-[580px] transition-transform duration-700 ease-in-out"
              style={{
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front - Kiss card */}
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  clipPath: "url(#heartClip)",
                  WebkitClipPath: "url(#heartClip)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={giftImages[0].src}
                  alt={giftImages[0].alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay shimmer on hover */}
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Back - Love letter */}
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  clipPath: "url(#heartClip)",
                  WebkitClipPath: "url(#heartClip)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={giftImages[1].src}
                  alt={giftImages[1].alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Tap hint */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <Heart className="h-5 w-5 text-accent animate-pulse" fill="currentColor" />
              <p className="font-sans text-base md:text-lg text-muted-foreground">
                {flipped ? "Tap to see the kisses" : "Tap to read the letter"}
              </p>
              <Heart className="h-5 w-5 text-accent animate-pulse" fill="currentColor" />
            </div>
          </button>
        </div>

        {/* Caption below */}
        <p className="text-center mt-10 font-sans text-base md:text-lg text-muted-foreground italic">
          {"From: Decent Crook  :)"}
        </p>
      </div>
    </section>
  )
}
