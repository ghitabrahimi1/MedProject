"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { translations, type Language } from "@/lib/i18n"
import { Calendar, Phone, Mail, User, Clock, MessageSquare, Stethoscope } from "lucide-react"

export default function Appointment() {
  const [language, setLanguage] = useState<Language>("fr")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    message: "",
  })

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

  const t = translations[language]

  const services = [
    { fr: "Soins préventifs", en: "Preventive Care" },
    { fr: "Dentisterie esthétique", en: "Aesthetic Dentistry" },
    { fr: "Dentisterie restauratrice", en: "Restorative Dentistry" },
    { fr: "Services pédiatriques", en: "Pediatric Services" },
    { fr: "Traitements d'urgence", en: "Emergency Treatments" },
    { fr: "Dentisterie spécialisée", en: "Specialized Dentistry" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmitted(true)
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      service: "",
      message: "",
    })
    setTimeout(() => setSubmitted(false), 3000)
    setIsSubmitting(false)
  }


  return (
    <>
      <section id="appointment" className="relative pt-8 sm:pt-10 md:pt-12 lg:pt-20 pb-12 sm:pb-16 md:pb-20 lg:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 text-center md:text-left animate-fade-up [animation-delay:.02s] mb-8 md:mb-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500/15 via-cyan-400/15 to-blue-500/15 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.48em] text-cyan-400 dark:text-cyan-200">
              Signature Concierge
            </span>
            <div className="inline-flex flex-col items-center md:items-start gap-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.7rem] font-semibold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-sky-700 to-slate-900 dark:from-white dark:via-cyan-200 dark:to-white drop-shadow-[0_18px_45px_rgba(56,189,248,0.18)]">
                {language === "fr" ? "Planifiez votre consultation personnalisée" : "Plan Your Personalized Consultation"}
              </h2>
              <span className="inline-block h-[3px] w-24 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-500 md:w-32" />
            </div>
          </div>

          {/* Form Section */}
          <div id="appointment-form" className="mt-6 md:mt-8 -mb-4 md:-mb-6 scroll-mt-10">
            <div className="relative rounded-[20px] sm:rounded-[24px] md:rounded-[30px] border border-white/20 bg-white/10 shadow-[0_35px_80px_rgba(15,118,230,0.22)] backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:border-cyan-200/60 animate-fade-up [animation-delay:.08s] font-[family:'Poppins',sans-serif]">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-[-120px] bg-[radial-gradient(circle_at_top,#38bdf8_0%,transparent_55%)] opacity-50 blur-3xl" />
                <div className="absolute inset-[-160px] bg-[radial-gradient(circle_at_bottom,#0ea5e9_0%,transparent_60%)] opacity-40 blur-3xl" />
              </div>
              <div className="relative border border-white/10 rounded-[20px] sm:rounded-[24px] md:rounded-[30px] bg-white/5 dark:bg-slate-900/40 backdrop-blur-2xl px-4 sm:px-6 md:px-10 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-14">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center gap-5 text-center text-slate-900 dark:text-white">
                    <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-cyan-400/20 shadow-[0_0_30px_rgba(56,189,248,0.45)] animate-fade-up [animation-delay:.1s]">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-cyan-400 to-blue-600 text-white text-3xl shadow-[0_0_22px_rgba(56,189,248,0.6)]">
                        ✓
                      </div>
                    </div>
                    <p className="text-2xl font-semibold animate-fade-up [animation-delay:.16s]">{t.appointment.success}</p>
                    <p className="max-w-md text-sm md:text-base text-slate-600/80 dark:text-slate-300/80 animate-fade-up [animation-delay:.22s]">
                      {language === "fr"
                        ? "Nous vous contacterons bientôt pour confirmer votre rendez-vous."
                        : "We will contact you soon to confirm your appointment."}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10 text-slate-800 dark:text-slate-100">
                    <div className="space-y-3 animate-fade-up [animation-delay:.1s]">
                      <p className="inline-flex items-center px-4 py-1 text-xs uppercase tracking-[0.35em] text-slate-900 dark:text-white border border-slate-900/80 dark:border-white/70 rounded-full">
                        Benslimane Dental
                      </p>
                      <h3 className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white tracking-tight">
                        <span className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-cyan-400 to-blue-600 text-white text-base sm:text-lg shadow-[0_12px_28px_rgba(56,189,248,0.35)]">
                          ✦
                        </span>
                        <span className="leading-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 dark:from-sky-400 dark:via-cyan-300 dark:to-blue-500">
                          {language === "fr" ? "Réservez votre expérience" : "Book Your Experience"}
                        </span>
                      </h3>
                      <p className="text-sm md:text-base text-slate-600/80 dark:text-slate-300/80">
                        {language === "fr"
                          ? "Chaque détail est pris en charge. Complétez ce formulaire et notre concierge vous recontactera."
                          : "Every detail counts. Complete this form and our concierge team will get back to you."}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="relative group animate-fade-up [animation-delay:.14s]">
                         <User className="pointer-events-none absolute left-4 sm:left-6 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-cyan-300 scale-110 drop-shadow-[0_0_12px_rgba(56,189,248,0.45)] transition-all duration-300" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          placeholder=" "
                          className="peer w-full rounded-[1rem] border-transparent bg-white/20 px-12 sm:px-14 py-3 sm:py-4 text-sm sm:text-base text-slate-900/90 shadow-[0_0_35px_rgba(56,189,248,0.45),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md outline-none transition-all duration-300 ring-2 sm:ring-4 ring-cyan-400/40 dark:bg-slate-900/40 dark:text-slate-100 dark:shadow-[0_0_35px_rgba(56,189,248,0.45),inset_0_1px_0_rgba(148,163,184,0.25)]"
                        />
                         <label
                           className={`pointer-events-none absolute left-12 sm:left-14 top-2 text-xs font-medium text-cyan-300 transition-all duration-300`}
                         >
                          {t.appointment.fullName}
                        </label>
                        <div className="pointer-events-none absolute inset-0 rounded-[1rem] border border-white/10 opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="relative group animate-fade-up [animation-delay:.18s]">
                        <Mail className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-300 scale-110 drop-shadow-[0_0_12px_rgba(56,189,248,0.45)] transition-all duration-300" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder=" "
                          className="peer w-full rounded-[1rem] border-transparent bg-white/20 px-12 sm:px-14 py-3 sm:py-4 text-sm sm:text-base text-slate-900/90 shadow-[0_0_35px_rgba(56,189,248,0.45),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md outline-none transition-all duration-300 ring-2 sm:ring-4 ring-cyan-400/40 dark:bg-slate-900/40 dark:text-slate-100 dark:shadow-[0_0_35px_rgba(56,189,248,0.45),inset_0_1px_0_rgba(148,163,184,0.25)]"
                        />
                         <label
                           className={`pointer-events-none absolute left-12 sm:left-14 top-2 text-xs font-medium text-cyan-300 transition-all duration-300`}
                         >
                          {t.appointment.email}
                        </label>
                        <div className="pointer-events-none absolute inset-0 rounded-[1rem] border border-white/10 opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="relative group animate-fade-up [animation-delay:.22s]">
                        <Phone className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-300 scale-110 drop-shadow-[0_0_12px_rgba(56,189,248,0.45)] transition-all duration-300" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder=" "
                          className="peer w-full rounded-[1rem] border-transparent bg-white/20 px-12 sm:px-14 py-3 sm:py-4 text-sm sm:text-base text-slate-900/90 shadow-[0_0_35px_rgba(56,189,248,0.45),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md outline-none transition-all duration-300 ring-2 sm:ring-4 ring-cyan-400/40 dark:bg-slate-900/40 dark:text-slate-100 dark:shadow-[0_0_35px_rgba(56,189,248,0.45),inset_0_1px_0_rgba(148,163,184,0.25)]"
                        />
                         <label
                           className={`pointer-events-none absolute left-12 sm:left-14 top-2 text-xs font-medium text-cyan-300 transition-all duration-300`}
                         >
                          {t.appointment.phone}
                        </label>
                        <div className="pointer-events-none absolute inset-0 rounded-[1rem] border border-white/10 opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="relative group animate-fade-up [animation-delay:.26s]">
                         <Stethoscope className="pointer-events-none absolute left-4 sm:left-6 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-cyan-300 scale-110 drop-shadow-[0_0_12px_rgba(56,189,248,0.45)] transition-all duration-300" />
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className="peer w-full appearance-none rounded-[1rem] border-transparent bg-white/20 px-12 sm:px-14 pt-6 sm:pt-7 pb-3 sm:pb-4 text-sm sm:text-base text-slate-900/90 shadow-[0_0_35px_rgba(56,189,248,0.45),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md outline-none transition-all duration-300 ring-2 sm:ring-4 ring-cyan-400/40 dark:bg-slate-900/40 dark:text-slate-100 dark:shadow-[0_0_35px_rgba(56,189,248,0.45),inset_0_1px_0_rgba(148,163,184,0.25)]"
                        >
                          <option value="" disabled>
                            {language === "fr" ? "Sélectionner un service" : "Select a service"}
                          </option>
                          {services.map((s, i) => (
                            <option key={i} value={language === "fr" ? s.fr : s.en}>
                              {language === "fr" ? s.fr : s.en}
                            </option>
                          ))}
                        </select>
                         <label
                           className={`pointer-events-none absolute left-12 sm:left-14 top-2 text-xs font-medium text-cyan-300 transition-all duration-300`}
                         >
                          {t.appointment.service}
                        </label>
                        <div className="pointer-events-none absolute inset-0 rounded-[1rem] border border-white/10 opacity-100 transition-opacity duration-300" />
                         <span className="pointer-events-none absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-cyan-300 text-lg sm:text-xl">
                           ▾
                         </span>
                      </div>

                      <div className="relative group animate-fade-up [animation-delay:.3s]">
                        <Calendar className="pointer-events-none absolute left-4 sm:left-6 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-cyan-300 scale-110 drop-shadow-[0_0_12px_rgba(56,189,248,0.45)] transition-all duration-300" />
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          placeholder=" "
                          className="peer w-full rounded-[1rem] border-transparent bg-white/20 px-12 sm:px-14 pt-6 sm:pt-7 pb-3 sm:pb-4 text-sm sm:text-base text-slate-900/90 shadow-[0_0_35px_rgba(56,189,248,0.45),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md outline-none transition-all duration-300 ring-2 sm:ring-4 ring-cyan-400/40 dark:bg-slate-900/40 dark:text-slate-100 dark:shadow-[0_0_35px_rgba(56,189,248,0.45),inset_0_1px_0_rgba(148,163,184,0.25)]"
                        />
                         <label
                           className={`pointer-events-none absolute left-12 sm:left-14 top-2 text-xs font-medium text-cyan-300 transition-all duration-300`}
                         >
                          {t.appointment.date}
                        </label>
                        <div className="pointer-events-none absolute inset-0 rounded-[1rem] border border-white/10 opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="relative group animate-fade-up [animation-delay:.34s]">
                        <Clock className="pointer-events-none absolute left-4 sm:left-6 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-cyan-300 scale-110 drop-shadow-[0_0_12px_rgba(56,189,248,0.45)] transition-all duration-300" />
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          placeholder=" "
                          className="peer w-full rounded-[1rem] border-transparent bg-white/20 px-12 sm:px-14 pt-6 sm:pt-7 pb-3 sm:pb-4 text-sm sm:text-base text-slate-900/90 shadow-[0_0_35px_rgba(56,189,248,0.45),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md outline-none transition-all duration-300 ring-2 sm:ring-4 ring-cyan-400/40 dark:bg-slate-900/40 dark:text-slate-100 dark:shadow-[0_0_35px_rgba(56,189,248,0.45),inset_0_1px_0_rgba(148,163,184,0.25)]"
                        />
                         <label
                           className={`pointer-events-none absolute left-12 sm:left-14 top-2 text-xs font-medium text-cyan-300 transition-all duration-300`}
                         >
                          {t.appointment.time}
                        </label>
                        <div className="pointer-events-none absolute inset-0 rounded-[1rem] border border-white/10 opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>

                    <div className="relative group animate-fade-up [animation-delay:.38s]">
                      <MessageSquare className="pointer-events-none absolute left-4 sm:left-6 top-5 sm:top-6 h-4 w-4 sm:h-5 sm:w-5 text-cyan-300 scale-110 drop-shadow-[0_0_12px_rgba(56,189,248,0.45)] transition-all duration-300" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder=" "
                        className="peer w-full resize-none rounded-[1rem] border-transparent bg-white/20 px-12 sm:px-14 py-4 sm:py-5 text-sm sm:text-base text-slate-900/90 shadow-[0_0_35px_rgba(56,189,248,0.45),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md outline-none transition-all duration-300 ring-2 sm:ring-4 ring-cyan-400/40 dark:bg-slate-900/40 dark:text-slate-100 dark:shadow-[0_0_35px_rgba(56,189,248,0.45),inset_0_1px_0_rgba(148,163,184,0.25)]"
                      />
                         <label
                           className={`pointer-events-none absolute left-12 sm:left-14 top-2 text-xs font-medium text-cyan-300 transition-all duration-300`}
                         >
                        {t.appointment.message}
                      </label>
                      <div className="pointer-events-none absolute inset-0 rounded-[1rem] border border-white/10 opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="animate-fade-up [animation-delay:.44s]">
                       <button
                         type="submit"
                         disabled={isSubmitting}
                         className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-[1rem] px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-[0_18px_40px_rgba(14,165,233,0.35)] transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-cyan-400/40 disabled:pointer-events-none disabled:opacity-60"
                       >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#1a9dff] via-[#00c8ff] to-[#2ff9ff] bg-[length:200%_200%] transition-all duration-500 group-hover:bg-[position:100%_50%]" />
                        <span className="relative flex items-center gap-3 tracking-wide">
                          <span className="h-2 w-2 rounded-full bg-white/80 shadow-[0_0_14px_rgba(255,255,255,0.85)] transition-opacity duration-500 group-hover:opacity-100" />
                          {isSubmitting ? (language === "fr" ? "Envoi..." : "Sending...") : t.appointment.submit}
                          <span className="h-2 w-2 rounded-full bg-white/80 shadow-[0_0_14px_rgba(255,255,255,0.85)] transition-opacity duration-500 group-hover:opacity-100" />
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
