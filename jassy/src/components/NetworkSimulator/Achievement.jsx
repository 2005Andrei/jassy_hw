import { useEffect } from 'react';
import confetti from 'canvas-confetti';

function Achievement({ missionComplete }) {
  useEffect(() => {
    if (missionComplete) {
      const timer = setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffe600', '#bb9af7', '#268bd2']
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [missionComplete]);

  if (!missionComplete) return null;

  return (
    <div className="nas-achievement-wrapper">
      <div className="nas-achievement nas-show">
        <h3>Mission Complete!</h3>
        <p>You've analyzed network traffic and identified vulnerabilities!</p>
        <canvas id="nas-confetti-canvas"></canvas>
      </div>
    </div>
  );
}

export default Achievement;