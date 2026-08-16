import { ASSETS } from '~/lib/constant'

export type LunarPhase = {
  image: string
  title: string
  description: string
}

export const LUNAR_PHASES: LunarPhase[] = [
  {
    image: ASSETS.lunarCalendar.phases.newMoon,
    title: 'New Moon',
    description: 'New Begging, Virgninal',
  },
  {
    image: ASSETS.lunarCalendar.phases.waxingCrescent,
    title: 'Waxing Crescent',
    description: 'Youth, Open',
  },
  {
    image: ASSETS.lunarCalendar.phases.firstQuarter,
    title: 'First Quarter',
    description:
      'Surrounded by three concentric rings of mountains, uplifted by the colossal impact event that excavated it.',
  },
  {
    image: ASSETS.lunarCalendar.phases.waxingGibbous,
    title: 'Waxing Gibbous',
    description: 'Exhuberance, excitement, fertile',
  },
  {
    image: ASSETS.lunarCalendar.phases.fullMoon,
    title: 'Full Moon',
    description: 'Pinnacle, peak, climax',
  },
  {
    image: ASSETS.lunarCalendar.phases.waningGibbous,
    title: 'Waning Gibbous',
    description: 'The Day after, Reflection',
  },
  {
    image: ASSETS.lunarCalendar.phases.lastQuarter,
    title: 'Last Quarter',
    description: 'Last Hurrah, Realization Dawning of the Mind',
  },
  {
    image: ASSETS.lunarCalendar.phases.waningCrescent,
    title: 'Waning Crescent',
    description: 'Old, Wise, Calm, Enlightenment',
  },
]
