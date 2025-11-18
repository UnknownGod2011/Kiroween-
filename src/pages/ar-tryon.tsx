import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles } from 'lucide-react';
import FloatingEmbers from '../components/FloatingEmbers';
import { getCartItems, type CartItem } from '../utils/cartStorage';

const ARTryOn = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<CartItem | null>(null);
  const [arPreview, setArPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const cartItems = getCartItems();

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setArPreview(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const applyARDesign = async () => {
    if (!uploadedImage || !selectedDesign || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load user image
    const userImg = new Image();
    userImg.crossOrigin = 'anonymous';
    userImg.onload = () => {
      canvas.width = userImg.width;
      canvas.height = userImg.height;

      // Draw user photo as base
      ctx.drawImage(userImg, 0, 0);

      // Load the t-shirt mockup with design
      const tshirtImg = new Image();
      tshirtImg.crossOrigin = 'anonymous';
      tshirtImg.onload = () => {
        // Calculate t-shirt placement on chest area
        // Assuming person is centered and facing camera
        const tshirtWidth = canvas.width * 0.35; // 35% of image width
        const tshirtHeight = tshirtWidth * 1.3; // T-shirt aspect ratio
        
        // Position on chest (adjust based on typical photo composition)
        const x = (canvas.width - tshirtWidth) / 2; // Center horizontally
        const y = canvas.height * 0.25; // Start at 25% from top (chest area)

        // Apply realistic blending
        ctx.save();
        
        // Add slight perspective transform for realism
        ctx.globalAlpha = 0.92; // Slightly transparent for natural look
        ctx.globalCompositeOperation = 'multiply'; // Blend with clothing
        
        // Draw t-shirt with design
        ctx.drawImage(tshirtImg, x, y, tshirtWidth, tshirtHeight);
        
        // Add shadow for depth
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.15;
        ctx.fillStyle = 'black';
        ctx.fillRect(x, y + tshirtHeight - 20, tshirtWidth, 20);
        
        ctx.restore();

        // Add subtle lighting effect
        ctx.globalCompositeOperation = 'overlay';
        ctx.globalAlpha = 0.1;
        const gradient = ctx.createLinearGradient(x, y, x + tshirtWidth, y + tshirtHeight);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, tshirtWidth, tshirtHeight);

        // Reset and save result
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        setArPreview(canvas.toDataURL('image/png'));
      };
      
      // Use the snapshot from cart (which includes the t-shirt with design)
      tshirtImg.src = selectedDesign.snapshotFront || selectedDesign.image;
    };
    userImg.src = uploadedImage;
  };

  const saveARPreview = () => {
    if (!arPreview) return;
    const link = document.createElement('a');
    link.download = 'ar-tryon-preview.png';
    link.href = arPreview;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black overflow-auto ar-tryon-page">
      {/* Floating Embers */}
      <FloatingEmbers count={6} />



      {/* Background Effects */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.2),_transparent_70%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(147,51,234,0.2),_transparent_70%)] animate-[pulse_6s_infinite_alternate]"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col pt-32 pb-40 px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 flex-shrink-0"
        >
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
            📱 AR Try-On
          </h1>
          <p className="text-purple-300 text-xl">
            See yourself wearing your haunted designs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 max-w-7xl mx-auto w-full">
          {/* Left: Upload & Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Upload Box */}
            <div
              className={`relative bg-gradient-to-br from-gray-900 to-purple-950 rounded-3xl p-8 border-2 transition-all duration-300 ${
                isDragging ? 'border-blue-500 scale-105' : 'border-purple-700/50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {!uploadedImage ? (
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="w-32 h-32 rounded-full bg-blue-900/50 flex items-center justify-center">
                      <Upload className="w-16 h-16 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-2">
                      Upload Your Photo
                    </h3>
                    <p className="text-purple-300">
                      Drag & drop or click to select
                    </p>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-full hover:scale-105 transition-all shadow-lg"
                  >
                    Choose Photo
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setArPreview(null);
                    }}
                    className="w-full px-6 py-3 bg-black/50 border-2 border-purple-700/50 text-purple-300 font-semibold rounded-full hover:bg-purple-900/50 transition-all"
                  >
                    Upload Different Photo
                  </button>
                </div>
              )}
            </div>

            {/* Design Selector */}
            {uploadedImage && (
              <div className="bg-gradient-to-br from-gray-900 to-purple-950 rounded-3xl p-8 border-2 border-purple-700/50">
                <h3 className="text-xl font-bold text-orange-400 mb-4">
                  Choose Design from Cart
                </h3>
                {cartItems.length === 0 ? (
                  <p className="text-purple-300">No designs in cart yet!</p>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedDesign(item)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                          selectedDesign?.id === item.id
                            ? 'bg-blue-600 border-2 border-blue-400'
                            : 'bg-black/50 border-2 border-purple-700/30 hover:border-blue-500/50'
                        }`}
                      >
                        <img
                          src={item.image}
                          alt="Design"
                          className="w-16 h-16 object-contain rounded-lg bg-white/10"
                        />
                        <div className="text-left">
                          <p className="text-white font-semibold">
                            {item.size} • {item.material}
                          </p>
                          <p className="text-sm text-purple-300">{item.color}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Apply Button */}
            {uploadedImage && selectedDesign && (
              <button
                onClick={applyARDesign}
                className="w-full px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold text-xl rounded-full hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <Sparkles className="w-6 h-6" />
                Apply AR Design
              </button>
            )}
          </motion.div>

          {/* Right: Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-gray-900 to-purple-950 rounded-3xl p-8 border-2 border-purple-700/50"
          >
            <h3 className="text-2xl font-bold text-blue-400 mb-6">AR Preview</h3>
            {arPreview ? (
              <div className="space-y-6">
                <img
                  src={arPreview}
                  alt="AR Preview"
                  className="w-full rounded-xl shadow-2xl"
                />
                <button
                  onClick={saveARPreview}
                  className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg"
                >
                  💾 Save AR Preview
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 border-2 border-dashed border-purple-700/50 rounded-xl">
                <p className="text-purple-400 text-center">
                  {!uploadedImage
                    ? 'Upload a photo to get started'
                    : !selectedDesign
                    ? 'Select a design from your cart'
                    : 'Click "Apply AR Design" to see preview'}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Footer - Fixed at Bottom */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 border-t border-purple-700/30 py-8 w-full" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="w-full px-6 text-center space-y-3">
          <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
            👻 SpookShirts
          </div>
          <p className="text-purple-300 text-sm">
            Haunted by AI. Forged in darkness.
          </p>
          <p className="text-purple-500 text-xs">
            © 2025 SpookShirts. Summoning terror onto fabric. 🕷️👻🎃
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ARTryOn;
