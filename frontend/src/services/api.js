// =====================================================
// src/services/api.js
// Centralise TOUS les appels HTTP vers le backend.
// Chaque fonction correspond à UNE route de l'API.
// =====================================================

// L'URL de base de l'API. En développement, c'est ton
// serveur Node local. En production, tu changeras juste
// cette ligne (ou mieux, une variable d'environnement Vite).
const API_URL = 'http://localhost:3000/api';

// -----------------------------------------------------
// Fonction générique pour gérer les erreurs HTTP
// (évite de répéter le même code dans chaque fonction)
// -----------------------------------------------------
async function fetchJSON(url) {
  const reponse = await fetch(url);

  if (!reponse.ok) {
    throw new Error(`Erreur HTTP : ${reponse.status}`);
  }

  return reponse.json();
}

// =====================================================
// CATEGORIES
// =====================================================

// Récupère les 4 catégories (pour le menu du header)
export async function getCategories() {
  return fetchJSON(`${API_URL}/categories`);
}

// =====================================================
// ARTISANS
// =====================================================

// Tous les artisans
export async function getArtisans() {
  return fetchJSON(`${API_URL}/artisans`);
}

// Les 3 artisans du mois (page d'accueil)
export async function getTopArtisans() {
  return fetchJSON(`${API_URL}/artisans/top`);
}

// Un artisan précis (fiche détaillée), par son id
export async function getArtisanById(id) {
  return fetchJSON(`${API_URL}/artisans/${id}`);
}

// Recherche par nom (barre de recherche du header)
export async function searchArtisans(motCle) {
  return fetchJSON(`${API_URL}/artisans/search?q=${encodeURIComponent(motCle)}`);
}

// Artisans filtrés par catégorie (ex: "Bâtiment")
export async function getArtisansByCategorie(nomCategorie) {
  return fetchJSON(`${API_URL}/artisans/categorie/${encodeURIComponent(nomCategorie)}`);
}

// =====================================================
// CONTACT
// =====================================================

// Envoie le formulaire de contact (POST, donc différent des autres)
export async function envoyerContact(donnees) {
  const reponse = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(donnees)
  });

  const resultat = await reponse.json();

  if (!reponse.ok) {
    // En cas d'erreur de validation (400) ou serveur (500),
    // on transmet le détail pour que le formulaire puisse
    // l'afficher à l'utilisateur.
    throw resultat;
  }

  return resultat;
}
