const Footer = () => (
  <div>
    <a
      href="https://twitter.com/remotealex"
      target="_blank"
      rel="noopener noreferrer"
      title="View Alex's Twitter"
    >
      Made with ❤ in Bristol by Alex Price &amp; Cara Farrin
    </a>
    <style jsx>{`
      div {
        bottom: 0;
        font-size: 12px;
        font-weight: 300;
        padding: 7px;
        position: absolute;
        text-align: center;
        width: 100%;
      }

      a {
        color: rgb(50, 50, 50, 0.7);
        text-decoration: none;
        transition: color 0.3s ease;
      }

      a:focus,
      a:hover {
        color: rgb(50, 50, 50, 1);
      }
    `}</style>
  </div>
);

export default Footer;
