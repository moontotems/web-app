/* eslint-disable react/display-name */
import React from 'react'
import { Link } from 'react-router-dom'
import { Launch16 } from '@carbon/icons-react'
import { getImageUrl } from '../../../helpers'

const convertBoolNumToString = num => {
  if (num === 1) return 'Yes'
  return 'No'
}

export default function getColumns({ nftAppProps, getColumnSearchProps }) {
  const { setRoute } = nftAppProps

  return [
    {
      title: 'Image',
      fixed: 'left',
      render: (value, record) => (
        <Link
          onClick={() => {
            setRoute('/')
          }}
          to={`/${record.id}`}
          target='_blank'
        >
          <img
            src={getImageUrl({ tokenId: record.id, size: 100 })}
            alt={`Moon Totem #${record.id}`}
            style={{ width: '100%' }}
          />
        </Link>
      )
    },
    {
      title: 'Token ID',
      dataIndex: 'id',
      key: 'id',
      //...getColumnSearchProps('Token ID', 'id'),
      sorter: (a, b) => a.id - b.id
    },
    /*
    {
      title: 'State',
      fixed: 'right',
      render: (value, record) => <img src={OwnedByUserIcon16x16} alt='Minted' />
    },
    */
    {
      title: 'Show',
      fixed: 'right',
      render: (value, record) => (
        <Link
          onClick={() => {
            setRoute('/')
          }}
          to={`/${record.id}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Launch16 />
        </Link>
      )
    },
    {
      title: 'Name',
      dataIndex: 'trait_name1',
      render: (value, record) => `${record.trait_name1} ${record.trait_name2}`,
      sorter: (a, b) => {
        const nameA = `${a.trait_name1} ${a.trait_name2}`
        const nameB = `${b.trait_name1} ${b.trait_name2}`
        return nameA?.localeCompare(nameB)
      }
    },
    {
      title: 'Job Field',
      dataIndex: 'trait_jobField',
      //...getColumnSearchProps('Job Field', 'trait_jobField'),
      sorter: (a, b) => a.trait_jobField?.localeCompare(b.trait_jobField)
    },
    {
      title: 'Job Title',
      dataIndex: 'trait_jobTitle',
      //...getColumnSearchProps('Job Title', 'trait_jobTitle'),
      sorter: (a, b) => a.trait_jobTitle?.localeCompare(b.trait_jobTitle)
    },
    {
      title: 'Personality',
      dataIndex: 'trait_personality1',
      render: (value, record) =>
        `${record.trait_personality1}, ${record.trait_personality2} & ${record.trait_personality3}`,
      sorter: (a, b) => {
        const personalityStringA = `${a.trait_personality1}, ${a.trait_personality2} & ${a.trait_personality3}`
        const personalityStringB = `${b.trait_personality1}, ${b.trait_personality2} & ${b.trait_personality3}`
        return personalityStringA?.localeCompare(personalityStringB)
      }
    },
    {
      title: 'Origin',
      dataIndex: 'lunarOriginName',
      sorter: (a, b) => a.lunarOriginName?.localeCompare(b.lunarOriginName),

      filters: true,
      onFilter: (value, record, ...rest) => {
        return record['lunarOriginName']
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
      },
      valueType: 'select',
      valueEnum: {
        seaOfRains: { text: 'Sea of Rains', status: 'Sea of Rains' },
        seaOfFertility: {
          text: 'Sea of Fertility',
          status: 'Sea of Fertility'
        },
        seaOfTranquility: {
          text: 'Sea of Tranquility',
          status: 'Sea of Tranquility'
        },
        seaOfClouds: { text: 'Sea of Clouds', status: 'Sea of Clouds' },
        seaOfIslands: { text: 'Sea of Islands', status: 'Sea of Islands' },
        lakeOfDreams: { text: 'Lake of Dreams', status: 'Lake of Dreams' },
        bayOfRainbows: { text: 'Bay of Rainbows', status: 'Bay of Rainbows' },
        peninsulaOfThunder: {
          text: 'Peninsula of Thunder',
          status: 'Peninsula of Thunder'
        },
        bayOfHarmony: { text: 'Bay of Harmony', status: 'Bay of Harmony' },
        bayOfSuccess: { text: 'Bay of Success', status: 'Bay of Success' },
        bayOfLove: { text: 'Bay of Love', status: 'Bay of Love' },
        lakeOfTime: { text: 'Lake of Time', status: 'Lake of Time' },
        lakeOfHappiness: {
          text: 'Lake of Happiness',
          status: 'Lake of Happiness'
        },
        lakeOfHope: { text: 'Lake of Hope', status: 'Lake of Hope' },
        lakeOfSoftness: {
          text: 'Lake of Softness',
          status: 'Lake of Softness'
        },
        lakeOfPerseverance: {
          text: 'Lake of Perseverance',
          status: 'Lake of Perseverance'
        },
        lakeOfForgetfulness: {
          text: 'Lake of Forgetfulness',
          status: 'Lake of Forgetfulness'
        },
        lakeOfLuxury: { text: 'Lake of Luxury', status: 'Lake of Luxury' }
      }
    },
    {
      title: 'Lunar Month',
      dataIndex: 'moonMonth',
      sorter: (a, b) => a.moonMonth?.localeCompare(b.moonMonth)
    },
    {
      title: 'Lunar Phase',
      dataIndex: 'moonPhase',
      sorter: (a, b) => a.moonPhase?.localeCompare(b.moonPhase)
    },
    {
      title: 'Material',
      dataIndex: 'Material',
      sorter: (a, b) => a.Material?.localeCompare(b.Material),

      filters: true,
      onFilter: (value, record) => {
        return record['Material']
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
      },
      valueType: 'select',
      valueEnum: {
        textured: { text: 'Textured', status: 'Textured' },
        smooth: { text: 'Smooth', status: 'Smooth' },
        slot: { text: 'Slot', status: 'Slot' },
        unknown: { text: 'Unknown', status: 'Unknown' }
      }
    },
    {
      title: 'Bumps',
      dataIndex: 'mat_patterBumpName',
      sorter: (a, b) =>
        a.mat_patterBumpName?.localeCompare(b.mat_patterBumpName)
    },
    {
      title: 'Perforation',
      dataIndex: 'mat_patterPerfName',
      sorter: (a, b) =>
        a.mat_patterPerfName?.localeCompare(b.mat_patterPerfName)
    },
    {
      title: 'Complexity Score',
      dataIndex: 'complexityScore',
      // tip: 'This is a cool tip ...',
      filters: true,
      sorter: (a, b) => a.complexityScore - b.complexityScore
    },

    {
      title: 'Color Count',
      dataIndex: 'colorsTotal',
      sorter: (a, b) => a.colorsTotal - b.colorsTotal
    },
    {
      title: 'Pieces Count',
      dataIndex: 'complexityPieces',
      sorter: (a, b) => a.complexityPieces - b.complexityPieces
    },

    {
      title: 'Blobby Holes',
      dataIndex: 'holesBlobby',
      render: (value, record) => convertBoolNumToString(value),
      sorter: (a, b) => a.holesBlobby - b.holesBlobby,

      filters: true,
      onFilter: (value, record) => {
        return (
          (record['holesBlobby'] === 0 && value === 'no') ||
          (record['holesBlobby'] === 1 && value === 'yes')
        )
      },
      valueType: 'select',
      valueEnum: {
        yes: { text: 'Yes', status: 'yes' },
        no: { text: 'No', status: 'no' }
      }
    },
    {
      title: 'Cut Holes',
      dataIndex: 'holesCut',
      render: (value, record) => convertBoolNumToString(value),
      sorter: (a, b) => a.holesCut - b.holesCut
    },
    {
      title: 'Eye Shape',
      dataIndex: 'eyeShape',
      sorter: (a, b) => a.eyeShape?.localeCompare(b.eyeShape),

      filters: true,
      onFilter: (value, record) => {
        return record['eyeShape']
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
      },
      valueType: 'select',
      valueEnum: {
        crescent: { text: 'Crescent', status: 'Crescent' },
        catEyes: { text: 'Cat Eyes', status: 'Cat Eyes' },
        semi: { text: 'Semi', status: 'Semi' },
        saucer: { text: 'Saucer', status: 'Saucer' },
        slot: { text: 'Slot', status: 'Slot' },
        unknown: { text: 'Unknown', status: 'Unknown' },
        hexagon: { text: 'Hexagon', status: 'Hexagon' }
      }
    },
    {
      title: 'Asymmetrical Eye',
      dataIndex: 'eyeAsymmetrical',
      render: (value, record) => convertBoolNumToString(value),
      sorter: (a, b) => a.eyeAsymmetrical - b.eyeAsymmetrical
    },
    {
      title: 'Multicolored Eyes',
      dataIndex: 'eyeMulticolor',
      render: (value, record) => convertBoolNumToString(value),
      sorter: (a, b) => a.eyeMulticolor - b.eyeMulticolor
    },
    {
      title: 'Age',
      dataIndex: 'age',
      filters: true,
      sorter: (a, b) => a.age - b.age
    },
    {
      title: 'Birth Year',
      dataIndex: 'birthYearStr',
      //...getColumnSearchProps('Birth Year', 'birthYearStr'),
      sorter: (a, b) => a.birthYearStr?.localeCompare(b.birthYearStr)
    },
    {
      title: 'Personality A',
      dataIndex: 'trait_personality1',
      sorter: (a, b) =>
        a.trait_personality1?.localeCompare(b.trait_personality1)
    },
    {
      title: 'Personality B',
      dataIndex: 'trait_personality2',
      sorter: (a, b) =>
        a.trait_personality2?.localeCompare(b.trait_personality2)
    },
    {
      title: 'Personality C',
      dataIndex: 'trait_personality3',
      sorter: (a, b) =>
        a.trait_personality3?.localeCompare(b.trait_personality3)
    },
    {
      title: 'Lunar Month Score',
      dataIndex: 'moonMonthScore',
      sorter: (a, b) => a.moonMonthScore - b.moonMonthScore
    },
    {
      title: 'Lunar Phase Score',
      dataIndex: 'moonPhaseScore',
      sorter: (a, b) => a.moonPhaseScore - b.moonPhaseScore
    },
    {
      title: 'Origin Score',
      dataIndex: 'lunarOriginScore',
      sorter: (a, b) => a.lunarOriginScore - b.lunarOriginScore
    },
    {
      title: 'Origin Latin',
      dataIndex: 'lunarOriginNameLatin',
      //...getColumnSearchProps('Origin Latin', 'lunarOriginNameLatin'),
      sorter: (a, b) =>
        a.lunarOriginNameLatin?.localeCompare(b.lunarOriginNameLatin)
    },
    {
      title: 'Origin Population',
      dataIndex: 'lunarOriginQuantity',
      sorter: (a, b) => a.lunarOriginQuantity - b.lunarOriginQuantity
    },
    {
      title: 'Color Quantity Rank',
      dataIndex: 'colorRank',
      sorter: (a, b) => a.colorRank - b.colorRank
    },
    {
      title: 'Age Rank',
      dataIndex: 'ageRank',
      sorter: (a, b) => a.ageRank - b.ageRank
    },
    {
      title: 'Complexity Rank',
      dataIndex: 'complexityRank',
      sorter: (a, b) => a.complexityRank - b.complexityRank
    },
    {
      title: 'Age Score',
      dataIndex: 'AgeScore',
      sorter: (a, b) => a.ageScore - b.ageScore
    },
    {
      title: 'Material Score',
      dataIndex: 'materialScore',
      sorter: (a, b) => a.materialScore - b.materialScore
    }

    /*
    {
      title: 'Rarity Score',
      dataIndex: 'rarityScore',
      sorter: (a, b) => a.rarityScore - b.rarityScore
    },
    */
    /*
    {
      title: 'Rarity Rank',
      dataIndex: 'rarityRank',
      sorter: (a, b) => a.rarityRank - b.rarityRank
    },
    */

    /*
    {
      title: 'Show',
      //fixed: 'right',
      render: (value, record) => (
        <Link
         onClick={() => {
            setRoute('/')
          }}
          to={`/${record.id}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Launch16 />
        </Link>
      )
    }
    */
  ]
}
