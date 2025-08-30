interface ActionButtonsProps {
  onFeed: () => void;
  onPlay: () => void;
  onHeal: () => void;
  onSleep: () => void;
  onTrain: () => void;
  onLaserGame?: () => void;
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
  onTreat,
  disabled = false 
}: ActionButtonsProps) => {
  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="flex gap-4 flex-wrap justify-center mb-4">
        <button 
          onClick={onFeed} 
          disabled={disabled}
          className="action-button-enhanced feed-btn gpu-accelerated"
          style={{ '--color-1': '#3b82f6', '--color-2': '#1d4ed8' } as React.CSSProperties}
        >
          🍔 Alimentar
        </button>
        
        <button 
          onClick={onPlay} 
          disabled={disabled}
          className="action-button-enhanced play-btn gpu-accelerated"
          style={{ '--color-1': '#10b981', '--color-2': '#047857' } as React.CSSProperties}
        >
          🎮 Brincar
        </button>
        
        <button 
          onClick={onHeal} 
          disabled={disabled}
          className="action-button-enhanced heal-btn gpu-accelerated"
          style={{ '--color-1': '#ef4444', '--color-2': '#dc2626' } as React.CSSProperties}
        >
          💊 Curar
        </button>
        
        <button 
          onClick={onSleep} 
          disabled={disabled}
          className="action-button-enhanced sleep-btn gpu-accelerated"
          style={{ '--color-1': '#8b5cf6', '--color-2': '#7c3aed' } as React.CSSProperties}
        >
          😴 Dormir
        </button>
        
        {onLaserGame && (
          <button 
            onClick={onLaserGame} 
            disabled={disabled}
            className="action-button-enhanced laser-btn gpu-accelerated"
            style={{ '--color-1': '#f97316', '--color-2': '#ea580c' } as React.CSSProperties}
          >
            🔴 Laser
          </button>
        )}
      </div>

      {/* Secondary Actions */}
      <div className="flex gap-4 flex-wrap justify-center">
        <button 
          onClick={onTrain} 
          disabled={disabled}
          className="action-button-enhanced gpu-accelerated" 
          style={{ '--color-1': '#06b6d4', '--color-2': '#0891b2' } as React.CSSProperties}
        >
          💪 Treinamento
        </button>
        
        {onTreat && (
          <button 
            onClick={onTreat} 
            disabled={disabled}
            className="action-button-enhanced gpu-accelerated" 
            style={{ '--color-1': '#84cc16', '--color-2': '#65a30d' } as React.CSSProperties}
          >
            🍬 Petisco
          </button>
        )}
      </div>
    </div>
  );
};