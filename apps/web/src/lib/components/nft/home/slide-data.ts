export type HomeSlide = {
  index: number
  image?: string
  video?: string
  icon?: string
  title: string
  subtitle?: string
  text: string
}

import { CDN_BASE } from '~/lib/nft/constants'

const HEADER_CROPS_BASE = `${CDN_BASE}/website-assets/headercrops/`

const heroImageFiles = [
  'moontotems_g1_symbol_6k_330.jpg',
  'moontotems_g1_symbol_6k_332.jpg',
  'moontotems_g1_symbol_6k_367.jpg',
  'moontotems_g1_symbol_6k_391.jpg',
  'moontotems_g1_symbol_6k_440.jpg',
  'moontotems_g1_symbol_6k_479.jpg',
  'moontotems_g1_symbol_6k_576.jpg',
  'moontotems_g1_symbol_6k_577.jpg',
  'moontotems_g1_symbol_6k_688.jpg',
  'moontotems_g1_symbol_6k_809.jpg',
]

export const heroImages = heroImageFiles.map((file) => `${HEADER_CROPS_BASE}${file}`)

export const uniqueCharactersSlides: HomeSlide[] = [
  {
    index: 0,
    image: '/home/characteristics/moon_totem_4403.jpg',
    title: '',
    text: 'Each Moon Totem is a One-of-a-Kind, with unique attributes and traits.',
  },
  {
    index: 1,
    image: '/home/characteristics/moon_totem_name.jpg',
    title: 'Name & Title',
    text: 'Each Totem has a unique name, a title and personality traits.',
  },
  {
    index: 2,
    image: '/home/characteristics/moon_totems_eye.jpeg',
    title: 'Eyes',
    text: 'The eyes are the window to the soul. Totem eyes have different shapes and colors. They can be asymmetrical or even iridescent.',
  },
  {
    index: 3,
    image: '/home/characteristics/moon_totems_texture.jpeg',
    title: 'Texture',
    text: 'Totems have different textures. Some are smooth, some have embossed or perforated patterns.',
  },
  {
    index: 4,
    image: '/home/characteristics/moon_totems_symbol.jpeg',
    title: 'Symbol',
    text: 'Each Totem has a small set of symbols representing it’s Lunar Phase and Month.',
  },
  {
    index: 5,
    image: '/home/characteristics/moon_totems_child.jpeg',
    title: 'Child Totem',
    text: 'Each Totem has a small child Totem.',
  },
  {
    index: 6,
    image: '/home/characteristics/moon_totems_initials.jpeg',
    title: 'Origin Symbol & Initials',
    text: 'Each Totem has a symbol indicating it’s Lunar Origin with its initials.',
  },
]

export const uniqueFeaturesSlides: HomeSlide[] = [
  {
    index: 0,
    video:
      'https://player.vimeo.com/video/625932660?h=406816f119&badge=0&autoplay=1&loop=1&autopause=0&muted=1&player_id=0&app_id=58479',
    title: '',
    text: 'Moon Totems is a next generation NFT project that aims to expand the features and possibilities exclusive to holders.',
  },
  {
    index: 1,
    image: '/home/uniqueFeatures/moon_totems_chat.jpg',
    title: 'MOON TOTEM CHAT',
    text: 'Your Totem is an Oracle. You may consult it on matters large and small.',
  },
  {
    index: 2,
    image: '/home/uniqueFeatures/moon_totems_story.jpg',
    title: 'MOON TOTEM STORY',
    text: 'You will write the next chapter in your Totem’s story. Whenever a Totem is traded the story gets hard coded onto the blockchain, creating a “Story Chain”.',
  },
  {
    index: 3,
    image: '/home/uniqueFeatures/moon_totems_zoom_and_pan.jpg',
    title: 'TOTEM ZOOM',
    text: 'Only holders can fully experience the full high resolution detail.',
  },
  {
    index: 4,
    image: '/home/uniqueFeatures/moon_totems_downloads.jpg',
    title: 'MOON TOTEM DOWNLOADS',
    text: 'Holders have access to a multitude of unique assets for download: high resolution images, 3D files and more to come...',
  },
  {
    index: 5,
    image: '/home/uniqueFeatures/moon_totems_explorer.jpg',
    title: 'TOTEM EXPLORER',
    text: 'A super powered Totem Explorer allows holders to seach and filter based on any attribute.',
  },
  {
    index: 6,
    image: '/home/uniqueFeatures/moon_totems_community.jpg',
    title: 'MOON TOTEM SOCIETY',
    text: 'The fate and future of Moon Totems lie with the community. The next chapters will be written by the Community.',
  },
]

const LUNAR_ORIGIN_NAMES: Array<[string, string]> = [
  ['Sea of Rains', 'Mare Imbrium'],
  ['Sea of Fertility', 'Mare Fecunditatis'],
  ['Sea of Tranquility', 'Mare Tranquillitatis'],
  ['Sea of Clouds', 'Mare Nubium'],
  ['Sea of Islands', 'Mare Insularum'],
  ['Lake of Dreams', 'Lacus Somniorum'],
  ['Bay of Rainbows', 'Sinus Iridum'],
  ['Peninsula of Thunder', 'Peninsula Fulminum'],
  ['Bay of Harmony', 'Sinus Concordiae'],
  ['Bay of Success', 'Sinus Successus'],
  ['Bay of Love', 'Sinus Amoris'],
  ['Lake of Time', 'Lacus Temporis'],
]

export const lunarOriginsSlides: HomeSlide[] = [
  {
    index: 0,
    title: '',
    text: 'Moon Totems are believed to originate from the Moon.',
  },
  ...LUNAR_ORIGIN_NAMES.map(([title, subtitle], i) => ({
    index: i + 1,
    image: `/home/lunarOrigins/moonSectors/lunar_origin_${String(i + 1).padStart(5, '0')}.jpg`,
    icon: `/home/lunarOrigins/symbols/lunar_origin_symbol_${String(i + 1).padStart(4, '0')}.jpg`,
    title,
    subtitle,
    text: 'Moon Totems were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.',
  })),
]

export const lunarPhasesSlides: HomeSlide[] = [
  {
    index: 0,
    image: '/home/lunarPhases/512/02_waxing_crescent.jpg',
    title: '',
    text: 'Each Moon Totem is born under a particular Lunar Phase.',
  },
  {
    index: 1,
    image: '/home/lunarPhases/512/01_new_moon.jpg',
    title: 'New Moon',
    text: 'New Begging, Virgninal',
  },
  {
    index: 2,
    image: '/home/lunarPhases/512/02_waxing_crescent.jpg',
    title: 'Waxing Crescent',
    text: 'Youth, open',
  },
  {
    index: 3,
    image: '/home/lunarPhases/512/03_last_quarter.jpg',
    title: 'First Quarter',
    text: 'Surrounded by three concentric rings of mountains, uplifted by the colossal impact event that excavated it.',
  },
  {
    index: 4,
    image: '/home/lunarPhases/512/04_waxing_gibbous.jpg',
    title: 'Waxing Gibbous',
    text: 'Exhuberance, excitement, fertile',
  },
  {
    index: 5,
    image: '/home/lunarPhases/512/05_full_moon.jpg',
    title: 'Full Moon',
    text: 'Pinnacle, peak, climax',
  },
  {
    index: 6,
    image: '/home/lunarPhases/512/06_waning_gibbous.jpg',
    title: 'Waning Gibbous',
    text: 'The Day after, Reflection',
  },
  {
    index: 7,
    image: '/home/lunarPhases/512/07_last_quarter.jpg',
    title: 'Last Quarter',
    text: 'Last Hurrah, Realization Dawning of the Mind',
  },
  {
    index: 8,
    image: '/home/lunarPhases/512/08_waning_crescent.jpg',
    title: 'Waning Crescent',
    text: 'Old, Wise, Calm, Enlightenment',
  },
]

export const lunarMonthsSlides: HomeSlide[] = [
  {
    index: 0,
    image: '/home/lunarMonths/lunarMonths.gif',
    title: '',
    text: 'Each Moon Totem is born under a particular Lunar Month.',
  },
  {
    index: 1,
    image: '/home/lunarMonths/svg/01_ghost_moon.svg',
    title: 'Ghost Moon',
    text: 'Season of ancestry, remembering those who came before us, now living in our memories.',
  },
  {
    index: 2,
    image: '/home/lunarMonths/svg/02_snow_moon.svg',
    title: 'Snow Moon',
    text: 'Crystalize fluid situations',
  },
  {
    index: 3,
    image: '/home/lunarMonths/svg/03_crow_moon.svg',
    title: 'Crow Moon',
    text: 'Opportunists, harbringers, and observers',
  },
  {
    index: 4,
    image: '/home/lunarMonths/svg/04_fish_moon.svg',
    title: 'Fish Moon',
    text: 'Comfortable under pressure',
  },
  {
    index: 5,
    image: '/home/lunarMonths/svg/05_milk_moon.svg',
    title: 'Milk Moon',
    text: 'Fluid and maternal',
  },
  {
    index: 6,
    image: '/home/lunarMonths/svg/06_honey_moon.svg',
    title: 'Honey Moon',
    text: 'Collective effort',
  },
  {
    index: 7,
    image: '/home/lunarMonths/svg/07_thunder_moon.svg',
    title: 'Thunder Moon',
    text: 'Energetic, shocking',
  },
  {
    index: 8,
    image: '/home/lunarMonths/svg/08_buck_moon.svg',
    title: 'Buck Moon',
    text: 'Easily provoked, horny',
  },
  {
    index: 9,
    image: '/home/lunarMonths/svg/09_harvest_moon.svg',
    title: 'Harvest Moon',
    text: 'Abundant',
  },
  {
    index: 10,
    image: '/home/lunarMonths/svg/10_leaf_moon.svg',
    title: 'Leaf Moon',
    text: 'Traveller, nomadic',
  },
  {
    index: 11,
    image: '/home/lunarMonths/svg/11_blood_moon.svg',
    title: 'Blood Moon',
    text: 'Surrounded by three concentric rings of mountains, uplifted by the colossal impact event that excavated it.',
  },
  {
    index: 12,
    image: '/home/lunarMonths/svg/12_oak_moon.svg',
    title: 'Oak Moon',
    text: 'Static, stoic, stable, solid',
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
    image: '/home/roadmap/pictogram-agriculture.svg',
    title: '1. LAUNCH',
    text: 'Moon Totems are stealth released into the World. The Project is an experiment that encourages creativity and engagement.  ',
  },
  {
    index: 1,
    image: '/home/roadmap/pictogram-community-users.svg',
    title: '2. BUILD A COMMUNITY',
    text: 'Keepers of Totems form a community. The community is the foundation of the Project.',
  },
  {
    index: 2,
    image: '/home/roadmap/pictogram-deliverinsights.svg',
    title: '3. USER CREATION',
    text: 'Keepers begin the create Totem Stories and Engage with their Totem in the Totem Chat.',
  },
  {
    index: 3,
    image: '/home/roadmap/pictogram-social-work.svg',
    title: '3. SHARE',
    text: 'Tools and features that allow keepers to share their creations and experiences. ',
  },
  {
    index: 4,
    image: '/home/roadmap/pictogram-idea.svg',
    title: '4. IDEATE',
    text: 'Ideas will emerge from the community and the core team. The community will decide which ideas are most compelling for further development.',
  },
  {
    index: 5,
    image: '/home/roadmap/pictogram-build.svg',
    title: '5. BUILD NEXT CHAPTER',
    text: 'The Ideas and Creations will guide the next chapter of development. This can be a new generation, applying AI, connecting to a metaverse, etc etc...',
  },
]
