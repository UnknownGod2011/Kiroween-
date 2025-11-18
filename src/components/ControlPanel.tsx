import React from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Download, Share2 } from 'lucide-react';
import DesignGenerator from './DesignGenerator';
import ColorWheel from './ColorWheel';
import PricingCalculator from './PricingCalculator';

interface ControlPanelProps {
  tshirtColor: string;
  onTshirtColorChange: (color: string) => void;
  material: string;
  onMaterialChange: (material: string) => void;
  size: string;
  onSizeChange: (size: string) => void;
  selectedDesign?: string;
  onDesignSelect: (design: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  tshirtColor,
  onTshirtColorChange,
  material,
  onMaterialChange,
  size,
  onSizeChange,
  selectedDesign,
  onDesignSelect
}) => {
  const handleOrderNow = () => {
    // Future implementation: integrate with e-commerce platform
    alert('Order functionality will be implemented with payment gateway integration!');
  };

  const handleDownload = () => {
    // Future implementation: generate high-res mockup
    alert('Download feature will generate high-resolution mockups!');
  };

  const handleShare = () => {
    // Future implementation: share design
    if (navigator.share) {
      navigator.share({
        title: 'Check out my custom T-shirt design!',
        text: 'I created this awesome T-shirt design using AI',
        url: window.location.href,
      });
    } else {
      alert('Sharing feature will allow social media sharing!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Design Generation */}
      <Card className="p-6 bg-gradient-to-br from-gray-900 to-purple-950 border-purple-700/50">
        <h2 className="text-xl font-semibold text-orange-400 mb-4">🎃 AI Spooky Design Generator</h2>
        <DesignGenerator 
          onDesignSelect={onDesignSelect}
          selectedDesign={selectedDesign}
        />
      </Card>

      {/* T-shirt Customization */}
      <Card className="p-6 bg-gradient-to-br from-gray-900 to-purple-950 border-purple-700/50">
        <h2 className="text-xl font-semibold text-orange-400 mb-4">👻 Customize Your Spooky Tee</h2>
        
        <div className="space-y-6">
          {/* Color Selector */}
          <ColorWheel 
            selectedColor={tshirtColor}
            onColorChange={onTshirtColorChange}
          />

          {/* Material Selection */}
          <div>
            <label className="block text-sm font-medium text-orange-400 mb-2">
              Material
            </label>
            <Select value={material} onValueChange={onMaterialChange}>
              <SelectTrigger className="w-full bg-purple-900/50 border-purple-700 text-orange-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-purple-700">
                <SelectItem value="cotton" className="text-purple-200 focus:bg-purple-800">
                  <div className="flex flex-col">
                    <span>100% Cotton</span>
                    <span className="text-xs text-purple-400">Soft, breathable, classic feel</span>
                  </div>
                </SelectItem>
                <SelectItem value="polyester" className="text-purple-200 focus:bg-purple-800">
                  <div className="flex flex-col">
                    <span>100% Polyester</span>
                    <span className="text-xs text-purple-400">Moisture-wicking, durable (+15%)</span>
                  </div>
                </SelectItem>
                <SelectItem value="blend" className="text-purple-200 focus:bg-purple-800">
                  <div className="flex flex-col">
                    <span>Cotton-Poly Blend</span>
                    <span className="text-xs text-purple-400">Best of both worlds (+8%)</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Size Selection */}
          <div>
            <label className="block text-sm font-medium text-orange-400 mb-2">
              Size
            </label>
            <Select value={size} onValueChange={onSizeChange}>
              <SelectTrigger className="w-full bg-purple-900/50 border-purple-700 text-orange-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-purple-700">
                <SelectItem value="XS" className="text-purple-200 focus:bg-purple-800">Extra Small (XS)</SelectItem>
                <SelectItem value="S" className="text-purple-200 focus:bg-purple-800">Small (S)</SelectItem>
                <SelectItem value="M" className="text-purple-200 focus:bg-purple-800">Medium (M)</SelectItem>
                <SelectItem value="L" className="text-purple-200 focus:bg-purple-800">Large (L)</SelectItem>
                <SelectItem value="XL" className="text-purple-200 focus:bg-purple-800">Extra Large (XL)</SelectItem>
                <SelectItem value="XXL" className="text-purple-200 focus:bg-purple-800">Double XL (XXL)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Pricing Calculator */}
      <PricingCalculator 
        design={selectedDesign}
        tshirtColor={tshirtColor}
        material={material}
        size={size}
      />

      {/* Action Buttons */}
      <Card className="p-6 bg-gradient-to-br from-gray-900 to-purple-950 border-purple-700/50">
        <div className="space-y-3">
          <Button 
            onClick={handleOrderNow}
            className="w-full bg-gradient-to-r from-orange-600 to-purple-700 hover:from-orange-700 hover:to-purple-800 text-white font-semibold py-3 text-lg shadow-lg shadow-orange-900/50"
            disabled={!selectedDesign}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            🎃 Order Your Spooky Tee
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={handleDownload}
              disabled={!selectedDesign}
              className="border-purple-700 text-orange-400 hover:bg-purple-900/50"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button 
              variant="outline" 
              onClick={handleShare}
              disabled={!selectedDesign}
              className="border-purple-700 text-orange-400 hover:bg-purple-900/50"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {!selectedDesign && (
          <p className="text-xs text-purple-400 text-center mt-3">
            👻 Generate a spooky design first to enable ordering
          </p>
        )}
      </Card>

      {/* Features Info */}
      <Card className="p-4 bg-gradient-to-r from-purple-950 to-orange-950 border-orange-700/50">
        <div className="text-xs text-purple-300 space-y-2">
          <div className="font-medium text-orange-400 mb-2">🦇 Spooky Features:</div>
          <div>• AI-powered horror design generation (Stable Diffusion)</div>
          <div>• Automatic background removal for clean prints</div>
          <div>• Real-time spooky mockup preview</div>
          <div>• Drag, resize & rotate your designs</div>
          <div>• Multiple spooky prompt suggestions</div>
          <div>• Perfect for Halloween & year-round frights!</div>
        </div>
      </Card>
    </div>
  );
};

export default ControlPanel;