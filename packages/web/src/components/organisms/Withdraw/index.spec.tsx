import React from 'react'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { message } from 'antd'
import { act, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getMyStakingAmount } from 'src/fixtures/dev-kit/client'
import { useWithdrawStaking } from 'src/fixtures/dev-kit/hooks'
import { whenDefined } from 'src/fixtures/utility'
import { Withdraw } from '.'
import 'src/__mocks__/window/matchMedia.mock'
import WalletContext from 'src/context/walletContext'

jest.mock('src/fixtures/dev-kit/client')
jest.mock('src/fixtures/dev-kit/hooks')
jest.mock('src/fixtures/uniswap/hooks')
jest.mock('src/fixtures/wallet/hooks')
jest.mock('web3')
jest.mock('@dev/graphql')

describe(`${Withdraw.name}`, () => {
  test('Snapshot', () => {
    const component = render(
      <WalletContext.Provider value={{ web3: new Web3(), setWeb3: () => {} }}>
        <Withdraw propertyAddress="propertyAddress" />
      </WalletContext.Provider>
    )
    const tree = component.baseElement
    expect(tree).toMatchSnapshot()
  })
  test('hooks: click MAX button and withdraw button', async () => {
    const withdrawStaking = jest.fn(() => {})
    ;(getMyStakingAmount as jest.Mock).mockImplementation(() => Promise.resolve(new BigNumber('1000')))
    ;(useWithdrawStaking as jest.Mock).mockImplementation(() => ({ withdrawStaking }))
    message.warn = jest.fn(() => {}) as any

    const { getByText } = render(
      <WalletContext.Provider value={{ web3: new Web3(), setWeb3: () => {} }}>
        <Withdraw propertyAddress="propertyAddress" />
      </WalletContext.Provider>
    )

    await act(async () => {
      await userEvent.click(getByText('DEV'))
      await userEvent.click(getByText('Withdraw'))
    })

    expect((message.warn as jest.Mock).mock.calls.length).toBe(0)
    expect((getMyStakingAmount as jest.Mock).mock.calls.length).toBe(1)
    expect((withdrawStaking as jest.Mock).mock.calls.length).toBe(1)
  })
  test('hooks: type amount is minus value and withdraw button', async () => {
    ;(getMyStakingAmount as jest.Mock).mockImplementation(() => Promise.resolve(new BigNumber('-1')))
    message.warn = jest.fn(() => {}) as any

    const { container, getByText } = render(
      <WalletContext.Provider value={{ web3: new Web3(), setWeb3: () => {} }}>
        <Withdraw propertyAddress="propertyAddress" />
      </WalletContext.Provider>
    )

    const input = container.querySelector('input#withdraw')
    expect(input).not.toBe(null)
    await act(async () => {
      await whenDefined(input, x => userEvent.type(x, '-1'))
      await userEvent.click(getByText('Withdraw'))
    })

    expect((message.warn as jest.Mock).mock.calls.length).toBe(1)
    expect((getMyStakingAmount as jest.Mock).mock.calls.length).toBe(0)
  })
})
