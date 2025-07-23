import { useState, useEffect, useCallback } from 'react';
import Header from './Header.jsx';
import NetworkTraffic from './NetworkTraffic.jsx';
import PacketDetails from './PacketDetails.jsx';
import NetworkVisualization from './NetworkVisualization.jsx';
import TutorialPanel from './TutorialPanel.jsx';
import Achievement from './Achievement.jsx';
import AttackConsole from './AttackConsole.jsx';
import { generatePacket, validCommands } from '../data/constants.js';
import '../styles/global.css';
import styles from '../styles/network.module.css';

const Network = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [selectedPacket, setSelectedPacket] = useState(null);
  const [packets, setPackets] = useState([]);
  const [protocolFilter, setProtocolFilter] = useState('all');
  const [missionComplete, setMissionComplete] = useState(false);
  const [sslStripAttempted, setSslStripAttempted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [consoleOutput, setConsoleOutput] = useState([
    'Welcome to Network Attack Simulator',
    'Scanning network interfaces...',
    'Detected eth0, wlan0',
    'Ready to capture. Click "Start Capture" or type "tcpdump -i eth0"'
  ]);

  const logToConsole = useCallback((message, type = 'info') => {
    setConsoleOutput(prev => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ${message}`
    ]);
  }, []);

  const startCapture = useCallback(() => {
    setIsCapturing(true);
    logToConsole('Initializing network capture...', 'info');
  }, [logToConsole]);

  const launchAttack = useCallback(() => {
    setIsAttacking(true);
    logToConsole('Setting up MITM attack...', 'info');
    logToConsole('Use "arpspoof -t 192.168.1.1" to poison ARP tables', 'info');
  }, [logToConsole]);

  const decryptTraffic = useCallback(() => {
    if (!isCapturing) {
      logToConsole('Error: Start packet capture first with "tcpdump -i eth0"', 'error');
      return;
    }
    setSslStripAttempted(true);
    logToConsole('Attempting SSL stripping...', 'info');
    logToConsole('Use "sslstrip" to downgrade HTTPS traffic', 'info');
  }, [isCapturing, logToConsole]);

  const handleCommand = useCallback((command) => {
    const cmd = command.toLowerCase().trim();
    logToConsole(`> ${command}`, 'info');

    if (cmd === 'tcpdump -i eth0') {
      if (!isCapturing) startCapture();
      logToConsole('Capturing packets on eth0...', 'success');
      setCompletedSteps(prev => Math.max(prev, 1));
    } 
    else if (cmd.startsWith('arpspoof -t ')) {
      if (!isCapturing) {
        logToConsole('Error: Start packet capture first with "tcpdump -i eth0"', 'error');
        return;
      }
      const target = cmd.split(' ')[2];
      if (target && /^192\.168\.\d{1,3}\.\d{1,3}$/.test(target)) {
        logToConsole(`Spoofing ARP table for ${target}... MITM active`, 'success');
        setCompletedSteps(prev => Math.max(prev, 2));
      } else {
        logToConsole('Error: Specify a valid target IP (e.g., arpspoof -t 192.168.1.1)', 'error');
      }
    } 
    else if (cmd === 'sslstrip') {
      if (!isCapturing) {
        logToConsole('Error: Start packet capture first with "tcpdump -i eth0"', 'error');
        return;
      }
      logToConsole('Running sslstrip... Stripping HTTPS to HTTP', 'success');
      setSslStripAttempted(true);
      setCompletedSteps(prev => Math.max(prev, 4));
    } 
    else if (cmd === 'bettercap --sniff') {
      if (!isCapturing) {
        logToConsole('Error: Start packet capture first with "tcpdump -i eth0"', 'error');
        return;
      }
      logToConsole('Sniffing traffic with bettercap...', 'success');
    } 
    else {
      logToConsole('Invalid command. Try: tcpdump -i eth0, arpspoof -t <IP>, sslstrip, bettercap --sniff', 'error');
    }
  }, [isCapturing, logToConsole, startCapture]);

  useEffect(() => {
    if (!isCapturing) return;

    const interval = setInterval(() => {
      const packet = generatePacket();
      setPackets(prev => {
        const newPackets = [...prev, packet];
        if (newPackets.length > 50) newPackets.shift();
        return newPackets;
      });
      
      if (Math.random() < 0.15) {
        setSelectedPacket(packet);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isCapturing]);

  useEffect(() => {
    if (missionComplete) return;

    const httpCredFound = packets.some(p => p.type === 'HTTP' && p.content.includes('password='));
    const ftpLoginFound = packets.some(p => p.type === 'FTP' && p.content.includes('USER '));
    
    if (packets.length >= 20 && httpCredFound && ftpLoginFound && sslStripAttempted) {
      setMissionComplete(true);
    }
  }, [packets, sslStripAttempted, missionComplete]);

  return (
    <div className="nas-container">
      <Achievement missionComplete={missionComplete} />
      <Header 
        isCapturing={isCapturing}
        isAttacking={isAttacking}
        protocolFilter={protocolFilter}
        onStartCapture={startCapture}
        onLaunchAttack={launchAttack}
        onDecryptTraffic={decryptTraffic}
        onProtocolFilterChange={setProtocolFilter}
      />
      
      <div className={`${styles['nas-panel']} ${styles['nas-liquid-glass']}`}>
        <h3 className={styles['nas-panel-title']}>Network Traffic</h3>
        <NetworkTraffic 
          packets={packets} 
          protocolFilter={protocolFilter}
          selectedPacket={selectedPacket}
          onSelectPacket={setSelectedPacket}
        />
      </div>

      <div className={`${styles['nas-panel']} ${styles['nas-details-panel']} ${styles['nas-liquid-glass']}`}>
        <h3 className={styles['nas-panel-title']}>Packet Details</h3>
        <PacketDetails packet={selectedPacket} isAttacking={isAttacking} />
      </div>

      <div className={`${styles['nas-panel']} ${styles['nas-viz-panel']} ${styles['nas-liquid-glass']}`}>
        <h3 className={styles['nas-panel-title']}>Network Topology</h3>
        <div id="nas-topology-content" className={styles['nas-scrollable-content']}>
          <NetworkVisualization 
            isAttacking={isAttacking} 
            selectedPacket={selectedPacket}
            isCapturing={isCapturing}
          />
          <div id="nas-attack-console" className={styles['nas-attack-console']}>
            <h4 className={styles['nas-console-title']}>Attack Console</h4>
            <AttackConsole 
              consoleOutput={consoleOutput}
              onCommand={handleCommand}
              validCommands={validCommands}
            />
          </div>
        </div>
      </div>

      <div className={`${styles['nas-panel']} ${styles['nas-tutorial-panel']} ${styles['nas-liquid-glass']}`}>
        <h3 className={styles['nas-panel-title']}>Network Analysis Tutorial</h3>
        <TutorialPanel 
          isCapturing={isCapturing}
          isAttacking={isAttacking}
          packets={packets}
          sslStripAttempted={sslStripAttempted}
          missionComplete={missionComplete}
        />
      </div>
    </div>
  );
};

export default Network;