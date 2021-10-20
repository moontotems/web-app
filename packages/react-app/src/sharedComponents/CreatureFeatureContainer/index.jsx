import React from 'react'
import $ from 'jquery'

import { CloseFilled32 } from '@carbon/icons-react'

export default function CreatureFeatureContainer({
  ethereumProps,
  nftAppProps,
  containerId,
  icon,
  title,
  children
}) {
  const { isMobile } = nftAppProps

  return (
    <div
      id={containerId}
      style={{
        float: 'left',
        width: '100%',
        minWidth: '100%',
        height: '100%',
        background: isMobile ? 'rgba(0, 0, 0, 0.8)' : 'none',
        paddingTop: '10px',
        paddingLeft: '0px'
      }}
    >
      <div
        style={{
          float: 'left',
          width: isMobile ? '90%' : '100%',
          marginBottom: '15px'
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
          onClick={() => $(`#${containerId}`).toggle(500)}
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
