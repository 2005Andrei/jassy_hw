import styles from '../styles/network.module.css';

function TutorialPanel({ isCapturing, isAttacking, packets, sslStripAttempted, missionComplete }) {
  const steps = [
    {
      title: "Capture Network Traffic",
      content: "Start sniffing packets to analyze network activity.",
      instructions: [
        "Click Start Capture or type tcpdump -i eth0",
        "Select packets to view details"
      ],
      tip: "tcpdump captures all traffic on an interface.",
      completed: isCapturing
    },
    {
      title: "Perform MITM Attack",
      content: "Intercept traffic using a MITM attack.",
      instructions: [
        "Click Launch MITM",
        "Type arpspoof -t 192.168.1.1 to reroute traffic",
        "Observe traffic flow in the topology"
      ],
      tip: "arpspoof enables MITM by sending fake ARP messages.",
      completed: isAttacking
    },
    {
      title: "Identify Vulnerabilities",
      content: "Analyze protocol weaknesses.",
      instructions: [
        "HTTP: Plaintext credentials",
        "FTP: Unencrypted logins",
        "DNS: Spoofing risks",
        "SSH: Try sslstrip for decryption"
      ],
      tip: "Use HTTPS to protect data from interception.",
      completed: isAttacking && packets.some(p => p.type === 'HTTP' && p.content.includes('password='))
    },
    {
      title: "Attempt SSL Stripping",
      content: "Expose encrypted traffic.",
      instructions: [
        "Click Strip SSL",
        "Type sslstrip in the console",
        "Check for plaintext HTTP traffic"
      ],
      tip: "sslstrip downgrades HTTPS to HTTP to capture sensitive data.",
      completed: sslStripAttempted
    },
    {
      title: "Complete Objectives",
      content: "Achieve these goals ethically:",
      instructions: [
        `Capture 20 packets (${packets.length}/20)`,
        `Find HTTP credentials (${
          packets.some(p => p.type === 'HTTP' && p.content.includes('password=')) ? 'Complete' : 'Incomplete'
        })`,
        `Detect FTP login (${
          packets.some(p => p.type === 'FTP' && p.content.includes('USER ')) ? 'Complete' : 'Incomplete'
        })`,
        `Attempt SSL decryption (${sslStripAttempted ? 'Complete' : 'Incomplete'})`
      ],
      tip: "Ethical hacking requires permission. Use tools responsibly.",
      completed: missionComplete
    }
  ];

  return (
    <div id="nas-tutorial-content" className={styles['nas-scrollable-content']}>
      {steps.map((step, index) => (
        <div 
          key={index}
          className={`${styles['nas-tutorial-step']} ${
            step.completed ? styles['nas-completed'] : 
            index === 0 || steps[index - 1]?.completed ? styles['nas-active'] : ''
          }`}
          id={`nas-step${index + 1}-tutorial`}
        >
          <h4><span className={styles['nas-step-number']}>{index + 1}</span> {step.title}</h4>
          <p>{step.content}</p>
          <ul>
            {step.instructions.map((instruction, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: instruction }} />
            ))}
          </ul>
          <div className={styles['nas-protocol-info']}>
            <strong>Tip:</strong> {step.tip}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TutorialPanel;