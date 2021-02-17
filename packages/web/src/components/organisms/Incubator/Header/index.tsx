import React from 'react'
import { IncubatorLogo } from 'src/components/organisms/Incubator/Icons'
import styled from 'styled-components'
import Link from 'next/link'
import { useConnectWallet, useProvider } from 'src/fixtures/wallet/hooks'

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 0;
  max-width: 1200px;
`

const HeaderLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ConnectWalletContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const HeaderLink = styled.a<{ color?: string }>`
  text-decoration: none;
  color: ${props => (props.color ? props.color : 'black')};
`

const ConnectWalletLink = styled(HeaderLink)`
  :hover {
    color: ${props => props.color};
  }
`

const IncubatorHeader = () => {
  const { isConnected, connect, isConnecting } = useConnectWallet()
  const { accountAddress } = useProvider()

  return (
    <div>
      <HeaderContainer>
        <Link href="/incubator" passHref>
          <div style={{ cursor: 'pointer' }}>
            <IncubatorLogo />
          </div>
        </Link>

        <HeaderLinkContainer>
          <HeaderLink>Projects</HeaderLink>
          <HeaderLink>Comittee</HeaderLink>
          <Link href="/incubator/QA">
            <HeaderLink>{'Q&As'}</HeaderLink>
          </Link>

          <HeaderLink color="#FF3815">Stakes.social</HeaderLink>
        </HeaderLinkContainer>
        <ConnectWalletContainer>
          {isConnecting ? (
            <ConnectWalletLink color="#00D0FD">Connecting...</ConnectWalletLink>
          ) : !isConnected && !accountAddress ? (
            <ConnectWalletLink onClick={connect} color="#00D0FD">
              Connect Wallet
            </ConnectWalletLink>
          ) : (
            <ConnectWalletLink color="#00e84b">Connected</ConnectWalletLink>
          )}
        </ConnectWalletContainer>
      </HeaderContainer>
    </div>
  )
}

export default IncubatorHeader
