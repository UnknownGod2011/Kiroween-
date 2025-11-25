import React, { useCallback } from "react";
import { Sparkles, ShoppingCart } from "lucide-react";
import FloatingEmbers from "../components/FloatingEmbers";
import ElectricBorder from "../components/ElectricBorder";
import { addToCart, getCartItems } from "../utils/cartStorage";
import { useCart } from "../context/CartContext";
import { FuzzyText } from "../components/animations";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image?: string;
  available: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Haunted T-Shirt: Dark Spirit",
    category: "Haunted Collection",
    price: "₹1299",
    image: "/assets/CustomkTshirts/Haunted1.png",
    available: true,
  },
  {
    id: 2,
    name: "Haunted T-Shirt: Ghost Rider",
    category: "Haunted Collection",
    price: "₹1299",
    image: "/assets/CustomkTshirts/Haunted4.png",
    available: true,
  },
  {
    id: 3,
    name: "Haunted Hoodie: Shadow Walker",
    category: "Oversized Haunted Hoodies",
    price: "₹2499",
    image: "/assets/CustomkTshirts/HauntedHoodie.png",
    available: true,
  },
  {
    id: 4,
    name: "Haunted Sweatshirt: Nightmare",
    category: "Premium Haunted Wear",
    price: "₹1999",
    image: "/assets/CustomkTshirts/HauntedSweatShirt.png",
    available: true,
  },
  {
    id: 5,
    name: "Crystal Series Limited Drop",
    category: "Premium Wear",
    price: "Coming Soon",
    available: false,
  },
  {
    id: 6,
    name: "Aurora Glow Collection",
    category: "AI-Generated Fits",
    price: "Coming Soon",
    available: false,
  },
];

const Collection: React.FC = () => {
  const { updateCartCount } = useCart();

  const handleAddToCart = useCallback((product: Product) => {
    try {
      // Parse the actual price from the product (e.g., "₹1299" -> 1299)
      const priceValue = product.price.replace(/[₹,]/g, '').trim();
      const price = !isNaN(Number(priceValue)) ? Number(priceValue) : 499;
      
      // Auto-generate sequential name (TEE 1, TEE 2, etc.)
      const existingItems = getCartItems();
      const teeCount = existingItems.filter((item: any) => item.designName?.startsWith('TEE ')).length;
      const autoName = `TEE ${teeCount + 1}`;
      
      // Add to cart immediately
      addToCart({
        image: product.image || '',
        snapshotFront: product.image || '',
        snapshotBack: product.image || '',
        color: '#000000',
        material: 'cotton',
        size: 'M',
        designName: autoName,
        designFront: product.image || null,
        designBack: null,
        price,
      });
      
      // Update cart count
      updateCartCount();
      
      // Show minimal success checkmark
      const successDiv = document.createElement('div');
      successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: rgba(0, 0, 0, 0.85);
        border: 2px solid #10b981;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: checkmarkPop 0.6s ease-out forwards;
        backdrop-filter: blur(10px);
      `;
      successDiv.innerHTML = `
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12" style="animation: drawCheck 0.4s ease-out 0.2s forwards; stroke-dasharray: 30; stroke-dashoffset: 30;"></polyline>
        </svg>
      `;
      document.body.appendChild(successDiv);
      setTimeout(() => {
        successDiv.style.animation = 'checkmarkFade 0.3s ease-in forwards';
        setTimeout(() => successDiv.remove(), 300);
      }, 1200);
    } catch (error) {
      alert('Failed to add item to cart. Please try again.');
    }
  }, [updateCartCount]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Floating Embers */}
      <FloatingEmbers count={6} />
      
      {/* Spooky Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-tr from-orange-600 via-purple-600 to-orange-500 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tr from-purple-600 via-orange-600 to-purple-500 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      {/* Floating Ghost */}
      <div className="absolute top-20 right-1/4 w-24 h-32 opacity-20 animate-bat-fly-collection"
        style={{
          backgroundImage: 'url(/assets/haunted/Ghost1.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold flex items-center justify-center space-x-4">
            <span className="text-4xl">👹</span>
            <span className="inline-flex items-baseline gap-3">
              <FuzzyText 
                fontSize="3rem"
                fontWeight={800}
                color="#f97316"
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover={true}
              >
                Cursed Collection
              </FuzzyText>
            </span>
            <Sparkles className="text-orange-400" size={32} />
          </h1>
          <p className="text-purple-300 mt-3 text-lg" style={{ fontFamily: 'Unbounded, sans-serif' }}>
            Explore our haunted limited-edition premium designs.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) =>
            item.available ? (
              item.id === 4 ? (
                // Haunted Sweatshirt with Electric Border (no tag)
                <ElectricBorder
                  key={item.id}
                  color="#ff6b00"
                  speed={1.5}
                  chaos={0.7}
                  thickness={3}
                  style={{ borderRadius: '1rem' }}
                >
                  <div className="group bg-gradient-to-br from-gray-900 to-purple-950 rounded-2xl overflow-hidden shadow-2xl hover:shadow-orange-900/50 transition-all duration-300">
                    <div className="relative w-full h-80 bg-black overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 text-xs bg-orange-600 text-white px-3 py-1 rounded-full font-semibold">
                        {item.category.includes("Oversized") ? "OVERSIZED FIT" : "RELAXED FIT"}
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <h2 className="text-lg font-semibold text-orange-400">{item.name}</h2>
                      <p className="text-sm text-purple-300">{item.category}</p>
                      <p className="text-md font-bold text-orange-500">{item.price}</p>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full py-2 bg-gradient-to-r from-orange-600 to-purple-700 hover:from-orange-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-900/50"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </ElectricBorder>
              ) : (
                // Regular product cards
                <div
                  key={item.id}
                  className="group bg-gradient-to-br from-gray-900 to-purple-950 rounded-2xl overflow-hidden shadow-2xl hover:shadow-orange-900/50 transition-all duration-300 border-2 border-purple-700/50 hover:border-orange-500/50 hover:scale-[1.02]"
                >
                  <div className="relative w-full h-80 bg-black overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 text-xs bg-orange-600 text-white px-3 py-1 rounded-full font-semibold">
                      {item.category.includes("Oversized") ? "OVERSIZED FIT" : "RELAXED FIT"}
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <h2 className="text-lg font-semibold text-orange-400">{item.name}</h2>
                    <p className="text-sm text-purple-300">{item.category}</p>
                    <p className="text-md font-bold text-orange-500">{item.price}</p>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full py-2 bg-gradient-to-r from-orange-600 to-purple-700 hover:from-orange-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-900/50"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div
                key={item.id}
                className="flex flex-col justify-center items-center bg-gradient-to-br from-purple-950 to-orange-950 border-2 border-orange-700/50 rounded-2xl h-80 text-center shadow-2xl hover:shadow-orange-900/50 transition-all duration-500"
              >
                <h3 className="text-2xl font-semibold text-orange-400 animate-pulse drop-shadow-[0_0_10px_rgba(255,107,0,0.8)]">
                  🎃 Summoning Soon...
                </h3>
                <p className="text-sm mt-2 text-purple-300">{item.name}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-20px) scale(1.05); }
          }
          .animate-float-slow { animation: floatSlow 6s ease-in-out infinite; }
          .animate-text-glow {
            animation: textGlow 3s infinite ease-in-out;
          }
          @keyframes textGlow {
            0%, 100% { text-shadow: 0 0 10px rgba(249,115,22,0.8), 0 0 20px rgba(168,85,247,0.6); }
            50% { text-shadow: 0 0 15px rgba(249,115,22,1), 0 0 30px rgba(147,51,234,0.8); }
          }
          @keyframes pulseSlow {
            0%,100%{opacity:0.9;transform:scale(1);}
            50%{opacity:1;transform:scale(1.05);}
          }
          .animate-pulse-slow{animation:pulseSlow 3s infinite;}
          
          @keyframes bat-fly-collection {
            0% { transform: translateX(0) translateY(0); }
            25% { transform: translateX(-100px) translateY(-30px); }
            50% { transform: translateX(-200px) translateY(0); }
            75% { transform: translateX(-100px) translateY(30px); }
            100% { transform: translateX(0) translateY(0); }
          }
          .animate-bat-fly-collection { animation: bat-fly-collection 20s ease-in-out infinite; }
          
          @keyframes checkmarkPop {
            0% {
              transform: translate(-50%, -50%) scale(0);
              opacity: 0;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.1);
            }
            100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
          }
          
          @keyframes checkmarkFade {
            to {
              transform: translate(-50%, -50%) scale(0.8);
              opacity: 0;
            }
          }
          
          @keyframes drawCheck {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Collection;
