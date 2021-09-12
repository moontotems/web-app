import { Button } from 'antd'
import React from 'react'
import { useThemeSwitcher } from 'react-css-theme-switcher'
import Address from './Address'
import Balance from './Balance'

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
  blockExplorer
}) {
  const modalButtons = []
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <Button
          key='logoutbutton'
          style={{ verticalAlign: 'top', marginLeft: 8, marginTop: 0 }}
          type='primary'
          size='small'
          onClick={logoutOfWeb3Modal}
        >
          logout
        </Button>
      )
    } else {
      modalButtons.push(
        <Button
          key='loginbutton'
          style={{ verticalAlign: 'top', marginLeft: 8, marginTop: 0 }}
          type='primary'
          size='small'
          //type={minimized ? "default" : "primary"}
          onClick={loadWeb3Modal}
        >
          connect wallet
        </Button>
      )
    }
  }

  const display = minimized ? (
    ''
  ) : (
    <span>
      {address && (
        <>
          <Address
            size='medium'
            address={address}
            ensProvider={mainnetProvider}
            blockExplorer={blockExplorer}
            fontSize={12}
          />
          <Balance
            address={address}
            provider={localProvider}
            price={price}
            fontSize={12}
          />
        </>
      )}
      {/*
      <Wallet
        address={address}
        provider={localProvider}
        signer={userSigner}
        ensProvider={mainnetProvider}
        price={price}
        color={currentTheme === 'light' ? '#1890ff' : '#2caad9'}
      />
      */}
    </span>
  )

  return (
    <div>
      {display}
      {modalButtons}
    </div>
  )
}
