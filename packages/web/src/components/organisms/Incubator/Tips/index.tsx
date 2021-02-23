import React from 'react'
import styled from 'styled-components'

import { LinkB, H3Xs, Text1L, H2M } from 'src/components/organisms/Incubator/Typography'
import Link from 'next/link'

const tips = [
  {
    question: 'What is Stakes Social?',
    answer:
      'Stakes Social is Dev Protocol’s user facing application where OSS projects and patrons connect. \
      OSS projects use Stakes Social to tokenize, obtain patrons, build communities, and incentive stakeholders \
      in order to grow their project. Patrons use Stakes Social to stake the DEV token for OSS projects they support.'
  },
  {
    question: 'What is Dev Protocol?',
    answer:
      'Dev is a blockchain protocol that allows Open Source projects to sustainably fund their development. Patrons stake the DEV token for projects they want to fund. The protocol then mints new DEV tokens that are split between the OSS project and Patron. Dev Protocol is the only platform that allows both Patrons and OSS projects to earn money by supporting each other. The Protocol’s APY is based on DEV staked on the protocol and OSS projects onboarded.'
  },
  {
    question: 'How much time is remaining in the round?',
    answer:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    question: 'What happens at the end of the round?',
    answer:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  \
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur \
      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
]

const RandomTipContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  max-width: 1128px;
  padding: 1.5em 0;
`

const TipGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr;
  grid-template-areas:
    'question answer'
    '. all';
  grid-gap: 75px 8rem;
  padding-top: 4.25em;
  padding-bottom: 3em;
`

const ShowAllContainer = styled.div`
  grid-area: all;
  > a {
    margin-left: 15px;
    color: black;
    font-size: 16px;
    text-decoration: none;
    padding-bottom: 3px;
    border-bottom: 1px solid black;

    :hover {
      color: #5b8bf5;
      border-bottom: 1px solid #5b8bf5;
    }
  }
`

const RandomTip = () => {
  const randomElement = tips[Math.floor(Math.random() * tips.length)]
  return (
    <TipGrid>
      <H2M style={{ gridArea: 'question' }}>{randomElement.question}</H2M>
      <Text1L style={{ gridArea: 'answer' }} fontSize="20px">
        {randomElement.answer}
      </Text1L>
      <ShowAllContainer>
        <Link href="/incubator/QA">
          <LinkB>{'Show all Q&As'}</LinkB>
        </Link>
      </ShowAllContainer>
    </TipGrid>
  )
}

const RandomTips = () => {
  return (
    <RandomTipContainer>
      <H3Xs>Random Incubator Tip</H3Xs>
      <RandomTip />
    </RandomTipContainer>
  )
}

export default RandomTips
