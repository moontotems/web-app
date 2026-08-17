import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { useScrollToTop } from '~/lib/nft/use-scroll-to-top'

import { FeatureSection } from './-components/FeatureSection'

import { ASSETS } from '~/lib/constants'

type FeatureSectionData = {
  id: string
  title: string
  text: string
  image?: string
  video?: string
  icon?: string
}

// Autoplaying muted Mux embed (same role as project-overview loops).
function muxPlayerUrl(playbackId: string) {
  return `https://player.mux.com/${playbackId}?autoplay=muted&loop=true&muted=true`
}

const MUX = {
  zoomPan: 'dRS3tqoa7MTYpvQW00k02VCKb3h02yvLKvRKPt5Ug6Htp00',
} as const

// One section per holder feature (stacked like project-overview sections).
const FEATURE_SECTIONS: FeatureSectionData[] = [
  {
    id: 'chat',
    image: ASSETS.home.uniqueFeatures.chat,
    icon: ASSETS.home.uniqueFeatures.icons.chat,
    title: 'Moon Totem Chat',
    text: 'Your Totem is an Oracle. You may consult it on matters large and small.',
  },
  {
    id: 'story',
    image: ASSETS.home.uniqueFeatures.story,
    icon: ASSETS.home.uniqueFeatures.icons.edit,
    title: 'Moon Totem Story',
    text: 'You will write the next chapter in your Totem’s story. Whenever a Totem is traded the story gets hard coded onto the blockchain, creating a “Story Chain”.',
  },
  {
    id: 'zoom',
    video: muxPlayerUrl(MUX.zoomPan),
    icon: ASSETS.home.uniqueFeatures.icons.zoom,
    title: 'Totem Zoom',
    text: 'Only holders can fully experience the full high resolution detail.',
  },
  {
    id: 'downloads',
    image: ASSETS.home.uniqueFeatures.downloads,
    icon: ASSETS.home.uniqueFeatures.icons.download,
    title: 'Moon Totem Downloads',
    text: 'Holders have access to a multitude of unique assets for download: high resolution images, 3D files and more to come...',
  },
  {
    id: 'explorer',
    image: ASSETS.home.uniqueFeatures.explorer,
    title: 'Totem Explorer',
    text: 'A super powered Totem Explorer allows holders to seach and filter based on any attribute.',
  },
  {
    id: 'society',
    image: ASSETS.home.uniqueFeatures.community,
    icon: ASSETS.home.uniqueFeatures.icons.community,
    title: 'Moon Totem Society',
    text: 'The fate and future of Moon Totems lie with the community. The next chapters will be written by the Community.',
  },
]


// Dedicated Exclusive Features page: stacked split sections (project-overview style).
const FeaturesPage = () => {
  const { setHeaderTitle } = useMoonTotems()
  useScrollToTop()

  useEffect(() => {
    setHeaderTitle('')
  }, [setHeaderTitle])

  return (
    <div className="w-full bg-black font-['IBM_Plex_Sans',sans-serif]">
      <section className="w-full overflow-hidden bg-black md:min-h-screen">
        <div className="p-[25px] text-xl">Exclusive Features</div>
        <div className="flex flex-col md:flex-row">
          <div className="order-2 flex w-full flex-col justify-center p-[5%] md:order-1 md:min-h-screen md:w-1/2">
            <div className="text-[32px] pb-[5%] font-light leading-[40px] md:text-[55px] md:leading-[60px]">
              Tools and experiences exclusive to Moon Totem holders
            </div>
            <div className="w-full text-[23px] font-light leading-[34px] md:text-[27px] md:leading-[35px]">
              Moon Totems is a next generation NFT project that aims to expand the features and
              possibilities exclusive to holders.
            </div>
          </div>
          <div className="order-1 w-full md:order-2 md:w-1/2">
            <div className="relative w-full pt-[100%]">
              <iframe
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="pointer-events-none absolute top-0 left-0 h-full w-full border-0"
                src="https://player.mux.com/63WXLce9dJmS00aYtkvFGq9TtT4LAhx019sCgbUeHZ5a00?autoplay=muted&loop=true&muted=true"
                title="Exclusive Features"
              />
            </div>
          </div>
        </div>
      </section>

      {FEATURE_SECTIONS.map((section) => (
        <FeatureSection
          key={section.id}
          mediaSide={section.id === 'chat' ? 'left' : 'right'}
          section={section}
        />
      ))}
    </div>
  )
}

export const Route = createFileRoute('/_nft/features/')({
  component: FeaturesPage,
})
