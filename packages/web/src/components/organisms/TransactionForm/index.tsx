import React, { useState, useCallback } from 'react'
import {
  useWithdrawStaking,
  useWithdrawStakingReward,
  useCancelStaking,
  useGetMyStakingRewardAmount
} from 'src/fixtures/dev-kit/hooks'
import { useWithdrawHolderReward, useGetMyHolderAmount } from 'src/fixtures/dev-kit/hooks'
import { useStake } from 'src/fixtures/dev-kit/hooks'
import { WithdrawCard } from 'src/components/molecules/WithdrawCard'
import { InputFormCard } from 'src/components/molecules/InputFormCard'
import { CancelStakingCard } from 'src/components/molecules/CancelStakingCard'
import { useBlockNumberStream } from 'src/fixtures/wallet/hooks'
import styled from 'styled-components'
import { getWithdrawalStatus } from 'src/fixtures/dev-kit/client'

interface Props {
  propertyAddress: string
}

const Wrap = styled.div`
  display: grid;
  grid-gap: 1rem;
`

export const TransactionForm = ({ propertyAddress }: Props) => {
  const [withdrawable, setWithdrawable] = useState(false)
  const [isCountingBlocks, setIsCountingBlocks] = useState(false)
  const [remainBlocks, setRemainBlocks] = useState(0)

  const { stake } = useStake()
  const { cancel } = useCancelStaking()
  const { withdrawStaking } = useWithdrawStaking()
  const { withdrawStakingReward } = useWithdrawStakingReward()
  const { withdrawHolder } = useWithdrawHolderReward()
  const { myStakingRewardAmount } = useGetMyStakingRewardAmount(propertyAddress)
  const { myHolderAmount } = useGetMyHolderAmount(propertyAddress)
  const { blockNumber } = useBlockNumberStream(isCountingBlocks)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkWithdrawable = useCallback(
    () =>
      getWithdrawalStatus(propertyAddress).then(withdrawStatus => {
        setWithdrawable(Boolean(withdrawStatus && blockNumber && withdrawStatus <= blockNumber))
        setRemainBlocks((withdrawStatus || 0) - (blockNumber || 0))
        withdrawable && setIsCountingBlocks(false)
      }),
    [propertyAddress, withdrawable, blockNumber]
  )
  const handleSubmit = React.useCallback(
    (amount: string) => {
      stake(propertyAddress, amount)
    },
    [stake, propertyAddress]
  )
  const handleWithdrawStakingReward = useCallback(() => withdrawStakingReward(propertyAddress), [
    propertyAddress,
    withdrawStakingReward
  ])
  const handleWithdrawHolder = useCallback(() => withdrawHolder(propertyAddress), [propertyAddress, withdrawHolder])
  const handleCancelStaking = useCallback(() => {
    setIsCountingBlocks(true)
    cancel(propertyAddress)
      .then(checkWithdrawable)
      .catch(() => {
        setIsCountingBlocks(false)
        setWithdrawable(false)
      })
  }, [propertyAddress, cancel, checkWithdrawable])
  const handleWithdrawStaking = useCallback(() => {
    withdrawStaking(propertyAddress)
  }, [propertyAddress, withdrawStaking])

  return (
    <Wrap>
      <InputFormCard label="Stake Now" suffix="DEV" onSubmitStake={handleSubmit} />
      <WithdrawCard label="Staking" onSubmitWithdraw={handleWithdrawStakingReward} amount={myStakingRewardAmount} />
      <WithdrawCard label="Holder" onSubmitWithdraw={handleWithdrawHolder} amount={myHolderAmount} />
      <CancelStakingCard
        onClickCancel={handleCancelStaking}
        onClickWithdraw={handleWithdrawStaking}
        remainBlocks={remainBlocks}
        isCompleted={withdrawable}
      />
    </Wrap>
  )
}
