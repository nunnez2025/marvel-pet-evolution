import { Button } from '@/components/ui/button';

interface CharacterSelectionProps {
  onSelectCharacter: (character: 'deadpool' | 'wolverine') => void;
  onSelectBonus: () => void;
}

export const CharacterSelection = ({ onSelectCharacter, onSelectBonus }: CharacterSelectionProps) => {
  return (
    <div className="character-bg cached-bg gpu-accelerated">
      <div className="text-center mb-12 z-10">
        <h1 
          className="text-5xl font-bold text-white mb-4 animate-marvel-glow gpu-accelerated" 
          style={{ textShadow: '0 4px 8px rgba(0,0,0,0.5)' }}
        >
          Escolha Seu Pet Herói
        </h1>
        <p className="text-gray-300 text-lg">Qual anti-herói você quer ver evoluir?</p>
        <p className="text-gray-400 text-sm mt-2">Agora com sistema completo de evolução!</p>
      </div>

      <div className="btn z-10 gpu-accelerated">
        <button 
          className="button face" 
          onClick={() => onSelectCharacter('deadpool')}
          aria-label="Selecionar Deadpool"
        >
          <div className="deadpool-face">
            <div className="ded eye"></div>
          </div>
        </button>
        <button 
          className="button1 face" 
          onClick={() => onSelectCharacter('wolverine')}
          aria-label="Selecionar Wolverine"
        >
          <div className="wolverine-face">
            <div className="wol mask"></div>
            <div className="wol-eye"></div>
          </div>
        </button>
      </div>

      <div className="text-center mt-12 z-10">
        <p className="text-gray-400 text-sm">Clique em um personagem para começar a aventura</p>
        <p className="text-gray-500 text-xs mt-2">
          Cada herói evolui através de 8 fases únicas da vida!
        </p>
        <div className="mt-8 space-y-2 text-gray-500 text-xs max-w-md mx-auto">
          <p>🎮 Atalhos do teclado: F-Alimentar, P-Brincar, H-Curar, S-Dormir, T-Treinar</p>
          <p>🎯 Mini-jogos inclusos para ganhar XP extra</p>
          <p>🏆 Sistema de conquistas desbloqueáveis</p>
        </div>

        {/* Botão Bônus - Pequeno e brilhante embaixo da seleção */}
        <div className="mt-8 flex justify-center">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-md opacity-50 animate-pulse"></div>
            
            {/* Main button */}
            <button
              onClick={onSelectBonus}
              className="relative bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-110 rounded-full px-4 py-2 text-sm border-2 border-amber-300/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                ⭐ Pet Bônus
              </span>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 rounded-full" />
            </button>
            
            {/* Small floating sparkles */}
            <div className="absolute -top-1 -left-1 text-yellow-300 text-xs animate-ping" style={{ animationDelay: '0s' }}>✨</div>
            <div className="absolute -top-1 -right-1 text-amber-300 text-xs animate-ping" style={{ animationDelay: '0.7s' }}>⭐</div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-yellow-400 text-xs animate-ping" style={{ animationDelay: '1.4s' }}>💫</div>
          </div>
        </div>

        <p className="text-amber-400/70 text-xs mt-2 text-center animate-pulse">
          🎮 Pet virtual clássico com mecânicas tradicionais
        </p>
      </div>
    </div>
  );
};