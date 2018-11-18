import Logo from './Logo';

const Header = () => (
  <div className="logo">
    <Logo />
    <style jsx>{`
      .logo {
        max-width: 240px;
        margin: 0 auto;
        padding: 30px 20px;
      }
    `}</style>
  </div>
);

export default Header;
