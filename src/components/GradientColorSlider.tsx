import React, { useRef, useState, useEffect } from 'react';

interface GradientColorSliderProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const GradientColorSlider: React.FC<GradientColorSliderProps> = ({ selectedColor, onColorChange }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);

  // Convert color to hue position
  useEffect(() => {
    const hue = hexToHue(selectedColor);
    setPosition(hue / 360);
  }, [selectedColor]);

  const hexToHue = (hex: string): number => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    if (delta === 0) return 0;

    let hue = 0;
    if (max === r) {
      hue = ((g - b) / delta) % 6;
    } else if (max === g) {
      hue = (b - r) / delta + 2;
    } else {
      hue = (r - g) / delta + 4;
    }

    hue = Math.round(hue * 60);
    if (hue < 0) hue += 360;

    return hue;
  };

  const hueToHex = (hue: number): string => {
    const h = hue / 60;
    const c = 1;
    const x = c * (1 - Math.abs((h % 2) - 1));

    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 1) { r = c; g = x; b = 0; }
    else if (h >= 1 && h < 2) { r = x; g = c; b = 0; }
    else if (h >= 2 && h < 3) { r = 0; g = c; b = x; }
    else if (h >= 3 && h < 4) { r = 0; g = x; b = c; }
    else if (h >= 4 && h < 5) { r = x; g = 0; b = c; }
    else if (h >= 5 && h < 6) { r = c; g = 0; b = x; }

    const toHex = (n: number) => {
      const hex = Math.round(n * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateColor(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateColor(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateColor = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const hue = percentage * 360;

    setPosition(percentage);
    onColorChange(hueToHex(hue));
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="space-y-4">
      <label className="text-orange-400 text-lg font-semibold flex items-center gap-3">
        T-Shirt Color
        <span className="text-sm text-purple-300 font-normal">
          {selectedColor.toUpperCase()}
        </span>
      </label>

      {/* Gradient Slider */}
      <div className="relative">
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          className="relative h-12 rounded-full cursor-pointer overflow-hidden"
          style={{
            background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
            boxShadow: '0 4px 20px rgba(162, 89, 255, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Selector Circle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-white cursor-grab active:cursor-grabbing transition-transform"
            style={{
              left: `calc(${position * 100}% - 32px)`,
              backgroundColor: selectedColor,
              boxShadow: `
                0 0 0 2px rgba(0, 0, 0, 0.5),
                0 0 20px ${selectedColor},
                0 0 40px ${selectedColor}80,
                0 4px 12px rgba(0, 0, 0, 0.5)
              `,
              transform: isDragging ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%) scale(1)',
              willChange: 'transform',
            }}
          >
            {/* Inner glow */}
            <div
              className="absolute inset-2 rounded-full"
              style={{
                background: `radial-gradient(circle, ${selectedColor} 0%, transparent 70%)`,
                opacity: 0.6,
              }}
            />
          </div>
        </div>

        {/* Preset Quick Colors */}
        <div className="flex justify-between mt-4 px-2">
          {[
            { name: 'Black', value: '#000000' },
            { name: 'White', value: '#FFFFFF' },
            { name: 'Red', value: '#FF0000' },
            { name: 'Orange', value: '#FF6B00' },
            { name: 'Purple', value: '#9333EA' },
            { name: 'Blue', value: '#3B82F6' },
            { name: 'Green', value: '#10B981' },
            { name: 'Gray', value: '#6B7280' },
          ].map((color) => (
            <button
              key={color.value}
              onClick={() => onColorChange(color.value)}
              className={`w-10 h-10 rounded-full transition-all duration-200 ${
                selectedColor === color.value
                  ? 'ring-4 ring-orange-500 scale-110'
                  : 'ring-2 ring-purple-700/30 hover:ring-orange-500/50 hover:scale-105'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradientColorSlider;
