"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import DentalLogo from "./dental-logo"

interface LoadingScreenProps {
  onFinish?: () => void
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [canSkip, setCanSkip] = useState(false)

  // Précharger la vidéo dès le montage du composant
  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.href = "/flowe.mp4"
    link.as = "video"
    link.type = "video/mp4"
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let fallbackTimeout: ReturnType<typeof setTimeout> | undefined
    let skipTimeout: ReturnType<typeof setTimeout> | undefined
    let minDisplayTimeout: ReturnType<typeof setTimeout> | undefined

    // Permettre de skip après 1 seconde
    skipTimeout = setTimeout(() => {
      setCanSkip(true)
    }, 1000)

    // Timeout minimum d'affichage - forcer la fin après 2 secondes max
    minDisplayTimeout = setTimeout(() => {
      if (fallbackTimeout) clearTimeout(fallbackTimeout)
      setProgress(100)
      setTimeout(() => setIsComplete(true), 200)
    }, 2000)

    const updateProgress = () => {
      if (video.duration && !Number.isNaN(video.duration) && video.duration !== Infinity) {
        const pct = Math.min((video.currentTime / video.duration) * 100, 100)
        setProgress(pct)
      } else {
        // Si pas de durée, simuler une progression rapide
        setProgress((prev) => Math.min(prev + 2, 100))
      }
    }

    const handleCanPlay = () => {
      // La vidéo peut commencer à jouer - on peut accélérer la progression
      setProgress(30)
      updateProgress()
    }

    const handleLoadedMetadata = () => {
      setProgress(0)
      updateProgress()
      if (fallbackTimeout) clearTimeout(fallbackTimeout)
      // Timeout réduit à 1.5 secondes maximum au lieu d'attendre toute la vidéo
      const fallbackDelay = 1500
      fallbackTimeout = setTimeout(() => {
        setProgress(100)
        setTimeout(() => setIsComplete(true), 200)
      }, fallbackDelay)
    }

    const handleTimeUpdate = () => {
      updateProgress()
    }

    const handleEnded = () => {
      setProgress(100)
      if (fallbackTimeout) clearTimeout(fallbackTimeout)
      setTimeout(() => setIsComplete(true), 200)
    }

    const handleError = () => {
      setProgress(100)
      if (fallbackTimeout) clearTimeout(fallbackTimeout)
      setTimeout(() => setIsComplete(true), 200)
    }

    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleEnded)
    video.addEventListener("error", handleError)

    // Essayer de jouer immédiatement
    const tryPlay = () => {
      void video.play().catch(() => {
        // Si la lecture échoue, on continue quand même
      })
    }
    
    // Si la vidéo est déjà prête, jouer immédiatement
    if (video.readyState >= 3) {
      tryPlay()
    } else {
      video.addEventListener("canplay", tryPlay, { once: true })
    }
    
    // Fallback : essayer de jouer après un court délai
    setTimeout(tryPlay, 100)

    // Animation de progression même si la vidéo ne charge pas (fallback)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return Math.min(prev + 1, 100)
      })
    }, 100)

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("error", handleError)
      if (fallbackTimeout) clearTimeout(fallbackTimeout)
      if (skipTimeout) clearTimeout(skipTimeout)
      if (minDisplayTimeout) clearTimeout(minDisplayTimeout)
      clearInterval(progressInterval)
    }
  }, [])

  useEffect(() => {
    if (isComplete) {
      onFinish?.()
    }
  }, [isComplete, onFinish])

  if (isComplete) return null

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white via-sky-100 to-cyan-50 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/flowe.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/med7-0PMFY2OhS0Ra5m7clVOJTsRbMaz1al.png"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-sky-100/60 to-cyan-100/55" />
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/med7-0PMFY2OhS0Ra5m7clVOJTsRbMaz1al.png"
          alt="Médecin du centre"
          fill
          className="object-cover mix-blend-screen opacity-65"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/50 via-sky-100/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-slate-900">
        {/* Animated Logo */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-300 to-cyan-300 rounded-full blur-lg opacity-60 animate-pulse" />
          <div className="relative w-24 h-24 bg-gradient-to-br from-sky-300 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-cyan-300/40">
            <DentalLogo className="w-16 h-16 text-sky-900" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-2">Centre Dentaire</h1>
          <p className="text-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent font-bold">
            BENSLIMANE
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-72 h-2 bg-white/80 rounded-full overflow-hidden backdrop-blur-sm border border-sky-200">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-300/40"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Text */}
        <p className="text-lg text-slate-600 font-medium animate-pulse">Préparation du centre...</p>
        
        {/* Skip Button */}
        {canSkip && (
          <button
            onClick={() => {
              setProgress(100)
              setTimeout(() => setIsComplete(true), 100)
            }}
            className="mt-4 px-6 py-2 text-sm font-semibold text-slate-700 bg-white/90 hover:bg-white rounded-full transition-all shadow-lg hover:shadow-xl backdrop-blur-sm border border-sky-200/50"
          >
            Passer
          </button>
        )}
      </div>

      {/* Animated particles background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-sky-300/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
