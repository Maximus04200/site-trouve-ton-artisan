import { useParams } from 'react-router-dom';

function FicheArtisan() {

  const { id } = useParams();

  return (
    <div className="container py-4">
      <h1>Fiche de l'artisan n°{id}</h1>
      <p>Contenu à venir : détails + formulaire de contact.</p>
    </div>
  );
}

export default FicheArtisan;
