import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'

interface Props {
  apy?: BigNumber
  annualSupplyGrowthRatio?: BigNumber
}

const Wrap = styled.div`
  padding: 0.1rem 0.3rem;
  background: #ffffff;
  border-radius: 5px;
  color: black;
`
const Badge = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  align-items: center;
  grid-gap: 0.5rem;
`
const Statistics = styled.span`
  font-family: monospace;
  font-weight: bold;
`
const StatisticsInt = styled.span`
  letter-spacing: 0.1rem;
`
const StatisticsDecimal = styled.span`
  font-weight: normal;
  font-size: 0.9em;
`

const int = (v: BigNumber): string => v.integerValue(BigNumber.ROUND_DOWN).toString()
const decimal = (v: BigNumber): string => v.minus(v.integerValue(BigNumber.ROUND_DOWN)).toString().replace('0.', '.')
const values = (v: BigNumber) => (
  <>
    <StatisticsInt>{int(v)}</StatisticsInt>
    <StatisticsDecimal>{decimal(v)}%</StatisticsDecimal>
  </>
)

export const SupplySummaly = ({ apy, annualSupplyGrowthRatio }: Props) => {
  return (
    <Wrap>
      <Badge>
        <span>APY:</span>
        <Statistics>{apy ? values(apy.dp(5)) : '-'}</Statistics>
      </Badge>
      <Badge>
        <span>Supply+/y:</span>
        <Statistics>{annualSupplyGrowthRatio ? values(annualSupplyGrowthRatio.dp(5)) : '-'}</Statistics>
      </Badge>
    </Wrap>
  )
}
