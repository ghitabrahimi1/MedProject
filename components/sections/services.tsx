"use client"

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  type MouseEvent,
} from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import type { LucideIcon } from "lucide-react"
import { Sparkles, ShieldCheck, Baby, LifeBuoy, Layers, Microscope } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type ServiceCopy = {
  title: string
  subtitle: string
  description: string
  modalDescription: string[]
  highlights: string[]
  button: string
  galleryLabel: string
}

type ServiceConfig = {
  id: string
  image: string
  video?: string
  icon: LucideIcon
  accent: string
  halo: string
  copy: Record<"fr" | "en", ServiceCopy>
  gallery: string[]
}

type Language = "fr" | "en"

const HEXAGON_GRID =
  "data:image/svg+xml,%3Csvg width='200' height='173' viewBox='0 0 200 173' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='hex' width='200' height='173' patternUnits='userSpaceOnUse'%3E%3Cpath d='M50 1.5L0 30.5v58l50 29 50-29v-58L50 1.5z M150 1.5L100 30.5v58l50 29 50-29v-58L150 1.5z' fill='none' stroke='rgba(56,189,248,0.12)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='200' height='173' fill='url(%23hex)'/%3E%3C/svg%3E"

const servicesConfig: ServiceConfig[] = [
  {
    id: "preventive",
    image: "/soins_im.jpg",
    video: "/soins.mp4",
    icon: ShieldCheck,
    accent: "from-sky-500/22 via-emerald-400/18 to-blue-500/10",
    halo: "from-emerald-400/55 via-sky-400/40 to-transparent",
    copy: {
      fr: {
        title: "Soins préventifs sur mesure",
        subtitle: "Hygiène proactive, bilans digitaux.",
        description:
          "Protocoles prophylactiques, détartrage guidé et monitoring digital pour préserver l’équilibre bucco-dentaire chaque saison.",
        modalDescription: [
          "Nos bilans préventifs associent imagerie haute définition, analyse salivaire et coaching personnalisé pour détecter les signaux faibles avant qu’ils ne deviennent des urgences.",
          "Des plans de maintenance intelligents, adaptés à votre rythme de vie, allient gestes quotidiens optimisés et rendez-vous ciblés.",
        ],
        highlights: [
          "Cartographie bactérienne et analyse du microbiote buccal",
          "Détartrage guidé par ultrasons avec reminéralisation ciblée",
          "Programme digital de suivi avec rappels et conseils personnalisés",
        ],
        button: "En savoir plus",
        galleryLabel: "Routine préventive",
      },
      en: {
        title: "Tailored preventive care",
        subtitle: "Proactive hygiene, digital check-ups.",
        description:
          "Prophylaxis protocols, guided cleanings and digital monitoring to protect oral balance all year long.",
        modalDescription: [
          "Our preventive visits combine high-definition imaging, salivary analytics and personalised coaching to catch warning signs before they escalate.",
          "Smart maintenance plans adapt to your lifestyle with optimised routines and targeted appointments.",
        ],
        highlights: [
          "Bacterial mapping and oral microbiome assessment",
          "Ultrasound-guided scaling with targeted remineralisation",
          "Digital follow-up programme with reminders and tailored tips",
        ],
        button: "Learn more",
        galleryLabel: "Preventive routine",
      },
    },
    gallery: [
      "/soins_im.jpg",
      "/soins_in.jpg",
    ],
  },
  {
    id: "aesthetics",
    image: "/invisa.jpg",
    video: "/denti.mp4",
    icon: Sparkles,
    accent: "from-purple-500/25 via-fuchsia-400/18 to-sky-400/10",
    halo: "from-fuchsia-400/60 via-sky-400/45 to-transparent",
    copy: {
      fr: {
        title: "Dentisterie esthétique signature",
        subtitle: "Design du sourire, éclat sur mesure.",
        description:
          "Facettes digitales, alignement invisible et éclaircissement premium pour révéler un sourire harmonieux et naturel.",
        modalDescription: [
          "Nos architectes du sourire réalisent une analyse faciale 3D complète avant de modéliser votre futur sourire en mock-up digital.",
          "Des protocoles combinant aligners, blanchiment, injections esthétiques et facettes ultra fines créent un rendu durable et parfaitement intégré.",
        ],
        highlights: [
          "Smile design 3D et prévisualisation réaliste",
          "Facettes céramiques haute définition, ultra conservatrices",
          "Injections et soins de soutien pour sublimer le contour du sourire",
        ],
        button: "En savoir plus",
        galleryLabel: "Sourires sculptés",
      },
      en: {
        title: "Signature aesthetic dentistry",
        subtitle: "Smile design, bespoke radiance.",
        description:
          "Digital veneers, invisible alignment and premium whitening to reveal a harmonious, natural smile.",
        modalDescription: [
          "Our smile architects run a full 3D facial analysis before crafting a digital mock-up of your future smile.",
          "Combined protocols with aligners, whitening, aesthetic injectables and ultra-thin veneers deliver a lasting, seamlessly integrated result.",
        ],
        highlights: [
          "3D smile design with realistic preview",
          "High-definition ceramic veneers with minimally invasive prep",
          "Adjunct injectables to refine the perioral area",
        ],
        button: "Learn more",
        galleryLabel: "Sculpted smiles",
      },
    },
    gallery: ["/invisa.jpg", "/bagues.jpg"],
  },
  {
    id: "restorative",
    image: "/res.jpg",
    video: "/restau.mp4",
    icon: Layers,
    accent: "from-amber-500/24 via-sky-400/18 to-emerald-400/10",
    halo: "from-amber-400/55 via-sky-400/40 to-transparent",
    copy: {
      fr: {
        title: "Dentisterie restauratrice avancée",
        subtitle: "Reconstructions biomimétiques.",
        description:
          "Inlays, onlays, couronnes et implants sur-mesure fabriqués en CFAO pour redonner fonction et esthétique sans compromis.",
        modalDescription: [
          "Nos restaurations sont conçues à partir de scans intra-oraux et de modélisations CAD/CAM pour assurer un ajustage micronique.",
          "Biomatériaux de dernière génération, implants guidés et chirurgie micro-invasive accélèrent la cicatrisation et la longévité des traitements.",
        ],
        highlights: [
          "Empreintes numériques sans pâte ni inconfort",
          "Laboratoire CFAO intégré pour livrer en un temps record",
          "Implantologie guidée et prothèses biomimétiques",
        ],
        button: "En savoir plus",
        galleryLabel: "Reconstruction fonctionnelle",
      },
      en: {
        title: "Advanced restorative dentistry",
        subtitle: "Biomimetic reconstructions.",
        description:
          "Custom inlays, onlays, crowns and implants milled with CAD/CAM to restore function and aesthetics seamlessly.",
        modalDescription: [
          "Our restorations rely on intraoral scans and CAD/CAM modelling to achieve micron-level precision and perfect fit.",
          "Next-gen biomaterials, guided implantology and minimally invasive surgery accelerate healing and boost long-term success.",
        ],
        highlights: [
          "Digital impressions with zero discomfort",
          "In-house CAD/CAM lab for rapid delivery",
          "Guided implant placement and biomimetic prosthetics",
        ],
        button: "Learn more",
        galleryLabel: "Functional reconstruction",
      },
    },
    gallery: ["/res.jpg", "/souri.jpg"],
  },
  {
    id: "pediatric",
    image: "/fille.jpg",
    video: "/pedi.mp4",
    icon: Baby,
    accent: "from-cyan-400/22 via-sky-400/18 to-violet-400/12",
    halo: "from-cyan-400/60 via-violet-400/45 to-transparent",
    copy: {
      fr: {
        title: "Services pédiatriques doux",
        subtitle: "Habitudes saines, sourire serein.",
        description:
          "Accompagnement ludique, prévention des caries et orthodontie interceptive pour guider la croissance du sourire.",
        modalDescription: [
          "Nous transformons la visite chez le dentiste en expérience rassurante avec des outils visuels, du coaching parental et un langage adapté aux enfants.",
          "Suivi de croissance, scellants, traitements fluorés et planification des corrections précoces protègent et guident le sourire en développement.",
        ],
        highlights: [
          "Séances pédagogiques et kits d’hygiène personnalisés",
          "Orthodontie interceptive pour aligner la croissance",
          "Gestion des habitudes (succion, respiration buccale) en équipe pluridisciplinaire",
        ],
        button: "En savoir plus",
        galleryLabel: "Parcours enfants",
      },
      en: {
        title: "Gentle pediatric services",
        subtitle: "Healthy habits, confident smiles.",
        description:
          "Playful guidance, cavity prevention and interceptive ortho to steer smile development with ease.",
        modalDescription: [
          "We turn dental visits into reassuring adventures with visual tools, parent coaching and child-friendly communication.",
          "Growth tracking, sealants, fluoride therapy and early correction planning protect and guide developing smiles.",
        ],
        highlights: [
          "Educational sessions with personalised hygiene kits",
          "Interceptive orthodontics to align natural growth",
          "Habit management (thumb sucking, mouth breathing) with a multidisciplinary team",
        ],
        button: "Learn more",
        galleryLabel: "Kids track",
      },
    },
    gallery: ["/fille.jpg", "/garson.jpg"],
  },
  {
    id: "emergency",
    image: "/sousa.jpg",
    video: "/urgence.mp4",
    icon: LifeBuoy,
    accent: "from-rose-500/24 via-amber-400/16 to-sky-500/12",
    halo: "from-rose-400/60 via-amber-400/40 to-transparent",
    copy: {
      fr: {
        title: "Traitements d’urgence réactifs",
        subtitle: "Stabilisation rapide, confort maîtrisé.",
        description:
          "Gestion immédiate des douleurs, traumatismes et infections avec protocoles analgésiques et chirurgie mini-invasive.",
        modalDescription: [
          "Une cellule dédiée accueille les situations urgentes avec diagnostic numérique rapide, soulagement ciblé et planification du suivi.",
          "Nos chirurgiens et anesthésistes coordonnent les gestes de stabilisation puis la restauration esthétique ou fonctionnelle.",
        ],
        highlights: [
          "Hotline et créneaux réservés pour urgences quotidiennes",
          "Traitements analgésiques et sédation consciente sécurisée",
          "Réparation express des fractures, chocs et pertes dentaires",
        ],
        button: "En savoir plus",
        galleryLabel: "Réactivité & confort",
      },
      en: {
        title: "Responsive emergency care",
        subtitle: "Fast stabilisation, controlled comfort.",
        description:
          "Immediate management of pain, trauma and infections with analgesic protocols and minimally invasive surgery.",
        modalDescription: [
          "A dedicated emergency hub delivers rapid digital diagnosis, targeted relief and structured follow-up planning.",
          "Surgeons and anaesthetists coordinate stabilisation before cosmetic or functional restoration.",
        ],
        highlights: [
          "Hotline and reserved daily slots for urgent visits",
          "Analgesic therapies and safe conscious sedation",
          "Express repair for fractures, shocks and tooth avulsions",
        ],
        button: "Learn more",
        galleryLabel: "Speed & comfort",
      },
    },
    gallery: ["/sousa.jpg", "/casse.jpg"],
  },
  {
    id: "specialized",
    image: "/dentt.jpg",
    video: "/dentisa.mp4",
    icon: Microscope,
    accent: "from-indigo-500/24 via-sky-400/18 to-cyan-400/10",
    halo: "from-indigo-400/60 via-cyan-400/45 to-transparent",
    copy: {
      fr: {
        title: "Dentisterie spécialisée experte",
        subtitle: "Implantologie, endodontie, parodontie.",
        description:
          "Plateau technique complet pour les traitements complexes : micro-endodontie, greffes osseuses, chirurgie esthétique des gencives et orthodontie avancée.",
        modalDescription: [
          "Des spécialistes dédiés gèrent les cas les plus exigeants avec microscopes opératoires, navigation chirurgicale et planification 3D.",
          "Approche pluridisciplinaire pour coordonner implants, greffes, traitement des canaux radiculaires et alignement global.",
        ],
        highlights: [
          "Endodontie sous microscope et instrumentation ultrasons",
          "Chirurgie guidée par ordinateur et greffes tissulaires",
          "Orthodontie adulte complexe et réhabilitations complètes",
        ],
        button: "En savoir plus",
        galleryLabel: "Expertise ciblée",
      },
      en: {
        title: "Expert specialised dentistry",
        subtitle: "Implantology, endodontics, periodontics.",
        description:
          "Full technical platform for complex care: micro-endodontics, bone grafting, gingival aesthetics and advanced orthodontics.",
        modalDescription: [
          "Dedicated specialists handle demanding cases with operating microscopes, surgical navigation and 3D planning.",
          "A multidisciplinary approach aligns implants, grafts, root canal therapy and comprehensive orthodontics.",
        ],
        highlights: [
          "Microscope-assisted endodontics with ultrasonic instrumentation",
          "Computer-guided surgery with soft- and hard-tissue grafting",
          "Complex adult orthodontics and full-mouth rehabilitation",
        ],
        button: "Learn more",
        galleryLabel: "Focused expertise",
      },
    },
    gallery: ["/dentt.jpg", "/dentiss.jpg"],
  },
]

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const elementRef = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const target = elementRef.current
    if (!target) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
          }
        })
      },
      { threshold: 0.2, ...options },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [options])

  return { elementRef, inView }
}

export default function Services() {
  const [language, setLanguage] = useState<Language>("fr")
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem("language") || "fr"
    setLanguage(savedLang)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<string>
      setLanguage(customEvent.detail || "fr")
    }
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem("language") || "fr")
    }
    window.addEventListener("language-change", handleLanguageChange as EventListener)
    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("language-change", handleLanguageChange as EventListener)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [mounted])

  const accentText = isDark ? "text-sky-100/85" : "text-sky-700"
  const subtitleText = isDark ? "text-slate-200/80" : "text-slate-700/85"
  const headerBadgeText = isDark
    ? "from-sky-100 via-cyan-100 to-blue-200"
    : "from-sky-600 via-cyan-500 to-blue-600"
  const headerBadgeGlow = isDark
    ? "from-sky-500/30 via-cyan-400/20 to-blue-500/0"
    : "from-sky-400/35 via-cyan-300/25 to-blue-400/0"

  const copy = useMemo(
    () =>
      language === "en"
        ? {
            badge: "OUR SERVICE SELECTION",
            title: "High-tech protocols for elevated smile journeys",
            subtitle:
              "Preventive care, aesthetic and restorative dentistry, pediatric services, emergency treatments and specialised expertise combined for a premium, seamless dental experience.",
          }
        : {
            badge: "NOTRE SÉLECTION DE SERVICES",
            title: "Des protocoles haute technologie pour sublimer le sourire",
            subtitle:
              "Soins préventifs, dentisterie esthétique et restauratrice, services pédiatriques, traitements d’urgence et expertises spécialisées réunis pour une expérience dentaire premium et sur mesure.",
          },
    [language],
  )

  return (
    <section id="services" className="relative -mt-10 overflow-hidden py-16 md:-mt-16 md:py-24">
      <div className="absolute inset-0 -z-20" />
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-80 mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(56% 42% at 25% 20%, rgba(147, 197, 253, 0.35) 0%, rgba(147, 197, 253, 0.05) 65%, transparent 100%), radial-gradient(48% 38% at 70% 18%, rgba(56, 189, 248, 0.3) 0%, rgba(56, 189, 248, 0.06) 60%, transparent 100%), radial-gradient(60% 45% at 45% 88%, rgba(191, 219, 254, 0.32) 0%, rgba(191, 219, 254, 0.08) 60%, transparent 100%)",
          filter: "blur(2px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5">
            <span
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${headerBadgeGlow} blur-[1px] opacity-90`}
            />
            <span className="absolute inset-[2px] rounded-full border border-white/40 bg-white/55 backdrop-blur-xl dark:border-sky-300/25 dark:bg-slate-950/65" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.45)]" />
            <p
              className={`relative text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-transparent bg-clip-text bg-gradient-to-r ${headerBadgeText}`}
            >
              {copy.badge}
            </p>
            <span className="relative h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.45)]" />
          </div>
          <div className="mt-6 inline-flex flex-col items-center gap-3">
            <span className="h-[2px] w-16 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-transparent shadow-[0_0_18px_rgba(56,189,248,0.45)]" />
            <h2
              className={`text-center text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-balance ${
                isDark ? "text-white drop-shadow-[0_22px_45px_rgba(14,116,205,0.45)]" : "text-slate-900"
              }`}
            >
              <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                {copy.title}
              </span>
            </h2>
            <span className="h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent via-cyan-300 to-sky-500 shadow-[0_0_18px_rgba(56,189,248,0.35)]" />
          </div>
          <div className="mt-6 flex justify-center">
            <p
              className={`relative inline-block max-w-4xl rounded-2xl border border-sky-300/25 bg-white/12 px-6 py-4 text-sm md:text-lg leading-relaxed shadow-[0_18px_48px_-18px_rgba(56,189,248,0.45)] backdrop-blur-md ${subtitleText} dark:border-sky-300/20 dark:bg-slate-950/35`}
            >
              <span className="absolute -left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
              <span className="absolute -right-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
              {copy.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {servicesConfig.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              language={language}
              isDark={isDark}
              index={index}
              accentText={accentText}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

type ServiceCardProps = {
  service: ServiceConfig
  language: Language
  isDark: boolean
  index: number
  accentText: string
}

function ServiceCard({ service, language, isDark, index, accentText }: ServiceCardProps) {
  const { elementRef, inView } = useInView<HTMLDivElement>({ threshold: 0.35 })
  const cardRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<number>()
  const [tilt, setTilt] = useState("rotateX(0deg) rotateY(0deg)")
  const [hovering, setHovering] = useState(false)
  const [glow, setGlow] = useState(
    "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.28), transparent 60%)",
  )

  const Icon = service.icon
  const content = service.copy[language]

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }

      const rect = cardRef.current.getBoundingClientRect()
      const relativeX = event.clientX - rect.left
      const relativeY = event.clientY - rect.top

      frameRef.current = window.requestAnimationFrame(() => {
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((relativeY - centerY) / rect.height) * -9
        const rotateY = ((relativeX - centerX) / rect.width) * 10

        setTilt(
          `rotateX(${Math.max(Math.min(rotateX, 9), -9).toFixed(2)}deg) rotateY(${Math.max(Math.min(rotateY, 10), -10).toFixed(2)}deg)`,
        )

        const percentX = Math.min(Math.max((relativeX / rect.width) * 100, 0), 100).toFixed(2)
        const percentY = Math.min(Math.max((relativeY / rect.height) * 100, 0), 100).toFixed(2)
        setGlow(
          `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(59,130,246,0.38), transparent 62%)`,
        )
        setHovering(true)
      })
    },
    [],
  )

  const handleMouseLeave = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current)
    }
    setHovering(false)
    setTilt("rotateX(0deg) rotateY(0deg)")
    setGlow("radial-gradient(circle at 50% 50%, rgba(59,130,246,0.28), transparent 60%)")
  }, [])

  const assignRefs = useCallback(
    (node: HTMLDivElement | null) => {
      cardRef.current = node
      elementRef.current = node
    },
    [elementRef],
  )

  const buttonClasses =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.22em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"

  return (
    <Dialog>
      <div
        ref={assignRefs}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative h-full rounded-[28px] border border-sky-200/30 bg-white/70 shadow-[0_25px_65px_-25px_rgba(15,118,230,0.65)] backdrop-blur-xl transition-all duration-500 ease-out dark:border-sky-200/20 dark:bg-slate-900/55 ${
          inView ? "translate-y-0 opacity-100 blur-0" : "translate-y-12 opacity-0 blur-[3px]"
        }`}
        style={{
          transform: `perspective(1100px) ${tilt} scale(${hovering ? 1.015 : 1})`,
          transformStyle: "preserve-3d",
          transitionDelay: `${index * 90}ms`,
          transitionTimingFunction: hovering ? "ease-out" : "cubic-bezier(0.19, 1, 0.22, 1)",
        }}
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-[27px] bg-gradient-to-br from-white/95 via-white/80 to-transparent dark:from-slate-950/85 dark:via-slate-950/75 dark:to-slate-950/60">
          <div className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${service.accent}`} />
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ backgroundImage: glow }}
          />

          <div className="relative h-60 overflow-hidden">
            <div
              className={`pointer-events-none absolute -inset-16 opacity-60 blur-3xl transition-all duration-500 group-hover:opacity-90 bg-gradient-to-br ${service.halo}`}
            />
            {service.video ? (
              <video
                src={service.video}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={service.image}
              />
            ) : (
              <Image
                src={service.image}
                alt={content.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70 mix-blend-multiply" />
          </div>

          <div className="relative flex flex-1 flex-col justify-between p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 text-sky-600 shadow-[0_10px_25px_rgba(56,189,248,0.38)] transition-transform duration-500 group-hover:scale-110 dark:bg-slate-950/80 dark:text-sky-300">
                  <Icon className="h-5 w-5 animate-[pulse_3s_ease-in-out_infinite]" />
                  <div className="absolute inset-0 rounded-xl border border-white/50 dark:border-sky-300/30" />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold text-slate-900 dark:text-white`}>{content.title}</h3>
                  <p className={`text-xs uppercase tracking-[0.3em] ${accentText}`}>{content.subtitle}</p>
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? "text-slate-200/85" : "text-slate-600"}`}>
                {content.description}
              </p>
            </div>

            <DialogTrigger asChild>
              <button
                className={`${buttonClasses} bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 text-white shadow-[0_15px_35px_-20px_rgba(56,189,248,0.75)] hover:shadow-[0_20px_45px_-18px_rgba(56,189,248,0.8)] hover:translate-y-[-2px]`}
              >
                {content.button}
              </button>
            </DialogTrigger>
          </div>
        </div>
      </div>

      <DialogContent className="max-w-3xl border-sky-200/30 bg-white/95 text-slate-900 backdrop-blur-xl dark:border-sky-200/20 dark:bg-slate-950/95 dark:text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{content.title}</DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {content.modalDescription[0]}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-8 md:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-5">
            {content.modalDescription.slice(1).map((paragraph, idx) => (
              <p key={idx} className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {paragraph}
              </p>
            ))}
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {content.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.65)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              {content.galleryLabel}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {service.gallery.map((src, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border border-sky-200/30 bg-slate-100/60 shadow-sm dark:border-sky-200/20 dark:bg-slate-900/40"
                >
                  <Image
                    src={src}
                    alt={`${content.title} preview ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-300/10 to-slate-900/0 mix-blend-screen" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
