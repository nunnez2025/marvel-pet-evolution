import { Progress } from "@/components/ui/progress";

interface EvolutionProgressProps {
  currentStage: number;
  stageProgress: number;
  timeInStage: number;
  timeToNext: number;
}

const EVOLUTION_STAGES = [
  { name: "Bebê", age: "0-2h", emoji: "👶" },
  { name: "Criança", age: "2-8h", emoji: "🧒" },
  { name: "Adolescente", age: "8-20h", emoji: "🧑" },
  { name: "Adulto", age: "20-50h", emoji: "🦸" },
  { name: "Veterano", age: "50-100h", emoji: "🦸‍♂️" },
  { name: "Lendário", age: "100-200h", emoji: "🌟" },
  { name: "Mítico", age: "200-300h", emoji: "✨" },
  { name: "Eterno", age: "300h+", emoji: "🌌" }
];

export const EvolutionProgress = ({ 
  currentStage, 
  stageProgress, 
  timeInStage, 
  timeToNext 
}: EvolutionProgressProps) => {
  const stage = EVOLUTION_STAGES[currentStage] || EVOLUTION_STAGES[0];
  const nextStage = EVOLUTION_STAGES[currentStage + 1];

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="w-full max-w-md bg-card/30 backdrop-blur-md border border-border rounded-xl p-6 shadow-marvel animate-marvel-glow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-hero-bounce">{stage.emoji}</span>
          <div>
            <h3 className="text-lg font-bold text-foreground">{stage.name}</h3>
            <p className="text-sm text-muted-foreground">{stage.age}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Tempo no estágio</p>
          <p className="text-sm font-semibold text-foreground">{formatTime(timeInStage)}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progresso para evolução</span>
          <span className="text-foreground font-semibold">{Math.round(stageProgress)}%</span>
        </div>
        
        <Progress 
          value={stageProgress} 
          className="h-4 progress-good animate-energy-pulse"
        />

        {nextStage ? (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Próximo: {nextStage.emoji} {nextStage.name}</span>
            <span>{formatTime(timeToNext)} restantes</span>
          </div>
        ) : (
          <div className="text-center text-sm text-marvel-energy font-bold animate-marvel-glow">
            🌟 Forma Final Atingida! 🌟
          </div>
        )}
      </div>

      {/* Evolution Timeline */}
      <div className="mt-6 pt-4 border-t border-border/30">
        <p className="text-xs text-muted-foreground mb-3 text-center">Timeline de Evolução</p>
        <div className="flex justify-center space-x-2">
          {EVOLUTION_STAGES.slice(0, 8).map((stg, index) => (
            <div
              key={index}
              className={`flex flex-col items-center space-y-1 ${
                index <= currentStage ? 'opacity-100' : 'opacity-30'
              } ${index === currentStage ? 'animate-energy-pulse' : ''}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                index < currentStage 
                  ? 'bg-primary text-primary-foreground' 
                  : index === currentStage 
                    ? 'bg-accent text-accent-foreground shadow-glow' 
                    : 'bg-muted'
              }`}>
                {stg.emoji}
              </div>
              {index < EVOLUTION_STAGES.length - 1 && (
                <div className={`w-4 h-0.5 ${
                  index < currentStage ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};