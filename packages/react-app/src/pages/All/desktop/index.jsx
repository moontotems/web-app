import React from 'react'
import { Row, Col } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

import {
  CreaturesGrid,
  CreaturesCarousel,
  Creature
} from '../../../sharedComponents'

export default function AllDesktopView({ ethereumProps, nftAppProps }) {
  const { creatures, infiniteScroll } = nftAppProps
  const { next, hasMore, loader } = infiniteScroll

  return (
    <div style={{ backgroundColor: '#000' }}>
      <InfiniteScroll
        dataLength={creatures.length}
        next={() => next()}
        hasMore={() => hasMore}
        loader={loader}
        //endMessage={}
      >
        <Row>
          <Col xs={24} sm={24} md={4} />
          <Col xs={24} sm={24} md={16}>
            <Row>
              {creatures.map(creature => {
                const { tokenId, metaData, image, isFavorite, minted } =
                  creature

                const key = `TALISMOON-${tokenId}`

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
    </div>
  )
}
