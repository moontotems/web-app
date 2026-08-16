import { ASSETS } from '~/lib/constants'

import type { LunarItem } from '../-components/LunarItemGrid'

const MONTHS = ASSETS.home.lunarMonths.names

export const LUNAR_MONTHS: LunarItem[] = [
  {
    image: ASSETS.home.lunarMonths.jpg512(MONTHS[0]),
    title: 'Ghost Moon',
    description:
      'Season of ancestry, remembering those who came before us, now living in our memories.',
  },
  {
    image: ASSETS.home.lunarMonths.jpg512(MONTHS[1]),
    title: 'Snow Moon',
    description: 'Crystalize fluid situations',
  },
  {
    image: ASSETS.home.lunarMonths.jpg512(MONTHS[2]),
    title: 'Crow Moon',
    description: 'Opportunists, harbringers, and observers',
  },
  {
    image: ASSETS.home.lunarMonths.jpg512(MONTHS[3]),
    title: 'Fish Moon',
    description: 'Comfortable under pressure',
  },
  {
    image: ASSETS.home.lunarMonths.jpg512(MONTHS[4]),
    title: 'Milk Moon',
    description: 'Fluid and maternal',
  },
  {
    image: ASSETS.home.lunarMonths.jpg512(MONTHS[5]),
    title: 'Honey Moon',
    description: 'Collective effort',
  },
  {
    image: ASSETS.home.lunarMonths.jpg512(MONTHS[6]),
    title: 'Thunder Moon',
    description: 'Energetic, shocking',
  },
  {
    image: ASSETS.home.lunarMonths.jpg512(MONTHS[7]),
    title: 'Buck Moon',
    description: 'Easily provoked, horny',
  },
  {
    image: ASSETS.home.lunarMonths.jpg512(MONTHS[8]),
    title: 'Harvest Moon',
    description: 'Abundant',
  },
  {
    image: ASSETS.home.lunarMonths.jpg512(MONTHS[9]),
    title: 'Leaf Moon',
    description: 'Traveller, nomadic',
  },
  {
    image: ASSETS.home.lunarMonths.jpg512(MONTHS[10]),
    title: 'Blood Moon',
    description:
      'Surrounded by three concentric rings of mountains, uplifted by the colossal impact event that excavated it.',
  },
  {
    image: ASSETS.home.lunarMonths.jpg512(MONTHS[11]),
    title: 'Oak Moon',
    description: 'Static, stoic, stable, solid',
  },
]
