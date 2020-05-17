import BigNumber from 'bignumber.js'
export const useGetTotalRewardsAmount = () => {
  return { totalRewardsAmount: new BigNumber(10000) }
}

export const useGetTotalStakingAmount = () => {
  return { totalStakingAmount: new BigNumber(10000) }
}

export const useGetMyHolderAmount = () => {
  return { myHolderAmount: new BigNumber(6000) }
}

export const useGetMyStakingRewardAmount = () => {
  return { myStakingRewardAmount: new BigNumber(5000) }
}

export const useGetMyStakingAmount = () => {
  return { myStakingAmount: new BigNumber(5000) }
}

export const useWithdrawHolderReward = () => {
  return { withdraw: () => {} }
}

export const useWithdrawStakingReward = () => {
  return { withdraw: () => {} }
}

export const useStake = () => {
  return { stake: () => {} }
}

export const useCancelStaking = () => {
  return { cancel: () => {} }
}

export const useAssetStrength = () => {
  return { assetStrength: 0.2553481 }
}

export const useAllocate = () => {
  return { allocate: () => {} }
}

export const useCreateProperty = () => {
  return { createProperty: () => {} }
}

export const useMarketScheme = () => {
  return { marketScheme: () => {} }
}
