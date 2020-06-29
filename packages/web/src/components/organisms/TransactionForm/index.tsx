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
import { getBlockNumber } from 'src/fixtures/wallet/utility'
import styled from 'styled-components'
import { useEffectAsync } from 'src/fixtures/utility'
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
  const [timer, setTimer] = useState<NodeJS.Timeout>()

  const { stake } = useStake()
  const { cancel } = useCancelStaking()
  const { withdrawStaking } = useWithdrawStaking()
  const { withdrawStakingReward } = useWithdrawStakingReward()
  const { withdrawHolder } = useWithdrawHolderReward()
  const { myStakingRewardAmount } = useGetMyStakingRewardAmount(propertyAddress)
  const { myHolderAmount } = useGetMyHolderAmount(propertyAddress)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkWithdrawable = useCallback(
    () =>
      Promise.all([getWithdrawalStatus(propertyAddress), getBlockNumber()]).then(([withdrawStatus, blockNumber]) => {
        setWithdrawable(Boolean(withdrawStatus && blockNumber && withdrawStatus <= blockNumber))
        setRemainBlocks((withdrawStatus || 0) - (blockNumber || 0))
        withdrawable && setIsCountingBlocks(false)
      }),
    [propertyAddress, withdrawable]
  )

  const startTimer = useCallback(() => {
    /*
      The block number is incremented once every 13-15 seconds.
      So this process should be executed every 15 seconds.
    */
    setTimer(
      setInterval(async () => {
        await checkWithdrawable()
      }, 15000)
    )
  }, [checkWithdrawable])

  useEffectAsync(async () => {
    /*
      The timer will start when the cancel button is pressed.
      And when the process is completed, it is stopped.
    */
    if (isCountingBlocks && !withdrawable) {
      startTimer()
    } else {
      timer && clearInterval(timer)
    }
  }, [isCountingBlocks, withdrawable])

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
