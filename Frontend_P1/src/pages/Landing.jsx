import React from 'react'
import Hero from '../components/landing_page/Hero'
import MandateSection from '../components/landing_page/MandateSection'
import AnalyzeSection from '../components/landing_page/AnalyzeSection'
import SimulateSection from '../components/landing_page/SimulateSection'
import AssessSection from '../components/landing_page/AssessSection'
import VerdictSection from '../components/landing_page/VerdictSection'

const Landing = () => {
  return (
    <main className='h-screen w-full cyber-scrollbar overflow-y-scroll snap-y snap-mandatory overflow-x-hidden scroll-smooth'>
      <Hero />
      <MandateSection />
      <AnalyzeSection />
      <SimulateSection />
      <AssessSection />
      <VerdictSection />
    </main>
  )
}

export default Landing