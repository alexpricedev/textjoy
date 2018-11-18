import React from 'react';
import Head from 'next/head';
import App, { Container } from 'next/app';

import Header from '../components/Header';
import Footer from '../components/Footer';
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
            ThoughtfulSMS - Lovely Messages Delivered to Your Loved Ones Each
            Week
          </title>
          <meta
            name="description"
            content="ThoughtfulSMS is a unique gift where you can buy a friend a year of delightful SMS messages sent directly to them, once per week."
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="shortcut icon"
            href="/static/favicon.ico"
            type="image/x-icon"
          />
          <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
        <Reset />
        <style global jsx>{`
          * {
            box-sizing: border-box;
          }

          body {
            background-image: linear-gradient(to top, #37ecba 0%, #72afd3 100%);
            color: #505050;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
            line-height: 1.3;
            min-height: 100vh;
            position: relative;
          }

          .wrapper {
            margin: 0 auto;
            max-width: 800px;
          }

          strong {
            font-weight: 700;
          }
        `}</style>
      </Container>
    );
  }
}

export default ThoughtfulSMS;
