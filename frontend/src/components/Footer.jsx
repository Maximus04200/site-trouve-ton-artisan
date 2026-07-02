import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-tta">
      <div className="container d-flex flex-wrap justify-content-between gap-4">
        <div>
          <h2>Trouve ton artisan</h2>
          <address>
            101 cours Charlemagne<br />
            CS 20033<br />
            69269 LYON CEDEX 02<br />
            France<br />
            <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
          </address>
        </div>
        <div className="liens-legaux">
          <h2>Informations légales</h2>
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/donnees-personnelles">Données personnelles</Link>
          <Link to="/accessibilite">Accessibilité</Link>
          <Link to="/cookies">Cookies</Link>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Région Auvergne-Rhône-Alpes — Trouve ton artisan
      </div>
    </footer>
  );
}

export default Footer;