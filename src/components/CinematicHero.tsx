import { useEffect, useRef, useState, useCallback } from 'react';

interface CinematicHeroProps {
  onBeginCurse: () => void;
}

const CinematicHero = ({ onBeginCurse }: CinematicHeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pumpkinRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mouse parallax tracking - optimized with useCallback
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);



  // Volumetric fog + embers canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      type: 'fog' | 'ember';
    }

    const particles: Particle[] = [];

    // Create fog particles - reduced for performance
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 100 + Math.random() * 200,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: 0.02 + Math.random() * 0.03,
        type: 'fog',
      });
    }

    // Create ember particles - optimized count
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        size: 2 + Math.random() * 3,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: -0.5 - Math.random() * 1,
        opacity: 0.5 + Math.random() * 0.5, // Increased from 0.3 to 0.5
        type: 'ember',
      });
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        if (particle.type === 'fog') {
          // Volumetric fog
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size
          );
          gradient.addColorStop(0, `rgba(162, 89, 255, ${particle.opacity})`);
          gradient.addColorStop(0.5, `rgba(80, 40, 120, ${particle.opacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          // Move fog
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Wrap around
          if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
          if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
          if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
          if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
        } else {
          // Embers - brighter colors and optimized rendering
          ctx.globalAlpha = particle.opacity;
          const emberGradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size
          );
          // Brighter orange colors
          emberGradient.addColorStop(0, '#ffaa33');
          emberGradient.addColorStop(0.4, '#ff8533');
          emberGradient.addColorStop(1, 'rgba(255, 140, 50, 0)');

          ctx.fillStyle = emberGradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;

          // Move ember upward
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Reset when off screen - faster respawn
          if (particle.y < -10) {
            particle.y = canvas.height + Math.random() * 50;
            particle.x = Math.random() * canvas.width;
            particle.opacity = 0.5 + Math.random() * 0.5;
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Pumpkin flicker effect
  useEffect(() => {
    const pumpkin = pumpkinRef.current;
    if (!pumpkin) return;

    const flicker = () => {
      const intensity = 0.8 + Math.random() * 0.2;
      pumpkin.style.filter = `brightness(${intensity}) drop-shadow(0 0 40px rgba(255, 107, 0, ${intensity * 0.8}))`;
    };

    const interval = setInterval(flicker, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ background: 'transparent', paddingTop: '60px' }}>
      {/* Haunted Forest Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url(/assets/haunted/backgroundimg.png)',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Volumetric fog canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Ghosts handled by HauntedLayerSystem - removed duplicates */}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: 3D Realistic Pumpkin */}
        <div
          className={`flex justify-center lg:justify-start transition-all duration-1500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${mousePos.y * -3}deg)`,
            transition: 'transform 0.3s ease-out, opacity 1.5s ease-out',
          }}
        >
          <div ref={pumpkinRef} className="relative w-80 h-80 lg:w-96 lg:h-96">
            {/* Real Pumpkin Image */}
            <img 
              src="/assets/haunted/pumpkin.png" 
              alt="Haunted Pumpkin" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
            {/* Backup SVG - hidden */}
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl hidden">
              <defs>
                <radialGradient id="pumpkinLight" cx="50%" cy="40%">
                  <stop offset="0%" stopColor="#ff8533" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#ff6b00" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#cc5500" stopOpacity="0.9" />
                </radialGradient>
                <radialGradient id="innerGlow" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#ffaa00" stopOpacity="1" />
                  <stop offset="50%" stopColor="#ff6b00" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
                <filter id="shadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                  <feOffset dx="0" dy="8" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.5" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Shadow */}
              <ellipse cx="100" cy="185" rx="60" ry="8" fill="rgba(0,0,0,0.6)" filter="blur(4px)" />

              {/* Pumpkin body with realistic shading */}
              <ellipse cx="100" cy="110" rx="80" ry="70" fill="url(#pumpkinLight)" filter="url(#shadow)" />
              
              {/* Segments with depth */}
              <ellipse cx="70" cy="110" rx="22" ry="65" fill="#ff8533" opacity="0.6" />
              <ellipse cx="100" cy="110" rx="24" ry="68" fill="#ff9944" opacity="0.5" />
              <ellipse cx="130" cy="110" rx="22" ry="65" fill="#ff8533" opacity="0.6" />
              
              {/* Highlights */}
              <ellipse cx="85" cy="90" rx="15" ry="20" fill="rgba(255,200,100,0.3)" />
              <ellipse cx="115" cy="95" rx="12" ry="18" fill="rgba(255,200,100,0.2)" />

              {/* Stem with texture */}
              <path d="M 95 35 Q 95 30 98 28 L 102 28 Q 105 30 105 35 L 103 50 Q 103 52 100 52 Q 97 52 97 50 Z" fill="#2d5016" />
              <path d="M 97 35 L 97 48 Q 97 50 98 50 L 98 35" fill="#3d6020" opacity="0.6" />

              {/* Carved eyes - glowing */}
              <path d="M 60 85 L 75 80 L 75 100 L 60 95 Z" fill="#000000" />
              <path d="M 60 85 L 75 80 L 75 100 L 60 95 Z" fill="url(#innerGlow)" opacity="0.8" />
              
              <path d="M 125 80 L 140 85 L 140 95 L 125 100 Z" fill="#000000" />
              <path d="M 125 80 L 140 85 L 140 95 L 125 100 Z" fill="url(#innerGlow)" opacity="0.8" />

              {/* Carved nose */}
              <path d="M 100 100 L 95 115 L 105 115 Z" fill="#000000" />
              <path d="M 100 100 L 95 115 L 105 115 Z" fill="url(#innerGlow)" opacity="0.7" />

              {/* Carved mouth - sinister grin */}
              <path d="M 60 130 Q 70 145 80 148 Q 90 150 100 150 Q 110 150 120 148 Q 130 145 140 130 L 135 132 Q 125 142 115 144 Q 105 145 100 145 Q 95 145 85 144 Q 75 142 65 132 Z" fill="#000000" />
              <path d="M 60 130 Q 70 145 80 148 Q 90 150 100 150 Q 110 150 120 148 Q 130 145 140 130" fill="url(#innerGlow)" opacity="0.9" />
              
              {/* Teeth */}
              <rect x="75" y="130" width="6" height="10" fill="#000000" />
              <rect x="90" y="130" width="6" height="10" fill="#000000" />
              <rect x="104" y="130" width="6" height="10" fill="#000000" />
              <rect x="119" y="130" width="6" height="10" fill="#000000" />
            </svg>

            {/* Animated glow */}
            <div className="absolute inset-0 animate-pulse-glow">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>

        {/* Right: Cinematic Text */}
        <div
          className={`space-y-8 transition-all duration-2000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          {/* Title - Stranger Things Style with 3D Effect */}
          <div className="relative max-w-[90%] mx-auto lg:mx-0">
            <h1 className="stranger-title text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight">
              <span className="title-word">SUMMO
                <span className="relative inline-block blood-source">
                  N
                  {/* Blood Drop Image Animation */}
                  <img 
                    src="/Blood drop.png" 
                    alt="" 
                    className="blood-drop-image"
                  />
                </span>
              </span>
              <br />
              <span className="title-word">YOUR</span>
              <br />
              <span className="title-word cursed-word">CURSED</span>
              <br />
              <span className="title-word">COSTUM
                <span className="relative inline-block blood-target">E</span>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="cinematic-subtitle text-xl lg:text-2xl">
            Haunted by AI. <span className="text-purple-400">Forged in darkness.</span>
          </p>

          {/* Premium Button */}
          <button
            onClick={onBeginCurse}
            className="premium-button group relative px-12 py-5 pb-6 text-xl font-semibold overflow-visible"
            style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          >
            <span className="relative z-10">Begin Your Curse</span>
            <div className="absolute inset-0 border-2 border-orange-500 rounded-sm group-hover:border-orange-400 transition-colors" />
            <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300" />
            <div className="absolute inset-0 shadow-[0_0_20px_rgba(255,107,0,0.3)] group-hover:shadow-[0_0_40px_rgba(255,107,0,0.6)] transition-all duration-300" />
          </button>
        </div>
      </div>



      {/* Cinematic styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap');

        /* Stranger Things 3D Horror Title */
        .stranger-title {
          font-family: 'Cinzel', serif;
          letter-spacing: 0.05em;
          position: relative;
        }

        .title-word {
          display: inline-block;
          color: #ffffff;
          position: relative;
          animation: title-flicker 4s ease-in-out infinite;
          
          /* 3D Depth Effect - Multiple Stacked Shadows */
          text-shadow:
            /* Deep 3D extrusion */
            1px 1px 0 #1a1a1a,
            2px 2px 0 #1a1a1a,
            3px 3px 0 #1a1a1a,
            4px 4px 0 #1a1a1a,
            5px 5px 0 #1a1a1a,
            6px 6px 0 #1a1a1a,
            7px 7px 0 #1a1a1a,
            8px 8px 0 #1a1a1a,
            9px 9px 0 #1a1a1a,
            10px 10px 0 #1a1a1a,
            /* Dark bevel */
            11px 11px 10px rgba(0, 0, 0, 0.8),
            /* Neon inner glow */
            0 0 20px rgba(255, 50, 50, 0.8),
            0 0 40px rgba(255, 50, 50, 0.6),
            0 0 60px rgba(255, 50, 50, 0.4),
            /* Chromatic aberration */
            -2px 0 0 rgba(255, 0, 0, 0.3),
            2px 0 0 rgba(0, 255, 255, 0.3);
        }

        .cursed-word {
          color: #ff3333;
          text-shadow:
            /* 3D depth */
            1px 1px 0 #660000,
            2px 2px 0 #660000,
            3px 3px 0 #660000,
            4px 4px 0 #660000,
            5px 5px 0 #660000,
            6px 6px 0 #660000,
            7px 7px 0 #660000,
            8px 8px 0 #660000,
            9px 9px 0 #660000,
            10px 10px 0 #660000,
            /* Dark bevel */
            11px 11px 10px rgba(0, 0, 0, 0.9),
            /* Red neon glow */
            0 0 20px rgba(255, 50, 50, 1),
            0 0 40px rgba(255, 50, 50, 0.8),
            0 0 60px rgba(255, 50, 50, 0.6),
            0 0 80px rgba(255, 50, 50, 0.4),
            /* Chromatic aberration */
            -2px 0 0 rgba(255, 0, 0, 0.5),
            2px 0 0 rgba(255, 100, 0, 0.3);
        }

        /* Neon outline using pseudo-element */
        .cursed-word::before {
          content: 'CURSED';
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 50, 50, 0.6);
          text-stroke: 2px rgba(255, 50, 50, 0.6);
        }

        /* Blood Drop Image Animation */
        .blood-source {
          position: relative;
        }

        .blood-drop-image {
          position: absolute;
          bottom: -10px;
          left: 50%;
          width: 28px;
          height: auto;
          transform: translateX(-50%) translateY(0) scale(1);
          transform-origin: top center;
          animation: blood-drop-fall 8s ease-in infinite;
          opacity: 0;
          filter: drop-shadow(0 3px 6px rgba(139, 0, 0, 0.7));
          z-index: 10;
          pointer-events: none;
          will-change: transform, opacity;
        }

        .blood-target {
          position: relative;
        }

        /* Title Flicker Animation */
        @keyframes title-flicker {
          0%, 100% {
            opacity: 1;
            text-shadow:
              1px 1px 0 #1a1a1a,
              2px 2px 0 #1a1a1a,
              3px 3px 0 #1a1a1a,
              4px 4px 0 #1a1a1a,
              5px 5px 0 #1a1a1a,
              6px 6px 0 #1a1a1a,
              7px 7px 0 #1a1a1a,
              8px 8px 0 #1a1a1a,
              9px 9px 0 #1a1a1a,
              10px 10px 0 #1a1a1a,
              11px 11px 10px rgba(0, 0, 0, 0.8),
              0 0 20px rgba(255, 50, 50, 0.8),
              0 0 40px rgba(255, 50, 50, 0.6),
              0 0 60px rgba(255, 50, 50, 0.4),
              -2px 0 0 rgba(255, 0, 0, 0.3),
              2px 0 0 rgba(0, 255, 255, 0.3);
          }
          2%, 8%, 12% {
            opacity: 0.98;
            text-shadow:
              1px 1px 0 #1a1a1a,
              2px 2px 0 #1a1a1a,
              3px 3px 0 #1a1a1a,
              4px 4px 0 #1a1a1a,
              5px 5px 0 #1a1a1a,
              6px 6px 0 #1a1a1a,
              7px 7px 0 #1a1a1a,
              8px 8px 0 #1a1a1a,
              9px 9px 0 #1a1a1a,
              10px 10px 0 #1a1a1a,
              11px 11px 10px rgba(0, 0, 0, 0.8),
              0 0 25px rgba(255, 50, 50, 0.9),
              0 0 45px rgba(255, 50, 50, 0.7),
              0 0 65px rgba(255, 50, 50, 0.5),
              -2px 0 0 rgba(255, 0, 0, 0.4),
              2px 0 0 rgba(0, 255, 255, 0.4);
          }
        }

        /* Blood Drop Fall Animation - Smooth, subtle, GPU-optimized */
        @keyframes blood-drop-fall {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(0) scale(1);
          }
          5% {
            opacity: 0.95;
            transform: translateX(-50%) translateY(0) scale(1);
          }
          10% {
            opacity: 0.95;
            transform: translateX(-50%) translateY(30px) scale(1.05);
          }
          25% {
            opacity: 0.9;
            transform: translateX(-50%) translateY(120px) scale(1.05);
          }
          40% {
            opacity: 0.85;
            transform: translateX(-50%) translateY(220px) scale(1);
          }
          55% {
            opacity: 0.75;
            transform: translateX(-50%) translateY(320px) scale(0.95);
          }
          70% {
            opacity: 0.6;
            transform: translateX(-50%) translateY(400px) scale(0.9);
          }
          85% {
            opacity: 0.3;
            transform: translateX(-50%) translateY(460px) scale(0.8);
          }
          95% {
            opacity: 0.1;
            transform: translateX(-50%) translateY(490px) scale(0.7);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(500px) scale(0.6);
          }
        }

        .cinematic-subtitle {
          font-family: 'Cinzel', serif;
          color: #8b7fa8;
          text-shadow: 0 0 10px rgba(139, 127, 168, 0.5);
          letter-spacing: 0.05em;
        }

        .premium-button {
          font-family: system-ui, -apple-system, sans-serif;
          color: #ff6b00;
          background: transparent;
          transition: all 0.3s ease;
        }

        .premium-button:hover {
          color: #ff8533;
          transform: scale(1.05);
        }

        @keyframes ghost-fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: inherit;
            transform: translateY(0);
          }
        }

        @keyframes dementor-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes skeleton-sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        .animate-ghost-fade-in {
          animation: ghost-fade-in 2s ease-out forwards;
        }

        .animate-dementor-float {
          animation: dementor-float 12s ease-in-out infinite;
        }

        .animate-skeleton-sway {
          animation: skeleton-sway 8s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CinematicHero;
