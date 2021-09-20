import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell
} from 'carbon-components-react'
import { Creature } from '../../sharedComponents'
import creature_metadata_hashmap from '../../creature_metadata_hashmap.json'

import { useContractReader } from '../../hooks'
import { getImageUrl } from '../../helpers'

import './styles.less'

export default function Wallet({ ethereumProps, nftAppProps }) {
  const { address, readContracts } = ethereumProps

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
          console.log('etting token index', tokenIndex)
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

  /*
  const headers = [
    {
      key: 'state',
      header: 'State'
    },
    {
      key: 'image',
      header: 'Image'
    },
    {
      key: 'name',
      header: 'Name'
    },
    {
      key: 'title',
      header: 'Title'
    },
    {
      key: 'personality',
      header: 'Personality'
    },
    {
      key: 'origin',
      header: 'Origin'
    },
    {
      key: 'lunar-phase',
      header: 'Lunar Phase'
    },
    {
      key: 'age',
      header: 'Age'
    },
    {
      key: 'value',
      header: 'Value'
    }
  ]

  const rows = [
    {
      id: 'a',
      name: 'Load balancer 1',
      status: 'Disabled'
    },
    {
      id: 'b',
      name: 'Load balancer 2',
      status: 'Starting'
    },
    {
      id: 'c',
      name: 'Load balancer 3',
      status: 'Active'
    }
  ]
  */

  return (
    <div style={{ backgroundColor: '#000' }}>
      {/*
      <Row>
        <DataTable rows={rows} headers={headers}>
          {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
            <Table
              {...getTableProps()}
              size='lg'
              stickyHeader
              useZebraStyles
              useStaticWidth={false}
            >
              <TableHead>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableHeader
                      key={`header-${index}`}
                      {...getHeaderProps({ header })}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={`row-${index}`} {...getRowProps({ row })}>
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DataTable>
      </Row>
      */}
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
}
