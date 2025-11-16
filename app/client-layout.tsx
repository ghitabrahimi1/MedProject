"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Analytics } from "@vercel/analytics/next"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isDark, setIsDark] = useState(false)
  const [language, setLanguage] = useState<"fr" | "en">("fr")
  const [mounted, setMounted] = useState(false)

  // Initialize dark mode and language from localStorage
  useEffect(() => {
    setMounted(true)
    const savedDark = localStorage.getItem("darkMode") === "true"
    const savedLang = (localStorage.getItem("language") || "fr") as "fr" | "en"
    setIsDark(savedDark)
    setLanguage(savedLang)
    if (savedDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    return () => {
      document.documentElement.lang = "fr"
    }
  }, [language])

  const toggleDarkMode = () => {
    const newDark = !isDark
    setIsDark(newDark)
    localStorage.setItem("darkMode", String(newDark))
    if (newDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const toggleLanguage = () => {
    const newLang = language === "fr" ? "en" : "fr"
    setLanguage(newLang)
    localStorage.setItem("language", newLang)
  }

  if (!mounted) return null

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Vidéo en arrière-plan avec opacité réduite */}
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-20 dark:opacity-10"
          src="/fifi.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        
        {/* Fond avec gradient élégant par-dessus */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/95 via-sky-50/40 to-cyan-50/30 dark:from-slate-950/90 dark:via-slate-900/85 dark:to-slate-950/90" />
        
        {/* Effets subtils */}
        <div className="absolute inset-0 opacity-20 dark:opacity-15">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-200/30 dark:bg-cyan-900/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/15 rounded-full blur-3xl" />
        </div>
      </div>
      <div className="relative z-0">
        {children}
        <Analytics />
      </div>
    </>
  )
}
