const HistorySection = () => {
  return (
    <section className="rsa-history-section">
      <div className="rsa-history-text">
        <h2>The Birth of Public-Key Cryptography</h2>
        <p>
          In 1977, three MIT researchers—Ron Rivest, Adi Shamir, and Leonard Adleman—invented the RSA algorithm, named after their initials. This breakthrough solved one of cryptography's fundamental problems: secure key exchange.
        </p>
        <p>
          Unlike symmetric encryption, which uses the same key to encrypt and decrypt, RSA uses a pair of keys: one public (shared with everyone) and one private (kept secret). This revolutionary concept became the foundation for secure internet communication, digital signatures, and cryptocurrency.
        </p>
        <div className="rsa-info-box">
          <h3 className="rsa-info-box-title">Modern Cryptography Note</h3>
          <p>
            While RSA was revolutionary in 1977, modern cryptography often uses{' '}
            <span className="rsa-tooltip">
              elliptic curve cryptography (ECC)
              <span className="rsa-tooltiptext">
                ECC provides equivalent security to RSA with smaller key sizes, making it more efficient for devices with limited processing power.
              </span>
            </span>{' '}
            for better security with smaller keys. However, RSA remains widely used and is fundamental to understanding public-key cryptography.
          </p>
        </div>
      </div>
      <div className="rsa-history-image">
        <img
          src="https://i.pinimg.com/1200x/85/c0/4a/85c04a7f0c52c7d1e55f4a448db5e38a.jpg"
          alt="RSA inventors Rivest, Shamir, and Adleman"
        />
        <p>Rivest, Shamir, and Adleman in 2016</p>
      </div>
    </section>
  );
};

export default HistorySection;