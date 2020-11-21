import React, { useState } from 'react'
import { Header } from 'src/components/organisms/Header'
import { Footer } from 'src/components/organisms/Footer'

import { Container } from 'src/components/atoms/Container'
import { Headline } from 'src/components/atoms/Headline'
import { H2 } from 'src/components/atoms/Typography'
import { Nav } from '../../components/_pages/liquidity/Nav'
import styled from 'styled-components'
import { Deposit } from '../../components/_pages/liquidity/Deposit'
import { Withdraw } from '../../components/_pages/liquidity/Withdraw'
import { Stats } from 'src/components/_pages/liquidity/Stats'
import { Informations } from 'src/components/_pages/liquidity/Informations'

const NarrowContainer = styled(Container)`
  max-width: 640px;
`

const Margin = styled.div`
  margin: 2rem 0;
`

const LiquidityMining = () => {
  const [, setTab] = useState('0')
  const contents = [
    { name: 'Deposit', node: Deposit() },
    { name: 'Withdraw', node: Withdraw() },
    { name: 'Stats', node: Stats() }
  ]

  return (
    <>
      <Header></Header>
      <Container>
        <Headline height={150}>
          <H2>Liquidity Mining</H2>
        </Headline>
      </Container>
      <NarrowContainer>
        <Margin>
          <Informations />
        </Margin>
        <Nav contents={contents} onChange={setTab}></Nav>
      </NarrowContainer>
      <Footer />
    </>
  )
}

export default LiquidityMining
