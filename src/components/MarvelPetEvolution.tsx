import { useState } from 'react';
import { CharacterSelection } from './CharacterSelection';
import { PetDisplay } from './PetDisplay';
import { StatusBars } from './StatusBars';
import { ActionButtons } from './ActionButtons';
import { EvolutionProgress } from './EvolutionProgress';
import { PetSpeech } from './PetSpeech';
import { GameStats } from './GameStats';
import { usePetGame } from '../hooks/usePetGame';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const MarvelPetEvolution = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<'deadpool' | 'wolverine' | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  
  const petGame = usePetGame(selectedCharacter!);
  const { petState, actions, utils } = petGame;

  const handleCharacterSelection = (character: 'deadpool' | 'wolverine') => {
    setSelectedCharacter(character);
    setGameStarted(true);
  };

  const handleRestart = () => {
    setSelectedCharacter(null);
    setGameStarted(false);
    utils.resetPet();
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getTimeToNextEvolution = (): number => {
    const evolutionTimes = [2, 8, 20, 50, 100, 200, 300, Infinity];
    const nextTime = evolutionTimes[petState.evolutionStage + 1];
    if (nextTime === Infinity) return 0;
    return Math.max(0, nextTime - petState.age);
  };

  if (!gameStarted || !selectedCharacter) {
    return <CharacterSelection onSelectCharacter={handleCharacterSelection} />;
  }

  if (!petState.isAlive) {
    return (
      <div className="min-h-screen gradient-marvel flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6 animate-energy-pulse">💀</div>
          <h2 className="text-4xl font-bold text-white mb-6">Game Over</h2>
          <div className="bg-card/50 backdrop-blur-lg border border-border rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Estatísticas Finais</h3>
            <div className="space-y-2 text-left">
              <p>Tempo de vida: <span className="font-bold">{formatTime(petState.age)}</span></p>
              <p>Nível alcançado: <span className="font-bold">{petState.level}</span></p>
              <p>Evolução: <span className="font-bold">{['Bebê', 'Criança', 'Adolescente', 'Adulto', 'Veterano', 'Lendário', 'Mítico', 'Eterno'][petState.evolutionStage]}</span></p>
              <p>Conquistas: <span className="font-bold">{petState.achievements.length}</span></p>
            </div>
          </div>
          <Button onClick={handleRestart} className="bg-primary hover:bg-primary/90">
            Novo Pet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      selectedCharacter === 'deadpool' ? 'gradient-deadpool' : 'gradient-wolverine'
    } p-4`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2 animate-marvel-glow">
            {selectedCharacter === 'deadpool' ? '💀 Deadpool' : '⚔️ Wolverine'} Pet Evolution
          </h1>
          <Button 
            onClick={handleRestart} 
            variant="outline" 
            size="sm"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Novo Pet
          </Button>
        </div>

        <Tabs defaultValue="game" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/20 backdrop-blur-sm">
            <TabsTrigger value="game" className="text-white data-[state=active]:bg-white/20">
              🎮 Jogo
            </TabsTrigger>
            <TabsTrigger value="stats" className="text-white data-[state=active]:bg-white/20">
              📊 Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="game" className="space-y-6">
            {/* Evolution Progress */}
            <div className="flex justify-center">
              <EvolutionProgress
                currentStage={petState.evolutionStage}
                stageProgress={utils.getEvolutionProgress()}
                timeInStage={petState.age - (petState.evolutionStage > 0 ? [0, 2, 8, 20, 50, 100, 200, 300][petState.evolutionStage] : 0)}
                timeToNext={getTimeToNextEvolution()}
              />
            </div>

            {/* Pet Display */}
            <div className="flex justify-center">
              <PetDisplay
                character={selectedCharacter}
                mood={petState.mood}
                evolutionStage={petState.evolutionStage}
                onClick={actions.clickPet}
              />
            </div>

            {/* Pet Speech */}
            <div className="flex justify-center">
              <PetSpeech
                character={selectedCharacter}
                mood={petState.mood}
              />
            </div>

            {/* Status Bars */}
            <div className="flex justify-center">
              <StatusBars
                hunger={petState.hunger}
                happiness={petState.happiness}
                energy={petState.energy}
                health={petState.health}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center">
              <ActionButtons
                onFeed={actions.feedPet}
                onPlay={actions.playWithPet}
                onHeal={actions.healPet}
                onSleep={actions.putPetToSleep}
                onTrain={actions.trainPet}
              />
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="flex justify-center">
              <div className="max-w-md w-full">
                <GameStats
                  character={selectedCharacter}
                  age={petState.age}
                  level={petState.level}
                  xp={petState.xp}
                  xpToNext={petState.xpToNext}
                  totalClicks={petState.totalClicks}
                  achievements={petState.achievements}
                  evolutionStage={petState.evolutionStage}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};