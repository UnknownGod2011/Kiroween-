import { useEffect, useState } from 'react';

const FlyingBat = () => {
  const [position, setPosition] = useState({ x: -100, y: 50 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const flyBat = () => {
      setIsVisible(true);
      const startX = -100;
      const endX = window.innerWidth + 100;
      const startY = Math.random() * (window.innerHeight * 0.6);
      
      setPosition({ x: startX, y: startY });
      
      const duration = 8000 + Math.random() * 4000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress < 1) {
          const currentX = startX + (endX - startX) * progress;
          const currentY = startY + Math.sin(progress * Math.PI * 4) * 50;
          setPosition({ x: currentX, y: currentY });
          requestAnimationFrame(animate);
        } else {
          setIsVisible(false);
        }
      };
      
      animate();
    };

    // Random interval between 10-20 seconds
    const scheduleNextFlight = () => {
      const delay = 10000 + Math.random() * 10000;
      setTimeout(() => {
        flyBat();
        scheduleNextFlight();
      }, delay);
    };

    scheduleNextFlight();
    
    // Initial flight after 5 seconds
    setTimeout(flyBat, 5000);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-30 text-6xl transition-all duration-100"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translateX(-50%) translateY(-50%)',
        opacity: 0.4,
      }}
    >
      🦇
    </div>
  );
};

export default FlyingBat;
