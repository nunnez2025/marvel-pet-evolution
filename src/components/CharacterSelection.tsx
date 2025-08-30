import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface CharacterSelectionProps {
  onSelectCharacter: (character: 'deadpool' | 'wolverine') => void;
}

export const CharacterSelection = ({ onSelectCharacter }: CharacterSelectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSelection = () => {
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-marvel-energy/5 to-singularity-purple/5 animate-pulse" />
      
      <div className="text-center mb-16 z-10 relative">
        <h1 className="text-6xl font-bold text-foreground mb-4 animate-marvel-glow">
          🦸‍♂️ Marvel Pet Evolution
        </h1>
        <p className="text-xl text-muted-foreground mb-2">Escolha seu herói da Singularidade</p>
        <p className="text-lg text-muted-foreground/70">Agora com sistema completo de evolução!</p>
      </div>

      {!isOpen ? (
        /* Combined Character Button */
        <div className="flex flex-col items-center z-10">
          <div
            onClick={handleOpenSelection}
            className="relative w-80 h-80 rounded-full cursor-pointer hover:scale-105 transition-all duration-300 shadow-glow"
          >
            <div className="w-full h-full rounded-full overflow-hidden relative bg-gradient-to-r from-deadpool-red to-wolverine-yellow">
              {/* Split mask effect */}
              <svg viewBox="0 0 320 320" className="w-full h-full absolute inset-0">
                {/* Deadpool half */}
                <defs>
                  <clipPath id="leftHalf">
                    <rect x="0" y="0" width="160" height="320" />
                  </clipPath>
                  <clipPath id="rightHalf">
                    <rect x="160" y="0" width="160" height="320" />
                  </clipPath>
                </defs>
                
                {/* Deadpool side */}
                <circle cx="160" cy="160" r="150" fill="hsl(var(--deadpool-red))" clipPath="url(#leftHalf)" />
                <circle cx="130" cy="140" r="25" fill="black" clipPath="url(#leftHalf)" />
                <ellipse cx="120" cy="135" rx="15" ry="20" fill="white" clipPath="url(#leftHalf)" />
                
                {/* Wolverine side */}
                <circle cx="160" cy="160" r="150" fill="hsl(var(--wolverine-yellow))" clipPath="url(#rightHalf)" />
                <polygon points="170,120 200,140 190,160 200,180 170,200 180,160" fill="black" clipPath="url(#rightHalf)" />
                <ellipse cx="190" cy="135" rx="15" ry="20" fill="white" clipPath="url(#rightHalf)" />
                
                {/* Divider line */}
                <line x1="160" y1="10" x2="160" y2="310" stroke="hsl(var(--border))" strokeWidth="2" opacity="0.3" />
              </svg>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-deadpool-red/20 via-transparent to-wolverine-yellow/20 rounded-full animate-energy-pulse" />
            </div>
          </div>
          
          <div className="text-center mt-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Escolha Seu Pet Herói</h2>
            <p className="text-muted-foreground mb-4">Qual anti-herói você quer ver evoluir?</p>
            <p className="text-sm text-muted-foreground/70">Clique em um personagem para começar a aventura</p>
            <p className="text-xs text-muted-foreground/50 mt-2">Cada herói evolui através de 8 fases únicas da vida!</p>
          </div>
        </div>
      ) : (
        /* Split Character Selection */
        <div className="flex items-center justify-center gap-8 z-10 perspective-1000">
          {/* Deadpool Card */}
          <Card 
            className={`flex-1 max-w-sm bg-card/20 backdrop-blur-lg border-deadpool-red/30 hover:border-deadpool-red transition-all duration-500 group cursor-pointer shadow-deadpool ${isOpen ? 'animate-split-left' : ''}`}
            onClick={() => onSelectCharacter('deadpool')}
          >
            <div className="p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-deadpool-red to-deadpool-black rounded-full flex items-center justify-center text-6xl animate-hero-bounce group-hover:animate-energy-pulse shadow-lg">
                💀
              </div>
              <h3 className="text-3xl font-bold text-deadpool-red mb-4">Deadpool</h3>
              <p className="text-foreground/80 mb-4">
                O mercenário tagarela com regeneração
              </p>
              <div className="space-y-2 text-sm text-foreground/70 mb-6">
                <p>• Humor sarcástico único</p>
                <p>• Regeneração acelerada</p>
                <p>• Quebra a quarta parede</p>
                <p>• Adora chimichangas</p>
              </div>
              <Button 
                variant="outline" 
                className="border-deadpool-red text-deadpool-red hover:bg-deadpool-red hover:text-white w-full"
              >
                Escolher Deadpool
              </Button>
            </div>
          </Card>

          {/* Wolverine Card */}
          <Card 
            className={`flex-1 max-w-sm bg-card/20 backdrop-blur-lg border-wolverine-yellow/30 hover:border-wolverine-yellow transition-all duration-500 group cursor-pointer shadow-wolverine ${isOpen ? 'animate-split-right' : ''}`}
            onClick={() => onSelectCharacter('wolverine')}
          >
            <div className="p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-wolverine-yellow to-wolverine-blue rounded-full flex items-center justify-center text-6xl animate-hero-bounce group-hover:animate-energy-pulse shadow-lg">
                ⚔️
              </div>
              <h3 className="text-3xl font-bold text-wolverine-yellow mb-4">Wolverine</h3>
              <p className="text-foreground/80 mb-4">
                O mutante indomável com garras de adamantium
              </p>
              <div className="space-y-2 text-sm text-foreground/70 mb-6">
                <p>• Garras de adamantium</p>
                <p>• Fator de cura</p>
                <p>• Instintos selvagens</p>
                <p>• Lealidade feroz</p>
              </div>
              <Button 
                variant="outline" 
                className="border-wolverine-yellow text-wolverine-yellow hover:bg-wolverine-yellow hover:text-black w-full"
              >
                Escolher Wolverine
              </Button>
            </div>
          </Card>
        </div>
      )}

      {isOpen && (
        <div className="mt-12 text-center z-10 opacity-0 animate-fade-in-up">
          <p className="text-muted-foreground/60 text-sm">
            ✨ Cada personagem evolui através de 8 fases únicas ✨
          </p>
        </div>
      )}
    </div>
  );
};