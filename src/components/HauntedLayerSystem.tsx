import React, { useEffect, useState } from 'react';

interface HauntedLayerSystemProps {
  page: 'hero' | 'create' | 'collection' | 'cart' | 'spooky-images';
}

const HauntedLayerSystem = ({ page }: HauntedLayerSystemProps) => {
  const [ghostVisible, setGhostVisible] = useState(true);

  // Simplified ghost fade cycle - 10s interval
  useEffect(() => {
    const interval = setInterval(() => {
      setGhostVisible(prev => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -10 }}>
      {/* Background - Haunted Forest */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/assets/haunted/backgroundimg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.25,
          zIndex: -5,
          willChange: 'opacity',
        }}
      />

      {/* Back Fog Layer - Reduced opacity for better text contrast */}
      <div
        className="absolute inset-0 fog-drift-slow"
        style={{
          backgroundImage: 'url(/assets/haunted/IntroFog.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.24,
          zIndex: -3,
          willChange: 'transform',
        }}
      />

      {/* Front Fog Layer - Reduced opacity for better text contrast */}
      <div
        className="absolute inset-0 fog-drift-fast"
        style={{
          backgroundImage: 'url(/assets/haunted/ghostfog.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
          zIndex: 2,
          willChange: 'transform',
        }}
      />

      {/* Ghosts - MAX 1 per page */}
      {page === 'hero' && (
        <div
          className={`absolute top-1/4 left-1/4 w-40 h-60 ghost-float transition-opacity duration-1000 ${
            ghostVisible ? 'opacity-25' : 'opacity-0'
          }`}
          style={{
            backgroundImage: 'url(/assets/haunted/Ghost1.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            zIndex: 0,
            willChange: 'opacity, transform',
          }}
        />
      )}

      {page === 'create' && (
        <>
          <div
            className={`absolute top-1/2 right-1/4 w-48 h-64 ghost-float transition-opacity duration-1000 ${
              ghostVisible ? 'opacity-20' : 'opacity-0'
            }`}
            style={{
              backgroundImage: 'url(/assets/haunted/Dementor.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              zIndex: 0,
              willChange: 'opacity, transform',
            }}
          />
          <div
            className={`absolute bottom-1/4 left-1/6 w-56 h-72 ghost-float-slow transition-opacity duration-1000 ${
              ghostVisible ? 'opacity-0' : 'opacity-25'
            }`}
            style={{
              backgroundImage: 'url(/assets/haunted/skeleton1.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              zIndex: 0,
              willChange: 'opacity, transform',
            }}
          />
        </>
      )}

      {page === 'collection' && (
        <div
          className={`absolute top-1/3 left-1/3 w-40 h-60 ghost-float transition-opacity duration-1000 ${
            ghostVisible ? 'opacity-30' : 'opacity-0'
          }`}
          style={{
            backgroundImage: 'url(/assets/haunted/fogandSoul.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            zIndex: 0,
            willChange: 'opacity, transform',
          }}
        />
      )}

      {page === 'cart' && (
        <div
          className={`absolute top-1/4 right-1/3 w-44 h-64 ghost-float transition-opacity duration-1000 ${
            ghostVisible ? 'opacity-28' : 'opacity-0'
          }`}
          style={{
            backgroundImage: 'url(/assets/haunted/dementor1.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            zIndex: 0,
            willChange: 'opacity, transform',
          }}
        />
      )}

      {page === 'spooky-images' && (
        <div
          className={`absolute top-1/3 left-1/3 w-40 h-60 ghost-float transition-opacity duration-1000 ${
            ghostVisible ? 'opacity-22' : 'opacity-0'
          }`}
          style={{
            backgroundImage: 'url(/assets/haunted/Ghost1.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            zIndex: 0,
            willChange: 'opacity, transform',
          }}
        />
      )}

      {/* Optimized CSS Animations - Hardware Accelerated */}
      <style>{`
        /* Simplified fog animations - CSS only */
        @keyframes fog-drift-slow {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-40px, 0, 0); }
        }
        @keyframes fog-drift-fast {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-25px, 0, 0); }
        }
        @keyframes ghost-float {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -12px, 0); }
        }

        @keyframes ghost-float-slow {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -20px, 0); }
        }

        @keyframes skeleton-sway {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-2deg); }
          50% { transform: translate3d(0, -8px, 0) rotate(2deg); }
        }

        .fog-drift-slow { animation: fog-drift-slow 70s linear infinite; }
        .fog-drift-fast { animation: fog-drift-fast 50s linear infinite; }
        .ghost-float { animation: ghost-float 12s ease-in-out infinite; }
        .ghost-float-slow { animation: ghost-float-slow 15s ease-in-out infinite; }
        .skeleton-sway { animation: skeleton-sway 10s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default React.memo(HauntedLayerSystem);
