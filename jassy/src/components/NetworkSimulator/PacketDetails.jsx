import styles from '../styles/network.module.css';

function PacketDetails({ packet, isAttacking }) {
  if (!packet) return <div>Select a packet to view details</div>;

  const hexLines = [];
  const content = packet.content;
  const chunkSize = 16;

  for (let i = 0; i < content.length; i += chunkSize) {
    const chunk = content.slice(i, i + chunkSize);
    const hex = Array.from(chunk).map(c => 
      c.charCodeAt(0).toString(16).padStart(2, '0')
    ).join(' ');
    const ascii = chunk.replace(/[^\x20-\x7E]/g, '.');
    hexLines.push(
      <div className={styles['nas-hex-row']} key={i}>
        <span className={styles['nas-hex-offset']}>{i.toString(16).padStart(4, '0')}</span>
        <span className={styles['nas-hex-data']}>{hex.padEnd(chunkSize * 3, ' ')}</span>
        <span className={styles['nas-hex-ascii']}>{ascii}</span>
      </div>
    );
  }

  return (
    <div id="nas-packet-details" className={styles['nas-packet-details']}>
      <h4>{packet.type} Packet #{packet.id}</h4>
      <p>
        <strong>Time:</strong> {packet.time}<br />
        <strong>Source:</strong> {packet.srcIp}<br />
        <strong>Destination:</strong> {packet.dstIp}<br />
        <strong>Length:</strong> {packet.length} bytes
      </p>
      <h4>Packet Data</h4>
      <pre>{packet.content}</pre>
      <h4>Hex View</h4>
      <div className={styles['nas-hex-view']}>{hexLines}</div>
      
      {isAttacking && packet.type === 'HTTP' && packet.content.includes('password=') && (
        <div className={styles['nas-alert-box']}>
          <strong className={styles['nas-error']}>Warning:</strong> Plaintext credentials detected!
        </div>
      )}
    </div>
  );
}

export default PacketDetails;