import { ASSETS } from '~/lib/constant'

export type HomeSlide = {
  index: number
  image?: string
  video?: string
  icon?: string
  title: string
  subtitle?: string
  text: string
}

/** Autoplaying muted Mux embed (same role as the old Vimeo loops). */
function muxPlayerUrl(playbackId: string) {
  return `https://player.mux.com/${playbackId}?autoplay=muted&loop=true&muted=true`
}

/** Playback IDs from the Mux library (Talismoon / Moon Totems uploads). */
const MUX = {
  blinkyRotate: 'Emn8BXDIasx6LWZosN6BqS64D02H8XdZOP5Hsn19ZRs00',
  outlineLoop: '63WXLce9dJmS00aYtkvFGq9TtT4LAhx019sCgbUeHZ5a00',
  card3d: 'cDwFVTFtgFu36vlELK4D23m4Ga84tucUojE01HwSoaXc',
  uniqueCharactersA: 'ob4z00rrgb011NJWxAQ7YS7OFtmNQ5x6exZXGNVXVhw008',
  zoomPan: 'dRS3tqoa7MTYpvQW00k02VCKb3h02yvLKvRKPt5Ug6Htp00',
  moonTurn: 'sPY02yB2cjU5iqpKHdtBIK02IwTQnKbYU4SVp6syVOoWA',
} as const

/** Hero loop — formerly Vimeo 620510465 / BLINKYROTATE. */
export const heroVideo = muxPlayerUrl(MUX.blinkyRotate)

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
    video: muxPlayerUrl(MUX.moonTurn),
    title: '',
    text: 'Moon Totems are believed to originate from the Moon.',
  },
  ...LUNAR_ORIGIN_NAMES.map(([title, subtitle], i) => ({
    index: i + 1,
    image: ASSETS.home.lunarOrigins.sector(i + 1),
    icon: ASSETS.home.lunarOrigins.symbol(i + 1),
    title,
    subtitle,
    text: 'Moon Totems were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.',
  })),
]

const PHASES = ASSETS.home.lunarPhases.names

export const lunarPhasesSlides: HomeSlide[] = [
  {
    index: 0,
    video: muxPlayerUrl(MUX.moonTurn),
    title: '',
    text: 'Each Moon Totem is born under a particular Lunar Phase.',
  },
  {
    index: 1,
    image: ASSETS.home.lunarPhases.jpg512(PHASES[0]),
    title: 'New Moon',
    text: 'New Begging, Virgninal',
  },
  {
    index: 2,
    image: ASSETS.home.lunarPhases.jpg512(PHASES[1]),
    title: 'Waxing Crescent',
    text: 'Youth, open',
  },
  {
    index: 3,
    image: ASSETS.home.lunarPhases.jpg512(PHASES[2]),
    title: 'First Quarter',
    text: 'Surrounded by three concentric rings of mountains, uplifted by the colossal impact event that excavated it.',
  },
  {
    index: 4,
    image: ASSETS.home.lunarPhases.jpg512(PHASES[3]),
    title: 'Waxing Gibbous',
    text: 'Exhuberance, excitement, fertile',
  },
  {
    index: 5,
    image: ASSETS.home.lunarPhases.jpg512(PHASES[4]),
    title: 'Full Moon',
    text: 'Pinnacle, peak, climax',
  },
  {
    index: 6,
    image: ASSETS.home.lunarPhases.jpg512(PHASES[5]),
    title: 'Waning Gibbous',
    text: 'The Day after, Reflection',
  },
  {
    index: 7,
    image: ASSETS.home.lunarPhases.jpg512(PHASES[6]),
    title: 'Last Quarter',
    text: 'Last Hurrah, Realization Dawning of the Mind',
  },
  {
    index: 8,
    image: ASSETS.home.lunarPhases.jpg512(PHASES[7]),
    title: 'Waning Crescent',
    text: 'Old, Wise, Calm, Enlightenment',
  },
]

const MONTHS = ASSETS.home.lunarMonths.names

export const lunarMonthsSlides: HomeSlide[] = [
  {
    index: 0,
    video: muxPlayerUrl(MUX.moonTurn),
    title: '',
    text: 'Each Moon Totem is born under a particular Lunar Month.',
  },
  {
    index: 1,
    image: ASSETS.home.lunarMonths.svg(MONTHS[0]),
    title: 'Ghost Moon',
    text: 'Season of ancestry, remembering those who came before us, now living in our memories.',
  },
  {
    index: 2,
    image: ASSETS.home.lunarMonths.svg(MONTHS[1]),
    title: 'Snow Moon',
    text: 'Crystalize fluid situations',
  },
  {
    index: 3,
    image: ASSETS.home.lunarMonths.svg(MONTHS[2]),
    title: 'Crow Moon',
    text: 'Opportunists, harbringers, and observers',
  },
  {
    index: 4,
    image: ASSETS.home.lunarMonths.svg(MONTHS[3]),
    title: 'Fish Moon',
    text: 'Comfortable under pressure',
  },
  {
    index: 5,
    image: ASSETS.home.lunarMonths.svg(MONTHS[4]),
    title: 'Milk Moon',
    text: 'Fluid and maternal',
  },
  {
    index: 6,
    image: ASSETS.home.lunarMonths.svg(MONTHS[5]),
    title: 'Honey Moon',
    text: 'Collective effort',
  },
  {
    index: 7,
    image: ASSETS.home.lunarMonths.svg(MONTHS[6]),
    title: 'Thunder Moon',
    text: 'Energetic, shocking',
  },
  {
    index: 8,
    image: ASSETS.home.lunarMonths.svg(MONTHS[7]),
    title: 'Buck Moon',
    text: 'Easily provoked, horny',
  },
  {
    index: 9,
    image: ASSETS.home.lunarMonths.svg(MONTHS[8]),
    title: 'Harvest Moon',
    text: 'Abundant',
  },
  {
    index: 10,
    image: ASSETS.home.lunarMonths.svg(MONTHS[9]),
    title: 'Leaf Moon',
    text: 'Traveller, nomadic',
  },
  {
    index: 11,
    image: ASSETS.home.lunarMonths.svg(MONTHS[10]),
    title: 'Blood Moon',
    text: 'Surrounded by three concentric rings of mountains, uplifted by the colossal impact event that excavated it.',
  },
  {
    index: 12,
    image: ASSETS.home.lunarMonths.svg(MONTHS[11]),
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
