/* eslint-disable react/display-name */
import React from 'react'
import { Link } from 'react-router-dom'
import { Launch16 } from '@carbon/icons-react'
import { getImageUrl } from '../../../../helpers'
import { Icons } from '../../../../sharedComponents'
const { MintedIcon16x16 } = Icons

const convertBoolNumToString = num => {
  if (num === 1) return 'Yes'
  return 'No'
}

export default function getColumns({ nftAppProps, getColumnSearchProps }) {
  const { setRoute } = nftAppProps

  return [
    {
      title: 'Token ID',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id - b.id
    },
    {
      title: 'State',
      render: (value, record) => <img src={MintedIcon16x16} alt='Minted' />
    },
    {
      title: 'Image',
      render: (value, record) => (
        <img
          src={getImageUrl(record.id)}
          alt={`Talismoon #${record.id}`}
          style={{ width: '100%' }}
        />
      )
    },
    {
      title: 'Show',
      fixed: 'right',
      render: (value, record) => (
        <Link
          onClick={() => {
            setRoute('/talismoon')
          }}
          to={`/talismoon/${record.id}`}
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
      title: 'Age',
      dataIndex: 'age',
      filters: true,
      sorter: (a, b) => a.age - b.age
    },
    {
      title: 'Birth Year',
      dataIndex: 'birthYearStr',
      ...getColumnSearchProps('birthYearStr'),
      sorter: (a, b) => a.birthYearStr?.localeCompare(b.birthYearStr)
    },
    {
      title: 'No of Colors',
      dataIndex: 'colorsTotal',
      width: 220,
      filters: true,
      sorter: (a, b) => a.complexityFactor - b.complexityFactor
    },
    {
      title: 'Complexity Factor',
      dataIndex: 'complexityFactor',
      tip: 'This is a cool tip ...',
      filters: true,
      sorter: (a, b) => a.complexityFactor - b.complexityFactor
    },
    {
      title: 'Complexity Pieces',
      dataIndex: 'complexityPieces',
      sorter: (a, b) => a.complexityPieces - b.complexityPieces
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
      title: 'Eye Shape',
      dataIndex: 'eyeShape',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        crescent: { text: 'Crescent', status: 'Crescent' },
        catEyes: { text: 'Cat Eyes', status: 'Cat Eyes' },
        semi: { text: 'Semi', status: 'Semi' },
        saucer: { text: 'Saucer', status: 'Saucer' },
        slot: { text: 'Slot', status: 'Slot' },
        unknown: { text: 'Unknown', status: 'Unknown' }
      }
    },
    {
      title: 'Blobby Holes',
      dataIndex: 'holesBlobby',
      render: (value, record) => convertBoolNumToString(value),
      sorter: (a, b) => a.holesBlobby - b.holesBlobby
    },
    {
      title: 'Cut Holes',
      dataIndex: 'holesCut',
      render: (value, record) => convertBoolNumToString(value),
      sorter: (a, b) => a.holesCut - b.holesCut
    },
    {
      title: 'Lunar Origin Name',
      dataIndex: 'lunarOriginName',
      ...getColumnSearchProps('lunarOriginName'),
      sorter: (a, b) => a.lunarOriginName?.localeCompare(b.lunarOriginName)
    },
    {
      title: 'Lunar Origin Name Latin',
      dataIndex: 'lunarOriginNameLatin',
      ...getColumnSearchProps('lunarOriginNameLatin'),
      sorter: (a, b) =>
        a.lunarOriginNameLatin?.localeCompare(b.lunarOriginNameLatin)
    },
    {
      title: 'Lunar Origin Quantity',
      dataIndex: 'lunarOriginQuantity',
      sorter: (a, b) => a.complexityFactor - b.complexityFactor
    },
    {
      title: 'Material',
      dataIndex: 'Material',
      sorter: (a, b) => a.Material?.localeCompare(b.Material)
    },
    {
      title: 'mat_patternBump',
      dataIndex: 'mat_patternBump',
      sorter: (a, b) => a.mat_patternBump - b.mat_patternBump
    },
    {
      title: 'mat_patternPerf',
      dataIndex: 'mat_patternPerf',
      sorter: (a, b) => a.mat_patternPerf - b.mat_patternPerf
    },
    {
      title: 'Moon Month',
      dataIndex: 'moonMonth',
      sorter: (a, b) => a.moonMonth?.localeCompare(b.moonMonth)
    },
    {
      title: 'Moon Phase',
      dataIndex: 'moonPhase',
      sorter: (a, b) => a.moonPhase?.localeCompare(b.moonPhase)
    },
    {
      title: 'Age Rank',
      dataIndex: 'RankAge',
      sorter: (a, b) => a.RankAge - b.RankAge
    },
    {
      title: 'Color Quantity Rank',
      dataIndex: 'RankColorsQuantity',
      sorter: (a, b) => a.RankColorsQuantity - b.RankColorsQuantity
    },
    {
      title: 'Complexity Rank',
      dataIndex: 'RankComplexity',
      sorter: (a, b) => a.RankComplexity - b.RankComplexity
    },
    {
      title: 'Rarity Rank',
      dataIndex: 'RankRarity',
      sorter: (a, b) => a.RankRarity - b.RankRarity
    },
    {
      title: 'Age Rarity',
      dataIndex: 'rarityAge',
      sorter: (a, b) => a.rarityAge - b.rarityAge
    },
    {
      title: 'Field Rarity',
      dataIndex: 'rarityField',
      sorter: (a, b) => a.rarityField - b.rarityField
    },
    {
      title: 'Material Rarity',
      dataIndex: 'rarityMaterial',
      sorter: (a, b) => a.rarityMaterial - b.rarityMaterial
    },
    {
      title: 'Moon Month Rarity',
      dataIndex: 'raritymoonMonth',
      sorter: (a, b) => a.raritymoonMonth - b.raritymoonMonth
    },
    {
      title: 'Moon Phase Rarity',
      dataIndex: 'raritymoonPhase',
      sorter: (a, b) => a.raritymoonPhase - b.raritymoonPhase
    },
    {
      title: 'Origin Rarity',
      dataIndex: 'rarityOrigin',
      sorter: (a, b) => a.rarityOrigin - b.rarityOrigin
    },
    {
      title: 'Range Rarity',
      dataIndex: 'rarityRange',
      sorter: (a, b) => a.rarityRange - b.rarityRange
    },
    {
      title: 'Rarity Score',
      dataIndex: 'rarityScore',
      sorter: (a, b) => a.rarityScore - b.rarityScore
    },
    {
      title: 'Title Rarity',
      dataIndex: 'rarityTitle',
      sorter: (a, b) => a.rarityTitle - b.rarityTitle
    },
    {
      title: 'Job Title',
      dataIndex: 'trait_jobTitle',
      ...getColumnSearchProps('trait_jobTitle'),
      sorter: (a, b) => a.trait_jobTitle?.localeCompare(b.trait_jobTitle)
    },
    {
      title: 'Job Field',
      dataIndex: 'trait_jobField',
      ...getColumnSearchProps('trait_jobField'),
      sorter: (a, b) => a.trait_jobField?.localeCompare(b.trait_jobField)
    },
    {
      title: 'Personality Trait 1',
      dataIndex: 'trait_personality1',
      sorter: (a, b) =>
        a.trait_personality1?.localeCompare(b.trait_personality1)
    },
    {
      title: 'Personality Trait 2',
      dataIndex: 'trait_personality2',
      sorter: (a, b) =>
        a.trait_personality2?.localeCompare(b.trait_personality2)
    },
    {
      title: 'Personality Trait 3',
      dataIndex: 'trait_personality3',
      sorter: (a, b) =>
        a.trait_personality3?.localeCompare(b.trait_personality3)
    }
  ]
}
