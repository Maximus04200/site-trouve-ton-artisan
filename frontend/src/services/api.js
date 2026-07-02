const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
async function fetchJSON(url) {
  const reponse = await fetch(url);

  if (!reponse.ok) {
    throw new Error(`Erreur HTTP : ${reponse.status}`);
  }

  return reponse.json();
}

export async function getCategories() {
  return fetchJSON(`${API_URL}/categories`);
}


export async function getArtisans() {
  return fetchJSON(`${API_URL}/artisans`);
}


export async function getTopArtisans() {
  return fetchJSON(`${API_URL}/artisans/top`);
}


export async function getArtisanById(id) {
  return fetchJSON(`${API_URL}/artisans/${id}`);
}


export async function searchArtisans(motCle) {
  return fetchJSON(`${API_URL}/artisans/search?q=${encodeURIComponent(motCle)}`);
}


export async function getArtisansByCategorie(nomCategorie) {
  return fetchJSON(`${API_URL}/artisans/categorie/${encodeURIComponent(nomCategorie)}`);
}

export async function envoyerContact(donnees) {
  const reponse = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(donnees)
  });

  const resultat = await reponse.json();

  if (!reponse.ok) {
    throw resultat;
  }

  return resultat;
}
