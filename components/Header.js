import Logo from './Logo';

const Header = () => (
  <div className="logo">
    <Logo />
    <style jsx>{`
      .logo {
        max-width: 300px;
        margin: 0 auto;
        padding: 50px 20px 30px;
      }
    `}</style>
  </div>
);

export default Header;
