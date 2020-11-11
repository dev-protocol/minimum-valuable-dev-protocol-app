import React from 'react'
import BigNumber from 'bignumber.js'
import { Button } from 'antd'
import styled from 'styled-components'
import { useCurrency } from 'src/fixtures/currency/hooks'

interface Props {
  label: 'Stakers' | 'Creators'
  amount?: BigNumber
  onSubmitWithdraw: () => void
}

const Wrap = styled.div``
const Form = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
`
// const Statistic = styled.div`
//   font-size: 1rem;
//   color: black;
//   margin-bottom: 1rem;
//   @media (min-width: 768px) {
//     margin-bottom: 0;
//   }
// `

export const WithdrawForm = ({ amount, label, onSubmitWithdraw }: Props) => {
  const { currency, toCurrency } = useCurrency()

  return (
    <Wrap>
      <p>
        Withdraw {label} Reward {toCurrency(amount).dp(1).toFixed()} {currency} available
      </p>
      <Form>
        <Button type="primary" size="large" onClick={onSubmitWithdraw}>
          Withdraw
        </Button>
      </Form>
    </Wrap>
  )
}
