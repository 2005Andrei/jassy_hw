import React from 'react';
import { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader';
import Particles from './components/Particles';
import Scene from './components/Scene';
import Footer from './components/Footer';
import { GlobalStyles } from './styles';
import './App.css'

// Lazy-load heavy components
const Network = React.lazy(() => import('./components/NetworkSimulator/Network'));
const RSAVisualizer = React.lazy(() => import('./components/RSA/RSAVisualizer'));
const AIWeaponizationAwareness = React.lazy(() => import('./components/rest/AIWeaponizationAwareness'));
const PasswordHashingDemonstrator = React.lazy(() => import('./components/rest/PasswordHashingDemonstrator'));
const IoTVulnerabilityScanner = React.lazy(() => import('./components/rest/IoTVulnerabilityScanner'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <GlobalStyles />
      <Preloader isLoading={isLoading} />
      {!isLoading && (
        <>
          <Particles />
          <Suspense fallback={<div>Loading component...</div>}>
            <Routes>
              <Route path="/" element={<><Scene /><Footer /></>} />
              <Route path="/card/card5" element={<AIWeaponizationAwareness />} />
              <Route path="/card/card4" element={<IoTVulnerabilityScanner />} />
              <Route path="/card/card3" element={<Network />} />
              <Route path="/card/card2" element={<RSAVisualizer />} />
              <Route path="/card/card1" element={<PasswordHashingDemonstrator />} />
            </Routes>
          </Suspense>
        </>
      )}
    </Router>
  );
}

export default App;
