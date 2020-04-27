import React, { useCallback, useMemo } from 'react'
import {
  useGetMyStakingAmount,
  useWithdrawStakingReward,
  useCancelStaking,
  useAllocate
} from 'src/fixtures/dev-kit/hooks'
import { useWithdrawHolderReward, useGetMyHolderAmount } from 'src/fixtures/dev-kit/hooks'
import { useStake } from 'src/fixtures/dev-kit/hooks'
import { WithdrawCard } from 'src/components/molecules/WithdrawCard'
import { InputFormCard } from 'src/components/molecules/InputFormCard'
import { useGetLastAllocatorAllocationResultQuery, useGetPropertyAuthenticationQuery } from '@dev/graphql'
import { ButtonCard } from 'src/components/molecules/ButtonCard'

interface Props {
  propertyAddress: string
}

export const TransactionForm = ({ propertyAddress }: Props) => {
  const { stake } = useStake()
  const { cancel } = useCancelStaking()
  const { allocate } = useAllocate()
  const { withdrawStaking } = useWithdrawStakingReward()
  const { withdrawHolder } = useWithdrawHolderReward()
  const { myStakingAmount } = useGetMyStakingAmount(propertyAddress)
  const { myHolderAmount } = useGetMyHolderAmount(propertyAddress)
  const { data } = useGetLastAllocatorAllocationResultQuery({ variables: { propertyAddress } })
  const { data: propertyAuthData } = useGetPropertyAuthenticationQuery({ variables: { propertyAddress } })
  const metricsAddress = useMemo(() => propertyAuthData?.property_authentication[0]?.metrics, [propertyAuthData])
  const handleSubmit = React.useCallback(
    (amount: string) => {
      stake(propertyAddress, amount)
    },
    [stake, propertyAddress]
  )
  const handleWithdrawStaking = useCallback(() => withdrawStaking(propertyAddress), [propertyAddress, withdrawStaking])
  const handleWithdrawHolder = useCallback(() => withdrawHolder(propertyAddress), [propertyAddress, withdrawHolder])
  const handleCancelStaking = useCallback(() => cancel(propertyAddress), [propertyAddress, cancel])
  const handleMining = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault()
      metricsAddress && allocate(metricsAddress)
    },
    [metricsAddress, allocate]
  )

  return (
    <div>
      <div style={{ margin: '0 0 46px 0' }}>
        <InputFormCard label="Stake Now" suffix="DEV" onSubmitStake={handleSubmit} />
      </div>
      <div style={{ margin: '0 0 46px 0' }}>
        <WithdrawCard
          label="Staking"
          onSubmitWithdraw={handleWithdrawStaking}
          amount={myStakingAmount}
          lastUpdate={data?.allocator_allocation_result[0]?.block_number}
          onClickMining={handleMining}
        />
      </div>
      <div style={{ margin: '0 0 46px 0' }}>
        <WithdrawCard
          label="Holder"
          onSubmitWithdraw={handleWithdrawHolder}
          amount={myHolderAmount}
          lastUpdate={data?.allocator_allocation_result[0]?.block_number}
          onClickMining={handleMining}
        />
      </div>
      <div style={{ margin: '0 0 46px 0' }}>
        <ButtonCard label="Cancel Staking" buttonLabel="Cancel" onClick={handleCancelStaking} />
      </div>
    </div>
  )
}
