const WhatIsThis = () => (
  <div>
    <section className="wrapper">
      <h2>What is TextJoy?</h2>
      <p className="first">
        TextJoy is weekly messaging service. We send lovely folks an
        inspirational, educational or motivational text message once a week for
        a whole year.
      </p>
      <p>
        Our aim is to bring a smile to peoples faces and maybe teach them a
        thing or two! Buy it for your loved ones as a gift, or treat yourself.
      </p>
    </section>
    <style jsx>{`
      div {
        background: rgba(50, 50, 50, 0.03);
      }

      section {
        padding: 60px 0 70px;
      }

      h2 {
        font-size: 37px;
        margin: 0 0 50px;
        position: relative;
      }

      h2::after {
        content: '';
        display: block;
        background: black;
        width: 50%;
        height: 2px;
        position: absolute;
        bottom: -15px;
        left: 0;
      }

      p {
        color: #2f2f2f;
        line-height: 1.4;
        max-width: 600px;
      }

      .first {
        margin-bottom: 10px;
      }

      @media only screen and (max-width: 834px) {
        h2,
        p {
          padding: 0 40px;
        }

        h2::after {
          left: 40px;
        }
      }

      @media only screen and (max-width: 500px) {
        h2 {
          font-size: 28px;
          padding: 0 20px;
        }

        h2::after {
          left: 20px;
        }

        p {
          padding: 0 20px;
        }
      }
    `}</style>
  </div>
);

export default WhatIsThis;
