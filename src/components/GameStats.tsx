import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GameStatsProps {
  character: 'deadpool' | 'wolverine';
  age: number;
  level: number;
  xp: number;
  xpToNext: number;
  totalClicks: number;
  achievements: string[];
  evolutionStage: number;
}

const EVOLUTION_STAGES = [
  "Bebê", "Criança", "Adolescente", "Adulto", 
  "Veterano", "Lendário", "Mítico", "Eterno"
];

export const GameStats = ({ 
  character, 
  age, 
  level, 
  xp, 
  xpToNext, 
  totalClicks, 
  achievements, 
  evolutionStage 
}: GameStatsProps) => {
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d ${hours % 24}h ${mins}m`;
    }
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <Card className="bg-card/50 backdrop-blur-sm shadow-marvel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">
              {character === 'deadpool' ? '💀' : '⚔️'}
            </span>
            Estatísticas do Pet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Personagem</p>
              <p className="font-bold text-lg capitalize">{character}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Idade</p>
              <p className="font-bold text-lg">{formatTime(age)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nível</p>
              <p className="font-bold text-lg">{level}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Evolução</p>
              <p className="font-bold text-lg">{EVOLUTION_STAGES[evolutionStage]}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">XP</span>
              <span className="text-sm font-semibold">{xp}/{xpToNext}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${(xp / xpToNext) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Stats */}
      <Card className="bg-card/50 backdrop-blur-sm shadow-marvel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Atividade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total de Cliques</span>
              <span className="font-bold">{totalClicks.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Conquistas</span>
              <span className="font-bold">{achievements.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-card/50 backdrop-blur-sm shadow-marvel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏆 Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {achievements.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              Nenhuma conquista ainda...
            </p>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                  <span className="text-lg">🏅</span>
                  <span className="text-sm">{achievement}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};