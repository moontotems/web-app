import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import { Creature } from '../../components'

// TODO: fetch this from file server
console.log('fetching local json list of talismoon data')
import talismoon_data from './talismoon_data.json'
console.log('fetching local json list of talismoon data: OK')

console.log({ talismoon_data })

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
  writeContracts
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
      ['0xb68Bc26fE4e55E326Ad2430B2864d98d57f85F8E']
    ) || {}

  const balanceOfUser = parseInt(balanceOf.toString()) || 0

  console.log({ balanceOfUser })

  const [usersMoons, setUsersMoons] = useState([])

  useEffect(() => {
    const getUsersMoons = async () => {
      const usersMoonsUpdate = []
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
            usersMoonsUpdate.push({
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
      setUsersMoons(usersMoonsUpdate)
    }
    getUsersMoons()
  }, [address, balanceOfUser])

  console.log({ usersMoons })

  return (
    <div style={{ backgroundColor: '#000' }}>
      <h2>Your Talismoons</h2>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {usersMoons.map(usersMoon => {
          const CREATURE_IMAGE = CREATURE_IMAGES[usersMoon.id]
          const {
            id,
            name1,
            name2,
            generation,
            characteristic1,
            characteristic2,
            characteristic3,
            element,
            family
          } = talismoon_data[usersMoon.id]

          const key = `TALISMOONS-${id}`

          return (
            <Col key={key} span={4}>
              <Creature
                imagePath={`./images/creatures/JPG/TALISMOONS_G1.${id}.jpg`}
                id={id}
                name1={name1}
                name2={name2}
                generation={generation}
                characteristic1={characteristic1}
                characteristic2={characteristic2}
                characteristic3={characteristic3}
                element={element}
                family={family}
                showAdoptButton={false}
              />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
