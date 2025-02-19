import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Actualites } from './pages/Actualites';
import { PoleAudiovisuel } from './pages/PoleAudiovisuel';
import { PoleMedia } from './pages/PoleMedia';
import { PoleMusique } from './pages/PoleMusique';
import { Evenements } from './pages/Evenements';
import { Contact } from './pages/Contact';
import { Inscription } from './pages/Inscription';
import { Connexion } from './pages/Connexion';
import { FaireUnDon } from './pages/FaireUnDon';
import { MotDePasseOublie } from './pages/MotDePasseOublie';
import { EspaceAdmin } from './pages/EspaceAdmin';
import { EspaceResponsable } from './pages/EspaceResponsable';
import { EspaceCollaborateur } from './pages/EspaceCollaborateur';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/pole-audiovisuel" element={<PoleAudiovisuel />} />
          <Route path="/pole-media" element={<PoleMedia />} />
          <Route path="/pole-musique" element={<PoleMusique />} />
          <Route path="/evenements" element={<Evenements />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/faire-un-don" element={<FaireUnDon />} />
          <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} />
          <Route path="/admin/*" element={<EspaceAdmin />} />
          <Route path="/responsable/*" element={<EspaceResponsable />} />
          <Route path="/collaborateur/*" element={<EspaceCollaborateur />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;