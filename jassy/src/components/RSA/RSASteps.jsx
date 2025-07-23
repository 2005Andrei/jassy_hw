const RSASteps = () => {
  const steps = [
    {
      number: 1,
      title: 'Choose two primes',
      description: 'Select distinct prime numbers <span class="rsa-math">p</span> and <span class="rsa-math">q</span>. For security, these should be very large (hundreds of digits) in real applications.'
    },
    {
      number: 2,
      title: 'Compute modulus',
      description: 'Calculate <span class="rsa-math">n = p × q</span>. This modulus is used in both public and private keys.'
    },
    {
      number: 3,
      title: 'Compute φ(n)',
      description: 'Euler\'s totient function <span class="rsa-math">φ(n) = (p-1)(q-1)</span> counts integers up to <span class="rsa-math">n</span> that are coprime with <span class="rsa-math">n</span>.'
    },
    {
      number: 4,
      title: 'Choose public exponent',
      description: 'Select <span class="rsa-math">e</span> where <span class="rsa-math">1 < e < φ(n)</span> and <span class="rsa-math">e</span> is coprime with <span class="rsa-math">φ(n)</span>. Common choice is 65537.'
    },
    {
      number: 5,
      title: 'Determine private key',
      description: 'Find <span class="rsa-math">d</span> such that <span class="rsa-math">d × e ≡ 1 mod φ(n)</span>. This is the modular multiplicative inverse of <span class="rsa-math">e</span>.'
    },
    {
      number: 6,
      title: 'Encrypt/Decrypt',
      description: 'Encryption: <span class="rsa-math">c ≡ m<sup>e</sup> mod n</span><br>Decryption: <span class="rsa-math">m ≡ c<sup>d</sup> mod n</span>'
    }
  ];

  return (
    <div className="rsa-card">
      <h2 className="rsa-card-title">How RSA Works</h2>
      <div className="rsa-rsa-steps">
        {steps.map((step) => (
          <div className="rsa-step" key={step.number}>
            <span className="rsa-step-number">{step.number}</span>
            <strong>{step.title}</strong>
            <p dangerouslySetInnerHTML={{ __html: step.description }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RSASteps;