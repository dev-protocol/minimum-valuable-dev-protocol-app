import { abi } from './abi'
import Web3 from 'web3'
import { Contract, EventData } from 'web3-eth-contract'
import { createContract } from 'src/fixtures/utility/contract-client'
import { toBigNumber, toEVMBigNumber } from 'src/fixtures/utility'
import { GEYSER_ETHDEV_V2_ADDRESS } from '../constants/address'
import { utils } from '@devprtcl/dev-kit-js'
import BigNumber from 'bignumber.js'

const { execute } = utils
const client: Map<string, Contract> = new Map()

export const getClient = (contractAddress = GEYSER_ETHDEV_V2_ADDRESS): [] | [Contract, Web3] => {
  if (typeof window === 'undefined') {
    return []
  }
  const { ethereum } = window
  const { WEB3_PROVIDER_ENDPOINT } = process.env
  const web3 = ethereum ? new Web3(ethereum) : WEB3_PROVIDER_ENDPOINT ? new Web3(WEB3_PROVIDER_ENDPOINT) : null
  if (!web3) {
    return []
  }

  const stored = client.get(contractAddress)
  if (stored) {
    return [stored, web3]
  }

  const contract = (createContract(abi, contractAddress, web3) as unknown) as Contract
  client.set(contractAddress, contract)

  return [contract, web3]
}

export const totalStaked = async (): Promise<BigNumber> => {
  return (([contract]) =>
    contract
      ? execute({
          contract,
          method: 'totalStaked'
        })
      : Promise.resolve(''))(getClient()).then(toEVMBigNumber)
}

export const totalStakingShares = async (): Promise<BigNumber> => {
  return (([contract]) =>
    contract
      ? execute({
          contract,
          method: 'totalStakingShares'
        })
      : Promise.resolve(''))(getClient()).then(toEVMBigNumber)
}

export const stake = async (amount: BigNumber) => {
  return (([contract, client]) =>
    contract && client
      ? execute({
          contract,
          client,
          mutation: true,
          method: 'stake',
          args: [amount.toFixed(), '0x0']
        })
      : Promise.resolve())(getClient())
}

export const unstake = async (amount: BigNumber) => {
  return (([contract, client]) =>
    contract && client
      ? execute({
          contract,
          client,
          mutation: true,
          method: 'unstake',
          args: [amount.toFixed(), '0x0']
        })
      : Promise.resolve())(getClient())
}

export const totalStakedFor = async (address: string): Promise<BigNumber> => {
  return (([contract]) =>
    contract
      ? execute({
          contract,
          method: 'totalStakedFor',
          args: [address]
        })
      : Promise.resolve(''))(getClient()).then(toEVMBigNumber)
}

type UnlockSchedule = {
  initialLockedShares: string
  unlockedShares: string
  lastUnlockTimestampSec: string
  endAtSec: string
  durationSec: string
}

export const unlockSchedules = async (index: number): Promise<UnlockSchedule> => {
  return (([contract]) =>
    contract
      ? execute<UnlockSchedule>({
          contract,
          method: 'unlockSchedules',
          args: [index.toFixed()]
        })
      : Promise.resolve({
          initialLockedShares: '0',
          unlockedShares: '0',
          lastUnlockTimestampSec: '0',
          endAtSec: '0',
          durationSec: '0'
        }))(getClient())
}

export const unlockScheduleCount = async (): Promise<number> => {
  return (([contract]) =>
    contract
      ? execute({
          contract,
          method: 'unlockScheduleCount'
        })
      : Promise.resolve(''))(getClient()).then(Number)
}

export const totalLocked = async (): Promise<BigNumber> => {
  return (([contract]) =>
    contract
      ? execute({
          contract,
          method: 'totalLocked'
        })
      : Promise.resolve(''))(getClient()).then(toEVMBigNumber)
}

export const totalUnlocked = async (): Promise<BigNumber> => {
  return (([contract]) =>
    contract
      ? execute({
          contract,
          method: 'totalUnlocked'
        })
      : Promise.resolve(''))(getClient()).then(toEVMBigNumber)
}

export const finalUnlockSchedules = async (): Promise<undefined | UnlockSchedule> => {
  const count = await unlockScheduleCount()
  const schedules = await Promise.all(new Array(count).fill(0).map((_, index) => unlockSchedules(index)))
  return schedules.length > 0
    ? schedules.reduce((a, c) => (toBigNumber(a.endAtSec).isGreaterThan(c.endAtSec) ? a : c))
    : undefined
}

export const unstakeQuery = async (amount: BigNumber): Promise<BigNumber> => {
  return (([contract, client]) =>
    contract && client
      ? execute({
          contract,
          client,
          method: 'unstakeQuery',
          args: [amount.toFixed()]
        })
      : Promise.resolve(''))(getClient()).then(toEVMBigNumber)
}

export const unlockTokens = async (): Promise<BigNumber> => {
  return (([contract]) =>
    contract
      ? execute({
          contract,
          method: 'unlockTokens'
        })
      : Promise.resolve(''))(getClient()).then(toEVMBigNumber)
}

export const allTokensClaimed = async (): Promise<EventData[]> => {
  return (([contract]) =>
    contract ? contract.getPastEvents('TokensClaimed', { fromBlock: 0, toBlock: 'latest' }) : Promise.resolve([]))(
    getClient()
  )
}

export const getStaked = async (user: string): Promise<EventData[]> => {
  return (([contract]) =>
    contract
      ? contract.getPastEvents('Staked', { filter: { user }, fromBlock: 0, toBlock: 'latest' })
      : Promise.resolve([]))(getClient())
}

export const bonusPeriodSec = async (): Promise<BigNumber> => {
  return (([contract]) =>
    contract
      ? execute({
          contract,
          method: 'bonusPeriodSec'
        })
      : Promise.resolve(''))(getClient()).then(toEVMBigNumber)
}

export const startBonus = async (): Promise<BigNumber> => {
  return (([contract]) =>
    contract
      ? execute({
          contract,
          method: 'startBonus'
        })
      : Promise.resolve(''))(getClient()).then(toEVMBigNumber)
}

type Accounting = {
  0: string
  1: string
  2: string
  3: string
  4: string
  5: string
}

type AccountingObject = {
  totalLocked: string
  totalUnlocked: string
  totalsStakingShareSeconds: string
  totalStakingShareSeconds: string
  totalUserRewards: string
  now: string
}

export const updateAccounting = async (): Promise<AccountingObject> => {
  return (([contract, client]) =>
    contract && client
      ? execute<Accounting>({
          contract,
          client,
          method: 'updateAccounting'
        })
      : Promise.resolve({
          0: '0',
          1: '0',
          2: '0',
          3: '0',
          4: '0',
          5: '0'
        }))(
    getClient()
  ).then(
    ({
      0: totalLocked,
      1: totalUnlocked,
      2: totalsStakingShareSeconds,
      3: totalStakingShareSeconds,
      4: totalUserRewards,
      5: now
    }) => ({ totalLocked, totalUnlocked, totalsStakingShareSeconds, totalStakingShareSeconds, totalUserRewards, now })
  )
}
