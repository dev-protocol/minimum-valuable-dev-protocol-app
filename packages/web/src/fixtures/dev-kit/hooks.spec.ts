import { renderHook } from '@testing-library/react-hooks'
import {
  useGetTotalRewardsAmount,
  useGetTotalStakingAmount,
  useGetMyStakingAmount,
  useWithdrawHolderReward,
  useGetMyHolderAmount
} from './hooks'
import useSWR from 'swr'
import { toNaturalNumber } from 'src/fixtures/utility'
import { withdrawHolderAmount } from './client'

jest.mock('swr')
jest.mock('src/fixtures/utility')
jest.mock('src/fixtures/dev-kit/client.ts')

describe('dev-kit hooks', () => {
  describe('useGetTotalRewardsAmount', () => {
    test('data is undefined', () => {
      const data = undefined
      const error = undefined
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      const { result } = renderHook(() => useGetTotalRewardsAmount('property-address'))
      expect(result.current.totalRewardsAmount).toBe(data)
    })

    test('success fetching data', () => {
      const data = '10000'
      const error = undefined
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      ;(toNaturalNumber as jest.Mock).mockImplementation(() => Number(data))
      const { result } = renderHook(() => useGetTotalRewardsAmount('property-address'))
      expect(result.current.totalRewardsAmount).toBe(Number(data))
    })

    test('failure fetching data', () => {
      const data = undefined
      const errorMessage = 'error'
      const error = new Error(errorMessage)
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      ;(toNaturalNumber as jest.Mock).mockImplementation(() => Number(data))
      const { result } = renderHook(() => useGetTotalRewardsAmount('property-address'))
      expect(result.current.error).toBe(error)
      expect(result.current.error?.message).toBe(errorMessage)
    })
  })

  describe('useGetTotalStakingAmount', () => {
    test('data is undefined', () => {
      const data = undefined
      const error = undefined
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      const { result } = renderHook(() => useGetTotalStakingAmount('property-address'))
      expect(result.current.totalStakingAmount).toBe(data)
    })

    test('success fetching data', () => {
      const data = '10000'
      const error = undefined
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      ;(toNaturalNumber as jest.Mock).mockImplementation(() => Number(data))
      const { result } = renderHook(() => useGetTotalStakingAmount('property-address'))
      expect(result.current.totalStakingAmount).toBe(Number(data))
    })

    test('failure fetching data', () => {
      const data = undefined
      const errorMessage = 'error'
      const error = new Error(errorMessage)
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      ;(toNaturalNumber as jest.Mock).mockImplementation(() => Number(data))
      const { result } = renderHook(() => useGetTotalStakingAmount('property-address'))
      expect(result.current.error).toBe(error)
      expect(result.current.error?.message).toBe(errorMessage)
    })
  })

  describe('useGetMyHolderAmount', () => {
    test('data is undefined', () => {
      const data = undefined
      const error = undefined
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      const { result } = renderHook(() => useGetMyHolderAmount('property-address'))
      expect(result.current.myHolderAmount).toBe(data)
    })

    test('success fetching data', () => {
      const data = '10000'
      const error = undefined
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      ;(toNaturalNumber as jest.Mock).mockImplementation(() => Number(data))
      const { result } = renderHook(() => useGetMyHolderAmount('property-address'))
      expect(result.current.myHolderAmount).toBe(Number(data))
    })

    test('failure fetching data', () => {
      const data = undefined
      const errorMessage = 'error'
      const error = new Error(errorMessage)
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      ;(toNaturalNumber as jest.Mock).mockImplementation(() => Number(data))
      const { result } = renderHook(() => useGetMyHolderAmount('property-address'))
      expect(result.current.error).toBe(error)
      expect(result.current.error?.message).toBe(errorMessage)
    })
  })

  describe('useGetMylStakingAmount', () => {
    test('data is undefined', () => {
      const data = undefined
      const error = undefined
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      const { result } = renderHook(() => useGetMyStakingAmount('property-address'))
      expect(result.current.myStakingAmount).toBe(data)
    })

    test('success fetching data', () => {
      const data = '10000'
      const error = undefined
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      ;(toNaturalNumber as jest.Mock).mockImplementation(() => Number(data))
      const { result } = renderHook(() => useGetMyStakingAmount('property-address'))
      expect(result.current.myStakingAmount).toBe(Number(data))
    })

    test('failure fetching data', () => {
      const data = undefined
      const errorMessage = 'error'
      const error = new Error(errorMessage)
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      ;(toNaturalNumber as jest.Mock).mockImplementation(() => Number(data))
      const { result } = renderHook(() => useGetMyStakingAmount('property-address'))
      expect(result.current.error).toBe(error)
      expect(result.current.error?.message).toBe(errorMessage)
    })
  })

  describe('useWithdrawHolderReward', () => {
    test('success withdraw', async () => {
      ;(withdrawHolderAmount as jest.Mock).mockImplementation(async () => true)
      const {
        result: {
          current: { error, withdraw }
        }
      } = renderHook(() => useWithdrawHolderReward())
      await withdraw('property-address')
      expect(error).toBe(undefined)
    })
  })
})
