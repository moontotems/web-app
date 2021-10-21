import React from 'react'
import { Link } from 'react-router-dom'
import {
  QueryQueue32,
  ColorPalette32,
  ChatBot32,
  Edit32,
  ZoomIn32,
  Download32,
  Information32,
  Launch32,
  ViewFilled32,
  CarouselHorizontal32,
  Apps32,
  List32,
  Filter32,
  AsleepFilled32,
  Locked32,
  FavoriteFilled32,
  Shuffle32
} from '@carbon/icons-react'

import FILTERS from '../../../sharedComponents/FilterDropdown/filters'
import { DESKTOP_HEADER_HEIGHT } from '../../../constants'
import Icons from '../../icons'
const { OwnedByUserIcon32x32, NotMintedIcon32x32 } = Icons

import './style.css'

export default function CompactSidebar({
  ethereumProps,
  nftAppProps,
  creatureList,
  menuItemStyle,
  showCreatureFeatures
}) {
  const {
    setRoute,
    setShowGrid,
    shuffleCreatureIndexList,
    filter: {
      setActiveFilters,
      removeFilter,
      addFilter,
      toggleFilter,
      filterIsActive,
      activeFilters
    },
    creatures,
    toggleVisibilityDownload,
    toggleVisibilityMetaData,
    toggleVisibilityChat,
    toggleVisibilityCreatureStory
  } = nftAppProps

  return (
    <div
      style={{
        float: 'right',
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#262626',
        height: `calc(100vh - ${DESKTOP_HEADER_HEIGHT}px)`
      }}
    >
      <div className='menu-item square-title' style={{ ...menuItemStyle }}>
        <ViewFilled32 aria-label='Switch to Carousel View' />
      </div>
      <Link
        onClick={() => {
          setRoute('/moontotem')
        }}
        to={`/moontotem/${
          creatureList.length
            ? creatureList[0].tokenId
            : creatures.all[0].tokenId
        }`}
      >
        <div className='menu-item' style={{ ...menuItemStyle }}>
          <CarouselHorizontal32 aria-label='Switch to Carousel View' />
        </div>
      </Link>

      <Link
        onClick={() => {
          setRoute('/all')
          setShowGrid(true)
        }}
        to='/all'
      >
        <div
          className='menu-item'
          style={{ ...menuItemStyle }}
          aria-label='Switch to area view'
        >
          <Apps32 />
        </div>
      </Link>
      <Link
        onClick={() => {
          setRoute('/all')
          setShowGrid(false)
        }}
        to='/all'
      >
        <div
          className='menu-item'
          style={{ ...menuItemStyle }}
          aria-label='Switch to List View'
        >
          <List32 aria-label='Switch to List View' />
        </div>
      </Link>
      <div className='menu-item square-title' style={{ ...menuItemStyle }}>
        <Filter32 aria-label='Filter' />
      </div>
      <div
        className='menu-item'
        style={{
          ...menuItemStyle,
          borderLeft: activeFilters.length === 0 ? '2px solid #1062FE' : 'none'
        }}
        onClick={() => setActiveFilters([])}
      >
        <img
          src='/TALISMOON_LOGO.svg'
          width='17px'
          style={{ height: '40px', width: '30px' }}
          alt='All Totems'
        />
      </div>
      <div
        className='menu-item'
        style={{
          ...menuItemStyle,
          borderLeft: filterIsActive(FILTERS.notMinted)
            ? '2px solid #1062FE'
            : 'none'
        }}
        onClick={() => {
          setRoute('/all')
          if (filterIsActive(FILTERS.notMinted)) {
            let _activeFilters = activeFilters
            _activeFilters = _activeFilters.filter(e => e !== FILTERS.notMinted)
            setActiveFilters([..._activeFilters, FILTERS.minted])
          } else {
            let _activeFilters = activeFilters
            _activeFilters = _activeFilters.filter(e => e !== FILTERS.minted)
            setActiveFilters([..._activeFilters, FILTERS.notMinted])
          }
        }}
      >
        <AsleepFilled32 aria-label='Available Totems' />
      </div>
      <div
        className='menu-item'
        style={{
          ...menuItemStyle,
          borderLeft: filterIsActive(FILTERS.minted)
            ? '2px solid #1062FE'
            : 'none'
        }}
        onClick={() => {
          setRoute('/all')
          if (
            !filterIsActive(FILTERS.minted) &&
            !filterIsActive(FILTERS.notMinted)
          ) {
            setActiveFilters([...activeFilters, FILTERS.minted])
          } else if (filterIsActive(FILTERS.notMinted)) {
            let _activeFilters = activeFilters
            _activeFilters = _activeFilters.filter(e => e !== FILTERS.notMinted)
            setActiveFilters([..._activeFilters, FILTERS.minted])
          } else {
            let _activeFilters = activeFilters
            _activeFilters = _activeFilters.filter(e => e !== FILTERS.minted)
            setActiveFilters([..._activeFilters, FILTERS.notMinted])
          }
        }}
      >
        <Locked32 aria-label='Minted Totems' />
      </div>
      <div
        className='menu-item'
        style={{
          ...menuItemStyle,
          borderLeft: filterIsActive(FILTERS.favorites)
            ? '2px solid #1062FE'
            : 'none'
        }}
        onClick={() => toggleFilter(FILTERS.favorites)}
      >
        <FavoriteFilled32
          aria-label='Favorite Totems'
          style={{ fill: '#DA1E28' }}
        />
      </div>
      <Link
        onClick={() => {
          setRoute('/wallet')
        }}
        to={'/wallet'}
      >
        <div
          aria-label='My Totems'
          className='menu-item'
          style={{
            ...menuItemStyle,
            paddingTop: '8px',
            paddingBottom: '9px',
            borderBottom: 'none'
          }}
          onClick={() => setActiveFilters([FILTERS.myTalismoons])}
        >
          <img src={OwnedByUserIcon32x32} alt='My Totems' />
        </div>
      </Link>
      <div
        className='menu-item shuffle'
        style={{
          ...menuItemStyle,
          backgroundColor: '#24A148',
          borderBottom: 'none'
        }}
        aria-label='Shuffle Totems'
        onClick={() => shuffleCreatureIndexList()}
      >
        <Shuffle32 />
      </div>
      {showCreatureFeatures && (
        <>
          <div
            className='menu-item square-title'
            style={{ ...menuItemStyle, borderTop: '1px solid #6F6F6F' }}
          >
            <ColorPalette32 aria-label='Color' />
          </div>
          <div
            className='menu-item'
            style={{ ...menuItemStyle }}
            onClick={() => toggleVisibilityChat()}
          >
            <ChatBot32 aria-label='Chat' />
          </div>
          <div
            className='menu-item'
            style={{ ...menuItemStyle }}
            onClick={() => toggleVisibilityCreatureStory()}
          >
            <Edit32 aria-label='Edit' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <ZoomIn32 aria-label='Zoom' />
          </div>
          <div
            className='menu-item'
            style={{ ...menuItemStyle }}
            onClick={() => toggleVisibilityDownload()}
          >
            <Download32 aria-label='Download' />
          </div>
          <div
            className='menu-item'
            style={{ ...menuItemStyle }}
            onClick={() => toggleVisibilityMetaData()}
          >
            <Information32 aria-label='Meta Data' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <Launch32 aria-label='TODO' />
          </div>
        </>
      )}
    </div>
  )
}
