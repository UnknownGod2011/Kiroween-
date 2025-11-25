// Dynamic pricing calculator for t-shirts

export interface PricingFactors {
  color: string;
  hasDesign: boolean;
  designComplexity?: 'low' | 'medium' | 'high';
  material?: string;
  size?: string;
}

export const calculatePrice = (factors: PricingFactors): number => {
  let basePrice = 499; // Base price in ₹

  // Color-based pricing
  const colorLower = factors.color.toLowerCase();
  if (colorLower === '#000000' || colorLower === 'black') {
    basePrice += 20; // Black shirts cost more
  } else if (colorLower === '#ff0000' || colorLower === 'red' || colorLower.includes('ff0000')) {
    basePrice += 10; // Red shirts slightly more
  } else if (colorLower === '#ffffff' || colorLower === 'white') {
    // White is base price
  } else {
    basePrice += 5; // Other colors slightly more
  }

  // Design-based pricing
  if (factors.hasDesign) {
    basePrice += 40; // Custom design adds cost
  }

  // Complexity-based pricing
  if (factors.designComplexity === 'high') {
    basePrice += 60;
  } else if (factors.designComplexity === 'medium') {
    basePrice += 30;
  } else if (factors.designComplexity === 'low') {
    basePrice += 15;
  }

  // Material-based pricing
  if (factors.material === 'polyester') {
    basePrice += 20;
  } else if (factors.material === 'blend') {
    basePrice += 10;
  }

  // Size-based pricing
  if (factors.size === 'XXL' || factors.size === '3XL') {
    basePrice += 30;
  } else if (factors.size === 'XL') {
    basePrice += 20;
  } else if (factors.size === 'L') {
    basePrice += 10;
  }

  return basePrice;
};

// Estimate design complexity based on design data
export const estimateDesignComplexity = (designUrl?: string | null): 'low' | 'medium' | 'high' => {
  if (!designUrl) return 'low';
  
  // Simple heuristic: longer data URLs = more complex images
  const length = designUrl.length;
  
  if (length > 100000) return 'high';
  if (length > 50000) return 'medium';
  return 'low';
};

// Format price for display
export const formatPrice = (price: number): string => {
  return `₹${price.toLocaleString('en-IN')}`;
};
