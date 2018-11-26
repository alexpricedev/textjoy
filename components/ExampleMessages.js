import { Fragment } from 'react';
import Select from 'react-select';

export default props => {
  const {
    collection,
    collectionOptions,
    currentCollectionId,
    customStyles,
    formValues,
    setCollection,
  } = props;

  return (
    <Fragment>
      <div className="mobile-collection-select">
        <label htmlFor="mobileCollectionId">View collections</label>
        <Select
          id="mobileCollectionId"
          onChange={({ value }) => setCollection(value)}
          options={collectionOptions}
          styles={customStyles()}
          value={{
            value: currentCollectionId,
            label: collection.name,
          }}
        />
      </div>
      <h3>{collection.intro}</h3>
      <div className="message">
        {collection.demoMessages[0](formValues.recipientFirstName || 'Chloe')}
      </div>
      <div className="message message--two">
        {collection.demoMessages[1](formValues.recipientFirstName || 'James')}
      </div>
      <style jsx>{`
        label {
          display: inline-block;
          font-size: 14px;
          margin: 0 0 4px;
        }

        h3 {
          color: #ffffff;
          font-size: 20px;
          font-weight: 300;
          letter-spacing: 1px;
          margin: 0 0 30px;
          padding: 0 20px;
          position: relative;
          text-align: left;
        }

        h3::after {
          background: #ffffff;
          border-top-right-radius: 99px;
          border-bottom-right-radius: 99px;
          box-shadow: 1px 1px 1px 0px rgba(80, 80, 80, 0.4);
          content: '';
          display: block;
          height: 4px;
          left: -20px;
          position: absolute;
          top: 56px;
          width: 28px;
        }

        @media only screen and (max-width: 834px) {
          h3 {
            text-align: center;
            margin: 0 0 40px;
          }

          h3::after {
            display: none;
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-collection-select {
          display: none;
          padding-bottom: 20px;
        }

        .mobile-collection-select label {
          color: #fff;
          display: block;
          text-align: center;
        }

        .message {
          animation-duration: 1.2s;
          animation-delay: 1.5s;
          animation-fill-mode: both;
          animation-name: fadeInUp;
          background: #ffffff;
          border-radius: 15px;
          color: #505050;
          font-weight: 400;
          margin: 0 20px 50px;
          padding: 23px;
          position: relative;
        }

        .message--two {
          animation-delay: 3s;
        }

        .message::after {
          border-color: transparent #ffffff transparent transparent;
          border-style: solid;
          border-width: 0 32px 32px 0;
          bottom: -17px;
          content: '';
          display: inline-block;
          height: 0;
          position: absolute;
          right: 0;
          width: 0;
        }

        @media only screen and (max-width: 834px) {
          .mobile-collection-select {
            display: block;
          }

          .message {
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>

      <style global jsx>{`
        #mobileCollectionId {
          margin: 0 auto;
          max-width: 300px;
        }
      `}</style>
    </Fragment>
  );
};
