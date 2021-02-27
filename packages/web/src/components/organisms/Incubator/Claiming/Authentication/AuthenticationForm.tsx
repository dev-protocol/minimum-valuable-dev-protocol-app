import React, { useState } from 'react'
import styled from 'styled-components'
import { Alert, Form, message } from 'antd'
import { LinkB, Text2M, H1Large, Text2S } from '../../Typography'
import { Button } from '../../molecules/Button'
import { ClipboardIcon } from '../../Icons'
import { usePostSignGitHubMarketAsset } from 'src/fixtures/khaos/hooks'
import { Incubator } from 'src/fixtures/dev-for-apps/utility'
import { useAuthenticate } from 'src/fixtures/_pages/incubator/hooks'
import { CheckCircleOutlined } from '@ant-design/icons'

const AuthenticationContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 446px; */
  width: 100%;
  align-self: center;
`

const OurDocsLink = styled.a`
  font-size: 14px;
  text-decoration: none;
  color: #5b8bf5;
  padding-bottom: 1px;
  border-bottom: 1px solid #5b8bf5;

  :hover {
    color: #5b8bf5;
  }
`

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

export const InputContainer = styled(Form.Item)`
  position: relative;
  width: 100%;
  margin: 0;
`

const ButtonWithIcon = styled(Button)`
  width: 130px;
`

const StyledAlert = styled(Alert)`
  margin: -15px;
  margin-top: 2rem;
  border-radius: 0;
  background: #cce4ff;
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
  onHandlePaste: () => void
}

const ClipboardIconContainer = styled.div`
  z-index: 3;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 4px;
`

export const CustomInput = ({ placeholder, label, onHandlePaste }: CustomInputProps) => {
  return (
    <InputContainer>
      <Form.Item name={label} noStyle>
        <Input id="pat" placeholder={placeholder || ''} />
      </Form.Item>
      <ClipboardIconContainer onClick={onHandlePaste}>
        <ClipboardIcon />
      </ClipboardIconContainer>
    </InputContainer>
  )
}

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0x;
  }
`

type AuthenticationProps = {
  onStateChange: React.Dispatch<React.SetStateAction<string>>
  onMetricsCreated: (metrics: string) => void
  project: Incubator
}

const ProgressContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-48px);
  display: flex;
`

const IS_DEVELOPMENT_ENV = process.env.NODE_ENV === 'development'

const AuthenticationForm = ({ onStateChange, onMetricsCreated, project }: AuthenticationProps) => {
  const [form] = Form.useForm()
  const { postSignGitHubMarketAssetHandler, isLoading } = usePostSignGitHubMarketAsset()
  const { authenticate, waitForCreateMetrics } = useAuthenticate()
  const [publicSignature, setPublicSignature] = useState<undefined | string>()
  const onSign = async (data: any) => {
    console.log({ data })
    const signature = await postSignGitHubMarketAssetHandler(project.verifier_id, data.pat).catch((err: Error) => {
      return IS_DEVELOPMENT_ENV ? { publicSignature: 'dummy_pulic_signature' } : err
    })
    if (signature instanceof Error) {
      return message.error(signature)
    }
    setPublicSignature(signature.publicSignature)
  }
  const onSend = async () => {
    if (!publicSignature) {
      return
    }
    onStateChange('loading')
    if (!IS_DEVELOPMENT_ENV) {
      await authenticate(project.verifier_id, publicSignature)
    }
    const metrics = IS_DEVELOPMENT_ENV
      ? '0x_dummy_metrics'
      : await waitForCreateMetrics(project.verifier_id).catch((err: Error) => err)
    if (metrics instanceof Error) {
      return message.error(metrics)
    }
    if (!metrics) {
      return message.error('authentication failed')
    }
    onMetricsCreated(metrics)
  }
  const [isError, setIsError] = useState(false)

  const onFinishFailed = () => {
    setIsError(true)
  }

  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then(pat => {
        form.setFieldsValue({ pat })
        console.log('Pasted content: ', pat)
      })
      .catch(err => {
        console.error('Failed to read clipboard contents: ', err)
      })
  }

  return (
    <AuthenticationContainer>
      <ProgressContainer>
        <Text2M color="#999999">First step</Text2M>
      </ProgressContainer>
      <H1Large>Authentication</H1Large>
      <Text2S style={{ paddingTop: '46px' }}>Admin’s Personal Access Token</Text2S>
      <FormContainer style={{ paddingTop: '8px' }}>
        <StyledForm
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSign}
          onFinishFailed={onFinishFailed}
        >
          <FormItem
            isError={isError}
            name="pat"
            rules={[{ required: true, message: 'Please enter a valid PAT' }]}
            key="pat"
          >
            <CustomInput onHandlePaste={handlePaste} label="pat" placeholder="Paste the PAT from Github" />
          </FormItem>

          <div style={{ display: 'flex', marginTop: '1rem' }}>
            <Text2S style={{ width: 'inherit' }} color="#5B8BF5">
              The Khaos Oracle confidentially authenticates your Github Personal Access Token. Please see{' '}
              <OurDocsLink rel="noopener noreferrer" target="_blank" href="https://github.com/dev-protocol/khaos">
                our docs
              </OurDocsLink>{' '}
              for more details.
            </Text2S>
          </div>

          <SpaceBetween style={{ alignItems: 'center', marginTop: '2rem' }}>
            <div style={{ height: 'fit-content' }}>
              <LinkB rel="noopener noreferrer" target="_blank" href="https://github.com/settings/tokens/new">
                Create a PAT
              </LinkB>
            </div>

            <ButtonWithIcon
              icon={publicSignature ? <CheckCircleOutlined /> : undefined}
              loading={isLoading}
              htmlType="submit"
              disabled={Boolean(publicSignature)}
            >
              Sign
            </ButtonWithIcon>
          </SpaceBetween>

          {publicSignature && (
            <StyledAlert
              message="Authentication"
              showIcon
              description="Verification of the credential has been completed. Please submit the signature to finalize authentication."
              type="info"
              action={<ButtonWithIcon onClick={onSend}>Submit</ButtonWithIcon>}
            />
          )}
        </StyledForm>
      </FormContainer>
    </AuthenticationContainer>
  )
}

export default AuthenticationForm
