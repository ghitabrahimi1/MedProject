"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { translations, type Language } from "@/lib/i18n"

export default function Team() {
  const [language, setLanguage] = useState<Language>("fr")

  useEffect(() => {
    const savedLang = (localStorage.getItem("language") || "fr") as Language
    setLanguage(savedLang)

    const handleStorageChange = () => {
      const newLang = (localStorage.getItem("language") || "fr") as Language
      setLanguage(newLang)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const team = [
    {
      name: "Dr. Ahmed Benslimane",
      role: { fr: "Chirurgien Dentiste", en: "Dental Surgeon" },
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/med6-7qOhCZ6tYmW3ihSES2lL0q5fJF7b2i.png",
    },
    {
      name: "Dr. Karim",
      role: { fr: "Implantologue", en: "Implantologist" },
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/med7-0PMFY2OhS0Ra5m7clVOJTsRbMaz1al.png",
    },
    {
      name: "Yasmine",
      role: { fr: "Assistante Dentaire", en: "Dental Assistant" },
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/med1-LJo5HtjC10shPRxRfQYmUGVpVa96mB.png",
    },
    {
      name: "Mohammed",
      role: { fr: "Hygiéniste Dentaire", en: "Dental Hygienist" },
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/med1-LJo5HtjC10shPRxRfQYmUGVpVa96mB.png",
    },
  ]

  const t = translations[language]

  return (
    <section id="team" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.team.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.team.subtitle}</p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-card border border-border"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-secondary font-semibold">
                  {language === "fr" ? member.role.fr : member.role.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
