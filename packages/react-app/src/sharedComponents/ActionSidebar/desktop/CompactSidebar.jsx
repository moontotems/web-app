import React from 'react'
import { Link } from 'react-router-dom'
import {
  ColorPalette16,
  ChatBot16,
  Edit16,
  ZoomIn16,
  Download16,
  Information16,
  Launch16,
  ViewFilled16,
  CarouselHorizontal16,
  Apps16,
  List16,
  Filter16,
  AsleepFilled16,
  Locked16,
  FavoriteFilled16,
  Shuffle16
} from '@carbon/icons-react'

import FILTERS from '../../../sharedComponents/FilterDropdown/filters'
import { DESKTOP_HEADER_HEIGHT } from '../../../constants'
import Icons from '../../icons'
const { OwnedByUserIcon16x16 } = Icons

import './style.css'

export default function CompactSidebar({
  ethereumProps,
  nftAppProps,
  menuItemStyle,
  showCreatureFeatures
}) {
  const {
    setRoute,
    setShowGridView,
    shuffleCreatureIndexList,
    filter: {
      setActiveFilters,
      removeFilter,
      addFilter,
      toggleFilter,
      filterIsActive,
      activeFilters
    },
    creatureLists,
    filteredCreatures,
    visibleCreatures,
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
        <ViewFilled16 aria-label='Switch to Carousel View' />
      </div>
      <Link
        onClick={() => {
          setRoute('/moontotem')
        }}
        to={`/moontotem/${
          filteredCreatures.length
            ? filteredCreatures[0].tokenId
            : creatureLists.all[0].tokenId
        }`}
      >
        <div className='menu-item' style={{ ...menuItemStyle }}>
          <CarouselHorizontal16 aria-label='Switch to Carousel View' />
        </div>
      </Link>

      <Link
        onClick={() => {
          setRoute('/all')
          setShowGridView(true)
        }}
        to='/all'
      >
        <div
          className='menu-item'
          style={{ ...menuItemStyle }}
          aria-label='Switch to area view'
        >
          <Apps16 />
        </div>
      </Link>
      <Link
        onClick={() => {
          setRoute('/all')
          setShowGridView(false)
        }}
        to='/all'
      >
        <div
          className='menu-item'
          style={{ ...menuItemStyle }}
          aria-label='Switch to List View'
        >
          <List16 aria-label='Switch to List View' />
        </div>
      </Link>
      <div className='menu-item square-title' style={{ ...menuItemStyle }}>
        <Filter16 aria-label='Filter' />
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
          src='/moon_totem_logo_512.png'
          width='17px'
          style={{ marginTop: '-10px' }}
          alt='All Totems'
        />
      </div>
      <Link
        onClick={() => {
          setRoute('/all')
        }}
        to='/all'
      >
        <div
          className='menu-item'
          style={{
            ...menuItemStyle,
            borderLeft: filterIsActive(FILTERS.notMinted)
              ? '2px solid #1062FE'
              : 'none'
          }}
          onClick={() => {
            if (filterIsActive(FILTERS.notMinted)) {
              let _activeFilters = activeFilters
              _activeFilters = _activeFilters.filter(
                filter => filter !== FILTERS.notMinted
              )
              setActiveFilters([..._activeFilters, FILTERS.minted])
            } else {
              let _activeFilters = activeFilters
              _activeFilters = _activeFilters.filter(
                filter => filter !== FILTERS.minted
              )
              setActiveFilters([..._activeFilters, FILTERS.notMinted])
            }
          }}
        >
          <AsleepFilled16 aria-label='Available Totems' />
        </div>
      </Link>
      <Link
        onClick={() => {
          setRoute('/all')
        }}
        to='/all'
      >
        <div
          className='menu-item'
          style={{
            ...menuItemStyle,
            borderLeft: filterIsActive(FILTERS.minted)
              ? '2px solid #1062FE'
              : 'none'
          }}
          onClick={() => {
            if (
              !filterIsActive(FILTERS.minted) &&
              !filterIsActive(FILTERS.notMinted)
            ) {
              setActiveFilters([...activeFilters, FILTERS.minted])
            } else if (filterIsActive(FILTERS.notMinted)) {
              let _activeFilters = activeFilters
              _activeFilters = _activeFilters.filter(
                filter => filter !== FILTERS.notMinted
              )
              setActiveFilters([..._activeFilters, FILTERS.minted])
            } else {
              let _activeFilters = activeFilters
              _activeFilters = _activeFilters.filter(
                filter => filter !== FILTERS.minted
              )
              setActiveFilters([..._activeFilters, FILTERS.notMinted])
            }
          }}
        >
          <Locked16 aria-label='Minted Totems' />
        </div>
      </Link>
      <Link
        onClick={() => {
          setRoute('/all')
        }}
        to='/all'
      >
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
          <FavoriteFilled16
            aria-label='Favorite Totems'
            style={{ fill: '#DA1E28' }}
          />
        </div>
      </Link>
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
          onClick={() => setActiveFilters([FILTERS.myMoonTotems])}
        >
          <img src={OwnedByUserIcon16x16} alt='My Totems' />
        </div>
      </Link>
      <Link
        onClick={() => {
          setRoute('/all')
        }}
        to={'/all'}
      >
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
          <Shuffle16 />
        </div>
      </Link>
      <div
        className='menu-item square-title'
        style={{ ...menuItemStyle, borderTop: '1px solid #6F6F6F' }}
      >
        <ColorPalette16 aria-label='Color' />
      </div>
      <div
        className='menu-item'
        style={{ ...menuItemStyle }}
        onClick={() => toggleVisibilityMetaData()}
      >
        <Information16 aria-label='Meta Data' />
      </div>
      {showCreatureFeatures && (
        <>
          <div
            className='menu-item'
            style={{ ...menuItemStyle }}
            onClick={() => toggleVisibilityChat()}
          >
            <ChatBot16 aria-label='Chat' />
          </div>
          <div
            className='menu-item'
            style={{ ...menuItemStyle }}
            onClick={() => toggleVisibilityCreatureStory()}
          >
            <Edit16 aria-label='Edit' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <ZoomIn16 aria-label='Zoom' />
          </div>
          <div
            className='menu-item'
            style={{ ...menuItemStyle }}
            onClick={() => toggleVisibilityDownload()}
          >
            <Download16 aria-label='Download' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <Launch16 aria-label='TODO' />
          </div>
        </>
      )}
    </div>
  )
}
