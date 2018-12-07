import React, { Fragment, useState } from 'react';

import Header from '../components/Header';
import Checkout from '../components/Checkout';
import FAQ from '../components/FAQ';
import WhatIsThis from '../components/WhatIsThis';
import { collections } from '../constants';

const Index = () => {
  const [currentCollectionId, setCollection] = useState(
    collections['inspirational-women'].id,
  );

  return (
    <Fragment>
      <div className="bg">
        <Header />
        <Checkout
          currentCollectionId={currentCollectionId}
          setCollection={setCollection}
        />
      </div>
      <WhatIsThis />
      <div className="wrapper">
        <FAQ />
      </div>
      <style jsx>{`
        .bg {
          background-image: linear-gradient(to top, #37ecba 0%, #72afd3 100%);
          padding-bottom: 40px;
        }

        .leader {
          background: #909bce;
          margin: 0 0 40px;
          padding: 80px 20px;
          text-align: center;
        }

        .leader h1 {
          color: #ffffff;
          font-weight: bold;
          font-size: 42px;
        }
      `}</style>
    </Fragment>
  );
};

export default Index;
