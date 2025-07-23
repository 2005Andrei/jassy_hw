import { useState } from 'react';
import { encryptMessage, decryptMessage } from '../utils/rsaUtils';

const MessageEncryption = ({ currentMode, p, q, n, e, d }) => {
  const [message, setMessage] = useState('hello');
  const [ciphertext, setCiphertext] = useState('');
  const [encryptionResult, setEncryptionResult] = useState('Encrypted message will appear here...');
  const [decryptionResult, setDecryptionResult] = useState('Decrypted message will appear here...');
  const [encryptionSteps, setEncryptionSteps] = useState([]);

  const handleEncrypt = () => {
    const result = encryptMessage(message, currentMode, n, e);
    if (result) {
      setEncryptionResult(result.result);
      setEncryptionSteps(result.steps);
      setCiphertext(result.ciphertext || '');
    }
  };

  const handleDecrypt = () => {
    const result = decryptMessage(ciphertext, currentMode, n, d);
    if (result) {
      setDecryptionResult(result.result);
      setEncryptionSteps(result.steps);
    }
  };

  return (
    <div className="rsa-card">
      <h2 className="rsa-card-title">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
        </svg>
        Message Encryption/Decryption
      </h2>
      <div className="rsa-calculator">
        <div>
          <div className="rsa-input-group">
            <label htmlFor="rsa-message">Message to encrypt (try "hello"):</label>
            <input
              type="text"
              id="rsa-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-describedby="rsa-message-help"
            />
            <small id="rsa-message-help" className="rsa-sr-only">
              Enter a message to encrypt (e.g., 'hello')
            </small>
          </div>
          <div className="rsa-input-group artificial-margins">
            <button onClick={handleEncrypt}>Encrypt</button>
          </div>
          <div className="rsa-result" dangerouslySetInnerHTML={{ __html: encryptionResult }} />
        </div>
        <div>
          <div className="rsa-input-group">
            <label htmlFor="rsa-ciphertext">Ciphertext to decrypt:</label>
            <input
              type="text"
              id="rsa-ciphertext"
              value={ciphertext}
              onChange={(e) => setCiphertext(e.target.value)}
              aria-describedby="rsa-ciphertext-help"
            />
            <small id="rsa-ciphertext-help" className="rsa-sr-only">
              Enter the ciphertext to decrypt
            </small>
          </div>
          <div className="rsa-input-group artificial-margins">
            <button onClick={handleDecrypt}>Decrypt</button>
          </div>
          <div className="rsa-result" dangerouslySetInnerHTML={{ __html: decryptionResult }} />
        </div>
      </div>
      <div className="rsa-visualization">
        <h3 className="rsa-visualization-title">Encryption/Decryption Steps</h3>
        <div id="rsa-encryption-steps">
          {encryptionSteps.map((step, index) => (
            <div key={index} className="rsa-step-animation" dangerouslySetInnerHTML={{ __html: step }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageEncryption;