import logo from '../../../Frontend/src/assets/revelo-logo.png';

export default function StorefrontHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="ReVelo home">
        <img src={logo} alt="ReVelo" />
      </a>
      <a className="header-note" href="#inventory">
        Explore inventory <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
