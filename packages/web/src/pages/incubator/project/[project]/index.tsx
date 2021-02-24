import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import * as lorem from 'lorem-ipsum'

import { Span, H1Large, Text1S, H1M, Text1L, H3Xs, ButtonM } from 'src/components/organisms/Incubator/Typography'
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
import { TwitterBlackWhite, GithubIcon } from 'src/components/organisms/Incubator/Icons'

const ipsum = new lorem.LoremIpsum({
  sentencesPerParagraph: { min: 1, max: 3 },
  wordsPerSentence: { min: 6, max: 10 }
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  max-width: 1128px;
`

const BackArrowContainer = styled.div`
  display: flex;

  > svg {
    cursor: pointer;
  }
`

const DetailsContainer = styled.div`
  display: grid;
  padding-top: 95px;
  grid-template-columns: 1fr 1fr;
  column-gap: 120px;
  margin-bottom: 5em;
`

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 54px;
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
  padding-top: 1em;
`

const IconContainer = styled.div`
  cursor: pointer;
  padding-left: 8px;
  padding-right: 8px;
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
  padding-top: 21px;
  width: 100%;
`

const DevCurrencyContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 24px;
    height: auto;
  }
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
        <SpaceBetween>
          <Contact>
            <H1Large>{name}</H1Large>
            <LinkB style={{ paddingTop: '11px' }}>{website}</LinkB>
            <SocialMediaContainer>
              <IconContainer style={{ paddingLeft: 0 }}>
                <a target="_blank" rel="noopener noreferrer" href={twitter}>
                  <TwitterBlackWhite />
                </a>
              </IconContainer>
              <IconContainer>
                <a target="_blank" rel="noopener noreferrer" href={github}>
                  <GithubIcon />
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
            <Text1S color="#CCCCCC">Funding received</Text1S>
            <SpaceBetween>
              <DevCurrencyContainer>
                <DevCurrencySymbol />
                <H1M style={{ marginLeft: '5px', transform: 'translateY(-2px)' }}>{fundingDEV} DEV</H1M>
              </DevCurrencyContainer>
              <Button disabled={claimed} onClick={() => onStateChange('onboarding')}>
                {claimed ? 'Claimed' : 'Claim'}
              </Button>
            </SpaceBetween>

            <Text1S color="#999999">$ {fundingUSD} USD</Text1S>
          </FundingContainer>
        </SpaceBetween>
      </div>
      <DescriptionContainer>
        <Text1L>{ipsum.generateSentences(9)}</Text1L>
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
  font-size: 16px;
  width: fit-content;
  color: ${props => (props?.isActive ? '#00D0FD' : 'black')};

  padding-bottom: ${props => (!props.isActive ? '2px' : 'none')};
  border-bottom: ${props => (!props.isActive ? '1px solid black' : 'none')};
`

type OnboardSwitchType = {
  isOnboarding: boolean
  onOnboardChange: React.Dispatch<React.SetStateAction<boolean>>
}

export const OnboardSwitch = ({ isOnboarding, onOnboardChange }: OnboardSwitchType) => {
  return (
    <OnboardSwitchContainer>
      <OnboardEntry onClick={() => onOnboardChange(true)} isActive={isOnboarding}>
        <ButtonM fontSize="16px">Onboarding</ButtonM>
      </OnboardEntry>
      <div style={{ paddingRight: '1.5em', marginRight: '1.5em', borderRight: '1px solid black' }} />
      <OnboardEntry onClick={() => onOnboardChange(false)} isActive={!isOnboarding}>
        <ButtonM fontSize="16px">Post-Onboarding</ButtonM>
      </OnboardEntry>
    </OnboardSwitchContainer>
  )
}

const TimelineContainer = styled.div`
  display: flex;
`

type OnboardingSectionProps = {
  onBoardChange: React.Dispatch<React.SetStateAction<boolean>>
  isModal?: boolean
  onStateChange: React.Dispatch<React.SetStateAction<string>>
  isOnboarding: boolean
}

const OnboardingSection = ({ isModal, onStateChange, onBoardChange, isOnboarding }: OnboardingSectionProps) => {
  const [activePart, setActivePart] = useState(1)

  return (
    <>
      <SpaceBetween style={{ paddingTop: isModal ? '27px' : '64px', alignItems: 'center', paddingBottom: '1em' }}>
        <H3Xs>{'How to receive your funding?'}</H3Xs>

        <TimelineContainer style={{ alignSelf: 'center' }}>
          <TimelineSection isFirst={true} onActivePartChange={setActivePart} part={1} currentPart={activePart} />
          <TimelineSection part={2} onActivePartChange={setActivePart} currentPart={activePart} />
          <TimelineSection part={3} onActivePartChange={setActivePart} currentPart={activePart} />
          <TimelineSection part={4} onActivePartChange={setActivePart} currentPart={activePart} />
          <TimelineSection part={5} onActivePartChange={setActivePart} currentPart={activePart} isLast={true} />
        </TimelineContainer>

        {isModal ? (
          <LinkB onClick={() => onStateChange('authentication')}>Skip</LinkB>
        ) : (
          <OnboardSwitch isOnboarding={isOnboarding} onOnboardChange={onBoardChange} />
        )}
      </SpaceBetween>
      {activePart === 1 && <DownloadMetamask onActivePartChange={setActivePart} />}
      {activePart === 2 && <PurchaseEthereum onActivePartChange={setActivePart} />}
      {activePart === 3 && <ConnectWallet onActivePartChange={setActivePart} />}
      {activePart === 4 && <CopyPat onActivePartChange={setActivePart} />}
      {activePart === 5 && <SubmitTransaction onActivePartChange={setActivePart} />}
    </>
  )
}

const OnboardingPage = () => {
  // const [, project] = getPath(useRouter().asPath)
  // TODO: Fetch data from strapi based on project
  const [currentState, setCurrentState] = useState<string>('overview')
  const [isOnboarding, setIsOnboarding] = useState(true)
  const [authenticationProgress, setAuthenticationProgress] = useState(1)
  const { name, fundingDEV, fundingUSD, github, logo, twitter, website, claimed } = {
    name: 'Sigma',
    website: 'sigmaprime.io',
    twitter: '',
    github: '',
    fundingUSD: '26,000',
    fundingDEV: '71,000',
    claimed: false,
    logo: 'https://res.cloudinary.com/haas-storage/image/upload/v1614068316/sigma_2x_aibcyi.png'
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
      <Container style={{ flexGrow: 1 }}>
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
            <OnboardingSection
              isOnboarding={isOnboarding}
              onBoardChange={setIsOnboarding}
              onStateChange={setCurrentState}
              isModal={true}
            />
          </Container>
        )}

        {currentState === 'authentication' && (
          <Authentication progress={authenticationProgress} onStateChange={setCurrentState} />
        )}

        {currentState === 'loading' && <AuthenticateLoading />}

        {currentState === 'success' && <ClaimSuccesful onStateChange={setCurrentState} />}

        {currentState === 'whatsnext' && <WhatsNext onBoardChange={setIsOnboarding} isOnboarding={false} />}
      </Container>

      {currentState === 'overview' && isOnboarding && (
        <Container>
          <Hr />
          <OnboardingSection
            isOnboarding={isOnboarding}
            onBoardChange={setIsOnboarding}
            onStateChange={setCurrentState}
          />
        </Container>
      )}

      {currentState === 'overview' && !isOnboarding && (
        <Container>
          <Hr />
          <WhatsNext isOverview={true} isOnboarding={isOnboarding} onBoardChange={setIsOnboarding} />
        </Container>
      )}

      <Footer />
    </div>
  )
}

export default OnboardingPage
