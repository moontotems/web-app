import React, { useEffect } from 'react'
/*
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell
} from 'carbon-components-react'
*/
import FILTERS from '../../sharedComponents/FilterDropdown/filters'
import PagesAll from '../All'
import './styles.less'

export default function Wallet({ ethereumProps, nftAppProps }) {
  const { address } = ethereumProps
  const { setActiveFilter } = nftAppProps

  useEffect(() => {
    setActiveFilter(FILTERS.myTalismoons)
  }, [])

  if (!address) {
    // TODO:
    return <div>Please connect wallet</div>
  }

  return <PagesAll ethereumProps={ethereumProps} nftAppProps={nftAppProps} />

  /*
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
          console.log('setting token index', tokenIndex)
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
      <Row>
        {usersCreatures.map(usersCreature => {
          const tokenId = usersCreature.id
          const minted = true
          const metaData = creature_metadata_hashmap[tokenId]
          const image = getImageUrl(tokenId)

          const creature = {
            tokenId,
            metaData,
            image,
            isFavorite: true,
            minted
          }
          const key = `TALISMOON-${tokenId}`

          return (
            <Col key={key} xs={24} sm={16} md={8} lg={6}>
              <Creature
                ethereumProps={ethereumProps}
                nftAppProps={nftAppProps}
                creature={creature}
              />
            </Col>
          )
        })}
      </Row>
    </div>
  )
  */
}
