import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page non trouvée - Trouve ton artisan</title>
        <meta name="description" content="La page que vous cherchez n'existe pas." />
      </Helmet>

      <main className="container py-5 text-center">
        <img
          src="/favicon.png"
          alt="Page non trouvée"
          width="100"
          className="mb-4"
        />
        <h1>404</h1>
        <p className="lead">La page que vous avez demandée n'existe pas.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Retour à l'accueil
        </Link>
      </main>
    </>
  );
}

export default NotFound;