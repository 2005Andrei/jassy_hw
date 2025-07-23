import { useEffect, useRef } from 'react';
import { nodes, connections } from '../data/constants';
import styles from '../styles/network.module.css';

function NetworkVisualization({ isAttacking, selectedPacket, isCapturing }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const packetAnimations = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 300;

    const drawNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentConnections = isAttacking 
        ? [...connections, { from: 'user', to: 'attacker' }, { from: 'attacker', to: 'server' }]
        : connections;

      currentConnections.forEach(conn => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        if (fromNode && toNode) {
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.strokeStyle = '#ffe600';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      });

      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 30, 0, 2 * Math.PI);
        ctx.fillStyle = '#2a2a2a';
        ctx.fill();
        ctx.strokeStyle = node.highlighted ? '#ffe600' : '#aaaaaa';
        ctx.lineWidth = node.highlighted ? 4 : 2;
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Roboto Mono';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.name, node.x, node.y);
      });

      packetAnimations.current = packetAnimations.current.filter(anim => anim.progress < 1);
      packetAnimations.current.forEach(anim => {
        const { packet, fromNode, toNode, progress } = anim;
        const ease = t => t * t * (3 - 2 * t);
        const x = fromNode.x + (toNode.x - fromNode.x) * ease(progress);
        const y = fromNode.y + (toNode.y - fromNode.y) * ease(progress);

        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = packet.color || '#ffe600';
        ctx.fill();

        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;

        anim.progress += 0.016;
      });

      if (packetAnimations.current.length > 0) {
        animationRef.current = requestAnimationFrame(drawNetwork);
      }
    };

    drawNetwork();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      let redraw = false;
      
      nodes.forEach(node => {
        const dist = Math.sqrt((mouseX - node.x) ** 2 + (mouseY - node.y) ** 2);
        if (dist < 30) {
          node.highlighted = true;
          redraw = true;
        } else {
          node.highlighted = false;
        }
      });
      
      if (redraw) drawNetwork();
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isAttacking]);

  useEffect(() => {
    if (!selectedPacket || !isCapturing) return;

    const fromNode = selectedPacket.direction === '→' 
      ? nodes.find(n => n.id === 'user') 
      : nodes.find(n => n.id === 'server');
    const toNode = selectedPacket.direction === '→' 
      ? nodes.find(n => n.id === 'server') 
      : nodes.find(n => n.id === 'user');

    if (!fromNode || !toNode) return;

    if (isAttacking && selectedPacket.type !== 'SSH') {
      const attackerNode = nodes.find(n => n.id === 'attacker');
      packetAnimations.current.push({ 
        packet: { ...selectedPacket, color: getProtocolColor(selectedPacket.type) }, 
        fromNode, 
        toNode: attackerNode, 
        progress: 0 
      });
      
      setTimeout(() => {
        packetAnimations.current.push({ 
          packet: { ...selectedPacket, color: getProtocolColor(selectedPacket.type) }, 
          fromNode: attackerNode, 
          toNode, 
          progress: 0 
        });
      }, 1000);
    } else {
      packetAnimations.current.push({ 
        packet: { ...selectedPacket, color: getProtocolColor(selectedPacket.type) }, 
        fromNode, 
        toNode, 
        progress: 0 
      });
    }

    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        drawNetwork(ctx);
      });
    }
  }, [selectedPacket, isAttacking, isCapturing]);

  const drawNetwork = (ctx) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    const currentConnections = isAttacking 
      ? [...connections, { from: 'user', to: 'attacker' }, { from: 'attacker', to: 'server' }]
      : connections;

    currentConnections.forEach(conn => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);
      if (fromNode && toNode) {
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = '#ffe600';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    });

    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 30, 0, 2 * Math.PI);
      ctx.fillStyle = '#2a2a2a';
      ctx.fill();
      ctx.strokeStyle = node.highlighted ? '#ffe600' : '#aaaaaa';
      ctx.lineWidth = node.highlighted ? 4 : 2;
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Roboto Mono';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.name, node.x, node.y);
    });

    packetAnimations.current = packetAnimations.current.filter(anim => anim.progress < 1);
    packetAnimations.current.forEach(anim => {
      const { packet, fromNode, toNode, progress } = anim;
      const ease = t => t * t * (3 - 2 * t);
      const x = fromNode.x + (toNode.x - fromNode.x) * ease(progress);
      const y = fromNode.y + (toNode.y - fromNode.y) * ease(progress);

      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = packet.color || '#ffe600';
      ctx.fill();

      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, 2 * Math.PI);
      ctx.fill();
      ctx.globalAlpha = 1;

      anim.progress += 0.016;
    });

    if (packetAnimations.current.length > 0) {
      animationRef.current = requestAnimationFrame(() => drawNetwork(ctx));
    } else {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const getProtocolColor = (type) => {
    const colors = {
      HTTP: '#268bd2',
      FTP: '#f7ca18',
      DNS: '#2ecc71',
      SSH: '#bb9af7'
    };
    return colors[type] || '#ffe600';
  };

  return (
    <div id="nas-network-visualization" className={styles['nas-network-visualization']}>
      <canvas id="nas-network-canvas" className={styles['nas-network-canvas']} ref={canvasRef} width="800" height="300"></canvas>
      <div className={styles['nas-scan-line']}></div>
    </div>
  );
}

export default NetworkVisualization;