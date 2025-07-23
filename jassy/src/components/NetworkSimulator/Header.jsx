import styles from '../styles/network.module.css';

function Header({ 
  isCapturing, 
  isAttacking, 
  protocolFilter, 
  onStartCapture, 
  onLaunchAttack, 
  onDecryptTraffic,
  onProtocolFilterChange 
}) {
  return (
    <header className={styles['nas-header']}>
      <div className={styles['nas-logo']}>Network Attack Simulator</div>
      <div className={styles['nas-controls']}>
        <button 
          id="nas-start-btn" 
          className={styles['nas-button']}
          onClick={onStartCapture}
          disabled={isCapturing}
        >
          Start capture
        </button>
        <button 
          id="nas-attack-btn" 
          className={styles['nas-button']}
          onClick={onLaunchAttack}
          disabled={!isCapturing || isAttacking}
        >
          Launch MITM
        </button>
        <button 
          id="nas-decrypt-btn" 
          className={styles['nas-button']}
          onClick={onDecryptTraffic}
          disabled={!isCapturing}
        >
          Strip SSL
        </button>
        <select 
          id="nas-protocol-filter"
          className={styles['nas-select']}
          value={protocolFilter}
          onChange={(e) => onProtocolFilterChange(e.target.value)}
        >
          <option value="all">All Protocols</option>
          <option value="http">HTTP</option>
          <option value="ftp">FTP</option>
          <option value="dns">DNS</option>
          <option value="ssh">SSH</option>
        </select>
      </div>
    </header>
  );
}

export default Header;