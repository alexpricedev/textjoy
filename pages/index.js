import React, { Fragment, useState } from 'react';

import Checkout from '../components/Checkout';
import { collections } from '../constants';

const Index = () => {
  const [currentCollectionId, setCollection] = useState(collections.love.id);

  return (
    <Fragment>
      <Checkout
        currentCollectionId={currentCollectionId}
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
          font-weight: bold;
          font-size: 42px;
        }
      `}</style>
    </Fragment>
  );
};

export default Index;
