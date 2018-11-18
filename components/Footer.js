const Footer = () => (
  <div>
    <a
      href="https://twitter.com/remotealex"
      target="_blank"
      rel="noopener noreferrer"
      title="View Alex's Twitter"
    >
      Made in 24hrs by Alex Price (@remotealex) #24hrstartup
    </a>
    <style jsx>{`
      div {
        bottom: 0;
        font-size: 12px;
        font-weight: 700;
        padding: 5px 7px;
        position: absolute;
        text-align: center;
        width: 100%;
      }

      a {
        color: rgb(80, 80, 80, 0.4);
        text-decoration: none;
        transition: color 0.3s ease;
      }

      a:focus,
      a:hover {
        color: rgb(80, 80, 80, 1);
      }
    `}</style>
  </div>
);

export default Footer;
