interface StatusBarsProps {
  hunger: number;
  happiness: number;
  energy: number;
  health: number;
}

const getProgressVariant = (value: number) => {
  if (value <= 20) return 'danger';
  if (value <= 40) return 'warning';
  return '';
};

export const StatusBars = ({ hunger, happiness, energy, health }: StatusBarsProps) => {
  return (
    <div className="w-full max-w-md space-y-4">
      {/* Fome */}
      <div className="stat-container">
        <p className="text-sm mb-3 text-gray-300 font-semibold flex items-center gap-2">
          🍔 Fome 
          <span className="text-xs text-gray-400 ml-auto">{hunger}%</span>
        </p>
        <div className="progress-bar">
          <div 
            className={`progress-fill ${getProgressVariant(hunger)}`} 
            style={{ width: `${hunger}%` }}
          />
        </div>
        {hunger <= 20 && (
          <p className="text-xs text-red-400 mt-2 animate-energy-pulse">
            ⚠️ Muito faminto!
          </p>
        )}
      </div>

      {/* Felicidade */}
      <div className="stat-container">
        <p className="text-sm mb-3 text-gray-300 font-semibold flex items-center gap-2">
          😊 Felicidade 
          <span className="text-xs text-gray-400 ml-auto">{happiness}%</span>
        </p>
        <div className="progress-bar">
          <div 
            className={`progress-fill ${getProgressVariant(happiness)}`} 
            style={{ width: `${happiness}%` }}
          />
        </div>
        {happiness <= 20 && (
          <p className="text-xs text-red-400 mt-2 animate-energy-pulse">
            ⚠️ Muito triste!
          </p>
        )}
      </div>

      {/* Energia */}
      <div className="stat-container">
        <p className="text-sm mb-3 text-gray-300 font-semibold flex items-center gap-2">
          ⚡ Energia 
          <span className="text-xs text-gray-400 ml-auto">{energy}%</span>
        </p>
        <div className="progress-bar">
          <div 
            className={`progress-fill ${getProgressVariant(energy)}`} 
            style={{ width: `${energy}%` }}
          />
        </div>
        {energy <= 20 && (
          <p className="text-xs text-red-400 mt-2 animate-energy-pulse">
            ⚠️ Exausto!
          </p>
        )}
      </div>

      {/* Saúde */}
      <div className="stat-container">
        <p className="text-sm mb-3 text-gray-300 font-semibold flex items-center gap-2">
          ❤️ Saúde 
          <span className="text-xs text-gray-400 ml-auto">{health}%</span>
        </p>
        <div className="progress-bar">
          <div 
            className={`progress-fill ${getProgressVariant(health)}`} 
            style={{ width: `${health}%` }}
          />
        </div>
        {health <= 20 && (
          <p className="text-xs text-red-400 mt-2 animate-energy-pulse">
            ⚠️ Precisa de cuidados médicos!
          </p>
        )}
      </div>
    </div>
  );
};