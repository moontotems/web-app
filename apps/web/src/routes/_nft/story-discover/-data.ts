import { LUNAR_MONTH_META, LUNAR_ORIGIN_META, LUNAR_PHASE_META } from '~/lib/constants'
import type { TokenMetaData } from '~/lib/nft/types'

/** Build a narrative paragraph from totem metadata fields. */
export function describeTotem(metaData: TokenMetaData): string {
  const name = `${metaData.trait_name1} ${metaData.trait_name2}`
  const title = `${metaData.trait_jobField} ${metaData.trait_jobTitle}`
  const personality = `${metaData.trait_personality1}, ${metaData.trait_personality2} & ${metaData.trait_personality3}`
  const birth = `${metaData.birthDay}/${metaData.birthMonth}/${metaData.birthYearStr}`
  const discovered = `${metaData.spawn_DateDay}/${metaData.spawn_DateMonth}/${metaData.spawn_DateYear}`
  const eyes = `${metaData.eyeAsymmetrical ? 'Asymmetrical' : 'Symmetrical'}, ${
    metaData.eyeMulticolor ? 'Multicolored' : 'Single Color'
  }, ${metaData.eyeShape}`

  return (
    `${name} is a ${title} from ${metaData.lunarOriginName}. ` +
    `They are ${personality}. ` +
    `Born ${birth} under a ${metaData.moonPhase} moon in the ${metaData.moonMonth} month, ` +
    `they are ${metaData.age} years old. ` +
    `Discovered ${discovered}. ` +
    `Eyes: ${eyes}. ` +
    `The material he is made of is ${String(metaData.Material).toLowerCase()}. ` +
    `Which consists out of ${metaData.complexityPieces} pieces and ${metaData.colorsTotal} colors.`
  )
}

export type LunarStoryImage = {
  src: string
  label: string
}

/** Flat row of lunar assets (origin photo, origin symbol, month, phase). */
export function getLunarStoryImages(metaData: TokenMetaData): LunarStoryImage[] {
  const origin = LUNAR_ORIGIN_META[String(metaData.lunarOriginName ?? '')]
  const month = LUNAR_MONTH_META[String(metaData.moonMonth ?? '')]
  const phase = LUNAR_PHASE_META[String(metaData.moonPhase ?? '')]
  const items: LunarStoryImage[] = []

  if (origin) {
    items.push({ src: origin.image, label: origin.label })
    if (origin.symbol) {
      items.push({ src: origin.symbol, label: `${origin.label} symbol` })
    }
  }
  if (month) items.push({ src: month.image, label: month.label })
  if (phase) items.push({ src: phase.image, label: phase.label })

  return items
}
