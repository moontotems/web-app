import { useEffect } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'

import { ExampleCreaturesSection } from './ExampleCreaturesSection'
import { RoadmapSection } from './RoadmapSection'
import { SocialMediaSection } from './SocialMediaSection'
import { SplitSliderSection } from './SplitSliderSection'
import { TeamSection } from './TeamSection'
import { WhatAreSection } from './WhatAreSection'
import {
  lunarMonthsSlides,
  lunarOriginsSlides,
  lunarPhasesSlides,
  uniqueCharactersSlides,
  uniqueFeaturesSlides,
} from './slide-data'

/** Landing page, sections in the legacy order (desktop + mobile variants). */
export function HomePage() {
  const { isMobile, setHeaderTitle } = useMoonTotems()

  useEffect(() => {
    setHeaderTitle('')
  }, [setHeaderTitle])

  return (
    <div className="w-full bg-black font-['IBM_Plex_Sans',sans-serif]">
      <WhatAreSection />
      <SplitSliderSection
        introHint="Explore the attributes and traits that makes every Moon Totem unique"
        sliderSide="right"
        slides={uniqueCharactersSlides}
        title="Unique Characters"
      />
      <SplitSliderSection
        introHint="Explore the unique features exclusive to Moon Totem holders"
        sliderSide="left"
        slides={uniqueFeaturesSlides}
        title="Unique Features"
      />
      {!isMobile && <ExampleCreaturesSection slideDirectionLeft />}
      <RoadmapSection />
      <TeamSection />
      {isMobile && (
        <>
          <SplitSliderSection
            introHint="Explore the Lunar Phases"
            sliderSide="left"
            slides={lunarPhasesSlides}
            title="Lunar Phases"
          />
          <SplitSliderSection
            introHint="Explore the Lunar Months"
            sliderSide="left"
            slides={lunarMonthsSlides}
            title="Lunar Months"
          />
        </>
      )}
      <SplitSliderSection
        introHint="Explore the Lunar Origins"
        sliderSide="left"
        slides={lunarOriginsSlides}
        title="Lunar Origins"
      />
      <SocialMediaSection />
      <ExampleCreaturesSection slideDirectionLeft={!isMobile} />
    </div>
  )
}
