"use client"

import { useEffect, useState } from "react"
import type { Language } from "@/lib/i18n"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactCard() {
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

  const contactItems = [
    {
      icon: Phone,
      title: language === "fr" ? "Téléphone" : "Phone",
      value: "05 35 62 42 87",
      gradient: "from-cyan-400 via-blue-500 to-cyan-600",
      darkBg: "from-cyan-950/30 via-blue-950/20 to-transparent",
      lightBg: "from-cyan-500/10 via-blue-500/5 to-transparent",
      glowColor: "rgba(34, 211, 238, 0.6)",
    },
    {
      icon: Mail,
      title: language === "fr" ? "Email" : "Email",
      value: "contact@benslimane.ma",
      gradient: "from-blue-400 via-cyan-500 to-sky-600",
      darkBg: "from-blue-950/30 via-cyan-950/20 to-transparent",
      lightBg: "from-blue-500/10 via-cyan-500/5 to-transparent",
      glowColor: "rgba(59, 130, 246, 0.6)",
    },
    {
      icon: MapPin,
      title: language === "fr" ? "Adresse" : "Address",
      value: language === "fr" ? "4ème Etage, sur la devanture du café Paul, N° 31 Ave Allal Ben Abdellah, Fes" : "4th Floor, in front of Café Paul, No. 31 Ave Allal Ben Abdellah, Fes",
      gradient: "from-sky-400 via-blue-500 to-cyan-600",
      darkBg: "from-sky-950/30 via-blue-950/20 to-transparent",
      lightBg: "from-sky-500/10 via-blue-500/5 to-transparent",
      glowColor: "rgba(56, 189, 248, 0.6)",
    },
    {
      icon: Clock,
      title: language === "fr" ? "Horaires" : "Hours",
      value: language === "fr" ? "Lun-Ven 9h-18h, Sam 9h-13h" : "Mon-Fri 9am-6pm, Sat 9am-1pm",
      gradient: "from-cyan-500 via-sky-500 to-blue-600",
      darkBg: "from-cyan-950/30 via-sky-950/20 to-transparent",
      lightBg: "from-cyan-500/10 via-sky-500/5 to-transparent",
      glowColor: "rgba(34, 211, 238, 0.6)",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 md:gap-4 h-full">
      {contactItems.map((item, index) => {
        const Icon = item.icon
        return (
          <div
            key={index}
            className="group relative overflow-hidden animate-fade-up"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {/* Fond avec effet de verre et néon - transparent */}
            <div 
              className={`relative rounded-xl p-4 md:p-5 transition-all duration-500 cursor-pointer backdrop-blur-md border-2 bg-gradient-to-br ${
                isDark 
                  ? `${item.darkBg} border-cyan-500/30`
                  : `${item.lightBg} border-cyan-400/40`
              } group-hover:border-cyan-400/80 group-hover:scale-[1.02] group-hover:-translate-y-0.5`}
              style={{
                boxShadow: isDark 
                  ? `0 4px 20px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(34, 211, 238, 0.1), 0 0 15px ${item.glowColor}, 0 0 30px rgba(34, 211, 238, 0.15)`
                  : `0 4px 20px rgba(56, 189, 248, 0.1), 0 0 0 1px rgba(34, 211, 238, 0.1), 0 0 10px rgba(34, 211, 238, 0.15)`,
              }}
            >
              {/* Lignes animées en arrière-plan */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
                <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse" />
                <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse" />
              </div>

              {/* Effet de brillance animé */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none animate-shimmer"
                style={{
                  background: `linear-gradient(135deg, ${item.glowColor} 0%, transparent 50%, ${item.glowColor} 100%)`,
                  backgroundSize: '200% 200%',
                }}
              />

              {/* Bordure néon animée */}
              <div 
                className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10`}
                style={{
                  filter: 'blur(8px)',
                }}
              />

              {/* Contenu */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
                {/* Icône avec effet néon */}
                <div 
                  className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 animate-neon-pulse`}
                  style={{
                    boxShadow: `0 0 15px ${item.glowColor}, 0 0 30px ${item.glowColor}, inset 0 0 15px rgba(255, 255, 255, 0.2)`,
                  }}
                >
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-lg" />
                  
                  {/* Particules autour de l'icône */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping"
                        style={{
                          left: `${20 + (i % 3) * 30}%`,
                          top: `${20 + Math.floor(i / 3) * 30}%`,
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: '2s',
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Texte */}
                <div className="flex-1 min-w-0 space-y-1">
                  <h3 
                    className={`text-sm md:text-base font-bold uppercase tracking-wider ${
                      isDark 
                        ? "text-cyan-300" 
                        : "text-cyan-700"
                    }`}
                    style={{
                      textShadow: isDark ? `0 0 8px ${item.glowColor}` : 'none',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className={`text-xs md:text-sm leading-snug break-words font-medium transition-colors duration-300 ${
                      isDark 
                        ? "text-slate-200 group-hover:text-cyan-300" 
                        : "text-slate-700 group-hover:text-cyan-600"
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              </div>

              {/* Barre de progression animée en bas */}
              <div 
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.gradient} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                style={{
                  boxShadow: `0 0 10px ${item.glowColor}`,
                }}
              />

              {/* Effet de scan animé */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none animate-scan"
                style={{
                  background: `linear-gradient(180deg, transparent 0%, ${item.glowColor} 50%, transparent 100%)`,
                  backgroundSize: '100% 200%',
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}