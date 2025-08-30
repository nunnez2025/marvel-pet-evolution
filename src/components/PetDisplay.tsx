import { useEffect, useState } from 'react';

interface PetDisplayProps {
  character: 'deadpool' | 'wolverine';
  mood: 'happy' | 'sad' | 'hungry' | 'sick' | 'sleeping' | 'normal';
  evolutionStage: number;
  onClick: () => void;
}

const EVOLUTION_STAGES = [
  { name: "Bebê", emoji: "👶", size: "text-6xl" },
  { name: "Criança", emoji: "🧒", size: "text-7xl" },
  { name: "Adolescente", emoji: "🧑", size: "text-8xl" },
  { name: "Adulto", emoji: "🦸", size: "text-9xl" },
  { name: "Veterano", emoji: "🦸‍♂️", size: "text-8xl" },
  { name: "Lendário", emoji: "🌟", size: "text-7xl" },
  { name: "Mítico", emoji: "✨", size: "text-6xl" },
  { name: "Eterno", emoji: "🌌", size: "text-5xl" }
];

const MOOD_EMOJIS = {
  happy: "😄",
  sad: "😢", 
  hungry: "😋",
  sick: "🤒",
  sleeping: "😴",
  normal: "😊"
};

export const PetDisplay = ({ character, mood, evolutionStage, onClick }: PetDisplayProps) => {
  const [showHearts, setShowHearts] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const stage = EVOLUTION_STAGES[evolutionStage] || EVOLUTION_STAGES[0];
  const characterEmoji = character === 'deadpool' ? '💀' : '⚔️';
  
  const handleClick = () => {
    onClick();
    setClickCount(prev => prev + 1);
    
    if (mood === 'happy') {
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 2000);
    }
  };

  const getPetClasses = () => {
    const baseClasses = "transition-all duration-500 cursor-pointer select-none";
    
    switch (mood) {
      case 'happy':
        return `${baseClasses} pet-happy animate-hero-bounce`;
      case 'sad':
        return `${baseClasses} pet-sad`;
      case 'sick':
        return `${baseClasses} pet-sick`;
      case 'sleeping':
        return `${baseClasses} pet-sleeping`;
      default:
        return `${baseClasses} animate-float hover:scale-110`;
    }
  };

  useEffect(() => {
    if (clickCount > 0 && clickCount % 10 === 0) {
      // Efeito especial a cada 10 cliques
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 3000);
    }
  }, [clickCount]);

  return (
    <div className="relative">
      {/* Pet Container */}
      <div className={`w-64 h-64 mx-auto rounded-full flex items-center justify-center relative overflow-hidden ${
        character === 'deadpool' ? 'gradient-deadpool shadow-deadpool' : 'gradient-wolverine shadow-wolverine'
      }`}>
        
        {/* Main Pet Character */}
        <div 
          className={`${stage.size} ${getPetClasses()}`}
          onClick={handleClick}
        >
          <div className="flex items-center gap-2">
            <span>{characterEmoji}</span>
            <span>{stage.emoji}</span>
          </div>
        </div>

        {/* Mood Indicator */}
        <div className="absolute top-4 right-4 text-3xl animate-energy-pulse">
          {MOOD_EMOJIS[mood]}
        </div>

        {/* Evolution Stage Indicator */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-bold">
          {stage.name}
        </div>

        {/* Click Counter */}
        {clickCount > 0 && (
          <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
            +{clickCount}
          </div>
        )}
      </div>

      {/* Floating Hearts */}
      {showHearts && (
        <>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float text-2xl"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 20}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '3s'
              }}
            >
              💖
            </div>
          ))}
        </>
      )}

      {/* Special Effects */}
      {mood === 'happy' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-energy-pulse text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            ✨
          </div>
        </div>
      )}
    </div>
  );
};