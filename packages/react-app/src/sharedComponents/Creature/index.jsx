import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import {
  AsleepFilled16,
  Favorite16,
  FavoriteFilled16
} from '@carbon/icons-react'
import Icons from '../icons'
const { OwnedByUserIcon16x16, NotMintedIcon16x16 } = Icons

export default function Creature({
  ethereumProps,
  nftAppProps,
  creature,
  showButtons
}) {
  const { setRoute, favorites } = nftAppProps
  const { updateFavorites } = favorites
  const { tokenId, image, minted, ownedByUser, isFavorite, metaData } = creature

  const { trait_jobField, trait_jobTitle, trait_name1, trait_name2 } =
    metaData || {}

  const isAvailable = !minted
  const isTaken = minted && !ownedByUser
  const isOwnedByUser = ownedByUser

  return (
    <>
      <div
        style={{
          minHeight: 104
        }}
      >
        <Link
          onClick={() => {
            setRoute('/moontotem')
          }}
          to={`/moontotem/${tokenId}`}
        >
          <img
            alt={`Moon Totem ${tokenId}`}
            height={'auto'}
            width={'100%'}
            src={image}
          />
        </Link>
        <Row>
          <Col xs={6}>
            {showButtons && (
              <div style={{ textAlign: 'center' }}>
                {isAvailable && <AsleepFilled16 />}
                {isOwnedByUser && (
                  <img src={OwnedByUserIcon16x16} alt='Owned by User' />
                )}
              </div>
            )}
          </Col>
          <Col xs={12}>
            <div
              style={{
                fontFamily: 'IBM Plex Sans',
                fontSize: 16,
                fontStyle: 'normal',
                fontWeight: 400,
                marginBottom: 2,
                textAlign: 'center'
              }}
            >
              {`${trait_name1} ${trait_name2}`}
            </div>
            <div
              style={{
                fontFamily: 'IBM Plex Sans',
                fontSize: 13,
                fontStyle: 'normal',
                fontWeight: 300,
                textAlign: 'center'
              }}
            >
              {trait_jobField} {trait_jobTitle}
            </div>
          </Col>
          <Col xs={6}>
            {showButtons && (
              <div style={{ textAlign: 'center' }}>
                {!isFavorite && (
                  <Favorite16
                    role='button'
                    style={{ fill: 'white', cursor: 'pointer' }}
                    onClick={() => updateFavorites(tokenId)}
                  />
                )}
                {isFavorite && (
                  <FavoriteFilled16
                    role='button'
                    style={{ fill: '#DA1E28', cursor: 'pointer' }}
                    onClick={() => updateFavorites(tokenId)}
                  />
                )}
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  )
}
