import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.cdnfonts.com/css/thegoodmonolith');
  @import url('https://fonts.cdnfonts.com/css/pp-neue-montreal');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /*body {
    font-family: 'TheGoodMonolith', monospace;
    background-color: #111;
    color: #f0f0f0;
    overflow: hidden;
    position: relative;
  }

  body::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://img.freepik.com/premium-photo/white-dust-scratches-black-background_279525-2.jpg?w=640');
    background-repeat: repeat;
    opacity: 0.1;
    mix-blend-mode: screen;
    pointer-events: none;
    z-index: 1;
  }

  body::before {
    content: '';
    position: fixed;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: transparent url('http://assets.iceable.com/img/noise-transparent.png') repeat 0 0;
    background-size: 300px 300px;
    animation: noise-animation 0.3s steps(5) infinite;
    opacity: 0.9;
    will-change: transform;
    z-index: 100;
    pointer-events: none;
  }*/

  @keyframes noise-animation {
    0% { transform: translate(0, 0); }
    10% { transform: translate(-2%, -3%); }
    20% { transform: translate(-4%, 2%); }
    30% { transform: translate(2%, -4%); }
    40% { transform: translate(-2%, 5%); }
    50% { transform: translate(-4%, 2%); }
    60% { transform: translate(3%, 0); }
    70% { transform: translate(0, 3%); }
    80% { transform: translate(-3%, 0); }
    90% { transform: translate(2%, 2%); }
    100% { transform: translate(1%, 0); }
  }

  @keyframes fadeIn {
    0% { opacity: 0; transform: scale(0); }
    100% { opacity: 1; transform: scale(1); }
  }

  @keyframes fadeOut {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0); }
  }

  @keyframes pulse {
    0% { transform: scale(0.8); }
    50% { transform: scale(1.2); }
    100% { transform: scale(0.8); }
  }
`;