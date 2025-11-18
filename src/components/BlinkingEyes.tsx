import React, { useState, useEffect } from 'react';

const BlinkingEyes: React.FC = () => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Random blink every 6-9 seconds
  useEffect(() => {
    const scheduleNextBlink = () => {
      const delay = 6000 + Math.random() * 3000;
      setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 200);
        scheduleNextBlink();
      }, delay);
    };
    scheduleNextBlink();
  }, []);

  return (
    <div className="skull-icon-container">
      {/* Skull SVG */}
      <svg width="40" height="40" viewBox="0 0 40 40" className="skull-svg">
        {/* Skull head */}
        <ellipse cx="20" cy="18" rx="14" ry="16" fill="#e0e0e0" />
        
        {/* Skull jaw */}
        <path d="M 10 28 Q 20 32 30 28 L 28 26 Q 20 29 12 26 Z" fill="#d0d0d0" />
        
        {/* Left eye socket */}
        <ellipse cx="14" cy="16" rx="4" ry="5" fill="#1a1a1a" />
        
        {/* Right eye socket */}
        <ellipse cx="26" cy="16" rx="4" ry="5" fill="#1a1a1a" />
        
        {/* Left glowing eye */}
        <ellipse 
          cx="14" 
          cy="16" 
          rx="2.5" 
          ry={isBlinking ? "0.5" : "3"} 
          fill="#ff6b00" 
          className="skull-eye-glow"
        />
        
        {/* Right glowing eye */}
        <ellipse 
          cx="26" 
          cy="16" 
          rx="2.5" 
          ry={isBlinking ? "0.5" : "3"} 
          fill="#ff6b00" 
          className="skull-eye-glow"
        />
        
        {/* Lower eyelid left - Souled Store style */}
        <ellipse 
          cx="14" 
          cy={isBlinking ? "16" : "19"} 
          rx="4" 
          ry="2" 
          fill="#e0e0e0" 
          className="skull-eyelid"
        />
        
        {/* Lower eyelid right - Souled Store style */}
        <ellipse 
          cx="26" 
          cy={isBlinking ? "16" : "19"} 
          rx="4" 
          ry="2" 
          fill="#e0e0e0" 
          className="skull-eyelid"
        />
        
        {/* Nose hole */}
        <path d="M 18 22 L 20 24 L 22 22 Z" fill="#1a1a1a" />
        
        {/* Teeth */}
        <rect x="16" y="28" width="2" height="3" fill="#1a1a1a" />
        <rect x="19" y="28" width="2" height="3" fill="#1a1a1a" />
        <rect x="22" y="28" width="2" height="3" fill="#1a1a1a" />
      </svg>

      <style>{`
        .skull-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 0 8px rgba(255, 107, 0, 0.6));
          animation: skullFloat 3s ease-in-out infinite;
        }

        @keyframes skullFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        .skull-svg {
          transition: all 0.3s ease;
        }

        .skull-icon-container:hover .skull-svg {
          transform: scale(1.1);
          filter: drop-shadow(0 0 12px rgba(255, 107, 0, 0.9));
        }

        .skull-eye-glow {
          filter: drop-shadow(0 0 4px #ff6b00) drop-shadow(0 0 8px #ff8533);
          transition: all 0.2s ease;
        }

        .skull-eyelid {
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default BlinkingEyes;
