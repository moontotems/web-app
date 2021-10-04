import { Button } from 'antd'
import React from 'react'
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
  blockExplorer,
  isMobile
}) {
  const modalButtons = []
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      /*
      modalButtons.push(
        <Button
          key='logoutbutton'
          style={{
            verticalAlign: 'top',
            marginLeft: 8,
            marginTop: 0,
            backgroundColor: '#1062FE'
          }}
          type='primary'
          size='small'
          onClick={logoutOfWeb3Modal}
        >
          logout
        </Button>
      )
      */
    } else {
      modalButtons.push(
        <div
          key='loginbutton'
          role='button'
          style={{
            height: 32,
            marginTop: isMobile ? 25 : 8,
            padding: '5px 17px',
            paddingTop: 4,
            backgroundColor: 'red',
            cursor: 'pointer'
          }}
          onClick={loadWeb3Modal}
        >
          <span
            style={{
              verticalAlign: 'middle',
              fontSize: 15,
              fontWeight: 500
            }}
          >
            connect wallet
          </span>
        </div>
      )
    }
  }

  const display = minimized ? (
    ''
  ) : (
    <span>
      {address && (
        <>
          <span
            style={{
              padding: '9px 17px',
              backgroundColor: '#1062FE'
            }}
          >
            <span
              style={{
                verticalAlign: 'middle',
                fontSize: 12,
                fontWeight: 500
              }}
            >
              <Address
                size='medium'
                address={address}
                ensProvider={mainnetProvider}
                blockExplorer={blockExplorer}
              />
            </span>
          </span>

          {/*
          <Balance
            address={address}
            provider={localProvider}
            price={price}
            fontSize={12}
          />
          */}
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
