import React, { Fragment, useState } from 'react';

import Checkout from '../components/Checkout';
import { collections } from '../constants';

const Index = () => {
  const [currentCollection, setCollection] = useState(collections.love);

  return (
    <Fragment>
      <div className="leader">
        <h1 className="wrapper">
          Deliver Weekly Thoughtful Messages To Your Friends &amp; Loved Ones
        </h1>
      </div>
      <Checkout
        currentCollection={currentCollection}
        setCollection={setCollection}
      />
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
