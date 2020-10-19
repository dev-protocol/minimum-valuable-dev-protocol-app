import React from 'react'
import styled from 'styled-components'
import { useListTopSupportingAccountQuery } from '@dev/graphql'
import { useRouter } from 'next/router'

type Props = {
  accountAddress: string
}

const TopSupportingContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`

const SupportSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  img {
    border-radius: 90px;
  }
`

const AccountAddress = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100px;
`

const TopSupporting = ({ accountAddress }: Props) => {
  const { data, loading } = useListTopSupportingAccountQuery({
    variables: {
      account_address: accountAddress,
      limit: 5
    }
  })

  const router = useRouter()

  console.log('top supporting data: ', data?.account_lockup)

  return (
    <div>
      {!loading && data?.account_lockup?.length === 0 && <div>This author doesnt support other projects</div>}
      {loading && <div>Loading...</div>}
      <TopSupportingContainer>
        {data?.account_lockup &&
          data?.account_lockup.map(({ property_address, value }, index) => (
            <SupportSection key={index} onClick={() => router.push({ pathname: `/${property_address}` })}>
              <img
                width="100px"
                height="100px"
                src="https://res.cloudinary.com/haas-storage/image/upload/v1598963050/72989_gve7hf.jpg"
              />
              <AccountAddress>{property_address}</AccountAddress>
              <span>{`${(value / Math.pow(10, 18)).toFixed(0)}`}</span>
            </SupportSection>
          ))}
      </TopSupportingContainer>
    </div>
  )
}

export default TopSupporting
