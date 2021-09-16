import React from 'react'

export default function Attributes({
  creatureMetadata: {
    age,
    birthDay,
    birthMonth,
    birthYear,
    birthYearStr,
    edition,
    eyeAsymmetrical,
    eyeColor1,
    eyeColor2,
    eyeMulticolor,
    lunarOriginBatchId,
    lunarOriginId,
    lunarOriginName,
    lunarOriginNameLatin,
    lunarOriginQuantity,
    moonMonth,
    moonMonthId,
    moonPhase,
    moonPhaseId,
    P,
    rarity,
    rarityOrigin,
    seedGlobal,
    seedLocal,
    spawn_DateDay,
    spawn_DateMonth,
    spawn_DateYear,
    spawn_Hour,
    total,
    trait_jobField,
    trait_jobTitle,
    trait_name1,
    trait_name2,
    trait_personality1,
    trait_personality2,
    trait_personality3
  }
}) {
  return (
    <div>
      <div
        style={{
          float: 'left',
          width: '20%',
          paddingRight: 10,
          fontSize: '18px',
          lineHeight: '24px',
          textAlign: 'right',
          color: '#fff',
          opacity: 0.5
        }}
      >
        <div className='creature-attribute-prefix'>Name</div>
        <div className='creature-attribute-prefix'>Title</div>
        <div className='creature-attribute-prefix'>From</div>
        <div className='creature-attribute-prefix'>Personality</div>
        <div className='creature-attribute-prefix'>Lunar Sign</div>
        <div className='creature-attribute-prefix'>Age</div>
        <div className='creature-attribute-prefix'>Rarity</div>
      </div>
      <div
        style={{
          float: 'left',
          width: '75%',
          fontSize: '18px',
          lineHeight: '24px',
          textAlign: 'left',
          color: '#fff'
        }}
      >
        <div className='creature-attribute-value' style={{ fontSize: 30 }}>
          {trait_name1} {trait_name2}
        </div>
        <div className='creature-attribute-value'>
          <b>
            {trait_jobField} {trait_jobTitle}
          </b>
        </div>
        <div className='creature-attribute-value'>
          <b>{lunarOriginName}</b>
        </div>
        <div className='creature-attribute-value'>
          {trait_personality1}, {trait_personality2}, {trait_personality3}
        </div>
        <div className='creature-attribute-value'>{lunarOriginNameLatin}</div>
        <div className='creature-attribute-value'>{age} years</div>
        <div className='creature-attribute-value'>{rarity}</div>
      </div>
    </div>
  )
}
