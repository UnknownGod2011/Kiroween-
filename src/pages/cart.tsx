import { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingEmbers from '../components/FloatingEmbers';
import FlyingBat from '../components/FlyingBat';
import { getCartItems, removeFromCart, updateCartItemQuantity, clearCart, type CartItem } from '../utils/cartStorage';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { updateCartCount } = useCart();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    setCartItems(getCartItems());
    updateCartCount();
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    loadCart();
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      updateCartItemQuantity(id, item.quantity + delta);
      loadCart();
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Clear all items from cart?')) {
      clearCart();
      loadCart();
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Floating Embers */}
      <FloatingEmbers count={6} />

      {/* Spooky Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,107,0,0.2),_transparent_70%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(162,89,255,0.2),_transparent_70%)] animate-[pulse_6s_infinite_alternate]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1"></div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-purple-500">
              🛒 Your Cursed Cart
            </h1>
            <div className="flex-1 flex justify-end pr-8">
              <button
                onClick={() => setShowSkeleton(!showSkeleton)}
                className="px-4 py-2 bg-purple-900/50 border border-purple-700/50 rounded-full text-purple-300 hover:bg-purple-900/70 hover:border-purple-500 transition-all text-sm"
                title={showSkeleton ? 'Hide ghost' : 'Show ghost'}
              >
                👻 {showSkeleton ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <p className="text-purple-300 text-lg">
            {totalItems > 0 ? `${totalItems} haunted ${totalItems === 1 ? 'item' : 'items'} awaiting summoning` : 'Your cart is empty... like a haunted tomb!'}
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div
              className="bg-gradient-to-br from-gray-900 to-purple-950 border-2 border-purple-700/50 shadow-2xl backdrop-blur-2xl rounded-3xl p-10 max-w-md w-full flex flex-col items-center space-y-6"
              style={{
                boxShadow: `
                  0 0 60px 10px rgba(162, 89, 255, 0.3),
                  0 0 100px 20px rgba(0, 0, 0, 0.8),
                  inset 0 0 80px 10px rgba(0, 0, 0, 0.5)
                `,
              }}
            >
              <ShoppingCart className="w-16 h-16 text-orange-400 drop-shadow-[0_0_20px_rgba(255,107,0,0.6)]" />
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
                No cursed tees yet! 👻
              </h2>
              <p className="text-purple-300 text-center">
                Even ghosts need shirts! Start creating your haunted designs.
              </p>

              {/* Spooky Categories */}
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Cursed Tees', 'Haunted Hoodies', 'Zombie Joggers', 'Ghost Shorts', 'Vampire Tanks', 'Demon Sleeves', 'Witch Polos'].map(
                  (cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 text-sm bg-purple-900/50 border border-purple-700/50 rounded-full text-purple-300 hover:bg-orange-900/50 hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300 cursor-pointer"
                    >
                      {cat}
                    </span>
                  )
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link
                  to="/collection"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-600 to-purple-700 text-white font-semibold hover:scale-105 transition-all shadow-lg shadow-orange-900/50 hover:shadow-orange-900/70"
                >
                  🎃 Summon Designs
                </Link>
                <Link
                  to="/"
                  className="px-8 py-3 rounded-full bg-black/50 border-2 border-purple-700/50 text-purple-300 font-semibold hover:bg-purple-900/50 hover:border-orange-500/50 hover:text-orange-400 hover:scale-105 transition-all"
                >
                  👻 Create Custom
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Cart Items Grid */
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={handleClearCart}
                className="px-6 py-2 bg-red-900/50 border-2 border-red-700/50 rounded-full text-red-300 hover:bg-red-900/70 hover:border-red-500 transition-all duration-300 flex items-center gap-2"
              >
                <Trash2 size={16} />
                Clear Cart
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-900 to-purple-950 border-2 border-purple-700/50 rounded-2xl overflow-hidden shadow-2xl hover:shadow-orange-900/50 hover:border-orange-500/50 transition-all duration-300"
                  >
                    {/* T-Shirt Images - Front & Back Side by Side */}
                    <div className="relative w-full flex items-center justify-center gap-2 p-4" style={{ height: '280px', maxHeight: '280px', background: '#0a0a0a' }}>
                      {/* Front */}
                      <div className="flex-1 h-full flex flex-col items-center">
                        <p className="text-xs text-purple-400 mb-1">Front</p>
                        <img
                          src={item.snapshotFront || item.image}
                          alt="Front Design"
                          className="w-full h-full object-contain"
                          style={{ 
                            maxWidth: '100%', 
                            maxHeight: '100%', 
                            background: 'transparent',
                            imageRendering: 'crisp-edges'
                          }}
                          onError={(e) => {
                            console.error('Failed to load front image');
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      
                      {/* Back */}
                      {item.snapshotBack && (
                        <div className="flex-1 h-full flex flex-col items-center">
                          <p className="text-xs text-purple-400 mb-1">Back</p>
                          <img
                            src={item.snapshotBack}
                            alt="Back Design"
                            className="w-full h-full object-contain"
                            style={{ 
                              maxWidth: '100%', 
                              maxHeight: '100%', 
                              background: 'transparent',
                              imageRendering: 'crisp-edges'
                            }}
                            onError={(e) => {
                              console.error('Failed to load back image');
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-orange-400 font-semibold">{item.designName || 'Custom Design'}</p>
                          <p className="text-sm text-purple-300">
                            {item.material} • {item.size}
                          </p>
                          <div
                            className="w-6 h-6 rounded-full border-2 border-purple-500/50 mt-2"
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-black/50 rounded-full px-3 py-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="text-purple-400 hover:text-purple-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="p-2 bg-red-900/50 border border-red-700/50 rounded-full text-red-300 hover:bg-red-900/70 hover:border-red-500 transition-all duration-300"
                          title="Remove from cart"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <p className="text-xs text-purple-400">
                        Added: {new Date(item.dateAdded).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Checkout Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <div className="bg-gradient-to-br from-gray-900 to-purple-950 border-2 border-purple-700/50 rounded-3xl p-8 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-orange-400 mb-4">Ready to Summon?</h3>
                <p className="text-purple-300 mb-6">
                  Total Items: <span className="text-white font-bold">{totalItems}</span>
                </p>
                <button className="w-full px-12 py-4 text-xl font-bold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:shadow-[0_0_60px_rgba(16,185,129,0.9)]">
                  🎃 Proceed to Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Haunted Skeleton - Fixed Right Side */}
      {showSkeleton && (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
          {/* Speech Bubble */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mb-4 animate-float-bubble"
          >
            <div 
              className="bg-gradient-to-br from-gray-900 to-purple-950 border-2 border-orange-500/50 rounded-2xl p-4 shadow-2xl"
              style={{
                boxShadow: '0 0 30px rgba(255, 107, 0, 0.4)',
              }}
            >
              <p className="text-orange-400 font-bold text-base text-center whitespace-nowrap">
                This is your haunted cart...
              </p>
            </div>
            {/* Speech bubble tail pointing down-right */}
            <div 
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '12px solid transparent',
                borderRight: '12px solid transparent',
                borderTop: '12px solid rgba(147, 51, 234, 0.8)',
              }}
            />
          </motion.div>

          {/* Ghost Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-48 h-64 animate-skeleton-float"
          >
            {/* Ghost image with transparent background */}
            <img
              src="/assets/haunted/Ghost1.png"
              alt="Haunted Ghost"
              className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,107,0,0.7)]"
            />
          </motion.div>
        </div>
      )}

      {/* Skeleton Animations */}
      <style>
        {`
          @keyframes skeleton-float {
            0%, 100% {
              transform: translateY(0px) rotate(-2deg);
            }
            50% {
              transform: translateY(-15px) rotate(2deg);
            }
          }
          .animate-skeleton-float {
            animation: skeleton-float 3s ease-in-out infinite;
          }

          @keyframes float-bubble {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }
          .animate-float-bubble {
            animation: float-bubble 2.5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
