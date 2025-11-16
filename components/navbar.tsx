"use client"

import { useState, createContext, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun } from "lucide-react"
import { translations, type Language } from "@/lib/i18n"
import DentalLogo from "./dental-logo"

interface NavbarContextType {
  language: Language
  isDark: boolean
  setLanguage: (lang: Language) => void
  setIsDark: (dark: boolean) => void
}

export const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState<Language>("fr")
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedDark = localStorage.getItem("darkMode") === "true"
    const savedLang = (localStorage.getItem("language") || "fr") as Language
    setIsDark(savedDark)
    setLanguage(savedLang)
  }, [])

  const toggleDarkMode = () => {
    const newDark = !isDark
    setIsDark(newDark)
    localStorage.setItem("darkMode", String(newDark))
    if (newDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    window.dispatchEvent(new CustomEvent("theme-change", { detail: newDark }))
  }

  const toggleLanguage = () => {
    const newLang = language === "fr" ? "en" : "fr"
    setLanguage(newLang)
    localStorage.setItem("language", newLang)
    window.dispatchEvent(new CustomEvent("language-change", { detail: newLang }))
  }

  const t = translations[language]

  const navItems = [
    { href: "#home", label: t.nav.home },
    { href: "#services", label: t.nav.services },
  ]
  const appointmentLabel = t.nav.appointment

  if (!mounted) return null

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 sticky overflow-hidden bg-cover bg-center bg-no-repeat animate-slide-down-fade"
      style={{
        backgroundImage: "url('/arriereplan.jpg')",
        backgroundColor: "rgba(191, 219, 254, 0.75)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-sky-200/80 via-cyan-100/55 to-sky-200/45 dark:from-sky-900/60 dark:via-cyan-900/50 dark:to-slate-950/65" />
      <div className="absolute inset-0 pointer-events-none backdrop-blur-xl bg-sky-50/35 dark:bg-slate-950/55 border-b border-white/40 dark:border-white/10 shadow-[0_12px_36px_rgba(56,189,248,0.18)] transition-all duration-500 ease-out" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex-shrink-0 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 text-primary transition-transform duration-500 ease-out group-hover:scale-110 logo-pulse-glow">
                <DentalLogo className="w-full h-full" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/70">
                  Centre Dentaire
                </span>
                <span className="text-sm font-bold leading-tight bg-gradient-to-r from-sky-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent drop-shadow-[0_3px_8px_rgba(59,130,246,0.25)]">
                  Benslimane
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm font-medium tracking-wide text-foreground/90 transition-all duration-300 ease-out hover:text-primary group"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 origin-left bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="hidden sm:inline-flex items-center justify-center rounded-full border border-white/40 bg-white/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-sky-900/80 transition-all duration-300 hover:border-sky-300 hover:bg-white/60 dark:border-white/20 dark:bg-white/10 dark:text-sky-100 dark:hover:bg-white/20"
            >
              {language === "fr" ? "EN" : "FR"}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/25 text-sky-700 transition-all duration-300 hover:border-sky-300 hover:bg-white/50 dark:border-white/10 dark:bg-white/10 dark:text-sky-100 dark:hover:bg-white/20"
              aria-label="Basculer le thème"
            >
              <span className="absolute inset-0 rounded-full bg-white/40 blur-xl opacity-40 dark:bg-sky-500/20" />
              <span className="relative">{isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</span>
            </button>

            <Link
              href="#appointment"
              className="relative hidden md:inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_0_20px_rgba(59,130,246,0.45)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(59,130,246,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/80 animate-neon-pulse"
            >
              <span className="relative z-10">{appointmentLabel}</span>
              <span className="absolute inset-0 rounded-full bg-white/30 mix-blend-overlay opacity-0 transition-opacity duration-300 hover:opacity-100" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/20 text-sky-700 transition-all duration-300 hover:border-sky-300 hover:bg-white/40 dark:border-white/10 dark:bg-white/10 dark:text-sky-100 dark:hover:bg-white/20"
              aria-label="Ouvrir le menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            <div className="mt-3 space-y-3 rounded-2xl border border-white/30 bg-white/30 p-4 shadow-[0_12px_30px_rgba(56,189,248,0.18)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-full bg-white/40 px-4 py-2 text-sm font-medium text-sky-900 transition-all duration-300 hover:bg-white/70 hover:pl-6 dark:bg-white/10 dark:text-sky-100 dark:hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#appointment"
                className="block rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 px-4 py-2 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-[0_0_20px_rgba(59,130,246,0.45)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(59,130,246,0.7)]"
                onClick={() => setIsOpen(false)}
              >
                {appointmentLabel}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
