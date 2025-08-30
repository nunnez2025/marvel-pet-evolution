import { Progress } from "@/components/ui/progress";

interface StatusBarsProps {
  hunger: number;
  happiness: number;
  energy: number;
  health: number;
}

const getProgressVariant = (value: number) => {
  if (value <= 20) return 'progress-critical';
  if (value <= 40) return 'progress-warning';
  return 'progress-good';
};

export const StatusBars = ({ hunger, happiness, energy, health }: StatusBarsProps) => {
  return (
    <div className="w-full max-w-md space-y-4">
      {/* Fome */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍔</span>
            <span className="text-sm font-semibold text-foreground">Fome</span>
          </div>
          <span className="text-xs text-muted-foreground">{hunger}%</span>
        </div>
        <Progress 
          value={hunger} 
          className={`h-3 ${getProgressVariant(hunger)}`}
        />
        {hunger <= 20 && (
          <p className="text-xs text-destructive mt-2 animate-energy-pulse">
            ⚠️ Muito faminto!
          </p>
        )}
      </div>

      {/* Felicidade */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">😊</span>
            <span className="text-sm font-semibold text-foreground">Felicidade</span>
          </div>
          <span className="text-xs text-muted-foreground">{happiness}%</span>
        </div>
        <Progress 
          value={happiness} 
          className={`h-3 ${getProgressVariant(happiness)}`}
        />
        {happiness <= 20 && (
          <p className="text-xs text-destructive mt-2 animate-energy-pulse">
            ⚠️ Muito triste!
          </p>
        )}
      </div>

      {/* Energia */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-sm font-semibold text-foreground">Energia</span>
          </div>
          <span className="text-xs text-muted-foreground">{energy}%</span>
        </div>
        <Progress 
          value={energy} 
          className={`h-3 ${getProgressVariant(energy)}`}
        />
        {energy <= 20 && (
          <p className="text-xs text-destructive mt-2 animate-energy-pulse">
            ⚠️ Exausto!
          </p>
        )}
      </div>

      {/* Saúde */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">❤️</span>
            <span className="text-sm font-semibold text-foreground">Saúde</span>
          </div>
          <span className="text-xs text-muted-foreground">{health}%</span>
        </div>
        <Progress 
          value={health} 
          className={`h-3 ${getProgressVariant(health)}`}
        />
        {health <= 20 && (
          <p className="text-xs text-destructive mt-2 animate-energy-pulse">
            ⚠️ Precisa de cuidados médicos!
          </p>
        )}
      </div>
    </div>
  );
};