"use client"

import { useEffect, useState } from "react"
import type { Language } from "@/lib/i18n"

export default function LocationMap() {
  const [language, setLanguage] = useState<Language>("fr")
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedLang = (localStorage.getItem("language") || "fr") as Language
    setLanguage(savedLang)
    setIsDark(document.documentElement.classList.contains("dark"))

    const handleStorageChange = () => {
      const newLang = (localStorage.getItem("language") || "fr") as Language
      setLanguage(newLang)
    }

    const handleThemeChange = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("theme-change", handleThemeChange)
    
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("theme-change", handleThemeChange)
    }
  }, [])

  // Adresse: 4ème Etage, sur la devanture du café Paul, N° 31 Ave Allal Ben Abdellah, Fes
  // Coordonnées pour Fès, Avenue Allal Ben Abdellah
  // Utilisation d'une URL Google Maps simplifiée avec l'adresse
  const address = "31 Avenue Allal Ben Abdellah, Fes, Morocco"
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`

  return (
    <div className="relative w-full h-full min-h-[300px] md:min-h-[350px] lg:min-h-[400px] group">
      {/* Effet de néon externe animé */}
      <div 
        className={`absolute -inset-2 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-2xl ${
          isDark
            ? "bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-cyan-500/40"
            : "bg-gradient-to-r from-cyan-400/30 via-blue-400/30 to-cyan-400/30"
        }`}
        style={{
          animation: 'neonPulse 3s ease-in-out infinite',
        }}
      />
      
      {/* Bordure néon animée */}
      <div 
        className={`absolute -inset-0.5 rounded-2xl border ${
          isDark
            ? "border-cyan-500/40"
            : "border-cyan-400/30"
        } group-hover:border-cyan-400/70 transition-all duration-500`}
        style={{
          boxShadow: isDark
            ? `0 0 15px rgba(34, 211, 238, 0.3), 0 0 30px rgba(34, 211, 238, 0.15)`
            : `0 0 10px rgba(34, 211, 238, 0.2), 0 0 20px rgba(34, 211, 238, 0.1)`,
        }}
      >
        {/* Lignes de scan animées */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-20">
          <div 
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"
            style={{
              top: '30%',
              animation: 'scan 4s linear infinite',
            }}
          />
          <div 
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"
            style={{
              top: '70%',
              animation: 'scan 4s linear infinite 2s',
            }}
          />
        </div>
      </div>
      
      {/* Conteneur principal avec effet de verre - transparent */}
      <div 
        className={`relative w-full h-full rounded-2xl overflow-hidden border backdrop-blur-md transition-all duration-500 group-hover:scale-[1.005] ${
          isDark 
            ? "border-cyan-500/30 bg-slate-900/20 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.3)]" 
            : "border-cyan-400/40 bg-transparent shadow-[0_15px_50px_-10px_rgba(56,189,248,0.15)]"
        } group-hover:shadow-[0_20px_60px_-10px_rgba(34,211,238,0.25)]`}
      >
        {/* Overlay de dégradé avec effet de lumière - très subtil */}
        <div 
          className={`absolute inset-0 pointer-events-none z-10 ${
            isDark
              ? "bg-gradient-to-br from-cyan-900/10 via-transparent to-blue-900/10"
              : "bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5"
          }`}
        />
        
        {/* Effet de brillance animé */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none z-10 animate-shimmer"
          style={{
            background: `linear-gradient(135deg, rgba(34, 211, 238, 0.3) 0%, transparent 50%, rgba(34, 211, 238, 0.3) 100%)`,
            backgroundSize: '200% 200%',
          }}
        />
        
        {/* Points de repère animés aux coins */}
        <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-cyan-400 rounded-full opacity-50 animate-ping z-20" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full opacity-50 animate-ping z-20" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 bg-cyan-400 rounded-full opacity-50 animate-ping z-20" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full opacity-50 animate-ping z-20" style={{ animationDelay: '1.5s' }} />
        
        {/* Carte Google Maps */}
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="relative z-0"
        />
        
        {/* Overlay d'information en bas - transparent */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-2 md:p-3 bg-gradient-to-t ${
            isDark
              ? "from-slate-900/60 via-slate-900/40 to-transparent"
              : "from-white/40 via-white/20 to-transparent"
          } backdrop-blur-md z-20`}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            <p className={`text-xs font-medium ${
              isDark ? "text-cyan-300" : "text-cyan-700"
            }`}>
              {language === "fr" 
                ? "4ème Etage, N° 31 Ave Allal Ben Abdellah, Fes" 
                : "4th Floor, No. 31 Ave Allal Ben Abdellah, Fes"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}