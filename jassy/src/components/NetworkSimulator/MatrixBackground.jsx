import { useEffect } from 'react';

function MatrixBackground() {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'nas-matrix-canvas';
    const matrixContainer = document.getElementById('nas-matrix');
    matrixContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アカサタナハマヤラワガザダバパイキシチニヒミリギジヂビピウクスツヌフムユルグズブヅプエケセテネヘメレゲゼデベペオコソトノホモヨロゴゾドボポ0123456789';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const rainDrops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(8, 9, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 230, 0, 0.2)';
      ctx.font = `${fontSize}px Roboto Mono`;

      rainDrops.forEach((y, i) => {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) rainDrops[i] = 0;
        rainDrops[i]++;
      });
    }

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      matrixContainer.removeChild(canvas);
    };
  }, []);

  return <div className="nas-matrix-bg" id="nas-matrix"></div>;
}

export default MatrixBackground;