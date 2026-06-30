
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  getArtisans,
  getArtisansByCategorie,
  searchArtisans
} from '../services/api';

function Etoiles({ note }) {
  const noteArrondie = Math.round(note);
  const etoiles = [];

  for (let i = 1; i <= 5; i++) {
    etoiles.push(
      <span key={i} aria-hidden="true">
        {i <= noteArrondie ? '★' : '☆'}
      </span>
    );
  }

  return (
    <span className="text-warning" title={`Note : ${note} sur 5`}>
      {etoiles}
      <span className="visually-hidden">{note} étoiles sur 5</span>
    </span>
  );
}

function ListeArtisans() {
  // searchParams = un objet qui lit les paramètres de l'URL
  // (ce qui est après le "?", ex: ?categorie=Bâtiment&q=...)
  const [searchParams] = useSearchParams();
  const categorie = searchParams.get('categorie'); // null si absent de l'URL
  const recherche = searchParams.get('q');

  const [artisans, setArtisans] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  // -----------------------------------------------------
  // Ce useEffect se redéclenche CHAQUE FOIS que `categorie`
  // ou `recherche` change (présents dans le tableau de
  // dépendances ci-dessous). C'est ce qui permet de changer
  // de catégorie depuis le Header sans recharger la page.
  // -----------------------------------------------------
  useEffect(() => {
    setChargement(true);
    setErreur(null);

    let promesse;

    if (recherche) {
      promesse = searchArtisans(recherche);
    } else if (categorie) {
      promesse = getArtisansByCategorie(categorie);
    } else {
      promesse = getArtisans();
    }

    promesse
      .then((donnees) => setArtisans(donnees))
      .catch((err) => {
        console.error('Erreur chargement artisans :', err);
        setErreur('Impossible de charger les artisans pour le moment.');
      })
      .finally(() => setChargement(false));

  }, [categorie, recherche]); // dépendances : relance si l'une change

  // -----------------------------------------------------
  // Titre dynamique selon le contexte (catégorie, recherche, ou tous)
  // -----------------------------------------------------
  let titre = 'Tous les artisans';
  if (categorie) titre = `Artisans - ${categorie}`;
  if (recherche) titre = `Résultats pour "${recherche}"`;

  return (
    <main className="container py-5">
      <h1 className="mb-4">{titre}</h1>

      {chargement && <p>Chargement...</p>}

      {erreur && <p className="text-danger">{erreur}</p>}

      {!chargement && !erreur && artisans.length === 0 && (
        <p className="text-muted">Aucun artisan trouvé.</p>
      )}

      <div className="row g-4">
        {artisans.map((artisan) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={artisan.id_artisan}>
            <Link
              to={`/artisan/${artisan.id_artisan}`}
              className="card h-100 text-decoration-none text-dark shadow-sm"
            >
              <div className="card-body">
                <h2 className="card-title h5">{artisan.nom}</h2>
                <Etoiles note={artisan.note} />
                <p className="card-text mt-2 mb-1">
                  {artisan.specialite?.nom}
                </p>
                <p className="card-text text-muted small">
                  Ville : {artisan.ville}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ListeArtisans;