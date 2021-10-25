import React from 'react'
import { Row, Col } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Creature } from '../../../../sharedComponents'
import { getImageUrl } from '../../../../helpers'

export default function AllDesktopGridView({
  ethereumProps,
  nftAppProps,
  creatureList
}) {
  const { creatures, infiniteScroll } = nftAppProps
  const { next, hasMore, loader } = infiniteScroll

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
                {creatureList.map(creature => {
                  const { tokenId } = creature

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
                        creature={{
                          ...creature,
                          image: getImageUrl({ tokenId, size: 2048 })
                        }}
                        showButtons
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
