
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
    <main className="container py-5">
 <Helmet>
  <title>{artisan.nom} - Trouve ton artisan</title>
  <meta name="description" content={`${artisan.nom}, ${artisan.specialite?.nom} à ${artisan.ville}. Contactez cet artisan via notre formulaire.`} />
</Helmet>
      <div className="row g-4 mb-5">

        
        <div className="col-12 col-md-4">
          <div className="bg-light rounded d-flex align-items-center justify-content-center"
               style={{ height: '250px' }}>
            <span className="text-muted">Photo de l'artisan</span>
          </div>
        </div>

        <div className="col-12 col-md-8">
          <h1>{artisan.nom}</h1>
          <Etoiles note={artisan.note} />
          <p className="mt-2 mb-1">
            <strong>Spécialité :</strong> {artisan.specialite?.nom}
          </p>
          <p className="mb-1">
            <strong>Localisation :</strong> {artisan.ville}
          </p>

          {artisan.site_web && (
            <p className="mb-3">
              <a href={artisan.site_web} target="_blank" rel="noopener noreferrer">
                Visiter le site web de l'artisan
              </a>
            </p>
          )}

          <h2 className="h5 mt-4">À propos</h2>
          <p>{artisan.apropos}</p>
        </div>
      </div>

      
      <div className="row">
        <div className="col-12 col-md-8 col-lg-6">
          <h2 className="h4 mb-3">Contacter {artisan.nom}</h2>

          {messageSucces && (
            <div className="alert alert-success" role="status">
              {messageSucces}
            </div>
          )}

          {erreursFormulaire.length > 0 && (
            <div className="alert alert-danger" role="alert">
              <ul className="mb-0">
                {erreursFormulaire.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={gererSoumission}>

            <div className="mb-3">
              <label htmlFor="nom" className="form-label">Nom</label>
              <input
                type="text"
                className="form-control"
                id="nom"
                name="nom"
                value={formulaire.nom}
                onChange={gererChangement}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formulaire.email}
                onChange={gererChangement}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="objet" className="form-label">Objet</label>
              <input
                type="text"
                className="form-control"
                id="objet"
                name="objet"
                value={formulaire.objet}
                onChange={gererChangement}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="5"
                value={formulaire.message}
                onChange={gererChangement}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={envoiEnCours}>
              {envoiEnCours ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>

          </form>
        </div>
      </div>

    </main>
  );
}

export default FicheArtisan;