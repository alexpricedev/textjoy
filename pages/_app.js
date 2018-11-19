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

          {/* Facebook pixel */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                <script>
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '359356424636659');
                  fbq('track', 'PageView');
                </script>
          `,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=359356424636659&ev=PageView&noscript=1" />`,
            }}
          />
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
