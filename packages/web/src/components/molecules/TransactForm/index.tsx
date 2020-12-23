import React, { useMemo } from 'react'
import { Input } from 'antd'
import styled from 'styled-components'
import { Max } from 'src/components/molecules/Max'
import { SearchProps } from 'antd/lib/input'
import { ButtonWithGradient } from 'src/components/atoms/ButtonWithGradient'
import { useProvider } from 'src/fixtures/wallet/hooks'

type Props = SearchProps &
  React.RefAttributes<Input> & {
    onClickMax?: () => void
  }

const StyledForm = styled(Input.Search)`
  width: inherit;
  bottom: 0;
  .ant-input-affix-wrapper-focused {
    box-shadow: none;
    outline: 0;
    -webkit-box-shadow: none;
  }
  .ant-input-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .ant-input-group-addon,
  .ant-btn {
    width: 100%;
  }
  .ant-input-affix-wrapper,
  .ant-input-search,
  .ant-btn {
    border: ${props => (props.id === 'withdraw' ? '2px solid #5B5B5B' : '2px solid #2f80ed')};
  }
  .ant-input-search {
    border-right: 0;
  }
  .ant-input-group-addon {
    .ant-btn {
      border-left: 0;
      height: 100%;
      font-size: 1.2rem;
      background-image: ${props =>
        props.id === 'withdraw'
          ? 'linear-gradient(to right, #5B5B5B, #2A2A2A)'
          : 'linear-gradient(to right, #2f80ed, #1ac9fc)'};
    }
  }
  input {
    font-size: 1.6rem;
  }
`

const Wrap = styled.div`
  display: grid;
`

const StyledButtonWithGradient = styled(ButtonWithGradient)`
  font-size: 1.6rem;
  height: 100%;
`
const StyledButtonWithGradientForWithdraw = styled(ButtonWithGradient)`
  font-size: 1.6rem;
  height: 100%;
  &,
  &:hover,
  &:active,
  &:focus {
    background-image: linear-gradient(to right, #5b5b5b, #2a2a2a);
  }
`

export const TransactForm = ({
  className,
  enterButton,
  value,
  onChange,
  onSearch,
  suffix: _suffix,
  onClickMax,
  disabled,
  id,
  placeholder
}: Props) => {
  const { accountAddress } = useProvider()
  const onClick = useMemo(() => (onSearch ? () => onSearch('') : () => undefined), [onSearch])
  const suffix = useMemo(
    () => (
      <>
        {_suffix}
        {onClickMax ? <Max onClick={onClickMax} /> : undefined}
      </>
    ),
    [_suffix, onClickMax]
  )
  const OnlyButton = useMemo(
    () =>
      id === 'withdraw' ? (
        <StyledButtonWithGradientForWithdraw size="large" onClick={onClick}>
          {enterButton}
        </StyledButtonWithGradientForWithdraw>
      ) : (
        <StyledButtonWithGradient size="large" onClick={onClick}>
          {enterButton}
        </StyledButtonWithGradient>
      ),
    [id, onClick, enterButton]
  )

  return (
    <Wrap className={className} style={{ opacity: disabled ? '0.3' : '1.0' }}>
      {onChange ? (
        <StyledForm
          id={id}
          enterButton={enterButton}
          size="large"
          value={value}
          onChange={onChange}
          onSearch={onSearch}
          disabled={accountAddress === '' || typeof accountAddress === 'undefined'}
          suffix={suffix}
          type="number"
          placeholder={placeholder}
        />
      ) : (
        OnlyButton
      )}
    </Wrap>
  )
}
