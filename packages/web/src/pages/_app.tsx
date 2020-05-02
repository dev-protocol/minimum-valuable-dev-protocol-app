import * as React from 'react'
import { Modal } from 'antd'
import App, { AppInitialProps } from 'next/app'
import { WithApolloProps } from 'next-with-apollo'
import Head from 'next/head'
import withApollo from 'src/fixtures/withApollo'

class NextApp extends App<AppInitialProps & WithApolloProps<{}>> {
  componentDidCatch = (error: Error, errorInfo: React.ErrorInfo) => {
    super.componentDidCatch(error, errorInfo)
  }

  componentDidMount = () => {
    const { ethereum } = window
    if (!ethereum) {
      // TODO: fix design and messages.
      Modal.error({
        title: 'This is an error message',
        content: 'some messages...some messages...'
      })
    }
  }

  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <>
        <Head>
          <title>boiler</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} apollo={apollo} />
      </>
    )
  }
}

export default withApollo(NextApp)
