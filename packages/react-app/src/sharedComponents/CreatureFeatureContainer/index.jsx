import React from 'react'
import $ from 'jquery'
import persistantStore from 'store'
import { CloseFilled32 } from '@carbon/icons-react'

export default function CreatureFeatureContainer({
  ethereumProps,
  nftAppProps,
  containerId,
  icon,
  title,
  isFreshMintMessage,
  tokenId,
  children
}) {
  const { isMobile, hideAllFeatures } = nftAppProps

  let styles = {
    background: isMobile ? 'rgba(0, 0, 0, 0.8)' : 'none'
  }

  if (isFreshMintMessage) {
    styles = {
      backgroundColor: '#4589FF',
      opacity: 0.95,
      padding: '15px'
    }
  }

  return (
    <div
      id={containerId}
      style={{
        float: 'left',
        width: '100%',
        minWidth: '100%',
        height: '100%',
        paddingTop: '10px',
        paddingLeft: '0px',
        ...styles
      }}
    >
      <div
        style={{
          float: 'left',
          width: '100%',
          maxHeight: '100%',
          marginBottom: '15px',
          paddingLeft: '17px'
        }}
      >
        <span>{icon}</span>
        <span style={{ paddingLeft: '10px', fontSize: '20px' }}>{title}</span>
        <CloseFilled32
          style={{ float: 'right', cursor: 'pointer' }}
          onClick={() => {
            if (isFreshMintMessage) {
              persistantStore.set(`show-fresh-mint-message-${tokenId}`, false)
            }
            hideAllFeatures()
          }}
        />
      </div>
      <div
        style={{
          float: 'left',
          width: '100%',
          paddingLeft: '20px',
          fontSize: '18px',
          lineHeight: '48px',
          textAlign: 'right',
          color: '#fff'
        }}
      >
        {children}
      </div>
    </div>
  )
}
