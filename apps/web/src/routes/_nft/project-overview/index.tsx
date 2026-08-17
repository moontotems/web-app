import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'

import { LunarItemGrid } from '../-components/LunarItemGrid'
import { LunarOriginsGrid } from '../lunar-origins/-components/LunarOriginsGrid'
import { LUNAR_MONTHS } from '../lunar-months/-data'
import { LUNAR_PHASES } from '../lunar-phases/-data'
import {
  EarthToMoonSection,
  ExampleMoonTotemsSection,
  RoadmapSection,
  SocialMediaSection,
  SplitSliderSection,
  TeamSection,
  WhatAreSection,
} from './-components'
import { uniqueCharactersSlider, uniqueFeaturesSlider } from './-data'

// Landing page: section order is desktop + mobile variants.
const ProjectOverviewPage = () => {
  const { isMobile, setHeaderTitle } = useMoonTotems()

  useEffect(() => {
    setHeaderTitle('')
  }, [setHeaderTitle])

  return (
    <>
      <WhatAreSection />
      <SplitSliderSection {...uniqueCharactersSlider} />
      <SplitSliderSection {...uniqueFeaturesSlider} />
      {!isMobile && <ExampleMoonTotemsSection slideDirectionLeft />}
      <RoadmapSection />
      <TeamSection />
      <LunarItemGrid
        intro="Each Moon Totem is born under a particular Lunar Phase."
        items={LUNAR_PHASES}
        title="Lunar Phases"
      />
      <LunarItemGrid
        intro="Each Moon Totem is born under a particular Lunar Month."
        items={LUNAR_MONTHS}
        title="Lunar Months"
      />
      <LunarOriginsGrid />
      <EarthToMoonSection />
      <SocialMediaSection />
      <ExampleMoonTotemsSection slideDirectionLeft />
    </>
  )
}

export const Route = createFileRoute('/_nft/project-overview/')({
  component: ProjectOverviewPage,
})
