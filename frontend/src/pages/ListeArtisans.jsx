import { Helmet } from 'react-helmet-async';
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
  
  const [searchParams] = useSearchParams();
  const categorie = searchParams.get('categorie'); 
  const recherche = searchParams.get('q');

  const [artisans, setArtisans] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);


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

  }, [categorie, recherche]); 

  let titre = 'Tous les artisans';
  if (categorie) titre = `Artisans - ${categorie}`;
  if (recherche) titre = `Résultats pour "${recherche}"`;

  return (
  <main className="container py-5">
    <Helmet>
      <title>{titre} - Trouve ton artisan</title>
      <meta name="description" content={`Liste des artisans - ${titre}`} />
    </Helmet>

    <h1 className="section-titre">{titre}</h1>

    {chargement && <p>Chargement...</p>}
    {erreur && <p className="text-danger">{erreur}</p>}
    {!chargement && !erreur && artisans.length === 0 && (
      <p className="text-muted">Aucun artisan trouvé.</p>
    )}

    <div className="row g-4">
      {artisans.map((artisan) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={artisan.id_artisan}>
          <Link to={`/artisan/${artisan.id_artisan}`} className="artisan-card">
            <p className="artisan-nom">{artisan.nom}</p>
            <Etoiles note={artisan.note} />
            <p className="artisan-specialite mt-2">{artisan.specialite?.nom}</p>
            <p className="artisan-ville">Ville : {artisan.ville}</p>
          </Link>
        </div>
      ))}
    </div>
  </main>
);
}

export default ListeArtisans;