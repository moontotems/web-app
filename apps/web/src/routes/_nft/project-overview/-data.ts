import { ASSETS, SOCIAL_LINKS } from '~/lib/constants'
import { getImageUrl } from '~/lib/nft/image-url'

export type HomeSlide = {
  index: number
  image?: string
  video?: string
  icon?: string
  title: string
  subtitle?: string
  text: string
}

export type SplitSliderConfig = {
  title: string
  introHint: string
  sliderSide: 'left' | 'right'
  slides: HomeSlide[]
}

/** Autoplaying muted Mux embed (same role as the old Vimeo loops). */
function muxPlayerUrl(playbackId: string) {
  return `https://player.mux.com/${playbackId}?autoplay=muted&loop=true&muted=true`
}

/** Playback IDs from the Mux library (Talismoon / Moon Totems uploads). */
const MUX = {
  outlineLoop: '63WXLce9dJmS00aYtkvFGq9TtT4LAhx019sCgbUeHZ5a00',
  card3d: 'cDwFVTFtgFu36vlELK4D23m4Ga84tucUojE01HwSoaXc',
  uniqueCharactersA: 'ob4z00rrgb011NJWxAQ7YS7OFtmNQ5x6exZXGNVXVhw008',
  zoomPan: 'dRS3tqoa7MTYpvQW00k02VCKb3h02yvLKvRKPt5Ug6Htp00',
  moonTurn: 'sPY02yB2cjU5iqpKHdtBIK02IwTQnKbYU4SVp6syVOoWA',
} as const

/** Turning moon loop used on lunar origins / phases / months slides. */
export const moonTurnVideo = muxPlayerUrl(MUX.moonTurn)

export const uniqueCharactersSlides: HomeSlide[] = [
  {
    index: 0,
    video: muxPlayerUrl(MUX.uniqueCharactersA),
    title: '',
    text: 'Each Moon Totem is a One-of-a-Kind, with unique attributes and traits.',
  },
  {
    index: 1,
    video: muxPlayerUrl(MUX.card3d),
    title: 'Name & Title',
    text: 'Each Totem has a unique name, a title and personality traits.',
  },
  {
    index: 2,
    image: ASSETS.home.characteristics.eye,
    title: 'Eyes',
    text: 'The eyes are the window to the soul. Totem eyes have different shapes and colors. They can be asymmetrical or even iridescent.',
  },
  {
    index: 3,
    image: ASSETS.home.characteristics.texture,
    title: 'Texture',
    text: 'Totems have different textures. Some are smooth, some have embossed or perforated patterns.',
  },
  {
    index: 4,
    image: ASSETS.home.characteristics.symbol,
    title: 'Symbol',
    text: 'Each Totem has a small set of symbols representing it’s Lunar Phase and Month.',
  },
  {
    index: 5,
    image: ASSETS.home.characteristics.child,
    title: 'Child Totem',
    text: 'Each Totem has a small child Totem.',
  },
  {
    index: 6,
    image: ASSETS.home.characteristics.initials,
    title: 'Origin Symbol & Initials',
    text: 'Each Totem has a symbol indicating it’s Lunar Origin with its initials.',
  },
]

export const uniqueFeaturesSlides: HomeSlide[] = [
  {
    index: 0,
    video: muxPlayerUrl(MUX.outlineLoop),
    title: '',
    text: 'Moon Totems is a next generation NFT project that aims to expand the features and possibilities exclusive to holders.',
  },
  {
    index: 1,
    image: ASSETS.home.uniqueFeatures.chat,
    title: 'MOON TOTEM CHAT',
    text: 'Your Totem is an Oracle. You may consult it on matters large and small.',
  },
  {
    index: 2,
    image: ASSETS.home.uniqueFeatures.story,
    title: 'MOON TOTEM STORY',
    text: 'You will write the next chapter in your Totem’s story. Whenever a Totem is traded the story gets hard coded onto the blockchain, creating a “Story Chain”.',
  },
  {
    index: 3,
    video: muxPlayerUrl(MUX.zoomPan),
    title: 'TOTEM ZOOM',
    text: 'Only holders can fully experience the full high resolution detail.',
  },
  {
    index: 4,
    image: ASSETS.home.uniqueFeatures.downloads,
    title: 'MOON TOTEM DOWNLOADS',
    text: 'Holders have access to a multitude of unique assets for download: high resolution images, 3D files and more to come...',
  },
  {
    index: 5,
    image: ASSETS.home.uniqueFeatures.explorer,
    title: 'TOTEM EXPLORER',
    text: 'A super powered Totem Explorer allows holders to seach and filter based on any attribute.',
  },
  {
    index: 6,
    image: ASSETS.home.uniqueFeatures.community,
    title: 'MOON TOTEM SOCIETY',
    text: 'The fate and future of Moon Totems lie with the community. The next chapters will be written by the Community.',
  },
]

export type RoadmapItem = {
  index: number
  image: string
  title: string
  text: string
}

export const roadmapItems: RoadmapItem[] = [
  {
    index: 0,
    image: ASSETS.home.roadmap.agriculture,
    title: '1. LAUNCH',
    text: 'Moon Totems are stealth released into the World. The Project is an experiment that encourages creativity and engagement.  ',
  },
  {
    index: 1,
    image: ASSETS.home.roadmap.communityUsers,
    title: '2. BUILD A COMMUNITY',
    text: 'Keepers of Totems form a community. The community is the foundation of the Project.',
  },
  {
    index: 2,
    image: ASSETS.home.roadmap.deliverInsights,
    title: '3. USER CREATION',
    text: 'Keepers begin the create Totem Stories and Engage with their Totem in the Totem Chat.',
  },
  {
    index: 3,
    image: ASSETS.home.roadmap.socialWork,
    title: '3. SHARE',
    text: 'Tools and features that allow keepers to share their creations and experiences. ',
  },
  {
    index: 4,
    image: ASSETS.home.roadmap.idea,
    title: '4. IDEATE',
    text: 'Ideas will emerge from the community and the core team. The community will decide which ideas are most compelling for further development.',
  },
  {
    index: 5,
    image: ASSETS.home.roadmap.build,
    title: '5. BUILD NEXT CHAPTER',
    text: 'The Ideas and Creations will guide the next chapter of development. This can be a new generation, applying AI, connecting to a metaverse, etc etc...',
  },
]

export const uniqueCharactersSlider: SplitSliderConfig = {
  title: 'Unique Characters',
  introHint: 'Explore the attributes and traits that makes every Moon Totem unique',
  sliderSide: 'right',
  slides: uniqueCharactersSlides,
}

export const uniqueFeaturesSlider: SplitSliderConfig = {
  title: 'Unique Features',
  introHint: 'Explore the unique features exclusive to Moon Totem holders',
  sliderSide: 'left',
  slides: uniqueFeaturesSlides,
}

export const teamMembers = [
  {
    image: getImageUrl({ tokenId: 475, size: 2048 }),
    name: 'Gittan Clouds',
    role: 'Ethereal Developer',
    link: SOCIAL_LINKS.github,
    icon: ASSETS.home.icons.github,
    iconAlt: 'Moon Totems Github',
  },
  {
    image: getImageUrl({ tokenId: 8996, size: 2048 }),
    name: 'Flotsam Theamy',
    role: 'Creative Medium',
    link: SOCIAL_LINKS.instagram,
    icon: ASSETS.home.icons.instagram,
    iconAlt: 'Moon Totems Instagram',
  },
] as const

export const socialChannels = [
  {
    name: 'Instagram',
    href: SOCIAL_LINKS.instagram,
    text: 'For visual stories and explorations into the art.',
    icon: ASSETS.home.icons.instagram,
  },
  {
    name: 'Twitter',
    href: SOCIAL_LINKS.twitter,
    text: 'For the latest announcements and updates.',
    icon: ASSETS.home.icons.twitter,
  },
  {
    name: 'Discord',
    href: SOCIAL_LINKS.discord,
    text: 'For connecting with the Moon Totem Community.',
    icon: ASSETS.home.icons.discord,
  },
  {
    name: 'Github',
    href: SOCIAL_LINKS.github,
    text: 'For insights into the technology behind the project.',
    icon: ASSETS.home.icons.github,
  },
] as const
