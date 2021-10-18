import React from 'react'
import { Row, Col } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Creature } from '../../sharedComponents'

export default function GridView({ ethereumProps, nftAppProps }) {
  const { creatures, infiniteScroll } = nftAppProps
  const {
    visibleCreaturesRangeStart,
    visibleCreaturesRangeEnd,
    next,
    hasMore,
    loader
  } = infiniteScroll

  return (
    <div style={{ backgroundColor: '#000' }}>
      <InfiniteScroll
        dataLength={visibleCreaturesRangeEnd - visibleCreaturesRangeStart}
        next={() => next()}
        hasMore={() => hasMore}
        loader={loader}
        //endMessage={}
      >
        <Row>
          {creatures.visible.map(creature => {
            const { tokenId } = creature
            const key = `MOTEM-${tokenId}`

            return (
              <Col key={key} xs={8}>
                <Creature
                  ethereumProps={ethereumProps}
                  nftAppProps={nftAppProps}
                  creature={creature}
                />
              </Col>
            )
          })}
        </Row>
      </InfiniteScroll>
    </div>
  )
}
