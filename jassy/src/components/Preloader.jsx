import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Preloader = ({ isLoading }) => {
  const containerRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !progressRef.current) return;

    const container = containerRef.current;
    const progressBar = progressRef.current;
    const rings = 5;
    const allDots = [];

    // Create center dot
    const centerDot = document.createElement('div');
    centerDot.className = 'dot';
    centerDot.style.width = '8px';
    centerDot.style.height = '8px';
    centerDot.style.left = 'calc(50% - 4px)';
    centerDot.style.top = 'calc(50% - 4px)';
    centerDot.style.backgroundColor = '#ffe600';
    centerDot.style.animation = 'pulse 1.5s infinite ease-in-out';
    centerDot.style.opacity = '1';
    container.appendChild(centerDot);


    // Animation sequence
    const totalAnimationTime = 5000;
    const progressUpdateInterval = 50;
    let startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / totalAnimationTime) * 100);
      progressBar.style.width = `${progress}%`;
      if (progress < 100) {
        setTimeout(updateProgress, progressUpdateInterval);
      }
    };

    updateProgress();

    setTimeout(() => {
      let delay = 0;
      const delayIncrement = 20;
      allDots.sort((a, b) => (a.ring !== b.ring ? a.ring - b.ring : a.index - b.index));
      allDots.forEach((dot) => {
        setTimeout(() => {
          dot.element.style.animation = 'fadeIn 0.4s forwards ease-out';
        }, delay);
        delay += delayIncrement;
      });

      setTimeout(() => {
        centerDot.style.animation = 'fadeOut 0.4s forwards ease-in';
        allDots.sort((a, b) => (a.ring !== b.ring ? b.ring - a.ring : a.index - b.index));
        let reverseDelay = 200;
        allDots.forEach((dot) => {
          setTimeout(() => {
            dot.element.style.animation = 'fadeOut 0.4s forwards ease-in';
          }, reverseDelay);
          reverseDelay += delayIncrement;
        });
      }, delay + 750);
    }, 750);

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <PreloaderContainer style={{ opacity: isLoading ? 1 : 0, display: isLoading ? 'flex' : 'none' }}>
      <CircleContainer ref={containerRef} />
      <InitializingTextContainer>
        <InitializingProgress ref={progressRef} />
        <InitializingText>INITIALIZING</InitializingText>
      </InitializingTextContainer>
    </PreloaderContainer>
  );
};

const PreloaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1);
`;

const CircleContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: 30px;
`;

const InitializingTextContainer = styled.div`
  position: relative;
  margin-top: 30px;
  overflow: hidden;
`;

const InitializingProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0%;
  background-color: #ffe600;
  z-index: 1;
`;

const InitializingText = styled.div`
  font-family: 'TheGoodMonolith', monospace;
  color: #fff;
  font-size: 12px;
  letter-spacing: 3px;
  position: relative;
  z-index: 2;
  mix-blend-mode: difference;
`;

export default Preloader;