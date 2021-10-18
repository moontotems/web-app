import React, { useEffect, useState } from 'react'
import PagesAll from '../All'
import './styles.less'

export default function Wallet({ ethereumProps, nftAppProps }) {
  const { readContracts, address } = ethereumProps
  const { assembleCreature } = nftAppProps

  if (!address) {
    // TODO:
    return <div>Please connect wallet</div>
  }

  const [usersCreatures, setUsersCreatures] = useState([])
  const [balanceOfUser, setBalanceOfUser] = useState(0)

  useEffect(() => {
    const getUsersCreatures = async () => {
      try {
        console.log('now calling infura: balanceOf')
        let balanceOf = await readContracts.MoonTotems.balanceOf(address)
        console.log({ address })
        console.log({ balanceOf })
        balanceOf = parseInt(balanceOf.toString()) || 0
        console.log({ balanceOf })
        setBalanceOfUser(balanceOf)

        const usersCreaturesUpdate = []
        for (let tokenIndex = 0; tokenIndex < balanceOfUser; tokenIndex++) {
          console.log('now calling infura: tokenOfOwnerByIndex')
          let tokenId = await readContracts.MoonTotems.tokenOfOwnerByIndex(
            address,
            tokenIndex
          )
          tokenId = tokenId.toString()
          console.log({ tokenId })
          /*
          const tokenURI =
            await readContracts.MoonTotems.tokenURI(tokenId)
          console.log('tokenURI', tokenURI)
          */

          //const ipfsHash = tokenURI.replace('https://ipfs.io/ipfs/', '')
          //console.log('ipfsHash', ipfsHash)

          //const jsonManifestBuffer = await getFromIPFS(ipfsHash)

          //const jsonManifest = JSON.parse(jsonManifestBuffer.toString())
          //console.log('jsonManifest', jsonManifest)
          const creature = assembleCreature(tokenId)
          usersCreaturesUpdate.push({ ...creature, ownedByUser: true })
        }

        console.log({ usersCreaturesUpdate })
        setUsersCreatures(usersCreaturesUpdate)
      } catch (e) {
        console.log(e)
      }
    }
    getUsersCreatures()
  }, [address, balanceOfUser, readContracts])

  return (
    <PagesAll
      ethereumProps={ethereumProps}
      nftAppProps={{ ...nftAppProps, creatures: { visible: usersCreatures } }}
    />
  )
}
