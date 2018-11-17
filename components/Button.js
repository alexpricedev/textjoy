import React, { Fragment } from 'react';

const Button = ({ text, onClick }) => (
  <Fragment>
    <button type="button" onClick={onClick}>
      {text}
    </button>
    <style jsx>{`
      button {
        background: none;
        font-size: 16px;
        border-radius: 50px;
        border: 3px solid #ee447d;
        color: #ee447d;
        cursor: pointer;
        display: inline-block;
        font-weight: 700;
        letter-spacing: 1px;
        margin: 0;
        order: none;
        outline: none;
        overflow: hidden;
        padding: 10px 50px;
        position: relative;
        text-transform: uppercase;
        transition: all 0.3s;
      }

      button:hover {
        background: rgba(80, 80, 80, 0.05);
      }

      button::before {
        color: #ee447d;
        content: '→';
        font-size: 125%;
        height: 100%;
        left: 70%;
        line-height: 2;
        opacity: 0;
        position: absolute;
        top: 0;
        transition: all 0.3s;
      }

      button:hover::before {
        left: 80%;
        opacity: 1;
      }
    `}</style>
  </Fragment>
);

export default Button;
