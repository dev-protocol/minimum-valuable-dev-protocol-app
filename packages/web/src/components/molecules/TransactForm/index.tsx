import React, { useMemo } from 'react'
import { Input } from 'antd'
import styled from 'styled-components'
import { Max } from 'src/components/molecules/Max'
import { SearchProps } from 'antd/lib/input'
import { ButtonWithGradient } from 'src/components/atoms/ButtonWithGradient'
import { blueGradient } from 'src/styles/gradient'

type Props = SearchProps &
  React.RefAttributes<Input> & {
    onClickMax?: () => void
  }

const StyledForm = styled(Input.Search)`
  width: inherit;
  bottom: 0;
  .ant-input-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .ant-input-group-addon,
  .ant-btn {
    width: 100%;
  }
  .ant-input-search {
    border-right: 0;
  }
  .ant-input-group-addon {
    .ant-btn {
      border-left: 0;
      height: 100%;
      font-size: 1.2rem;
      ${blueGradient()}
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

export const TransactForm = ({
  className,
  enterButton,
  value,
  onChange,
  onSearch,
  suffix: _suffix,
  onClickMax,
  id,
  placeholder
}: Props) => {
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
    () => (
      <StyledButtonWithGradient size="large" onClick={onClick}>
        {enterButton}
      </StyledButtonWithGradient>
    ),
    [onClick, enterButton]
  )

  return (
    <Wrap className={className}>
      {onChange ? (
        <StyledForm
          id={id}
          enterButton={enterButton}
          size="large"
          value={value}
          onChange={onChange}
          onSearch={onSearch}
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
