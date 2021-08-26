import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'

export default function MyMenu() {
  const [route, setRoute] = useState()
  useEffect(() => {
    setRoute(window.location.pathname)
  }, [setRoute])

  return (
    <Menu
      style={{
        textAlign: 'center',
        backgroundColor: '#000',
        borderBottom: 'none'
      }}
      selectedKeys={[route]}
      mode='horizontal'
    >
      <Menu.Item key='/'>
        <Link
          onClick={() => {
            setRoute('/')
          }}
          to='/'
        >
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key='/all'>
        <Link
          onClick={() => {
            setRoute('/all')
          }}
          to='/all'
        >
          All Crypto Moons
        </Link>
      </Menu.Item>
      <Menu.Item key='/minted'>
        <Link
          onClick={() => {
            setRoute('/minted')
          }}
          to='/minted'
        >
          Minted Crypto Moons
        </Link>
      </Menu.Item>
      <Menu.Item key='/wallet'>
        <Link
          onClick={() => {
            setRoute('/wallet')
          }}
          to='/wallet'
        >
          Your Crypto Moons
        </Link>
      </Menu.Item>
      <Menu.Item key='/contract-events'>
        <Link
          onClick={() => {
            setRoute('/contract-events')
          }}
          to='/contract-events'
        >
          Contract Events
        </Link>
      </Menu.Item>
      <Menu.Item key='/contract-interface'>
        <Link
          onClick={() => {
            setRoute('/contract-interface')
          }}
          to='/contract-interface'
        >
          NFTokenMetadataEnumerableMock
        </Link>
      </Menu.Item>
    </Menu>
  )
}
