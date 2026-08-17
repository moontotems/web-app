import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { getImageUrl } from '~/lib/nft/image-url'
import type { MoonTotem, TokenMetaData } from '~/lib/nft/types'

import {
  ActionsPanel,
  ChatbotPanel,
  FileDownloadsPanel,
  FreshMintMessage,
  MetaDataPanel,
  MintToPanel,
  WriteStoryPanel,
} from './panels'

export const FeaturePanels = ({
  moonTotem,
  metaData,
}: {
  moonTotem: MoonTotem
  metaData: TokenMetaData | undefined
}) => {
  const { featurePanels } = useMoonTotems()
  const { tokenId } = moonTotem

  return (
    <>
      <FreshMintMessage tokenId={tokenId} />
      {featurePanels.metaData && metaData && <MetaDataPanel metaData={metaData} />}
      {featurePanels.download && <FileDownloadsPanel tokenId={tokenId} />}
      {featurePanels.chat && metaData && (
        <ChatbotPanel
          tokenId={tokenId}
          image={getImageUrl({ tokenId, size: 1024 })}
          metaData={metaData}
        />
      )}
      {featurePanels.story && <WriteStoryPanel tokenId={tokenId} />}
      {featurePanels.actions && <ActionsPanel tokenId={tokenId} />}
      {featurePanels.mintTo && <MintToPanel tokenId={tokenId} />}
    </>
  )
}
