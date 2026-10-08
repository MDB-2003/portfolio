import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Education } from '@/components/education'
import { Skills } from '@/components/skills'
import { Philosophy } from '@/components/philosophy'
import { Projects } from '@/components/projects'
import { Learning } from '@/components/learning'
import { Certifications } from '@/components/certifications'
import { Achievements } from '@/components/achievements'
import { Hobbies } from '@/components/hobbies'
import { ResumeSection } from '@/components/resume-section'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Philosophy />
      <Projects />
      <Learning />
      <Certifications />
      <Achievements />
      <Hobbies />
      <ResumeSection />
      <Contact />
      <SiteFooter />
    </main>
  )
}
