import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import {
  CheckmarkOutline16,
  CheckmarkFilled16,
  Favorite16,
  FavoriteFilled16
} from '@carbon/icons-react'

export default function Creature({ ethereumProps, nftAppProps, creature }) {
  const { setRoute, favorites } = nftAppProps
  const { updateFavorites } = favorites
  const { tokenId, image, minted, isFavorite, metaData } = creature

  const { trait_jobField, trait_jobTitle, trait_name1, trait_name2 } =
    metaData || {}

  return (
    <>
      <div
        style={{
          minHeight: 104
        }}
      >
        <Link
          onClick={() => {
            setRoute('/totem')
          }}
          to={`/totem/${tokenId}`}
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
            <div style={{ textAlign: 'center' }}>
              {minted && <CheckmarkOutline16 style={{ fill: '#4589FF' }} />}
              {!minted && <CheckmarkFilled16 style={{ fill: '#00FF74' }} />}
            </div>
          </Col>
          <Col xs={12}>
            <div
              style={{
                fontFamily: 'IBM Plex Sans',
                fontSize: 16,
                fontStyle: 'normal',
                fontWeight: 400,
                //lineHeight: '3em',
                marginBottom: 2,
                //letterSpacing: '0.04em',
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
                //lineHeight: 5,
                //letterSpacing: '0.04em',
                textAlign: 'center'
              }}
            >
              {trait_jobField} {trait_jobTitle}
            </div>
          </Col>
          <Col xs={6}>
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

              {/*<FavoriteFilled32 style={{ fill: 'red' }} />*/}
            </div>
          </Col>
        </Row>
        {/*!minted && <Button onClick={() => mint()}>Adopt for {0.1} Ξ</Button>*/}
      </div>
    </>
  )
}
