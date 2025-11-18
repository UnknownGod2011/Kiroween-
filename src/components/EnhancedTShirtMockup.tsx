import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface EnhancedTShirtMockupProps {
  color: string;
  designFront?: string;
  designBack?: string;
  activeSide: 'front' | 'back';
  onSideChange: (side: 'front' | 'back') => void;
  material: string;
  size: string;
}

const EnhancedTShirtMockup: React.FC<EnhancedTShirtMockupProps> = ({
  color,
  designFront,
  designBack,
  activeSide,
  onSideChange,
  material,
  size,
}) => {
  const getSizeScaleValue = () => {
    switch (size) {
      case "XS": return 1.35;
      case "S": return 1.62;
      case "M": return 1.8;
      case "L": return 1.98;
      case "XL": return 2.25;
      case "XXL": return 2.52;
      case "3XL": return 2.7;
      default: return 1.8;
    }
  };

  const getBackprintAdjustment = () => {
    // Reduce backprint by 10% (0.9x)
    return activeSide === 'back' ? 0.9 : 1.0;
  };

  const getFinalScale = () => {
    return getSizeScaleValue() * getBackprintAdjustment();
  };

  // Calculate color brightness to adapt print effects
  const getColorBrightness = (hexColor: string): number => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  // Adaptive filter based on shirt color
  const getAdaptiveFilter = (): string => {
    const brightness = getColorBrightness(color);
    
    if (brightness > 200) {
      // Very bright colors (yellow, white, light colors)
      return "brightness(0.93) contrast(1.12) saturate(0.88) drop-shadow(0 1px 2px rgba(0,0,0,0.08))";
    } else if (brightness < 80) {
      // Very dark colors (black, navy, dark colors)
      return "brightness(1.02) contrast(1.15) saturate(0.92) drop-shadow(0 1px 3px rgba(0,0,0,0.15))";
    } else {
      // Medium colors
      return "brightness(0.97) contrast(1.10) saturate(0.85) drop-shadow(0 1px 2px rgba(0,0,0,0.10))";
    }
  };

  const [designState, setDesignState] = useState({
    x: 0,
    y: 0,
    width: 120,
    height: 120,
    rotation: 0,
    scale: 0.8,
  });

  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, designX: 0, designY: 0 });
  const designRef = useRef<HTMLDivElement | null>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);

  // Get current design based on active side
  const currentDesign = activeSide === 'front' ? designFront : designBack;

  // Auto-center design when it loads
  useEffect(() => {
    if (currentDesign && designRef.current) {
      const img = new Image();
      img.onload = () => {
        // Center the design perfectly with smaller initial scale
        setDesignState(prev => ({
          ...prev,
          x: 0,
          y: 0,
          width: 120,
          height: 120,
          scale: 0.8,
        }));
      };
      img.src = currentDesign;
    }
  }, [currentDesign]);

  // Check if design position is within T-shirt print area
  const isWithinCircle = (x: number, y: number, designWidth: number, designHeight: number): boolean => {
    if (!portalRef.current) return true;
    
    // Limit to T-shirt chest area (smaller than full portal)
    const maxRadius = 140; // Smaller radius to keep design on T-shirt chest
    const centerX = 0;
    const centerY = 0;
    
    // Check all four corners of the design
    const corners = [
      { x: x - (designWidth * designState.scale) / 2, y: y - (designHeight * designState.scale) / 2 },
      { x: x + (designWidth * designState.scale) / 2, y: y - (designHeight * designState.scale) / 2 },
      { x: x - (designWidth * designState.scale) / 2, y: y + (designHeight * designState.scale) / 2 },
      { x: x + (designWidth * designState.scale) / 2, y: y + (designHeight * designState.scale) / 2 },
    ];
    
    // All corners must be within the T-shirt print area
    return corners.every(corner => {
      const distance = Math.sqrt(
        Math.pow(corner.x - centerX, 2) + Math.pow(corner.y - centerY, 2)
      );
      return distance <= maxRadius;
    });
  };

  // Handle drag start
  const handleDragStart = (e: React.MouseEvent) => {
    if (e.target !== designRef.current && !(e.target as HTMLElement).closest('.drag-handle')) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      designX: designState.x,
      designY: designState.y,
    };
  };

  // Handle dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      
      const newX = dragStartRef.current.designX + deltaX;
      const newY = dragStartRef.current.designY + deltaY;
      
      // Only update if within circle
      if (isWithinCircle(newX, newY, designState.width, designState.height)) {
        setDesignState(prev => ({
          ...prev,
          x: newX,
          y: newY,
        }));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, designState.width, designState.height]);

  // Handle rotation
  const handleRotateStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const box = designRef.current?.getBoundingClientRect();
    if (!box) return;

    const centerX = box.left + box.width / 2;
    const centerY = box.top + box.height / 2;
    const startAngle = Math.atan2(startY - centerY, startX - centerX);
    const startRotation = designState.rotation;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const currentAngle = Math.atan2(
        moveEvent.clientY - centerY,
        moveEvent.clientX - centerX
      );
      const rotationDeg = (currentAngle - startAngle) * (180 / Math.PI);
      setDesignState((prev) => ({
        ...prev,
        rotation: startRotation + rotationDeg,
      }));
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // Handle resize with mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    const newScale = Math.max(0.5, Math.min(2, designState.scale + delta));
    
    setDesignState(prev => ({
      ...prev,
      scale: newScale,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 relative">
      {/* Circular Container with DYNAMIC COLOR GLOW */}
      <div
        className="relative portal-circle-glow"
        style={{
          width: '600px',
          height: '600px',
          zIndex: 2,
        }}
      >
        {/* Perfect Circle with Pitch Black Interior + Subtle Edge Glow */}
        <div 
          ref={portalRef}
          className="absolute inset-0 rounded-full bg-black"
          style={{ 
            zIndex: 3,
            boxShadow: `0 0 20px ${color}40, 0 0 35px ${color}30, inset 0 0 15px ${color}20`,
            animation: 'portal-glow-pulse 3s ease-in-out infinite',
          }}
        >
          {/* T-Shirt Container - No transition */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative origin-center"
              style={{ 
                width: 320, 
                height: 420,
                transformOrigin: 'center center',
                transform: `scale(${getFinalScale()})`,
              }}
            >
              {/* Base Shirt Image - Front or Back - FORCED SAME SIZE */}
              <img
                src={activeSide === 'front' ? "/mockups/tshirt.png" : "/mockups/tshirtbp.png"}
                alt="T-shirt base"
                className="absolute inset-0 pointer-events-none"
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />

              {/* Shirt Color Layer - Front or Back */}
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  backgroundColor: color,
                  mixBlendMode: "multiply",
                  opacity: 0.9,
                  maskImage: activeSide === 'front' ? "url(/mockups/tshirt.png)" : "url(/mockups/tshirtbp.png)",
                  WebkitMaskImage: activeSide === 'front' ? "url(/mockups/tshirt.png)" : "url(/mockups/tshirtbp.png)",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  maskSize: "contain",
                }}
              />

              {/* Design Layer - Natural Print Effect */}
              {currentDesign && (
                <div
                  ref={designRef}
                  className="absolute z-30 group cursor-move"
                  onMouseDown={handleDragStart}
                  onWheel={handleWheel}
                  style={{
                    left: '50%',
                    top: '50%',
                    width: `${designState.width}px`,
                    height: `${designState.height}px`,
                    transform: `translate(-50%, -50%) translate(${designState.x}px, ${designState.y}px) rotate(${designState.rotation}deg) scale(${designState.scale})`,
                    transformOrigin: "center center",
                    willChange: "transform",
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                  }}
                >
                  <div className="drag-handle w-full h-full relative">
                    {/* Main Design Image - Natural Print Blending with Feathering */}
                    <img
                      src={currentDesign}
                      alt="Printed design"
                      className="w-full h-full object-contain select-none absolute inset-0"
                      draggable={false}
                      style={{
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                        opacity: 0.92,
                        filter: `${getAdaptiveFilter()} blur(0.3px)`,
                        userSelect: "none",
                      }}
                    />

                    {/* Ultra-Subtle Fabric Weave Pattern - Screen Print Realism */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 2px,
                          rgba(255, 255, 255, 0.015) 2px,
                          rgba(255, 255, 255, 0.015) 4px
                        ),
                        repeating-linear-gradient(
                          90deg,
                          transparent,
                          transparent 2px,
                          rgba(255, 255, 255, 0.015) 2px,
                          rgba(255, 255, 255, 0.015) 4px
                        )`,
                        mixBlendMode: "overlay",
                      }}
                    />

                    {/* 2% Noise Grain - DTG Print Texture */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        opacity: 0.02,
                        mixBlendMode: "overlay",
                      }}
                    />

                    {/* Rotation Handle */}
                    <div
                      onMouseDown={handleRotateStart}
                      className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full cursor-grab opacity-0 group-hover:opacity-100 transition z-50"
                      title="Rotate (or scroll to resize)"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Size indicator - TRANSPARENT BACKGROUND */}
        <div className="absolute left-1/2 transform -translate-x-1/2" style={{ bottom: '-80px', zIndex: 10 }}>
          <div className="bg-gradient-to-r from-purple-600/80 to-orange-600/80 backdrop-blur-sm text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg shadow-purple-900/50">
            {size} • {material}
          </div>
        </div>
      </div>

      <style>{`
        /* Dynamic Portal Glow - Matches Selected Shirt Color */
        .portal-circle-glow {
          filter: drop-shadow(0 0 18px ${color}50)
                  drop-shadow(0 0 28px ${color}35);
          animation: portal-glow-pulse 4s ease-in-out infinite;
        }

        @keyframes portal-glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 15px ${color}45)
                    drop-shadow(0 0 25px ${color}30);
          }
          50% {
            filter: drop-shadow(0 0 22px ${color}55)
                    drop-shadow(0 0 32px ${color}40);
          }
        }

        /* Smoke Morph Transition - Haunted Dissolve Effect */
        .smoke-transition {
          animation: smokeMorph 0.6s ease-in-out forwards;
        }

        @keyframes smokeMorph {
          0% {
            opacity: 1;
            filter: blur(0px);
          }
          40% {
            opacity: 0.4;
            filter: blur(8px);
          }
          70% {
            opacity: 0;
            filter: blur(12px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
          }
        }

        /* Smoke Overlay Animation */
        .smoke-overlay {
          opacity: 0;
        }

        @keyframes smokeAppear {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedTShirtMockup;
