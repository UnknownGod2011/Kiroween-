import { useEffect, useRef } from 'react';

const SplashCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let cursorInstance: any = null;

    // Import and initialize the splash cursor
    import('@ar-dacity/ardacity-splash-cursor')
      .then((module: any) => {
        const SplashCursorLib = module.default || module;
        
        if (SplashCursorLib && canvasRef.current) {
          try {
            // Initialize the cursor effect
            cursorInstance = SplashCursorLib(canvasRef.current, {
              color: '#8b5cf6', // Purple color matching your theme
              size: 1.0,
              trail: true,
            });
          } catch (error) {
            console.error('Failed to initialize SplashCursor:', error);
          }
        }
      })
      .catch((error) => {
        console.error('Failed to load SplashCursor:', error);
      });

    return () => {
      if (cursorInstance && typeof cursorInstance.destroy === 'function') {
        cursorInstance.destroy();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default SplashCursor;
