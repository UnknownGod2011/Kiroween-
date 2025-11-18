import React, { useEffect, useState } from 'react';

const GuideGhost: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [hasShown, setHasShown] = useState(false);

  const messages = [
    "Welcome traveler… You've reached the Cursed Fabric Forge.",
    "Describe your haunted vision in the prompt box below.",
    "Be patient… dark magic takes a moment to conjure your T-shirt."
  ];

  useEffect(() => {
    // Only show once per session
    const shown = sessionStorage.getItem('guideGhostShown');
    if (shown) {
      setHasShown(true);
      return;
    }

    sessionStorage.setItem('guideGhostShown', 'true');

    // Message sequence
    const timer1 = setTimeout(() => setCurrentMessage(1), 3000);
    const timer2 = setTimeout(() => setCurrentMessage(2), 6000);
    const timer3 = setTimeout(() => setCurrentMessage(-1), 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (hasShown || currentMessage === -1) return null;

  return (
    <div className="guide-ghost-container">
      <img
        src="/assets/ghost1.png"
        alt=""
        className="guide-ghost"
      />
      
      {currentMessage >= 0 && (
        <div className="speech-bubble">
          <div className="bubble-content">
            {messages[currentMessage]}
          </div>
          <div className="bubble-tail" />
        </div>
      )}

      <style>{`
        .guide-ghost-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 40px auto;
          max-width: 800px;
          pointer-events: none;
        }

        .guide-ghost {
          width: 150px;
          height: auto;
          animation: ghostFloat 4s ease-in-out infinite;
          filter: drop-shadow(0 0 30px rgba(147, 51, 234, 0.8));
          opacity: 0.9;
        }

        @keyframes ghostFloat {
          0%, 100% {
            transform: translateY(0px) rotate(-2deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }

        .speech-bubble {
          position: absolute;
          left: 200px;
          top: 20px;
          background: linear-gradient(135deg, rgba(20, 10, 30, 0.95), rgba(40, 20, 50, 0.95));
          border: 2px solid rgba(147, 51, 234, 0.6);
          border-radius: 20px;
          padding: 20px 30px;
          max-width: 400px;
          box-shadow: 
            0 0 30px rgba(147, 51, 234, 0.4),
            inset 0 0 20px rgba(147, 51, 234, 0.1);
          animation: bubbleFadeIn 0.5s ease-out;
          pointer-events: auto;
        }

        .bubble-content {
          color: #e0d0ff;
          font-size: 16px;
          line-height: 1.6;
          font-family: 'Creepster', cursive;
          text-shadow: 0 0 10px rgba(147, 51, 234, 0.5);
        }

        .bubble-tail {
          position: absolute;
          left: -15px;
          top: 30px;
          width: 0;
          height: 0;
          border-top: 15px solid transparent;
          border-bottom: 15px solid transparent;
          border-right: 15px solid rgba(147, 51, 234, 0.6);
          filter: drop-shadow(-2px 0 8px rgba(147, 51, 234, 0.3));
        }

        @keyframes bubbleFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (max-width: 768px) {
          .guide-ghost-container {
            flex-direction: column;
          }

          .speech-bubble {
            position: relative;
            left: 0;
            top: 20px;
            max-width: 90%;
          }

          .bubble-tail {
            left: 50%;
            top: -15px;
            transform: translateX(-50%) rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
};


export default GuideGhost;
