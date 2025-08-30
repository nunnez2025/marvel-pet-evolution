import { useState } from 'react';

interface PetStatusDisplayProps {
  mood: string;
  character: 'deadpool' | 'wolverine';
  evolutionStage: number;
}

const MOOD_DISPLAY = {
  happy: { text: 'Feliz', emoji: '😄' },
  sad: { text: 'Triste', emoji: '😢' },
  hungry: { text: 'Faminto', emoji: '🤤' },
  sick: { text: 'Doente', emoji: '😷' },
  sleeping: { text: 'Dormindo', emoji: '😴' },
  normal: { text: 'Normal', emoji: '😐' },
  excited: { text: 'Animado', emoji: '🤩' },
  angry: { text: 'Irritado', emoji: '😠' }
};

const EVOLUTION_STAGES = [
  "Ovo", "Bebê", "Criança", "Adolescente", "Adulto", "Veterano", "Lendário", "Mítico", "Eterno"
];

export const PetStatusDisplay = ({ mood, character, evolutionStage }: PetStatusDisplayProps) => {
  const [isEmojiActive, setIsEmojiActive] = useState(false);
  const moodData = MOOD_DISPLAY[mood as keyof typeof MOOD_DISPLAY] || MOOD_DISPLAY.normal;
  const characterEmoji = character === 'deadpool' ? '💀' : '⚔️';
  const stageName = EVOLUTION_STAGES[evolutionStage] || "Desconhecido";

  const handleEmojiClick = () => {
    setIsEmojiActive(true);
    setTimeout(() => setIsEmojiActive(false), 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 p-4 mt-4">
      <div className="flex items-center justify-between">
        {/* Character and Stage */}
        <div className="flex flex-col items-center">
          <div className="text-2xl mb-1">{characterEmoji}</div>
          <div className="text-xs text-muted-foreground font-medium">{stageName}</div>
        </div>
        
        {/* Status Text */}
        <div className="flex flex-col items-center flex-1 mx-4">
          <div className="text-lg font-bold text-foreground">{moodData.text}</div>
        </div>
        
        {/* Interactive Mood Emoji */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleEmojiClick}
            className={`text-3xl transition-all duration-300 cursor-pointer ${
              isEmojiActive ? 'animate-bounce scale-125' : 'hover:scale-110'
            }`}
          >
            {moodData.emoji}
          </button>
          <div className="text-xs text-muted-foreground mt-1">Clique!</div>
        </div>
      </div>
    </div>
  );
};