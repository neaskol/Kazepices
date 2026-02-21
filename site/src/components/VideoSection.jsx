import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

import presentationVideo from '../assets/kazepices-presentation.mp4'

gsap.registerPlugin(ScrollTrigger)

export default function VideoSection() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play()
          setIsPlaying(true)
        } else {
          video.pause()
          setIsPlaying(false)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const toggleVideo = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }, [])

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'm' || e.key === 'M') {
      e.preventDefault()
      toggleMute()
    }
  }, [toggleMute])

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
          className="relative overflow-hidden"
          style={{ borderRadius: '2.5rem' }}
          onKeyDown={handleKeyDown}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            aria-label="Video de presentation Kazepices Madagascar"
            className="w-full aspect-video object-cover"
            style={{ borderRadius: '2.5rem' }}
          >
            <source src={presentationVideo} type="video/mp4" />
          </video>

          <p className="sr-only">
            Video de presentation de Kazepices Madagascar montrant le processus de recolte,
            de transformation et de conditionnement des epices naturelles a Madagascar.
          </p>

          {/* Play/Pause button */}
          <button
            onClick={toggleVideo}
            aria-label={isPlaying ? 'Mettre en pause' : 'Lire la video'}
            className={`absolute inset-0 bg-charcoal/40 flex items-center justify-center transition-opacity duration-500 cursor-pointer ${
              isPlaying ? 'opacity-0 hover:opacity-100 focus-visible:opacity-100' : 'opacity-100'
            }`}
            style={{ borderRadius: '2.5rem' }}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-md flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110">
              {isPlaying ? (
                <Pause size={32} className="text-white" aria-hidden="true" />
              ) : (
                <Play size={32} className="text-white ml-1" aria-hidden="true" />
              )}
            </div>
          </button>

          {/* Sound toggle button */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
            className="absolute bottom-5 right-5 z-10 w-11 h-11 bg-charcoal/60 backdrop-blur-md flex items-center justify-center rounded-full transition-all duration-300 hover:bg-charcoal/80 hover:scale-110"
          >
            {isMuted ? (
              <VolumeX size={18} className="text-white" aria-hidden="true" />
            ) : (
              <Volume2 size={18} className="text-white" aria-hidden="true" />
            )}
          </button>

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
