import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { useScrollToTop } from '~/lib/nft/use-scroll-to-top'

import { ASSETS } from '~/lib/constants'

// Design panels for the OpenAI / web-app story (full assets, uncropped).
export const openAiImages = [
  { src: ASSETS.openAi.page, alt: 'Moon Totems Web App and OpenAI' },
  { src: ASSETS.openAi.houdiniNetwork, alt: 'Moon Totems Houdini network' },
  { src: ASSETS.openAi.collectionPage, alt: 'Moon Totems collection page' },
  { src: ASSETS.openAi.profilePage, alt: 'Moon Totems profile page' },
  { src: ASSETS.openAi.zoomDetails, alt: 'Moon Totems zoom details' },
  { src: ASSETS.openAi.totemChat, alt: 'Moon Totems Totem Chat' },
  { src: ASSETS.openAi.generationGrid, alt: 'Moon Totems generation grid' },
] as const

// OpenAI / web-app story: design panels shown full-width, as-is.
const OpenAiPage = () => {
  const { setHeaderTitle } = useMoonTotems()
  useScrollToTop()

  useEffect(() => {
    setHeaderTitle('')
  }, [setHeaderTitle])

  return (
    <div className="w-full bg-[#f4f4f4]">
      {openAiImages.map((image, index) => (
        <img
          alt={image.alt}
          className="h-auto w-full"
          key={image.src}
          loading={index === 0 ? 'eager' : 'lazy'}
          src={image.src}
        />
      ))}
    </div>
  )
}

export const Route = createFileRoute('/_nft/open-ai/')({
  component: OpenAiPage,
})
