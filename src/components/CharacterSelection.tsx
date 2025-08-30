import { Button } from '@/components/ui/button';

interface CharacterSelectionProps {
  onSelectCharacter: (character: 'deadpool' | 'wolverine') => void;
}

export const CharacterSelection = ({ onSelectCharacter }: CharacterSelectionProps) => {
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
      </div>
    </div>
  );
};