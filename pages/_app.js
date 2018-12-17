import React from 'react';
import Head from 'next/head';
import App, { Container } from 'next/app';

import Footer from '../components/Footer';
import Reset from '../components/Reset';

class TextJoy extends App {
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
            TextJoy - Educational Messages Delivered to Your Loved Ones Every
            Month
          </title>
          <meta
            name="description"
            content="TextJoy is a unique and eco-friendly gift. We'll send your friend an educational SMS message once per month for a whole year!"
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
          <meta
            name="google-site-verification"
            content="8EMJDrNHPI2I69NPIRIHJR_NK0Xs-AfGUN5EzdnOqtA"
          />

          {/* Facebook pixel */}
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s) {if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0'; n.queue=[];t=b.createElement(e);t.async=!0; t.src=v;s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)}(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '359356424636659'); fbq('track', 'PageView');`,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=359356424636659&ev=PageView&noscript=1" />`,
            }}
          />

          {/* Crisp chat */}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="a391735a-3c01-4152-b6dd-c87b85af0a5e";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
            }}
          />
        </Head>
        <Component {...pageProps} />
        <Footer />
        <Reset />
        <style global jsx>{`
          * {
            box-sizing: border-box;
          }

          body {
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

export default TextJoy;
