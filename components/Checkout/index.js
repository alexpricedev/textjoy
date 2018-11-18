import React, { useState } from 'react';
import uuid from 'uuid/v4';
import StripeCheckout from 'react-stripe-checkout';
import Select from 'react-select';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { collections, timezones } from '../../constants';

const amount = 300; // £3.00
const currency = 'GBP';
const timezoneOptions = timezones.map(tz => ({
  value: tz.name,
  label: `${tz.label} (${tz.name})`,
}));
const collectionOptions = Object.entries(collections).map(
  ([_, collection]) => ({
    value: collection.id,
    label: collection.name,
  }),
);

const customStyles = isError => ({
  container: provided => ({
    ...provided,
    color: '#576366',
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    fontSize: '14px',
    marginBottom: '20px',
  }),
  valueContainer: provided => ({
    ...provided,
    padding: '5px 15px',
  }),
  control: provided => ({
    ...provided,
    background: isError ? 'rgba(240, 145, 150, 0.3)' : '#f0f0f0',
    border: 'none',
  }),
  menu: provided => ({
    ...provided,
    margin: '3px 0 0',
  }),
  indicatorSeparator: () => ({}),
});

/**
 * onToken make the request to our Stripe lambda endpoint
 * and create the purchase
 */
const onToken = (metadata, setFinish) => token => {
  fetch(`${process.env.LAMBDA_ENDPOINT}/purchase`, {
    method: 'POST',
    body: JSON.stringify({
      amount,
      currency,
      idempotency_key: uuid(),
      token,
      metadata,
    }),
  })
    .then(response => {
      response.json().then(({ status }) => {
        setFinish(status);
      });
    })
    .catch(err => {
      setFinish('failed');
      console.log(err);
    });
};

const tzGuess = timezones.find(
  tz => tz.name === Intl.DateTimeFormat().resolvedOptions().timeZone,
);

const initalError = { field: '', message: '' };
const intialFormValues = {
  recipientFirstName: '',
  recipientPhoneNumber: '',
  recipientTimezone: tzGuess
    ? {
        value: tzGuess.name,
        label: `${tzGuess.label} (${tzGuess.name})`,
      }
    : { value: '', label: '' },
  customerName: '',
};

const Checkout = ({ currentCollectionId, setCollection }) => {
  const [status, setStatus] = useState(null); // checkout complete status
  const [error, setError] = useState(initalError);
  const [formValues, setFormValue] = useState(intialFormValues);

  const updateState = e => {
    const field = e.target.id;
    setFormValue({ ...formValues, [field]: e.target.value });
    if (field === error.field) {
      setError(initalError);
    }
  };

  const collection = collections[currentCollectionId];

  return (
    <div className="wrapper">
      <h2>
        Thoughtful Messages Delivered To Your Friends &amp; Loved Ones Every
        Week
      </h2>
      <div className="cols">
        <form onSubmit={e => e.preventDefault()}>
          <h3 className="form-title">Make a Friend Smile Today</h3>
          {status === 'succeeded' ? (
            <div className="form-success">
              <div>
                <h4>Purchase complete! Thank-you 🙏</h4>
                <button
                  className="done-button"
                  onClick={() => {
                    setStatus(null);
                    setFormValue(intialFormValues);
                  }}
                >
                  Finish
                </button>
              </div>
            </div>
          ) : null}
          <label htmlFor="collectionId">Select a collection</label>
          <Select
            id="collectionId"
            onChange={({ value }) => setCollection(value)}
            options={collectionOptions}
            styles={customStyles()}
            value={{
              value: currentCollectionId,
              label: collection.name,
            }}
          />
          <label htmlFor="recipientFirstName">
            Enter your friends first name
          </label>
          <input
            className={
              error.field === 'recipientFirstName'
                ? 'input input--error'
                : 'input'
            }
            id="recipientFirstName"
            onChange={updateState}
            value={formValues.recipientFirstName}
            type="text"
          />
          <label htmlFor="recipientPhoneNumber">Enter their phone number</label>
          <PhoneInput
            className={
              error.field === 'recipientPhoneNumber'
                ? 'sms-phone-input sms-phone-input--error'
                : 'sms-phone-input'
            }
            id="recipientPhoneNumber"
            onChange={recipientPhoneNumber => {
              if ('recipientPhoneNumber' === error.field) {
                setError(initalError);
              }
              setFormValue({ ...formValues, recipientPhoneNumber });
            }}
            value={formValues.recipientPhoneNumber}
          />
          <label htmlFor="recipientTimezone">Select their timezone</label>
          <Select
            id="recipientTimezone"
            onChange={recipientTimezone => {
              setFormValue({ ...formValues, recipientTimezone });
            }}
            options={timezoneOptions}
            styles={customStyles(error.field === 'recipientTimezone')}
            value={formValues.recipientTimezone}
          />
          <label htmlFor="customerName">Enter your name</label>
          <input
            className={
              error.field === 'customerName' ? 'input input--error' : 'input'
            }
            id="customerName"
            onChange={updateState}
            value={formValues.customerName}
            type="tel"
          />
          {error.message && (
            <div className="error-message">{error.message}</div>
          )}
          {status === 'failed' && (
            <div className="error-message">
              Something went wrong... we're really sorry
            </div>
          )}
          <StripeCheckout
            amount={amount}
            currency={currency}
            description="Weekly thoughtful messages via SMS"
            image="https://s3.eu-west-2.amazonaws.com/remoteone/stripe-icon.png"
            locale="auto"
            name="ThoughtfulSMS"
            stripeKey={process.env.STRIPE_PUBLISHABLE_KEY}
            token={onToken(
              {
                ...formValues,
                recipientTimezone: formValues.recipientTimezone.value,
                collectionId: currentCollectionId,
              },
              setStatus,
            )}
          >
            <button
              className="checkout-button"
              onClick={e => {
                // Validate our form
                if (!formValues.recipientFirstName) {
                  e.stopPropagation();
                  setError({
                    field: 'recipientFirstName',
                    message: 'Please enter your friends first name',
                  });
                  return;
                }

                if (!isValidPhoneNumber(formValues.recipientPhoneNumber)) {
                  e.stopPropagation();
                  setError({
                    field: 'recipientPhoneNumber',
                    message: 'Please enter your friends phone number',
                  });
                  return;
                }

                if (!formValues.recipientTimezone.value) {
                  e.stopPropagation();
                  setError({
                    field: 'recipientTimezone',
                    message: 'Please select your friends timezone',
                  });
                  return;
                }

                if (!formValues.customerName) {
                  e.stopPropagation();
                  setError({
                    field: 'customerName',
                    message: 'Please enter your full name',
                  });
                  return;
                }
              }}
            >
              Buy Now - Just £3 For a Year
            </button>
          </StripeCheckout>
        </form>
        <div className="col">
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
            {collection.messages[0](formValues.recipientFirstName || 'Chloe')}
          </div>
          <div className="message message--two">
            {collection.messages[1](formValues.recipientFirstName || 'James')}
          </div>
        </div>
      </div>
      <style jsx>{`
        .cols {
          align-items: flex-start;
          display: flex;
        }

        .col {
          flex: 1 1 50%;
          padding: 10px 20px 20px;
        }

        @media only screen and (max-width: 834px) {
          .cols {
            flex-wrap: wrap;
          }

          .col {
            order: -1;
            flex-basis: 100%;
          }
        }

        h2,
        h3 {
          color: #ffffff;
          font-size: 36px;
          font-weight: 300;
          margin: 0 0 40px;
          padding: 0 20px;
          letter-spacing: 1px;
          text-align: center;
        }

        h3 {
          font-size: 20px;
          margin: 0 0 30px;
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
          h2 {
            font-size: 30px;
            margin-bottom: 30px;
          }

          h3 {
            text-align: center;
            margin: 0 0 40px;
          }

          h3::after {
            display: none;
          }
        }

        @media only screen and (max-width: 400px) {
          h2 {
            font-size: 27px;
            margin-bottom: 20px;
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

        form {
          background: #ffffff;
          box-shadow: 0px 1px 1px 0px rgba(80, 80, 80, 0.8);
          flex: 1 1 50%;
          margin-bottom: 40px;
          padding: 20px;
          position: relative;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .form-success {
          animation-duration: 1.2s;
          animation-fill-mode: both;
          align-items: center;
          animation-name: fadeIn;
          background: #ffffff;
          bottom: 0;
          display: flex;
          justify-content: center;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 99;
        }

        .form-success h4 {
          font-size: 17px;
          margin-bottom: 20px;
        }

        .form-title {
          color: #505050;
          display: none;
          font-weight: 700;
          margin-top: 20px;
          margin-bottom: 30px;
          padding: 0;
        }

        @media only screen and (max-width: 834px) {
          form {
            margin-left: 40px;
            margin-right: 40px;
          }

          .form-title {
            display: block;
          }
        }

        @media only screen and (max-width: 440px) {
          form {
            margin-left: 20px;
            margin-right: 20px;
          }
        }

        @media only screen and (max-width: 400px) {
          .form-title {
            font-size: 18px;
            margin-top: 5px;
            margin-bottom: 20px;
          }
        }

        form::before {
          background: #37ecba;
          content: '';
          display: block;
          height: 3px;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
        }

        label {
          display: inline-block;
          font-size: 14px;
          margin: 0 0 4px;
        }

        .input--error {
          background: rgba(240, 145, 150, 0.3);
        }

        p {
          display: inline-block;
          font-size: 16px;
          opacity: 0.5;
          font-weight: 700;
          float: right;
          margin-left: 14px;
          position: relative;
          top: 8px;
        }

        .error-message {
          background: #f09196;
          border-radius: 5px;
          text-align: center;
          color: white;
          font-size: 14px;
          margin-bottom: 20px;
          padding: 10px 12px;
        }

        .done-button,
        .checkout-button {
          background: #5faad7;
          border-radius: 5px;
          border: none;
          color: #ffffff;
          cursor: pointer;
          display: block;
          font-size: 14px;
          font-weight: 700;
          padding: 10px 18px;
          text-align: center;
          transition: background 0.3s ease;
          width: 100%;
        }

        .done-button:hover,
        .done-button:focus,
        .checkout-button:hover,
        .checkout-button:focus {
          background: #0c79b7;
        }

        .done-button {
          margin: 0 auto;
          width: auto;
        }
      `}</style>
      <style global jsx>{`
        .sms-phone-input input,
        .input,
        .select {
          appearance: none;
          background: #f0f0f0;
          border-radius: 5px;
          border: none;
          color: #576366;
          display: block;
          font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          font-size: 14px;
          height: 35px;
          margin-bottom: 20px;
          padding: 5px 15px;
          width: 100%;
        }

        .sms-phone-input {
          margin-bottom: 20px;
        }

        .sms-phone-input input {
          margin-bottom: 0;
        }

        .sms-phone-input .react-phone-number-input__icon {
          border: none;
        }

        .sms-phone-input--error input {
          background: rgba(240, 145, 150, 0.3);
        }

        #mobileCollectionId {
          margin: 0 auto;
          max-width: 300px;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
