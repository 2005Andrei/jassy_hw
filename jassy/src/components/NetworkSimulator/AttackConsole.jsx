import { useState, useEffect, useRef } from 'react';
import styles from '../styles/network.module.css';

function AttackConsole({ consoleOutput, onCommand, validCommands }) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const consoleEndRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleOutput]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleCommandSubmit = (e) => {
    if (e.key === 'Enter') {
      onCommand(inputValue);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (cmd) => {
    setInputValue(cmd);
    setShowSuggestions(false);
    onCommand(cmd);
  };

  const handleClickOutside = (e) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredCommands = validCommands.filter(cmd => 
    cmd.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div>
      <div id="nas-console-output" className={styles['nas-console-output']}>
        {consoleOutput.map((line, index) => (
          <p key={index} className={`${styles['nas-console-line']} ${
            line.includes('Error') ? styles['nas-error'] : 
            line.includes('success') ? styles['nas-success'] : 
            styles['nas-info']
          }`}>
            {line}
          </p>
        ))}
        <div ref={consoleEndRef} />
      </div>
      <div className={styles['nas-command-wrapper']}>
        <input
          type="text"
          id="nas-command-input"
          className={styles['nas-command-input']}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleCommandSubmit}
          onFocus={() => setShowSuggestions(inputValue.length > 0)}
          placeholder="Type 'tcpdump -i eth0' to start capturing..."
        />
        {showSuggestions && filteredCommands.length > 0 && (
          <ul 
            id="nas-command-suggestions" 
            className={`${styles['nas-suggestions']} ${styles['nas-active']}`}
            ref={suggestionsRef}
          >
            {filteredCommands.map((cmd, index) => (
              <li 
                key={index} 
                onClick={() => handleSuggestionClick(cmd)}
                onMouseDown={(e) => e.preventDefault()}
                className={styles['nas-suggestion-item']}
              >
                {cmd}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AttackConsole;