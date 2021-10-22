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
      <div
        style={{
          float: 'left',
          paddingRight: '10px',
          fontSize: '18px',
          lineHeight: '48px',
          textAlign: 'right',
          color: '#fff',
          opacity: 0.5
        }}
      >
        <div className='creature-attribute-prefix'>Name</div>
        <div className='creature-attribute-prefix'>Title</div>
        <div className='creature-attribute-prefix'>From</div>
        <div className='creature-attribute-prefix'>Personality</div>
        <div className='creature-attribute-prefix'>Lunar Phase</div>
        <div className='creature-attribute-prefix'>Lunar Month</div>
        <div className='creature-attribute-prefix'>Birth</div>
        <div className='creature-attribute-prefix'>Age</div>
        <div className='creature-attribute-prefix'>Discovered</div>
        <div className='creature-attribute-prefix'>Rarity</div>
        <div className='creature-attribute-prefix'>Eyes</div>
        <div className='creature-attribute-prefix'>Material</div>
        <div className='creature-attribute-prefix'>Color Count</div>
        <div className='creature-attribute-prefix'>Pieces Count</div>
      </div>
      <div
        style={{
          float: 'left',
          width: isMobile ? '60%' : '75%',
          fontSize: '18px',
          lineHeight: '45px',
          textAlign: 'left',
          color: '#fff'
        }}
      >
        <div className='creature-attribute-value' style={{ fontSize: 30 }}>
          {trait_name1} {trait_name2}
        </div>
        <div
          className='creature-attribute-value'
          style={{ lineHeight: '54px' }}
        >
          {/* Title */}
          <b>
            {trait_jobField} {trait_jobTitle}
          </b>
        </div>
        <div
          className='creature-attribute-value'
          style={{ lineHeight: '46px' }}
        >
          {/* From */}
          <b>{lunarOriginName}</b>
        </div>
        <div
          className='creature-attribute-value'
          style={{ lineHeight: '50px' }}
        >
          {/* Personality */}
          {trait_personality1}, {trait_personality2} & {trait_personality3}
        </div>
        <div
          className='creature-attribute-value'
          style={{ lineHeight: '44px' }}
        >
          {/* Lunar Sign */}
          {moonPhase}
        </div>
        <div
          className='creature-attribute-value'
          style={{ lineHeight: '53px' }}
        >
          {/* Lunar Month */}
          {moonMonth}
        </div>

        <div
          className='creature-attribute-value'
          style={{ lineHeight: '45px' }}
        >
          {`${birthDay}/${birthMonth}/${birthYearStr}`}
        </div>
        <div
          className='creature-attribute-value'
          style={{ lineHeight: '51px' }}
        >
          {age} Years
        </div>
        <div
          className='creature-attribute-value'
          style={{ lineHeight: '47px' }}
        >
          {`${spawn_DateDay}/${spawn_DateMonth}/${spawn_DateYear}`}
        </div>
        <div
          className='creature-attribute-value'
          style={{ lineHeight: '50px' }}
        >
          {rarityScore}
        </div>
        <div
          className='creature-attribute-value'
          style={{ lineHeight: '45px' }}
        >
          {eyeAsymmetrical ? 'Asymmetrical' : 'Symmetrical'},{' '}
          {eyeMulticolor ? 'Multicolored' : 'Single Color'}, {eyeShape}
        </div>
        <div
          className='creature-attribute-value'
          style={{ lineHeight: '51px' }}
        >
          {Material}
        </div>
        <div
          className='creature-attribute-value'
          style={{ lineHeight: '48px' }}
        >
          {colorsTotal}
        </div>
        <div
          className='creature-attribute-value'
          style={{ lineHeight: '48px' }}
        >
          {complexityPieces}
        </div>
      </div>
    </CreatureFeatureContainer>
  )
}
