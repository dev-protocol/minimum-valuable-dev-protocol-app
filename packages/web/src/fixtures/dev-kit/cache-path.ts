export const SWRCachePath = {
  getTotalRewardsAmount: (propertyAddress: string, user?: string) =>
    `propertyAddresses/${user}${propertyAddress}/getTotalRewardsAmount`,
  getTotalStakingAmount: (propertyAddress: string, user?: string) =>
    `propertyAddresses/${user}${propertyAddress}/getTotalStakingAmount`,
  getMyHolderAmount: (propertyAddress: string, user?: string) =>
    `propertyAddresses/${user}${propertyAddress}/getMyHolderAmount`,
  getMyStakingRewardAmount: (propertyAddress: string, user?: string) =>
    `propertyAddresses/${user}${propertyAddress}/getMyStakingRewardAmount`,
  getMyStakingAmount: (propertyAddress: string, user?: string) =>
    `propertyAddresses/${user}${propertyAddress}/getMyStakingAmount`,
  getTotalStakingAmountOnProtocol: (user?: string) => `getTotalStakingAmountOnProtocol/${user}`,
  calculateMaxRewardsPerBlock: (user?: string) => `calculateMaxRewardsPerBlock/${user}`,
  totalSupply: (user?: string) => `totalSupply/${user}`,
  holdersShare: (amount?: string, lockedups?: string, user?: string) =>
    `amount/${amount}/lockedups/${lockedups}/holdersShare/${user}`,
  propertyAuthor: (propertyAddress?: string, user?: string) => `propertyAddresses/${user}${propertyAddress}/author`,
  balanceOf: (user?: string) => `balanceOf/${user}`,
  allClaimedRewards: (user?: string) => `allClaimedRewards/${user}`,
  propertyName: (propertyAddress?: string, user?: string) => `propertyAddresses/${user}${propertyAddress}/name`,
  balanceOfProperty: (propertyAddress?: string, user?: string) =>
    `propertyAddresses/${user}${propertyAddress}/balanceOf`
} as const
