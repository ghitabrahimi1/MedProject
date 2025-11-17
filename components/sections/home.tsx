"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Scan, Cog, Sparkles } from "lucide-react"

const PORTRAIT_PARTICLES = [
  { top: "12%", left: "18%", delay: "0s" },
  { top: "28%", left: "70%", delay: "1.2s" },
  { top: "46%", left: "32%", delay: "0.8s" },
  { top: "62%", left: "10%", delay: "2.4s" },
  { top: "78%", left: "55%", delay: "3.6s" },
  { top: "18%", left: "82%", delay: "1.8s" },
  { top: "35%", left: "5%", delay: "2.8s" },
  { top: "54%", left: "88%", delay: "0.4s" },
  { top: "72%", left: "28%", delay: "3.2s" },
  { top: "84%", left: "74%", delay: "1.4s" },
];

export default function Home() {
  const [language, setLanguage] = useState("fr")
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const descriptionClass = isDark ? "text-slate-100/90" : "text-slate-900/85"
  const subDescriptionClass = isDark ? "text-slate-100/75" : "text-slate-800/75"
  const textPanelBorder = isDark ? "border-sky-200/50 bg-white/12" : "border-sky-300/30 bg-white/80"
  const iconCardBorder = isDark ? "border-sky-200/30 bg-white/8" : "border-sky-300/25 bg-white/80 shadow-sm"
  const gradientBadgeText = isDark ? "text-sky-100/80" : "text-sky-700/80"
  const nameAccentClass = isDark ? "text-sky-100/80" : "text-sky-700/70"
  const nameMainClass = isDark ? "text-white" : "text-slate-900"
  const iconLabelClass = isDark ? "text-sky-100/80" : "text-sky-700/80"
  const heroPhraseHighlight = isDark
    ? "bg-gradient-to-r from-emerald-200 via-sky-200 to-cyan-200"
    : "bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-500"

  const copy = language === "en"
    ? {
        paragraph1: "Leading-edge aesthetic dentistry expertise for a harmonious, natural and long-lasting smile.",
        paragraph2: "Personalized approach, advanced digital technologies and premium care for outstanding results.",
        founder: "Founder of Benslimane Dental Center",
        ctaPrimary: "Book an appointment",
        ctaSecondary: "Our Services",
        iconLabels: ["3D Scan", "Implant", "Aesthetics"],
        portraitAlt: "Mouad Benslimane - Dental Surgeon",
      }
    : {
        paragraph1: "Expert en esthétique dentaire de pointe pour un sourire harmonieux, naturel et durable.",
        paragraph2: "Approche personnalisée, technologies digitales avancées et soins premium pour des résultats exceptionnels.",
        founder: "Fondateur du Centre Dentaire Benslimane",
        ctaPrimary: "Réserver une consultation",
        ctaSecondary: "Nos Services",
        iconLabels: ["3D Scan", "Implant", "Esthétique"],
        portraitAlt: "Mouad Benslimane - Chirurgien Dentiste",
      }

  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem("language") || "fr"
    setLanguage(savedLang)
    setIsDark(document.documentElement.classList.contains("dark"))
    const handleStorageChange = () => {
      const newLang = localStorage.getItem("language") || "fr"
      setLanguage(newLang)
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const handleCustomLanguageChange = (event: CustomEvent<string>) => {
      setLanguage(event.detail || "fr")
    }
    window.addEventListener("language-change", handleCustomLanguageChange as EventListener)
    return () => {
      window.removeEventListener("language-change", handleCustomLanguageChange as EventListener)
    }
  }, [mounted])

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    updateTheme()
    window.addEventListener("theme-change", updateTheme)
    return () => window.removeEventListener("theme-change", updateTheme)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center py-16 sm:py-20 md:py-24 lg:py-32 group"
    >
      <div className="absolute inset-0 pointer-events-none" />

      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="relative">
          <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-r from-sky-400/35 via-cyan-300/20 to-blue-500/30 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
          <div className="relative overflow-hidden rounded-[28px] border border-sky-300/40 bg-white/10 backdrop-blur-lg shadow-[0_18px_45px_rgba(15,118,230,0.18)] transition-all duration-500 hover:border-sky-300/70">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-60" />
            <div className="relative flex flex-col lg:flex-row items-stretch gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6 md:px-10 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-14">
              <div
                className="hidden lg:flex flex-1 flex-col justify-center animate-fade-up"
                style={{ animationDelay: "0.02s" }}
              >
                <div className="max-w-sm space-y-6">
                  <div className="relative inline-flex items-center animate-fade-up" style={{ animationDelay: "0.04s" }}>
                    <div className="absolute -inset-[2px] rounded-[22px] bg-gradient-to-r from-[#00f6ff] via-[#18c6ff] to-[#6ef5ff] blur-lg opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                    <div
                      className={`relative inline-flex items-center gap-4 rounded-[22px] border px-6 py-3 backdrop-blur-md ${
                        isDark
                          ? "border-cyan-300/50 bg-slate-900/40 text-white shadow-[0_20px_45px_rgba(12,74,110,0.45)]"
                          : "border-cyan-400/70 bg-white/80 text-slate-900 shadow-[0_22px_55px_rgba(34,211,238,0.28)]"
                      }`}
                    >
                      <span className="h-3 w-3 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-500 shadow-[0_0_18px_rgba(56,189,248,0.75)]" />
                      <div className="flex flex-col leading-none">
                        <span className="text-[0.68rem] uppercase tracking-[0.5em] text-cyan-500/90">
                          Centre Dentaire
                        </span>
                        <span className="text-2xl font-semibold uppercase tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-[#0ff9ff] via-[#00b5ff] to-[#36f8ff] drop-shadow-[0_10px_35px_rgba(8,145,178,0.45)]">
                          Benslimane Dental
                        </span>
                      </div>
                      <span className="h-3 w-3 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-500 shadow-[0_0_18px_rgba(56,189,248,0.75)]" />
                    </div>
                  </div>
                  <p
                    className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-snug uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] text-transparent bg-clip-text drop-shadow-[0_14px_45px_rgba(16,185,129,0.25)] ${heroPhraseHighlight}`}
                  >
                    L&apos;expérience dentaire haut de gamme qui réenchante votre sourire.
                  </p>
                </div>
              </div>

              <div className="relative w-full lg:max-w-xl lg:ml-auto">
                <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-r from-sky-400/40 via-cyan-300/25 to-slate-100/20 opacity-40 blur-sm" />
                <div
                  className={`relative rounded-[26px] ${textPanelBorder} ${
                    isDark ? "text-white" : "text-slate-900"
                  } backdrop-blur-2xl shadow-[0_20px_55px_rgba(15,118,230,0.22)] px-4 sm:px-6 md:px-7 py-6 sm:py-8 md:py-10`}
                >
                  <div className="flex flex-col lg:grid lg:grid-cols-[auto,1fr] gap-8">
                    <div className="flex flex-col lg:flex-row items-start gap-6 animate-fade-up" style={{ animationDelay: "0.05s" }}>
                      <div className="relative w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] h-[180px] sm:h-[200px] md:h-[220px] mx-auto lg:mx-0 overflow-hidden rounded-[24px] sm:rounded-[28px] md:rounded-[32px] border border-sky-200/35 bg-white/20 shadow-[0_10px_24px_rgba(15,118,230,0.18)]">
                        <Image src="/med1_remove.png" alt={copy.portraitAlt} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col items-start gap-4">
                        <div className="flex items-center gap-4">
                          <div className="relative group">
                            <div className="absolute inset-[-6px] rounded-full border border-sky-200/30 blur-[2px] group-hover:border-sky-100/60 transition-colors durée-500 animate-orbit" />
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-600 via-cyan-400 to-blue-700 text-white font-semibold tracking-[0.15em] shadow-[0_0_18px_rgba(56,189,248,0.45)] group-hover:shadow-[0_0_26px_rgba(59,130,246,0.6)] transition-shadow durée-500">
                              MB
                            </div>
                          </div>
                          <div className="text-left">
                            <p className={`text-xs uppercase tracking-[0.4em] ${nameAccentClass}`}>MOUAD</p>
                            <p className={`text-lg font-semibold tracking-[0.08em] animate-gentle-glow ${nameMainClass}`}>BENSLIMANE</p>
                          </div>
                        </div>
                        <div
                          className={`inline-flex items-center gap-2 rounded-full border border-sky-300/40 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] ${gradientBadgeText} animate-fade-up`}
                          style={{ animationDelay: "0.12s" }}
                        >
                          <span className="h-1 w-1 rounded-full bg-sky-300/80 shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
                          {copy.founder}
                          <span className="h-1 w-1 rounded-full bg-sky-300/80 shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
                        </div>
                        <div className="space-y-2 animate-fade-up" style={{ animationDelay: "0.18s" }}>
                          <p className={`text-sm uppercase tracking-[0.35em] ${nameAccentClass}`}>Profile</p>
                          <p className={`text-base md:text-lg font-medium leading-relaxed ${descriptionClass}`}>
                            {copy.paragraph1}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-4">
                        <p className={`text-sm md:text-base animate-fade-up ${subDescriptionClass}`} style={{ animationDelay: "0.22s" }}>
                          {copy.paragraph2}
                        </p>
                        <p className={`text-sm md:text-base animate-fade-up ${subDescriptionClass}`} style={{ animationDelay: "0.32s" }}>
                          {language === "en"
                            ? "An exclusive concierge accompanies you from the first consultation to the post-care smile follow-up."
                            : "Une conciergerie exclusive vous accompagne de la première consultation au suivi post-soins du sourire."}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 animate-fade-up" style={{ animationDelay: "0.52s" }}>
                        <div className={`rounded-2xl px-4 py-5 backdrop-blur flex flex-col items-center gap-3 ${iconCardBorder}`}>
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-cyan-400 to-blue-600 text-white shadow-[0_0_18px_rgba(56,189,248,0.35)]">
                            <Scan className="w-5 h-5" />
                          </span>
                          <p className={`text-xs uppercase tracking-[0.25em] ${iconLabelClass}`}>{copy.iconLabels[0]}</p>
                        </div>
                        <div className={`rounded-2xl px-4 py-5 backdrop-blur flex flex-col items-center gap-3 ${iconCardBorder}`}>
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-cyan-400 to-blue-600 text-white shadow-[0_0_18px_rgba(56,189,248,0.35)]">
                            <Cog className="w-5 h-5" />
                          </span>
                          <p className={`text-xs uppercase tracking-[0.25em] ${iconLabelClass}`}>{copy.iconLabels[1]}</p>
                        </div>
                        <div className={`rounded-2xl px-4 py-5 backdrop-blur flex flex-col items-center gap-3 ${iconCardBorder}`}>
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-cyan-400 to-blue-600 text-white shadow-[0_0_18px_rgba(56,189,248,0.35)]">
                            <Sparkles className="w-5 h-5" />
                          </span>
                          <p className={`text-xs uppercase tracking-[0.25em] ${iconLabelClass}`}>{copy.iconLabels[2]}</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: "0.62s" }}>
                        <Link
                          href="#appointment"
                          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 hover:from-sky-400 hover:via-cyan-300 hover:to-blue-500 text-white rounded-full font-semibold transition-all transform hover:translate-y-[-2px] hover:shadow-[0_12px_35px_rgba(56,189,248,0.28)]"
                        >
                          {copy.ctaPrimary}
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <Link
                          href="#services"
                          className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-sky-300/60 hover:border-sky-200 text-sky-100 hover:text-white rounded-full font-semibold transition-all hover:bg-white/10 backdrop-blur"
                        >
                          {copy.ctaSecondary}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
