import React, { useState } from 'react';  
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';

interface DesignGeneratorProps {
  onDesignSelect: (design: string) => void;
  selectedDesign?: string;
}

const API_BASE = "http://localhost:5000"; // backend base URL

const spookyPrompts = [
  "🎃 Vintage Halloween pumpkin with glowing eyes",
  "👻 Cute ghost floating in moonlight",
  "🦇 Gothic vampire bat silhouette",
  "💀 Sugar skull with floral patterns",
  "🕷️ Creepy spider web with full moon",
  "🧟 Zombie hand reaching from grave",
  "🕸️ Haunted house on a hill",
  "🌙 Witch flying on broomstick",
  "⚰️ Spooky graveyard at midnight",
  "👹 Demon mask with horns",
];

const DesignGenerator: React.FC<DesignGeneratorProps> = ({ 
  onDesignSelect
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Call backend
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    try {
      // 1️⃣ Generate design and remove background in backend
      const response = await fetch(`${API_BASE}/generate-design`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(typeof data?.error === "string" ? data.error : "Generation failed");
      }

      if (data.url) {
        // 2️⃣ Show preview (image is now transparent)
        setGeneratedImage(data.url);
        onDesignSelect(data.url);      // pass to T-shirt mockup
      } else {
        throw new Error("No image URL returned from backend");
      }
    } catch (err: any) {
      console.error("Failed to generate design:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-orange-400 mb-2">
          👻 Spooky Design Prompt
        </label>
        <div className="flex space-x-2">
          <Input
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., haunted mansion, creepy clown, dark forest monster..."
            className="flex-1 bg-gray-900 border-purple-700 text-white placeholder:text-purple-400"
            disabled={isGenerating}
          />
          <Button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="px-6 bg-gradient-to-r from-orange-600 to-purple-700 hover:from-orange-700 hover:to-purple-800"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span className="ml-2">
              {isGenerating ? 'Summoning...' : '🎃 Generate'}
            </span>
          </Button>
        </div>
        {error && <p className="text-xs text-red-400 mt-2">⚠️ {error}</p>}
        <p className="text-xs text-purple-400 mt-1">
          Press Enter or click Generate to summon AI-powered spooky designs
        </p>
      </div>

      {/* Spooky Quick Prompts */}
      <div>
        <label className="block text-sm font-medium text-orange-400 mb-2">
          🎃 Quick Spooky Ideas
        </label>
        <div className="grid grid-cols-2 gap-2">
          {spookyPrompts.map((spookyPrompt, idx) => (
            <button
              key={idx}
              onClick={() => setPrompt(spookyPrompt.replace(/^[^\s]+\s/, ''))}
              className="text-left text-xs px-3 py-2 bg-purple-900/50 hover:bg-purple-800/70 text-purple-200 rounded-lg border border-purple-700/50 transition-all hover:scale-105"
              disabled={isGenerating}
            >
              {spookyPrompt}
            </button>
          ))}
        </div>
      </div>

      {/* Inline Preview */}
      {generatedImage && (
        <Card className="p-4 border border-purple-700/50 bg-gradient-to-br from-gray-900 to-purple-950">
          <h4 className="text-sm font-medium mb-2 text-orange-400">👻 Preview</h4>
          {/* Transparent PNG will render correctly */}
          <img 
            src={generatedImage} 
            alt="Generated spooky design" 
            className="w-full max-h-64 object-contain rounded-lg shadow-2xl shadow-purple-900/50"
          />
        </Card>
      )}

      {/* Spooky Generation Tips */}
      <Card className="p-4 bg-gradient-to-r from-purple-950 to-orange-950 border-orange-700/50">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-orange-400">🎃 Spooky Pro Tips</h4>
            <ul className="text-xs text-purple-300 mt-1 space-y-1">
              <li>• Be specific: "vintage horror movie poster" vs "scary"</li>
              <li>• Mention style: gothic, creepy, dark fantasy, horror</li>
              <li>• Use atmosphere: moonlit, foggy, shadowy, eerie</li>
              <li>• Add creatures: ghosts, zombies, vampires, demons</li>
              <li>• Try themes: Halloween, Day of the Dead, haunted</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DesignGenerator;








