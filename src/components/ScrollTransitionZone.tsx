import React, { useEffect, useRef, useState } from 'react';

const ScrollTransitionZone: React.FC = () => {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [triggered20, setTriggered20] = useState(false);
  const [triggered40, setTriggered40] = useState(false);
  const [triggered60, setTriggered60] = useState(false);

  useEffect(() => {
    if (!zoneRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent >= 20 && !triggered20) {
              setTriggered20(true);
            }
            if (scrollPercent >= 40 && !triggered40) {
              setTriggered40(true);
            }
            if (scrollPercent >= 60 && !triggered60) {
              setTriggered60(true);
            }
          }
        });
      },
      { threshold: [0.1, 0.3, 0.5, 0.7] }
    );

    observer.observe(zoneRef.current);

    return () => observer.disconnect();
  }, [triggered20, triggered40, triggered60]);

  return (
    <div ref={zoneRef} className="scroll-transition-zone">
      {/* Floating Ghosts near Death */}
      <div className="floating-ghost-left" />
      <div className="floating-ghost-right" />
      <div className="floating-dementor-center" />
      
      {/* BonesSkeleton - Below dementor on right */}
      <div className="floating-bones-skeleton" />
      
      {/* Death Image with Ghost Speech Bubble - Centered */}
      <div className="death-section">
        <img
          src="/assets/haunted/death.png"
          alt=""
          className="death-image"
        />
        <div className="ghost-speech-bubble">
          <p>You are almost there… descend into darkness…</p>
        </div>
      </div>
      
      {/* 20% Ghost */}
      {triggered20 && (
        <img
          src="/assets/ghost1.png"
          alt=""
          className="scroll-ghost-20"
        />
      )}

      {/* 40% Bat swarm */}
      {triggered40 && (
        <div className="scroll-bat-swarm">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="scroll-bat"
              style={{
                left: `${20 + i * 8}%`,
                animationDelay: `${i * 0.15}s`
              }}
            >
              🦇
            </div>
          ))}
        </div>
      )}

      {/* 60% Skeleton silhouette */}
      {triggered60 && (
        <img
          src="/assets/skeleton.png"
          alt=""
          className="scroll-skeleton"
        />
      )}

      <style>{`
        .scroll-transition-zone {
          position: relative;
          width: 100%;
          height: 800px;
          overflow: visible;
          margin-top: -100px;
        }

        /* Floating Ghosts near Death Image */
        .floating-ghost-left {
          position: absolute;
          top: 20%;
          left: 10%;
          width: 120px;
          height: 160px;
          background-image: url('/assets/haunted/Ghost1.png');
          background-size: contain;
          background-repeat: no-repeat;
          opacity: 0.7;
          pointer-events: none;
          z-index: 2;
          filter: drop-shadow(0 0 20px rgba(147, 51, 234, 0.5));
          animation: ghostFloatLeft 6s ease-in-out infinite;
        }

        .floating-ghost-right {
          position: absolute;
          top: 25%;
          right: 12%;
          width: 160px;
          height: 210px;
          background-image: url('/assets/haunted/Dementor.png');
          background-size: contain;
          background-repeat: no-repeat;
          opacity: 0.75;
          pointer-events: none;
          z-index: 2;
          filter: drop-shadow(0 0 25px rgba(147, 51, 234, 0.6));
          animation: ghostFloatRight 7s ease-in-out infinite;
        }

        .floating-dementor-center {
          position: absolute;
          top: 60%;
          left: 15%;
          width: 150px;
          height: 200px;
          background-image: url('/assets/haunted/dementor1.png');
          background-size: contain;
          background-repeat: no-repeat;
          opacity: 0.8;
          pointer-events: none;
          z-index: 2;
          filter: drop-shadow(0 0 25px rgba(147, 51, 234, 0.6));
          animation: dementorFloat 8s ease-in-out infinite;
        }

        @keyframes ghostFloatLeft {
          0%, 100% { 
            transform: translateY(0);
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-25px);
            opacity: 1;
          }
        }

        @keyframes ghostFloatRight {
          0%, 100% { 
            transform: translateY(0);
            opacity: 0.75;
          }
          50% { 
            transform: translateY(-30px);
            opacity: 0.9;
          }
        }

        @keyframes dementorFloat {
          0%, 100% { 
            transform: translateY(0);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-20px);
            opacity: 0.7;
          }
        }

        .floating-bones-skeleton {
          position: absolute;
          top: 70%;
          right: 8%;
          width: 180px;
          height: 240px;
          background-image: url('/assets/haunted/BonesSkeleton.png');
          background-size: contain;
          background-repeat: no-repeat;
          opacity: 0.6;
          pointer-events: none;
          z-index: 5;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
          animation: skeletonSway 10s ease-in-out infinite;
        }

        @keyframes skeletonSway {
          0%, 100% { 
            transform: translateY(0) rotate(-2deg);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-15px) rotate(2deg);
            opacity: 0.7;
          }
        }

        /* Death Section - Centered with Speech Bubble */
        .death-section {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          opacity: 0;
          animation: deathFadeIn 1s ease-out 0.5s forwards;
          z-index: 3;
        }

        .death-image {
          width: 300px;
          height: auto;
          opacity: 0.3;
          filter: drop-shadow(0 0 20px rgba(147, 51, 234, 0.5));
          animation: deathFloat 4s ease-in-out infinite;
        }

        .ghost-speech-bubble {
          position: relative;
          background: rgba(20, 10, 30, 0.95);
          border: 2px solid rgba(147, 51, 234, 0.6);
          border-radius: 20px;
          padding: 16px 24px;
          max-width: 350px;
          text-align: center;
          box-shadow: 0 0 30px rgba(147, 51, 234, 0.4);
          animation: bubbleFadeIn 1s ease-out 1s forwards;
          opacity: 0;
        }

        .ghost-speech-bubble::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid rgba(147, 51, 234, 0.6);
        }

        .ghost-speech-bubble p {
          margin: 0;
          color: #a78bfa;
          font-size: 16px;
          font-weight: 600;
          text-shadow: 0 0 10px rgba(167, 139, 250, 0.5);
        }

        @keyframes deathFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        @keyframes deathFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes bubbleFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .scroll-ghost-20 {
          position: absolute;
          top: 20%;
          left: -200px;
          width: 120px;
          height: auto;
          opacity: 0;
          pointer-events: none;
          z-index: 1;
          filter: drop-shadow(0 0 20px rgba(147, 51, 234, 0.6));
          animation: ghostDrift 8s linear forwards;
        }

        @keyframes ghostDrift {
          0% {
            left: -200px;
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            left: calc(100% + 200px);
            opacity: 0;
          }
        }

        .scroll-bat-swarm {
          position: absolute;
          top: 40%;
          width: 100%;
          height: 100px;
          pointer-events: none;
          z-index: 2;
        }

        .scroll-bat {
          position: absolute;
          font-size: 24px;
          opacity: 0;
          animation: batFlyUp 3s ease-out forwards;
          filter: drop-shadow(0 0 8px rgba(255, 140, 0, 0.6));
        }

        @keyframes batFlyUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-400px) translateX(200px) rotate(25deg);
            opacity: 0;
          }
        }

        .scroll-skeleton {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translateX(-50%);
          width: 300px;
          height: auto;
          opacity: 0;
          pointer-events: none;
          z-index: 0;
          filter: blur(2px);
          animation: skeletonPhase 4s ease-in-out forwards;
        }

        @keyframes skeletonPhase {
          0% {
            opacity: 0;
            transform: translateX(-50%) scale(0.8);
          }
          25% {
            opacity: 0.03;
            transform: translateX(-50%) scale(1);
          }
          75% {
            opacity: 0.03;
            transform: translateX(-50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollTransitionZone;
