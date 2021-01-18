import React from 'react'
import { render } from '@testing-library/react'
import { PropertyCardList } from '.'
import 'src/__mocks__/window/matchMedia.mock'

jest.mock('src/fixtures/dev-kit/hooks')
jest.mock('@dev/graphql')
jest.mock('src/fixtures/currency/hooks')

describe(`${PropertyCardList.name}`, () => {
  test('Snapshot', () => {
    const component = render(<PropertyCardList currentPage={1} searchWord="" sortBy="" featureTag="" />)
    const tree = component.baseElement
    expect(tree).toMatchSnapshot()
  })
})
