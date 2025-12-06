import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, Download } from 'lucide-react';
import FloatingEmbers from '../components/FloatingEmbers';
import { DecryptedText } from '../components/animations';

const SpookyImages = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [hauntedImage, setHauntedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string;
        setUploadedImage(imageData);
        setHauntedImage(null);
        setError(null);
        
        // Automatically generate haunted version
        await generateHauntedImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateHauntedImage = async (imageData: string, additionalPrompt: string = '') => {
    setIsGenerating(true);
    setError(null);
    
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    try {
      const response = await fetch(`${API_BASE}/haunted-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData,
          additionalPrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate haunted image');
      }

      if (data.imageData) {
        setHauntedImage(data.imageData);
      } else if (data.description) {
        // Gemini returned text description
        setError(`Gemini provided description: ${data.description}`);
      } else {
        throw new Error('No image data received');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate haunted image');
    } finally {
      setIsGenerating(false);
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

  const handleMakeSpooky = () => {
    if (uploadedImage) {
      generateHauntedImage(uploadedImage);
    }
  };

  const handleDownload = () => {
    if (!hauntedImage) return;
    
    const link = document.createElement('a');
    link.href = hauntedImage;
    link.download = `haunted-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Floating Embers */}
      <FloatingEmbers count={6} />
      
      {/* Haunted Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/haunted/backgroundimg.png)',
          backgroundAttachment: 'fixed',
          opacity: 0.3,
          zIndex: -5,
        }}
      />

      {/* Fog Layers */}
      <div
        className="absolute inset-0 animate-fog-drift-slow"
        style={{
          backgroundImage: 'url(/assets/haunted/IntroFog.png)',
          backgroundSize: 'cover',
          opacity: 0.4,
          zIndex: -3,
        }}
      />
      <div
        className="absolute inset-0 animate-fog-drift-medium"
        style={{
          backgroundImage: 'url(/assets/haunted/fogandSoul.png)',
          backgroundSize: 'cover',
          opacity: 0.35,
          zIndex: -1,
        }}
      />
      <div
        className="absolute inset-0 animate-fog-drift-fast"
        style={{
          backgroundImage: 'url(/assets/haunted/ghostfog.png)',
          backgroundSize: 'cover',
          opacity: 0.3,
          zIndex: 3,
        }}
      />

      {/* Floating Ghosts */}
      <div
        className="absolute top-1/4 left-1/4 w-48 h-72 animate-ghost-float-slow"
        style={{
          backgroundImage: 'url(/assets/haunted/Ghost1.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2,
          zIndex: 0,
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-64 h-80 animate-ghost-float-medium"
        style={{
          backgroundImage: 'url(/assets/haunted/ghostfog.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15,
          zIndex: 0,
        }}
      />

      {/* Flying Bats */}
      <div className="absolute top-20 left-1/3 w-16 h-16 opacity-30 animate-bat-fly"
        style={{
          backgroundImage: 'url(/assets/haunted/Ghost1.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.5)',
        }}
      />

      {/* Death Image with Speech Bubble - Fixed Right */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-20">
        {/* Speech Bubble */}
        <div className="relative mb-4 animate-float">
          <div 
            className="bg-gradient-to-br from-gray-900 to-purple-950 border-2 border-orange-500/50 rounded-2xl p-4 shadow-2xl"
            style={{
              boxShadow: '0 0 30px rgba(255, 107, 0, 0.4)',
            }}
          >
            <p className="text-orange-400 font-bold text-lg text-center haunted-text">
              Have Patience...
            </p>
            <p className="text-purple-300 text-sm text-center mt-1">
              The spirits are working
            </p>
          </div>
          {/* Speech bubble tail */}
          <div 
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: '15px solid transparent',
              borderRight: '15px solid transparent',
              borderTop: '15px solid rgba(147, 51, 234, 0.8)',
            }}
          />
        </div>

        {/* Death Image */}
        <div className="relative w-48 h-64 animate-ghost-float-slow">
          <img
            src="/assets/haunted/death.png"
            alt="Death"
            className="w-full h-full object-contain drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(255, 107, 0, 0.6))',
            }}
          />
        </div>
      </div>

      {/* Main Content - More centered with death image on right */}
      <div className="relative z-10 max-w-5xl mx-auto pr-48 pl-12 py-20">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500 mb-4"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            👻 Spooky Images
          </h1>
          <p className="text-purple-300 text-xl">
            <DecryptedText 
              text="Transform your images into haunted masterpieces"
              speed={50}
              maxIterations={15}
              sequential={true}
              revealDirection="center"
              animateOn="view"
              className="text-purple-300"
              parentClassName="text-xl"
            />
          </p>
        </motion.div>

        {/* Upload Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Glowing Circle Frame */}
          <div className="relative w-full max-w-full">
            <div 
              className="absolute inset-0 rounded-3xl animate-neon-pulse"
              style={{
                boxShadow: `
                  0 0 30px 6px rgba(162, 89, 255, 0.6),
                  0 0 60px 12px rgba(255, 107, 0, 0.4),
                  inset 0 0 80px 15px rgba(162, 89, 255, 0.2)
                `,
                border: '3px solid rgba(162, 89, 255, 0.8)',
              }}
            />

            {/* Upload Area */}
            <div
              className={`relative bg-gradient-to-br from-gray-900 to-purple-950 rounded-3xl p-12 transition-all duration-300 ${
                isDragging ? 'scale-105 border-orange-500' : 'border-purple-700/50'
              } border-2`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {!uploadedImage ? (
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="w-32 h-32 rounded-full bg-purple-900/50 flex items-center justify-center">
                      <Upload className="w-16 h-16 text-orange-400" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-orange-400 mb-2">
                      Upload Your Image
                    </h3>
                    <p className="text-purple-300">
                      Drag & drop or click to select
                    </p>
                  </div>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-8 py-4 bg-gradient-to-r from-orange-600 to-purple-700 text-white font-semibold rounded-full hover:scale-105 transition-all shadow-lg shadow-orange-900/50"
                  >
                    Choose Image
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
                <div className="space-y-6">
                  {/* Side by Side Images */}
                  <div className="grid grid-cols-2 gap-8">
                    {/* Original Image - Left */}
                    <div className="space-y-3">
                      <h3 className="text-center text-orange-400 font-bold text-lg">Original</h3>
                      <div className="relative w-full aspect-square">
                        <div 
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            boxShadow: '0 0 30px 6px rgba(255, 107, 0, 0.5)',
                            border: '2px solid rgba(255, 107, 0, 0.6)',
                          }}
                        />
                        <div className="absolute inset-0 rounded-2xl overflow-hidden bg-black">
                          <img
                            src={uploadedImage}
                            alt="Original"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Haunted Image - Right */}
                    <div className="space-y-3">
                      <h3 className="text-center text-purple-400 font-bold text-lg">Haunted Version</h3>
                      <div className="relative w-full aspect-square">
                        <div 
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            boxShadow: '0 0 30px 6px rgba(162, 89, 255, 0.5)',
                            border: '2px solid rgba(162, 89, 255, 0.6)',
                          }}
                        />
                        <div className="absolute inset-0 rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                          {isGenerating ? (
                            <div className="text-center space-y-4">
                              <div className="text-6xl animate-bounce">👻</div>
                              <p className="text-purple-300 animate-pulse">Haunting your image...</p>
                            </div>
                          ) : hauntedImage ? (
                            <img
                              src={hauntedImage}
                              alt="Haunted"
                              className="w-full h-full object-cover"
                            />
                          ) : error ? (
                            <div className="text-center p-4">
                              <p className="text-red-400 text-sm">{error}</p>
                            </div>
                          ) : (
                            <div className="text-center space-y-4">
                              <div className="text-4xl">🎃</div>
                              <p className="text-purple-300 text-sm">Generating...</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-center flex-wrap">
                    <button
                      onClick={handleMakeSpooky}
                      disabled={isGenerating}
                      className="px-10 py-4 bg-gradient-to-r from-orange-600 to-purple-700 text-white font-bold text-lg rounded-full hover:scale-105 transition-all shadow-lg shadow-orange-900/50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="w-5 h-5" />
                      {isGenerating ? 'Haunting...' : 'Regenerate Spooky'}
                    </button>
                    
                    {hauntedImage && (
                      <button
                        onClick={handleDownload}
                        className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold text-lg rounded-full hover:scale-105 transition-all shadow-lg shadow-green-900/50 flex items-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Download Haunted
                      </button>
                    )}
                    
                    <button
                      onClick={() => {
                        setUploadedImage(null);
                        setHauntedImage(null);
                        setError(null);
                      }}
                      className="px-8 py-4 bg-black/50 border-2 border-purple-700/50 text-purple-300 font-semibold rounded-full hover:bg-purple-900/50 hover:border-orange-500/50 transition-all"
                    >
                      Upload New
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: '👻', title: 'Ghost Effects', desc: 'Add ethereal spirits' },
            { icon: '🎃', title: 'Pumpkin Glow', desc: 'Halloween ambiance' },
            { icon: '🦇', title: 'Bat Swarms', desc: 'Flying creatures' },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-purple-950 to-orange-950 border-2 border-purple-700/50 rounded-xl p-6 text-center hover:scale-105 transition-all"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h4 className="text-orange-400 font-bold mb-2">{feature.title}</h4>
              <p className="text-purple-300 text-sm">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Creepster&display=swap');

        .haunted-text {
          font-family: 'Creepster', cursive;
          animation: haunted-flicker 3s ease-in-out infinite;
          text-shadow: 
            0 0 10px rgba(255, 107, 0, 0.8),
            0 0 20px rgba(255, 107, 0, 0.6),
            0 0 30px rgba(255, 107, 0, 0.4);
        }

        @keyframes haunted-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes fog-drift-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100px); }
        }
        @keyframes fog-drift-medium {
          0% { transform: translateX(0); }
          100% { transform: translateX(-150px); }
        }
        @keyframes fog-drift-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-200px); }
        }
        @keyframes ghost-float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        @keyframes ghost-float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }
        @keyframes bat-fly {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(100px) translateY(-20px); }
          50% { transform: translateX(200px) translateY(0); }
          75% { transform: translateX(100px) translateY(20px); }
          100% { transform: translateX(0) translateY(0); }
        }
        @keyframes neon-pulse {
          0%, 100% {
            box-shadow: 
              0 0 30px 6px rgba(162, 89, 255, 0.6),
              0 0 60px 12px rgba(255, 107, 0, 0.4),
              inset 0 0 80px 15px rgba(162, 89, 255, 0.2);
          }
          50% {
            box-shadow: 
              0 0 40px 8px rgba(162, 89, 255, 0.8),
              0 0 80px 16px rgba(255, 107, 0, 0.6),
              inset 0 0 100px 20px rgba(162, 89, 255, 0.3);
          }
        }

        .animate-fog-drift-slow { animation: fog-drift-slow 40s linear infinite; }
        .animate-fog-drift-medium { animation: fog-drift-medium 30s linear infinite; }
        .animate-fog-drift-fast { animation: fog-drift-fast 20s linear infinite; }
        .animate-ghost-float-slow { animation: ghost-float-slow 20s ease-in-out infinite; }
        .animate-ghost-float-medium { animation: ghost-float-medium 15s ease-in-out infinite; }
        .animate-bat-fly { animation: bat-fly 20s ease-in-out infinite; }
        .animate-neon-pulse { animation: neon-pulse 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default SpookyImages;
