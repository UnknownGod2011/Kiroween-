interface MinimalFabricSelectorProps {
  selectedMaterial: string;
  onMaterialChange: (material: string) => void;
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

const materials = [
  { value: 'cotton', label: 'Cotton', desc: 'Soft & breathable' },
  { value: 'polyester', label: 'Polyester', desc: 'Durable & moisture-wicking' },
  { value: 'blend', label: 'Blend', desc: 'Best of both worlds' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const MinimalFabricSelector = ({
  selectedMaterial,
  onMaterialChange,
  selectedSize,
  onSizeChange,
}: MinimalFabricSelectorProps) => {
  return (
    <div className="space-y-6">
      {/* Material */}
      <div className="space-y-4">
        <label className="text-orange-400 text-lg font-semibold">Material</label>
        <div className="grid grid-cols-3 gap-3">
          {materials.map((material) => (
            <button
              key={material.value}
              onClick={() => onMaterialChange(material.value)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                selectedMaterial === material.value
                  ? 'border-orange-500 bg-orange-500/10 scale-105'
                  : 'border-purple-700/30 bg-black/30 hover:border-orange-500/50'
              }`}
            >
              <div className="text-white font-semibold">{material.label}</div>
              <div className="text-purple-300 text-xs mt-1">{material.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="space-y-4">
        <label className="text-orange-400 text-lg font-semibold">Size</label>
        <div className="flex flex-wrap gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`w-16 h-16 rounded-lg border-2 font-bold text-lg transition-all duration-300 ${
                selectedSize === size
                  ? 'border-orange-500 bg-orange-500/10 text-orange-400 scale-110'
                  : 'border-purple-700/30 bg-black/30 text-purple-300 hover:border-orange-500/50'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MinimalFabricSelector;
