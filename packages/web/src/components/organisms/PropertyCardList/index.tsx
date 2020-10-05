import React, { useCallback, useState } from 'react'
import { Spin, Pagination } from 'antd'
import { useListPropertyQuery, useListPropertyOrderByMostRecentQuery } from '@dev/graphql'
import { PropertyCard } from './PropertyCard'
import { PropertySearchForm } from './PropertySearchForm'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Select from 'react-select'
import { useGetAccountAddress } from 'src/fixtures/wallet/hooks'

interface Props {
  currentPage: number
  searchWord: string
  sortBy: string
}

const Header = styled.h2`
  margin-bottom: 0;
`

const PropertiesHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 1.5fr 2fr;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`

const CurrencyContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const Button = styled.button<{ isActive?: boolean }>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  background-color: ${props => (props.isActive ? 'black' : 'transparent')};
  width: 65px;
  span {
    color: ${props => (props.isActive ? 'white' : 'black')};
  }
`

const Circle = styled.div<{ isActive?: boolean }>`
  padding: 6px;
  border-radius: 45px;
  background-color: ${props => (props.isActive ? 'white' : 'black')};
`

const DEFAULT_PER_PAGE = 10

const FILTER_OPTIONS = [
  { label: 'Your properties', value: 'YOUR_PROPS' },
  { label: 'Most Staked', value: 'MOST_STAKED' },
  { label: 'Most recent', value: 'MOST_RECENT' }
]

export const PropertyCardList = ({ currentPage, searchWord, sortBy }: Props) => {
  const { accountAddress } = useGetAccountAddress()
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE)
  const { data, loading } = useListPropertyQuery({
    variables: {
      limit: perPage,
      offset: (currentPage - 1) * perPage,
      ilike: searchWord !== '' ? `%${searchWord}%` : undefined,
      from: sortBy === 'YOUR_PROPS' ? accountAddress || '0xdummy' : undefined
    }
  })
  const { data: aData } = useListPropertyOrderByMostRecentQuery({
    variables: {
      limit: perPage,
      offset: (currentPage - 1) * perPage,
      ilike: searchWord !== '' ? `%${searchWord}%` : undefined,
      from: sortBy === 'YOUR_PROPS' ? accountAddress || '0xdummy' : undefined
    }
  })

  const router = useRouter()
  const handlePagination = useCallback(
    (page: number) => {
      const query = searchWord !== '' ? { page, word: searchWord } : { page }
      router.push({ pathname: '/', query })
    },
    [router, searchWord]
  )
  const handleShowSizeChange = (_: number, pageSize: number) => setPerPage(pageSize)
  const handleSearch = useCallback((word: string) => router.push({ pathname: '/', query: { word, sortby: sortBy } }), [
    router,
    sortBy
  ])
  const handleChangeSortBy = (e: any) => {
    router.push({ pathname: '/', query: { word: searchWord, sortby: e?.value || '' } })
  }

  return (
    <div>
      <PropertiesHeader>
        <Header>Asset Pools</Header>
        <PropertySearchForm onSubmitSearchProperty={handleSearch} />
        <Select options={FILTER_OPTIONS} onChange={handleChangeSortBy} isClearable={true} />
        <CurrencyContainer>
          <Button isActive>
            <Circle isActive />
            <span>DEV</span>
          </Button>
          <Button>
            <Circle />
            <span>USD</span>
          </Button>
        </CurrencyContainer>
      </PropertiesHeader>

      {loading && <Spin size="large" style={{ display: 'block', width: 'auto', padding: '100px' }} />}
      {data && aData && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', rowGap: '0', columnGap: '15px' }}>
          {sortBy !== 'MOST_RECENT' &&
            data.property_factory_create.map(d => (
              <div key={d.event_id} style={{ margin: '54px 0' }}>
                <PropertyCard propertyAddress={d.property} assets={d.authentication} />
              </div>
            ))}
          {sortBy === 'MOST_RECENT' &&
            aData.property_factory_create.map(d => (
              <div key={d.event_id} style={{ margin: '54px 0' }}>
                <PropertyCard propertyAddress={d.property} assets={d.authentication} />
              </div>
            ))}
          <div style={{ gridColumn: '1/-1' }}>
            <Pagination
              current={currentPage}
              size="default"
              responsive={true}
              defaultPageSize={perPage}
              onChange={handlePagination}
              onShowSizeChange={handleShowSizeChange}
              total={data.property_factory_create_aggregate.aggregate?.count}
              style={{ margin: '0 0 20px 50%' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
