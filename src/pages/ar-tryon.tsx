import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles } from 'lucide-react';
import FloatingEmbers from '../components/FloatingEmbers';
import { getCartItems, type CartItem } from '../utils/cartStorage';

type BackendType = 'python-viton' | 'deepfashion';

const BACKENDS = {
  'python-viton': {
    name: 'Python VITON (Quick Start)',
    url: 'http://localhost:8001',
    endpoint: '/api/tryon',
    status: '✅ Working',
    description: 'Fast, no setup needed'
  },
  'deepfashion': {
    name: 'DeepFashion Try-On (CVPR 2020)',
    url: 'http://localhost:8000',
    endpoint: '/api/tryon',
    status: '⚠️ Requires checkpoints',
    description: 'Photo-realistic, state-of-the-art'
  }
};

const ARTryOn = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<CartItem | null>(null);
  const [selectedSide, setSelectedSide] = useState<'front' | 'back'>('front');
  const [selectedBackend, setSelectedBackend] = useState<BackendType>('python-viton');
  const [arPreview, setArPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
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
    if (!uploadedImage || !selectedDesign) {
      alert('Please upload a photo and select a design first!');
      return;
    }

    setIsProcessing(true);
    setArPreview(null);

    try {
      console.log('🎭 Starting Python VITON virtual try-on...');

      const tshirtImage = selectedSide === 'front' 
        ? (selectedDesign.snapshotFront || selectedDesign.image)
        : (selectedDesign.snapshotBack || selectedDesign.snapshotFront || selectedDesign.image);
      
      if (!tshirtImage) {
        alert('No t-shirt image found.');
        setIsProcessing(false);
        return;
      }

      // Extract base64 data
      const personBase64 = uploadedImage.includes(',') 
        ? uploadedImage.split(',')[1] 
        : uploadedImage;

      const garmentBase64 = tshirtImage.includes(',')
        ? tshirtImage.split(',')[1]
        : tshirtImage;

      const backend = BACKENDS[selectedBackend];
      console.log(`📤 Sending to ${backend.name} server...`);

      // Call selected backend
      const response = await fetch(`${backend.url}${backend.endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personImage: personBase64,
          clothImage: garmentBase64
        })
      });

      console.log('📥 Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Error:', errorData);
        
        if (response.status === 0 || !response.status) {
          alert(`${backend.name} server is not running!\n\nPlease start the appropriate backend server.`);
        } else {
          alert(`Error: ${errorData.error || 'Virtual try-on failed'}`);
        }
        setIsProcessing(false);
        return;
      }

      const data = await response.json();
      
      if (data.success && data.resultImage) {
        setArPreview(`data:image/png;base64,${data.resultImage}`);
        console.log('✅ Virtual try-on complete!');
      } else {
        alert(data.error || 'No result image returned');
      }

    } catch (error) {
      console.error('❌ Error:', error);
      
      const backend = BACKENDS[selectedBackend];
      if (error instanceof TypeError && error.message.includes('fetch')) {
        alert(`Cannot connect to ${backend.name} server!\n\nPlease start the backend server.`);
      } else {
        alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } finally {
      setIsProcessing(false);
    }
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
                    <p className="text-purple-300 mb-2">
                      Drag & drop or click to select
                    </p>
                    <div className="text-sm text-purple-400/70 space-y-1">
                      <p>💡 Tips for best results:</p>
                      <p>• Use a clear, front-facing photo</p>
                      <p>• Stand straight with arms at sides</p>
                      <p>• Good lighting, simple background</p>
                      <p>• Make sure VITON-IT server is running</p>
                    </div>
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

            {/* Backend Selector */}
            {uploadedImage && (
              <div className="bg-gradient-to-br from-gray-900 to-purple-950 rounded-3xl p-8 border-2 border-purple-700/50 space-y-4">
                <h3 className="text-xl font-bold text-blue-400">
                  🔧 Select Backend
                </h3>
                <div className="space-y-2">
                  {(Object.keys(BACKENDS) as BackendType[]).map((key) => {
                    const backend = BACKENDS[key];
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedBackend(key)}
                        className={`w-full text-left p-4 rounded-xl transition-all ${
                          selectedBackend === key
                            ? 'bg-blue-600 border-2 border-blue-400'
                            : 'bg-black/50 border-2 border-purple-700/30 hover:border-blue-500/50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-white font-semibold">{backend.name}</p>
                            <p className="text-sm text-purple-300">{backend.description}</p>
                          </div>
                          <span className="text-xs">{backend.status}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Design Selector */}
            {uploadedImage && (
              <div className="bg-gradient-to-br from-gray-900 to-purple-950 rounded-3xl p-8 border-2 border-purple-700/50 space-y-6">
                <h3 className="text-xl font-bold text-orange-400">
                  Choose Design from Cart
                </h3>
                {cartItems.length === 0 ? (
                  <p className="text-purple-300">No designs in cart yet!</p>
                ) : (
                  <>
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSelectedDesign(item);
                            setArPreview(null); // Reset preview when changing design
                          }}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                            selectedDesign?.id === item.id
                              ? 'bg-blue-600 border-2 border-blue-400'
                              : 'bg-black/50 border-2 border-purple-700/30 hover:border-blue-500/50'
                          }`}
                        >
                          <img
                            src={item.snapshotFront || item.image}
                            alt="Design"
                            className="w-16 h-16 object-contain rounded-lg"
                            style={{ background: 'transparent' }}
                          />
                          <div className="text-left flex-1">
                            <p className="text-white font-semibold">
                              {item.designName || 'Custom Design'}
                            </p>
                            <p className="text-sm text-purple-300">
                              {item.size} • {item.material}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Front/Back Selector */}
                    {selectedDesign && selectedDesign.snapshotBack && (
                      <div className="pt-4 border-t border-purple-700/30">
                        <p className="text-sm text-purple-300 mb-3">Select Side:</p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setSelectedSide('front');
                              setArPreview(null);
                            }}
                            className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                              selectedSide === 'front'
                                ? 'bg-blue-600 text-white border-2 border-blue-400'
                                : 'bg-black/50 text-purple-300 border-2 border-purple-700/30 hover:border-blue-500/50'
                            }`}
                          >
                            Front
                          </button>
                          <button
                            onClick={() => {
                              setSelectedSide('back');
                              setArPreview(null);
                            }}
                            className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                              selectedSide === 'back'
                                ? 'bg-blue-600 text-white border-2 border-blue-400'
                                : 'bg-black/50 text-purple-300 border-2 border-purple-700/30 hover:border-blue-500/50'
                            }`}
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Apply Button */}
            {uploadedImage && selectedDesign && (
              <button
                onClick={applyARDesign}
                disabled={isProcessing}
                className={`w-full px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold text-xl rounded-full transition-all shadow-lg flex items-center justify-center gap-3 ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                <Sparkles className={`w-6 h-6 ${isProcessing ? 'animate-pulse' : ''}`} />
                {isProcessing ? 'Creating Preview...' : 'Apply Virtual Try-On'}
              </button>
            )}
          </motion.div>

          {/* Right: Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-gray-900 to-purple-950 rounded-3xl p-8 border-2 border-purple-700/50 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-blue-400">AR Preview</h3>
              
              {/* Quick Load from Cart Dropdown */}
              {cartItems.length > 0 && (
                <select
                  onChange={(e) => {
                    const item = cartItems.find(i => i.id === e.target.value);
                    if (item) {
                      setSelectedDesign(item);
                      setSelectedSide('front');
                      setArPreview(null);
                    }
                  }}
                  className="px-4 py-2 bg-black/50 border-2 border-purple-700/50 rounded-xl text-purple-300 text-sm hover:border-blue-500/50 transition-all cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>Load from Cart</option>
                  {cartItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.designName || 'Custom Design'}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {isProcessing ? (
              <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-purple-700/50 rounded-xl space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 border-8 border-purple-700/30 border-t-blue-500 rounded-full animate-spin"></div>
                  <Sparkles className="w-12 h-12 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-blue-400 text-xl font-bold">AI Processing...</p>
                  <p className="text-purple-300 text-sm">VITON-IT is generating your try-on...</p>
                  <p className="text-purple-400/70 text-xs">This takes 10-30 seconds</p>
                </div>
              </div>
            ) : arPreview ? (
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
                <p className="text-purple-400 text-center px-6">
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
    </div>
  );
};

export default ARTryOn;
