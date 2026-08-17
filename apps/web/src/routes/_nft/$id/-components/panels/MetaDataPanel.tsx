import { Info } from 'lucide-react'

import type { TokenMetaData } from '~/lib/nft/types'

import { FeaturePanel } from './FeaturePanel'

const MetaRow = ({
  label,
  value,
  valueClassName = 'text-lg',
}: {
  label: string
  value: React.ReactNode
  valueClassName?: string
}) => {
  return (
    <tr>
      <td className="pr-2.5 text-right align-top text-white/50">{label}</td>
      <td className={valueClassName}>{value}</td>
    </tr>
  )
}

// TOTEM INFO panel (legacy MoonTotem features/MetaData).
export const MetaDataPanel = ({ metaData }: { metaData: TokenMetaData }) => {
  const m = metaData

  return (
    <FeaturePanel icon={<Info className="size-4" strokeWidth={1.5} />} title="TOTEM INFO">
      <table className="w-auto text-left text-lg leading-[45px] text-white">
        <tbody>
          <MetaRow
            label="Name"
            value={`${m.trait_name1} ${m.trait_name2}`}
            valueClassName="text-3xl"
          />
          <MetaRow
            label="Title"
            value={
              <b>
                {m.trait_jobField} {m.trait_jobTitle}
              </b>
            }
          />
          <MetaRow label="From" value={<b>{m.lunarOriginName}</b>} />
          <MetaRow
            label="Personality"
            value={`${m.trait_personality1}, ${m.trait_personality2} & ${m.trait_personality3}`}
          />
          <MetaRow label="Lunar Phase" value={m.moonPhase} />
          <MetaRow label="Lunar Month" value={m.moonMonth} />
          <MetaRow label="Birth" value={`${m.birthDay}/${m.birthMonth}/${m.birthYearStr}`} />
          <MetaRow label="Age" value={`${m.age} Years`} />
          <MetaRow
            label="Discovered"
            value={`${m.spawn_DateDay}/${m.spawn_DateMonth}/${m.spawn_DateYear}`}
          />
          <MetaRow label="Rarity" value={m.rarityScore} />
          <MetaRow
            label="Eyes"
            value={`${m.eyeAsymmetrical ? 'Asymmetrical' : 'Symmetrical'}, ${
              m.eyeMulticolor ? 'Multicolored' : 'Single Color'
            }, ${m.eyeShape}`}
          />
          <MetaRow label="Material" value={m.Material} />
          <MetaRow label="Color Count" value={m.colorsTotal} />
          <MetaRow label="Pieces Count" value={m.complexityPieces} />
        </tbody>
      </table>
    </FeaturePanel>
  )
}
