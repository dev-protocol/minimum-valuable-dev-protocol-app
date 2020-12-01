import React from 'react'
import { Footer } from 'src/components/organisms/Footer'
import { Header } from 'src/components/organisms/Header'
import { Headline } from 'src/components/atoms/Headline'
import { H2 } from 'src/components/atoms/Typography'
// import { MarketsOverview } from 'src/components/organisms/MarketOverview'
import styled from 'styled-components'
import Link from 'next/link'

type Props = {}

const SubmitApplicationContainer = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, black, white 400%);
  border-bottom-color: none;
  padding: 1em 4em 3em 4em;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  h3 {
    color: white;
    margin-bottom: 1em;
  }
`

const Span = styled.span`
  color: #b6e1ee;
`

const A = styled.a`
  align-self: center;
  color: #1d73f1;
  border-bottom-color: none;
  font-size: 1.1em;
`

export const CreateOrAuthenticateProperty = (_: Props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Headline>
        <H2>Create an Asset</H2>
        <span>Request to join our Creator ecosystem</span>
      </Headline>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '680px',
          margin: 'auto',
          flexGrow: 1
        }}
      >
        <Link href={'/invite/github'} passHref>
          <SubmitApplicationContainer>
            <h3>Submit an application</h3>
            <Span>Provide Sustainable funding to your</Span>
            <Span>OSS project with Dev Protocol.</Span>
          </SubmitApplicationContainer>
        </Link>

        <Span style={{ margin: '1em 0', alignSelf: 'center', color: '#9F9F9F' }}>Or</Span>
        <Link href={'/create/associate/github'} passHref>
          <A>Authenticate an existing project</A>
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default CreateOrAuthenticateProperty
