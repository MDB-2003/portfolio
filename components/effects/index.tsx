import type { ReactNode } from 'react'
import { personal } from '@/data/portfolio'
import { IntroLoader } from '@/components/effects/intro-loader'
import { ScrollProgress } from '@/components/effects/scroll-progress'
import { CursorSpotlight } from '@/components/effects/cursor-spotlight'
import './effects.css'

/**
 * Master switch for the visual effects layer (intro loader, scroll progress,
 * cursor spotlight, hero scroll-out). Set to false to get the site back
 * exactly as it was before these effects were added.
 */
const EFFECTS_ENABLED = true

// Runs before first paint: marks the page as effects-enabled and skips the
// intro if it was already shown this session or the user prefers reduced motion.
const bootScript = `(function(){var d=document.documentElement;d.setAttribute('data-fx','');try{if(sessionStorage.getItem('fx-intro-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.setAttribute('data-intro-seen','')}catch(e){d.setAttribute('data-intro-seen','')}})()`

export function Effects({ children }: { children: ReactNode }) {
  if (!EFFECTS_ENABLED) return <>{children}</>

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      <ScrollProgress />
      <CursorSpotlight />
      <IntroLoader monogram={personal.monogram}>{children}</IntroLoader>
    </>
  )
}
