import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page non trouvée - Trouve ton artisan</title>
        <meta name="description" content="La page que vous cherchez n'existe pas." />
      </Helmet>
      <div className="page-404">
        <div className="triangle-404">⚠️</div>
        <h1>Erreur 404</h1>
        <p>La page que vous avez demandée n'existe pas.</p>
        <Link to="/" className="btn-retour">Retour à l'accueil</Link>
      </div>
    </>
  );
}

export default NotFound;