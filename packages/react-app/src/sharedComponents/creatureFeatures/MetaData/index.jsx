import React from 'react'

import { Information16, Information32 } from '@carbon/icons-react'
import CreatureFeatureContainer from '../../CreatureFeatureContainer'

export default function MetaData({
  ethereumProps,
  nftAppProps,
  creatureMetadata: {
    age,
    ageRank,
    AgeScore,
    birthDay,
    birthMonth,
    birthYear,
    birthYearStr,
    Child_Id,
    Child_trait_name1,
    Child_trait_name2,
    color1_B,
    color1_G,
    color1_R,
    color2_B,
    color2_G,
    color2_R,
    color3_B,
    color3_G,
    color3_R,
    colorRank,
    colorScore,
    colorsTotal,
    complexityRank,
    complexityMax,
    complexityPieces,
    complexityScore,
    eyeAsymmetrical,
    eyeColor1_B,
    eyeColor1_G,
    eyeColor1_R,
    eyeColor2_B,
    eyeColor2_G,
    eyeColor2_R,
    eyeRank,
    eyeMulticolor,
    eyeScore,
    eyeShape,
    eyeShapeId,
    Generation,
    holesBlobby,
    holesCut,
    id,
    index,
    lunarOriginBatchId,
    lunarOriginId,
    lunarOriginName,
    lunarOriginNameLatin,
    lunarOriginQuantity,
    lunarOriginScore,
    match,
    Material,
    MaterialId,
    materialScore,
    mat_patterBumpName,
    mat_patternBump,
    mat_patternPerf,
    mat_patterPerfName,
    moonMonth,
    moonMonthId,
    moonMonthScore,
    moonPhase,
    moonPhaseId,
    moonPhaseScore,
    Parent_Id,
    Parent_trait_name1,
    Parent_trait_name2,
    rarityRank,
    rarityScore,
    spawn_DateDay,
    spawn_DateMonth,
    spawn_DateYear,
    spawn_Hour,
    total,
    trait_jobField,
    trait_jobFieldScore,
    trait_jobTitle,
    trait_jobTitleScore,
    trait_name1,
    trait_name2,
    trait_personality1,
    trait_personality2,
    trait_personality3
  }
}) {
  const { isMobile } = nftAppProps
  return (
    <CreatureFeatureContainer
      ethereumProps={ethereumProps}
      nftAppProps={nftAppProps}
      containerId={'creatureMetaData'}
      icon={isMobile ? <Information32 /> : <Information16 />}
      title={'TOTEM INFO'}
    >
      <table
        style={{
          float: 'left',
          width: isMobile ? '100%' : 'auto',
          fontSize: '18px',
          lineHeight: '45px',
          textAlign: 'left',
          color: '#fff'
        }}
      >
        <tr>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <td
            align='right'
            style={{ paddingRight: '10px', color: '#fff', opacity: 0.5 }}
          >
            Name
          </td>
          <td style={{ fontSize: '30px' }}>
            {trait_name1} {trait_name2}
          </td>
        </tr>
        <tr>
          <td
            align='right'
            style={{ paddingRight: '10px', color: '#fff', opacity: 0.5 }}
          >
            Title
          </td>
          <td>
            <b>
              {trait_jobField} {trait_jobTitle}
            </b>
          </td>
        </tr>
        <tr>
          <td
            align='right'
            style={{ paddingRight: '10px', color: '#fff', opacity: 0.5 }}
          >
            From
          </td>
          <td style={{ fontSize: '18px' }}>
            <b>{lunarOriginName}</b>
          </td>
        </tr>
        <tr>
          <td
            align='right'
            style={{ paddingRight: '10px', color: '#fff', opacity: 0.5 }}
          >
            Personality
          </td>
          <td style={{ fontSize: '18px' }}>
            {trait_personality1}, {trait_personality2} & {trait_personality3}
          </td>
        </tr>
        <tr>
          <td
            align='right'
            style={{ paddingRight: '10px', color: '#fff', opacity: 0.5 }}
          >
            Lunar Phase
          </td>
          <td style={{ fontSize: '18px' }}>{moonPhase}</td>
        </tr>
        <tr>
          <td
            align='right'
            style={{ paddingRight: '10px', color: '#fff', opacity: 0.5 }}
          >
            Lunar Month
          </td>
          <td style={{ fontSize: '18px' }}>{moonMonth}</td>
        </tr>
        <tr>
          <td
            align='right'
            style={{ paddingRight: '10px', color: '#fff', opacity: 0.5 }}
          >
            Birth
          </td>
          <td
            style={{ fontSize: '18px' }}
          >{`${birthDay}/${birthMonth}/${birthYearStr}`}</td>
        </tr>
        <tr>
          <td
            align='right'
            style={{ paddingRight: '10px', color: '#fff', opacity: 0.5 }}
          >
            Age
          </td>
          <td style={{ fontSize: '18px' }}>{age} Years</td>
        </tr>
        <tr>
          <td
            align='right'
            style={{ paddingRight: '10px', color: '#fff', opacity: 0.5 }}
          >
            Discovered
          </td>
          <td style={{ fontSize: '18px' }}>
            {`${spawn_DateDay}/${spawn_DateMonth}/${spawn_DateYear}`}
          </td>
        </tr>
        <tr>
          <td
            align='right'
            style={{ paddingRight: '10px', color: '#fff', opacity: 0.5 }}
          >
            Rarity
          </td>
          <td style={{ fontSize: '18px' }}>{rarityScore}</td>
        </tr>
        <tr>
          <td
            align='right'
            style={{ paddingRight: '10px', color: '#fff', opacity: 0.5 }}
          >
            Eyes
          </td>
          <td style={{ fontSize: '18px' }}>
            {eyeAsymmetrical ? 'Asymmetrical' : 'Symmetrical'},{' '}
            {eyeMulticolor ? 'Multicolored' : 'Single Color'}, {eyeShape}
          </td>
        </tr>
        <tr>
          <td
            align='right'
            style={{ paddingRight: '10px', color: '#fff', opacity: 0.5 }}
          >
            Material
          </td>
          <td style={{ fontSize: '18px' }}>{Material}</td>
        </tr>
        <tr>
          <td
            align='right'
            style={{ paddingRight: '10px', color: '#fff', opacity: 0.5 }}
          >
            Color Count
          </td>
          <td style={{ fontSize: '18px' }}>{colorsTotal}</td>
        </tr>
        <tr>
          <td
            align='right'
            style={{ paddingRight: '10px', color: '#fff', opacity: 0.5 }}
          >
            Pieces Count
          </td>
          <td style={{ fontSize: '18px' }}>{complexityPieces}</td>
        </tr>
      </table>
    </CreatureFeatureContainer>
  )
}
