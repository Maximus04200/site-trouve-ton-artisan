
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArtisanById, envoyerContact } from '../services/api';

function Etoiles({ note }) {
  const noteArrondie = Math.round(note);
  const etoiles = [];
  for (let i = 1; i <= 5; i++) {
    etoiles.push(
      <span key={i} aria-hidden="true">{i <= noteArrondie ? '★' : '☆'}</span>
    );
  }
  return (
    <span className="text-warning fs-5" title={`Note : ${note} sur 5`}>
      {etoiles}
      <span className="visually-hidden">{note} étoiles sur 5</span>
    </span>
  );
}

function FicheArtisan() {
  const { id } = useParams();

  
  const [artisan, setArtisan] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreurChargement, setErreurChargement] = useState(null);

  const [formulaire, setFormulaire] = useState({
    nom: '',
    email: '',
    objet: '',
    message: ''
  });

  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const [messageSucces, setMessageSucces] = useState(null);
  const [erreursFormulaire, setErreursFormulaire] = useState([]);

  useEffect(() => {
    setChargement(true);
    getArtisanById(id)
      .then((donnees) => setArtisan(donnees))
      .catch((err) => {
        console.error('Erreur chargement artisan :', err);
        setErreurChargement('Cet artisan est introuvable.');
      })
      .finally(() => setChargement(false));
  }, [id]);

  
  function gererChangement(e) {
    const { name, value } = e.target;
    setFormulaire((precedent) => ({
      ...precedent,   
      [name]: value    
    }));
  }

  async function gererSoumission(e) {
    e.preventDefault();

    setEnvoiEnCours(true);
    setMessageSucces(null);
    setErreursFormulaire([]);

    try {
      const reponse = await envoyerContact({
        artisanId: Number(id),
        ...formulaire
      });

      setMessageSucces(reponse.message);
      setFormulaire({ nom: '', email: '', objet: '', message: '' });

    } catch (erreur) {
    
      if (erreur.erreurs) {
        setErreursFormulaire(erreur.erreurs.map((e) => e.msg));
      } else {
        setErreursFormulaire(['Une erreur est survenue. Veuillez réessayer.']);
      }
    } finally {
      setEnvoiEnCours(false);
    }
  }

  if (chargement) {
    return <main className="container py-5"><p>Chargement...</p></main>;
  }

  if (erreurChargement || !artisan) {
    return (
      <main className="container py-5 text-center">
        <p className="text-danger">{erreurChargement}</p>
        <Link to="/artisans">Retour à la liste des artisans</Link>
      </main>
    );
  }

  return (
  <main>
    <Helmet>
      <title>{artisan.nom} - Trouve ton artisan</title>
      <meta name="description" content={`${artisan.nom}, ${artisan.specialite?.nom} à ${artisan.ville}.`} />
    </Helmet>

    
    <section className="fiche-hero">
      <div className="container">
        <h1>{artisan.nom}</h1>
        <Etoiles note={artisan.note} />
        <span className="badge-specialite">{artisan.specialite?.nom}</span>
        <p className="mt-2 mb-0">
          <small>Localisation : {artisan.ville}</small>
        </p>
      </div>
    </section>

    <div className="container py-5">
      <div className="row g-5">

        
        <div className="col-12 col-md-6">
          <img
  src="/favicon.png"
  alt={`Photo de ${artisan.nom}`}
  className="img-fluid rounded mb-4"
  style={{ maxHeight: '200px', objectFit: 'contain' }}/>
          <h2 className="h5 text-primary fw-bold">À propos</h2>
          <p>{artisan.apropos}</p>
          {artisan.site_web && (
            <p>
              <strong>Site web :</strong>{' '}
              <a href={artisan.site_web} target="_blank" rel="noopener noreferrer">
                {artisan.site_web}
              </a>
            </p>
          )}
        </div>

        
        <div className="col-12 col-md-6">
          <div className="contact-form">
            <h2>Envoyer un mail à cet artisan</h2>

            {messageSucces && (
              <div className="alert alert-success">{messageSucces}</div>
            )}
            {erreursFormulaire.length > 0 && (
              <div className="alert alert-danger">
                <ul className="mb-0">
                  {erreursFormulaire.map((msg, i) => <li key={i}>{msg}</li>)}
                </ul>
              </div>
            )}

            <form onSubmit={gererSoumission}>
              <div className="mb-3">
                <label htmlFor="nom" className="form-label fw-semibold">Nom</label>
                <input type="text" className="form-control" id="nom" name="nom"
                  value={formulaire.nom} onChange={gererChangement} required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Email</label>
                <input type="email" className="form-control" id="email" name="email"
                  value={formulaire.email} onChange={gererChangement} required />
              </div>
              <div className="mb-3">
                <label htmlFor="objet" className="form-label fw-semibold">Objet</label>
                <input type="text" className="form-control" id="objet" name="objet"
                  value={formulaire.objet} onChange={gererChangement} required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label fw-semibold">Message</label>
                <textarea className="form-control" id="message" name="message"
                  rows="4" value={formulaire.message} onChange={gererChangement} required />
              </div>
              <button type="submit" className="btn-envoyer" disabled={envoiEnCours}>
                {envoiEnCours ? 'Envoi en cours...' : 'Envoyer'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </main>
);
}

export default FicheArtisan;