"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

interface Photo {
  src: string
  caption: string
  subtitle: string
}

const photos: Photo[] = [
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.29 (3).jpeg",
    caption: "Crazy we had twins on our first date, we should be better examples for our kids you know...",
    subtitle: "The day Mooshie and Looshie were born & our very first date",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.29 (2).jpeg",
    caption: "Day we got our first borns, not sure on the english here \ud83d\ude02\ud83d\ude02\ud83d\ude02",
    subtitle: "First Date Vibes",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.28 (1).jpeg",
    caption: "You, me, flowers, and a fancy staircase - what more could we need?",
    subtitle: "Always by your side",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.30 (3).jpeg",
    caption: "Our 2nd time out - holding your hand feels like coming home",
    subtitle: "Hand in hand",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.31 (2).jpeg",
    caption: "When you looks at me like that, the whole world stops",
    subtitle: "My favourite view",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.31.jpeg",
    caption: "Cutie Patootie ",
    subtitle: "Blame Italian mobster movies for this, sounds cute though\ud83d\ude02\ud83d\ude02\ud83d\ude02",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.32.jpeg",
    caption: "Lost in thought, dreaming about our next adventure",
    subtitle: "Deep in thought",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.30.jpeg",
    caption: "Really is \ud83d\ude02\ud83d\ude02\ud83d\ude02",
    subtitle: "Its OK to beat me for this \ud83d\ude02\ud83d\ude02\ud83d\ude02",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.30 (2).jpeg",
    caption: "Those nails + your hand in mine = perfection",
    subtitle: "The little things",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.30 (1).jpeg",
    caption: "Then there is this nigga, he said he misses his twin bro. Lets do something abut it",
    subtitle: "Technically the 2nd born when you think abt it",
  },
]

export default function PhotoSlideshow() {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [prevIndex, setPrevIndex] = useState(0)
  const [direction, setDirection] = useState<"next" | "prev">("next")
  const progressRef = useRef<HTMLDivElement>(null)
  const [progressKey, setProgressKey] = useState(0)

  const goToSlide = useCallback(
    (index: number, dir: "next" | "prev") => {
      if (isTransitioning || index === current) return
      setIsTransitioning(true)
      setDirection(dir)
      setPrevIndex(current)
      setCurrent(index)
      setProgressKey((k) => k + 1)
      setTimeout(() => setIsTransitioning(false), 800)
    },
    [isTransitioning, current]
  )

  const next = useCallback(() => {
    const nextIdx = (current + 1) % photos.length
    goToSlide(nextIdx, "next")
  }, [current, goToSlide])

  const prev = useCallback(() => {
    const prevIdx = (current - 1 + photos.length) % photos.length
    goToSlide(prevIdx, "prev")
  }, [current, goToSlide])

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isPlaying, next])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next()
      else if (e.key === "ArrowLeft") prev()
      else if (e.key === " ") {
        e.preventDefault()
        setIsPlaying((p) => !p)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [next, prev])

  // Touch swipe support
  const touchStartX = useRef(0)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
    }
  }

  const getSlideStyle = (index: number): React.CSSProperties => {
    if (index === current) {
      return {
        opacity: 1,
        transform: "translateX(0%) scale(1)",
        zIndex: 20,
        transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    }
    if (index === prevIndex && isTransitioning) {
      return {
        opacity: 0,
        transform: direction === "next" ? "translateX(-30%) scale(0.95)" : "translateX(30%) scale(0.95)",
        zIndex: 10,
        transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    }
    return {
      opacity: 0,
      transform: "translateX(100%) scale(1)",
      zIndex: 0,
      transition: "none",
    }
  }

  return (
    <section className="relative w-full" aria-label="Photo slideshow">
      {/* Main Slideshow */}
      <div
        className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-[16/10] w-full overflow-hidden rounded-xl bg-secondary"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {photos.map((photo, index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={getSlideStyle(index)}
            aria-hidden={index !== current}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.caption}
              className="h-full w-full object-cover"
              loading={index < 2 ? "eager" : "lazy"}
            />
            {/* Cinematic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
          </div>
        ))}

        {/* Caption Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-5 md:p-10">
          <div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "translateY(24px)" : "translateY(0)",
            }}
          >
            <p className="text-xs sm:text-sm font-sans uppercase tracking-[0.2em] text-primary mb-2">
              {photos[current].subtitle}
            </p>
            <p className="font-serif text-lg sm:text-xl md:text-3xl lg:text-4xl text-foreground leading-snug max-w-xl">
              {`"${photos[current].caption}"`}
            </p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-2 sm:left-4 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/30 text-foreground backdrop-blur-md transition-all hover:bg-black/50 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 sm:right-4 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/30 text-foreground backdrop-blur-md transition-all hover:bg-black/50 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Next photo"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Play/Pause + Counter */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              setIsPlaying(!isPlaying)
              setProgressKey((k) => k + 1)
            }}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/30 text-foreground backdrop-blur-md transition-all hover:bg-black/50 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <span className="font-sans text-xs text-foreground/60 tabular-nums bg-black/30 backdrop-blur-md rounded-full px-3 py-1">
            {current + 1} / {photos.length}
          </span>
        </div>

        {/* Animated progress bar on the slide */}
        <div className="absolute bottom-0 left-0 right-0 z-30 h-[3px] bg-foreground/10">
          <div
            key={progressKey}
            ref={progressRef}
            className="h-full bg-primary"
            style={{
              width: isPlaying ? "100%" : "0%",
              transition: isPlaying ? "width 5s linear" : "none",
            }}
          />
        </div>
      </div>

      {/* Dot Indicators (mobile-friendly) */}
      <div className="mt-4 flex justify-center gap-2 md:hidden">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index, index > current ? "next" : "prev")}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
              index === current ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
            }`}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bars (desktop) */}
      <div className="mt-4 hidden md:flex gap-1.5">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index, index > current ? "next" : "prev")}
            className="group relative h-1 flex-1 rounded-full bg-secondary overflow-hidden focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label={`Go to photo ${index + 1}`}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500"
              style={{
                width: index <= current ? "100%" : "0%",
                opacity: index <= current ? 1 : 0.2,
              }}
            />
          </button>
        ))}
      </div>

      {/* Thumbnail Strip */}
      <div className="mt-4 md:mt-6 flex gap-2 overflow-x-auto pb-2 px-1 snap-x snap-mandatory scrollbar-hide">
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index, index > current ? "next" : "prev")}
            className={`relative flex-shrink-0 snap-center h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-lg overflow-hidden transition-all duration-400 focus:outline-none focus:ring-2 focus:ring-primary ${
              index === current
                ? "ring-2 ring-primary opacity-100 scale-110"
                : "opacity-35 hover:opacity-70 hover:scale-105"
            }`}
            aria-label={`View photo ${index + 1}: ${photo.caption}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </section>
  )
}
