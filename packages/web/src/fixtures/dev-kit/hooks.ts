import {
  getMyStakingAmount,
  getRewardsAmount,
  getTotalStakingAmount,
  withdrawHolderAmount,
  getMyHolderAmount
} from './client'
import { SWRCachePath } from './cache-path'
import { UnwrapFunc, toNaturalNumber } from 'src/fixtures/utility'
import useSWR from 'swr'
import { message } from 'antd'
import { useState } from 'react'

export const useGetTotalRewardsAmount = (propertyAddress: string) => {
  const { data, error } = useSWR<UnwrapFunc<typeof getRewardsAmount>, Error>(
    SWRCachePath.getTotalRewardsAmount(propertyAddress),
    () => getRewardsAmount(propertyAddress),
    { onError: err => message.error(err.message) }
  )
  return { totalRewardsAmount: data ? toNaturalNumber(data) : undefined, error }
}

export const useWithdrawHolderReward = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)

  const withdraw = async (propertyAddress: string) => {
    setIsLoading(true)
    setError(undefined)
    return withdrawHolderAmount(propertyAddress)
      .then(() => setIsLoading(false))
      .catch(err => {
        setError(err)
        message.error(err.message)
        setIsLoading(false)
      })
  }

  return { withdraw, isLoading, error }
}

export const useGetMyHolderAmount = (propertyAddress: string) => {
  const { data, error } = useSWR<UnwrapFunc<typeof getMyHolderAmount>, Error>(
    SWRCachePath.getMyHolderAmount(propertyAddress),
    () => getMyHolderAmount(propertyAddress),
    { onError: err => message.error(err.message) }
  )
  return { myHolderAmount: data ? toNaturalNumber(data) : undefined, error }
}

export const useGetTotalStakingAmount = (propertyAddress: string) => {
  const { data, error } = useSWR<UnwrapFunc<typeof getTotalStakingAmount>, Error>(
    SWRCachePath.getTotalStakingAmount(propertyAddress),
    () => getTotalStakingAmount(propertyAddress),
    { onError: err => message.error(err.message) }
  )
  return { totalStakingAmount: data ? toNaturalNumber(data) : undefined, error }
}

export const useGetMyStakingAmount = (propertyAddress: string) => {
  const { data, error } = useSWR<UnwrapFunc<typeof getMyStakingAmount>, Error>(
    SWRCachePath.getMyStakingAmount(propertyAddress),
    () => getMyStakingAmount(propertyAddress),
    {
      onError: err => message.error(err.message)
    }
  )

  return { myStakingAmount: data ? toNaturalNumber(data) : undefined, error }
}
