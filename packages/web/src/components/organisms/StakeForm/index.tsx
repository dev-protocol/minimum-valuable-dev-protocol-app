import React, { useCallback, useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from 'react'
import { useProvider } from 'src/fixtures/wallet/hooks'
import { balanceOf, getMyStakingAmount } from 'src/fixtures/dev-kit/client'
import {
  useStake,
  useWithdrawStakingReward,
  useAPY,
  useGetMyHolderAmount,
  useGetMyStakingAmount
} from 'src/fixtures/dev-kit/hooks'
import { Card, Input } from 'antd'
import styled from 'styled-components'
import { Max } from 'src/components/molecules/Max'
import { toBigNumber, toNaturalNumber, whenDefined } from 'src/fixtures/utility'

interface Props {
  className?: string
  propertyAddress: string
}

const StyledForm = styled(Input.Search)`
  width: inherit;
  bottom: 0;
  .ant-input-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .ant-input-group-addon,
  .ant-btn {
    width: 100%;
  }
  .ant-input-search,
  .ant-btn {
    border: 3px solid #2f80ed;
  }
  .ant-input-search {
    border-right: 0;
  }
  .ant-input-group-addon {
    .ant-btn {
      border-left: 0;
      height: 100%;
      font-size: 1.2rem;
    }
  }
  input {
    font-size: 1.6rem;
  }
`

const StakeContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem;
  }
`

const FormContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  label {
    font-size: 1.2rem;
  }
`

const Estimated = styled(Card)`
  border-color: #00000055;
  background: transparent;
  .ant-card-head {
    padding: 0 1.5rem;
  }
  .ant-card-head-title {
    font-size: 0.5rem 0;
  }
  .ant-card-body {
    font-size: 1.4rem;
    padding: 1rem 1.5rem;
  }
  p {
    margin: 0;
  }
`

const createSuffix = ({ onClick }: { onClick: () => void }) => (
  <>
    <span>DEV</span>
    <Max onClick={onClick} />
  </>
)

const handleOnChange = (setter: Dispatch<SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement>) => {
  setter(event.target.value)
}

const handleClickMax = (
  setter: Dispatch<SetStateAction<string>>,
  fetcher: () => Promise<string | number | undefined>
) => async () => {
  setter(await fetcher().then(x => toNaturalNumber(x ?? 0).toFixed()))
}

export const StakeForm = ({ className, propertyAddress }: Props) => {
  const [stakeAmount, setStakeAmount] = useState<string>('')
  const [withdrawAmount, setWithdrawAmount] = useState<string>('')
  const [estimatedStakingAPY, setEstimatedStakingAPY] = useState<string>('')
  const [claimedTokens, setClaimedTokens] = useState<string | undefined>()
  const [interestTokens, setInterestTokens] = useState<string | undefined>()
  const [withdrawableTokens, setWithdrawableTokens] = useState<string>('')
  const { myHolderAmount } = useGetMyHolderAmount(propertyAddress)
  const { myStakingAmount } = useGetMyStakingAmount(propertyAddress)
  const { web3 } = useProvider()
  const { stake } = useStake()
  const { apy } = useAPY()
  const { withdrawStakingReward } = useWithdrawStakingReward()
  const stakeFor = useCallback(
    (amount: string) => {
      stake(propertyAddress, amount)
    },
    [stake, propertyAddress]
  )
  const withdrawFor = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (amount: string) => {
      // TODO: Supports partial withdrawal once the protocol core is updated
      withdrawStakingReward(propertyAddress)
    },
    [withdrawStakingReward, propertyAddress]
  )

  useEffect(() => {
    const estimate = whenDefined(apy, x => x.times(stakeAmount || 0).div(100))
    setEstimatedStakingAPY(estimate ? estimate.dp(5).toFixed() : '0')
  }, [apy, stakeAmount, setEstimatedStakingAPY])

  useEffect(() => {
    const reward = whenDefined(myStakingAmount, toNaturalNumber)
    const staking = (staked =>
      whenDefined(staked, x => (x.isGreaterThan(withdrawAmount) ? toBigNumber(withdrawAmount) : x)))(
      whenDefined(myStakingAmount, toNaturalNumber)
    )
    setClaimedTokens(whenDefined(staking, x => x.dp(5).toFixed()))
    setInterestTokens(whenDefined(reward, x => x.dp(5).toFixed()))
    setWithdrawableTokens(staking && reward ? staking.plus(reward).dp(5).toFixed() : '0')
  }, [myHolderAmount, myStakingAmount, withdrawAmount, setClaimedTokens])

  return (
    <StakeContainer className={className}>
      <FormContainer>
        <label htmlFor="stake">Stake</label>
        <StyledForm
          id="stake"
          enterButton="Stake"
          size="large"
          value={stakeAmount}
          onChange={handleOnChange(setStakeAmount)}
          onSearch={stakeFor}
          suffix={web3 && createSuffix({ onClick: handleClickMax(setStakeAmount, () => balanceOf(web3)) })}
          type="number"
        />
        <Estimated title="Estimated Annual Reward">
          <p>{estimatedStakingAPY || 0} DEV</p>
        </Estimated>
      </FormContainer>
      <FormContainer>
        <label htmlFor="withdraw">Withdraw</label>
        <StyledForm
          id="withdraw"
          enterButton="Withdraw"
          size="large"
          value={withdrawAmount}
          onChange={handleOnChange(setWithdrawAmount)}
          onSearch={withdrawFor}
          suffix={
            web3 &&
            createSuffix({
              onClick: handleClickMax(setWithdrawAmount, () => getMyStakingAmount(web3, propertyAddress))
            })
          }
          type="number"
        />
        <Estimated title="Withdrawable Amount">
          <p>
            {withdrawableTokens || 0} DEV{' '}
            {claimedTokens && interestTokens ? `(${claimedTokens} + ${interestTokens})` : ''}
          </p>
        </Estimated>
      </FormContainer>
    </StakeContainer>
  )
}
