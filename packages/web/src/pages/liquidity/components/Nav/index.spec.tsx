import React from 'react'
import { render } from '@testing-library/react'
import { Nav } from '.'
import 'src/__mocks__/window/matchMedia.mock'

jest.mock('src/pages/liquidity/fixtures/geyser/hooks.ts')
jest.mock('src/pages/liquidity/fixtures/uniswap-pool/hooks.ts')

describe(`${Nav.name}`, () => {
  test('Snapshot', () => {
    const component = render(
      <Nav
        onChange={console.log}
        contents={[
          { name: '1', node: <></> },
          { name: '2', node: <></> }
        ]}
      ></Nav>
    )
    const tree = component.baseElement
    expect(tree).toMatchSnapshot()
  })
})
