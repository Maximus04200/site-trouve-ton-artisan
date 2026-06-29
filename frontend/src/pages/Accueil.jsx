

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopArtisans } from '../services/api';

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

function Accueil() {
  const [topArtisans, setTopArtisans] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    getTopArtisans()
      .then((donnees) => setTopArtisans(donnees))
      .catch((erreur) => console.error('Erreur chargement artisans du mois :', erreur))
      .finally(() => setChargement(false));
  }, []);

  return (
    <main>

      <section className="bg-light py-5">
        <div className="container">
          <h1 className="text-center mb-4">Comment trouver mon artisan ?</h1>

          <div className="row g-4">

            <div className="col-12 col-md-3 text-center">
              <div className="fs-1 fw-bold text-primary">1</div>
              <p>Choisir la catégorie d'artisanat dans le menu.</p>
            </div>

            <div className="col-12 col-md-3 text-center">
              <div className="fs-1 fw-bold text-primary">2</div>
              <p>Choisir un artisan.</p>
            </div>

            <div className="col-12 col-md-3 text-center">
              <div className="fs-1 fw-bold text-primary">3</div>
              <p>Le contacter via le formulaire de contact.</p>
            </div>

            <div className="col-12 col-md-3 text-center">
              <div className="fs-1 fw-bold text-primary">4</div>
              <p>Une réponse sera apportée sous 48h.</p>
            </div>

          </div>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="text-center mb-4">Les artisans du mois</h2>

        {chargement && <p className="text-center">Chargement...</p>}

        {!chargement && topArtisans.length === 0 && (
          <p className="text-center text-muted">Aucun artisan du mois pour l'instant.</p>
        )}

        <div className="row g-4">
          {topArtisans.map((artisan) => (
            <div className="col-12 col-md-4" key={artisan.id_artisan}>
              <Link
                to={`/artisan/${artisan.id_artisan}`}
                className="card h-100 text-decoration-none text-dark shadow-sm"
              >
                <div className="card-body">
                  <h3 className="card-title h5">{artisan.nom}</h3>
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
      </section>

    </main>
  );
}

export default Accueil;