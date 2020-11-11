import { renderHook, act } from '@testing-library/react-hooks'
import {
  useGetTotalRewardsAmount,
  useGetTotalStakingAmount,
  useGetMyStakingAmount,
  useWithdrawHolderReward,
  useWithdrawStakingReward,
  useGetMyHolderAmount,
  useStake,
  useStakingShare,
  useWithdrawStaking,
  useCreateProperty,
  useMarketScheme,
  useAuthenticate,
  useAPY,
  useAnnualSupplyGrowthRatio,
  useGetPolicyAddressesList,
  usePropertyAuthor,
  useBalanceOf
} from './hooks'
import useSWR from 'swr'
import { toBigNumber, toNaturalNumber } from 'src/fixtures/utility'
import {
  withdrawHolderAmount,
  withdrawStakingAmount,
  stakeDev,
  createProperty,
  marketScheme,
  authenticate,
  createGetVotablePolicy
} from './client'
import { message } from 'antd'
import BigNumber from 'bignumber.js'

jest.mock('swr')
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
      const { result } = renderHook(() => useGetTotalRewardsAmount('property-address'))
      expect(result.current.totalRewardsAmount?.toFixed()).toBe(toNaturalNumber(data).toFixed())
    })

    test('failure fetching data', () => {
      const data = undefined
      const errorMessage = 'error'
      const error = new Error(errorMessage)
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
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
      const { result } = renderHook(() => useGetTotalStakingAmount('property-address'))
      expect(result.current.totalStakingAmount?.toFixed()).toBe(toNaturalNumber(data).toFixed())
    })

    test('failure fetching data', () => {
      const data = undefined
      const errorMessage = 'error'
      const error = new Error(errorMessage)
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
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
      const { result } = renderHook(() => useGetMyHolderAmount('property-address'))
      expect(result.current.myHolderAmount?.toFixed()).toBe(toNaturalNumber(data).toFixed())
    })

    test('failure fetching data', () => {
      const data = undefined
      const errorMessage = 'error'
      const error = new Error(errorMessage)
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
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
      const { result } = renderHook(() => useGetMyStakingAmount('property-address'))
      expect(result.current.myStakingAmount?.toFixed()).toBe(toNaturalNumber(data).toFixed())
    })

    test('failure fetching data', () => {
      const data = undefined
      const errorMessage = 'error'
      const error = new Error(errorMessage)
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      const { result } = renderHook(() => useGetMyStakingAmount('property-address'))
      expect(result.current.error).toBe(error)
      expect(result.current.error?.message).toBe(errorMessage)
    })
  })

  describe('useWithdrawHolderReward', () => {
    test('success withdraw', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useWithdrawHolderReward())
      ;(withdrawHolderAmount as jest.Mock).mockResolvedValue(true)
      act(() => {
        result.current.withdrawHolder('property-address')
      })
      await waitForNextUpdate()
      expect(result.current.error).toBe(undefined)
      expect(result.current.isLoading).toBe(false)
    })

    test('failure withdraw', async () => {
      const error = new Error('error')
      const { result, waitForNextUpdate } = renderHook(() => useWithdrawHolderReward())
      ;(withdrawHolderAmount as jest.Mock).mockRejectedValue(error)
      message.error = jest.fn(() => {}) as any
      act(() => {
        result.current.withdrawHolder('property-address')
      })
      await waitForNextUpdate()
      expect(result.current.error).toBe(error)
      expect(result.current.isLoading).toBe(false)
    })
  })

  describe('useWithdrawStakingReward', () => {
    test('success withdraw', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useWithdrawStakingReward())
      ;(withdrawStakingAmount as jest.Mock).mockResolvedValue(true)
      act(() => {
        result.current.withdrawStakingReward('property-address')
      })
      await waitForNextUpdate()
      expect(result.current.error).toBe(undefined)
      expect(result.current.isLoading).toBe(false)
    })

    test('failure withdraw', async () => {
      const error = new Error('error')
      const { result, waitForNextUpdate } = renderHook(() => useWithdrawStakingReward())
      ;(withdrawStakingAmount as jest.Mock).mockRejectedValue(error)
      message.error = jest.fn(() => {}) as any
      act(() => {
        result.current.withdrawStakingReward('property-address')
      })
      await waitForNextUpdate()
      expect(result.current.error).toBe(error)
      expect(result.current.isLoading).toBe(false)
    })
  })

  describe('useWithdrawStaking', () => {
    test('success withdraw', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useWithdrawStaking())
      ;(withdrawStakingAmount as jest.Mock).mockResolvedValue(true)
      act(() => {
        result.current.withdrawStaking('property-address', toBigNumber(0))
      })
      await waitForNextUpdate()
      expect(result.current.error).toBe(undefined)
      expect(result.current.isLoading).toBe(false)
    })

    test('failure withdraw', async () => {
      const error = new Error('error')
      const { result, waitForNextUpdate } = renderHook(() => useWithdrawStaking())
      ;(withdrawStakingAmount as jest.Mock).mockRejectedValue(error)
      message.error = jest.fn(() => {}) as any
      act(() => {
        result.current.withdrawStaking('property-address', toBigNumber(0))
      })
      await waitForNextUpdate()
      expect(result.current.error).toBe(error)
      expect(result.current.isLoading).toBe(false)
    })
  })

  describe('useStake', () => {
    test('success withdraw', async () => {
      const data = '11111'
      const { result, waitForNextUpdate } = renderHook(() => useStake())
      ;(stakeDev as jest.Mock).mockResolvedValue(true)
      act(() => {
        result.current.stake('property-address', data)
      })
      await waitForNextUpdate()
      expect(result.current.error).toBe(undefined)
      expect(result.current.isLoading).toBe(false)
    })

    test('failure withdraw', async () => {
      const error = new Error('error')
      const { result, waitForNextUpdate } = renderHook(() => useStake())
      ;(stakeDev as jest.Mock).mockRejectedValue(error)
      act(() => {
        result.current.stake('property-address', '11111')
      })
      await waitForNextUpdate()
      expect(result.current.error).toBe(error)
      expect(result.current.isLoading).toBe(false)
    })
  })

  describe('useStakingShare', () => {
    test('data is undefined', () => {
      const data = undefined
      const error = undefined
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      const { result } = renderHook(() => useStakingShare('property-address'))
      expect(result.current.stakingShare).toBe(data)
    })

    test('success fetching data', () => {
      const data1 = '10000'
      const data2 = '5000'
      ;(useSWR as jest.Mock).mockImplementationOnce(() => ({ data: data1, error: undefined }))
      ;(useSWR as jest.Mock).mockImplementationOnce(() => ({ data: data2, error: undefined }))
      const { result } = renderHook(() => useStakingShare('property-address'))
      expect(result.current.stakingShare).toBe(Number(data1) / Number(data2))
    })

    test('failure fetching metrics data', () => {
      const data = undefined
      const errorMessage = 'error'
      const error = new Error(errorMessage)
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      const { result } = renderHook(() => useStakingShare('property-address'))
      expect(result.current.error).toBe(error)
      expect(result.current.error?.message).toBe(errorMessage)
    })

    test('failure fetching market data', () => {
      const data1 = '10000'
      const data2 = undefined
      const errorMessage = 'error'
      const error = new Error(errorMessage)
      ;(useSWR as jest.Mock).mockImplementationOnce(() => ({ data: data1, error: undefined }))
      ;(useSWR as jest.Mock).mockImplementationOnce(() => ({ data: data2, error }))
      const { result } = renderHook(() => useStakingShare('property-address'))
      expect(result.current.error).toBe(error)
      expect(result.current.error?.message).toBe(errorMessage)
    })
  })

  describe(`${useCreateProperty.name}`, () => {
    const name = 'name'
    const symbol = 'symbol'
    const author = 'author'
    test('success', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useCreateProperty())
      ;(createProperty as jest.Mock).mockResolvedValue(true)
      act(() => {
        result.current.createProperty(name, symbol, author)
      })
      await waitForNextUpdate()
      expect(result.current.error).toBe(undefined)
      expect(result.current.isLoading).toBe(false)
    })

    test('failure', async () => {
      const error = new Error('error')
      const { result, waitForNextUpdate } = renderHook(() => useCreateProperty())
      ;(createProperty as jest.Mock).mockRejectedValue(error)
      act(() => {
        result.current.createProperty(name, symbol, author)
      })
      await waitForNextUpdate()
      expect(result.current.error).toBe(error)
      expect(result.current.isLoading).toBe(false)
    })
  })

  describe(`${useMarketScheme.name}`, () => {
    const market = 'market-address'
    test('success', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useMarketScheme())
      ;(marketScheme as jest.Mock).mockResolvedValue(true)
      act(() => {
        result.current.marketScheme(market)
      })
      await waitForNextUpdate()
      expect(result.current.error).toBe(undefined)
      expect(result.current.isLoading).toBe(false)
    })

    test('failure', async () => {
      const error = new Error('error')
      const { result, waitForNextUpdate } = renderHook(() => useMarketScheme())
      ;(marketScheme as jest.Mock).mockRejectedValue(error)
      act(() => {
        result.current.marketScheme(market)
      })
      await waitForNextUpdate()
      expect(result.current.error).toBe(error)
      expect(result.current.isLoading).toBe(false)
    })
  })

  describe(`${useAuthenticate.name}`, () => {
    const market = 'market-address'
    const property = 'property-address'
    const args = ['arg1', 'arg2']
    test('success', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useAuthenticate())
      ;(authenticate as jest.Mock).mockResolvedValue(true)
      act(() => {
        result.current.authenticate(market, property, args)
      })
      await waitForNextUpdate()
      expect(result.current.error).toBe(undefined)
      expect(result.current.isLoading).toBe(false)
    })

    test('failure', async () => {
      const error = new Error('error')
      const { result, waitForNextUpdate } = renderHook(() => useAuthenticate())
      ;(authenticate as jest.Mock).mockRejectedValue(error)
      act(() => {
        result.current.authenticate(market, property, args)
      })
      await waitForNextUpdate()
      expect(result.current.error).toBe(error)
      expect(result.current.isLoading).toBe(false)
    })
  })

  describe('useAPY', () => {
    test('data is undefined', () => {
      const data = undefined
      const error = undefined
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      const { result } = renderHook(() => useAPY())
      expect(result.current.apy).toBe(data)
    })

    test('success fetching data', () => {
      const apyForStakers = new BigNumber(1000).times(2102400).div(500000).times(100)
      const apyForCreators = new BigNumber(9000).times(2102400).div(500000).times(100)
      ;(useSWR as jest.Mock).mockImplementationOnce(() => ({ data: '10000', error: undefined }))
      ;(useSWR as jest.Mock).mockImplementationOnce(() => ({ data: '500000', error: undefined }))
      ;(useSWR as jest.Mock).mockImplementationOnce(() => ({ data: '9000', error: undefined }))
      const { result } = renderHook(() => useAPY())
      expect(result.current.apy?.toFixed()).toBe(apyForStakers.toFixed())
      expect(result.current.creators?.toFixed()).toBe(apyForCreators.toFixed())
    })

    test('failure fetching data', () => {
      const data = undefined
      const errorMessage = 'error'
      const error = new Error(errorMessage)
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      const { result } = renderHook(() => useAPY())
      expect(result.current.error).toBe(error)
      expect(result.current.error?.message).toBe(errorMessage)
    })
  })

  describe('useAnnualSupplyGrowthRatio', () => {
    test('data is undefined', () => {
      const data = undefined
      const error = undefined
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      const { result } = renderHook(() => useAnnualSupplyGrowthRatio())
      expect(result.current.annualSupplyGrowthRatio).toBe(data)
    })

    test('success fetching data', () => {
      const data = new BigNumber(10000).times(2102400).div(12000000).times(100)
      ;(useSWR as jest.Mock).mockImplementationOnce(() => ({ data: '10000', error: undefined }))
      ;(useSWR as jest.Mock).mockImplementationOnce(() => ({ data: '12000000', error: undefined }))
      const { result } = renderHook(() => useAnnualSupplyGrowthRatio())
      expect(result.current.annualSupplyGrowthRatio?.toFixed()).toBe(data.toFixed())
    })

    test('failure fetching data', () => {
      const data = undefined
      const errorMessage = 'error'
      const error = new Error(errorMessage)
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      const { result } = renderHook(() => useAnnualSupplyGrowthRatio())
      expect(result.current.error).toBe(error)
      expect(result.current.error?.message).toBe(errorMessage)
    })
  })

  describe(`${useGetPolicyAddressesList.name}`, () => {
    test('success', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useGetPolicyAddressesList())
      ;(createGetVotablePolicy as jest.Mock).mockResolvedValue(true)
      act(() => {
        result.current.getPolicyAddressesList()
      })
      await waitForNextUpdate()
      expect(result.current.isLoading).toBe(false)
    })

    test('failure', async () => {
      const error = new Error('error')
      const { result, waitForNextUpdate } = renderHook(() => useGetPolicyAddressesList())
      ;(createGetVotablePolicy as jest.Mock).mockRejectedValue(error)
      act(() => {
        result.current.getPolicyAddressesList()
      })
      await waitForNextUpdate()
      expect(result.current.error).toBe(error)
      expect(result.current.isLoading).toBe(false)
    })
  })

  describe('usePropertyAuthor', () => {
    test('data is undefined', () => {
      const data = undefined
      const error = undefined
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      const { result } = renderHook(() => usePropertyAuthor('property-address'))
      expect(result.current.author).toBe(data)
    })

    test('success fetching data', () => {
      const data = 'author'
      const error = undefined
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      const { result } = renderHook(() => usePropertyAuthor('property-address'))
      expect(result.current.author).toBe(data)
    })

    test('failure fetching data', () => {
      const data = undefined
      const errorMessage = 'error'
      const error = new Error(errorMessage)
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      const { result } = renderHook(() => usePropertyAuthor('property-address'))
      expect(result.current.error).toBe(error)
      expect(result.current.error?.message).toBe(errorMessage)
    })
  })

  describe('useBalanceOf', () => {
    test('data is undefined', () => {
      const data = undefined
      const error = undefined
      ;(useSWR as jest.Mock).mockImplementationOnce(() => ({ data: '0x' }))
      ;(useSWR as jest.Mock).mockImplementationOnce(() => ({ data, error }))
      const { result } = renderHook(() => useBalanceOf())
      expect(result.current.data).toBe(data)
      expect(result.current.humanized).toBe(undefined)
    })

    test('success fetching data', () => {
      ;(useSWR as jest.Mock).mockImplementationOnce(() => ({ data: '0x' }))
      ;(useSWR as jest.Mock).mockImplementationOnce(() => ({ data: toBigNumber('10000000000000000000') }))
      const { result } = renderHook(() => useBalanceOf())
      expect(result.current.data?.toFixed()).toBe('10000000000000000000')
      expect(result.current.humanized?.toFixed()).toBe('10')
    })

    test('failure fetching data', () => {
      const data = undefined
      const errorMessage = 'error'
      const error = new Error(errorMessage)
      ;(useSWR as jest.Mock).mockImplementation(() => ({ data, error }))
      const { result } = renderHook(() => useBalanceOf())
      expect(result.current.error).toBe(error)
      expect(result.current.error?.message).toBe(errorMessage)
    })
  })
})
