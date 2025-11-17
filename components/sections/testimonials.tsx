"use client"

import { useState, useEffect } from "react"
import type { Language } from "@/lib/i18n"
import { Star, Quote } from "lucide-react"

export default function Testimonials() {
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

  const testimonials = [
    {
      name: { fr: "Sarah Benali", en: "Sarah Benali" },
      service: { fr: "Blanchiment dentaire", en: "Teeth Whitening" },
      rating: 5,
      text: {
        fr: "Une expérience exceptionnelle ! Le Dr Benslimane et son équipe sont d'une professionnalité remarquable. Mon sourire n'a jamais été aussi éclatant.",
        en: "An exceptional experience! Dr. Benslimane and his team are remarkably professional. My smile has never been so radiant."
      }
    },
    {
      name: { fr: "Ahmed Alami", en: "Ahmed Alami" },
      service: { fr: "Implant dentaire", en: "Dental Implant" },
      rating: 5,
      text: {
        fr: "Technologie de pointe et accompagnement personnalisé. L'implant s'est parfaitement intégré. Je recommande vivement ce centre.",
        en: "Cutting-edge technology and personalized care. The implant integrated perfectly. I highly recommend this center."
      }
    },
    {
      name: { fr: "Fatima Zahra", en: "Fatima Zahra" },
      service: { fr: "Soins pédiatriques", en: "Pediatric Care" },
      rating: 5,
      text: {
        fr: "Mon fils de 8 ans a été ravi de sa visite. L'équipe est patiente et rassurante. Un environnement adapté aux enfants.",
        en: "My 8-year-old son was delighted with his visit. The team is patient and reassuring. A child-friendly environment."
      }
    }
  ]

  return (
    <section id="testimonials" className="relative py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 overflow-hidden bg-transparent">
      {/* Fond avec effets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 animate-pulse ${
            isDark ? "bg-cyan-500" : "bg-cyan-300"
          }`}
        />
        <div 
          className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 animate-pulse ${
            isDark ? "bg-blue-500" : "bg-blue-300"
          }`}
          style={{ animationDelay: '2s' }}
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-3">
            <h2 
              className={`relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r px-2 ${
                isDark
                  ? "from-cyan-300 via-blue-300 to-cyan-300"
                  : "from-cyan-600 via-blue-600 to-cyan-600"
              }`}
            >
              {language === "fr" ? "Avis de nos patients" : "Patient Testimonials"}
            </h2>
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400" />
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>
          
          <p 
            className={`text-sm md:text-base font-medium max-w-2xl mx-auto ${
              isDark ? "text-slate-300/90" : "text-slate-600"
            }`}
          >
            {language === "fr" 
              ? "Découvrez les expériences de nos patients satisfaits" 
              : "Discover the experiences of our satisfied patients"}
          </p>
        </div>

        {/* Grille d'avis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative group rounded-[24px] border ${
                isDark
                  ? "border-cyan-500/30 bg-slate-900/40"
                  : "border-cyan-400/40 bg-white/20"
              } backdrop-blur-xl p-6 md:p-8 shadow-[0_20px_50px_rgba(15,118,230,0.15)] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(56,189,248,0.25)] hover:-translate-y-1 animate-fade-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Effet de lueur au survol */}
              <div className="absolute -inset-0.5 rounded-[24px] bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              
              {/* Icône de citation */}
              <div className="mb-4">
                <Quote className={`w-8 h-8 ${
                  isDark ? "text-cyan-400" : "text-cyan-600"
                } opacity-50`} />
              </div>

              {/* Étoiles */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-cyan-400 text-cyan-400"
                  />
                ))}
              </div>

              {/* Texte de l'avis */}
              <p className={`text-sm md:text-base leading-relaxed mb-6 ${
                isDark ? "text-slate-300/90" : "text-slate-700"
              }`}>
                {testimonial.text[language]}
              </p>

              {/* Informations du patient */}
              <div className="border-t pt-4 border-cyan-400/20">
                <p className={`font-semibold text-sm ${
                  isDark ? "text-cyan-300" : "text-cyan-600"
                }`}>
                  {testimonial.name[language]}
                </p>
                <p className={`text-xs mt-1 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}>
                  {testimonial.service[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

