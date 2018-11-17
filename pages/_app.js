import React from 'react';
import Head from 'next/head';
import App, { Container } from 'next/app';

import Header from '../components/Header';
import Reset from '../components/Reset';

class ThoughtfulSMS extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>
            ThoughtfulSMS - Weekly Thoughtful Messages Delivered to Your Loved
            Ones
          </title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Courgette"
            rel="stylesheet"
          />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Reset />
        <style global jsx>{`
          * {
            box-sizing: border-box;
          }

          body {
            color: #505050;
            font-family: 'Courgette', cursive;
            line-height: 1.3;
          }

          .wrapper {
            margin: 0 auto;
            max-width: 700px;
          }

          .wrapper--small {
            max-width: 400px;
          }
        `}</style>
      </Container>
    );
  }
}

export default ThoughtfulSMS;
