import React from 'react';

interface FloatingEmbersProps {
  count?: number;
}

const FloatingEmbers: React.FC<FloatingEmbersProps> = ({ count = 10 }) => {
  return (
    <div className="floating-embers-container">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="ember"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}
        />
      ))}

      <style>{`
        .floating-embers-container {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .ember {
          position: absolute;
          bottom: -20px;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, #ffaa33 0%, #ff6b00 50%, transparent 100%);
          border-radius: 50%;
          animation: emberRise linear infinite;
          opacity: 0;
          box-shadow: 
            0 0 12px #ffaa33,
            0 0 18px #ff8533,
            0 0 24px #ff6b00;
          z-index: 0;
        }

        @keyframes emberRise {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
            transform: translateY(-50vh) translateX(20px) scale(1.2);
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(-30px) scale(0.5);
            opacity: 0;
          }
        }

        /* Add some variation */
        .ember:nth-child(2n) {
          animation-duration: 10s;
          width: 5px;
          height: 5px;
        }

        .ember:nth-child(3n) {
          animation-duration: 9s;
          width: 3px;
          height: 3px;
        }

        .ember:nth-child(5n) {
          box-shadow: 
            0 0 10px #ffa500,
            0 0 15px #ff6347;
        }
      `}</style>
    </div>
  );
};


export default FloatingEmbers;
