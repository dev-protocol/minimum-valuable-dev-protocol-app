import { contractFactory } from '@devprtcl/dev-kit-js'
import { addresses } from '@devprtcl/dev-kit-js'
import { getAccountAddress } from 'src/fixtures/wallet/utility'

const newClient = () => {
  const { ethereum } = window
  if (ethereum) {
    return contractFactory(ethereum)
  }
  return undefined
}

export const getRewardsAmount = async (propertyAddress: string) => {
  const client = newClient()
  if (client) {
    return client
      .withdraw(await client.registry(addresses.eth.main.registry).withdraw())
      .getRewardsAmount(propertyAddress)
  }
  return undefined
}

export const getTotalStakingAmount = async (proepertyAddress: string) => {
  const client = newClient()
  if (client) {
    return client.lockup(await client.registry(addresses.eth.main.registry).lockup()).getPropertyValue(proepertyAddress)
  }
  return undefined
}

export const getMyStakingAmount = async (propertyAddress: string) => {
  const client = newClient()
  const accountAddress = getAccountAddress()
  if (client && accountAddress) {
    return client
      .lockup(await client.registry(addresses.eth.main.registry).lockup())
      .getValue(propertyAddress, accountAddress)
  }
  return undefined
}

export const withdrawHolderAmount = async (propertyAddress: string) => {
  const client = newClient()
  if (!client) throw new Error(`No wallet`)
  return client.withdraw(await client.registry(addresses.eth.main.registry).withdraw()).withdraw(propertyAddress)
}
