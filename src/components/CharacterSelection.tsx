import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CharacterSelectionProps {
  onSelectCharacter: (character: 'deadpool' | 'wolverine') => void;
}

export const CharacterSelection = ({ onSelectCharacter }: CharacterSelectionProps) => {
  return (
    <div className="min-h-screen gradient-marvel flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-white mb-4 animate-marvel-glow">
          🦸‍♂️ Marvel Pet Evolution
        </h1>
        <p className="text-xl text-white/80 mb-2">Escolha seu herói da Singularidade</p>
        <p className="text-lg text-white/60">Cada personagem tem sua própria jornada evolutiva!</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full">
        {/* Deadpool */}
        <Card className="flex-1 bg-card/20 backdrop-blur-lg border-deadpool-red/30 hover:border-deadpool-red transition-all duration-500 group cursor-pointer"
              onClick={() => onSelectCharacter('deadpool')}>
          <div className="p-8 text-center">
            <div className="w-32 h-32 mx-auto mb-6 gradient-deadpool rounded-full flex items-center justify-center text-6xl animate-hero-bounce group-hover:animate-energy-pulse">
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
            <Button variant="outline" className="border-deadpool-red text-deadpool-red hover:bg-deadpool-red hover:text-white w-full">
              Escolher Deadpool
            </Button>
          </div>
        </Card>

        {/* Wolverine */}
        <Card className="flex-1 bg-card/20 backdrop-blur-lg border-wolverine-yellow/30 hover:border-wolverine-yellow transition-all duration-500 group cursor-pointer"
              onClick={() => onSelectCharacter('wolverine')}>
          <div className="p-8 text-center">
            <div className="w-32 h-32 mx-auto mb-6 gradient-wolverine rounded-full flex items-center justify-center text-6xl animate-hero-bounce group-hover:animate-energy-pulse">
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
            <Button variant="outline" className="border-wolverine-yellow text-wolverine-yellow hover:bg-wolverine-yellow hover:text-black w-full">
              Escolher Wolverine
            </Button>
          </div>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <p className="text-white/60 text-sm">
          ✨ Cada personagem evolui através de 8 fases únicas ✨
        </p>
      </div>
    </div>
  );
};