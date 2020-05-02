import React from 'react'
import { Button } from 'antd'
import { useConnectWallet } from 'src/fixtures/wallet/hooks'
import { BrandLogo } from 'src/components/atoms/BrandLogo'
import styled from 'styled-components'

const ResponsivePropertyFrame = styled.div`
  width: auto;
  position: relative;
  height: 562px;
  padding: 50px;
  @media (max-width: 768px) {
    height: 360px;
    padding: 25px;
  }
`

const ResponsivePropertyAddress = styled.div`
  position: absolute;
  bottom: 0;
  padding: 0 0 122px 333px;
  display: block;
  @media (max-width: 768px) {
    padding: 0 0 100px 0;
  }
`

const ResponsiveButton = styled(Button)`
  float: right;
  @media (max-width: 768px) {
    float: none;
    margin: 20px 0;
  }
`

interface Props {
  propertyAddress: string
}

export const PropertyHeader = ({ propertyAddress }: Props) => {
  const { isConnected, connect } = useConnectWallet()
  const handleClick = () => {
    connect()
  }

  return (
    <ResponsivePropertyFrame
      style={{
        background: `
    url('//raw.githubusercontent.com/dev-protocol/assets/master/property/${propertyAddress}/header.jpg'),
    linear-gradient(111.32deg, #2F80ED 0%, #D5E6FB 100%)`,
        backgroundSize: 'cover'
      }}
    >
      <BrandLogo colorSchema={'white'} props={{ width: '14em' }}></BrandLogo>
      <ResponsiveButton size="large" style={{}} disabled={isConnected} onClick={handleClick}>
        {isConnected && 'Wallet connected'}
        {!isConnected && 'Connect to a wallet'}
      </ResponsiveButton>
      <ResponsivePropertyAddress>
        <span style={{ background: 'white', padding: '0.5em' }}>Property Address</span>
        <div style={{ background: 'white' }}>{propertyAddress}</div>
      </ResponsivePropertyAddress>
    </ResponsivePropertyFrame>
  )
}
