import Web3 from 'web3'
import { EventData } from 'web3-eth-contract'
import { contractFactory } from '@devprtcl/dev-kit-js'
import { getAccountAddress } from 'src/fixtures/wallet/utility'
import { getContractAddress } from './get-contract-address'
import { client as devClient } from '@devprtcl/dev-kit-js'
import BigNumber from 'bignumber.js'

const newClient = (web3: Web3) => {
  return contractFactory(web3.currentProvider)
}

export const getRewardsAmount = async (web3: Web3, propertyAddress: string) => {
  const client = newClient(web3)
  if (client) {
    return client.withdraw(await getContractAddress(client, 'withdraw')).getRewardsAmount(propertyAddress)
  }
  return undefined
}

export const getTotalStakingAmount = async (web3: Web3, proepertyAddress: string) => {
  const client = newClient(web3)
  if (client) {
    return client.lockup(await getContractAddress(client, 'lockup')).getPropertyValue(proepertyAddress)
  }
  return undefined
}

export const getTotalStakingAmountOnProtocol = async (web3: Web3) => {
  const client = newClient(web3)
  if (client) {
    return client.lockup(await getContractAddress(client, 'lockup')).getAllValue()
  }
  return undefined
}

export const getMyHolderAmount = async (web3: Web3, propertyAddress: string) => {
  const client = newClient(web3)
  const accountAddress = await getAccountAddress(web3)
  if (client && accountAddress) {
    return client
      .withdraw(await getContractAddress(client, 'withdraw'))
      .calculateWithdrawableAmount(propertyAddress, accountAddress)
  }
  return undefined
}

export const getMyStakingRewardAmount = async (web3: Web3, propertyAddress: string) => {
  const client = newClient(web3)
  const accountAddress = await getAccountAddress(web3)
  if (client && accountAddress) {
    return client
      .lockup(await getContractAddress(client, 'lockup'))
      .calculateWithdrawableInterestAmount(propertyAddress, accountAddress)
  }
  return undefined
}

export const getMyStakingAmount = async (web3: Web3, propertyAddress: string) => {
  const client = newClient(web3)
  const accountAddress = await getAccountAddress(web3)
  if (client && accountAddress) {
    return client.lockup(await getContractAddress(client, 'lockup')).getValue(propertyAddress, accountAddress)
  }
  return undefined
}

export const withdrawHolderAmount = async (web3: Web3, propertyAddress: string) => {
  const client = newClient(web3)
  if (!client) throw new Error(`No wallet`)
  return client.withdraw(await getContractAddress(client, 'withdraw')).withdraw(propertyAddress)
}

export const withdrawStakingAmount = async (web3: Web3, propertyAddress: string, amount: BigNumber) => {
  const client = newClient(web3)
  if (!client) throw new Error(`No wallet`)
  return client.lockup(await getContractAddress(client, 'lockup')).withdraw(propertyAddress, amount.toFixed())
}

export const stakeDev = async (web3: Web3, propertyAddress: string, amount: string) => {
  const client = newClient(web3)
  if (!client) throw new Error(`No wallet`)
  return client.dev(await getContractAddress(client, 'token')).deposit(propertyAddress, amount)
}

export const calculateMaxRewardsPerBlock = async (web3: Web3) => {
  const client = newClient(web3)
  if (client) {
    return client.allocator(await getContractAddress(client, 'allocator')).calculateMaxRewardsPerBlock()
  }
  return undefined
}

export const createProperty = async (web3: Web3, name: string, symbol: string, author: string) => {
  const client = newClient(web3)
  if (process.env.NODE_ENV == 'production' && client) {
    return client.propertyFactory(await getContractAddress(client, 'propertyFactory')).create(name, symbol, author)
  } else if (process.env.NODE_ENV == 'development') {
    console.log('env:', process.env.NODE_ENV, 'return mock value')
    return 'Dummy:0xd5f3c1bA399E000B1a76210d7dB12bb5eefA8e47'
  }
  return undefined
}

export const marketScheme = async (web3: Web3, marketAddress: string) => {
  const client = newClient(web3)
  if (client) {
    return client.market(marketAddress).schema()
  }
  return []
}

export const authenticate = async (web3: Web3, marketAddress: string, propertyAddress: string, args: string[]) => {
  const client = newClient(web3)
  if (process.env.NODE_ENV == 'production' && client) {
    const _args = ['', '', '', '', ''].map((x, i) => (args[i] ? args[i] : x))
    return client.market(marketAddress).authenticate(propertyAddress, _args, {
      metricsFactory: await getContractAddress(client, 'metricsFactory')
    })
  } else if (process.env.NODE_ENV == 'development') {
    console.log('env:', process.env.NODE_ENV, 'return mock value')
    return 'Dummy:metrics-address'
  }
  return undefined
}

export const createAndAuthenticate = async (
  web3: Web3,
  name: string,
  symbol: string,
  marketAddress: string,
  args: string[]
) => {
  const client = newClient(web3)
  if (client) {
    return client
      .propertyFactory(await getContractAddress(client, 'propertyFactory'))
      .createAndAuthenticate(name, symbol, marketAddress, args, {
        metricsFactory: await getContractAddress(client, 'metricsFactory')
      })
  }
  return undefined
}

export const totalSupply = async (web3: Web3) => {
  const client = newClient(web3)
  if (client) {
    return client.dev(await getContractAddress(client, 'token')).totalSupply()
  }
  return undefined
}

export const holdersShare = async (web3: Web3, amount: string, lockedups: string) => {
  const client = newClient(web3)
  if (client) {
    return client.policy(await getContractAddress(client, 'policy')).holdersShare(amount, lockedups)
  }
  return undefined
}

export const createGetVotablePolicy = async (web3: Web3) => {
  const client = newClient(web3)
  if (client) {
    const policyGroup = client.policyGroup(await getContractAddress(client, 'policyGroup'))
    const [policies, currentPolicy] = await Promise.all([
      devClient.createGetVotablePolicy(policyGroup)(),
      getContractAddress(client, 'policy')
    ])
    return policies.filter(p => p !== currentPolicy)
  }
  throw new Error(`No wallet`)
}

export const propertyAuthor = async (web3: Web3, propertyAddress: string) => {
  const client = newClient(web3)
  if (client) {
    return client.property(propertyAddress).author()
  }
  return undefined
}

export const balanceOf = async (web3: Web3) => {
  const client = newClient(web3)
  const accountAddress = await getAccountAddress()
  if (client && accountAddress) {
    return client.dev(await getContractAddress(client, 'token')).balanceOf(accountAddress)
  }
  return undefined
}

export const allClaimedRewards = async (): Promise<EventData[]> => {
  const client = newClient()
  const accountAddress = await getAccountAddress()
  if (client && accountAddress) {
    return client
      .dev(await getContractAddress(client, 'token'))
      .contract()
      .getPastEvents('Transfer', {
        filter: { from: '0x0000000000000000000000000000000000000000', to: accountAddress },
        fromBlock: 0,
        toBlock: 'latest'
      })
  }
  return []
}
