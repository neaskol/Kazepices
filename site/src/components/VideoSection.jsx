import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Volume2, VolumeX } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const VIDEO_ID = '5gqF1BTWVDc'

export default function VideoSection() {
  const sectionRef = useRef(null)
  const playerRef = useRef(null)
  const containerRef = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const onPlayerReady = useCallback((event) => {
    playerRef.current = event.target
    event.target.mute()
    if (isInView) event.target.playVideo()
  }, [isInView])

  const toggleMute = () => {
    if (!playerRef.current) return
    if (isMuted) {
      playerRef.current.unMute()
      playerRef.current.setVolume(100)
    } else {
      playerRef.current.mute()
    }
    setIsMuted(!isMuted)
  }

  // Load YouTube IFrame API & create player
  useEffect(() => {
    const playerVars = {
      autoplay: 0,
      mute: 1,
      controls: 0,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      disablekb: 1,
      playsinline: 1,
      loop: 1,
      playlist: VIDEO_ID,
      fs: 0,
      cc_load_policy: 0,
      origin: window.location.origin,
    }

    if (window.YT && window.YT.Player) {
      new window.YT.Player('yt-player', {
        videoId: VIDEO_ID,
        playerVars,
        events: { onReady: onPlayerReady },
      })
      return
    }

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player('yt-player', {
        videoId: VIDEO_ID,
        playerVars,
        events: { onReady: onPlayerReady },
      })
    }
  }, [onPlayerReady])

  // Scroll-triggered autoplay
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (!playerRef.current) return
        if (entry.isIntersecting) {
          playerRef.current.playVideo()
        } else {
          playerRef.current.pauseVideo()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // GSAP fade-in animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.video-content', { y: 50, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="video" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto video-content">
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-moss tracking-widest uppercase">Notre histoire</span>
          <h2 className="font-heading font-extrabold text-forest text-3xl md:text-5xl mt-3 tracking-tight">
            L'histoire de{' '}
            <span className="font-drama italic text-madagascar">Kazepices.</span>
          </h2>
          <p className="font-body text-warm-gray text-base mt-4 max-w-lg mx-auto leading-relaxed">
            Decouvrez notre parcours, nos valeurs et la passion qui anime chaque produit Kazepices.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative overflow-hidden bg-charcoal"
          style={{ borderRadius: '2.5rem' }}
        >
          <div className="w-full aspect-video relative">
            <div id="yt-player" className="absolute inset-0 w-full h-full" />
          </div>

          {/* Sound toggle button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-6 right-6 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-body transition-all hover:bg-black/80 cursor-pointer"
            aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
          >
            {isMuted ? (
              <>
                <VolumeX size={18} />
                <span>Cliquez pour le son</span>
              </>
            ) : (
              <>
                <Volume2 size={18} />
                <span>Son actif</span>
              </>
            )}
          </button>

          <p className="sr-only">
            Lecteur video montrant la presentation de Kazepices Madagascar.
          </p>

          {/* Border glow — decorative */}
          <div
            className="absolute inset-0 border-2 border-moss/20 pointer-events-none"
            style={{ borderRadius: '2.5rem' }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
