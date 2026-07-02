import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../services/api";

function Header() {
  const [categories, setCategories] = useState([]);
  const [recherche, setRecherche] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then((donnees) => setCategories(donnees))
      .catch((erreur) =>
        console.error("Erreur chargement catégories :", erreur),
      );
  }, []);

  function allerVersCategorie(nomCategorie) {
    navigate(`/artisans?categorie=${encodeURIComponent(nomCategorie)}`);
  }

  function gererRecherche(e) {
    e.preventDefault();

    if (recherche.trim() === "") return;

    navigate(`/artisans?q=${encodeURIComponent(recherche)}`);
  }

  return (
    <header className="header-tta">
  <div className="container d-flex flex-wrap align-items-center justify-content-between gap-3">
    <Link to="/" className="logo-tta">
      <img src="/logo.png" alt="Trouve ton artisan - Région Auvergne-Rhône-Alpes" />
    </Link>
    <nav className="nav-menu">
      <ul className="nav">
        {categories.map((cat) => (
          <li className="nav-item" key={cat.id_categorie}>
            <button type="button" className="btn btn-link"
              onClick={() => allerVersCategorie(cat.nom)}>
              {cat.nom}
            </button>
          </li>
        ))}
      </ul>
    </nav>
    <form className="d-flex" role="search" onSubmit={gererRecherche}>
      <input type="search" className="input-recherche" placeholder="Rechercher un artisan..."
        aria-label="Rechercher un artisan" value={recherche}
        onChange={(e) => setRecherche(e.target.value)} />
      <button type="submit" className="btn-rechercher">Rechercher</button>
    </form>
  </div>
</header>
  );
}

export default Header;
