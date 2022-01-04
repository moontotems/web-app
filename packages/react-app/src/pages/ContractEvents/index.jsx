import React from 'react'
import { Row, Col, List } from 'antd'
import { Address } from '../../sharedComponents'

import { useEventListener } from '../../hooks'

export default function ContractEvents({ ethereumProps }) {
  const { mainnetProvider, localProvider, readContracts, writeContracts } =
    ethereumProps

  const mintEvents = useEventListener(
    readContracts,
    'MoonTotems',
    'Mint',
    localProvider,
    1
  )

  const transferEvents = useEventListener(
    readContracts,
    'MoonTotems',
    'Transfer',
    localProvider,
    1
  )

  const approvalEvents = useEventListener(
    readContracts,
    'MoonTotems',
    'Approval',
    localProvider,
    1
  )

  const approvalForAllEvents = useEventListener(
    readContracts,
    'MoonTotems',
    'ApprovalForAll',
    localProvider,
    1
  )

  console.log({
    mintEvents,
    transferEvents,
    approvalEvents,
    approvalForAllEvents
  })

  return (
    <>
      <Row>
        <Col xs={24}>
          <h2>Contract Events</h2>
        </Col>
      </Row>
      <Row
        gutter={[16, 16]}
        style={{ padding: '16px', backgroundColor: '#000' }}
      >
        <Col xs={24} sm={24} md={12} lg={12}>
          <h3>Mint Events</h3>
          <List
            bordered
            dataSource={mintEvents}
            renderItem={event => {
              return (
                <List.Item
                  key={`mint_${event.blockNumber}_${event.sender}_${event._tokenId}`}
                >
                  {'Block '} {event.blockNumber}
                  {' - Token Id: '}
                  {event._tokenId.toString()}
                  {' To: '}
                  <Address
                    address={event._to}
                    size='medium'
                    ensProvider={mainnetProvider}
                    fontSize={16}
                  />
                </List.Item>
              )
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <h3>Transfer Events</h3>
          <List
            bordered
            dataSource={transferEvents}
            renderItem={event => {
              return (
                <List.Item
                  key={`transfer_${event.blockNumber}_${event.sender}_${event._tokenId}`}
                >
                  {'Block '} {event.blockNumber}
                  {' - Token Id: '}
                  {event._tokenId.toString()}
                  {' - From: '}
                  <Address
                    address={event._from}
                    size='medium'
                    ensProvider={mainnetProvider}
                    fontSize={16}
                  />
                  {' To: '}
                  <Address
                    address={event._to}
                    size='medium'
                    ensProvider={mainnetProvider}
                    fontSize={16}
                  />
                </List.Item>
              )
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <h3>Approval Events</h3>
          <List
            bordered
            dataSource={approvalEvents}
            renderItem={event => {
              return (
                <List.Item
                  key={`approval_${event.blockNumber}_${event.sender}_${event.purpose}`}
                >
                  {'Block '} {event.blockNumber}
                  {' - '}
                  <Address
                    address={event[0]}
                    size='medium'
                    ensProvider={mainnetProvider}
                    fontSize={16}
                  />
                  {event[1]}
                </List.Item>
              )
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <h3>Approval For All Events</h3>
          <List
            bordered
            dataSource={approvalForAllEvents}
            renderItem={event => {
              return (
                <List.Item
                  key={`approvalForAll_${event.blockNumber}_${event.sender}_${event.purpose}`}
                >
                  {'Block '} {event.blockNumber}
                  {' - '}
                  <Address
                    address={event[0]}
                    ensProvider={mainnetProvider}
                    fontSize={16}
                  />
                  {event[1]}
                </List.Item>
              )
            }}
          />
        </Col>
      </Row>
    </>
  )
}
