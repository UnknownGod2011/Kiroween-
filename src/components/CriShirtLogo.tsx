import React from 'react';

const CriShirtLogo: React.FC = () => {
  return (
    <div className="spookshirts-logo-container">
      {/* Skull Icon with Glowing Eyes */}
      <div className="skull-icon">
        💀
        <div className="skull-glow" />
      </div>

      {/* SpookShirts Text */}
      <div className="logo-text-wrapper">
        <div className="logo-text">
          SpookShirts
          <div className="blood-drip" />
        </div>
        <div className="logo-tagline">Haunted by AI</div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Nosifer&display=swap');

        .spookshirts-logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          animation: logoFadeUp 1s ease-out;
          transition: transform 0.3s ease;
        }

        .spookshirts-logo-container:hover {
          transform: scale(1.05);
        }

        @keyframes logoFadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Skull Icon */
        .skull-icon {
          position: relative;
          font-size: 36px;
          animation: skullFloat 3s ease-in-out infinite;
          filter: drop-shadow(0 0 10px rgba(255, 107, 0, 0.8));
        }

        @keyframes skullFloat {
          0%, 100% {
            transform: translateY(0) rotate(-5deg);
          }
          50% {
            transform: translateY(-5px) rotate(5deg);
          }
        }

        .skull-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.4) 0%, transparent 70%);
          animation: glowPulse 2s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        /* Logo Text */
        .logo-text-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .logo-text {
          font-family: 'Creepster', cursive;
          font-size: 26px;
          font-weight: 400;
          background: linear-gradient(to bottom, #ff6b00 0%, #9333ea 50%, #ff0000 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          letter-spacing: 1px;
          text-shadow: 0 0 20px rgba(255, 107, 0, 0.5);
          animation: hauntedFlicker 4s ease-in-out infinite;
        }

        @keyframes hauntedFlicker {
          0%, 100% {
            opacity: 1;
            filter: brightness(1);
          }
          50% {
            opacity: 0.95;
            filter: brightness(1.1);
          }
        }

        .blood-drip {
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 8px;
          background: linear-gradient(to bottom, #ff0000, #8b0000);
          border-radius: 0 0 50% 50%;
          animation: bloodDrip 6s ease-in-out infinite;
          opacity: 0;
        }

        @keyframes bloodDrip {
          0%, 90%, 100% {
            opacity: 0;
            transform: translateX(-50%) translateY(0);
          }
          10% {
            opacity: 1;
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) translateY(15px);
          }
          60% {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
        }

        .logo-tagline {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          font-weight: 600;
          color: #a259ff;
          letter-spacing: 2px;
          text-transform: uppercase;
          opacity: 0.8;
        }

        /* Hover effects */
        .spookshirts-logo-container:hover .logo-text {
          animation: hauntedShake 0.5s ease-in-out;
        }

        @keyframes hauntedShake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-2px) rotate(-1deg);
          }
          75% {
            transform: translateX(2px) rotate(1deg);
          }
        }

        .spookshirts-logo-container:hover .skull-icon {
          animation: skullSpin 0.6s ease-in-out;
        }

        @keyframes skullSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default CriShirtLogo;
