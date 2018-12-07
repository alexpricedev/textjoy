const FAQ = () => (
  <section>
    <h2>Frequent Questions</h2>
    <div>
      <h3>Do you send them other messages?</h3>
      <p>
        We send one introductory opt-in message to inform the giftee that
        someone has purchased an SMS gift for them along with information about
        how to start and end their gift. Other than that, this is an simply an
        uplifting, mood enhancing text service! There will be no bombarding or
        spam, just one lovely SMS per week!
      </p>
    </div>
    <div>
      <h3>Will they know it's from me?</h3>
      <p>
        Yes. We tell them who has signed them up in our first opt-in message.
        This helps stop recipients thinking it's a spam message. We may soon add
        an option to remain anonymous.I
      </p>
    </div>
    <div>
      <h3>Can they opt-out of these messages?</h3>
      <p>
        Yes. Simply send a message to any of our phone numbers with the word{' '}
        <strong>STOP</strong>, and we'll stop all communications with you.
      </p>
    </div>
    <div>
      <h3>Which currencies do you accept?</h3>
      <p>
        We currently only accept Bristish Prounds (GBP). We can't offer
        subscriptions in any other currencies at this moment.
      </p>
    </div>
    <style jsx>{`
      section {
        display: flex;
        flex-wrap: wrap;
        margin: 50px 0 0;
        padding-bottom: 50px;
      }

      h2 {
        flex: 0 0 100%;
        font-size: 37px;
        margin: 0 0 40px;
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

      div {
        flex: 1 1 40%;
        padding: 0 25px 70px 0;
      }

      div:nth-of-type(even) {
        padding-right: 0;
        padding-left: 25px;
      }

      h3 {
        color: #2f2f2f;
        font-size: 24px;
        font-weight: 300;
        margin: 0 0 20px;
        letter-spacing: 1px;
      }

      p {
        color: #2f2f2f;
      }

      @media only screen and (max-width: 834px) {
        h2 {
          padding: 0 40px;
        }

        div,
        div:nth-of-type(even) {
          flex-basis: 100%;
          padding: 0 40px 30px;
        }

        h3 {
          margin-bottom: 10px;
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

        div,
        div:nth-of-type(even) {
          padding-left: 20px;
          padding-right: 20px;
        }
      }
    `}</style>
  </section>
);

export default FAQ;
