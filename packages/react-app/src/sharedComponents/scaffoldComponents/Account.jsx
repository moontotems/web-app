import { Button } from 'antd'
import React from 'react'
import Address from './Address'
import Balance from './Balance'
import { DESKTOP_HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from '../../constants'

export default function Account({
  address,
  userSigner,
  localProvider,
  mainnetProvider,
  price,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  isMobile
}) {
  const sharedStyles = {
    height: isMobile
      ? `calc(${MOBILE_HEADER_HEIGHT} - 15)`
      : `${DESKTOP_HEADER_HEIGHT}px`,
    marginTop: isMobile ? '18px' : '0px',
    padding: '9px 24px',
    cursor: 'pointer',
    verticalAlign: 'middle',
    fontSize: isMobile ? '24px' : '14px'
  }
  const connectWalletButton = (
    <div
      key='loginbutton'
      role='button'
      style={{
        ...sharedStyles,
        backgroundColor: '#DA1E28'
      }}
      onClick={loadWeb3Modal}
    >
      connect wallet
    </div>
  )

  const accountDisplay = (
    <div
      style={{
        ...sharedStyles,
        backgroundColor: '#1062FE'
      }}
    >
      <Address
        size='medium'
        address={address}
        ensProvider={mainnetProvider}
        blockExplorer={blockExplorer}
      />
    </div>
  )

  return <div>{address ? accountDisplay : connectWalletButton}</div>
}
