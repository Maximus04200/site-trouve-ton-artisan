import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Accueil from './pages/Accueil';
import ListeArtisans from './pages/ListeArtisans';
import FicheArtisan from './pages/FicheArtisan';
import NotFound from './pages/NotFound';
import PageLegale from './pages/PageLegale';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/artisans" element={<ListeArtisans />} />
        <Route path="/artisan/:id" element={<FicheArtisan />} />
        <Route path="/mentions-legales" element={<PageLegale titre="Mentions légales" />} />
        <Route path="/donnees-personnelles" element={<PageLegale titre="Données personnelles" />} />
        <Route path="/accessibilite" element={<PageLegale titre="Accessibilité" />} />
        <Route path="/cookies" element={<PageLegale titre="Cookies" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;