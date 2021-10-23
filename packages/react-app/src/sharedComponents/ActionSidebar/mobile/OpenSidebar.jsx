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

export default function OpenSidebar({
  ethereumProps,
  nftAppProps,
  creatureList,
  menuItemStyle
}) {
  const {
    showCreatureFeatures,
    setRoute,
    setShowGridView,
    shuffleCreatureIndexList,
    filter: {
      activeFilters,
      filterIsActive,
      setActiveFilters,
      toggleFilter,
      removeFilter,
      addFilter
    },
    creatures,
    toggleVisibilityDownload,
    toggleVisibilityMetaData,
    toggleVisibilityChat,
    toggleVisibilityCreatureStory
  } = nftAppProps

  const menuItemContentStyle = {
    text: {
      float: 'left',
      fontSize: '20px'
    },
    icon: {
      float: 'right'
    }
  }

  return (
    <div
      style={{
        float: 'left',
        width: '100%',
        borderTop: '1px solid #6F6F6F'
      }}
    >
      <div
        style={{
          float: 'right',
          width: '100%',
          textAlign: 'center',
          backgroundColor: '#262626',
          height: `calc(100vh - ${DESKTOP_HEADER_HEIGHT}px)`
        }}
      >
        <div className='menu-item title' style={{ ...menuItemStyle }}>
          <div style={{ ...menuItemContentStyle.text }}>View</div>
          <div style={{ ...menuItemContentStyle.icon }}>
            <ViewFilled32 aria-label='' />
          </div>
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
            <div style={{ ...menuItemContentStyle.text }}>Item View</div>
            <div style={{ ...menuItemContentStyle.icon }}>
              <CarouselHorizontal32 aria-label='Switch to carousel view' />
            </div>
          </div>
        </Link>

        <Link
          onClick={() => {
            setRoute('/all')
            setShowGridView(true)
          }}
          to='/all'
        >
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <div
              style={{ ...menuItemContentStyle.text }}
              aria-label='Switch to area view'
            >
              Grid View
            </div>
            <div style={{ ...menuItemContentStyle.icon }}>
              <Apps32 />
            </div>
          </div>
        </Link>

        <Link
          onClick={() => {
            setRoute('/all')
            setShowGridView(false)
          }}
          to='/all'
        >
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <div
              style={{ ...menuItemContentStyle.text }}
              aria-label='Switch to list view'
            >
              List View
            </div>

            <div style={{ ...menuItemContentStyle.icon }}>
              <List32 />
            </div>
          </div>
        </Link>

        <div className='menu-item title' style={{ ...menuItemStyle }}>
          <div style={{ ...menuItemContentStyle.text }}>Filter</div>
          <div style={{ ...menuItemContentStyle.icon }}>
            <Filter32 aria-label='Filter' />
          </div>
        </div>
        <Link
          onClick={() => {
            setRoute('/all')
            setActiveFilters([])
          }}
          to='/all'
        >
          <div
            className='menu-item'
            style={{
              ...menuItemStyle,
              borderLeft:
                activeFilters.length === 0 ? '5px solid #1062FE' : 'none'
            }}
          >
            <div style={{ ...menuItemContentStyle.text }}>All Moon Totems</div>
            <div style={{ ...menuItemContentStyle.icon }}>
              <img
                src='/moon_totem_logo.svg'
                style={{ height: '40px', width: '30px' }}
                alt='All Totems'
              />
            </div>
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
            style={{
              ...menuItemStyle,
              borderLeft: filterIsActive(FILTERS.notMinted)
                ? '5px solid #1062FE'
                : 'none'
            }}
            onClick={() => {
              if (filterIsActive(FILTERS.notMinted)) {
                let _activeFilters = activeFilters
                _activeFilters = _activeFilters.filter(
                  e => e !== FILTERS.notMinted
                )
                setActiveFilters([..._activeFilters, FILTERS.minted])
              } else {
                let _activeFilters = activeFilters
                _activeFilters = _activeFilters.filter(
                  e => e !== FILTERS.minted
                )
                setActiveFilters([..._activeFilters, FILTERS.notMinted])
              }
            }}
          >
            <div style={{ ...menuItemContentStyle.text }}>Available Totems</div>
            <div style={{ ...menuItemContentStyle.icon }}>
              {/*<img src={NotMintedIcon32x32} alt='Not Minted' />*/}
              <AsleepFilled32 aria-label='Available Totems' />
            </div>
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
            style={{
              ...menuItemStyle,
              borderLeft: filterIsActive(FILTERS.minted)
                ? '5px solid #1062FE'
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
                  e => e !== FILTERS.notMinted
                )
                setActiveFilters([..._activeFilters, FILTERS.minted])
              } else {
                let _activeFilters = activeFilters
                _activeFilters = _activeFilters.filter(
                  e => e !== FILTERS.minted
                )
                setActiveFilters([..._activeFilters, FILTERS.notMinted])
              }
            }}
          >
            <div style={{ ...menuItemContentStyle.text }}>Minted Totems</div>
            <div style={{ ...menuItemContentStyle.icon }}>
              <Locked32 aria-label='Minted Totems' />
            </div>
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
            style={{
              ...menuItemStyle,
              borderLeft: filterIsActive(FILTERS.favorites)
                ? '5px solid #1062FE'
                : 'none'
            }}
            onClick={() => {
              if (filterIsActive(FILTERS.favorites)) {
                removeFilter(FILTERS.favorites)
              } else {
                addFilter(FILTERS.favorites)
              }
            }}
          >
            <div style={{ ...menuItemContentStyle.text }}>Favorite Totems</div>
            <div style={{ ...menuItemContentStyle.icon }}>
              <FavoriteFilled32
                aria-label='Favorite Totems'
                style={{ fill: '#DA1E28' }}
              />
            </div>
          </div>
        </Link>
        <Link
          onClick={() => {
            setRoute('/wallet')
          }}
          to={'/wallet'}
        >
          <div
            className='menu-item'
            style={{
              ...menuItemStyle,
              borderBottom: '1px solid #24A148'
            }}
          >
            <div
              style={{ ...menuItemContentStyle.text }}
              onClick={() => setActiveFilters([FILTERS.myMoonTotems])}
            >
              My Totems
            </div>
            <div style={{ ...menuItemContentStyle.icon }}>
              <img
                src={OwnedByUserIcon32x32}
                style={{ marginTop: '-6px' }}
                alt='My Totems'
              />
            </div>
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
              borderBottom: '1px solid #24A148'
            }}
            aria-label='Shuffle'
            onClick={() => shuffleCreatureIndexList()}
          >
            <div style={{ ...menuItemContentStyle.text }}>Shuffle</div>
            <div style={{ ...menuItemContentStyle.icon }}>
              <Shuffle32 />
            </div>
          </div>
        </Link>

        {showCreatureFeatures && (
          <>
            <div className='menu-item title' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>Tools</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <ColorPalette32 aria-label='Color' />
              </div>
            </div>
            <div
              className='menu-item'
              style={{ ...menuItemStyle }}
              onClick={() => toggleVisibilityChat()}
            >
              <div style={{ ...menuItemContentStyle.text }}>
                Consult your Totem
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <ChatBot32 aria-label='Chat' />
              </div>
            </div>
            <div
              className='menu-item'
              style={{ ...menuItemStyle }}
              onClick={() => toggleVisibilityCreatureStory()}
            >
              <div style={{ ...menuItemContentStyle.text }}>
                Write the Story
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Edit32 aria-label='Edit' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                View Full Resolution
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <ZoomIn32 aria-label='Zoom' />
              </div>
            </div>
            <div
              className='menu-item'
              style={{ ...menuItemStyle }}
              onClick={() => toggleVisibilityDownload()}
            >
              <div style={{ ...menuItemContentStyle.text }}>Download Files</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Download32 aria-label='Download' />
              </div>
            </div>
            <div
              className='menu-item'
              style={{ ...menuItemStyle }}
              onClick={() => toggleVisibilityMetaData()}
            >
              <div style={{ ...menuItemContentStyle.text }}>
                Show all Metadata
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Information32 aria-label='Meta Data' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                Explore on OpenSea
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Launch32 aria-label='Explore on OpenSea' />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
