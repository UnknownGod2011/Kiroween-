import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, Palette, Truck, TrendingUp } from 'lucide-react';

interface PricingCalculatorProps {
  design?: string;
  tshirtColor: string;
  material: string;
  size: string;
}

interface PricingBreakdown {
  baseCost: number;
  inkCost: number;
  deliveryCost: number;
  profitMargin: number;
  total: number;
  colorComplexity: number;
  pixelCount: number;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  design,
  tshirtColor,
  material,
  size
}) => {
  const [pricing, setPricing] = useState<PricingBreakdown>({
    baseCost: 250,
    inkCost: 0,
    deliveryCost: 50,
    profitMargin: 0,
    total: 300,
    colorComplexity: 1,
    pixelCount: 0
  });

  // Color cost multipliers
  const colorCosts = {
    red: 1.5,
    blue: 1.2,
    black: 1.0,
    white: 0.8,
    yellow: 1.3,
    green: 1.1,
    purple: 1.4,
    orange: 1.3,
    pink: 1.4,
    brown: 1.1,
    gray: 0.9,
    default: 1.0
  };

  // Material cost modifiers
  const materialModifiers = {
    cotton: 1.0,
    polyester: 1.15,
    blend: 1.08
  };

  // Size cost modifiers
  const sizeModifiers = {
    XS: 0.9,
    S: 0.95,
    M: 1.0,
    L: 1.05,
    XL: 1.15,
    XXL: 1.25
  };

  const simulatePixelAnalysis = (designUrl?: string, tshirtColor?: string) => {
    if (!designUrl) {
      return {
        pixelCount: 0,
        colorComplexity: 1,
        dominantColors: ['black']
      };
    }

    // Simulate pixel analysis (in real app, this would analyze the actual image)
    const simulatedPixelCount = Math.floor(Math.random() * 5000) + 1000;
    const simulatedColors = ['red', 'blue', 'black', 'yellow', 'green'];
    const numColors = Math.floor(Math.random() * 3) + 1;
    const dominantColors = simulatedColors.slice(0, numColors);
    
    // Calculate average color complexity
    const colorComplexity = dominantColors.reduce((acc, color) => {
      return acc + (colorCosts[color as keyof typeof colorCosts] || colorCosts.default);
    }, 0) / dominantColors.length;

    return {
      pixelCount: simulatedPixelCount,
      colorComplexity,
      dominantColors
    };
  };

  const calculatePricing = () => {
    const { pixelCount, colorComplexity } = simulatePixelAnalysis(design, tshirtColor);
    
    // Base cost
    let baseCost = 250;
    
    // Apply material modifier
    baseCost *= materialModifiers[material as keyof typeof materialModifiers] || 1;
    
    // Apply size modifier
    baseCost *= sizeModifiers[size as keyof typeof sizeModifiers] || 1;
    
    // Calculate ink cost based on pixel count and color complexity
    const inkCost = (pixelCount * colorComplexity) / 1000;
    
    // Delivery cost
    const deliveryCost = 50;
    
    // Subtotal
    const subtotal = baseCost + inkCost + deliveryCost;
    
    // Profit margin (20%)
    const profitMargin = subtotal * 0.2;
    
    // Total
    const total = subtotal + profitMargin;

    setPricing({
      baseCost: Math.round(baseCost),
      inkCost: Math.round(inkCost),
      deliveryCost,
      profitMargin: Math.round(profitMargin),
      total: Math.round(total),
      colorComplexity: Math.round(colorComplexity * 100) / 100,
      pixelCount
    });
  };

  useEffect(() => {
    calculatePricing();
  }, [design, tshirtColor, material, size]);

  const formatCurrency = (amount: number) => `₹${amount}`;

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-950 to-orange-950 border-orange-700/50">
      <div className="flex items-center space-x-2 mb-4">
        <Calculator className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-orange-400">💰 Dynamic Pricing</h3>
        <Badge variant="secondary" className="bg-orange-900/50 text-orange-300 border-orange-700">
          Live Calculation
        </Badge>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3">
        {/* Base Cost */}
        <div className="flex justify-between items-center py-2 border-b border-purple-700/50">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-purple-300">Base Cost ({material}, {size})</span>
          </div>
          <span className="font-medium text-orange-300">{formatCurrency(pricing.baseCost)}</span>
        </div>

        {/* Ink Cost */}
        <div className="flex justify-between items-center py-2 border-b border-purple-700/50">
          <div className="flex items-center space-x-2">
            <Palette className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">
              Ink Cost ({pricing.pixelCount.toLocaleString()} pixels × {pricing.colorComplexity})
            </span>
          </div>
          <span className="font-medium text-orange-300">{formatCurrency(pricing.inkCost)}</span>
        </div>

        {/* Delivery Cost */}
        <div className="flex justify-between items-center py-2 border-b border-purple-700/50">
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-purple-300">Delivery</span>
          </div>
          <span className="font-medium text-orange-300">{formatCurrency(pricing.deliveryCost)}</span>
        </div>

        {/* Profit Margin */}
        <div className="flex justify-between items-center py-2 border-b border-purple-700/50">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-purple-300">Profit Margin (20%)</span>
          </div>
          <span className="font-medium text-orange-300">{formatCurrency(pricing.profitMargin)}</span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-orange-700/50">
          <span className="text-lg font-semibold text-orange-400">Total Price</span>
          <span className="text-2xl font-bold text-orange-500">
            {formatCurrency(pricing.total)}
          </span>
        </div>
      </div>

      {/* Pricing Info */}
      <div className="mt-4 p-3 bg-purple-900/50 rounded-lg border border-purple-700">
        <div className="text-xs text-purple-300 space-y-1">
          <div className="flex justify-between">
            <span>Color Complexity:</span>
            <Badge variant="outline" className="text-xs border-orange-700 text-orange-400">
              {pricing.colorComplexity}x multiplier
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Design Pixels:</span>
            <span className="text-orange-300">{pricing.pixelCount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Cost per 1000 pixels:</span>
            <span className="text-orange-300">₹{pricing.colorComplexity}</span>
          </div>
        </div>
      </div>

      {/* Live Update Indicator */}
      <div className="mt-3 flex items-center space-x-2 text-xs text-orange-400">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
        <span>Price updates automatically with design changes</span>
      </div>
    </Card>
  );
};

export default PricingCalculator;