import { ASSETS } from '~/lib/constants'

export type FeatureSectionData = {
  id: string
  title: string
  text: string
  image?: string
  video?: string
  icon?: string
}

/** Autoplaying muted Mux embed (same role as project-overview loops). */
function muxPlayerUrl(playbackId: string) {
  return `https://player.mux.com/${playbackId}?autoplay=muted&loop=true&muted=true`
}

const MUX = {
  zoomPan: 'dRS3tqoa7MTYpvQW00k02VCKb3h02yvLKvRKPt5Ug6Htp00',
} as const

/** One section per holder feature (stacked like project-overview sections). */
export const featureSections: FeatureSectionData[] = [
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
