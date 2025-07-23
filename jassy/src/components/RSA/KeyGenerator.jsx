import { useState } from 'react';
import { generatePrimes, calculateKeys, generateRealWorldKeys } from '../utils/rsaUtils.js';

const KeyGenerator = ({ currentMode, setCurrentMode }) => {
  const [activeTab, setActiveTab] = useState('rsa-auto-tab');
  const [p, setP] = useState(17);
  const [q, setQ] = useState(23);
  const [keyValues, setKeyValues] = useState({
    p: 0,
    q: 0,
    n: 0,
    phi: 0,
    e: 0,
    d: 0,
    steps: []
  });
  const [realKeyValues, setRealKeyValues] = useState({
    p: 'Not generated yet',
    q: 'Not generated yet',
    n: 'Not generated yet',
    d: 'Not calculated yet',
    e: '65537 (common choice)',
    steps: [
      `<strong>Real-World RSA Notes:</strong><br>
       - Actual 2048-bit prime generation takes significant computational power<br>
       - The modulus n is typically 617 digits long (2048 bits)<br>
       - Most implementations use e=65537 for efficiency<br>
       - Key generation can take from seconds to minutes depending on hardware`
    ]
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTabSwitch = (tabId) => {
    setActiveTab(tabId);
  };

  const handleModeToggle = () => {
    setCurrentMode(currentMode === 'demo' ? 'real' : 'demo');
  };

  const handleGeneratePrimes = () => {
    const { p: newP, q: newQ } = generatePrimes();
    setP(newP);
    setQ(newQ);
    const result = calculateKeys(newP, newQ);
    setKeyValues(result);
  };

  const handleCalculateKeys = () => {
    const pValue = parseInt(document.getElementById('rsa-p-value').value);
    const qValue = parseInt(document.getElementById('rsa-q-value').value);
    setP(pValue);
    setQ(qValue);
    const result = calculateKeys(pValue, qValue);
    if (result) {
      setKeyValues(result);
    }
  };

  const handleGenerateRealWorldKeys = () => {
    setIsGenerating(true);
    generateRealWorldKeys().then((result) => {
      setRealKeyValues(result);
      setIsGenerating(false);
    });
  };

  return (
    <>
      <div className="rsa-mode-switcher" role="tablist">
        <span
          className={`rsa-mode-label ${currentMode === 'demo' ? 'rsa-active' : ''}`}
          id="rsa-demo-label"
          role="tab"
          aria-selected={currentMode === 'demo'}
          tabIndex={0}
          onClick={() => setCurrentMode('demo')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setCurrentMode('demo');
            }
          }}
        >
          Small Key Demo
        </span>
        <label className="rsa-mode-switch">
          <span className="rsa-sr-only">Toggle between demo and real-world modes</span>
          <input
            type="checkbox"
            id="rsa-mode-toggle"
            role="switch"
            aria-checked={currentMode === 'real'}
            checked={currentMode === 'real'}
            onChange={handleModeToggle}
          />
          <span className="rsa-slider"></span>
        </label>
        <span
          className={`rsa-mode-label ${currentMode === 'real' ? 'rsa-active' : ''}`}
          id="rsa-real-label"
          role="tab"
          aria-selected={currentMode === 'real'}
          tabIndex={0}
          onClick={() => setCurrentMode('real')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setCurrentMode('real');
            }
          }}
        >
          Real-World Simulation
        </span>
      </div>

      {currentMode === 'demo' ? (
        <div className="rsa-card" id="rsa-demo-card" role="tabpanel" aria-labelledby="rsa-demo-label">
          <h2 className="rsa-card-title">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 15a2 2 0 01-2-2c0-1.11.89-2 2-2 1.11 0 2 .89 2 2a2 2 0 01-2 2m0-12a8 8 0 00-8 8c0 2.72 1.38 5.12 3.5 6.5L7 23h10l-1.5-3.5c2.12-1.38 3.5-3.78 3.5-6.5a8 8 0 00-8-8z"/>
            </svg>
            RSA Key Generator (Demo Mode)
          </h2>
          <p>
            For demonstration purposes, we'll use small 2-digit primes to quickly show the RSA process.{' '}
            <span className="rsa-highlight">This is not secure for real-world use!</span>
          </p>

          <div className="rsa-tabs" role="tablist">
            <div
              className={`rsa-tab ${activeTab === 'rsa-auto-tab' ? 'rsa-active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'rsa-auto-tab'}
              tabIndex={0}
              onClick={() => handleTabSwitch('rsa-auto-tab')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTabSwitch('rsa-auto-tab');
                }
              }}
            >
              Auto-Generate
            </div>
            <div
              className={`rsa-tab ${activeTab === 'rsa-manual-tab' ? 'rsa-active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'rsa-manual-tab'}
              tabIndex={0}
              onClick={() => handleTabSwitch('rsa-manual-tab')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTabSwitch('rsa-manual-tab');
                }
              }}
            >
              Manual Input
            </div>
          </div>

          <div id="rsa-auto-tab" className={`rsa-tab-content ${activeTab === 'rsa-auto-tab' ? 'rsa-active' : ''}`} role="tabpanel">
            <div className="rsa-input-group">
              <button onClick={handleGeneratePrimes}>Generate Random Primes</button>
            </div>
          </div>

          <div id="rsa-manual-tab" className={`rsa-tab-content ${activeTab === 'rsa-manual-tab' ? 'rsa-active' : ''}`} role="tabpanel">
            <div className="rsa-input-group">
              <label htmlFor="rsa-p-value">Prime p (2-digit):</label>
              <input
                type="number"
                id="rsa-p-value"
                min="11"
                max="97"
                step="2"
                value={p}
                onChange={(e) => setP(parseInt(e.target.value))}
                aria-describedby="rsa-p-value-help"
              />
              <small id="rsa-p-value-help" className="rsa-sr-only">
                Enter a 2-digit prime number between 11 and 97
              </small>
            </div>
            <div className="rsa-input-group">
              <label htmlFor="rsa-q-value">Prime q (2-digit, different from p):</label>
              <input
                type="number"
                id="rsa-q-value"
                min="11"
                max="97"
                step="2"
                value={q}
                onChange={(e) => setQ(parseInt(e.target.value))}
                aria-describedby="rsa-q-value-help"
              />
              <small id="rsa-q-value-help" className="rsa-sr-only">
                Enter a different 2-digit prime number between 11 and 97
              </small>
            </div>
            <div className="rsa-input-group">
              <button onClick={handleCalculateKeys}>Calculate Keys</button>
            </div>
          </div>

          <div className="rsa-visualization">
            <h3 className="rsa-visualization-title">Key Generation Process</h3>
            <div className="rsa-key-display">
              <div className="rsa-key-box">
                <div className="rsa-key-label">Prime p</div>
                <div className="rsa-key-value">{keyValues.p || '?'}</div>
              </div>
              <div className="rsa-key-box">
                <div className="rsa-key-label">Prime q</div>
                <div className="rsa-key-value">{keyValues.q || '?'}</div>
              </div>
              <div className="rsa-key-box">
                <div className="rsa-key-label">Modulus n = p × q</div>
                <div className="rsa-key-value">{keyValues.n || '?'}</div>
              </div>
              <div className="rsa-key-box">
                <div className="rsa-key-label">φ(n) = (p-1)(q-1)</div>
                <div className="rsa-key-value">{keyValues.phi || '?'}</div>
              </div>
            </div>
            <div className="rsa-key-display">
              <div className="rsa-key-box">
                <div className="rsa-key-label">Public exponent e</div>
                <div className="rsa-key-value">{keyValues.e || '?'}</div>
              </div>
              <div className="rsa-key-box">
                <div className="rsa-key-label">Private key d</div>
                <div className="rsa-key-value">{keyValues.d || '?'}</div>
              </div>
            </div>
            <div className="rsa-encryption-steps">
              {keyValues.steps.map((step, index) => (
                <div key={index} className="rsa-step-animation" dangerouslySetInnerHTML={{ __html: step }} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="rsa-card" id="rsa-real-card" role="tabpanel" aria-labelledby="rsa-real-label">
          <h2 className="rsa-card-title">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
            </svg>
            RSA Key Generator (Real-World Mode)
          </h2>
          <p>
            This simulation uses 2048-bit RSA keys (617 decimal digits) like those used in real-world applications.{' '}
            <span className="rsa-highlight">Actual key generation would take much longer—this is a simulation!</span>
          </p>
          <div className="rsa-input-group">
            <button onClick={handleGenerateRealWorldKeys} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  Generating... <span className="rsa-loading"></span>
                </>
              ) : (
                'Simulate 2048-bit Key Generation'
              )}
            </button>
          </div>
          <div className="rsa-visualization">
            <h3 className="rsa-visualization-title">Key Generation Process</h3>
            <div className="rsa-key-display">
              <div className="rsa-key-box">
                <div className="rsa-key-label">Prime p</div>
                <div className="rsa-key-value">{realKeyValues.p}</div>
              </div>
              <div className="rsa-key-box">
                <div className="rsa-key-label">Prime q</div>
                <div className="rsa-key-value">{realKeyValues.q}</div>
              </div>
              <div className="rsa-key-box">
                <div className="rsa-key-label">Modulus n = p × q</div>
                <div className="rsa-key-value">{realKeyValues.n}</div>
              </div>
            </div>
            <div className="rsa-key-display">
              <div className="rsa-key-box">
                <div className="rsa-key-label">Public exponent e</div>
                <div className="rsa-key-value">{realKeyValues.e}</div>
              </div>
              <div className="rsa-key-box">
                <div className="rsa-key-label">Private key d</div>
                <div className="rsa-key-value">{realKeyValues.d}</div>
              </div>
            </div>
            <div className="rsa-encryption-steps" id="rsa-real-key-steps">
              {realKeyValues.steps.map((step, index) => (
                <div key={index} className="rsa-step-animation" dangerouslySetInnerHTML={{ __html: step }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KeyGenerator;