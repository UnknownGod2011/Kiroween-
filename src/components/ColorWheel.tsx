import React, { useState, useRef, useEffect } from 'react';

interface ColorWheelProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ColorWheel: React.FC<ColorWheelProps> = ({ selectedColor, onColorChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawColorWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 5;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw hue circle
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = (angle - 1) * Math.PI / 180;
      const endAngle = angle * Math.PI / 180;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.strokeStyle = `hsl(${angle}, 100%, 50%)`;
      ctx.lineWidth = radius;
      ctx.stroke();
    }

    // Add radial gradients for saturation/lightness
    const whiteGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    whiteGrad.addColorStop(0, 'rgba(255,255,255,1)');
    whiteGrad.addColorStop(0.6, 'rgba(255,255,255,0)');
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = whiteGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();

    const blackGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    blackGrad.addColorStop(0.6, 'rgba(0,0,0,0)');
    blackGrad.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = blackGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.globalCompositeOperation = 'source-over';
  };

  const getColorFromPosition = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return selectedColor;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return selectedColor;

    const canvasX = ((x - rect.left) * canvas.width) / rect.width;
    const canvasY = ((y - rect.top) * canvas.height) / rect.height;

    const pixel = ctx.getImageData(canvasX, canvasY, 1, 1).data;
    return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    onColorChange(getColorFromPosition(e.clientX, e.clientY));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    onColorChange(getColorFromPosition(e.clientX, e.clientY));
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => drawColorWheel(), []);

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-orange-400">🎨 T-shirt Color</div>
      <div
        className="relative w-40 h-40 mx-auto cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <canvas
          ref={canvasRef}
          width={160}
          height={160}
          className="rounded-full border border-purple-700 shadow-lg shadow-purple-900/50"
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-orange-400 shadow-lg pointer-events-none"
          style={{ backgroundColor: selectedColor }}
        />
      </div>
      <div className="flex items-center justify-between bg-purple-900/50 p-2 rounded-lg border border-purple-700">
        <span className="text-xs text-purple-300">Selected:</span>
        <div className="flex items-center space-x-2">
          <div
            className="w-6 h-6 rounded border border-purple-700"
            style={{ backgroundColor: selectedColor }}
          />
          <code className="text-xs bg-gray-900 text-orange-400 px-2 py-1 rounded border border-purple-700">
            {selectedColor}
          </code>
        </div>
      </div>
    </div>
  );
};

export default ColorWheel;
