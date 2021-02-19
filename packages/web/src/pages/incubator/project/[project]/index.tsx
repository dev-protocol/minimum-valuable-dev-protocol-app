import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import * as lorem from 'lorem-ipsum'

import { Span } from 'src/components/organisms/Incubator/Typography'
import { Button } from 'src/components/organisms/Incubator/molecules/Button'
import IncubatorHeader from 'src/components/organisms/Incubator/Header'
import Footer from 'src/components/organisms/Incubator/Footer'
import BackArrow from 'src/components/organisms/Incubator/molecules/BackArrow'
import DevCurrencySymbol from 'src/components/organisms/Incubator/molecules/DevCurrency'
import Hr from 'src/components/organisms/Incubator/molecules/Hr'
import TimelineSection from 'src/components/organisms/Incubator/Timeline'
import DownloadMetamask from 'src/components/organisms/Incubator/Onboarding/DownloadMetamask'
import AuthenticateLoading from 'src/components/organisms/Incubator/Claiming/AuthenticateLoading'
import ClaimSuccesful from 'src/components/organisms/Incubator/Claiming/ClaimSuccesful'
import WhatsNext from 'src/components/organisms/Incubator/PostOnboarding'
import Authentication from 'src/components/organisms/Incubator/Claiming/Authentication'
import PurchaseEthereum from 'src/components/organisms/Incubator/Onboarding/PurchaseEthereum'
import ConnectWallet from 'src/components/organisms/Incubator/Onboarding/ConnectWallet'
import CopyPat from 'src/components/organisms/Incubator/Onboarding/CopyPAT'
import SubmitTransaction from 'src/components/organisms/Incubator/Onboarding/SubmitTransaction'

const LABEL_PLACEHOLDERS = ['Crypto OSS', 'Women that Code']

const ipsum = new lorem.LoremIpsum({
  sentencesPerParagraph: { min: 1, max: 3 },
  wordsPerSentence: { min: 6, max: 10 }
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
`

const BackArrowContainer = styled.div`
  display: flex;
  padding: 1em 0 3em 0;

  > svg {
    cursor: pointer;
  }
`

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5em;
`

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

const Contact = styled.div`
  display: flex;
  flex-direction: column;
`
const LinkB = styled.a`
  font-family: WhyteInktrap;
  text-decoration: none;
  height: fit-content;
  padding: 2px;
  color: black;
  border-bottom: 1px solid black;
  max-width: fit-content;

  :hover {
    color: #5b8bf5;
    border-bottom: 1px solid #5b8bf5;
  }
`

const SocialMediaContainer = styled.div`
  display: flex;
`

const IconContainer = styled.div`
  cursor: pointer;
  padding: 7.5px;

  > a {
    text-decoration: none;
  }
`

const LogoContainer = styled.div`
  img,
  svg {
    width: 72px;
    height: auto;
  }
`

const FundingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1em;
  width: 100%;
`

const DevCurrencyContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 28px;
    height: auto;
  }
`

const LabelContainer = styled.div`
  display: flex;
  padding-top: 3em;

  > div {
    margin-right: 15px;
  }
`

const FilterOption = styled.div`
  padding: 10px 25px;
  border-radius: 24px;
  border: 1px solid #999999;
  color: #999999;
  font-size: 20px;
`

type ProjectDetailsProps = {
  onStateChange: React.Dispatch<React.SetStateAction<string>>
  website: string
  twitter: string
  github: string
  logo: string
  fundingDEV: string
  name: string
  fundingUSD: string
  claimed: boolean
}

const ProjectDetails = ({
  fundingDEV,
  fundingUSD,
  github,
  logo,
  twitter,
  website,
  name,
  claimed,
  onStateChange
}: ProjectDetailsProps) => {
  return (
    <DetailsContainer>
      <div>
        <SpaceBetween style={{ paddingBottom: '3em' }}>
          <Contact>
            <Span fontSize="40px" fontWeight="bold">
              {name}
            </Span>
            <LinkB>{website}</LinkB>
            <SocialMediaContainer>
              <IconContainer style={{ paddingLeft: 0 }}>
                <a target="_blank" rel="noopener noreferrer" href={twitter}>
                  <img src="https://res.cloudinary.com/haas-storage/image/upload/v1613111072/twitter_kggvre.png" />
                </a>
              </IconContainer>
              <IconContainer>
                <a target="_blank" rel="noopener noreferrer" href={github}>
                  <img src="https://res.cloudinary.com/haas-storage/image/upload/v1613111071/github_rg8ngo.png" />
                </a>
              </IconContainer>
            </SocialMediaContainer>
          </Contact>
          <LogoContainer>
            <img src={logo} />
          </LogoContainer>
        </SpaceBetween>
        <hr color="#CCCCCC" />

        <SpaceBetween style={{ alignItems: 'center' }}>
          <FundingContainer>
            <Span fontSize="14px" color="#CCCCCC">
              Funding received
            </Span>
            <SpaceBetween>
              <DevCurrencyContainer>
                <DevCurrencySymbol />
                <Span style={{ marginLeft: '5px', transform: 'translateY(-2px)' }} fontWeight="bold" fontSize="32px">
                  {fundingDEV} DEV
                </Span>
              </DevCurrencyContainer>
              <Button disabled={claimed} onClick={() => onStateChange('onboarding')}>
                {claimed ? 'Claimed' : 'Claim'}
              </Button>
            </SpaceBetween>

            <Span fontSize="14px" color="#999999">
              $ {fundingUSD} USD
            </Span>
          </FundingContainer>
        </SpaceBetween>
      </div>
      <DescriptionContainer>
        <Span fontSize="20px">{ipsum.generateSentences(9)}</Span>
        <LabelContainer>
          {LABEL_PLACEHOLDERS.map((label, index) => {
            return (
              <FilterOption key={index}>
                <Span fontSize="20px">{label}</Span>
              </FilterOption>
            )
          })}
        </LabelContainer>
      </DescriptionContainer>
    </DetailsContainer>
  )
}

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const OnboardSwitchContainer = styled.div`
  display: flex;
  padding: 10px;
  width: fit-content;
`

const OnboardEntry = styled.div<{ isActive?: boolean }>`
  cursor: pointer;
  font-size: 20px;
  width: fit-content;
  color: ${props => (props?.isActive ? '#00D0FD' : 'black')};

  padding-bottom: ${props => (!props.isActive ? '2px' : 'none')};
  border-bottom: ${props => (!props.isActive ? '1px solid black' : 'none')};
`

type OnboardSwitchType = {
  isOnboarding: boolean
  onOnboardChange: React.Dispatch<React.SetStateAction<boolean>>
}

const OnboardSwitch = ({ isOnboarding, onOnboardChange }: OnboardSwitchType) => {
  return (
    <OnboardSwitchContainer>
      <OnboardEntry onClick={() => onOnboardChange(true)} isActive={isOnboarding}>
        <Span fontSize="20px">Onboarding</Span>
      </OnboardEntry>
      <div style={{ paddingRight: '3em', marginRight: '3em', borderRight: '1px solid black' }} />
      <OnboardEntry onClick={() => onOnboardChange(false)} isActive={!isOnboarding}>
        <Span fontSize="20px">Post-Onboarding</Span>
      </OnboardEntry>
    </OnboardSwitchContainer>
  )
}

const TimelineContainer = styled.div`
  display: flex;
`

type OnboardingSectionProps = {
  isModal?: boolean
  onStateChange: React.Dispatch<React.SetStateAction<string>>
}

const OnboardingSection = ({ isModal, onStateChange }: OnboardingSectionProps) => {
  const [activePart, setActivePart] = useState(1)
  const [isOnboarding, setIsOnboarding] = useState(true)

  return (
    <>
      <SpaceBetween style={{ alignItems: 'center', paddingTop: '1em' }}>
        <Span fontSize="20px">{isOnboarding ? 'How to receive your funding?' : "What's next?"}</Span>
        {isModal ? (
          <LinkB onClick={() => onStateChange('authentication')} style={{ fontSize: '20px' }}>
            Skip
          </LinkB>
        ) : (
          <OnboardSwitch isOnboarding={isOnboarding} onOnboardChange={setIsOnboarding} />
        )}
      </SpaceBetween>
      {isOnboarding && (
        <>
          <TimelineContainer style={{ alignSelf: 'center' }}>
            <TimelineSection isFirst={true} onActivePartChange={setActivePart} part={1} currentPart={activePart} />
            <TimelineSection part={2} onActivePartChange={setActivePart} currentPart={activePart} />
            <TimelineSection part={3} onActivePartChange={setActivePart} currentPart={activePart} />
            <TimelineSection part={4} onActivePartChange={setActivePart} currentPart={activePart} />
            <TimelineSection part={5} onActivePartChange={setActivePart} currentPart={activePart} isLast={true} />
          </TimelineContainer>
          {activePart === 1 && <DownloadMetamask onActivePartChange={setActivePart} />}
          {activePart === 2 && <PurchaseEthereum onActivePartChange={setActivePart} />}
          {activePart === 3 && <ConnectWallet onActivePartChange={setActivePart} />}
          {activePart === 4 && <CopyPat onActivePartChange={setActivePart} />}
          {activePart === 5 && <SubmitTransaction onActivePartChange={setActivePart} />}
        </>
      )}

      {!isOnboarding && <WhatsNext isOverview={true} />}
    </>
  )
}

const OnboardingPage = () => {
  // const [, project] = getPath(useRouter().asPath)
  // TODO: Fetch data from strapi based on project
  const [currentState, setCurrentState] = useState<string>('overview')
  const [authenticationProgress, setAuthenticationProgress] = useState(1)
  const { name, fundingDEV, fundingUSD, github, logo, twitter, website, claimed } = {
    name: 'Sigma',
    website: 'sigmaprime.io',
    twitter: '',
    github: '',
    fundingUSD: '26,000',
    fundingDEV: '71,000',
    claimed: false,
    logo: 'https://res.cloudinary.com/haas-storage/image/upload/v1613044939/sigma_tye6kg.png'
  }

  useEffect(() => {
    if (currentState === 'loading') {
      const status = authenticationProgress === 2 ? 'success' : 'authentication'
      setTimeout(() => {
        setCurrentState(status)
        setAuthenticationProgress(2)
      }, 3000)
    }
  }, [currentState, authenticationProgress])

  return (
    <div style={{ position: 'relative', display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <IncubatorHeader />
      <Container style={{ paddingBottom: '6em', flexGrow: 1 }}>
        <BackArrowContainer>
          {currentState === 'overview' && (
            <Link href="/incubator" as="/incubator" passHref>
              <div style={{ cursor: 'pointer' }}>
                <BackArrow />
              </div>
            </Link>
          )}

          {(currentState === 'authentication' || currentState === 'onboarding') && (
            <div onClick={() => setCurrentState('overview')} style={{ cursor: 'pointer' }}>
              <BackArrow />
            </div>
          )}
        </BackArrowContainer>
        {currentState === 'overview' && (
          <ProjectDetails
            claimed={claimed}
            onStateChange={setCurrentState}
            name={name}
            fundingDEV={fundingDEV}
            fundingUSD={fundingUSD}
            github={github}
            logo={logo}
            twitter={twitter}
            website={website}
          />
        )}

        {currentState === 'onboarding' && (
          <Container>
            <OnboardingSection onStateChange={setCurrentState} isModal={true} />
          </Container>
        )}

        {currentState === 'authentication' && (
          <Authentication progress={authenticationProgress} onStateChange={setCurrentState} />
        )}

        {currentState === 'loading' && <AuthenticateLoading />}

        {currentState === 'success' && <ClaimSuccesful onStateChange={setCurrentState} />}

        {currentState === 'whatsnext' && <WhatsNext />}
      </Container>

      {currentState === 'overview' && (
        <Container>
          <Hr />
          <OnboardingSection onStateChange={setCurrentState} />
        </Container>
      )}

      <Footer />
    </div>
  )
}

export default OnboardingPage
