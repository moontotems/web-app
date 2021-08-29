import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import { Creature } from '../../components'

import {
  useBalance,
  useContractLoader,
  useContractReader,
  useEventListener,
  useExchangePrice,
  useGasPrice,
  useOnBlock,
  useUserSigner
} from '../../hooks'

export default function Wallet({
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  gasPrice,
  tx,
  readContracts,
  writeContracts,
  creatures
}) {
  const CREATURE_IMAGES = []
  for (let i = 0; i < 100; i++) {
    CREATURE_IMAGES[i] = `TALISMOONS_G1.${i}`
  }

  const balanceOf =
    useContractReader(
      readContracts,
      'NFTokenMetadataEnumerableMock',
      'balanceOf',
      [address]
    ) || {}

  const balanceOfUser = parseInt(balanceOf.toString()) || 0

  console.log({ balanceOfUser })

  const [usersCreatures, setUsersCreatures] = useState([])

  useEffect(() => {
    const getUsersCreatures = async () => {
      const usersCreaturesUpdate = []
      for (let tokenIndex = 0; tokenIndex < balanceOfUser; tokenIndex++) {
        try {
          console.log('Getting token index', tokenIndex)
          const tokenId =
            await readContracts.NFTokenMetadataEnumerableMock.tokenOfOwnerByIndex(
              address,
              tokenIndex
            )
          console.log('tokenId', tokenId)
          const tokenURI =
            await readContracts.NFTokenMetadataEnumerableMock.tokenURI(tokenId)
          console.log('tokenURI', tokenURI)

          //const ipfsHash = tokenURI.replace('https://ipfs.io/ipfs/', '')
          //console.log('ipfsHash', ipfsHash)

          //const jsonManifestBuffer = await getFromIPFS(ipfsHash)

          try {
            //const jsonManifest = JSON.parse(jsonManifestBuffer.toString())
            //console.log('jsonManifest', jsonManifest)
            usersCreaturesUpdate.push({
              id: tokenId.toString(),
              uri: tokenURI,
              owner: address
              //...jsonManifest
            })
          } catch (e) {
            console.log(e)
          }
        } catch (e) {
          console.log(e)
        }
      }
      setUsersCreatures(usersCreaturesUpdate)
    }
    getUsersCreatures()
  }, [address, balanceOfUser])

  return (
    <div style={{ backgroundColor: '#000' }}>
      <h2>Your Talismoons</h2>
      <Row>
        {usersCreatures.map(usersCreature => {
          const creature = creatures[usersCreature.id]
          if (creature) {
            const { id } = creature

            const key = `TALISMOONS-${id}`

            return (
              <Col key={key} xs={24} sm={16} md={8} lg={6}>
                <Creature
                  creature={creature}
                  address={address}
                  mainnetProvider={mainnetProvider}
                  localProvider={localProvider}
                  yourLocalBalance={localProvider}
                  price={price}
                  gasPrice={gasPrice}
                  tx={tx}
                  readContracts={readContracts}
                  writeContracts={writeContracts}
                />
              </Col>
            )
          }
        })}
      </Row>
    </div>
  )
}
