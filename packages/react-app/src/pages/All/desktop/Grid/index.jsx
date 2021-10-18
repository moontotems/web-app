import React, { useEffect } from 'react'
import { Row, Col } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Creature } from '../../../../sharedComponents'

export default function AllDesktopGridView({ ethereumProps, nftAppProps }) {
  const { creatures, infiniteScroll } = nftAppProps
  const { next, hasMore, loader } = infiniteScroll

  console.log('grind:')
  console.log({ renderingCreatures: creatures.visible })

  return (
    <div>
      <>
        <InfiniteScroll
          dataLength={creatures.visible.length}
          next={() => next()}
          hasMore={() => hasMore}
          loader={loader}
          //endMessage={}
        >
          <Row>
            <Col xs={24} sm={24} md={4} />
            <Col xs={24} sm={24} md={16}>
              <Row>
                {creatures.visible.map(creature => {
                  const { tokenId, metaData, image, isFavorite, minted } =
                    creature

                  const key = `MOONTOTEM-${tokenId}`

                  return (
                    <Col
                      key={key}
                      xs={24}
                      sm={8}
                      md={8}
                      lg={8}
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      <Creature
                        ethereumProps={ethereumProps}
                        nftAppProps={nftAppProps}
                        creature={creature}
                      />
                    </Col>
                  )
                })}
              </Row>
            </Col>
            <Col xs={24} sm={24} md={4} />
          </Row>
        </InfiniteScroll>
      </>
    </div>
  )
}
