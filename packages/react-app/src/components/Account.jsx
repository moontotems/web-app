import { Button } from 'antd'
import React from 'react'
import { useThemeSwitcher } from 'react-css-theme-switcher'
import Address from './Address'
import Balance from './Balance'
import Wallet from './Wallet'

/*
  ~ What it does? ~

  Displays an Address, Balance, and Wallet as one Account component,
  also allows users to log in to existing accounts and log out

  ~ How can I use? ~

  <Account
    address={address}
    localProvider={localProvider}
    userProvider={userProvider}
    mainnetProvider={mainnetProvider}
    price={price}
    web3Modal={web3Modal}
    loadWeb3Modal={loadWeb3Modal}
    logoutOfWeb3Modal={logoutOfWeb3Modal}
    blockExplorer={blockExplorer}
  />

  ~ Features ~

  - Provide address={address} and get balance corresponding to the given address
  - Provide localProvider={localProvider} to access balance on local network
  - Provide userProvider={userProvider} to display a wallet
  - Provide mainnetProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide price={price} of ether and get your balance converted to dollars
  - Provide web3Modal={web3Modal}, loadWeb3Modal={loadWeb3Modal}, logoutOfWeb3Modal={logoutOfWeb3Modal}
              to be able to log in/log out to/from existing accounts
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
*/

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

  const { currentTheme } = useThemeSwitcher()

  const display = minimized ? (
    ''
  ) : (
    <span>
      {address ? (
        <Address
          size='medium'
          address={address}
          ensProvider={mainnetProvider}
          blockExplorer={blockExplorer}
          fontSize={12}
        />
      ) : (
        'Connecting...'
      )}
      <Balance
        address={address}
        provider={localProvider}
        price={price}
        fontSize={12}
      />
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
