import React from "react";

type Props = {
  design?: string | null; // AI-generated image
  color: string;          // T-shirt base color
};

const TShirtPreview: React.FC<Props> = ({ design, color }) => {
  const PRINT_TOP_PCT = 34;   // adjust to position design vertically
  const PRINT_WIDTH_PCT = 48; // adjust to size design
  const PRINT_ASPECT = 1;     // 1 = square

  return (
    <div
      className="relative mx-auto select-none"
      style={{ width: 320, height: 420 }}
    >
      {/* Base mockup (folds + shadows) */}
      <img
        src="/mockup/tshirt.png"
        alt="T-shirt mockup"
        className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
        draggable={false}
      />

      {/* Color overlay (below the design, above the folds) */}
      <div
        className="absolute inset-0 z-20 mix-blend-multiply pointer-events-none"
        style={{ backgroundColor: color }}
      />

      {/* Printed design (always on top of everything) */}
      {design && (
        <img
          src={design}
          alt="Printed design"
          className="absolute left-1/2 -translate-x-1/2 object-contain z-30 pointer-events-none"
          style={{
             //maxWidth: '80%',
             //maxHeight: '60%',
             //objectFit: 'contain',
            top: `${PRINT_TOP_PCT}%`,
            width: `${PRINT_WIDTH_PCT}%`,
            aspectRatio: String(PRINT_ASPECT),
          }}
          draggable={false}
        />
      )}
    </div>
  );
};

export default TShirtPreview;

