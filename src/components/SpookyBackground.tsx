import { useEffect, useRef } from 'react';

interface Ghost {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  phase: number;
}

const SpookyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ghostsRef = useRef<Ghost[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize ghosts
    const initGhosts = () => {
      ghostsRef.current = [];
      const numGhosts = 8;
      for (let i = 0; i < numGhosts; i++) {
        ghostsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 40 + Math.random() * 60,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: 0.1 + Math.random() * 0.2,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };
    initGhosts();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll tracking
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // Draw realistic ghost
    const drawGhost = (ghost: Ghost) => {
      ctx.save();
      ctx.globalAlpha = ghost.opacity;

      // Create ethereal glow
      const gradient = ctx.createRadialGradient(
        ghost.x, ghost.y, 0,
        ghost.x, ghost.y, ghost.size
      );
      gradient.addColorStop(0, 'rgba(205, 214, 244, 0.8)');
      gradient.addColorStop(0.3, 'rgba(162, 89, 255, 0.4)');
      gradient.addColorStop(0.6, 'rgba(162, 89, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(162, 89, 255, 0)');

      // Main ghost body - wispy and ethereal
      ctx.fillStyle = gradient;
      ctx.beginPath();
      
      // Create flowing, organic shape
      const points = 12;
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const wave = Math.sin(ghost.phase + i * 0.5) * 10;
        const radius = ghost.size / 2 + wave;
        const x = ghost.x + Math.cos(angle) * radius;
        const y = ghost.y + Math.sin(angle) * radius * 1.2; // Elongate vertically
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fill();

      // Add wispy trails
      ctx.globalAlpha = ghost.opacity * 0.3;
      for (let i = 0; i < 3; i++) {
        const trailGradient = ctx.createRadialGradient(
          ghost.x + (i - 1) * 15, ghost.y + ghost.size / 2 + i * 20, 0,
          ghost.x + (i - 1) * 15, ghost.y + ghost.size / 2 + i * 20, 30
        );
        trailGradient.addColorStop(0, 'rgba(205, 214, 244, 0.4)');
        trailGradient.addColorStop(1, 'rgba(162, 89, 255, 0)');
        
        ctx.fillStyle = trailGradient;
        ctx.beginPath();
        ctx.arc(ghost.x + (i - 1) * 15, ghost.y + ghost.size / 2 + i * 20, 30, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle inner glow
      ctx.globalAlpha = ghost.opacity * 0.5;
      const innerGlow = ctx.createRadialGradient(
        ghost.x, ghost.y - ghost.size / 4, 0,
        ghost.x, ghost.y - ghost.size / 4, ghost.size / 3
      );
      innerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      innerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = innerGlow;
      ctx.beginPath();
      ctx.arc(ghost.x, ghost.y - ghost.size / 4, ghost.size / 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Draw realistic fog
    const drawFog = () => {
      const time = Date.now() * 0.0001;
      
      for (let i = 0; i < 30; i++) {
        const x = ((i * 150 + scrollRef.current * 0.05 + time * 20) % (canvas.width + 200)) - 100;
        const y = ((i * 80 + scrollRef.current * 0.02) % (canvas.height + 100)) - 50;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 120);
        gradient.addColorStop(0, 'rgba(162, 89, 255, 0.03)');
        gradient.addColorStop(0.5, 'rgba(162, 89, 255, 0.015)');
        gradient.addColorStop(1, 'rgba(162, 89, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 120, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw fog
      drawFog();

      // Update and draw ghosts
      ghostsRef.current.forEach((ghost) => {
        // Mouse interaction
        const dx = mouseRef.current.x - ghost.x;
        const dy = mouseRef.current.y - ghost.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          ghost.x -= dx * 0.001;
          ghost.y -= dy * 0.001;
        }

        // Normal movement
        ghost.x += ghost.speedX;
        ghost.y += ghost.speedY + Math.sin(ghost.phase) * 0.2;
        ghost.phase += 0.02;

        // Parallax with scroll
        ghost.y -= scrollRef.current * 0.0001;

        // Wrap around
        if (ghost.x < -ghost.size) ghost.x = canvas.width + ghost.size;
        if (ghost.x > canvas.width + ghost.size) ghost.x = -ghost.size;
        if (ghost.y < -ghost.size) ghost.y = canvas.height + ghost.size;
        if (ghost.y > canvas.height + ghost.size) ghost.y = -ghost.size;

        drawGhost(ghost);
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default SpookyBackground;
