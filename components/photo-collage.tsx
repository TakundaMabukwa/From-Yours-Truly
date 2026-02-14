"use client"

import { useState, useEffect, useRef } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface CollagePhoto {
  src: string
  memory: string
  span: string
}

const collagePhotos: CollagePhoto[] = [
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.29 (3).jpeg",
    memory: "The night Mooshie was born",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.31 (2).jpeg",
    memory: "My favourite view",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.30 (3).jpeg",
    memory: "Our 2nd time out",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.28 (1).jpeg",
    memory: "Fancy staircase vibes",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.30 (1).jpeg",
    memory: "Mooshie says hi!",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.32.jpeg",
    memory: "Deep in thought at lunch",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.30 (2).jpeg",
    memory: "Nails on point, hands intertwined",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.29 (2).jpeg",
    memory: "Us against the world",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/collage/WhatsApp Image 2026-02-14 at 00.43.30.jpeg",
    memory: "Late night FaceTime smiles",
    span: "col-span-1 row-span-2",
  },
]

export default function PhotoCollage() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [animatedItems, setAnimatedItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"))
            setAnimatedItems((prev) => new Set([...prev, idx]))
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    )
    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const lightboxNav = (dir: "next" | "prev") => {
    if (lightbox === null) return
    if (dir === "next") setLightbox((lightbox + 1) % collagePhotos.length)
    else setLightbox((lightbox - 1 + collagePhotos.length) % collagePhotos.length)
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-[100px] sm:auto-rows-[120px] md:auto-rows-[160px] gap-2 md:gap-3">
        {collagePhotos.map((photo, index) => (
          <button
            key={index}
            ref={(el) => { itemRefs.current[index] = el }}
            data-index={index}
            onClick={() => setLightbox(index)}
            className={`group relative overflow-hidden rounded-lg ${photo.span} focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-700`}
            style={{
              opacity: animatedItems.has(index) ? 1 : 0,
              transform: animatedItems.has(index) ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
              transitionDelay: `${(index % 4) * 100}ms`,
            }}
            aria-label={`View: ${photo.memory}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.memory}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-3">
              <p className="font-serif text-xs sm:text-sm md:text-base text-foreground leading-tight">
                {`"${photo.memory}"`}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={collagePhotos[lightbox].memory}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-foreground transition-all hover:bg-card hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev/Next in lightbox */}
          <button
            onClick={(e) => { e.stopPropagation(); lightboxNav("prev") }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-foreground transition-all hover:bg-card hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); lightboxNav("next") }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-foreground transition-all hover:bg-card hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            className="relative max-h-[85vh] max-w-[90vw] md:max-w-[70vw] overflow-hidden rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={collagePhotos[lightbox].src}
              alt={collagePhotos[lightbox].memory}
              className="max-h-[80vh] w-auto rounded-xl object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
              <p className="font-serif text-base sm:text-lg md:text-2xl text-foreground">
                {`"${collagePhotos[lightbox].memory}"`}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
