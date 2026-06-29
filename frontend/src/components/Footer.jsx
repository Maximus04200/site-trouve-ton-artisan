
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container d-flex flex-wrap justify-content-between gap-4">

        <div>
          <h2 className="h6">Trouve ton artisan</h2>
          <address className="mb-0 small">
            101 cours Charlemagne<br />
            CS 20033<br />
            69269 LYON CEDEX 02<br />
            France<br />
            <a href="tel:+33426734000" className="text-light text-decoration-none">
              +33 (0)4 26 73 40 00
            </a>
          </address>
        </div>
        
        <div>
          <h2 className="h6">Informations légales</h2>
          <ul className="list-unstyled small">
            <li><Link to="/mentions-legales" className="text-light text-decoration-none">Mentions légales</Link></li>
            <li><Link to="/donnees-personnelles" className="text-light text-decoration-none">Données personnelles</Link></li>
            <li><Link to="/accessibilite" className="text-light text-decoration-none">Accessibilité</Link></li>
            <li><Link to="/cookies" className="text-light text-decoration-none">Cookies</Link></li>
          </ul>
        </div>

      </div>

      <div className="text-center small mt-3 border-top border-secondary pt-2">
        &copy; {new Date().getFullYear()} Région Auvergne-Rhône-Alpes — Trouve ton artisan
      </div>
    </footer>
  );
}

export default Footer;
