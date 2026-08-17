import { useEffect, useState } from 'react'

import { HEADER_HEIGHT } from '~/lib/constants'
import { clearFreshMintFlag, hasFreshMintFlag } from '~/lib/nft/fresh-mint'

import { FeaturePanel } from './FeaturePanel'

// Welcome message after a fresh mint (legacy MoonTotem features/FreshMintMessage).
export const FreshMintMessage = ({ tokenId }: { tokenId: number }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(hasFreshMintFlag(tokenId))
  }, [tokenId])

  if (!visible) return null

  const dismiss = () => {
    clearFreshMintFlag(tokenId)
    setVisible(false)
  }

  return (
    <FeaturePanel title="" variant="freshMint" onClose={dismiss}>
      <div
        className="overflow-auto text-left text-lg leading-10 text-white"
        style={{ maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        Welcome and congratulations!
        <br />
        <br />
        You are now a proud holder of a one and only, first generation Moon Totem. The Moon Totem
        project is dedicated to pushing the boundaries of the NFT experience. The tools and features
        this project offers are unique, experimental and innovative.
        <br />
        <br />
        The Totem Chat and Totem Story may at first appear simple experiences but they are in fact
        the first steps to verifiable digital intimacy and exclusivity. Only you can have this
        experience with your Totem.
        <br />
        <br />
        The idea is that this is just a first version. We aim to continuously improve the
        experience, try new things but most of all we are excited to see how you use these features,
        we want your feedback and to learn from you.
        <br />
        <br />
        Tip: Checkout the file downloads that come with your Totem.
      </div>
    </FeaturePanel>
  )
}
