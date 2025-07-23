import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader';
import Particles from './components/Particles';
import Scene from './components/Scene';
import Footer from './components/Footer';
import Network from './components/NetworkSimulator/Network';
import { GlobalStyles } from './styles';
import RSAVisualizer from './components/RSA/RSAVisualizer';
import AIWeaponizationAwareness from './components/rest/AIWeaponizationAwareness';
import PasswordHashingDemonstrator from './components/rest/PasswordHashingDemonstrator';
import IoTVulnerabilityScanner from './components/rest/IoTVulnerabilityScanner';

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
          <Routes>
            <Route path="/" element={<><Scene /><Footer /></>} />
            <Route path="/card/card5" element={<AIWeaponizationAwareness />} />
            <Route path="/card/card4" element={<IoTVulnerabilityScanner />} />
            <Route path="/card/card3" element={<Network />} />
            <Route path="/card/card2" element={<RSAVisualizer />} />
            <Route path="/card/card1" element={<PasswordHashingDemonstrator />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;