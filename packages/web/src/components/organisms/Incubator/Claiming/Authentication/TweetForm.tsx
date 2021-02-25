import React, { useState } from 'react'
import styled from 'styled-components'
import { Form } from 'antd'

import { ButtonL, Text2M, H1Large, Text1L, Text2S } from '../../Typography'
import { Button } from '../../molecules/Button'
import { ClipboardIcon, TwitterBird } from '../../Icons'
import DownArrow from '../../molecules/DownArrow'

const AuthenticationContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: fit-content;
`

const FormContainer = styled.div`
  display: grid;
  width: 100%;
  align-self: center;
`

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

export const InputContainer = styled(Form.Item)`
  position: relative;
  width: 100%;
  padding-bottom: 48px;
  margin: 0;
`

const FormItem = styled(Form.Item)<{ isError?: boolean }>`
  .ant-form-item-explain,
  .ant-form-item-explain-error {
    padding-top: 0.5em;
    font-size: 12px;
  }

  #pat {
    ${props => {
      if (props.isError) {
        return 'border-bottom: red 2px solid'
      }
      return 'border-bottom: auto'
    }}
  }
`

export const Input = styled.input`
  width: 100%;
  padding: 8px 0;
  border: 0;
  background: transparent;
  outline: none;
  border-bottom: 1px solid #cccccc;
  transition: all 0.2s ease-in;

  &:hover {
    transition: all 0.2s ease-in;
    border-bottom: 1px solid #5b8bf5;
  }

  &:focus {
    transition: all 0.2s ease-in;
    border-bottom: 1px solid black;
    /* box-shadow: 0 0 0 1px grey; */
  }

  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    font-family: 'IBM Plex Mono';
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
    color: #cccccc;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    font-family: 'IBM Plex Mono';
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
    color: #cccccc;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    font-family: 'IBM Plex Mono';
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
    color: #cccccc;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    font-family: 'IBM Plex Mono';
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
    color: #cccccc;
  }
`

type CustomInputProps = {
  label: string
  placeholder?: string
  defaultValue?: number | string
}

const ClipboardIconContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 4px;
`

export const CustomInput = ({ placeholder, label }: CustomInputProps) => {
  return (
    <InputContainer>
      <Form.Item name={label} noStyle>
        <Input id="pat" placeholder={placeholder || ''} />
      </Form.Item>
      <ClipboardIconContainer>
        <ClipboardIcon />
      </ClipboardIconContainer>
    </InputContainer>
  )
}

type AuthenticationProps = {
  onStateChange: React.Dispatch<React.SetStateAction<string>>
}

const ProgressContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-48px);
  display: flex;
`

const TweetContainer = styled.div`
  display: flex;
  position: relative;
  font-size: 16px;
  margin-top: 1em;
  padding: 16px 24px;
  border-radius: 16px;
  border: 1px solid #1da1f2;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`

const TwitterBirdContainer = styled.div`
  position: absolute;
  top: 7.5px;
  right: 7.5px;
`

const TweetButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(-20px, 50%);
`

const TweetButton = styled(Button)`
  border-radius: 24px;
  width: 120px;
  height: 48px;
  color: white;
  background: #1da1f2;

  :hover {
    background: #1da1f2;
  }
`

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0px;
  }
`

const TweetForm = ({ onStateChange }: AuthenticationProps) => {
  const [form] = Form.useForm()
  const onSubmit = (data: any) => {
    console.log('data: ', data)
    onStateChange('loading')
  }
  const [isError, setIsError] = useState(false)

  const onFinishFailed = () => {
    setIsError(true)
  }

  const { project } = { project: 'Sigma' }

  return (
    <AuthenticationContainer>
      <ProgressContainer>
        <Text2M color="#999999">Last step</Text2M>
      </ProgressContainer>
      <SpaceBetween>
        <H1Large>Tweet it!</H1Large>
      </SpaceBetween>
      <TweetContainer>
        <TwitterBirdContainer>
          <TwitterBird />
        </TwitterBirdContainer>
        <Text1L fontSize="20px">
          {project} just received $20,000 in funding from the{' '}
          <Text1L fontSize="20px" style={{ color: '#D500E6' }}>
            @devprtcl
          </Text1L>{' '}
          Incubator. Follow the link below to support us and earn by staking DEV tokens.
        </Text1L>
        <TweetButtonContainer>
          <TweetButton>
            <ButtonL>Submit</ButtonL>
          </TweetButton>
        </TweetButtonContainer>
      </TweetContainer>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', marginTop: '41px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 24px' }}>
          <DownArrow />
        </div>
        <Text2S color="#5B8BF5">
          The last step is to share the news with your community. Once completed paste the url below and click “Done”.
        </Text2S>
      </div>

      <Text2S style={{ paddingTop: '24px' }}>Twitter Post URL</Text2S>
      <FormContainer style={{ paddingTop: 0 }}>
        <StyledForm
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
        >
          <FormItem
            isError={isError}
            name="twitter"
            rules={[{ required: true, message: 'Please enter a valid twitter URL' }]}
            key="twitter"
          >
            <CustomInput label="twitter" placeholder="Paste the url of the Twitter post " />
          </FormItem>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => onStateChange('loading')}>Done</Button>
          </div>
        </StyledForm>
      </FormContainer>
    </AuthenticationContainer>
  )
}

export default TweetForm
