import React, { useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import { PossessionOutline } from 'src/components/organisms/PossessionOutline'
import { PropertyHeader } from 'src/components/organisms/PropertyHeader'
import { Footer } from 'src/components/organisms/Footer'
import { EarlyAccess } from 'src/components/atoms/EarlyAccess'
import styled from 'styled-components'
import { Container } from 'src/components/atoms/Container'
import { Header } from 'src/components/organisms/Header'
import TopStakers from 'src/components/organisms/TopStakers'
import { AvatarUser } from 'src/components/molecules/AvatarUser'
import { useAPY, usePropertyAuthor } from 'src/fixtures/dev-kit/hooks'
import { useGetPropertyAuthenticationQuery, useGetPropertyAggregateLazyQuery } from '@dev/graphql'
import { PlusOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useGetPropertytInformation } from 'src/fixtures/devprtcl/hooks'
import { useGetAccount, useGetProperty } from 'src/fixtures/dev-for-apps/hooks'
import ReactMarkdown from 'react-markdown'
import { WithGradient } from 'src/components/atoms/WithGradient'
import { Stake } from 'src/components/organisms/Stake'
import { Withdraw } from 'src/components/organisms/Withdraw'

type Props = {}

const Main = styled(Container)`
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: 1fr;
  @media (min-width: 1024px) {
    grid-gap: 3rem 2rem;
  }
`
const Cover = styled.div`
  padding-top: 52.5%;
  position: relative;
  background-size: cover;
  border-radius: 5px;
  background-image: linear-gradient(
    134deg,
    rgb(47, 67, 237) 0%,
    rgb(47, 128, 237) 23%,
    rgb(47, 172, 237) 46%,
    rgb(190, 208, 230) 100%
  );
`

const TopStakerList = styled(TopStakers)``

const Transact = styled.div`
  display: grid;
  grid-gap: 1rem;
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem;
  }
`
const Possession = styled(PossessionOutline)``

const Wrap = styled.div`
  margin: 2rem auto;
  max-width: 1048px;
  @media (min-width: 768px) {
    margin: 5rem auto;
  }
`

const AboutSection = styled.div`
  display: flex;
  flex-direction: column;
`

const AssetsSection = styled.div`
  display: flex;
  flex-direction: column;
`
const AssetList = styled.div`
  display: flex;
`

const AssetListItem = styled.div`
  padding: 5px 8px;
  border: 1px solid lightgrey;
  border-radius: 6px;
  margin-right: 5px;
  box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06);
`

const AddAsset = styled.button`
  display: flex;
  background: none;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  border: 1px solid lightgrey;
  border-radius: 6px;
  box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12);
    transition: 0.2 ease-in;
  }
`

const AuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const Flex = styled.div`
  display: flex;
  /* align-items: center; */

  img {
    border-radius: 90px;
  }
`

const CreatorContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
`

const CoverImageOrGradient = ({ src }: { src?: string }) => (
  <Cover style={src ? { backgroundImage: `url(${src})` } : {}} />
)

const Author = ({ propertyAddress }: { propertyAddress: string }) => {
  const { data, error } = useGetPropertytInformation(propertyAddress)
  const { author: authorAddress } = usePropertyAuthor(propertyAddress)
  const { data: dataAuthor } = useGetAccount(authorAddress)

  const [fetchAggregate, { data: aggregateData }] = useGetPropertyAggregateLazyQuery()

  useEffect(() => {
    if (authorAddress) {
      fetchAggregate({
        variables: {
          authorAddress
        }
      })
    }
  }, [authorAddress, fetchAggregate])

  return (
    <AuthorContainer>
      {data && (
        <>
          <h2>Created by {data?.name}</h2>
          <Flex>
            <div style={{ width: '150px' }}>
              <AvatarUser accountAddress={authorAddress} size={150} />
            </div>

            <CreatorContent>
              <ReactMarkdown>{dataAuthor ? dataAuthor.biography : ''}</ReactMarkdown>
              <p>
                <WithGradient>{aggregateData?.property_meta_aggregate.aggregate?.count || 0}</WithGradient> Pool(s) |{' '}
                <WithGradient>{data?.author?.karma || 0} </WithGradient> Karma
              </p>
            </CreatorContent>
          </Flex>
        </>
      )}

      {!data && !error && (
        <>
          <div>Author</div>
          <div>Loading...</div>
        </>
      )}

      {error && (
        <>
          <div>Author</div>
          <div>Cannot load: {error.message}</div>
        </>
      )}
    </AuthorContainer>
  )
}

const PropertyAddressDetail = (_: Props) => {
  const { propertyAddress } = useRouter().query as { propertyAddress: string }
  const { apy, creators } = useAPY()
  const { data } = useGetPropertyAuthenticationQuery({ variables: { propertyAddress } })
  const { data: dataProperty } = useGetProperty(propertyAddress)
  /* eslint-disable react-hooks/exhaustive-deps */
  // FYI: https://github.com/facebook/react/pull/19062
  const includedAssetList = useMemo(() => data?.property_authentication.map(e => e.authentication_id), [data])

  return (
    <>
      <Header></Header>
      <EarlyAccess></EarlyAccess>
      <Wrap>
        <Container>
          <PropertyHeader apy={apy} creators={creators} propertyAddress={propertyAddress} />
        </Container>
        <Main>
          <CoverImageOrGradient src={dataProperty?.cover_image?.url} />
          <Possession propertyAddress={propertyAddress} />
          <Transact>
            <Stake title="Stake" propertyAddress={propertyAddress} />
            <Withdraw title="Withdraw" propertyAddress={propertyAddress} />
          </Transact>
          <AboutSection>
            <h2>About</h2>
            <ReactMarkdown>{dataProperty ? dataProperty.description : ''}</ReactMarkdown>
          </AboutSection>
          <AssetsSection>
            <h2>Included assets</h2>
            <AssetList>
              {includedAssetList?.map((asset, index) => (
                <AssetListItem key={index}>{asset}</AssetListItem>
              ))}
              <Link href={'/auth/[property]'} as={`/auth/${propertyAddress}`}>
                <AddAsset>
                  <PlusOutlined />
                  <span>Add asset</span>
                </AddAsset>
              </Link>
            </AssetList>
          </AssetsSection>
          <Author propertyAddress={propertyAddress} />
          <div>
            <h2>Top stakers</h2>
            <TopStakerList propertyAdress={propertyAddress} />
          </div>
        </Main>
      </Wrap>

      <Footer />
    </>
  )
}

export default PropertyAddressDetail
