import React, { useCallback } from 'react'
import { Space } from 'antd'
import { useGetMyStakingAmount, useWithdrawStakingReward, useCancelStaking } from 'src/fixtures/dev-kit/hooks'
import { useWithdrawHolderReward, useGetMyHolderAmount } from 'src/fixtures/dev-kit/hooks'
import { useStake } from 'src/fixtures/dev-kit/hooks'
import { WithdrawCard } from 'src/components/molecules/WithdrawCard'
import { InputFormCard } from 'src/components/molecules/InputFormCard'
import { useGetLastAllocatorAllocationResultQuery } from '@dev/graphql'
import { ButtonCard } from 'src/components/molecules/ButtonCard'

interface Props {
  propertyAddress: string
}

export const TransactionForm = ({ propertyAddress }: Props) => {
  const { stake } = useStake()
  const { withdrawStaking } = useWithdrawStakingReward()
  const { withdrawHolder } = useWithdrawHolderReward()
  const { myStakingAmount } = useGetMyStakingAmount(propertyAddress)
  const { myHolderAmount } = useGetMyHolderAmount(propertyAddress)
  const { cancel } = useCancelStaking()
  const { data } = useGetLastAllocatorAllocationResultQuery({ variables: { propertyAddress } })
  const handleSubmit = React.useCallback(
    (amount: string) => {
      stake(propertyAddress, amount)
    },
    [stake, propertyAddress]
  )
  const handleWithdrawStaking = useCallback(() => withdrawStaking(propertyAddress), [propertyAddress, withdrawStaking])
  const handleWithdrawHolder = useCallback(() => withdrawHolder(propertyAddress), [propertyAddress, withdrawHolder])
  const handleCancelStaking = useCallback(() => cancel(propertyAddress), [propertyAddress, cancel])

  return (
    <Space size={46} direction="vertical">
      <InputFormCard label="Stake Now" suffix="DEV" onSubmitStake={handleSubmit} />
      <WithdrawCard
        label="Staking"
        onSubmitWithdraw={handleWithdrawStaking}
        amount={myStakingAmount}
        lastUpdate={data?.allocator_allocation_result[0].block_number}
      />
      <WithdrawCard
        label="Holder"
        onSubmitWithdraw={handleWithdrawHolder}
        amount={myHolderAmount}
        lastUpdate={data?.allocator_allocation_result[0].block_number}
      />
      <ButtonCard label="Cancel Staking" buttonLabel="Cancel" onClick={handleCancelStaking} />
    </Space>
  )
}
