const RealWorldApplications = () => {
  const applications = [
    {
      icon: '🔒',
      title: 'HTTPS & SSL/TLS',
      description: 'RSA is used in the <span class="rsa-tooltip">SSL/TLS protocol<span class="rsa-tooltiptext">Secure Sockets Layer/Transport Layer Security ensures secure communication over the internet.</span></span> that secures HTTPS connections. When you see the padlock icon in your browser, RSA may have been used to establish that secure connection.'
    },
    {
      icon: '📧',
      title: 'Email Encryption',
      description: 'PGP and S/MIME email encryption often use RSA to encrypt messages or to exchange symmetric keys for message encryption, ensuring private communication.'
    },
    {
      icon: '💳',
      title: 'Digital Payments',
      description: 'Credit card transactions, mobile payments, and cryptocurrency wallets often use RSA for secure key exchange and digital signatures.'
    },
    {
      icon: '🔗',
      title: 'Blockchain & Cryptocurrencies',
      description: 'RSA is used in some blockchain protocols for digital signatures, ensuring transaction authenticity and integrity in systems like Bitcoin and Ethereum.'
    },
    {
      icon: '🌐',
      title: 'VPNs & Secure File Transfer',
      description: 'Virtual Private Networks (VPNs) and secure file transfer protocols like SFTP use RSA for key exchange to establish encrypted communication channels.'
    }
  ];

  return (
    <div className="rsa-card">
      <h2 className="rsa-card-title">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
        </svg>
        RSA in the Modern World
      </h2>
      <div className="rsa-real-world-section">
        {applications.map((app, index) => (
          <div className="rsa-real-world-item" key={index}>
            <div className="rsa-real-world-icon">{app.icon}</div>
            <h3 className="rsa-real-world-title">{app.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: app.description }} />
          </div>
        ))}
      </div>
      <div className="rsa-info-box">
        <h3 className="rsa-info-box-title">Current Security Standards</h3>
        <p>
          As of 2023, the <strong>minimum recommended RSA key size is 2048 bits</strong>, with 3072 or 4096 bits recommended for long-term security. The NSA recommends phasing out RSA-2048 by 2030 in favor of 3072-bit or larger keys due to quantum computing threats.
        </p>
        <p>
          Modern implementations use RSA with{' '}
          <span className="rsa-tooltip">
            OAEP padding
            <span className="rsa-tooltiptext">Optimal Asymmetric Encryption Padding adds randomness to prevent certain attacks on RSA encryption.</span>
          </span>{' '}
          for encryption and{' '}
          <span className="rsa-tooltip">
            PSS padding
            <span className="rsa-tooltiptext">Probabilistic Signature Scheme enhances the security of RSA digital signatures.</span>
          </span>{' '}
          for signatures to prevent various attacks. The raw RSA algorithm shown in this demo is simplified for educational purposes.
        </p>
      </div>
    </div>
  );
};

export default RealWorldApplications;