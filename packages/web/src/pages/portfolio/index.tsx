import React from 'react'
import { Header } from 'src/components/organisms/Header'
import { Footer } from 'src/components/organisms/Footer'
import { EarlyAccess } from 'src/components/atoms/EarlyAccess'
import { Container } from 'src/components/atoms/Container'
import { H2 } from 'src/components/atoms/Typography'
import styled from 'styled-components'
import { CurrencySwitcher } from 'src/components/organisms/PropertyCardList/CurrencySwitcher'
import { BuyDevButton } from 'src/components/molecules/BuyButton'
import { Statistics } from 'src/components/_pages/portfolio/Statistics'

const PortfolioHeader = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-areas:
    'heading heading'
    'switcher buy';
  grid-template-rows: auto;
  justify-content: stretch;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding-top: 10px;

  @media (min-width: 768px) {
    grid-template-areas: 'heading switcher buy';
    grid-template-columns: 1fr auto auto;
    grid-gap: 2rem;
  }
`

const Heading = styled(H2)`
  grid-area: heading;
  font-weight: normal !important;
`
const Switcher = styled(CurrencySwitcher)`
  grid-area: switcher;
`
const Buy = styled(BuyDevButton)`
  grid-area: buy;
`

const StyledContainer = styled(Container)`
  display: grid;
  gap: 3rem;
  padding: 3rem 0;
`

const Portfolio = () => {
  return (
    <>
      <EarlyAccess></EarlyAccess>
      <Header></Header>
      <StyledContainer>
        <PortfolioHeader>
          <Heading>Your Portfoilo</Heading>
          <Switcher />
          <Buy />
        </PortfolioHeader>
        <Statistics />
      </StyledContainer>
      <Footer />
    </>
  )
}

export default Portfolio
