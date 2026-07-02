

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopArtisans } from '../services/api';
import { Helmet } from 'react-helmet-async';

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
    <Helmet>
      <title>Trouve ton artisan - Région Auvergne-Rhône-Alpes</title>
      <meta name="description" content="Trouvez facilement un artisan de la région Auvergne-Rhône-Alpes." />
    </Helmet>

   
    <section className="hero-tta">
      <div className="container">
        <h1>Comment trouver mon artisan ?</h1>
      </div>
    </section>

    
    <section className="etapes-section">
      <div className="container">
        <div className="row g-4 text-center">
          <div className="col-12 col-md-3">
            <div className="etape-numero">1</div>
            <p className="etape-texte">Choisir la catégorie d'artisanat dans le menu.</p>
          </div>
          <div className="col-12 col-md-3">
            <div className="etape-numero">2</div>
            <p className="etape-texte">Choisir un artisan.</p>
          </div>
          <div className="col-12 col-md-3">
            <div className="etape-numero">3</div>
            <p className="etape-texte">Le contacter via le formulaire de contact.</p>
          </div>
          <div className="col-12 col-md-3">
            <div className="etape-numero">4</div>
            <p className="etape-texte">Une réponse sera apportée sous 48h.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="container py-5">
      <h2 className="section-titre text-center">Les artisans du mois</h2>
      {chargement && <p className="text-center">Chargement...</p>}
      {!chargement && topArtisans.length === 0 && (
        <p className="text-center text-muted">Aucun artisan du mois pour l'instant.</p>
      )}
      <div className="row g-4">
        {topArtisans.map((artisan) => (
          <div className="col-12 col-md-4" key={artisan.id_artisan}>
            <Link to={`/artisan/${artisan.id_artisan}`} className="artisan-card">
              <p className="artisan-nom">{artisan.nom}</p>
              <Etoiles note={artisan.note} />
              <p className="artisan-specialite mt-2">{artisan.specialite?.nom}</p>
              <p className="artisan-ville">Ville : {artisan.ville}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  </main>
);
}

export default Accueil;