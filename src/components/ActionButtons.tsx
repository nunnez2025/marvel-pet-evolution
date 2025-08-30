import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  onFeed: () => void;
  onPlay: () => void;
  onHeal: () => void;
  onSleep: () => void;
  onTrain: () => void;
  disabled?: boolean;
}

export const ActionButtons = ({ 
  onFeed, 
  onPlay, 
  onHeal, 
  onSleep, 
  onTrain, 
  disabled = false 
}: ActionButtonsProps) => {
  return (
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
  );
};