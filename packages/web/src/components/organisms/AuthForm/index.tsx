import React, { useState } from 'react'
import { Form, Button, Result } from 'antd'
import { useAuthenticate, useCreateAndAuthenticate } from 'src/fixtures/dev-kit/hooks'
import { usePostSignGitHubMarketAsset } from 'src/fixtures/khaos/hooks'
import styled from 'styled-components'
import { blueGradient } from 'src/styles/gradient'
import { boxShahowWithOnHover } from 'src/styles/boxShahow'
import Input from 'src/components/molecules/Input'
import { InfoCircleOutlined, CodeOutlined, DeploymentUnitOutlined } from '@ant-design/icons'

const NpmMarketContractAddress = '0x88c7B1f41DdE50efFc25541a2E0769B887eB2ee7'

export interface Props {
  market: string
  property?: string
}

const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
`

const Row = styled.div`
  display: grid;
  grid-gap: 0.75rem;
  @media (min-width: 768px) {
    grid-template-columns: 240px 1fr;
    & > *:first-child {
      text-align: left;
    }
  }
`

const Span = styled.div`
  font-size: 1.2em;
  margin-top: 5px;
`

const ButtonContainer = styled.div`
  width: auto;
  align-self: flex-end;
`
const Submit = styled.button`
  padding: 10px 40px;
  border-radius: 6px;
  border: none;
  background-image: linear-gradient(to right, #2f80ed, #1ac9fc);
  cursor: pointer;
  color: white;
  ${blueGradient()}
  ${boxShahowWithOnHover()}
`

const InfoContainer = styled.div`
  margin-right: 20px;
  svg {
    width: 1.5em;
    height: auto;
  }
`

export const AuthForm = ({ market, property }: Props) => {
  const [metrics, setMetrics] = useState<string>('')
  const { postSignGitHubMarketAssetHandler, isLoading } = usePostSignGitHubMarketAsset()
  const { authenticate } = useAuthenticate()
  const { createAndAuthenticate } = useCreateAndAuthenticate()
  const onFinish = async (values: any) => {
    const authRequestData: string[] =
      market === NpmMarketContractAddress
        ? Object.values(values)
        : await (async () => {
            const repository: string = values.repositoryName
            const personalAccessToken = values.personalAccessToken
            const khaos = await postSignGitHubMarketAssetHandler(repository, personalAccessToken)
            return [repository, khaos.publicSignature || '']
          })()

    const metrics = await (property
      ? authenticate(market, property, authRequestData)
      : ((name, symbol) => createAndAuthenticate(name, symbol, market, authRequestData))(
          values.propertyName,
          values.propertySymbol
        ))

    if (metrics) {
      setMetrics(metrics)
    }
  }

  return (
    <Container>
      {metrics ? (
        <Result
          status="success"
          title="Successfully Authenticated Your Asset!"
          subTitle="Viewing a new asset will take dozens of minutes, but you can also check it out right away on Etherscan."
          extra={[
            <Button key="etherscan" href={`https://etherscan.io/address/${metrics}`}>
              Etherscan
            </Button>,
            <Button key="property" href={`/${property}`} type="primary">
              Go the Property
            </Button>
          ]}
        />
      ) : (
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
          <Row>
            <Span>Project name</Span>
            <Form.Item
              name="projectName"
              rules={[{ required: true, message: 'Please input GitHub Repository name (e.g., your/awesome-repos)' }]}
              key="projectName"
            >
              <Input Icon={DeploymentUnitOutlined} label="projectName" placeholder="OSS Project name" />
            </Form.Item>
          </Row>

          <Row>
            <Span>Personal Access Token</Span>
            <Form.Item
              name="personalAccessToken"
              rules={[{ required: true, message: 'Please input PAT.' }]}
              key="personalAccessToken"
            >
              <Input Icon={CodeOutlined} label="personalAccessToken" placeholder="Personal Access Token" />
            </Form.Item>
          </Row>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
            <InfoContainer>
              <InfoCircleOutlined />
            </InfoContainer>
            <div style={{ fontSize: '0.9em' }}>
              <div>
                Please{' '}
                <a href="https://github.com/settings/tokens/new" target="_blank" rel="noreferrer">
                  create a Personal Access Token without any scopes.
                </a>
              </div>
              <div>
                The PAT is confidentially authenticated using the Khaos oracle(
                <a href="https://github.com/dev-protocol/khaos" target="_blank" rel="noreferrer">
                  *
                </a>
                ).
              </div>
            </div>
          </div>

          <Row>
            <div style={{ display: 'flex', gridColumn: '1/-1', justifyContent: 'flex-end' }}>
              <ButtonContainer>
                <Submit type="submit" disabled={isLoading}>
                  Authenticate
                </Submit>
              </ButtonContainer>
            </div>
          </Row>
        </Form>
      )}
    </Container>
  )
}
