interface MinimalColorSelectorProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const presetColors = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Blood Red', value: '#8B0000' },
  { name: 'Purple', value: '#6B46C1' },
  { name: 'Orange', value: '#FF6B00' },
  { name: 'Gray', value: '#4B5563' },
  { name: 'Navy', value: '#1E3A8A' },
  { name: 'Forest', value: '#064E3B' },
];

const MinimalColorSelector = ({ selectedColor, onColorChange }: MinimalColorSelectorProps) => {
  return (
    <div className="space-y-4">
      <label className="text-orange-400 text-lg font-semibold">T-Shirt Color</label>
      <div className="flex flex-wrap gap-3">
        {presetColors.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`group relative w-16 h-16 rounded-lg transition-all duration-300 ${
              selectedColor === color.value
                ? 'ring-4 ring-orange-500 scale-110'
                : 'ring-2 ring-purple-700/30 hover:ring-orange-500/50 hover:scale-105'
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
            {selectedColor === color.value && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-500 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MinimalColorSelector;
