import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { useScrollToTop } from '~/lib/nft/use-scroll-to-top'

import { FeatureSection } from './-components/FeatureSection'
import { featureSections } from './-data'

export const Route = createFileRoute('/_nft/features/')({
  component: FeaturesPage,
})

/** Dedicated Exclusive Features page: stacked split sections (project-overview style). */
function FeaturesPage() {
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

      {featureSections.map((section, index) => (
        <FeatureSection
          key={section.id}
          mediaSide={index % 2 === 0 ? 'left' : 'right'}
          section={section}
        />
      ))}
    </div>
  )
}
