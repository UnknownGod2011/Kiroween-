import React from "react";
import { Sparkles } from "lucide-react";
import FloatingEmbers from "../components/FloatingEmbers";

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
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500 flex items-center justify-center space-x-3">
            <span className="animate-text-glow">👹 Cursed Collection</span>
            <Sparkles className="text-orange-400" size={32} />
          </h1>
          <p className="text-purple-300 mt-3 text-lg">
            Explore our haunted limited-edition premium designs.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) =>
            item.available ? (
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
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-orange-400">{item.name}</h2>
                  <p className="text-sm text-purple-300">{item.category}</p>
                  <p className="text-md font-bold text-orange-500 mt-1">{item.price}</p>
                </div>
              </div>
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
        `}
      </style>
    </div>
  );
};

export default Collection;
