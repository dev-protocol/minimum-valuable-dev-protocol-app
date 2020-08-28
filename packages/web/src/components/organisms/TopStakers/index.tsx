import React from 'react'
import { useQuery } from '@apollo/client'
import getTopStakersOfPropertyQuery from './query/getTopStakersOfProperty'
import styled, { css } from 'styled-components'

interface TopStakersProps {
  propertyAdress: string
}

const ListItem = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 8fr 2fr;
  grid-column-gap: 7.5px;
`

const StakersList = styled.ol`
  list-style: none;
  padding: 6px 0 0 0 !important;

  li {
    color: black;
    border-bottom: 1px solid lightgrey;
    padding: 6px 9px;

    &:last-child {
      border-bottom: 0;
    }
  }
`

const PlaceHolderList = styled.div<{ noData?: boolean }>`
  ${({ noData }) => css`
    display: flex;
    min-height: ${noData ? '150px' : '400px'};
    justify-content: center;
    align-items: center;
  `}
`

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`

const AccountAddress = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 250px;
  @media (min-width: 1120px) {
    max-width: 450px;
  }
`

const Position = styled.span`
  max-width: 20px;
  flex-shrink: 1;
`

const AccountContainer = styled(Flex)`
  flex-wrap: wrap;
`
const TopStakers = ({ propertyAdress }: TopStakersProps) => {
  const { data: topStakersData, loading } = useQuery(getTopStakersOfPropertyQuery, {
    variables: {
      limit: 5,
      property_address: propertyAdress
    }
  })

  const stakerItems: Array<{ account_address: string; value: number }> = topStakersData?.property_lockup

  return (
    <Flex>
      <h2>Top stakers</h2>
      {loading && (
        <PlaceHolderList>
          <div>loading...</div>
        </PlaceHolderList>
      )}

      {!loading && stakerItems.length === 0 && (
        <PlaceHolderList noData>
          <div>No data available...</div>
        </PlaceHolderList>
      )}

      <StakersList>
        {stakerItems?.map(({ account_address, value }, index) => (
          <li key={`${account_address}-${value}`}>
            <ListItem>
              <Position>{index + 1}</Position>
              <AccountContainer>
                <h3>Account address</h3>
                <AccountAddress> {`${account_address}`}</AccountAddress>
              </AccountContainer>
              <Flex>
                <h3>Value</h3>
                <span>{`${(value / Math.pow(10, 18)).toFixed(2)}`}</span>
              </Flex>
            </ListItem>
          </li>
        ))}
      </StakersList>
    </Flex>
  )
}

export default TopStakers
