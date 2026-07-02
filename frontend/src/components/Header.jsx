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
    <header className="bg-white border-bottom shadow-sm">
      <div className="container d-flex flex-wrap align-items-center justify-content-between py-3 gap-3">
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <img
            src="/logo.png"
            alt="Trouve ton artisan - Région Auvergne-Rhône-Alpes"
            height="50"
          />
        </Link>

        <nav>
          <ul className="nav">
            {categories.map((cat) => (
              <li className="nav-item" key={cat.id_categorie}>
                <button
                  type="button"
                  className="nav-link-custom btn btn-link nav-link"
                  onClick={() => allerVersCategorie(cat.nom)}
                >
                  {cat.nom}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <form className="d-flex" role="search" onSubmit={gererRecherche}>
          <input
            type="search"
            className="form-control"
            placeholder="Rechercher un artisan..."
            aria-label="Rechercher un artisan par nom"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
          <button type="submit" className="btn btn-primary ms-2">
            Rechercher
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
