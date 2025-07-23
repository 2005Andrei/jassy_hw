import styles from '../styles/network.module.css';

function NetworkTraffic({ packets, protocolFilter, selectedPacket, onSelectPacket }) {
  const filteredPackets = protocolFilter === 'all' 
    ? packets 
    : packets.filter(p => p.type.toLowerCase() === protocolFilter);

  return (
    <div id="nas-network-traffic" className={styles['nas-network-traffic']}>
      {filteredPackets.map(packet => (
        <div 
          key={packet.id}
          className={`${styles['nas-packet']} ${styles[`nas-${packet.class}`]} ${selectedPacket?.id === packet.id ? styles['nas-highlight'] : ''}`}
          onClick={() => onSelectPacket(packet)}
        >
          <span className={styles['nas-time']}>{packet.time}</span> 
          <span className={styles['nas-direction']}>{packet.direction}</span> 
          <span className={styles['nas-protocol']}>{packet.type}</span> 
          {packet.srcIp} → {packet.dstIp} 
          ({packet.length} bytes)
        </div>
      ))}
    </div>
  );
}

export default NetworkTraffic;