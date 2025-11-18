import React from 'react';

const PortalCircle: React.FC = () => {
  return (
    <>
      {/* Outer Portal Glow - HUGE and BRIGHT */}
      <div 
        className="absolute portal-glow-outer"
        style={{
          top: '-100px',
          left: '-100px',
          right: '-100px',
          bottom: '-100px',
          zIndex: 0,
          willChange: 'transform, opacity',
        }}
      />

      {/* Middle Portal Glow - Bright Ring */}
      <div 
        className="absolute portal-glow-middle"
        style={{
          top: '-50px',
          left: '-50px',
          right: '-50px',
          bottom: '-50px',
          zIndex: 0,
          willChange: 'transform, opacity',
        }}
      />

      {/* Inner Portal Glow - Intense Core */}
      <div 
        className="absolute portal-glow-inner"
        style={{
          top: '-20px',
          left: '-20px',
          right: '-20px',
          bottom: '-20px',
          zIndex: 0,
          willChange: 'transform, opacity',
        }}
      />

      <style>{`
        /* Outer glow - MASSIVE purple/blue aura */}
        .portal-glow-outer {
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(147, 51, 234, 0.6) 0%,
            rgba(59, 130, 246, 0.5) 20%,
            rgba(147, 51, 234, 0.4) 40%,
            rgba(255, 107, 0, 0.3) 60%,
            transparent 100%
          );
          filter: blur(60px);
          animation: portal-pulse-outer 4s ease-in-out infinite;
        }

        /* Middle glow - BRIGHT neon ring */}
        .portal-glow-middle {
          border-radius: 50%;
          background: radial-gradient(
            circle,
            transparent 30%,
            rgba(147, 51, 234, 1) 45%,
            rgba(255, 107, 0, 0.9) 50%,
            rgba(147, 51, 234, 0.8) 55%,
            rgba(59, 130, 246, 0.6) 65%,
            transparent 100%
          );
          filter: blur(30px);
          animation: portal-pulse-middle 3s ease-in-out infinite;
        }

        /* Inner glow - SUPER INTENSE core */}
        .portal-glow-inner {
          border-radius: 50%;
          background: radial-gradient(
            circle,
            transparent 40%,
            rgba(147, 51, 234, 1) 48%,
            rgba(255, 107, 0, 1) 50%,
            rgba(147, 51, 234, 1) 52%,
            rgba(59, 130, 246, 0.8) 60%,
            transparent 100%
          );
          filter: blur(15px);
          animation: portal-pulse-inner 2s ease-in-out infinite;
        }

        /* Pulsing animations with different timings */}
        @keyframes portal-pulse-outer {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        @keyframes portal-pulse-middle {
          0%, 100% {
            opacity: 0.9;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) rotate(180deg);
          }
        }

        @keyframes portal-pulse-inner {
          0%, 100% {
            opacity: 0.9;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }
      `}</style>
    </>
  );
};

export default PortalCircle;
