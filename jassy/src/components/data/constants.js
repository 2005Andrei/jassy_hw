// src/data/constants.js
import { generatePacketContent } from '../utils/helpers';

// Network nodes data
export const nodes = [
  { id: 'user', name: 'User', x: 100, y: 150 },
  { id: 'router', name: 'Router', x: 350, y: 100 },
  { id: 'server', name: 'Server', x: 600, y: 150 },
  { id: 'attacker', name: 'Attacker', x: 350, y: 200 }
];

// Connections between nodes
export const connections = [
  { from: 'user', to: 'router' },
  { from: 'router', to: 'server' },
  { from: 'attacker', to: 'router' }
];

// Packet types and classes
export const packetTypes = ['HTTP', 'FTP', 'DNS', 'SSH'];
export const packetClasses = ['http', 'ftp', 'dns', 'ssh'];
export const packetDirections = ['→', '←'];

// Valid commands for suggestions
export const validCommands = [
  'arpspoof -t 192.168.1.1',
  'tcpdump -i eth0',
  'sslstrip',
  'bettercap --sniff'
];

// Generate a random packet
export const generatePacket = () => {
  const typeIndex = Math.floor(Math.random() * packetTypes.length);
  const directionIndex = Math.floor(Math.random() * packetDirections.length);
  const srcIp = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  const dstIp = `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  const length = Math.floor(Math.random() * 1000) + 100;
  const time = new Date().toLocaleTimeString();

  return {
    id: Math.floor(Math.random() * 1000000),
    type: packetTypes[typeIndex],
    class: packetClasses[typeIndex],
    direction: packetDirections[directionIndex],
    srcIp,
    dstIp,
    length,
    time,
    content: generatePacketContent(packetTypes[typeIndex]),
    selected: false
  };
};