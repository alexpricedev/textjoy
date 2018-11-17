import React, { Fragment, useState } from "react";
import Head from "next/head";

import Checkout from "../components/Checkout";
import Header from "../components/Header";
import Reset from "../components/Reset";
import { collections } from "../constants";

const Index = () => {
  const [currentCollection, setCollection] = useState(collections.love);

  return (
    <Fragment>
      <Head>
        <title>
          ThoughtfulSMS - Weekly Thoughtful Messages Delivered to Your Loved
          Ones
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css?family=Courgette"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <div className="leader">
        <h1 className="wrapper">
          Deliver Weekly Thoughtful Messages To Your Friends &amp; Loved Ones
        </h1>
      </div>
      <Checkout
        currentCollection={currentCollection}
        setCollection={setCollection}
      />
      <Reset />
      <style global jsx>{`
        * {
          box-sizing: border-box;
        }

        body {
          color: #505050;
          font-family: "Courgette", cursive;
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
      <style jsx>{`
        .leader {
          background: #909bce;
          margin: 0 0 40px;
          padding: 80px 20px;
          text-align: center;
        }

        .leader h1 {
          color: #ffffff;
          font-size: 42px;
        }
      `}</style>
    </Fragment>
  );
};

export default Index;
