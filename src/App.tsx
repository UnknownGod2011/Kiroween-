import { useState, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EnhancedTShirtMockup from './components/EnhancedTShirtMockup';
import CinematicHero from './components/CinematicHero';
import HauntedLayerSystem from './components/HauntedLayerSystem';
import MinimalDesignGenerator from './components/MinimalDesignGenerator';
import VampireBat3D from './components/VampireBat3D';
import SoundToggle from './components/SoundToggle';
import ScrollEffects from './components/ScrollEffects';
import ScrollTransitionZone from './components/ScrollTransitionZone';
import GuideGhost from './components/GuideGhost';
import FloatingEmbers from './components/FloatingEmbers';
import CriShirtLogo from './components/CriShirtLogo';
import Collection from './pages/collection';
import Cart from './pages/cart';
import SpookyImages from './pages/spooky-images';
import ARTryOn from './pages/ar-tryon';
import { useCart } from './context/CartContext';

function App() {
  const [tshirtColor, setTshirtColor] = useState('#FFFFFF'); // Default WHITE
  const [material, setMaterial] = useState('cotton');
  const [size, setSize] = useState('M');
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const [designFront, setDesignFront] = useState<string | undefined>();
  const [designBack, setDesignBack] = useState<string | undefined>();
  const { cartCount, updateCartCount } = useCart();
  const creatorRef = useRef<HTMLDivElement>(null);

  // Handler to update the correct design based on active side
  const handleDesignSelect = (design: string) => {
    if (activeSide === 'front') {
      setDesignFront(design);
    } else {
      setDesignBack(design);
    }
  };

  const scrollToCreator = () => {
    creatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'linear-gradient(to bottom, #0a0015 0%, #1a0a2e 50%, #0a0015 100%)' }}>
      {/* SINGLE Global Overlay - 50% darkness */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ 
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1 
        }}
      />
      
      {/* Floating Embers - Global - Doubled quantity, increased brightness */}
      <FloatingEmbers count={12} />
      
      {/* Vampire Bat 3D */}
      <VampireBat3D />
      
      {/* Sound toggle */}
      <SoundToggle />

      {/* CriShirt Logo - Top Left */}
      <div className="fixed top-8 left-8 z-50">
        <Link to="/">
          <CriShirtLogo />
        </Link>
      </div>

      {/* Floating Navigation - Positioned higher */}
      <nav className="fixed top-2 right-8 z-50 flex gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-black/80 backdrop-blur-sm border-2 border-orange-500/50 rounded-full text-orange-400 hover:bg-orange-500/20 hover:border-orange-500 transition-all duration-300 font-semibold"
        >
          🎃 Create
        </Link>
        <Link
          to="/spooky-images"
          className="px-6 py-3 bg-black/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-full text-purple-400 hover:bg-purple-500/20 hover:border-purple-500 transition-all duration-300 font-semibold"
        >
          👻 Spooky Images
        </Link>
        <Link
          to="/ar-tryon"
          className="px-6 py-3 bg-black/80 backdrop-blur-sm border-2 border-blue-500/50 rounded-full text-blue-400 hover:bg-blue-500/20 hover:border-blue-500 transition-all duration-300 font-semibold"
        >
          📱 AR Try-On
        </Link>
        <Link
          to="/collection"
          className="px-6 py-3 bg-black/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-full text-purple-400 hover:bg-purple-500/20 hover:border-purple-500 transition-all duration-300 font-semibold"
        >
          👹 Collection
        </Link>
        <Link
          to="/cart"
          className="px-6 py-3 bg-black/80 backdrop-blur-sm border-2 border-green-500/50 rounded-full text-green-400 hover:bg-green-500/20 hover:border-green-500 transition-all duration-300 font-semibold relative"
        >
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              {cartCount}
            </span>
          )}
        </Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative z-10">
              {/* Scroll Effects */}
              <ScrollEffects />
              
              {/* Unified Haunted Layer System for Hero */}
              <HauntedLayerSystem page="hero" />
              
              {/* Cinematic Hero Section */}
              <CinematicHero onBeginCurse={scrollToCreator} />

              {/* Scroll Transition Zone - Extended Journey */}
              <ScrollTransitionZone />

              {/* T-Shirt Creator Section - Forge */}
              <section ref={creatorRef} className="min-h-screen py-20 px-6 relative" style={{ background: 'transparent' }}>
                {/* Unified Haunted Layer System for Create */}
                <HauntedLayerSystem page="create" />
                
                <div className="max-w-7xl mx-auto space-y-16 relative z-10">
                  {/* Guide Ghost with Speech Bubbles */}
                  <GuideGhost />
                  
                  {/* Title - Haunted Typography with Red Mist - Moved Lower */}
                  <div className="text-center space-y-6 relative z-20" style={{ marginTop: '50px' }}>
                    <h2 className="forge-title-haunted text-7xl font-black">
                      Forge Your Design
                    </h2>
                    <p className="forge-subtitle text-2xl">Summon the darkness onto fabric</p>
                  </div>

                  {/* Design Generator */}
                  <div className="max-w-4xl mx-auto">
                    <MinimalDesignGenerator 
                      onDesignSelect={handleDesignSelect}
                    />
                  </div>

                  {/* T-Shirt Preview with Side Controls - Expanded Right Panel */}
                  <div className="relative flex items-center justify-center gap-12 max-w-7xl mx-auto">
                    {/* Center: T-Shirt */}
                    <div className="flex-shrink-0">
                      <div id="tshirt-preview-capture">
                        <EnhancedTShirtMockup
                          color={tshirtColor}
                          designFront={designFront}
                          designBack={designBack}
                          activeSide={activeSide}
                          onSideChange={setActiveSide}
                          material={material}
                          size={size}
                        />
                      </div>
                    </div>

                    {/* Right Side: Material, Size, Color, and Add to Cart - Expanded */}
                    <div className="flex flex-col gap-5" style={{ minWidth: '380px', maxWidth: '380px' }}>
                      {/* Front/Back Print Toggle */}
                      <div className="space-y-3">
                        <label className="text-orange-400 text-sm font-bold">Print Side</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setActiveSide('front')}
                            className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                              activeSide === 'front'
                                ? 'bg-gradient-to-r from-orange-600 to-purple-700 text-white shadow-lg'
                                : 'bg-black/50 border border-purple-700/30 text-purple-300 hover:border-orange-500/50'
                            }`}
                          >
                            👕 Front Print
                          </button>
                          <button
                            onClick={() => setActiveSide('back')}
                            className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                              activeSide === 'back'
                                ? 'bg-gradient-to-r from-orange-600 to-purple-700 text-white shadow-lg'
                                : 'bg-black/50 border border-purple-700/30 text-purple-300 hover:border-orange-500/50'
                            }`}
                          >
                            🔙 Back Print
                          </button>
                        </div>
                      </div>

                      {/* Material Selector - Expanded */}
                      <div className="space-y-3">
                        <label className="text-orange-400 text-sm font-bold">Material</label>
                        <div className="grid grid-cols-3 gap-2">
                          {['cotton', 'polyester', 'blend'].map((mat) => (
                            <button
                              key={mat}
                              onClick={() => setMaterial(mat)}
                              className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                                material === mat
                                  ? 'bg-gradient-to-r from-orange-600 to-purple-700 text-white shadow-lg'
                                  : 'bg-black/50 border border-purple-700/30 text-purple-300 hover:border-orange-500/50'
                              }`}
                            >
                              {mat.charAt(0).toUpperCase() + mat.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Size Selector - Expanded */}
                      <div className="space-y-3">
                        <label className="text-orange-400 text-sm font-bold">Size</label>
                        <div className="grid grid-cols-3 gap-2">
                          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                            <button
                              key={s}
                              onClick={() => setSize(s)}
                              className={`px-3 py-3 rounded-lg text-sm font-semibold transition-all ${
                                size === s
                                  ? 'bg-gradient-to-r from-orange-600 to-purple-700 text-white shadow-lg'
                                  : 'bg-black/50 border border-purple-700/30 text-purple-300 hover:border-orange-500/50'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Color Selector - Expanded */}
                      <div className="space-y-3">
                        <label className="text-orange-400 text-sm font-bold flex items-center gap-2">
                          Color
                          <span className="text-xs text-purple-300 font-normal">
                            {tshirtColor}
                          </span>
                        </label>
                        
                        {/* Mini Gradient Slider */}
                        <div className="relative">
                          <input
                            type="range"
                            min="0"
                            max="360"
                            value={(() => {
                              const r = parseInt(tshirtColor.slice(1, 3), 16) / 255;
                              const g = parseInt(tshirtColor.slice(3, 5), 16) / 255;
                              const b = parseInt(tshirtColor.slice(5, 7), 16) / 255;
                              const max = Math.max(r, g, b);
                              const min = Math.min(r, g, b);
                              const delta = max - min;
                              if (delta === 0) return 0;
                              let hue = 0;
                              if (max === r) hue = ((g - b) / delta) % 6;
                              else if (max === g) hue = (b - r) / delta + 2;
                              else hue = (r - g) / delta + 4;
                              hue = Math.round(hue * 60);
                              if (hue < 0) hue += 360;
                              return hue;
                            })()}
                            onChange={(e) => {
                              const hue = parseInt(e.target.value);
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
                              setTshirtColor(`#${toHex(r)}${toHex(g)}${toHex(b)}`);
                            }}
                            className="w-full h-6 rounded-full appearance-none cursor-pointer"
                            style={{
                              background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
                            }}
                          />
                        </div>

                        {/* Quick Color Presets */}
                        <div className="grid grid-cols-4 gap-1.5">
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
                              onClick={() => setTshirtColor(color.value)}
                              className={`w-full h-6 rounded transition-all ${
                                tshirtColor === color.value
                                  ? 'ring-2 ring-orange-500 scale-110'
                                  : 'ring-1 ring-purple-700/30 hover:ring-orange-500/50'
                              }`}
                              style={{ backgroundColor: color.value }}
                              title={color.name}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Add to Cart Button - Captures Both Front & Back */}
                      <button
                        onClick={async () => {
                          const element = document.getElementById('tshirt-preview-capture');
                          if (!element) return;
                          
                          const html2canvas = (await import('html2canvas')).default;
                          const currentSide = activeSide;
                          
                          // Capture FRONT snapshot
                          setActiveSide('front');
                          await new Promise(resolve => setTimeout(resolve, 200));
                          const canvasFront = await html2canvas(element, {
                            backgroundColor: null,
                            scale: 2,
                            useCORS: true,
                            allowTaint: false,
                            logging: false,
                          });
                          const snapshotFront = canvasFront.toDataURL('image/png');
                          
                          // Capture BACK snapshot
                          setActiveSide('back');
                          await new Promise(resolve => setTimeout(resolve, 200));
                          const canvasBack = await html2canvas(element, {
                            backgroundColor: null,
                            scale: 2,
                            useCORS: true,
                            allowTaint: false,
                            logging: false,
                          });
                          const snapshotBack = canvasBack.toDataURL('image/png');
                          
                          // Restore original side
                          setActiveSide(currentSide);
                          
                          // Store snapshots globally for AR page
                          (window as any).arSnapshots = {
                            front: snapshotFront,
                            back: snapshotBack,
                          };
                          
                          const { addToCart } = await import('./utils/cartStorage');
                          addToCart({
                            image: snapshotFront, // Backward compatibility
                            snapshotFront,
                            snapshotBack,
                            color: tshirtColor,
                            material,
                            size,
                            designFront: designFront || null,
                            designBack: designBack || null,
                          });
                          
                          updateCartCount();
                          
                          // Show haunted success toast
                          const successDiv = document.createElement('div');
                          successDiv.className = 'haunted-toast';
                          successDiv.innerHTML = '<span class="ghost-icon">👻</span><span>Cursed item added to your cart…</span>';
                          document.body.appendChild(successDiv);
                          setTimeout(() => successDiv.remove(), 3000);
                        }}
                        className="haunted-cart-button group relative px-6 py-5 text-xl font-black text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 mt-6"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          <span className="text-3xl">🛒</span>
                          <span>Add to Cart</span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                    </div>
                  </div>


                </div>
              </section>
            </div>
          }
        />
        <Route 
          path="/collection" 
          element={
            <div className="relative">
              <HauntedLayerSystem page="collection" />
              <Collection />
            </div>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <div className="relative">
              <HauntedLayerSystem page="cart" />
              <Cart />
            </div>
          } 
        />
        <Route 
          path="/spooky-images" 
          element={
            <div className="relative">
              <HauntedLayerSystem page="spooky-images" />
              <SpookyImages />
            </div>
          } 
        />
        <Route 
          path="/ar-tryon" 
          element={<ARTryOn />} 
        />
      </Routes>

      {/* Minimal Footer - Full Width Bottom - NOT on AR page */}
      {window.location.pathname !== '/ar-tryon' && (
        <footer className="relative z-10 border-t border-purple-700/30 py-12 w-full mt-auto" style={{ background: 'transparent' }}>
          <div className="w-full px-6 text-center space-y-4">
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
              👻 SpookShirts
            </div>
            <p className="text-purple-300">
              Haunted by AI. Forged in darkness.
            </p>
            <p className="text-purple-500 text-sm">
              © 2025 SpookShirts. Summoning terror onto fabric. 🕷️👻🎃
            </p>
          </div>
        </footer>
      )}

      {/* Global Styles */}
      <style>
        {`
          /* Haunted Forge Title - Reduced Glow, Sharper Text */
          .forge-title-haunted {
            background: linear-gradient(to bottom, #ffffff 0%, #e9d5ff 50%, #c084fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: blur(0.2px);
            text-shadow:
              /* Reduced lavender glow - 40% less opacity, 30% less blur */
              0 0 12px rgba(200, 147, 255, 0.54),
              0 0 24px rgba(147, 51, 234, 0.42),
              0 0 36px rgba(139, 92, 246, 0.3),
              /* Subtle shadow for depth */
              3px 3px 6px rgba(0, 0, 0, 0.9);
            animation: haunted-flicker 3s ease-in-out infinite;
            letter-spacing: 0.05em;
            font-weight: 900;
          }

          /* Elegant Haunted Subtitle */
          .forge-subtitle {
            font-family: 'Cinzel', 'Cormorant Garamond', 'Spectral', serif;
            font-weight: 600;
            letter-spacing: 1px;
            color: #C8A9FF;
            text-shadow: 0 0 8px rgba(200, 169, 255, 0.3);
          }

          @keyframes haunted-flicker {
            0%, 100% { 
              opacity: 0.95;
              filter: blur(0.2px);
              text-shadow:
                0 0 12px rgba(200, 147, 255, 0.54),
                0 0 24px rgba(147, 51, 234, 0.42),
                0 0 36px rgba(139, 92, 246, 0.3),
                3px 3px 6px rgba(0, 0, 0, 0.9);
            }
            50% { 
              opacity: 1;
              filter: blur(0.25px);
              text-shadow:
                0 0 14px rgba(200, 147, 255, 0.6),
                0 0 28px rgba(147, 51, 234, 0.48),
                0 0 42px rgba(139, 92, 246, 0.36),
                3px 3px 6px rgba(0, 0, 0, 0.9);
            }
          }

          /* Small blood drip */}
          .blood-drip-small {
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #ff0000 0%, #8b0000 100%);
            border-radius: 50% 50% 50% 0;
            animation: blood-drop-small 5s ease-in infinite;
            opacity: 0;
            filter: drop-shadow(0 0 4px rgba(255, 0, 0, 0.8));
          }

          @keyframes blood-drop-small {
            0% { opacity: 0; transform: translateX(-50%) translateY(0); }
            10% { opacity: 1; }
            30% { opacity: 1; transform: translateX(-50%) translateY(20px); }
            40% { opacity: 0; transform: translateX(-50%) translateY(30px); }
            100% { opacity: 0; transform: translateX(-50%) translateY(0); }
          }

          /* Spooky Cart Button */}
          .spooky-cart-button button {
            box-shadow: 
              0 0 20px rgba(147, 51, 234, 0.4),
              0 0 40px rgba(255, 107, 0, 0.3),
              0 4px 12px rgba(0, 0, 0, 0.5);
            animation: spooky-pulse 3s ease-in-out infinite;
          }

          @keyframes spooky-pulse {
            0%, 100% {
              box-shadow: 
                0 0 20px rgba(147, 51, 234, 0.4),
                0 0 40px rgba(255, 107, 0, 0.3),
                0 4px 12px rgba(0, 0, 0, 0.5);
            }
            50% {
              box-shadow: 
                0 0 30px rgba(147, 51, 234, 0.6),
                0 0 60px rgba(255, 107, 0, 0.5),
                0 6px 16px rgba(0, 0, 0, 0.6);
            }
          }

          /* Haunted Add to Cart Button */
          .haunted-cart-button {
            position: relative;
            z-index: 9999;
            background: linear-gradient(135deg, #7c3aed 0%, #c026d3 50%, #ea580c 100%);
            border: 2px solid rgba(147, 51, 234, 0.8);
            box-shadow: 
              0 0 20px rgba(147, 51, 234, 0.8),
              0 0 40px rgba(255, 107, 0, 0.6),
              0 0 60px rgba(192, 38, 211, 0.4),
              inset 0 0 20px rgba(255, 255, 255, 0.1);
            animation: haunted-cart-glow 2s ease-in-out infinite;
          }

          @keyframes haunted-cart-glow {
            0%, 100% {
              box-shadow: 
                0 0 20px rgba(147, 51, 234, 0.8),
                0 0 40px rgba(255, 107, 0, 0.6),
                0 0 60px rgba(192, 38, 211, 0.4),
                inset 0 0 20px rgba(255, 255, 255, 0.1);
            }
            50% {
              box-shadow: 
                0 0 30px rgba(147, 51, 234, 1),
                0 0 60px rgba(255, 107, 0, 0.8),
                0 0 90px rgba(192, 38, 211, 0.6),
                inset 0 0 30px rgba(255, 255, 255, 0.2);
            }
          }

          /* Haunted Toast - Dripping Blood Style */
          .haunted-toast {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #1a0a0a, #3d0a0a);
            color: #ff3333;
            padding: 24px 48px;
            border-radius: 20px;
            font-size: 26px;
            font-weight: 900;
            z-index: 9999;
            border: 3px solid #ff0000;
            box-shadow: 
              0 0 40px rgba(255, 0, 0, 0.8),
              0 0 80px rgba(255, 0, 0, 0.5),
              inset 0 0 30px rgba(255, 0, 0, 0.2);
            animation: haunted-toast-appear 3s ease-out forwards;
            display: flex;
            align-items: center;
            gap: 16px;
            text-shadow: 
              0 0 10px rgba(255, 0, 0, 1),
              0 0 20px rgba(255, 0, 0, 0.8),
              2px 2px 4px rgba(0, 0, 0, 0.9);
          }

          .haunted-toast .ghost-icon {
            font-size: 36px;
            animation: ghost-shake 0.5s ease-in-out infinite;
          }

          @keyframes haunted-toast-appear {
            0% { 
              opacity: 0; 
              transform: translate(-50%, -50%) scale(0.5) rotate(-5deg); 
            }
            10% { 
              opacity: 1; 
              transform: translate(-50%, -50%) scale(1.1) rotate(2deg); 
            }
            15% { 
              transform: translate(-50%, -50%) scale(0.95) rotate(-1deg); 
            }
            20% { 
              transform: translate(-50%, -50%) scale(1) rotate(0deg); 
            }
            80% { 
              opacity: 1; 
              transform: translate(-50%, -50%) scale(1) rotate(0deg); 
            }
            100% { 
              opacity: 0; 
              transform: translate(-50%, -50%) scale(0.8) rotate(5deg); 
            }
          }

          @keyframes ghost-shake {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            25% { transform: translateX(-3px) rotate(-2deg); }
            75% { transform: translateX(3px) rotate(2deg); }
          }

          body {
            background: #000000;
            overflow-x: hidden;
          }
          
          * {
            scrollbar-width: thin;
            scrollbar-color: #a259ff #000000;
          }
          
          *::-webkit-scrollbar {
            width: 8px;
          }
          
          *::-webkit-scrollbar-track {
            background: #000000;
          }
          
          *::-webkit-scrollbar-thumb {
            background: #a259ff;
            border-radius: 4px;
          }
          
          *::-webkit-scrollbar-thumb:hover {
            background: #ff6b00;
          }
        `}
      </style>
    </div>
  );
}

export default App;
