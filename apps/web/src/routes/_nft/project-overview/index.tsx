import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { ASSETS } from '~/lib/constant'
import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'

import { ExampleCreaturesSection } from './-components/ExampleCreaturesSection'
import { RoadmapSection } from './-components/RoadmapSection'
import { SocialMediaSection } from './-components/SocialMediaSection'
import { SplitSliderSection } from './-components/SplitSliderSection'
import { TeamSection } from './-components/TeamSection'
import { WhatAreSection } from './-components/WhatAreSection'
import {
  lunarMonthsSlides,
  lunarOriginsSlides,
  lunarPhasesSlides,
  uniqueCharactersSlides,
  uniqueFeaturesSlides,
} from './-data'

export const Route = createFileRoute('/_nft/project-overview/')({
  component: ProjectOverviewPage,
})

/** Landing page, sections in the legacy order (desktop + mobile variants). */
function ProjectOverviewPage() {
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

      <section className="w-full bg-black">
        <img
          alt="Moon Totems traveling from Earth to the Moon"
          className="block w-full"
          src={ASSETS.home.originsEarthToMoon}
        />
      </section>
    </div>
  )
}
