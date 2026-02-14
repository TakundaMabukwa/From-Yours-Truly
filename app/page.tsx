import HeroHeader from "@/components/hero-header"
import PhotoSlideshow from "@/components/photo-slideshow"
import PhotoCollage from "@/components/photo-collage"
import GiftHeart from "@/components/gift-heart"
import { Heart } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        {/* Hero with Apology */}
        <HeroHeader />

        {/* Slideshow Section */}
        <section className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-border" />
            <h2 className="font-serif text-lg md:text-xl text-foreground whitespace-nowrap">
              Our Story
            </h2>
            <span className="h-px flex-1 bg-border" />
          </div>
          <PhotoSlideshow />
        </section>

        {/* Gift Heart Section */}
        <section className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-border" />
            <Heart className="h-4 w-4 text-accent" fill="currentColor" />
            <span className="h-px flex-1 bg-border" />
          </div>
          <GiftHeart />
        </section>

        {/* Collage Section */}
        <section className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-border" />
            <h2 className="font-serif text-lg md:text-xl text-foreground whitespace-nowrap">
              The Collage
            </h2>
            <span className="h-px flex-1 bg-border" />
          </div>
          <PhotoCollage />
        </section>

        {/* Footer Message */}
        <footer className="pb-12 md:pb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 sm:w-16 bg-border" />
            <Heart className="h-5 w-5 text-accent" fill="currentColor" />
            <span className="h-px w-12 sm:w-16 bg-border" />
          </div>
          <p className="font-serif text-xl md:text-2xl text-foreground mb-3 text-balance">
            Happy Valentine{"'"}s Day, My Love
          </p>
          <p className="font-sans text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
            To many more memories, mirror selfies, FaceTime calls,
            Mooshie adventures, and moments that make life beautiful with you.
          </p>
          <p className="mt-4 text-lg" aria-label="love hearts">
            {"❤️❤️❤️"}
          </p>
        </footer>
      </div>
    </main>
  )
}
