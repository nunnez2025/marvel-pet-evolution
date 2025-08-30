import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface PetState {
  hunger: number;
  happiness: number;
  energy: number;
  health: number;
  age: number; // in minutes
  level: number;
  xp: number;
  xpToNext: number;
  evolutionStage: number;
  totalClicks: number;
  achievements: string[];
  mood: 'happy' | 'sad' | 'hungry' | 'sick' | 'sleeping' | 'normal';
  isAlive: boolean;
  laserHighScore: number;
  loneliness: number;
  miniGameActive: boolean;
}

const INITIAL_STATE: PetState = {
  hunger: 80,
  happiness: 90,
  energy: 100,
  health: 100,
  age: 0,
  level: 1,
  xp: 0,
  xpToNext: 100,
  evolutionStage: 0,
  totalClicks: 0,
  achievements: [],
  mood: 'normal',
  isAlive: true,
  laserHighScore: 0,
  loneliness: 0,
  miniGameActive: false
};

const EVOLUTION_TIMES = [2, 8, 20, 50, 100, 200, 300, Infinity]; // minutes to next stage

const SPEECH_MESSAGES = {
  deadpool: {
    birth: [
      "Hey aí! Deadpool na área! Preparado para máximo esforço?",
      "Quebrar a quarta parede nunca foi tão divertido!",
      "Basicamente sou imortal, então vamos ter uma LONGA amizade!"
    ],
    happy: [
      "Isso é melhor que chimichangas! Quase...",
      "Você é o melhor parceiro que um mercenário poderia pedir!",
      "Quebrando a quarta parede com estilo!",
      "Máximo esforço em tudo que fazemos!"
    ],
    hungry: [
      "Cadê minhas chimichangas?! EU PRECISO DE CHIMICHANGAS!",
      "Um Deadpool faminto é um Deadpool perigoso...",
      "Me alimente ou vou quebrar mais que a quarta parede!"
    ],
    sad: [
      "Nem minha regeneração cura essa solidão...",
      "Posso ser o Mercenário Tagarela, mas senti sua falta!",
      "Onde você foi? Estava contando as melhores piadas!"
    ],
    sick: [
      "Não se preocupe, me curo rápido! Mas um cuidado não faria mal...",
      "Meu fator de cura está de férias aparentemente...",
      "Até o Deadpool precisa de um kit médico às vezes!"
    ],
    sleeping: [
      "Máximo esforço requer máximo descanso...",
      "Até mercenários precisam de sua beleza do sono!",
      "Hora de um cochilo antes de mais caos!"
    ],
    training: [
      "Montagem de treino! Toca a música dos anos 80!",
      "Ficando mais forte! Logo conseguirei levantar... coisas!",
      "Treinamento de máximo esforço igual ganhos máximos!"
    ]
  },
  wolverine: {
    birth: [
      "E aí, garoto. Pronto para ver o que essas garras podem fazer?",
      "Sou o melhor no que faço, e isso é ser seu pet!",
      "Bem-vindo à experiência X-Men, cara!"
    ],
    happy: [
      "Isso é melhor que uma cerveja gelada após uma longa luta!",
      "Você é legal, garoto. Me lembra dos bons tempos.",
      "Meus instintos animais dizem que você é um dos bons!",
      "Snikt! Esse é o som da felicidade, cara!"
    ],
    hungry: [
      "Meu estômago está roncando mais alto que o Dentes-de-Sabre!",
      "Eu toparia um bacon canadense agora...",
      "Alimente a fera, ou encare as garras!"
    ],
    sad: [
      "Até um mutante velho como eu fica solitário às vezes...",
      "Você ficou fora tanto tempo, pensei que o Magneto te pegou...",
      "A solidão corta mais fundo que adamantium..."
    ],
    sick: [
      "Meu fator de cura não é mais o que era...",
      "Já me senti melhor depois de lutar com o Hulk...",
      "Ajude um velho X-Man, vai?"
    ],
    sleeping: [
      "Esses ossos velhos precisam descansar...",
      "Hora de hibernar como um wolverine de verdade...",
      "Até mutantes precisam de seu tempo de inatividade..."
    ],
    training: [
      "Hora de bater na Sala do Perigo!",
      "Treinando duro, lutando mais duro!",
      "Afiando essas garras e habilidades!"
    ]
  }
};

export const usePetGame = (character: 'deadpool' | 'wolverine') => {
  const [petState, setPetState] = useState<PetState>(INITIAL_STATE);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Get random speech message
  const getRandomSpeech = useCallback((mood: string): string => {
    const messages = SPEECH_MESSAGES[character]?.[mood as keyof typeof SPEECH_MESSAGES.deadpool];
    if (messages && messages.length > 0) {
      return messages[Math.floor(Math.random() * messages.length)];
    }
    return character === 'deadpool' 
      ? "Máximo esforço sempre!" 
      : "Sou o melhor no que faço, cara!";
  }, [character]);

  // Calculate evolution progress
  const getEvolutionProgress = useCallback(() => {
    const currentStageTime = EVOLUTION_TIMES[petState.evolutionStage];
    const previousStageTime = petState.evolutionStage > 0 ? EVOLUTION_TIMES[petState.evolutionStage - 1] : 0;
    
    if (currentStageTime === Infinity) return 100;
    
    const timeInStage = petState.age - previousStageTime;
    const stageLength = currentStageTime - previousStageTime;
    
    return Math.min(100, (timeInStage / stageLength) * 100);
  }, [petState.age, petState.evolutionStage]);

  // Update mood based on stats
  const updateMood = useCallback((state: PetState): string => {
    if (state.health <= 30) return 'sick';
    if (state.energy <= 20) return 'sleeping';
    if (state.hunger <= 30) return 'hungry';
    if (state.happiness >= 80) return 'happy';
    if (state.happiness <= 30) return 'sad';
    return 'normal';
  }, []);

  // Check for achievements
  const checkAchievements = useCallback((state: PetState) => {
    const newAchievements: string[] = [];
    
    if (state.totalClicks >= 10 && !state.achievements.includes('Primeiro Clique')) {
      newAchievements.push('Primeiro Clique');
    }
    
    if (state.totalClicks >= 100 && !state.achievements.includes('Clicador Dedicado')) {
      newAchievements.push('Clicador Dedicado');
    }
    
    if (state.level >= 5 && !state.achievements.includes('Evoluindo')) {
      newAchievements.push('Evoluindo');
    }
    
    if (state.evolutionStage >= 3 && !state.achievements.includes('Adulto')) {
      newAchievements.push('Adulto');
    }
    
    if (state.age >= 60 && !state.achievements.includes('Uma Hora de Vida')) {
      newAchievements.push('Uma Hora de Vida');
    }

    return newAchievements;
  }, []);

  // Add XP and handle leveling
  const addXP = useCallback((amount: number) => {
    setPetState(prev => {
      let newXP = prev.xp + amount;
      let newLevel = prev.level;
      let newXPToNext = prev.xpToNext;
      
      while (newXP >= newXPToNext) {
        newXP -= newXPToNext;
        newLevel++;
        newXPToNext = newLevel * 100;
        
        toast.success(`Level Up! Agora nível ${newLevel}`, {
          duration: 3000,
        });
      }
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNext: newXPToNext
      };
    });
  }, []);

  // Enhanced actions with exact same functionality as original
  const feedPet = useCallback(() => {
    if (!petState.isAlive) return;
    
    setPetState(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 35),
      happiness: Math.min(100, prev.happiness + 12),
      loneliness: Math.max(0, prev.loneliness - 15),
      totalClicks: prev.totalClicks + 1
    }));
    
    addXP(6);
    
    const message = character === 'deadpool' ? 
      "Mmm! Better than Aunt May's wheat cakes!" : 
      "Thanks, bub. That hit the spot!";
    
    toast.success(message, { duration: 2000 });
  }, [petState.isAlive, addXP, character]);

  const playWithPet = useCallback(() => {
    if (!petState.isAlive || petState.energy < 15) {
      if (petState.energy < 15) {
        toast.info("I'm too tired to play right now...");
      }
      return;
    }
    
    setPetState(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 28),
      energy: Math.max(0, prev.energy - 15),
      loneliness: Math.max(0, prev.loneliness - 25),
      totalClicks: prev.totalClicks + 1
    }));
    
    addXP(10);
    toast.success(getRandomSpeech('happy'), { duration: 2000 });
  }, [petState.isAlive, petState.energy, addXP, getRandomSpeech]);

  const healPet = useCallback(() => {
    if (!petState.isAlive) return;
    
    setPetState(prev => ({
      ...prev,
      health: Math.min(100, prev.health + 45),
      energy: Math.min(100, prev.energy + 25),
      totalClicks: prev.totalClicks + 1
    }));
    
    addXP(4);
    
    const message = character === 'deadpool' ? 
      "My healing factor is back online!" : 
      "Feeling like I could take on Sabretooth again!";
    
    toast.success(message, { duration: 2000 });
  }, [petState.isAlive, addXP, character]);

  const putPetToSleep = useCallback(() => {
    if (!petState.isAlive) return;
    
    setPetState(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 55),
      health: Math.min(100, prev.health + 18),
      happiness: Math.min(100, prev.happiness + 8),
      totalClicks: prev.totalClicks + 1
    }));
    
    addXP(3);
    toast.success(getRandomSpeech('sleeping'), { duration: 2000 });
  }, [petState.isAlive, addXP, getRandomSpeech]);

  const trainPet = useCallback(() => {
    if (!petState.isAlive || petState.energy < 25) {
      if (petState.energy < 25) {
        toast.info("I need more energy to train!");
      }
      return;
    }
    
    setPetState(prev => ({
      ...prev,
      energy: Math.max(0, prev.energy - 25),
      happiness: Math.min(100, prev.happiness + 18),
      totalClicks: prev.totalClicks + 1
    }));
    
    addXP(15);
    toast.success(getRandomSpeech('training'), { duration: 2000 });
  }, [petState.isAlive, petState.energy, addXP, getRandomSpeech]);

  const giveTreat = useCallback(() => {
    if (!petState.isAlive) return;
    
    setPetState(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 22),
      hunger: Math.min(100, prev.hunger + 18),
      loneliness: Math.max(0, prev.loneliness - 18),
      totalClicks: prev.totalClicks + 1
    }));
    
    addXP(7);
    
    const message = character === 'deadpool' ? 
      "Sweet! Almost as good as a chimichanga!" : 
      "Not bad, kid. Got any more of these?";
    
    toast.success(message, { duration: 2000 });
  }, [petState.isAlive, addXP, character]);

  const clickPet = useCallback(() => {
    if (!petState.isAlive) return;
    
    setPetState(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 6),
      loneliness: Math.max(0, prev.loneliness - 8),
      totalClicks: prev.totalClicks + 1
    }));
    
    addXP(2);
  }, [petState.isAlive, addXP]);

  // Laser game integration
  const updatePetFromLaser = useCallback((happiness: number, energy: number, xp: number) => {
    setPetState(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + happiness),
      energy: Math.max(0, prev.energy + energy)
    }));
    addXP(xp);
  }, [addXP]);

  const updateLaserHighScore = useCallback((score: number) => {
    setPetState(prev => {
      const newScore = Math.max(prev.laserHighScore, score);
      if (newScore > prev.laserHighScore) {
        toast.success('New High Score!', { duration: 3000 });
        
        // Add achievement
        const newAchievements = [...prev.achievements];
        if (!newAchievements.includes('Laser Master')) {
          newAchievements.push('Laser Master');
        }
        
        return {
          ...prev,
          laserHighScore: newScore,
          achievements: newAchievements
        };
      }
      return prev;
    });
  }, []);

  // Mini game integration  
  const updatePetFromMiniGame = useCallback((hunger: number, happiness: number, xp: number) => {
    setPetState(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + hunger),
      happiness: Math.min(100, prev.happiness + happiness),
      miniGameActive: false
    }));
    addXP(xp);
  }, [addXP]);

  const startMiniGame = useCallback(() => {
    setPetState(prev => ({ ...prev, miniGameActive: true }));
  }, []);

  // Main game loop
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const deltaTime = (now - lastUpdate) / (1000 * 60); // Convert to minutes
      
      setPetState(prev => {
        if (!prev.isAlive) return prev;
        
        let newState = {
          ...prev,
          age: prev.age + deltaTime,
          hunger: Math.max(0, prev.hunger - deltaTime * 2),
          happiness: Math.max(0, prev.happiness - deltaTime * 1),
          energy: Math.max(0, prev.energy - deltaTime * 1.5),
        };
        
        // Health decreases if other stats are low
        if (newState.hunger <= 20 || newState.happiness <= 20) {
          newState.health = Math.max(0, newState.health - deltaTime * 2);
        }
        
        // Check evolution
        const currentStageTime = EVOLUTION_TIMES[newState.evolutionStage];
        if (newState.age >= currentStageTime && newState.evolutionStage < EVOLUTION_TIMES.length - 1) {
          newState.evolutionStage++;
          toast.success(`Evolução! Seu pet agora é ${['Bebê', 'Criança', 'Adolescente', 'Adulto', 'Veterano', 'Lendário', 'Mítico', 'Eterno'][newState.evolutionStage]}!`, {
            duration: 5000,
          });
        }
        
        // Check if pet dies
        if (newState.health <= 0) {
          newState.isAlive = false;
          toast.error('Seu pet morreu... 💔', {
            duration: 10000,
          });
        }
        
        // Update mood
        newState.mood = updateMood(newState) as any;
        
        // Check achievements
        const newAchievements = checkAchievements(newState);
        if (newAchievements.length > 0) {
          newState.achievements = [...newState.achievements, ...newAchievements];
          newAchievements.forEach(achievement => {
            toast.success(`Conquista desbloqueada: ${achievement}! 🏆`, {
              duration: 4000,
            });
          });
        }
        
        return newState;
      });
      
      setLastUpdate(now);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [lastUpdate, updateMood, checkAchievements]);

  return {
    petState,
    actions: {
      feedPet,
      playWithPet,
      healPet,
      putPetToSleep,
      trainPet,
      clickPet,
      giveTreat
    },
    laserGame: {
      updatePetFromLaser,
      updateLaserHighScore
    },
    miniGame: {
      updatePetFromMiniGame,
      startMiniGame
    },
    utils: {
      getEvolutionProgress,
      resetPet: () => setPetState(INITIAL_STATE),
      getRandomSpeech
    }
  };
};