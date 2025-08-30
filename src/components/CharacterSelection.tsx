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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
      
      <div className="text-center mb-16 z-10 relative">
        <h1 className="text-6xl font-bold text-white mb-4">
          Marvel Pet Evolution
        </h1>
        <p className="text-xl text-gray-300 mb-2">Qual anti-herói você quer ver evoluir?</p>
        <p className="text-lg text-gray-400">Agora com sistema completo de evolução!</p>
      </div>

      {!isOpen ? (
        /* Single Combined Button */
        <div className="flex flex-col items-center z-10">
          <div
            onClick={handleOpenSelection}
            className="relative w-80 h-80 rounded-full cursor-pointer hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            {/* Split circle button */}
            <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-gray-600/50">
              <div className="w-full h-full flex">
                {/* Deadpool half (left) */}
                <div className="w-1/2 h-full bg-gradient-to-br from-red-600 to-red-800 relative flex items-center justify-center">
                  <div className="w-full h-full bg-red-600 relative">
                    {/* Deadpool mask pattern */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-black rounded-full relative">
                        <div className="absolute top-4 left-4 w-8 h-10 bg-white rounded-full transform -rotate-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Wolverine half (right) */}
                <div className="w-1/2 h-full bg-gradient-to-bl from-yellow-400 to-yellow-600 relative flex items-center justify-center">
                  <div className="w-full h-full bg-yellow-500 relative">
                    {/* Wolverine mask pattern */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-20 bg-black relative" style={{clipPath: 'polygon(0% 20%, 20% 0%, 80% 0%, 100% 20%, 80% 100%, 20% 100%)'}}>
                        <div className="absolute top-3 left-3 w-6 h-8 bg-white rounded-full transform rotate-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Center divider line */}
              <div className="absolute top-0 left-1/2 transform -translate-x-0.5 w-1 h-full bg-gray-800/30"></div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-transparent to-yellow-500/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <h2 className="text-4xl font-bold text-white mb-4">Escolha Seu Pet Herói</h2>
            <p className="text-gray-300 mb-4">Qual anti-herói você quer ver evoluir?</p>
            <p className="text-sm text-gray-400 mb-2">Agora com sistema completo de evolução!</p>
            <p className="text-gray-500 text-sm">Clique em um personagem para começar a aventura</p>
            <p className="text-xs text-gray-600 mt-2">Cada herói evolui através de 8 fases únicas da vida!</p>
          </div>
        </div>
      ) : (
        /* Split Character Selection */
        <div className="flex items-center justify-center gap-16 z-10 w-full max-w-6xl">
          {/* Deadpool Card */}
          <Card 
            className={`w-full max-w-sm bg-red-900/20 backdrop-blur-lg border-red-500/30 hover:border-red-500 transition-all duration-500 group cursor-pointer shadow-red-500/20 shadow-2xl ${isOpen ? 'animate-split-left' : ''}`}
            onClick={() => onSelectCharacter('deadpool')}
          >
            <div className="p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-6xl animate-bounce shadow-xl">
                💀
              </div>
              <h3 className="text-3xl font-bold text-red-400 mb-4">Deadpool</h3>
              <p className="text-white/80 mb-4">
                O mercenário tagarela com regeneração
              </p>
              <div className="space-y-2 text-sm text-white/70 mb-6">
                <p>• Humor sarcástico único</p>
                <p>• Regeneração acelerada</p>
                <p>• Quebra a quarta parede</p>
                <p>• Adora chimichangas</p>
              </div>
              <Button 
                variant="outline" 
                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white w-full"
              >
                Escolher Deadpool
              </Button>
            </div>
          </Card>

          {/* Wolverine Card */}
          <Card 
            className={`w-full max-w-sm bg-yellow-900/20 backdrop-blur-lg border-yellow-500/30 hover:border-yellow-500 transition-all duration-500 group cursor-pointer shadow-yellow-500/20 shadow-2xl ${isOpen ? 'animate-split-right' : ''}`}
            onClick={() => onSelectCharacter('wolverine')}
          >
            <div className="p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-6xl animate-bounce shadow-xl">
                ⚔️
              </div>
              <h3 className="text-3xl font-bold text-yellow-400 mb-4">Wolverine</h3>
              <p className="text-white/80 mb-4">
                O mutante indomável com garras de adamantium
              </p>
              <div className="space-y-2 text-sm text-white/70 mb-6">
                <p>• Garras de adamantium</p>
                <p>• Fator de cura</p>
                <p>• Instintos selvagens</p>
                <p>• Lealidade feroz</p>
              </div>
              <Button 
                variant="outline" 
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black w-full"
              >
                Escolher Wolverine
              </Button>
            </div>
          </Card>
        </div>
      )}

      {isOpen && (
        <div className="mt-12 text-center z-10 opacity-0 animate-fade-in-up">
          <p className="text-gray-400 text-sm">
            ✨ Cada personagem evolui através de 8 fases únicas ✨
          </p>
        </div>
      )}
    </div>
  );
};