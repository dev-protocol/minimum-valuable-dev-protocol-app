import React from 'react'

import { Span } from 'src/components/organisms/Incubator/Typography'
import Animation from './Animations'
import { AnimationContainer, Container, DescriptionContainer, BoardingNavigation } from '../../molecules/Onboarding'

type CopyPatType = {
  onActivePartChange: React.Dispatch<React.SetStateAction<number>>
}

const CopyPat = ({ onActivePartChange }: CopyPatType) => {
  return (
    <Container>
      <AnimationContainer>
        <Animation />
      </AnimationContainer>
      <DescriptionContainer>
        <Span style={{ paddingTop: '3em' }} fontWeight="bold" fontSize="24px">
          Enter Personal Access token
        </Span>
        <Span style={{ paddingTop: '3em' }} fontSize="16px">
          In order to authenticate your ownership of the project you’re attempting to claim we require you to submit
          your Github Personal Access Token (PAT). If you like you can create a new PAT with no permissions. Our Khaos
          oracle confidentially authenticates your PAT so it remains secure!
        </Span>
      </DescriptionContainer>
      <BoardingNavigation
        backwardCallback={() => onActivePartChange(3)}
        forwardCallback={() => onActivePartChange(5)}
      />
    </Container>
  )
}

export default CopyPat
