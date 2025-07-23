import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import bcrypt from 'bcryptjs';

const PasswordHashingDemonstrator = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hashes, setHashes] = useState({
    sha1: 'Hash will appear here...',
    sha256: 'Hash will appear here...',
    bcrypt: 'Hash will appear here...',
  });
  const [securityIndicators, setSecurityIndicators] = useState({
    sha1: { width: '0%', label: 'WEAK SECURITY' },
    sha256: { width: '0%', label: 'MODERATE SECURITY' },
    bcrypt: { width: '0%', label: 'STRONG SECURITY' },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length === 0) {
      resetHashes();
      return;
    }

    // SHA-1 Hash
    const sha1Hash = CryptoJS.SHA1(password).toString(CryptoJS.enc.Hex);
    // SHA-256 Hash
    const sha256Hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    // bcrypt Hash
    setHashes((prev) => ({ ...prev, bcrypt: 'Computing... (this may take a moment)' }));

    const salt = bcrypt.genSaltSync(10);
    setTimeout(() => {
      try {
        const bcryptHash = bcrypt.hashSync(password, salt);
        setHashes({ sha1: sha1Hash, sha256: sha256Hash, bcrypt: bcryptHash });
        updateSecurityIndicators();
      } catch (error) {
        setHashes((prev) => ({ ...prev, bcrypt: 'Error computing bcrypt hash' }));
        console.error('bcrypt error:', error);
      }
    }, 100);
  };

  const resetHashes = () => {
    setHashes({
      sha1: 'Hash will appear here...',
      sha256: 'Hash will appear here...',
      bcrypt: 'Hash will appear here...',
    });
    setSecurityIndicators({
      sha1: { width: '0%', label: 'WEAK SECURITY' },
      sha256: { width: '0%', label: 'MODERATE SECURITY' },
      bcrypt: { width: '0%', label: 'STRONG SECURITY' },
    });
  };

  const updateSecurityIndicators = () => {
    setSecurityIndicators({
      sha1: { width: '30%', label: 'WEAK SECURITY (VULNERABLE)' },
      sha256: { width: '70%', label: 'GOOD SECURITY (BUT FAST)' },
      bcrypt: { width: '100%', label: 'STRONG SECURITY (RECOMMENDED)' },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Simulate the avalanche effect demo
  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (password === '') {
        setPassword('password123');
        const sha1Hash = CryptoJS.SHA1('password123').toString(CryptoJS.enc.Hex);
        const sha256Hash = CryptoJS.SHA256('password123').toString(CryptoJS.enc.Hex);
        setHashes((prev) => ({ ...prev, bcrypt: 'Computing... (this may take a moment)' }));
        const salt = bcrypt.genSaltSync(10);
        setTimeout(() => {
          try {
            const bcryptHash = bcrypt.hashSync('password123', salt);
            setHashes({ sha1: sha1Hash, sha256: sha256Hash, bcrypt: bcryptHash });
            updateSecurityIndicators();
          } catch (error) {
            setHashes((prev) => ({ ...prev, bcrypt: 'Error computing bcrypt hash' }));
            console.error('bcrypt error:', error);
          }
        }, 100);

        const timer2 = setTimeout(() => {
          setPassword('password124');
          const newSha1Hash = CryptoJS.SHA1('password124').toString(CryptoJS.enc.Hex);
          const newSha256Hash = CryptoJS.SHA256('password124').toString(CryptoJS.enc.Hex);
          setHashes((prev) => ({ ...prev, bcrypt: 'Computing... (this may take a moment)' }));
          const newSalt = bcrypt.genSaltSync(10);
          setTimeout(() => {
            try {
              const newBcryptHash = bcrypt.hashSync('password124', newSalt);
              setHashes({ sha1: newSha1Hash, sha256: newSha256Hash, bcrypt: newBcryptHash });
              updateSecurityIndicators();
            } catch (error) {
              setHashes((prev) => ({ ...prev, bcrypt: 'Error computing bcrypt hash' }));
              console.error('bcrypt error:', error);
            }
          }, 100);
        }, 2000);

        return () => clearTimeout(timer2);
      }
    }, 1000);

    return () => clearTimeout(timer1);
  }, []);

  return (
    <div className="pwd-hash-container">
      <style jsx>{`
        :root {
          --bg-dark: #121212;
          --bg-darker: #0a0a0a;
          --primary: #ffd700;
          --primary-dark: #ffc400;
          --text: #e0e0e0;
          --text-secondary: #a0a0a0;
          --card-bg: #1e1e1e;
          --card-border: #333;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .pwd-hash-container {
          background-color: var(--bg-dark);
          color: var(--text);
          min-height: 100vh;
          padding: 2rem;
          line-height: 1.6;
          max-width: 900px;
          margin: 0 auto;
        }

        .pwd-hash-header {
          text-align: center;
          margin-bottom: 2.5rem;
          position: relative;
        }

        .pwd-hash-title {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          color: var(--primary);
          letter-spacing: 1px;
        }

        .pwd-hash-subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto;
        }

        .pwd-hash-input-section {
          background-color: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 8px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .pwd-hash-input-group {
          margin-bottom: 1.5rem;
          position: relative;
        }

        .pwd-hash-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--primary);
        }

        .pwd-hash-password-container {
          position: relative;
        }

        .pwd-hash-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid var(--card-border);
          border-radius: 4px;
          background-color: var(--bg-darker);
          color: var(--text);
          font-size: 1rem;
          transition: all 0.3s ease;
          padding-right: 40px;
        }

        .pwd-hash-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
        }

        .pwd-hash-toggle-password {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .pwd-hash-toggle-password:hover {
          color: var(--primary);
        }

        .pwd-hash-submit-btn {
          background-color: var(--primary);
          color: var(--bg-dark);
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: block;
          width: 100%;
        }

        .pwd-hash-submit-btn:hover {
          background-color: var(--primary-dark);
          transform: translateY(-2px);
        }

        .pwd-hash-submit-btn:active {
          transform: translateY(0);
        }

        .pwd-hash-results {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .pwd-hash-card {
          background-color: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 8px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .pwd-hash-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }

        .pwd-hash-card-title {
          color: var(--primary);
          margin-bottom: 1rem;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
        }

        .pwd-hash-card-title span {
          margin-left: 8px;
          font-size: 0.8rem;
          background-color: var(--primary-dark);
          color: var(--bg-dark);
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: bold;
        }

        .pwd-hash-value {
          font-family: 'Courier New', Courier, monospace;
          word-break: break-all;
          background-color: var(--bg-darker);
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 1rem;
          min-height: 80px;
          border-left: 3px solid var(--primary);
        }

        .pwd-hash-info {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .pwd-hash-security-indicator {
          height: 6px;
          background-color: var(--bg-darker);
          border-radius: 3px;
          margin-top: 1rem;
          overflow: hidden;
        }

        .pwd-hash-security-bar {
          height: 100%;
          transition: width 0.5s ease;
        }

        .pwd-hash-security-label {
          font-size: 0.8rem;
          margin-top: 4px;
          text-align: right;
          font-weight: 500;
        }

        .pwd-hash-notes-section {
          background-color: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 8px;
          padding: 2rem;
          margin-top: 2rem;
        }

        .pwd-hash-notes-title {
          color: var(--primary);
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .pwd-hash-notes-section p {
          margin-bottom: 1rem;
        }

        .pwd-hash-notes-section ul {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .pwd-hash-notes-section li {
          margin-bottom: 0.5rem;
        }

        .pwd-hash-highlight {
          color: var(--primary);
          font-weight: 500;
        }

        .pwd-hash-tooltip {
          position: relative;
          display: inline-block;
          cursor: help;
          border-bottom: 1px dotted var(--text-secondary);
        }

        .pwd-hash-tooltip .pwd-hash-tooltip-text {
          visibility: hidden;
          width: 300px;
          background-color: var(--bg-darker);
          color: var(--text);
          text-align: center;
          border-radius: 6px;
          padding: 10px;
          position: absolute;
          z-index: 1;
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          transition: opacity 0.3s;
          font-size: 0.9rem;
          border: 1px solid var(--card-border);
        }

        .pwd-hash-tooltip:hover .pwd-hash-tooltip-text {
          visibility: visible;
          opacity: 1;
        }

        @media (max-width: 768px) {
          .pwd-hash-results {
            grid-template-columns: 1fr;
          }
        }

        .pwd-hash-loading {
          color: var(--text-secondary);
          font-style: italic;
        }

        .pwd-hash-original-password {
          margin-top: 1rem;
          padding: 12px;
          background-color: var(--bg-darker);
          border-radius: 4px;
          font-family: 'Courier New', Courier, monospace;
          word-break: break-all;
          border-left: 3px solid var(--primary);
        }
      `}</style>

      <header className="pwd-hash-header">
        <h1 className="pwd-hash-title">Password Hashing Demonstrator</h1>
        <p className="pwd-hash-subtitle">
          See how different hashing algorithms transform your password into secure, irreversible hashes. Notice how even small changes create completely different results.
        </p>
      </header>

      <section className="pwd-hash-input-section">
        <form onSubmit={handleSubmit}>
          <div className="pwd-hash-input-group">
            <label className="pwd-hash-label" htmlFor="pwd-hash-password-input">
              Enter a password to hash:
            </label>
            <div className="pwd-hash-password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="pwd-hash-password-input"
                className="pwd-hash-input"
                placeholder="Type your password here..."
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="pwd-hash-toggle-password"
                aria-label="Toggle password visibility"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '👁️‍🗨️' : '👁️'}
              </button>
            </div>
          </div>
          <button type="submit" className="pwd-hash-submit-btn">
            Generate Hashes
          </button>
        </form>
        {password && (
          <div className="pwd-hash-original-password">
            <strong>Original password:</strong> <span>{password}</span>
          </div>
        )}
      </section>

      <div className="pwd-hash-results">
        <div className="pwd-hash-card">
          <h3 className="pwd-hash-card-title">
            SHA-1 <span>FAST BUT INSECURE</span>
          </h3>
          <div className="pwd-hash-value">{hashes.sha1}</div>
          <div className="pwd-hash-info">
            <p>
              SHA-1 produces a 160-bit (20-byte) hash. It's <span className="pwd-hash-highlight">fast</span> but considered <span className="pwd-hash-highlight">cryptographically broken</span> due to vulnerabilities.
            </p>
            <div className="pwd-hash-security-indicator">
              <div
                className="pwd-hash-security-bar"
                style={{ width: securityIndicators.sha1.width, backgroundColor: '#ff4d4d' }}
              ></div>
            </div>
            <div className="pwd-hash-security-label">{securityIndicators.sha1.label}</div>
          </div>
        </div>

        <div className="pwd-hash-card">
          <h3 className="pwd-hash-card-title">
            SHA-256 <span>BALANCED</span>
          </h3>
          <div className="pwd-hash-value">{hashes.sha256}</div>
          <div className="pwd-hash-info">
            <p>
              SHA-256 produces a 256-bit (32-byte) hash. Part of the SHA-2 family, it's <span className="pwd-hash-highlight">more secure</span> than SHA-1 but still <span className="pwd-hash-highlight">fast</span> for attackers with modern hardware.
            </p>
            <div className="pwd-hash-security-indicator">
              <div
                className="pwd-hash-security-bar"
                style={{ width: securityIndicators.sha256.width, backgroundColor: '#ffa500' }}
              ></div>
            </div>
            <div className="pwd-hash-security-label">{securityIndicators.sha256.label}</div>
          </div>
        </div>

        <div className="pwd-hash-card">
          <h3 className="pwd-hash-card-title">
            bcrypt <span>RECOMMENDED</span>
          </h3>
          <div className="pwd-hash-value">{hashes.bcrypt}</div>
          <div className="pwd-hash-info">
            <p>
              bcrypt is a <span className="pwd-hash-highlight">password-hashing function</span> designed to be slow and computationally intensive, making brute-force attacks impractical.
            </p>
            <div className="pwd-hash-security-indicator">
              <div
                className="pwd-hash-security-bar"
                style={{ width: securityIndicators.bcrypt.width, backgroundColor: '#4CAF50' }}
              ></div>
            </div>
            <div className="pwd-hash-security-label">{securityIndicators.bcrypt.label}</div>
          </div>
        </div>
      </div>

      <section className="pwd-hash-notes-section">
        <h2 className="pwd-hash-notes-title">Understanding Password Hashing</h2>
        <p>
          Password hashing is a fundamental security practice that transforms passwords into irreversible, fixed-length strings of characters. Here's what you need to know:
        </p>
        <ul>
          <li>
            <span className="pwd-hash-highlight">Deterministic:</span> The same input always produces the same hash output.
          </li>
          <li>
            <span className="pwd-hash-highlight">Irreversible:</span> You can't retrieve the original password from the hash (in theory).
          </li>
          <li>
            <span className="pwd-hash-highlight">Avalanche effect:</span> Small changes in input create completely different hashes.
          </li>
          <li>
            <span className="pwd-hash-highlight">Security varies:</span> Not all hash functions are equally secure for password storage.
          </li>
        </ul>
        <p>
          <span className="pwd-hash-highlight">Why bcrypt is recommended:</span> Unlike SHA algorithms, bcrypt is deliberately slow and can be made slower as computers get faster (by increasing the work factor). This makes brute-force attacks impractical.
        </p>
        <p className="pwd-hash-tooltip">
          ℹ️ <span className="pwd-hash-highlight">Important note:</span> In real applications, you should always use a <span className="pwd-hash-highlight">salt</span> (random data added to each password before hashing) to prevent rainbow table attacks.
          <span className="pwd-hash-tooltip-text">
            This demo shows basic hashing without salting for simplicity, but production systems should always use unique salts for each password.
          </span>
        </p>
      </section>
    </div>
  );
};

export default PasswordHashingDemonstrator;