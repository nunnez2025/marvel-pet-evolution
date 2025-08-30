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

        {/* Botão Bônus */}
        <div className="mt-12 pt-8 border-t border-gray-600/30">
          <div className="relative">
            <Button
              onClick={onSelectBonus}
              variant="outline"
              size="lg"
              className="relative bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-400/50 text-amber-300 hover:bg-amber-500/30 hover:border-amber-400 transition-all duration-300 animate-bounce overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                ⭐ BÔNUS: Pet Virtual Clássico ⭐
              </span>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
            
            {/* Floating sparkles around the button */}
            <div className="absolute -top-2 -left-2 text-yellow-400 animate-pulse" style={{ animationDelay: '0s' }}>✨</div>
            <div className="absolute -top-3 -right-3 text-amber-400 animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
            <div className="absolute -bottom-2 -left-3 text-yellow-500 animate-pulse" style={{ animationDelay: '1s' }}>💫</div>
            <div className="absolute -bottom-3 -right-2 text-amber-300 animate-pulse" style={{ animationDelay: '1.5s' }}>✨</div>
          </div>
          
          <p className="text-amber-400/70 text-xs mt-3 animate-pulse">
            🎮 Experimente nosso pet virtual tradicional com mecânicas clássicas!
          </p>
          <p className="text-amber-500/60 text-xs mt-1">
            📱 Interface simples • 🎯 Jogo do laser • 💖 Cuidados básicos
          </p>
        </div>
      </div>
    </div>
  );
};