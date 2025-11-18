import { useEffect, useState } from 'react';

const ScrollEffects = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showJumpScare, setShowJumpScare] = useState(false);
  const [showBatFlock, setShowBatFlock] = useState(false);
  const [batFlockTriggered, setBatFlockTriggered] = useState(false);
  const [jumpScareTriggered, setJumpScareTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Bat flock at 200px scroll
      if (currentScrollY > 200 && !batFlockTriggered) {
        setShowBatFlock(true);
        setBatFlockTriggered(true);
        setTimeout(() => setShowBatFlock(false), 3000);
      }

      // Jump scare at 40% of page height
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (currentScrollY / pageHeight) * 100;
      
      if (scrollPercent > 40 && scrollPercent < 45 && !jumpScareTriggered) {
        setShowJumpScare(true);
        setJumpScareTriggered(true);
        setTimeout(() => setShowJumpScare(false), 200);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [batFlockTriggered, jumpScareTriggered]);

  return (
    <>
      {/* Bat Flock - Only 5-7 bats */}
      {showBatFlock && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bat-flock"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${50 + Math.random() * 20}%`,
                animationDelay: `${i * 0.15}s`,
              }}
            >
              <div
                className="w-10 h-10"
                style={{
                  backgroundImage: 'url(/assets/haunted/Ghost1.png)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  filter: 'brightness(0.2)',
                  opacity: 0.5,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Jump Scare Ghost */}
      {showJumpScare && (
        <div 
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          style={{
            animation: 'jump-scare 0.2s ease-out',
          }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: 'url(/assets/haunted/ghostfog.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.4,
            }}
          />
        </div>
      )}

      {/* Soul Faces - Fade in/out at bottom */}
      {scrollY > 800 && (
        <div className="fixed bottom-20 left-1/4 w-32 h-32 pointer-events-none animate-soul-fade"
          style={{
            backgroundImage: 'url(/assets/haunted/fogandSoul.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            opacity: 0.05,
            zIndex: 2,
          }}
        />
      )}

      <style>{`
        @keyframes bat-flock {
          0% {
            transform: translateX(0) translateY(0) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 0.4;
          }
          100% {
            transform: translateX(200px) translateY(-300px) scale(1);
            opacity: 0;
          }
        }

        @keyframes jump-scare {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }

        @keyframes soul-fade {
          0%, 100% {
            opacity: 0.03;
          }
          50% {
            opacity: 0.07;
          }
        }

        .animate-bat-flock {
          animation: bat-flock 3s ease-out forwards;
        }

        .animate-soul-fade {
          animation: soul-fade 6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default ScrollEffects;
