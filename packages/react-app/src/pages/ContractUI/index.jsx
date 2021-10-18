import React from 'react'
import { Row, Col } from 'antd'
import { Contract } from '../../sharedComponents'

export default function ContractUI({
  userSigner,
  localProvider,
  address,
  blockExplorer,
  contractConfig
}) {
  return (
    <Row>
      <Col>
        <Contract
          name='MoonTotems'
          signer={userSigner}
          provider={localProvider}
          address={address}
          blockExplorer={blockExplorer}
          contractConfig={contractConfig}
        />
      </Col>
    </Row>
  )
}
