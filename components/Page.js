import { Fragment } from 'react';

import Footer from './Footer';
import Head from './Head';
import Header from './Header';
import Reset from './Reset';

const Page = ({ children }) => (
  <Fragment>
    <Head />
    <Header />
    {children}
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
  </Fragment>
);

export default Page;
