import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles } from 'lucide-react';
import { ShinyText } from '@/components/animations';

interface MinimalDesignGeneratorProps {
  onDesignSelect: (design: string) => void;
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MinimalDesignGenerator = ({ onDesignSelect }: Omit<MinimalDesignGeneratorProps, 'makeItHaunted'>) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [makeItHaunted, setMakeItHaunted] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    try {
      // Append "Make it haunted" if switch is on (hidden from user)
      const finalPrompt = makeItHaunted ? `${prompt} Make it haunted` : prompt;
      
      const response = await fetch(`${API_BASE}/generate-design`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(typeof data?.error === "string" ? data.error : "Generation failed");
      }

      if (data.url) {
        onDesignSelect(data.url);
      } else {
        throw new Error("No image URL returned from backend");
      }
    } catch (err: any) {
      const errorMessage = err.message || "Something went wrong";
      
      // Check if it's a Stability AI API error
      if (errorMessage.includes('500') || errorMessage.includes('Internal server error')) {
        setError("🔥 Stability AI is temporarily down. Please try again in a few minutes!");
      } else if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
        setError("⏳ API rate limit reached. Please wait a moment and try again.");
      } else if (errorMessage.includes('401') || errorMessage.includes('unauthorized')) {
        setError("🔑 API key issue. Please check your Stability AI key.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, makeItHaunted, onDesignSelect]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  }, [handleGenerate]);

  return (
    <div className="space-y-4">
      {/* Make it Haunted Switch - Haunted Style */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <label className="flex items-center gap-3 cursor-pointer group">
          <span className="text-purple-300 text-base font-bold group-hover:text-orange-400 transition-colors">
            Make it Haunted
          </span>
          <div 
            onClick={() => setMakeItHaunted(!makeItHaunted)}
            className={`relative w-16 h-8 rounded-full transition-all duration-300 border-2 ${
              makeItHaunted 
                ? 'bg-gradient-to-r from-orange-600 via-red-600 to-purple-700 border-orange-500 shadow-[0_0_20px_rgba(255,107,0,0.8),0_0_40px_rgba(147,51,234,0.6)]' 
                : 'bg-gray-800 border-gray-600 shadow-inner'
            }`}
          >
            <div 
              className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
                makeItHaunted 
                  ? 'left-9 bg-white shadow-[0_0_15px_rgba(255,107,0,1)]' 
                  : 'left-0.5 bg-gray-400'
              }`}
            >
              <span className="text-xs">
                {makeItHaunted ? '👻' : '💤'}
              </span>
            </div>
          </div>
          <span className={`text-sm font-bold transition-colors ${
            makeItHaunted ? 'text-orange-400' : 'text-gray-500'
          }`}>
            {makeItHaunted ? '🔥 ON' : '😐 OFF'}
          </span>
        </label>
      </div>
      
      <style>{`
        .portal-input-container {
          position: relative;
        }

        .portal-input {
          background: linear-gradient(135deg, rgba(10, 5, 20, 0.95), rgba(20, 10, 40, 0.95));
          border: 2px solid rgba(162, 89, 255, 0.4);
          border-radius: 12px;
          transition: all 0.3s ease;
          box-shadow: 
            0 0 20px rgba(162, 89, 255, 0.2),
            inset 0 0 20px rgba(0, 0, 0, 0.5);
          animation: portalFlicker 4s ease-in-out infinite;
        }

        .portal-input:focus {
          border-color: rgba(162, 89, 255, 0.9);
          box-shadow: 
            0 0 30px rgba(162, 89, 255, 0.6),
            0 0 60px rgba(162, 89, 255, 0.4),
            inset 0 0 30px rgba(162, 89, 255, 0.1);
          outline: none;
          animation: portalReact 0.5s ease-out;
        }

        @keyframes portalFlicker {
          0%, 100% {
            box-shadow: 
              0 0 20px rgba(162, 89, 255, 0.2),
              inset 0 0 20px rgba(0, 0, 0, 0.5);
          }
          50% {
            box-shadow: 
              0 0 25px rgba(162, 89, 255, 0.3),
              inset 0 0 25px rgba(0, 0, 0, 0.6);
          }
        }

        @keyframes portalReact {
          0% {
            box-shadow: 
              0 0 40px rgba(162, 89, 255, 0.8),
              0 0 80px rgba(162, 89, 255, 0.6),
              inset 0 0 40px rgba(162, 89, 255, 0.2);
          }
          100% {
            box-shadow: 
              0 0 30px rgba(162, 89, 255, 0.6),
              0 0 60px rgba(162, 89, 255, 0.4),
              inset 0 0 30px rgba(162, 89, 255, 0.1);
          }
        }

        /* Electric pulses around border */
        .portal-input-container::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, 
            transparent 0%, 
            rgba(162, 89, 255, 0.3) 25%, 
            transparent 50%,
            rgba(255, 107, 0, 0.3) 75%,
            transparent 100%
          );
          border-radius: 12px;
          opacity: 0;
          animation: electricPulse 3s ease-in-out infinite;
          pointer-events: none;
          z-index: -1;
        }

        @keyframes electricPulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.4; }
        }
      `}</style>
      <div className="flex space-x-3">
        <div className="flex-1 relative portal-input-container">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your cursed vision..."
            className="portal-input w-full text-white placeholder:text-purple-400/50 text-lg py-6"
            disabled={isGenerating}
          />
        </div>
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="px-8 py-6 bg-gradient-to-r from-orange-600 to-purple-700 hover:from-orange-700 hover:to-purple-800 text-lg font-semibold shadow-lg shadow-orange-900/50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              <ShinyText text="Summoning" speed={2} className="text-white" />
              ...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              <ShinyText text="Summon" speed={3} className="text-white" />
            </>
          )}
        </Button>
      </div>
      {error && (
        <p className="text-red-400 text-sm">⚠️ {error}</p>
      )}
    </div>
  );
};

export default MinimalDesignGenerator;
