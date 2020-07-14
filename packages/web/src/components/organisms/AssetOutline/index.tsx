import React, { useMemo } from 'react'
import { List, Button } from 'antd'
import { CircleGraph } from 'src/components/atoms/CircleGraph'
import { useStakingShare } from 'src/fixtures/dev-kit/hooks'
import { useGetPropertyAuthenticationQuery } from '@dev/graphql'
import styled from 'styled-components'
import Link from 'next/link'

interface Props {
  className?: string
  propertyAddress: string
}

const Wrap = styled.div`
  display: grid;
`
const OutlinesWrap = styled(Wrap)`
  grid-gap: 1.5rem;
`
const AssetStrengthWrap = styled(Wrap)`
  grid-auto-flow: column;
  align-items: center;
  grid-gap: 1rem;
  grid-auto-columns: 0.5fr auto;
`
const AssetStrengthValue = styled.span`
  font-size: 2rem;
  color: black;
`
const AssetsList = styled(List)`
  background: #fff;
`
const AssetListItem = styled(List.Item)`
  font-size: 1.3rem;
  color: black;
`

const AssetStrengthBase = ({ assetStrength }: { assetStrength: number }) => (
  <AssetStrengthWrap>
    <CircleGraph percentage={assetStrength} />
    <div>
      <AssetStrengthValue>{Math.round(assetStrength * 100)}%</AssetStrengthValue>
    </div>
  </AssetStrengthWrap>
)

const AssetStrength = ({ property }: { property: string }) => {
  const { stakingShare: maybeAssetStrength } = useStakingShare(property)
  const assetStrength = useMemo(() => maybeAssetStrength || 0, [maybeAssetStrength])
  return <AssetStrengthBase assetStrength={assetStrength} />
}

export const AssetOutline = ({ className, propertyAddress }: Props) => {
  const { data } = useGetPropertyAuthenticationQuery({ variables: { propertyAddress } })
  /* eslint-disable react-hooks/exhaustive-deps */
  // FYI: https://github.com/facebook/react/pull/19062
  const includedAssetList = useMemo(() => data?.property_authentication.map(e => e.authentication_id), [data])

  return (
    <div>
      <OutlinesWrap className={className}>
        <div>
          <p>Authenticated Assets</p>
          <AssetsList
            bordered
            dataSource={includedAssetList}
            renderItem={item => (
              <AssetListItem>
                <span style={{ overflow: 'auto' }}>{item}</span>
              </AssetListItem>
            )}
            style={{ maxHeight: '224px' }}
          />
          <Link href={'/auth/[property]'} as={`/auth/${propertyAddress}`}>
            <Button type="dashed" size="small" style={{ marginTop: '0.5rem' }}>
              Add your asset
            </Button>
          </Link>
        </div>
        <div>
          <p>Staking Ratio</p>
          <AssetStrength property={propertyAddress} />
        </div>
      </OutlinesWrap>
    </div>
  )
}
