import React from 'react'
import { Link } from 'react-router-dom'
import {
  QueryQueue16,
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
const { OwnedByUserIcon16x16, NotMintedIcon16x16 } = Icons

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
    setShowGrid,
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
      marginTop: '-3px'
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
            <ViewFilled16 aria-label='' />
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
              <CarouselHorizontal16 aria-label='Switch to carousel view' />
            </div>
          </div>
        </Link>
        <Link
          onClick={() => {
            setRoute('/all')
            setShowGrid(true)
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
              <Apps16 />
            </div>
          </div>
        </Link>

        <Link
          onClick={() => {
            setRoute('/all')
            setShowGrid(false)
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
              <List16 />
            </div>
          </div>
        </Link>

        <div className='menu-item title' style={{ ...menuItemStyle }}>
          <div style={{ ...menuItemContentStyle.text }}>Filter</div>
          <div style={{ ...menuItemContentStyle.icon }}>
            <Filter16 aria-label='Filter' />
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
                width='17px'
                style={{ marginTop: '-10px' }}
                alt='All Totems'
              />
            </div>
          </div>
        </Link>

        <div
          className='menu-item'
          style={{
            ...menuItemStyle,
            borderLeft: filterIsActive(FILTERS.notMinted)
              ? '5px solid #1062FE'
              : 'none'
          }}
          onClick={() => {
            setRoute('/all')
            if (filterIsActive(FILTERS.notMinted)) {
              let _activeFilters = activeFilters
              _activeFilters = _activeFilters.filter(
                e => e !== FILTERS.notMinted
              )
              setActiveFilters([..._activeFilters, FILTERS.minted])
            } else {
              let _activeFilters = activeFilters
              _activeFilters = _activeFilters.filter(e => e !== FILTERS.minted)
              setActiveFilters([..._activeFilters, FILTERS.notMinted])
            }
          }}
        >
          <div style={{ ...menuItemContentStyle.text }}>Available Totems</div>
          <div style={{ ...menuItemContentStyle.icon }}>
            {/*<img src={NotMintedIcon16x16} alt='Not Minted' />*/}
            <AsleepFilled16 aria-label='Available Totems' />
          </div>
        </div>
        <div
          className='menu-item'
          style={{
            ...menuItemStyle,
            borderLeft: filterIsActive(FILTERS.minted)
              ? '5px solid #1062FE'
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
              _activeFilters = _activeFilters.filter(
                e => e !== FILTERS.notMinted
              )
              setActiveFilters([..._activeFilters, FILTERS.minted])
            } else {
              let _activeFilters = activeFilters
              _activeFilters = _activeFilters.filter(e => e !== FILTERS.minted)
              setActiveFilters([..._activeFilters, FILTERS.notMinted])
            }
          }}
        >
          <div style={{ ...menuItemContentStyle.text }}>Minted Totems</div>
          <div style={{ ...menuItemContentStyle.icon }}>
            <Locked16 aria-label='Minted Totems' />
          </div>
        </div>
        <div
          className='menu-item'
          style={{
            ...menuItemStyle,
            borderLeft: filterIsActive(FILTERS.favorites)
              ? '5px solid #1062FE'
              : 'none'
          }}
          onClick={() => {
            setRoute('/all')
            if (filterIsActive(FILTERS.favorites)) {
              removeFilter(FILTERS.favorites)
            } else {
              addFilter(FILTERS.favorites)
            }
          }}
        >
          <div style={{ ...menuItemContentStyle.text }}>Favorite Totems</div>
          <div style={{ ...menuItemContentStyle.icon }}>
            <FavoriteFilled16
              aria-label='Favorite Totems'
              style={{ fill: '#DA1E28' }}
            />
          </div>
        </div>
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
              onClick={() => setActiveFilters([FILTERS.myTalismoons])}
            >
              My Totems
            </div>
            <div style={{ ...menuItemContentStyle.icon }}>
              <img
                src={OwnedByUserIcon16x16}
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
              <Shuffle16 />
            </div>
          </div>
        </Link>

        {showCreatureFeatures && (
          <>
            <div className='menu-item title' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>Tools</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <ColorPalette16 aria-label='Color' />
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
                <ChatBot16 aria-label='Chat' />
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
                <Edit16 aria-label='Edit' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                View Full Resolution
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <ZoomIn16 aria-label='Zoom' />
              </div>
            </div>
            <div
              className='menu-item'
              style={{ ...menuItemStyle }}
              onClick={() => toggleVisibilityDownload()}
            >
              <div style={{ ...menuItemContentStyle.text }}>Download Files</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Download16 aria-label='Download' />
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
                <Information16 aria-label='Meta Data' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                Explore on OpenSea
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Launch16 aria-label='Explore on OpenSea' />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
