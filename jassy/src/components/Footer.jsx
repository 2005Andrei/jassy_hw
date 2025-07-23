import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <p>DRAG TO EXPLORE</p>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: fixed;
  width: 100vw;
  padding: 2em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 2;
  mix-blend-mode: difference;
  bottom: 0;
  right: 0;
  opacity: 1;
  transition: opacity 0.5s ease;

  p {
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 0.05em;
    -webkit-font-smoothing: antialiased;
  }
`;

export default Footer;