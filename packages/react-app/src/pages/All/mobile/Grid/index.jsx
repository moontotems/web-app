import React from 'react'
import { Row, Col } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Creature } from '../../../../sharedComponents'
import { getImageUrl } from '../../../../helpers'

export default function AllMobileView({
  ethereumProps,
  nftAppProps,
  creatureList
}) {
  const { creatureLists, filteredCreatures, visibleCreatures, infiniteScroll } =
    nftAppProps
  const { next, hasMore, loader } = infiniteScroll

  return (
    <div>
      <InfiniteScroll
        dataLength={visibleCreatures.length}
        next={() => next()}
        hasMore={() => hasMore}
        loader={loader}
        //endMessage={}
      >
        <Row>
          {filteredCreatures.map(creature => {
            const { tokenId } = creature

            const key = `MOONTOTEM-${tokenId}`

            return (
              <Col key={key} xs={8}>
                <Creature
                  ethereumProps={ethereumProps}
                  nftAppProps={nftAppProps}
                  creature={{
                    ...creature,
                    image: getImageUrl({ tokenId, size: 1024 })
                  }}
                  showButtons
                />
              </Col>
            )
          })}
        </Row>
      </InfiniteScroll>
    </div>
  )
}
