import React from 'react';

const CriShirtLogo: React.FC = () => {
  return (
    <div className="spookshirts-logo-container">
      {/* Custom Logo Image with Glowing Effect */}
      <div className="logo-image-wrapper">
        <img 
          src="/TSHIRT_LOGO.png" 
          alt="SpookShirts Logo" 
          className="logo-image"
        />
        <div className="logo-glow" />
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

        /* Logo Image Wrapper - Stable, no bouncing */
        .logo-image-wrapper {
          position: relative;
          width: 48px;
          height: 48px;
          transition: transform 0.6s ease-in-out;
        }

        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 0 15px rgba(255, 107, 0, 0.8));
          transition: all 0.4s ease;
        }

        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.4) 0%, rgba(147, 51, 234, 0.3) 50%, transparent 70%);
          animation: glowPulse 2s ease-in-out infinite;
          pointer-events: none;
          border-radius: 50%;
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.3);
          }
        }

        /* Hover Effects for Logo Image - Smooth rotation only */
        .spookshirts-logo-container:hover .logo-image-wrapper {
          transform: rotate(360deg) scale(1.1);
        }

        .spookshirts-logo-container:hover .logo-image {
          filter: drop-shadow(0 0 25px rgba(255, 107, 0, 1)) 
                 drop-shadow(0 0 35px rgba(147, 51, 234, 0.8))
                 brightness(1.2);
        }

        .spookshirts-logo-container:hover .logo-glow {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.5);
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

        /* Blood drip removed from top-right logo */
        .blood-drip {
          display: none;
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


      `}</style>
    </div>
  );
};

export default CriShirtLogo;
