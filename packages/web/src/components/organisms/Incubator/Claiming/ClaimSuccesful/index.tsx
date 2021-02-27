import React from 'react'
import styled from 'styled-components'
import Confetti from 'react-confetti'

import useWindowDimensions from 'src/fixtures/utility/useWindowDimensions'
import { LinkB, H1Large, Text1L } from '../../Typography'
import { Button } from '../../molecules/Button'
import MintedTokens from '../Authentication/MintedTokens'
import Hr from '../../molecules/Hr'

const SuccessMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const DetailsContainer = styled.div`
  display: grid;
  padding-top: 120px;
  grid-template-columns: 1fr 1fr;
  column-gap: 120px;
  margin-bottom: 84px;
`

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

const Contact = styled.div`
  display: flex;
  flex-direction: column;
`

const LogoContainer = styled.div`
  img,
  svg {
    width: 72px;
    height: auto;
  }
`

type ClaimSuccesfulProps = {
  onStateChange: React.Dispatch<React.SetStateAction<string>>
  project: {
    name: string
    address: string
    avatar: {
      url: string
    }
    description: string
    links: {
      github?: string
      website?: string
      twitter?: string
    }
  }
}

const ClaimSuccesful = ({ onStateChange, project }: ClaimSuccesfulProps) => {
  const { width, height } = useWindowDimensions()
  const githubUrl = 'sigp/lighthouse'
  const ticker = 'SIGP'

  return (
    <>
      <DetailsContainer>
        <div>
          <SpaceBetween style={{ paddingBottom: '70px' }}>
            <Contact>
              <H1Large>{project?.name}</H1Large>
              {project.links?.github && (
                <div style={{ display: 'flex', paddingTop: '11px' }}>
                  <div style={{ marginRight: '5px', width: '24px', height: '24px' }}>
                    <img src="https://res.cloudinary.com/haas-storage/image/upload/v1613111071/github_rg8ngo.png" />
                  </div>
                  <LinkB href={project.links.github} rel="noopener noreferrer" target="_blank">
                    {githubUrl}
                  </LinkB>
                </div>
              )}
            </Contact>
            {project.avatar?.url && (
              <LogoContainer>
                <img src={project.avatar?.url} />
              </LogoContainer>
            )}
          </SpaceBetween>
          <Hr color="#CCCCCC" />
          <MintedTokens isSucces={true} address={project.address} ticker={ticker} />
        </div>
        <SuccessMessageContainer>
          <H1Large color="#1FED33">Success!</H1Large>
          <Text1L style={{ paddingTop: '40px' }}>
            Congratulations! {name} has sucessfully joined Stakes Social. The Incubator funding has been sent to your
            Metamask wallet. Please continue to the next steps to learn how to maximize your experience on Stakes
            Social.
          </Text1L>
          <SpaceBetween style={{ paddingTop: '48px', alignItems: 'center' }}>
            <div style={{ display: 'flex', height: 'fit-content' }}>
              <LinkB>Receipt</LinkB>
              <div style={{ paddingRight: '1em', marginRight: '1em', borderRight: '1px solid black' }} />
              <LinkB>Stakes.Social</LinkB>
            </div>
            <Button onClick={() => onStateChange('whatsnext')} style={{ width: '168px', height: '48px' }}>
              Next steps
            </Button>
          </SpaceBetween>
        </SuccessMessageContainer>
      </DetailsContainer>
      <Confetti width={width - 20} height={height} recycle={false} />
    </>
  )
}

export default ClaimSuccesful
