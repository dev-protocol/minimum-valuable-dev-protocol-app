import React from 'react'
import { Footer } from 'src/components/organisms/Footer'
import { H2 } from 'src/components/atoms/Typography'
import { Headline } from 'src/components/atoms/Headline'
import { PoliciesList } from 'src/components/organisms/PoliciyList'
import { Header } from 'src/components/organisms/Header'
import { Container } from 'src/components/atoms/Container'

type InitialProps = {}
type Props = {} & InitialProps

const Policy = (_: Props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Headline>
        <H2>Policy Proposals</H2>
        <span>As a DEV token holder you can vote on policy proposals to improve the protocol.</span>
      </Headline>
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <PoliciesList />
      </Container>
      <Footer />
    </div>
  )
}

export default Policy
