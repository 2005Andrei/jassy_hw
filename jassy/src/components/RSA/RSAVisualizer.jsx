import { useState, useEffect } from 'react';
import './RSAVisualizer.css';
import HistorySection from './HistorySection';
import RSASteps from './RSASteps';
import RealWorldApplications from './RealWorldApplications';
import KeyGenerator from './KeyGenerator';
import MessageEncryption from './MessageEncryption';
import { calculateKeys } from '../utils/rsaUtils';

const RSAVisualizer = () => {
  const [currentMode, setCurrentMode] = useState('demo');
  const [keyValues, setKeyValues] = useState({
    p: 17,
    q: 23,
    n: 0,
    phi: 0,
    e: 0,
    d: 0
  });

  useEffect(() => {
    const result = calculateKeys(17, 23);
    setKeyValues(result);
  }, []);

  return (
    <div className="rsa-rsa-visualizer">
      <header className="rsa-header">
        <div className="rsa-container">
          <h1>RSA Encryption Visualizer</h1>
          <p className="rsa-subtitle">
            From 1977 to Modern Cryptography — Explore the algorithm that secures the internet
          </p>
        </div>
      </header>

      <div className="rsa-container">
        <HistorySection />
        <RSASteps />
        <RealWorldApplications />
        <KeyGenerator currentMode={currentMode} setCurrentMode={setCurrentMode} />
        <MessageEncryption
          currentMode={currentMode}
          p={keyValues.p}
          q={keyValues.q}
          n={keyValues.n}
          e={keyValues.e}
          d={keyValues.d}
        />
      </div>

      <footer className="rsa-footer">
        <div className="rsa-container">
          <p>Educational RSA Visualizer | Not for real cryptographic use | Created with modern web technologies</p>
          <p>In real applications, always use well-tested cryptographic libraries and proper key sizes.</p>
        </div>
      </footer>
    </div>
  );
};

export default RSAVisualizer;