import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  onFeed: () => void;
  onPlay: () => void;
  onHeal: () => void;
  onSleep: () => void;
  onTrain: () => void;
  onLaserGame?: () => void;
  onMiniGame?: () => void;
  onTreat?: () => void;
  disabled?: boolean;
}

export const ActionButtons = ({ 
  onFeed, 
  onPlay, 
  onHeal, 
  onSleep, 
  onTrain, 
  onLaserGame,
  onMiniGame,
  onTreat,
  disabled = false 
}: ActionButtonsProps) => {
  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="flex flex-wrap gap-3 justify-center max-w-lg">
        <Button
          onClick={onFeed}
          disabled={disabled}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-marvel transition-all duration-300 hover:scale-105 hover:shadow-glow"
        >
          🍔 Alimentar
        </Button>

        <Button
          onClick={onPlay}
          disabled={disabled}
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-marvel transition-all duration-300 hover:scale-105 hover:shadow-glow"
        >
          🎮 Brincar
        </Button>

        <Button
          onClick={onHeal}
          disabled={disabled}
          variant="outline"
          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 hover:scale-105"
        >
          💊 Curar
        </Button>

        <Button
          onClick={onSleep}
          disabled={disabled}
          className="bg-muted hover:bg-muted/80 text-muted-foreground transition-all duration-300 hover:scale-105"
        >
          😴 Dormir
        </Button>

        <Button
          onClick={onTrain}
          disabled={disabled}
          className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-marvel transition-all duration-300 hover:scale-105 hover:shadow-glow"
        >
          💪 Treinar
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="flex flex-wrap gap-3 justify-center max-w-lg">
        {onTreat && (
          <Button
            onClick={onTreat}
            disabled={disabled}
            className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:scale-105"
          >
            🍬 Petisco
          </Button>
        )}

        {onLaserGame && (
          <Button
            onClick={onLaserGame}
            disabled={disabled}
            className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300 hover:scale-105"
          >
            🔴 Laser Game
          </Button>
        )}

        {onMiniGame && (
          <Button
            onClick={onMiniGame}
            disabled={disabled}
            className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 hover:scale-105"
          >
            🎯 Food Rain
          </Button>
        )}
      </div>
    </div>
  );
};