import { useEffect, useRef } from 'react';

interface HauntedBackgroundProps {
  page?: 'hero' | 'create' | 'collection' | 'cart';
}

const HauntedBackground = ({ page = 'hero' }: HauntedBackgroundProps) => {
  const scrollY = useRef(0);

  useEffect(() => {
    // Log asset paths for debugging
    console.log('🎃 Loading haunted assets for page:', page);
    console.log('📁 Asset paths:');
    console.log('  - Background:', '/assets/haunted/backgroundimg.png');
    console.log('  - Fog 1:', '/assets/haunted/IntroFog.png');
    console.log('  - Fog 2:', '/assets/haunted/fogandSoul.png');
    console.log('  - Fog 3:', '/assets/haunted/ghostfog.png');
    console.log('  - Ghost1:', '/assets/haunted/Ghost1.png');
    console.log('  - Dementor:', '/assets/haunted/dementor1.png');
    console.log('  - Skeleton:', '/assets/haunted/skeleton1.png');

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      {/* Haunted Forest Background - Fixed */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/haunted/backgroundimg.png)',
          backgroundAttachment: 'fixed',
          opacity: 0.5,
          zIndex: -5,
        }}
        onError={(e) => console.error('❌ Failed to load background:', e)}
      />

      {/* Back Fog Layer - Slowest */}
      <div
        className="absolute inset-0 animate-fog-drift-slow"
        style={{
          backgroundImage: 'url(/assets/haunted/IntroFog.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.6,
          zIndex: -3,
        }}
      />

      {/* Mid Fog Layer - Medium Speed */}
      <div
        className="absolute inset-0 animate-fog-drift-medium"
        style={{
          backgroundImage: 'url(/assets/haunted/fogandSoul.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
          zIndex: -1,
        }}
      />

      {/* Front Fog Layer - Fastest */}
      <div
        className="absolute inset-0 animate-fog-drift-fast"
        style={{
          backgroundImage: 'url(/assets/haunted/ghostfog.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
          zIndex: 3,
        }}
      />

      {/* Floating Ghosts - Different per page */}
      {page === 'hero' && (
        <>
          {/* Ghost 1 - Left side */}
          <div
            className="absolute top-1/4 left-1/4 w-64 h-96 animate-ghost-float-slow ghost-parallax"
            style={{
              backgroundImage: 'url(/assets/haunted/Ghost1.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              opacity: 0.25,
              zIndex: 0,
            }}
          />

          {/* Ghost Fog - Right side */}
          <div
            className="absolute top-1/3 right-1/4 w-80 h-80 animate-ghost-float-medium ghost-parallax"
            style={{
              backgroundImage: 'url(/assets/haunted/ghostfog.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              opacity: 0.2,
              zIndex: 0,
            }}
          />

          {/* Dementor - Far left */}
          <div
            className="absolute top-1/2 left-10 w-48 h-96 animate-dementor-float"
            style={{
              backgroundImage: 'url(/assets/haunted/dementor1.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              opacity: 0.15,
              zIndex: 1,
            }}
          />

          {/* Skeleton - Background */}
          <div
            className="absolute bottom-20 right-20 w-40 h-64 animate-skeleton-sway"
            style={{
              backgroundImage: 'url(/assets/haunted/skeleton1.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              opacity: 0.1,
              zIndex: 0,
            }}
          />
        </>
      )}

      {page === 'create' && (
        <>
          {/* Ghost Fog behind T-shirt */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-8 animate-ghost-float-slow"
            style={{
              backgroundImage: 'url(/assets/haunted/ghostfog.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />

          {/* Dementor - Top area */}
          <div
            className="absolute top-20 right-1/4 w-56 h-80 opacity-7 animate-dementor-drift"
            style={{
              backgroundImage: 'url(/assets/haunted/dementor1.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />

          {/* Skeleton silhouette */}
          <div
            className="absolute bottom-20 left-10 w-40 h-64 opacity-5 animate-skeleton-sway"
            style={{
              backgroundImage: 'url(/assets/haunted/skeleton1.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
        </>
      )}

      {page === 'collection' && (
        <>
          {/* Floating ghosts behind grid */}
          <div
            className="absolute top-1/4 left-1/3 w-48 h-72 opacity-6 animate-ghost-float-medium"
            style={{
              backgroundImage: 'url(/assets/haunted/Ghost1.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />

          <div
            className="absolute top-2/3 right-1/4 w-56 h-80 opacity-5 animate-ghost-float-slow"
            style={{
              backgroundImage: 'url(/assets/haunted/ghostfog.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />

          {/* Dementor shadow */}
          <div
            className="absolute top-1/2 left-10 w-40 h-60 opacity-4 animate-ghost-float-fast"
            style={{
              backgroundImage: 'url(/assets/haunted/dementor1.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
        </>
      )}

      {page === 'cart' && (
        <>
          {/* Single ghost behind cart */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-96 opacity-8 animate-ghost-float-slow"
            style={{
              backgroundImage: 'url(/assets/haunted/Ghost1.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
        </>
      )}

      {/* Purple/Orange Ambiance Lighting */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-transparent to-orange-900/5" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.7)_100%)]" />

      {/* Animations */}
      <style>{`
        @keyframes fog-drift-slow {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-100px) translateY(-20px); }
        }
        @keyframes fog-drift-medium {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-150px) translateY(-30px); }
        }
        @keyframes fog-drift-fast {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-200px) translateY(-40px); }
        }
        @keyframes ghost-float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(15px); }
        }
        @keyframes ghost-float-medium {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-25px) translateX(-15px); }
        }
        @keyframes ghost-float-fast {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-35px) translateX(20px); }
        }
        @keyframes dementor-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes skeleton-sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        .animate-fog-drift-slow { animation: fog-drift-slow 40s linear infinite; }
        .animate-fog-drift-medium { animation: fog-drift-medium 30s linear infinite; }
        .animate-fog-drift-fast { animation: fog-drift-fast 20s linear infinite; }
        .animate-ghost-float-slow { animation: ghost-float-slow 20s ease-in-out infinite; }
        .animate-ghost-float-medium { animation: ghost-float-medium 15s ease-in-out infinite; }
        .animate-ghost-float-fast { animation: ghost-float-fast 10s ease-in-out infinite; }
        .animate-dementor-float { animation: dementor-float 12s ease-in-out infinite; }
        .animate-skeleton-sway { animation: skeleton-sway 8s ease-in-out infinite; }

        .opacity-3 { opacity: 0.03; }
        .opacity-4 { opacity: 0.04; }
        .opacity-5 { opacity: 0.05; }
        .opacity-6 { opacity: 0.06; }
        .opacity-7 { opacity: 0.07; }
        .opacity-8 { opacity: 0.08; }
        .opacity-15 { opacity: 0.15; }
      `}</style>
    </div>
  );
};

export default HauntedBackground;
