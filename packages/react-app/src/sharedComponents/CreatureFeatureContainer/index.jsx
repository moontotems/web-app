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
  const { isMobile } = nftAppProps

  // TODO: do this better
  let individualStyles = {
    background: isMobile ? 'rgba(0, 0, 0, 0.8)' : 'none'
  }

  if (isFreshMintMessage) {
    individualStyles = {
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
        ...individualStyles
      }}
    >
      <div
        style={{
          float: 'left',
          width: isMobile ? '90%' : '100%',
          maxHeight: '100%',
          marginBottom: '15px',
          paddingLeft: '17px'
        }}
      >
        <span style={{ marginLeft: isMobile ? '10px' : 'none' }}>{icon}</span>
        <span
          style={{ paddingLeft: '10px', fontSize: isMobile ? '30px' : '20px' }}
        >
          {title}
        </span>
        <CloseFilled32
          style={{ float: 'right', cursor: 'pointer' }}
          onClick={() => {
            if (isFreshMintMessage) {
              persistantStore.set(`show-fresh-mint-message-${tokenId}`, false)
            }
            $(`#${containerId}`).toggle(500)
          }}
        />
      </div>
      <div
        style={{
          float: 'left',
          width: isMobile ? '90%' : '100%',
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
