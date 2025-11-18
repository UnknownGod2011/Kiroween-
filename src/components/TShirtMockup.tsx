import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import { cn } from "@/lib/utils";

interface TShirtMockupProps {
  color: string;
  design?: string;
  material: string;
  size: string;
}

const TShirtMockup: React.FC<TShirtMockupProps> = ({
  color,
  design,
  material,
  size,
}) => {

  const getSizeScale = () => {
    switch (size) {
      case "XS": return "scale-75";
      case "S": return "scale-90";
      case "M": return "scale-100";
      case "L": return "scale-110";
      case "XL": return "scale-125";
      case "XXL": return "scale-140";
      case "3XL": return "scale-150";
      default: return "scale-100";
    }
  };

  const [designState, setDesignState] = useState({
    x: 80,
    y: 130,
    width: 150,
    height: 150,
    rotation: 0,
  });

  const rotateRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const box = rotateRef.current?.getBoundingClientRect();
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

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-black">

      {/* 🧢 Apparel Preview */}
      <div
        className={cn(
          "relative transition-all duration-500 transform origin-center",
          getSizeScale()
        )}
        style={{ width: 320, height: 420 }}
      >
        {/* Base Shirt */}
        <img
          src="/mockups/tshirt.png"
          alt="T-shirt base"
          className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
          draggable={false}
        />

        {/* Shirt Color Layer */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            backgroundColor: color,
            mixBlendMode: "multiply",
            opacity: 0.9,
            maskImage: "url(/mockups/tshirt.png)",
            WebkitMaskImage: "url(/mockups/tshirt.png)",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            maskSize: "contain",
          }}
        />

        {/* Design Layer */}
        {design && (
          <Rnd
            bounds="parent"
            size={{ width: designState.width, height: designState.height }}
            position={{ x: designState.x, y: designState.y }}
            onDragStop={(_, d) =>
              setDesignState((prev) => ({ ...prev, x: d.x, y: d.y }))
            }
            onResizeStop={(_, __, ref, ___, position) =>
              setDesignState({
                ...designState,
                width: parseFloat(ref.style.width),
                height: parseFloat(ref.style.height),
                ...position,
              })
            }
            lockAspectRatio
            className="z-30 group"
          >
            <div
              ref={rotateRef}
              style={{
                transform: `rotate(${designState.rotation}deg)`,
                transformOrigin: "center center",
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              {/* --- Main Printed Effect --- */}
              <img
                src={design}
                alt="Printed design"
                className="w-full h-full object-contain rounded-sm select-none absolute inset-0"
                draggable={false}
                style={{
                  objectFit: "contain",
                  mixBlendMode: "overlay", // interacts with shirt color & folds
                  opacity: 0.92,
                  filter: "contrast(1.05) brightness(0.97) saturate(1.1)",
                  userSelect: "none",
                }}
              />

              {/* Light ink absorption layer */}
              <img
                src={design}
                alt="Ink absorption layer"
                className="w-full h-full object-contain rounded-sm select-none absolute inset-0 pointer-events-none"
                draggable={false}
                style={{
                  objectFit: "contain",
                  mixBlendMode: "soft-light", // soft diffusion into fabric
                  opacity: 0.65,
                  filter: "blur(0.4px)",
                  userSelect: "none",
                }}
              />

              {/* Fabric texture for woven feel */}
              <div className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-15 bg-[url('/textures/fabric.png')] bg-cover" />

              {/* Rotation handle */}
              <div
                onMouseDown={handleMouseDown}
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-400 rounded-full cursor-grab opacity-0 group-hover:opacity-100 transition"
                title="Rotate"
              />
            </div>
          </Rnd>
        )}

        {/* 🏷️ Size indicator */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-orange-600 to-purple-700 text-white px-4 py-2 rounded-full text-base font-semibold shadow-lg shadow-orange-900/50">
            {size} • {material}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TShirtMockup;
