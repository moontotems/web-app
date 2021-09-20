import { Skeleton, Typography } from 'antd'
import React from 'react'
import Blockies from 'react-blockies'
import { useThemeSwitcher } from 'react-css-theme-switcher'
import { useLookupAddress } from '../../hooks'

const { Text } = Typography

const blockExplorerLink = (address, blockExplorer) =>
  `${blockExplorer || 'https://etherscan.io/'}${'address/'}${address}`

export default function Address(props) {
  const address = props.value || props.address

  const ens = useLookupAddress(props.ensProvider, address)

  const { currentTheme } = useThemeSwitcher()

  if (!address) {
    return (
      <span>
        <Skeleton avatar paragraph={{ rows: 1 }} />
      </span>
    )
  }

  let displayAddress = address.substr(0, 6)

  if (ens && ens.indexOf('0x') < 0) {
    displayAddress = ens
  } else if (props.size === 'short') {
    displayAddress = `...${address.substr(-4)}`
  } else if (props.size === 'medium') {
    displayAddress = `${displayAddress}...${address.substr(-4)}`
  } else if (props.size === 'long') {
    displayAddress = address
  }

  const etherscanLink = blockExplorerLink(address, props.blockExplorer)
  if (props.minimized) {
    return (
      <span style={{ verticalAlign: 'middle' }}>
        <a
          style={{ color: '#fff' }}
          target='_blank'
          href={etherscanLink}
          rel='noopener noreferrer'
        >
          <Blockies seed={address.toLowerCase()} size={8} scale={2} />
        </a>
      </span>
    )
  }

  let text
  if (props.onChange) {
    text = (
      <Text
        editable={{ onChange: props.onChange }}
        copyable={{ text: address }}
      >
        <a
          style={{ color: '#fff' }}
          target='_blank'
          href={etherscanLink}
          rel='noopener noreferrer'
        >
          {displayAddress}
        </a>
      </Text>
    )
  } else {
    text = (
      <Text copyable={{ text: address }}>
        <a
          style={{ color: '#fff', fontSize: 14 }}
          target='_blank'
          href={etherscanLink}
          rel='noopener noreferrer'
        >
          {displayAddress}
        </a>
      </Text>
    )
  }

  return (
    <span>
      <span
        style={{
          verticalAlign: 'middle',
          paddingLeft: 5
        }}
      >
        {text}
      </span>
    </span>
  )
}
