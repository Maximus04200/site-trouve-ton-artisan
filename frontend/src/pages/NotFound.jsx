import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container py-4 text-center">
      <h1>404</h1>
      <p>La page que vous avez demandée n'existe pas.</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
}

export default NotFound;
