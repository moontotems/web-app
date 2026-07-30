export type LunarPhase = {
  image: string
  title: string
  description: string
}

export const LUNAR_PHASES: LunarPhase[] = [
  {
    image: '/lunarCalendar/lunarPhases/new_moon.svg',
    title: 'New Moon',
    description: 'New Begging, Virgninal',
  },
  {
    image: '/lunarCalendar/lunarPhases/waxing_crescent.svg',
    title: 'Waxing Crescent',
    description: 'Youth, Open',
  },
  {
    image: '/lunarCalendar/lunarPhases/first_quarter.svg',
    title: 'First Quarter',
    description:
      'Surrounded by three concentric rings of mountains, uplifted by the colossal impact event that excavated it.',
  },
  {
    image: '/lunarCalendar/lunarPhases/waxing_gibbous.svg',
    title: 'Waxing Gibbous',
    description: 'Exhuberance, excitement, fertile',
  },
  {
    image: '/lunarCalendar/lunarPhases/full_moon.svg',
    title: 'Full Moon',
    description: 'Pinnacle, peak, climax',
  },
  {
    image: '/lunarCalendar/lunarPhases/waning_gibbous.svg',
    title: 'Waning Gibbous',
    description: 'The Day after, Reflection',
  },
  {
    image: '/lunarCalendar/lunarPhases/last_quarter.svg',
    title: 'Last Quarter',
    description: 'Last Hurrah, Realization Dawning of the Mind',
  },
  {
    image: '/lunarCalendar/lunarPhases/waning_crescent.svg',
    title: 'Waning Crescent',
    description: 'Old, Wise, Calm, Enlightenment',
  },
]
