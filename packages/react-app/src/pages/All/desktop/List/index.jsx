/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { Input, Button, Space } from 'antd'
import ProTable, { TableDropdown } from '@ant-design/pro-table'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'

import talismoon_metadata from '../../../../assets/TALISMOONS_GENERATION01_DATA_6.json'
import getColumns from './getColumns'

export default function AllDesktopListView({ ethereumProps, nftAppProps }) {
  const [searchText, setSearchText] = useState(null)
  const [searchInputNode, setSearchInputNote] = useState(null)
  const [searchedColumn, setSearchedColumn] = useState(null)

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            setSearchInputNote(node)
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      /*
      console.log('in onFilter:')

      console.log({ value })
      console.log({ record })
      console.log({ dataIndex })
      console.log({ arrayRecord: record[dataIndex] })
      */
      if (record[dataIndex]) {
        return record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
        //.includes(value)
      } else {
        return ''
      }
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        // TODO: focus input on dropdown
        //setTimeout(() => searchInputNode.select(), 100)
      }
    },
    render: text => {
      if (searchedColumn === dataIndex) {
        return (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        )
      } else {
        return text
      }
    }
  })

  const columns = getColumns({ nftAppProps, getColumnSearchProps })

  return (
    <>
      <ProTable
        columns={columns}
        dataSource={talismoon_metadata}
        search={false}
      />
    </>
  )
}
