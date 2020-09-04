import React from 'react'
import { useRouter } from 'next/router'
import { Header } from 'src/components/organisms/Header'
import { EarlyAccess } from 'src/components/atoms/EarlyAccess'
import { Footer } from 'src/components/organisms/Footer'
import styled from 'styled-components'
import { LoremIpsum } from 'lorem-ipsum'
import { useListPropertyMetaQuery } from '@dev/graphql'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
})

type Props = {}

const Wrap = styled.div`
  margin: auto auto;
  max-width: 1048px;
`

const BannerContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  justify-content: center;
  background-color: black;
  padding: 40px 0;
`

const ResponsiveImage = styled.img`
  width: auto;
  height: 200px;
  @media (min-width: 1024px) {
    width: 18rem;
    height: 10rem;
  }
`
const Logo = styled.div`
  display: flex;
  grid-column: 2 / -1;
  justify-content: center;
  align-items: center;
  background-color: black;
`

const ProfilePicture = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 90px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12);
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: 170px auto;
  row-gap: 2rem;
`

const TransformedGrid = styled(Grid)`
  transform: translateY(-75px);
`

const PoolsOverview = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  row-gap: 1rem;
`

const PoolLogoSection = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 20px;
  }
`

const OwnedStake = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const TotalStaked = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Banner = () => {
  return (
    <div style={{ backgroundColor: 'black' }}>
      <Wrap>
        <div style={{ maxWidth: '1048px', marginRight: 'auto', marginLeft: 'auto', background: 'black' }}>
          <BannerContainer>
            <Logo>
              <ResponsiveImage src="https://res.cloudinary.com/haas-storage/image/upload/v1598697538/background_wmc31h.png" />
            </Logo>
          </BannerContainer>
        </div>
      </Wrap>
    </div>
  )
}

const MutedSpan = styled.span`
  color: grey;
  font-size: 0.9em;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const StakeButton = styled.button<{ bgColor?: string }>`
  padding: 6px 24px;
  border-radius: 9px;
  border: none;
  background-color: #2f80ed;
  color: white;

  cursor: pointer;
  :hover {
    transition: ease-in-out 0.2s;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`

const WithdrawButton = styled.button<{ bgColor?: string }>`
  padding: 6px 24px;
  border-radius: 9px;
  border: transparent;

  background-color: transparent;
  color: grey;
  cursor: pointer;
`

const AuthorAddressDetail = (_: Props) => {
  const router = useRouter()
  let { authorAddress } = router.query
  const author: string = typeof authorAddress == 'string' ? authorAddress : 'none'

  const { data, loading } = useListPropertyMetaQuery({
    variables: {
      author
    }
  })

  const pools: Array<{ name: string; property: string }> = data?.property_meta

  console.log('data: ', data)
  return (
    <>
      <Header></Header>
      <EarlyAccess></EarlyAccess>
      <Banner />
      <Wrap>
        <TransformedGrid>
          <ProfilePicture src="https://res.cloudinary.com/haas-storage/image/upload/v1598963050/72989_gve7hf.jpg" />
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr' }}>
            <div style={{ gridRow: '2 / -1' }}>
              <h2>Kazuya Kawaguchi</h2>
              <div>5,000 karma</div>
            </div>
          </div>
        </TransformedGrid>
      </Wrap>
      <hr color="lightgrey" />
      <Wrap>
        <Grid>
          <div style={{ gridColumn: '2 / -1' }}>
            <h2>About</h2>
            <p>{lorem.generateSentences(4)}</p>
            <p>{lorem.generateSentences(4)}</p>
          </div>
          <div style={{ gridColumn: '2 / -1' }}>
            <h2>Pools</h2>
            <div>
              {loading && <span>Loading...</span>}
              {data && (
                <PoolsOverview>
                  {pools.map(property => (
                    <>
                      <PoolLogoSection>
                        <img
                          width="75px"
                          height="75px"
                          src="https://res.cloudinary.com/haas-storage/image/upload/v1599219478/61np1wbr9pL_xecoq7.png"
                        />
                        <h3>{property.name}</h3>
                      </PoolLogoSection>
                      <OwnedStake>
                        <span>1,000 DEV</span>
                        <MutedSpan>Your stake</MutedSpan>
                      </OwnedStake>
                      <TotalStaked>
                        <span>150,000 DEV</span>
                        <MutedSpan>Total staked</MutedSpan>
                      </TotalStaked>
                      <ButtonContainer>
                        <StakeButton>Stake</StakeButton>
                        <WithdrawButton>Withdraw</WithdrawButton>
                      </ButtonContainer>
                    </>
                  ))}
                </PoolsOverview>
              )}
            </div>
          </div>
        </Grid>
      </Wrap>

      <Footer />
    </>
  )
}

export default AuthorAddressDetail
