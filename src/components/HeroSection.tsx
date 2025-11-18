import { useEffect, useRef } from 'react';

interface HeroSectionProps {
  onBeginCurse: () => void;
}

const HeroSection = ({ onBeginCurse }: HeroSectionProps) => {
  const pumpkinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pumpkin flickering animation
    const pumpkin = pumpkinRef.current;
    if (!pumpkin) return;

    const flicker = () => {
      const intensity = 0.7 + Math.random() * 0.3;
      pumpkin.style.filter = `brightness(${intensity}) drop-shadow(0 0 30px rgba(255, 107, 0, ${intensity}))`;
    };

    const interval = setInterval(flicker, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fog overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-black/50 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: 3D Pumpkin */}
        <div className="flex justify-center lg:justify-start">
          <div
            ref={pumpkinRef}
            className="relative w-64 h-64 lg:w-96 lg:h-96 animate-float"
          >
            {/* Pumpkin SVG */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Pumpkin body */}
              <ellipse cx="100" cy="110" rx="80" ry="70" fill="#ff6b00" />
              <ellipse cx="70" cy="110" rx="25" ry="65" fill="#ff8533" />
              <ellipse cx="100" cy="110" rx="25" ry="68" fill="#ff8533" />
              <ellipse cx="130" cy="110" rx="25" ry="65" fill="#ff8533" />
              
              {/* Stem */}
              <rect x="95" y="35" width="10" height="20" fill="#2d5016" rx="2" />
              
              {/* Left eye */}
              <polygon points="60,90 75,85 75,105 60,100" fill="#000" />
              
              {/* Right eye */}
              <polygon points="125,85 140,90 140,100 125,105" fill="#000" />
              
              {/* Nose */}
              <polygon points="100,100 95,115 105,115" fill="#000" />
              
              {/* Mouth */}
              <path d="M 60 130 Q 100 150 140 130 L 135 135 Q 100 145 65 135 Z" fill="#000" />
              
              {/* Inner glow */}
              <ellipse cx="100" cy="110" rx="70" ry="60" fill="url(#pumpkinGlow)" opacity="0.6" />
              
              <defs>
                <radialGradient id="pumpkinGlow">
                  <stop offset="0%" stopColor="#ffaa00" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ff6b00" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
            
            {/* Glowing light rays */}
            <div className="absolute inset-0 animate-pulse-slow">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange-500/30 rounded-full blur-3xl" />
            </div>
          </div>
        </div>

        {/* Right: Hero Text */}
        <div className="text-center lg:text-left space-y-8">
          <h1 className="text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 animate-gradient leading-tight">
            Summon Your Cursed Costume
          </h1>
          
          <p className="text-2xl lg:text-3xl text-purple-300 font-light tracking-wide">
            Haunted by AI. <span className="text-orange-400">Forged in darkness.</span>
          </p>
          
          <button
            onClick={onBeginCurse}
            className="group relative px-12 py-5 text-2xl font-bold text-black bg-gradient-to-r from-orange-500 to-orange-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,107,0,0.8)] animate-pulse-glow"
          >
            <span className="relative z-10">Begin Your Curse</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Floating bats */}
          <div className="hidden lg:block absolute top-20 right-20 text-6xl animate-bat-fly opacity-30">
            🦇
          </div>
          <div className="hidden lg:block absolute bottom-40 right-40 text-4xl animate-bat-fly-delayed opacity-20">
            🦇
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="text-orange-400 text-sm flex flex-col items-center gap-2">
          <span>Scroll to descend</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 0, 0.5); }
          50% { box-shadow: 0 0 40px rgba(255, 107, 0, 0.8); }
        }
        @keyframes bat-fly {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(50px) translateY(-20px); }
          50% { transform: translateX(100px) translateY(0); }
          75% { transform: translateX(50px) translateY(20px); }
          100% { transform: translateX(0) translateY(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-bat-fly { animation: bat-fly 15s ease-in-out infinite; }
        .animate-bat-fly-delayed { animation: bat-fly 20s ease-in-out infinite 5s; }
      `}</style>
    </section>
  );
};

export default HeroSection;
