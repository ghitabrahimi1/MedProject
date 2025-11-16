"use client"

import { useState } from "react"
import LoadingScreen from "@/components/loading-screen"
import Navbar from "@/components/navbar"
import Home from "@/components/sections/home"
import Services from "@/components/sections/services"
import Appointment from "@/components/sections/appointment"
import Testimonials from "@/components/sections/testimonials"
import Footer from "@/components/footer"

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return <LoadingScreen onFinish={() => setIsLoading(false)} />
  }

  return (
    <main>
      <Navbar />
      <Home />
      <Services />
      <Appointment />
      <Testimonials />
      <Footer />
    </main>
  )
}
