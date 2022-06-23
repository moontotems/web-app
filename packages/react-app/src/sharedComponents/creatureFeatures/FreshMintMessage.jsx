import React from 'react'
import persistantStore from 'store'

import { HEADER_HEIGHT } from '../../constants'
import CreatureFeatureContainer from '../CreatureFeatureContainer'

export default function FreshMintMessage({
  ethereumProps,
  nftAppProps,
  tokenId
}) {
  const showFreshMintMessage = persistantStore.get(
    `show-fresh-mint-message-${tokenId}`
  )

  return (
    <>
      {showFreshMintMessage && (
        <CreatureFeatureContainer
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          containerId={'freshMintMessage'}
          icon={''}
          title={''}
          isFreshMintMessage={true}
          tokenId={tokenId}
        >
          <div
            style={{
              float: 'left',
              maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
              overflow: 'auto',
              fontSize: '18px',
              lineHeight: '40px',
              textAlign: 'left',
              color: '#fff',
              backgroundColor: '#4589FF',
              opacity: 0.9,
              paddingBottom: '400px' // TODO: hack
            }}
          >
            Welcome and congratulations!
            <br />
            <br />
            You are now a proud holder of a one and only, first generation Moon
            Totem. The Moon Totem project is dedicated to pushing the boundaries
            of the NFT experience. The tools and features this project offers
            are unique, experimental and innovative.
            <br />
            <br />
            The Totem Chat and Totem Story may at first appear simple
            experiences but they are in fact the first steps to verifiable
            digital intimacy and exclusivity. Only you can have this experience
            with your Totem.
            <br />
            <br />
            The idea is that this is just a first version. We aim to
            continuously improve the experience, try new things but most of all
            we are excited to see how you use these features, we want your
            feedback and to learn from you.
            <br />
            <br />
            PS: There are currently 6k resolution images being processed. This
            takes time and resources and will be announced shortly.
          </div>
        </CreatureFeatureContainer>
      )}
    </>
  )
}
