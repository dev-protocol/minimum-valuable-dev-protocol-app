import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import SettingContext from 'src/context/settingContext'

interface Props {
  className?: string
}

const CurrencyContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 11px;
`

const Dev = styled.div<{ isActive?: boolean }>`
  cursor: pointer;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border: 1px solid white;
  background: ${props => (props.isActive ? 'white' : 'transparent')};
  padding: 0 15px;
  color: ${props => (props.isActive ? '#5B8BF5' : 'white')};
  font-size: 20px;
`
const Usd = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid white;
  background: ${props => (props.isActive ? 'white' : 'transparent')};
  padding: 0 15px;
  color: ${props => (props.isActive ? '#5B8BF5' : 'white')};
  font-size: 20px;
`

export const CurrencySwitcher = ({ className }: Props) => {
  const { isCurrencyDEV, toggleCurrency } = useContext(SettingContext)
  const handleToggleCurrency = useCallback(() => {
    toggleCurrency()
  }, [toggleCurrency])
  return (
    <>
      <CurrencyContainer className={className} onClick={handleToggleCurrency}>
        <Dev isActive={isCurrencyDEV}>
          <span>DEV</span>
        </Dev>
        <Usd isActive={!isCurrencyDEV}>
          <span>USD</span>
        </Usd>
      </CurrencyContainer>
    </>
  )
}
