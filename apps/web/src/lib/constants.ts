import { MOON_TOTEMS_ADDRESSES } from '@moontotems/contracts'

/**
 * Central catalog of Moon Totems image / file path names.
 * Public paths are site-root absolute (`/...`). CDN entries are path templates
 * under the Supabase public bucket (see `cdn.base`).
 */

const SUPABASE_CDN_BASE =
  'https://qjhckpovfxlhfuoducwr.supabase.co/storage/v1/object/public/moontotems' as const

const OWNER_ASSETS_BASE = `${SUPABASE_CDN_BASE}/totem-owner-assets` as const

export type TotemImageSize = 100 | 512 | 1024 | 2048 | '6k'

function totemJpeg(variant: 'base' | 'flat' | 'symbol', size: number | '6k', tokenId: number) {
  return `${SUPABASE_CDN_BASE}/totems/${variant}/jpeg/${size}/moontotems_g1_${variant}_${size}_${tokenId}.jpg`
}

function totemPng(variant: 'base' | 'symbol', size: number | '6k', tokenId: number) {
  return `${SUPABASE_CDN_BASE}/totems/${variant}/png/${size}/moontotems_g1_${variant}_${size}_${tokenId}.png`
}

function ownerJpeg(variant: 'base' | 'card' | 'flat' | 'symbol', size: number | '6k', tokenId: number) {
  return `${OWNER_ASSETS_BASE}/${variant}/jpeg/${size}/moontotems_g1_${variant}_${size}_${tokenId}.jpg`
}

function ownerPng(variant: 'base' | 'symbol', size: number | '6k', tokenId: number) {
  return `${OWNER_ASSETS_BASE}/${variant}/png/${size}/moontotems_g1_${variant}_${size}_${tokenId}.png`
}

export const ASSETS = {
  cdn: {
    base: SUPABASE_CDN_BASE,
    ownerAssetsBase: OWNER_ASSETS_BASE,
    totem: {
      base: {
        jpeg: {
          100: (tokenId: number) => totemJpeg('base', 100, tokenId),
          512: (tokenId: number) => totemJpeg('base', 512, tokenId),
          1024: (tokenId: number) => totemJpeg('base', 1024, tokenId),
          2048: (tokenId: number) => totemJpeg('base', 2048, tokenId),
          '6k': (tokenId: number) => totemJpeg('base', '6k', tokenId),
        },
        png: {
          2048: (tokenId: number) => totemPng('base', 2048, tokenId),
        },
      },
      flat: {
        jpeg: {
          100: (tokenId: number) => totemJpeg('flat', 100, tokenId),
          2048: (tokenId: number) => totemJpeg('flat', 2048, tokenId),
        },
      },
      symbol: {
        jpeg: {
          2048: (tokenId: number) => totemJpeg('symbol', 2048, tokenId),
          '6k': (tokenId: number) => totemJpeg('symbol', '6k', tokenId),
        },
        png: {
          2048: (tokenId: number) => totemPng('symbol', 2048, tokenId),
          // Filename on the bucket uses `base`, not `symbol`.
          '6k': (tokenId: number) =>
            `${SUPABASE_CDN_BASE}/totems/symbol/png/6k/moontotems_g1_base_6k_${tokenId}.png`,
        },
      },
      fileNames: {
        base: {
          jpeg: {
            100: (tokenId: number) => `moontotems_g1_base_100_${tokenId}.jpg`,
            512: (tokenId: number) => `moontotems_g1_base_512_${tokenId}.jpg`,
            1024: (tokenId: number) => `moontotems_g1_base_1024_${tokenId}.jpg`,
            2048: (tokenId: number) => `moontotems_g1_base_2048_${tokenId}.jpg`,
            '6k': (tokenId: number) => `moontotems_g1_base_6k_${tokenId}.jpg`,
          },
          png: {
            2048: (tokenId: number) => `moontotems_g1_base_2048_${tokenId}.png`,
          },
        },
        flat: {
          jpeg: {
            100: (tokenId: number) => `moontotems_g1_flat_100_${tokenId}.jpg`,
            2048: (tokenId: number) => `moontotems_g1_flat_2048_${tokenId}.jpg`,
          },
        },
        symbol: {
          jpeg: {
            2048: (tokenId: number) => `moontotems_g1_symbol_2048_${tokenId}.jpg`,
            '6k': (tokenId: number) => `moontotems_g1_symbol_6k_${tokenId}.jpg`,
          },
          png: {
            2048: (tokenId: number) => `moontotems_g1_symbol_2048_${tokenId}.png`,
            '6k': (tokenId: number) => `moontotems_g1_base_6k_${tokenId}.png`,
          },
        },
      },
    },
    owner: {
      base: {
        jpeg: {
          2048: (tokenId: number) => ownerJpeg('base', 2048, tokenId),
          '6k': (tokenId: number) => ownerJpeg('base', '6k', tokenId),
        },
        png: {
          2048: (tokenId: number) => ownerPng('base', 2048, tokenId),
        },
      },
      card: {
        jpeg: {
          2048: (tokenId: number) => ownerJpeg('card', 2048, tokenId),
        },
      },
      flat: {
        jpeg: {
          2048: (tokenId: number) => ownerJpeg('flat', 2048, tokenId),
        },
      },
      '3d': {
        abc: (tokenId: number) => `${OWNER_ASSETS_BASE}/3d/abc/moontotems_g1_3d_${tokenId}.abc`,
      },
      symbol: {
        jpeg: {
          2048: (tokenId: number) => ownerJpeg('symbol', 2048, tokenId),
          '6k': (tokenId: number) => ownerJpeg('symbol', '6k', tokenId),
        },
        png: {
          2048: (tokenId: number) => ownerPng('symbol', 2048, tokenId),
          '6k': (tokenId: number) => ownerPng('symbol', '6k', tokenId),
        },
      },
      fileNames: {
        base: {
          jpeg: {
            2048: (tokenId: number) => `moontotems_g1_base_2048_${tokenId}.jpg`,
            '6k': (tokenId: number) => `moontotems_g1_base_6k_${tokenId}.jpg`,
          },
          png: {
            2048: (tokenId: number) => `moontotems_g1_base_2048_${tokenId}.png`,
          },
        },
        card: {
          jpeg: {
            2048: (tokenId: number) => `moontotems_g1_card_2048_${tokenId}.jpg`,
          },
        },
        flat: {
          jpeg: {
            2048: (tokenId: number) => `moontotems_g1_flat_2048_${tokenId}.jpg`,
          },
        },
        '3d': {
          abc: (tokenId: number) => `moontotems_g1_3d_${tokenId}.abc`,
        },
        symbol: {
          jpeg: {
            2048: (tokenId: number) => `moontotems_g1_symbol_2048_${tokenId}.jpg`,
            '6k': (tokenId: number) => `moontotems_g1_symbol_6k_${tokenId}.jpg`,
          },
          png: {
            2048: (tokenId: number) => `moontotems_g1_symbol_2048_${tokenId}.png`,
            '6k': (tokenId: number) => `moontotems_g1_symbol_6k_${tokenId}.png`,
          },
        },
      },
    },
  },

  videos: {
    attributesGen01: 'https://player.mux.com/JCtoUYiOE1QKD3dR01ImYovGXcLhsr3S825hAAxEScws',
    cardflipFastMe: 'https://player.mux.com/KzNuhlYvjLh00HPbpVM1tmq00RfgivzBMNKNoSROo01ZJY',
    flightpaths: 'https://player.mux.com/bCMJXtdVAMFPkvT9Vg7YBIPIN1PS2VuKkTjZMEUMmGk',
    cardsSlowA: 'https://player.mux.com/1YKoZZxeBvUaib01c500vBlndfriJwu4F2sOD900vHJkWA',
    uniqueCharactersA: 'https://player.mux.com/ob4z00rrgb011NJWxAQ7YS7OFtmNQ5x6exZXGNVXVhw008',
    uniqueCharactersB: 'https://player.mux.com/MYZVV1MbTof9UcHYY025NWWyUupvXwJtahvO00tTwWq02Y',
    moonTurnCrop: 'https://player.mux.com/k72oWWTc02QesWLI5902KCrGR9afR7VlysLIzIaoV7tNg',
    moonTurn: 'https://player.mux.com/sPY02yB2cjU5iqpKHdtBIK02IwTQnKbYU4SVp6syVOoWA',
    screencapZoomSquare: 'https://player.mux.com/wGKUskssiWgOD6gzHz2tXDPaXFmmkEF6gVAtmW3jCKU',
    card3d: 'https://player.mux.com/cDwFVTFtgFu36vlELK4D23m4Ga84tucUojE01HwSoaXc',
    cardFlip: 'https://player.mux.com/00qGgYxCNqDFKm3WBvIh2cll01Xgdsz02ABdZWHX5Qdt00c',
    cardflipFull: 'https://player.mux.com/kPIGDzpPeHlwhzq01ntSjKC8WIOxWS8EIlrqcnI7QjWo',
    cardflipFull1: 'https://player.mux.com/pS3U8qS6z3px5aVoZi9FaIdA9DnVHl4NDnkeEKaXyjk',
    mainLoopV1: 'https://player.mux.com/Unte02CHHXWuU3hol01yGH5E02DfUpJ8laQ401rWtrV4AEI',
    outlineLoop: 'https://player.mux.com/63WXLce9dJmS00aYtkvFGq9TtT4LAhx019sCgbUeHZ5a00',
    zoomPan: 'https://player.mux.com/dRS3tqoa7MTYpvQW00k02VCKb3h02yvLKvRKPt5Ug6Htp00',
    blinkyRotate: 'https://player.mux.com/Emn8BXDIasx6LWZosN6BqS64D02H8XdZOP5Hsn19ZRs00',
    orbit3d: 'https://player.mux.com/MSrYUtd6YEGuHoNtUFqT1TeXSe8qqd1Idlu8p7WJPNg',
  },

  logos: {
    favicon: '/favicon.ico',
    svg: '/moon_totem_logo.svg',
    blackCircle: '/moon_totem_logo_black_circle.svg',
    blackSquare: '/moon_totem_logo_black_square.svg',
    png16: '/moon_totem_logo_16.png',
    png24: '/moon_totem_logo_24.png',
    png32: '/moon_totem_logo_32.png',
    png64: '/moon_totem_logo_64.png',
    png192: '/moon_totem_logo_192.png',
    png512: '/moon_totem_logo_512.png',
  },

  icons: {
    discord: '/icons/Logo-Discord.svg',
    etherscan: '/icons/Logo-Etherscan.svg',
    github: '/icons/Logo-Github.svg',
    instagram: '/icons/Logo-Instagram.svg',
    medium: '/icons/Logo-Medium.svg',
    opensea: '/icons/Logo-OpenSea.svg',
    twitter: '/icons/Logo-Twitter.svg',
  },

  auth: {
    background: '/auth.webp',
  },

  attributes: {
    hero: '/attributes/moon_totems_attributes.jpg',
    childMoons: '/attributes/moon_totems_attributes_child_moons.jpeg',
    complexity: '/attributes/moon_totems_attributes_complexity.jpg',
    eyes: '/attributes/moon_totems_attributes_eyes.jpg',
    materiality: '/attributes/moon_totems_attributes_materiality.jpg',
  },

  openAi: {
    page: '/open-ai/openai-page.avif',
    collectionPage: '/open-ai/collection-page.avif',
    profilePage: '/open-ai/profile-page.avif',
    zoomDetails: '/open-ai/zoom-details.avif',
    totemChat: '/open-ai/totem-chat.avif',
    generationGrid: '/open-ai/generation-grid.avif',
    houdiniNetwork: '/open-ai/houdini-network.avif',
  },

  originMap: '/moontotems_origin_map_full.jpg',

  home: {
    moonAreasCrop: '/home/moon_totems_moon_areas_crop.jpeg',
    originsEarthToMoon: '/home/moon_totems_origins_earth_to_moon.jpeg',
    icons: {
      discord: '/home/icons/Logo-Discord.svg',
      github: '/home/icons/Logo-Github.svg',
      instagram: '/home/icons/Logo-Instagram.svg',
      medium: '/home/icons/Logo-Medium.svg',
      twitter: '/home/icons/Logo-Twitter.svg',
    },
    characteristics: {
      eye: '/home/characteristics/moon_totems_eye.jpeg',
      texture: '/home/characteristics/moon_totems_texture.jpeg',
      symbol: '/home/characteristics/moon_totems_symbol.jpeg',
      child: '/home/characteristics/moon_totems_child.jpeg',
      initials: '/home/characteristics/moon_totems_initials.jpeg',
      name: '/home/characteristics/moon_totem_name.jpg',
      totem4403: '/home/characteristics/moon_totem_4403.jpg',
    },
    uniqueFeatures: {
      chat: '/home/uniqueFeatures/moon_totems_chat.jpg',
      story: '/home/uniqueFeatures/moon_totems_story.jpg',
      downloads: '/home/uniqueFeatures/moon_totems_downloads.jpg',
      explorer: '/home/uniqueFeatures/moon_totems_explorer.jpg',
      community: '/home/uniqueFeatures/moon_totems_community.jpg',
      zoomAndPan: '/home/uniqueFeatures/moon_totems_zoom_and_pan.jpg',
      icons: {
        chat: '/home/uniqueFeatures/icons/Icon-Chat.svg',
        community: '/home/uniqueFeatures/icons/Icon-Community.svg',
        creativeCommons: '/home/uniqueFeatures/icons/Icon-CreativeCommons.svg',
        download: '/home/uniqueFeatures/icons/Icon-Download.svg',
        edit: '/home/uniqueFeatures/icons/Icon-Edit.svg',
        zoom: '/home/uniqueFeatures/icons/Icon-Zoom.svg',
      },
    },
    roadmap: {
      agriculture: '/home/roadmap/pictogram-agriculture.svg',
      communityUsers: '/home/roadmap/pictogram-community-users.svg',
      deliverInsights: '/home/roadmap/pictogram-deliverinsights.svg',
      socialWork: '/home/roadmap/pictogram-social-work.svg',
      idea: '/home/roadmap/pictogram-idea.svg',
      build: '/home/roadmap/pictogram-build.svg',
    },
    lunarPhases: {
      gif: '/home/lunarPhases/lunarPhases.gif',
      // `01_new_moon` ... `08_waning_crescent`
      jpg512: (name: string) => `/home/lunarPhases/512/${name}.jpg`,
      jpg1080: (name: string) => `/home/lunarPhases/1080/${name}.jpg`,
      svg: (name: string) => `/home/lunarPhases/svg/${name}.svg`,
      names: [
        '01_new_moon',
        '02_waxing_crescent',
        '03_last_quarter',
        '04_waxing_gibbous',
        '05_full_moon',
        '06_waning_gibbous',
        '07_last_quarter',
        '08_waning_crescent',
      ] as const,
      names1080: [
        '01_new_moon',
        '02_waxing_crescent',
        '03_first_quarter',
        '04_waxing_gibbous',
        '05_full_moon',
        '06_waning_gibbous',
        '07_last_quarter',
        '08_waning_crescent',
      ] as const,
    },
    lunarMonths: {
      gif: '/home/lunarMonths/lunarMonths.gif',
      // `01_ghost_moon` ... `12_oak_moon`
      jpg512: (name: string) => `/home/lunarMonths/512/${name}.jpg`,
      jpg1080: (name: string) => `/home/lunarMonths/1080/${name}.jpg`,
      svg: (name: string) => `/home/lunarMonths/svg/${name}.svg`,
      names: [
        '01_ghost_moon',
        '02_snow_moon',
        '03_crow_moon',
        '04_fish_moon',
        '05_milk_moon',
        '06_honey_moon',
        '07_thunder_moon',
        '08_buck_moon',
        '09_harvest_moon',
        '10_leaf_moon',
        '11_blood_moon',
        '12_oak_moon',
      ] as const,
    },
    lunarOrigins: {
      // 1-based index → `lunar_origin_00001.jpg`
      sector: (index: number) =>
        `/home/lunarOrigins/moonSectors/lunar_origin_${String(index).padStart(5, '0')}.jpg`,
      // 1-based index → `lunar_origin_symbol_0001.jpg`
      symbol: (index: number) =>
        `/home/lunarOrigins/symbols/lunar_origin_symbol_${String(index).padStart(4, '0')}.jpg`,
      count: 18,
    },
  },

  lunarCalendar: {
    phases: {
      newMoon: '/lunarCalendar/lunarPhases/new_moon.svg',
      waxingCrescent: '/lunarCalendar/lunarPhases/waxing_crescent.svg',
      firstQuarter: '/lunarCalendar/lunarPhases/first_quarter.svg',
      waxingGibbous: '/lunarCalendar/lunarPhases/waxing_gibbous.svg',
      fullMoon: '/lunarCalendar/lunarPhases/full_moon.svg',
      waningGibbous: '/lunarCalendar/lunarPhases/waning_gibbous.svg',
      lastQuarter: '/lunarCalendar/lunarPhases/last_quarter.svg',
      waningCrescent: '/lunarCalendar/lunarPhases/waning_crescent.svg',
    },
  },

  lunarOrigins: {
    bayOfHarmony: {
      jpeg: '/lunarOrigins/bay_of_harmony.jpeg',
      svg: '/lunarOrigins/bay_of_harmony.svg',
    },
    bayOfLove: { jpeg: '/lunarOrigins/bay_of_love.jpeg', svg: '/lunarOrigins/bay_of_love.svg' },
    bayOfRainbows: {
      jpeg: '/lunarOrigins/bay_of_rainbows.jpeg',
      svg: '/lunarOrigins/bay_of_rainbows.svg',
    },
    bayOfSuccess: {
      jpeg: '/lunarOrigins/bay_of_success.jpeg',
      svg: '/lunarOrigins/bay_of_success.svg',
    },
    lakeOfDreams: {
      jpeg: '/lunarOrigins/lake_of_dreams.jpeg',
      svg: '/lunarOrigins/lake_of_dreams.svg',
    },
    lakeOfForgetfulness: {
      jpeg: '/lunarOrigins/lake_of_forgetfulness.jpeg',
      svg: '/lunarOrigins/lake_of_forgetfulness.svg',
    },
    lakeOfHappiness: {
      jpeg: '/lunarOrigins/lake_of_happiness.jpeg',
      svg: '/lunarOrigins/lake_of_happiness.svg',
    },
    lakeOfHope: { jpeg: '/lunarOrigins/lake_of_hope.jpeg', svg: '/lunarOrigins/lake_of_hope.svg' },
    lakeOfLuxury: {
      jpeg: '/lunarOrigins/lake_of_luxury.jpeg',
      svg: '/lunarOrigins/lake_of_luxury.svg',
    },
    lakeOfPerserverance: {
      jpeg: '/lunarOrigins/lake_of_perserverance.jpeg',
      svg: '/lunarOrigins/lake_of_perserverance.svg',
    },
    lakeOfSoftness: {
      jpeg: '/lunarOrigins/lake_of_softness.jpeg',
      svg: '/lunarOrigins/lake_of_softness.svg',
    },
    lakeOfTime: { jpeg: '/lunarOrigins/lake_of_time.jpeg', svg: '/lunarOrigins/lake_of_time.svg' },
    peninsulaOfThunder: {
      jpeg: '/lunarOrigins/peninsula_of_thunder.jpeg',
      svg: '/lunarOrigins/peninsula_of_thunder.svg',
    },
    seaOfClouds: {
      jpeg: '/lunarOrigins/sea_of_clouds.jpeg',
      svg: '/lunarOrigins/sea_of_clouds.svg',
    },
    seaOfFertility: {
      jpeg: '/lunarOrigins/sea_of_fertility.jpeg',
      svg: '/lunarOrigins/sea_of_fertility.svg',
    },
    seaOfIslands: {
      jpeg: '/lunarOrigins/sea_of_islands.jpeg',
      svg: '/lunarOrigins/sea_of_islands.svg',
    },
    seaOfRains: { jpeg: '/lunarOrigins/sea_of_rains.jpeg', svg: '/lunarOrigins/sea_of_rains.svg' },
    seaOfTranquility: {
      jpeg: '/lunarOrigins/sea_of_tranquility.jpeg',
      svg: '/lunarOrigins/sea_of_tranquility.svg',
    },
  },
} as const

// The full ASSETS catalog shape.
export type Assets = typeof ASSETS

// Recursively collect string leaf values (skips functions).
type StringLeaves<T> = T extends string
  ? T
  : T extends (...args: never[]) => unknown
    ? never
    : T extends readonly (infer U)[]
      ? StringLeaves<U>
      : T extends object
        ? { [K in keyof T]: StringLeaves<T[K]> }[keyof T]
        : never

// Any static path string stored in ASSETS (public `/...` paths and CDN base URLs).
export type AssetPath = StringLeaves<Assets>

// Alias for a single static asset path.
export type Asset = AssetPath

export const CDN_BASE = ASSETS.cdn.base

export const HEADER_HEIGHT = 40
export const FOOTER_HEIGHT = 40
export const SIDEBAR_WIDTH = 250
// Width of the header menu / “Show all” icon columns (and ActionSidebar narrow).
export const HEADER_ICON_WIDTH = 50

const MAINNET_CONTRACT = MOON_TOTEMS_ADDRESSES[1]

export const ETHERSCAN_BASE = 'https://etherscan.io'
export const OPENSEA_ASSET_BASE = `https://opensea.io/assets/${MAINNET_CONTRACT}`

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/moontotems',
  twitter: 'https://twitter.com/moontotemsnft',
  discord: 'https://discord.gg/73vMqt7k7H',
  github: 'https://github.com/moontotems',
  medium: 'https://medium.com/@moontotems',
  opensea: 'https://opensea.io/collection/moontotems',
  looksrare: `https://looksrare.org/collections/${MAINNET_CONTRACT}`,
  etherscan: `${ETHERSCAN_BASE}/address/${MAINNET_CONTRACT}`,
} as const

export const CONTACT_EMAIL = 'moontotems@gmail.com'
