import { useState, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles } from 'lucide-react';
import FloatingEmbers from '../components/FloatingEmbers';
import ASCIIText from '../components/ASCIIText';
import { getCartItems, type CartItem } from '../utils/cartStorage';

type BackendType = 'miragic' | 'python-viton' | 'deepfashion';

const BACKENDS = {
  'miragic': {
    name: 'Miragic',
    url: 'http://localhost:5000',
    endpoint: '/api/miragic/tryon',
    status: '✅ Available',
    description: 'Cloud API',
    available: true
  },
  'python-viton': {
    name: 'Python VITON',
    url: 'http://localhost:8001',
    endpoint: '/api/tryon',
    status: '🔒 Local Only',
    description: 'Requires local setup',
    available: false
  },
  'deepfashion': {
    name: 'DeepFashion',
    url: 'http://localhost:8000',
    endpoint: '/api/tryon',
    status: '🔒 Local Only',
    description: 'Requires local setup',
    available: false
  }
};

const ARTryOn = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<CartItem | null>(null);
  const [selectedSide, setSelectedSide] = useState<'front' | 'back'>('front');
  const [selectedBackend, setSelectedBackend] = useState<BackendType>('miragic');
  const [arPreview, setArPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const cartItems = useMemo(() => getCartItems(), []);

  const handleFileSelect = useCallback(async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      // Optimize: Use createObjectURL for instant preview
      const objectUrl = URL.createObjectURL(file);
      
      // Compress image if too large
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Max dimensions for faster processing
        const MAX_WIDTH = 1024;
        const MAX_HEIGHT = 1024;
        
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with optimized quality
        const optimizedImage = canvas.toDataURL('image/jpeg', 0.85);
        setUploadedImage(optimizedImage);
        setArPreview(null);
        
        // Clean up object URL
        URL.revokeObjectURL(objectUrl);
      };
      
      img.src = objectUrl;
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const applyARDesign = async () => {
    if (!uploadedImage || !selectedDesign) {
      alert('Please upload a photo and select a design first!');
      return;
    }

    setIsProcessing(true);
    setArPreview(null);

    try {
      // Fix: Properly handle front/back design selection
      const tshirtImage = selectedSide === 'front' 
        ? (selectedDesign.snapshotFront || selectedDesign.image)
        : selectedDesign.snapshotBack;
      
      if (!tshirtImage) {
        alert(`No ${selectedSide} design available for this item.`);
        setIsProcessing(false);
        return;
      }

      // Extract base64 data
      const personBase64 = uploadedImage.includes(',') 
        ? uploadedImage.split(',')[1] 
        : uploadedImage;

      const backend = BACKENDS[selectedBackend];

      // Declare garmentBase64 outside to be accessible in both branches
      let garmentBase64: string;

      // Handle Miragic API with polling
      if (selectedBackend === 'miragic') {

        // Check if this is a pre-made mockup from collection (skip compositing)
        if (selectedDesign.isPreMadeMockup) {
          console.log('📦 Using pre-made mockup (collection item)');
          
          // If it's a file path, convert to base64
          if (tshirtImage.startsWith('/') || tshirtImage.startsWith('http')) {
            console.log('🔄 Converting image path to base64...');
            try {
              const response = await fetch(tshirtImage);
              const blob = await response.blob();
              const base64 = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const result = reader.result as string;
                  resolve(result.includes(',') ? result.split(',')[1] : result);
                };
                reader.readAsDataURL(blob);
              });
              garmentBase64 = base64;
            } catch (error) {
              console.error('Failed to load collection image:', error);
              alert('Failed to load t-shirt image');
              setIsProcessing(false);
              return;
            }
          } else {
            // Already base64
            garmentBase64 = tshirtImage.includes(',')
              ? tshirtImage.split(',')[1]
              : tshirtImage;
          }
        } else {
          // Step 0: Composite design onto t-shirt mockup for generated designs
          console.log('🎨 Compositing design onto t-shirt...');
          const compositeResponse = await fetch('http://localhost:5000/api/composite-tshirt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              designImage: tshirtImage,
              color: selectedDesign.color || '#3B82F6',
              side: selectedSide
            })
          });

          if (!compositeResponse.ok) {
            alert('Failed to prepare t-shirt image');
            setIsProcessing(false);
            return;
          }

          const compositeData = await compositeResponse.json();
          garmentBase64 = compositeData.image.includes(',')
            ? compositeData.image.split(',')[1]
            : compositeData.image;
        }

        // Step 1: Start the try-on job
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

        if (!response.ok) {
          const errorData = await response.json();
          alert(`Error: ${errorData.error || 'Failed to start virtual try-on'}`);
          setIsProcessing(false);
          return;
        }

        const data = await response.json();
        
        if (!data.success || !data.jobId) {
          alert('Failed to create try-on job');
          setIsProcessing(false);
          return;
        }

        const jobId = data.jobId;

        // Step 2: Poll for completion
        const maxAttempts = 60; // 60 attempts * 2 seconds = 2 minutes max
        let attempts = 0;
        let completed = false;

        while (attempts < maxAttempts && !completed) {
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
          attempts++;

          const statusResponse = await fetch(`${backend.url}${backend.endpoint}/${jobId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (!statusResponse.ok) {
            continue;
          }

          const statusData = await statusResponse.json();

          if (statusData.status === 'COMPLETED') {
            if (statusData.processedUrl) {
              // Download the image and convert to base64
              const imageResponse = await fetch(statusData.processedUrl);
              const imageBlob = await imageResponse.blob();
              const reader = new FileReader();
              
              reader.onloadend = () => {
                setArPreview(reader.result as string);
              };
              
              reader.readAsDataURL(imageBlob);
              completed = true;
            } else {
              alert('No result image URL returned');
              setIsProcessing(false);
              return;
            }
          } else if (statusData.status === 'FAILED') {
            alert(`Try-on failed: ${statusData.errorMessage || 'Unknown error'}`);
            setIsProcessing(false);
            return;
          }
          // Continue polling if status is PENDING
        }

        if (!completed) {
          alert('Try-on is taking too long. Please try again.');
          setIsProcessing(false);
          return;
        }

      } else {
        // Handle other backends (python-viton, deepfashion)
        
        // Prepare garment image for other backends
        if (selectedDesign.isPreMadeMockup) {
          // If it's a file path, convert to base64
          if (tshirtImage.startsWith('/') || tshirtImage.startsWith('http')) {
            try {
              const response = await fetch(tshirtImage);
              const blob = await response.blob();
              const base64 = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const result = reader.result as string;
                  resolve(result.includes(',') ? result.split(',')[1] : result);
                };
                reader.readAsDataURL(blob);
              });
              garmentBase64 = base64;
            } catch (error) {
              console.error('Failed to load collection image:', error);
              alert('Failed to load t-shirt image');
              setIsProcessing(false);
              return;
            }
          } else {
            garmentBase64 = tshirtImage.includes(',')
              ? tshirtImage.split(',')[1]
              : tshirtImage;
          }
        } else {
          // Composite design onto t-shirt
          const compositeResponse = await fetch('http://localhost:5000/api/composite-tshirt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              designImage: tshirtImage,
              color: selectedDesign.color || '#3B82F6',
              side: selectedSide
            })
          });

          if (!compositeResponse.ok) {
            alert('Failed to prepare t-shirt image');
            setIsProcessing(false);
            return;
          }

          const compositeData = await compositeResponse.json();
          garmentBase64 = compositeData.image.includes(',')
            ? compositeData.image.split(',')[1]
            : compositeData.image;
        }

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

        if (!response.ok) {
          const errorData = await response.json();
          
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
        } else {
          alert(data.error || 'No result image returned');
        }
      }

    } catch (error) {
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

  const saveARPreview = useCallback(() => {
    if (!arPreview) return;
    const link = document.createElement('a');
    link.download = 'ar-tryon-preview.png';
    link.href = arPreview;
    link.click();
  }, [arPreview]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-auto ar-tryon-page">
      {/* Floating Embers - Increased */}
      <FloatingEmbers count={8} />

      {/* Background Effects - Brighter */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.3),_transparent_70%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(147,51,234,0.3),_transparent_70%)] animate-[pulse_6s_infinite_alternate]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03),_transparent_50%)]"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col pt-32 pb-40 px-6">
        {/* Title - ASCII Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 flex-shrink-0"
        >
          <div className="relative w-full h-48 mb-4">
            <ASCIIText 
              text="📱 AR TRY-ON"
              enableWaves={true}
              asciiFontSize={12}
              textFontSize={240}
              textColor="#60a5fa"
              planeBaseHeight={12}
            />
          </div>
          <p className="text-purple-200 text-xl font-medium">
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

            {/* Backend Selector - Compact Horizontal */}
            {uploadedImage && (
              <div className="bg-gradient-to-br from-gray-900 to-purple-950 rounded-2xl p-4 border border-purple-700/30">
                <p className="text-xs text-purple-400 mb-2">Backend:</p>
                <div className="flex gap-2">
                  {(Object.keys(BACKENDS) as BackendType[]).map((key) => {
                    const backend = BACKENDS[key];
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          if (!backend.available) {
                            // Show toast for unavailable backends
                            const toast = document.createElement('div');
                            toast.style.cssText = `
                              position: fixed;
                              top: 50%;
                              left: 50%;
                              transform: translate(-50%, -50%);
                              background: rgba(0, 0, 0, 0.9);
                              border: 2px solid #ef4444;
                              border-radius: 12px;
                              padding: 16px 24px;
                              color: white;
                              font-size: 14px;
                              z-index: 9999;
                              backdrop-filter: blur(10px);
                              box-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
                            `;
                            toast.innerHTML = `
                              <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="font-size: 24px;">🔒</span>
                                <div>
                                  <p style="font-weight: bold; margin-bottom: 4px;">Currently Unavailable</p>
                                  <p style="font-size: 12px; color: #fca5a5;">Runs only locally</p>
                                </div>
                              </div>
                            `;
                            document.body.appendChild(toast);
                            setTimeout(() => toast.remove(), 2500);
                            return;
                          }
                          setSelectedBackend(key);
                        }}
                        className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                          selectedBackend === key
                            ? 'bg-blue-600 text-white border border-blue-400'
                            : backend.available
                            ? 'bg-black/50 text-purple-300 border border-purple-700/30 hover:border-blue-500/50'
                            : 'bg-black/30 text-gray-500 border border-gray-700/30 cursor-not-allowed opacity-50'
                        }`}
                      >
                        <div className="text-center">
                          <p>{backend.name}</p>
                          <p className="text-[10px] opacity-70">{backend.status}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Design Selector - Improved Typography */}
            {uploadedImage && (
              <div className="bg-gradient-to-br from-gray-900 to-purple-950 rounded-3xl p-6 border-2 border-purple-700/50 space-y-4">
                <h3 className="text-lg font-bold text-orange-400" style={{ fontFamily: 'Unbounded, sans-serif', letterSpacing: '0.5px' }}>
                  Choose Design from Cart
                </h3>
                {cartItems.length === 0 ? (
                  <p className="text-purple-300 text-sm">No designs in cart yet!</p>
                ) : (
                  <>
                    <div className="space-y-2">
                      {cartItems.map((item) => {
                        // Show the correct side based on selection
                        const isSelected = selectedDesign?.id === item.id;
                        const displayImage = isSelected && selectedSide === 'back' && item.snapshotBack
                          ? item.snapshotBack
                          : (item.snapshotFront || item.image);
                        
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setSelectedDesign(item);
                              setArPreview(null); // Reset preview when changing design
                            }}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                              isSelected
                                ? 'bg-blue-600 border-2 border-blue-400'
                                : 'bg-black/50 border-2 border-purple-700/30 hover:border-blue-500/50'
                            }`}
                          >
                            {displayImage ? (
                              <img
                                src={displayImage}
                                alt={`Design ${selectedSide}`}
                                className="w-14 h-14 object-contain rounded-lg"
                                style={{ background: 'transparent' }}
                              />
                            ) : (
                              <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-gray-800 text-gray-500 text-xs">
                                No {selectedSide}
                              </div>
                            )}
                            <div className="text-left flex-1">
                              <p className="text-white font-semibold text-sm" style={{ fontFamily: 'Unbounded, sans-serif' }}>
                                {item.designName || 'Custom Design'}
                              </p>
                              <p className="text-xs text-purple-300 mt-0.5" style={{ letterSpacing: '0.3px' }}>
                                {item.size} • {item.material}
                              </p>
                            </div>
                          </button>
                        );
                      })}
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
            {/* Ghost Loading Indicator */}
            {isProcessing && (
              <div className="flex items-center justify-center gap-3 mb-4 animate-bounce">
                <span className="text-3xl">👻</span>
                <div className="relative bg-purple-900/50 border border-purple-500/50 rounded-2xl px-4 py-2">
                  <p className="text-purple-200 text-xs font-semibold">Spirits are activating the backend...</p>
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-r-8 border-r-purple-900/50 border-b-4 border-b-transparent"></div>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-blue-300 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                AR Preview
              </h3>
              
              {/* Upload From Device Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 border border-blue-400/50 rounded-xl text-white text-sm font-semibold hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/50"
              >
                📤 Upload From Device
              </button>
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
                {/* AR Preview with Glare Effect */}
                <div className="relative group overflow-hidden rounded-xl">
                  <img
                    src={arPreview}
                    alt="AR Preview"
                    className="w-full rounded-xl shadow-2xl"
                  />
                  {/* Glare Overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
                        backgroundSize: '200% 200%',
                        animation: 'glareSwipe 3s ease-in-out infinite'
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={saveARPreview}
                  className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-green-500/50"
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
      
      {/* Glare Animation Styles */}
      <style>{`
        @keyframes glareSwipe {
          0% {
            background-position: -200% -200%;
          }
          50% {
            background-position: 200% 200%;
          }
          100% {
            background-position: -200% -200%;
          }
        }
        
        /* Micro-animations for embers */
        @keyframes emberFloat {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ARTryOn;
