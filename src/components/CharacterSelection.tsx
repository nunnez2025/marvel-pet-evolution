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

        {/* Botão Bônus - Flutuante e em destaque */}
        <div className="fixed bottom-8 right-8 z-50">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-xl opacity-60 animate-pulse scale-110"></div>
            
            {/* Main button */}
            <Button
              onClick={onSelectBonus}
              size="lg"
              className="relative bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 border-2 border-amber-300 text-white font-bold shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 animate-bounce hover:animate-none hover:scale-105 rounded-full px-6 py-4"
            >
              <span className="relative z-10 flex items-center gap-2 text-lg">
                🎮 Pet Bônus
              </span>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 rounded-full" />
            </Button>
            
            {/* Floating sparkles around the button */}
            <div className="absolute -top-2 -left-2 text-yellow-300 animate-ping" style={{ animationDelay: '0s' }}>✨</div>
            <div className="absolute -top-3 -right-3 text-amber-300 animate-ping" style={{ animationDelay: '0.5s' }}>⭐</div>
            <div className="absolute -bottom-2 -left-3 text-yellow-400 animate-ping" style={{ animationDelay: '1s' }}>💫</div>
            <div className="absolute -bottom-3 -right-2 text-amber-400 animate-ping" style={{ animationDelay: '1.5s' }}>✨</div>
            
            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-full border-2 border-amber-300/50 animate-ping" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute inset-0 rounded-full border-2 border-yellow-300/30 animate-ping scale-125" style={{ animationDelay: '0.8s' }}></div>
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-black/80 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
              🎮 Pet Virtual Clássico
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};