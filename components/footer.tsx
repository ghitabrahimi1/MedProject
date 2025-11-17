"use client"

import { useState, useEffect } from "react"
import type { Language } from "@/lib/i18n"

export default function Footer() {
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

  return (
    <>
      <footer className={`relative py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden ${
        isDark 
          ? "bg-gradient-to-b from-slate-950/50 via-slate-900/30 to-transparent" 
          : "bg-gradient-to-b from-slate-50/80 via-sky-50/60 to-transparent"
      } backdrop-blur-sm`}>
        {/* Fond avec effets high-tech subtils */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Grille animée en arrière-plan - très subtile */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
          
          {/* Dégradés animés - très subtils */}
          <div 
            className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 animate-pulse ${
              isDark ? "bg-cyan-500" : "bg-cyan-300"
            }`}
            style={{
              animation: 'slowPulse 6s ease-in-out infinite',
            }}
          />
          <div 
            className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 animate-pulse ${
              isDark ? "bg-blue-500" : "bg-blue-300"
            }`}
            style={{
              animation: 'slowPulse 8s ease-in-out infinite 2s',
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-6 sm:mb-8 md:mb-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <h3 className={`text-xl font-bold ${
                isDark 
                  ? "bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300"
                  : "bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600"
              }`}>
                Centre Dentaire Benslimane
              </h3>
              <p className={`text-sm leading-relaxed ${
                isDark ? "text-slate-300/70" : "text-slate-600/80"
              }`}>
                {language === "fr"
                  ? "Votre partenaire de confiance pour une santé dentaire optimale."
                  : "Your trusted partner for optimal dental health."}
              </p>
            </div>

            {/* Services Column */}
            <div className="space-y-4">
              <h3 className={`text-lg font-bold uppercase tracking-wider flex items-center gap-2 ${
                isDark ? "text-cyan-300" : "text-cyan-600"
              }`}>
                <span className={`w-1 h-6 bg-gradient-to-b rounded-full ${
                  isDark ? "from-cyan-400 to-blue-500" : "from-cyan-500 to-blue-600"
                }`} />
                {language === "fr" ? "Services" : "Services"}
              </h3>
              <ul className="space-y-2.5">
                <li className="group">
                  <a 
                    href="#services" 
                    className={`text-sm transition-all duration-300 flex items-center gap-2 group-hover:translate-x-1 ${
                      isDark 
                        ? "text-slate-300/70 hover:text-cyan-300" 
                        : "text-slate-600/80 hover:text-cyan-600"
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                      isDark ? "bg-cyan-400" : "bg-cyan-500"
                    }`} />
                    {language === "fr" ? "Soins préventifs sur mesure" : "Tailored preventive care"}
                  </a>
                </li>
                <li className="group">
                  <a 
                    href="#services" 
                    className={`text-sm transition-all duration-300 flex items-center gap-2 group-hover:translate-x-1 ${
                      isDark 
                        ? "text-slate-300/70 hover:text-cyan-300" 
                        : "text-slate-600/80 hover:text-cyan-600"
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                      isDark ? "bg-cyan-400" : "bg-cyan-500"
                    }`} />
                    {language === "fr" ? "Dentisterie esthétique signature" : "Signature aesthetic dentistry"}
                  </a>
                </li>
                <li className="group">
                  <a 
                    href="#services" 
                    className={`text-sm transition-all duration-300 flex items-center gap-2 group-hover:translate-x-1 ${
                      isDark 
                        ? "text-slate-300/70 hover:text-cyan-300" 
                        : "text-slate-600/80 hover:text-cyan-600"
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                      isDark ? "bg-cyan-400" : "bg-cyan-500"
                    }`} />
                    {language === "fr" ? "Dentisterie restauratrice avancée" : "Advanced restorative dentistry"}
                  </a>
                </li>
                <li className="group">
                  <a 
                    href="#services" 
                    className={`text-sm transition-all duration-300 flex items-center gap-2 group-hover:translate-x-1 ${
                      isDark 
                        ? "text-slate-300/70 hover:text-cyan-300" 
                        : "text-slate-600/80 hover:text-cyan-600"
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                      isDark ? "bg-cyan-400" : "bg-cyan-500"
                    }`} />
                    {language === "fr" ? "Services pédiatriques doux" : "Gentle pediatric services"}
                  </a>
                </li>
                <li className="group">
                  <a 
                    href="#services" 
                    className={`text-sm transition-all duration-300 flex items-center gap-2 group-hover:translate-x-1 ${
                      isDark 
                        ? "text-slate-300/70 hover:text-cyan-300" 
                        : "text-slate-600/80 hover:text-cyan-600"
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                      isDark ? "bg-cyan-400" : "bg-cyan-500"
                    }`} />
                    {language === "fr" ? "Traitements d'urgence réactifs" : "Responsive emergency care"}
                  </a>
                </li>
                <li className="group">
                  <a 
                    href="#services" 
                    className={`text-sm transition-all duration-300 flex items-center gap-2 group-hover:translate-x-1 ${
                      isDark 
                        ? "text-slate-300/70 hover:text-cyan-300" 
                        : "text-slate-600/80 hover:text-cyan-600"
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                      isDark ? "bg-cyan-400" : "bg-cyan-500"
                    }`} />
                    {language === "fr" ? "Dentisterie spécialisée experte" : "Expert specialised dentistry"}
                  </a>
                </li>
              </ul>
            </div>

            {/* Cabinet Column */}
            <div className="space-y-4">
              <h3 className={`text-lg font-bold uppercase tracking-wider flex items-center gap-2 ${
                isDark ? "text-cyan-300" : "text-cyan-600"
              }`}>
                <span className={`w-1 h-6 bg-gradient-to-b rounded-full ${
                  isDark ? "from-cyan-400 to-blue-500" : "from-cyan-500 to-blue-600"
                }`} />
                {language === "fr" ? "Cabinet" : "Office"}
              </h3>
              <ul className="space-y-2.5">
                <li className="group">
                  <a 
                    href="#home" 
                    className={`text-sm transition-all duration-300 flex items-center gap-2 group-hover:translate-x-1 ${
                      isDark 
                        ? "text-slate-300/70 hover:text-cyan-300" 
                        : "text-slate-600/80 hover:text-cyan-600"
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                      isDark ? "bg-cyan-400" : "bg-cyan-500"
                    }`} />
                    {language === "fr" ? "Accueil" : "Home"}
                  </a>
                </li>
                <li className="group">
                  <a 
                    href="#services" 
                    className={`text-sm transition-all duration-300 flex items-center gap-2 group-hover:translate-x-1 ${
                      isDark 
                        ? "text-slate-300/70 hover:text-cyan-300" 
                        : "text-slate-600/80 hover:text-cyan-600"
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                      isDark ? "bg-cyan-400" : "bg-cyan-500"
                    }`} />
                    {language === "fr" ? "Services" : "Services"}
                  </a>
                </li>
                <li className="group">
                  <a 
                    href="#contact" 
                    className={`text-sm transition-all duration-300 flex items-center gap-2 group-hover:translate-x-1 ${
                      isDark 
                        ? "text-slate-300/70 hover:text-cyan-300" 
                        : "text-slate-600/80 hover:text-cyan-600"
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                      isDark ? "bg-cyan-400" : "bg-cyan-500"
                    }`} />
                    {language === "fr" ? "Contact" : "Contact"}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="space-y-4">
              <h3 className={`text-lg font-bold uppercase tracking-wider flex items-center gap-2 ${
                isDark ? "text-cyan-300" : "text-cyan-600"
              }`}>
                <span className={`w-1 h-6 bg-gradient-to-b rounded-full ${
                  isDark ? "from-cyan-400 to-blue-500" : "from-cyan-500 to-blue-600"
                }`} />
                {language === "fr" ? "Contact" : "Contact"}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 group">
                  <div className={`w-1 h-1 rounded-full mt-2 opacity-60 group-hover:opacity-100 transition-opacity ${
                    isDark ? "bg-cyan-400" : "bg-cyan-500"
                  }`} />
                  <div>
                    <p className={`text-xs uppercase tracking-wider mb-1 ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}>
                      {language === "fr" ? "Téléphone" : "Phone"}
                    </p>
                    <a 
                      href="tel:0535624287" 
                      className={`text-sm transition-colors font-medium ${
                        isDark 
                          ? "text-cyan-300 hover:text-cyan-200" 
                          : "text-cyan-600 hover:text-cyan-700"
                      }`}
                    >
                      05 35 62 42 87
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className={`w-1 h-1 rounded-full mt-2 opacity-60 group-hover:opacity-100 transition-opacity ${
                    isDark ? "bg-cyan-400" : "bg-cyan-500"
                  }`} />
                  <div>
                    <p className={`text-xs uppercase tracking-wider mb-1 ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}>
                      {language === "fr" ? "Email" : "Email"}
                    </p>
                    <a 
                      href="mailto:contact@benslimane.ma" 
                      className={`text-sm transition-colors font-medium break-all ${
                        isDark 
                          ? "text-cyan-300 hover:text-cyan-200" 
                          : "text-cyan-600 hover:text-cyan-700"
                      }`}
                    >
                      contact@benslimane.ma
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className={`w-1 h-1 rounded-full mt-2 opacity-60 group-hover:opacity-100 transition-opacity ${
                    isDark ? "bg-cyan-400" : "bg-cyan-500"
                  }`} />
                  <div>
                    <p className={`text-xs uppercase tracking-wider mb-1 ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}>
                      {language === "fr" ? "Horaires" : "Hours"}
                    </p>
                    <p className={`text-sm font-medium ${
                      isDark ? "text-slate-300/70" : "text-slate-600/80"
                    }`}>
                      {language === "fr" ? "Lun-Ven 9h-18h, Sam 9h-13h" : "Mon-Fri 9am-6pm, Sat 9am-1pm"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className={`w-1 h-1 rounded-full mt-2 opacity-60 group-hover:opacity-100 transition-opacity ${
                    isDark ? "bg-cyan-400" : "bg-cyan-500"
                  }`} />
                  <div>
                    <p className={`text-xs uppercase tracking-wider mb-1 ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}>
                      {language === "fr" ? "Adresse" : "Address"}
                    </p>
                    <p className={`text-xs sm:text-sm font-bold leading-relaxed ${
                      isDark 
                        ? "text-cyan-300" 
                        : "text-cyan-600"
                    }`}>
                      {language === "fr" 
                        ? "4ème Etage, sur la devanture du café Paul, N° 31 Ave Allal Ben Abdellah, Fes"
                        : "4th Floor, in front of Café Paul, No. 31 Ave Allal Ben Abdellah, Fes"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
