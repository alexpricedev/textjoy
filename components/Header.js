import Logo from './Logo';

const Header = () => (
  <div className="logo">
    <Logo />
    <style jsx>{`
      .logo {
        max-width: 300px;
        margin: 20px auto 0;
        padding: 30px 20px;
      }
    `}</style>
  </div>
);

export default Header;
